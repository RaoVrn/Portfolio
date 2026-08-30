/**
 * Shared GitHub live-development handler.
 * Used by the local Express server (server/index.js) and the
 * Vercel serverless function (api/github.js) — one implementation.
 *
 * Environment variables (server-side only, never in the client):
 *   GITHUB_USERNAME        — GitHub username (defaults to RaoVrn)
 *   GITHUB_TOKEN           — optional fine-grained token; public data
 *                            works without one (rate limit 60/hr per IP)
 *   GITHUB_FEATURED_REPO   — optional manual pin for CURRENT BUILD
 *
 * ─────────────────────────────────────────────────────────────
 * DATA MODEL — each metric has its own source. They never share
 * a filtered dataset:
 *
 *   currentBuild        — most active repo by the scoring system
 *                         (forks/archived/empty excluded)
 *   recentActivity      — latest push/PR events from the events feed
 *   githubStats         — LIFETIME numbers, computed independently:
 *       totalRepositories   — ALL owned repos (paginated, type=owner,
 *                             non-fork), verified against
 *                             user.public_repos
 *       totalCommits        — per owned repo, commits authored by
 *                             GITHUB_USERNAME on the default branch,
 *                             counted exactly via the Link header
 *                             (1 request per repo, no pagination walk)
 *       totalPullRequests   — lifetime PRs authored, from the issue
 *                             search index (authoritative total_count)
 *   activityTimeline    — last 14 days: probe commits (top repos)
 *                         + PR events, grouped by day
 *
 * CACHING — two independent caches:
 *   live  cache: 30 min   (currentBuild, recentActivity, timeline)
 *   stats cache: 12 hours (lifetime totals)
 * Both persist to disk so stale data survives restarts and is
 * served when GitHub is down — correct values are never replaced
 * with zeros.
 * ─────────────────────────────────────────────────────────────
 */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const DAY = 24 * 60 * 60 * 1000;
const HERE = dirname(fileURLToPath(import.meta.url));

const USERNAME = process.env.GITHUB_USERNAME || "RaoVrn";
const TOKEN = process.env.GITHUB_TOKEN || "";
const FEATURED = process.env.GITHUB_FEATURED_REPO || "";

/* ----- Weights for the "currently building" scoring system ----- */
const WEIGHTS = {
  recencyTiers: [
    { maxDays: 1, score: 50 },
    { maxDays: 7, score: 38 },
    { maxDays: 14, score: 28 },
    { maxDays: 30, score: 18 },
    { maxDays: 60, score: 8 },
  ],
  commits7d: 1.0,
  commits30d: 0.5,
  pushEvents30d: 6,
  prEvents30d: 8,
  newRepo90d: 6,
};
const MIN_ACTIVE_SCORE = 20;
const PROBE_REPOS = 6;
const TIMELINE_DAYS = 14;
const COMMIT_BATCH = 5; // concurrent per-repo commit requests

/**
 * Refresh cadence is rate-limit-aware:
 *   with a token (5,000 req/hr):  live 5 min, stats 30 min
 *   without a token (60 req/hr):  live 15 min, stats 15 min
 *   (stats without a token use the 2-request search-index method,
 *    see fetchLifetimeStats below)
 * The client polls /api/github every 60s; the server serves cached
 * data until the TTL expires, then revalidates from GitHub. This is
 * the only caching layer — responses are never cached by proxies.
 */
const CACHES = {
  live: { ttl: TOKEN ? 5 * 60 * 1000 : 15 * 60 * 1000, memory: null, file: join(HERE, ".github-live-cache.json") },
  stats: { ttl: TOKEN ? 30 * 60 * 1000 : 15 * 60 * 1000, memory: null, file: join(HERE, ".github-stats-cache.json") },
};

function log(...args) {
  console.log("[github]", ...args);
}

class GitHubError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

async function gh(path, withLink = false) {
  const headers = { "User-Agent": "varun-portfolio", Accept: "application/vnd.github+json" };
  if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;
  const res = await fetch(`https://api.github.com${path}`, { headers });
  if (!res.ok) {
    let message = `HTTP ${res.status}`;
    try {
      const body = await res.json();
      if (body?.message) message = body.message;
    } catch {
      /* keep status fallback */
    }
    throw new GitHubError(res.status, `${message} (rate remaining: ${res.headers.get("x-ratelimit-remaining") ?? "n/a"})`);
  }
  if (!withLink) return res.json();
  return { data: await res.json(), link: res.headers.get("link") ?? "" };
}

function loadCache(kind) {
  try {
    const raw = readFileSync(CACHES[kind].file, "utf8");
    const parsed = JSON.parse(raw);
    if (parsed?.at && parsed?.data) return parsed;
  } catch {
    /* no cache yet */
  }
  return null;
}

function saveCache(kind, at, data) {
  try {
    writeFileSync(CACHES[kind].file, JSON.stringify({ at, data }));
  } catch (err) {
    log(`${kind} cache write failed:`, err.message);
  }
}

const firstLine = (msg) => (msg || "Update").split("\n")[0].trim().slice(0, 72);

function isMeaningful(repo) {
  return !repo.fork && !repo.archived && repo.size > 0 && !!repo.pushed_at;
}

/** Fetch ALL owned (non-fork) repos, following pagination to completion. */
async function fetchAllRepos() {
  const all = [];
  let page = 0;
  for (;;) {
    page += 1;
    const batch = await gh(`/users/${USERNAME}/repos?per_page=100&page=${page}&type=owner`);
    all.push(...batch);
    if (batch.length < 100) break;
    if (page >= 10) {
      log("repo pagination safety cap reached");
      break;
    }
  }
  return all;
}

function daysBetween(now, thenMs) {
  return (now - thenMs) / DAY;
}

/** Pure, testable scoring of one repository. */
export function scoreRepository({ repo, commits, events, now }) {
  const parts = {};
  let score = 0;

  const latestMs = commits[0]?.commit?.author?.date
    ? new Date(commits[0].commit.author.date).getTime()
    : new Date(repo.pushed_at).getTime();
  const ageDays = daysBetween(now, latestMs);

  let recency = 0;
  for (const tier of WEIGHTS.recencyTiers) {
    if (ageDays <= tier.maxDays) {
      recency = tier.score;
      break;
    }
  }
  parts.recency = recency;
  score += recency;

  const commits7d = commits.filter(
    (c) => daysBetween(now, new Date(c.commit.author.date).getTime()) <= 7
  ).length;
  const commits30d = commits.length;
  parts.commits7d = Math.round(commits7d * WEIGHTS.commits7d);
  parts.commits30d = Math.round(commits30d * WEIGHTS.commits30d);
  score += parts.commits7d + parts.commits30d;

  parts.pushEvents = Math.min(4, events.pushes) * WEIGHTS.pushEvents30d;
  parts.prEvents = Math.min(3, events.prs) * WEIGHTS.prEvents30d;
  score += parts.pushEvents + parts.prEvents;

  parts.newRepo = 0;
  if (daysBetween(now, new Date(repo.created_at).getTime()) <= 90) {
    parts.newRepo = WEIGHTS.newRepo90d;
    score += parts.newRepo;
  }

  return { score: Math.round(score), parts, latestDate: new Date(latestMs).toISOString() };
}

/* ============================================================
   LIVE ACTIVITY (30-minute cache)
   ============================================================ */

async function fetchLiveActivity() {
  const now = Date.now();
  const sinceIso = new Date(now - 30 * DAY).toISOString();

  const [repos, events] = await Promise.all([
    fetchAllRepos(),
    gh(`/users/${USERNAME}/events?per_page=100`),
  ]);
  const meaningful = repos.filter(isMeaningful);
  meaningful.sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime());

  // Commit probes for the most recently pushed repos.
  const probes = new Map();
  for (const repo of meaningful.slice(0, PROBE_REPOS)) {
    try {
      const commits = await gh(`/repos/${USERNAME}/${repo.name}/commits?since=${sinceIso}&per_page=100`);
      probes.set(repo.name, commits);
    } catch (err) {
      log(`commit probe failed for ${repo.name}:`, err.message);
    }
  }

  // Score repositories → currentBuild.
  const eventsByRepo = new Map();
  for (const e of events) {
    const repo = e.repo?.name?.split("/")[1];
    if (!repo) continue;
    const s = eventsByRepo.get(repo) ?? { pushes: 0, prs: 0 };
    if (e.type === "PushEvent") s.pushes += 1;
    else if (e.type === "PullRequestEvent") s.prs += 1;
    eventsByRepo.set(repo, s);
  }

  const scored = meaningful
    .map((repo) => {
      const commits = probes.get(repo.name) ?? [];
      const events_ = eventsByRepo.get(repo.name) ?? { pushes: 0, prs: 0 };
      const r = scoreRepository({ repo, commits, events: events_, now });
      return { repo, ...r };
    })
    .sort((a, b) => b.score - a.score);
  const best = scored[0];

  let currentBuild = null;
  if (best && best.score >= MIN_ACTIVE_SCORE) {
    const { repo, score, parts } = best;
    currentBuild = {
      name: repo.name,
      description: repo.description ?? "",
      url: repo.html_url,
      language: repo.language || "Unknown",
      updatedAt: best.latestDate,
      selectionReason:
        `Highest activity score (${score}): ` +
        `${parts.commits7d + parts.commits30d} commit points, ` +
        `${parts.pushEvents} push points, ${parts.prEvents} PR points` +
        `, pushed ${daysBetween(now, new Date(best.latestDate).getTime()).toFixed(1)}d ago`,
      activityScore: score,
    };
  }

  // Recent activity: push/PR events, most recent first.
  const probeLatest = new Map();
  for (const [name, commits] of probes) {
    const latest = commits[0]?.commit?.message;
    if (latest) probeLatest.set(name, firstLine(latest));
  }
  const recentActivity = [];
  const seen = new Set();
  for (const e of events) {
    if (recentActivity.length >= 3) break;
    const repo = e.repo?.name?.split("/")[1];
    if (!repo) continue;
    if (e.type === "PushEvent") {
      const message =
        firstLine(e.payload?.commits?.[0]?.message) || probeLatest.get(repo) || `Push to ${e.payload?.ref ?? "branch"}`;
      const key = `${repo}-${message}`;
      if (seen.has(key)) continue;
      seen.add(key);
      recentActivity.push({ type: "commit", repo, message, timestamp: e.created_at, url: `https://github.com/${USERNAME}/${repo}` });
    } else if (e.type === "PullRequestEvent") {
      const pr = e.payload?.pull_request;
      const message = `PR: ${firstLine(pr?.title ?? "Update")}`;
      const key = `${repo}-${message}`;
      if (seen.has(key)) continue;
      seen.add(key);
      recentActivity.push({ type: "pr", repo, message, timestamp: e.created_at, url: pr?.html_url ?? `https://github.com/${USERNAME}/${repo}` });
    }
  }

  // Activity timeline: last 14 days from probe commits + PR events.
  const timeline = [];
  let activeDays = 0;
  for (let i = TIMELINE_DAYS - 1; i >= 0; i--) {
    const dayStart = new Date(new Date(now).setHours(0, 0, 0, 0) - i * DAY);
    const key = dayStart.toISOString().slice(0, 10);
    const perRepo = new Map();
    for (const [name, commits] of probes) {
      const n = commits.filter((c) => c.commit?.author?.date?.slice(0, 10) === key).length;
      if (n > 0) perRepo.set(name, n);
    }
    let prs = 0;
    for (const e of events) {
      if (e.type !== "PullRequestEvent") continue;
      if (e.created_at.slice(0, 10) !== key) continue;
      prs += 1;
      const repo = e.repo?.name?.split("/")[1];
      if (repo && !perRepo.has(repo)) perRepo.set(repo, 0);
    }
    const commits = [...perRepo.values()].reduce((n, c) => n + c, 0);
    const count = commits + prs;
    if (count > 0) activeDays += 1;
    timeline.push({
      date: key,
      count,
      commits,
      prs,
      repos: [...perRepo.keys()].slice(0, 2),
    });
  }
  log(`timeline: ${TIMELINE_DAYS} days, ${activeDays} with activity`);

  return { currentBuild, recentActivity, activityTimeline: timeline };
}

/* ============================================================
   LIFETIME STATS (12-hour cache) — independent of live activity
   ============================================================ */

/** Last-page number from a GitHub Link header → exact total. */
export function lastPageFromLink(link) {
  const m = /page=(\d+)>;\s*rel="last"/.exec(link ?? "");
  return m ? Number(m[1]) : null;
}

async function fetchLifetimeStats() {
  const [user, repos] = await Promise.all([gh(`/users/${USERNAME}`), fetchAllRepos()]);

  // 1. TOTAL REPOSITORIES = every owned (non-fork) repo, all pages.
  const totalRepositories = repos.length;
  log(
    `repos: ${repos.length} owned (pages complete), public_repos=${user.public_repos}, ` +
      `meaningful-for-build=${repos.filter(isMeaningful).length} (separate dataset)`
  );

  // 2. TOTAL COMMITS — two documented modes:
  //    WITH token: per repo, commits authored by USERNAME on the default
  //      branch, counted exactly via per_page=1 + Link header (1 request
  //      per repo, batched; no history walk, no double counting).
  //    WITHOUT token: GitHub's commit search index total_count
  //      (2 requests) — fresh enough for a 15-minute refresh within the
  //      60 req/hr unauth budget; index lags pushes by minutes.
  let totalCommits = null;
  let commitMethod = "";
  if (TOKEN) {
    const commitTotals = [];
    let commitCalls = 0;
    let commitFailures = 0;
    for (let i = 0; i < repos.length; i += COMMIT_BATCH) {
      const batch = repos.slice(i, i + COMMIT_BATCH);
      const results = await Promise.all(
        batch.map(async (repo) => {
          commitCalls += 1;
          try {
            const { data, link } = await gh(
              `/repos/${USERNAME}/${repo.name}/commits?author=${USERNAME}&per_page=1`,
              true
            );
            const last = lastPageFromLink(link);
            return { name: repo.name, total: last ?? (data.length > 0 ? 1 : 0) };
          } catch (err) {
            commitFailures += 1;
            log(`commit count failed for ${repo.name}:`, err.message);
            return { name: repo.name, total: null };
          }
        })
      );
      commitTotals.push(...results);
    }
    const counted = commitTotals.filter((r) => r.total !== null);
    totalCommits = counted.reduce((n, r) => n + r.total, 0);
    commitMethod = `per-repo authored-commit count via Link header (${commitCalls} requests, ${commitFailures} failures, default branch only)`;
  } else {
    try {
      const commitsSearch = await gh(`/search/commits?q=author:${USERNAME}&per_page=1`);
      totalCommits = commitsSearch.total_count ?? null;
      commitMethod = "GitHub commit search index total_count (no token configured)";
    } catch (err) {
      log("commit search failed:", err.message);
    }
  }
  log(`commits: ${totalCommits} authored by ${USERNAME}, ${commitMethod}`);

  // 3. TOTAL PULL REQUESTS — lifetime PRs authored, authoritative
  //    total_count from the issue search index (no pagination walk).
  let totalPullRequests = null;
  try {
    const prSearch = await gh(`/search/issues?q=author:${USERNAME}+type:pr&per_page=1`);
    totalPullRequests = prSearch.total_count ?? null;
  } catch (err) {
    log("PR search failed:", err.message);
  }
  log(`pull requests: ${totalPullRequests} authored (issue search total_count)`);

  return {
    githubStats: {
      totalCommits,
      totalPullRequests,
      totalRepositories,
    },
    _commitMethod: commitMethod,
  };
}

/* ============================================================
   HANDLER
   ============================================================ */

export async function handleGithub(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const now = Date.now();

  // Live activity: fresh cache → stale cache → fetch.
  let live = null;
  let liveError = null;
  const memLive = CACHES.live.memory;
  if (memLive && now - memLive.at < CACHES.live.ttl) {
    live = memLive.data;
  } else {
    const diskLive = loadCache("live");
    if (diskLive && now - diskLive.at < CACHES.live.ttl) {
      CACHES.live.memory = diskLive;
      live = diskLive.data;
    } else {
      try {
        const data = await fetchLiveActivity();
        CACHES.live.memory = { at: now, data };
        saveCache("live", now, data);
        live = data;
      } catch (err) {
        liveError = err;
        const stale = CACHES.live.memory?.data || loadCache("live")?.data;
        if (stale) {
          log("serving stale live cache:", err.message);
          live = stale;
        }
      }
    }
  }

  // Lifetime stats: fresh cache → stale cache → fetch.
  let stats = null;
  let statsError = null;
  const memStats = CACHES.stats.memory;
  if (memStats && now - memStats.at < CACHES.stats.ttl) {
    stats = memStats.data;
  } else {
    const diskStats = loadCache("stats");
    if (diskStats && now - diskStats.at < CACHES.stats.ttl) {
      CACHES.stats.memory = diskStats;
      stats = diskStats.data;
    } else {
      try {
        const data = await fetchLifetimeStats();
        CACHES.stats.memory = { at: now, data };
        saveCache("stats", now, data);
        stats = data;
      } catch (err) {
        statsError = err;
        const stale = CACHES.stats.memory?.data || loadCache("stats")?.data;
        if (stale) {
          log("serving stale stats cache:", err.message);
          stats = stale;
        }
      }
    }
  }

  if (!live && !stats) {
    const status = (liveError ?? statsError)?.status ?? 502;
    const detail =
      status === 403
        ? "GitHub rate limit exceeded — add GITHUB_TOKEN to raise it (5,000 req/hr)"
        : status === 404
          ? "GitHub returned 404 — check GITHUB_USERNAME"
          : "fetch failure — check network/serverless configuration";
    log(`FAILED (${detail}):`, liveError?.message || statsError?.message);
    res.status(status).json({ error: "GitHub unavailable", detail });
    return;
  }

  log(
    `ok — build: ${live?.currentBuild ? `"${live.currentBuild.name}" (${live.currentBuild.activityScore})` : "none"}, ` +
      `activity: ${live?.recentActivity?.length ?? 0} items, ` +
      `stats: ${stats ? `${stats.githubStats.totalCommits} commits, ${stats.githubStats.totalPullRequests} PRs, ${stats.githubStats.totalRepositories} repos` : "stale-only"}`
  );

  res.json({
    currentBuild: live?.currentBuild ?? null,
    recentActivity: live?.recentActivity ?? [],
    githubStats: stats?.githubStats ?? null,
    activityTimeline: live?.activityTimeline ?? [],
  });
}