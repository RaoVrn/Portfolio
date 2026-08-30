/**
 * Shared GitHub live-development handler.
 * Used by the local Express server (server/index.js) and the
 * Vercel serverless function (api/github.js) — one implementation.
 *
 * Environment variables (server-side only, never in the client):
 *   GITHUB_USERNAME        — GitHub username (defaults to RaoVrn)
 *   GITHUB_TOKEN           — optional fine-grained token; public data
 *                            works without one (rate limit 60/hr per IP)
 *   GITHUB_FEATURED_REPO   — optional manual pin; overrides auto-detection
 *                            when the repo exists on the account
 *
 * ─────────────────────────────────────────────────────────────
 * CURRENTLY-BUILDING DETECTION
 * ─────────────────────────────────────────────────────────────
 * No single timestamp decides the featured repo. Each meaningful
 * repository is scored from multiple signals:
 *
 *   WEIGHTS.recencyTiers   — age of the latest commit (or pushed_at):
 *                            ≤1d = 50, ≤7d = 38, ≤14d = 28,
 *                            ≤30d = 18, ≤60d = 8, older = 0
 *   WEIGHTS.commits7d      — +1.0 per commit in the last 7 days
 *                            (consistency beats isolated pushes)
 *   WEIGHTS.commits30d     — +0.5 per commit in the last 30 days
 *   WEIGHTS.pushEvents30d  — +6 per push event in the last 30 days
 *                            (from the public events feed)
 *   WEIGHTS.prEvents30d    — +8 per pull request event in 30 days
 *   WEIGHTS.newRepo90d     — +6 if the repository was created in the
 *                            last 90 days (early-stage projects)
 *
 * Forks, archived, and empty repositories are excluded before
 * scoring. If the top score is below MIN_ACTIVE_SCORE, no repo is
 * featured at all — the UI shows "Exploring something new."
 * rather than pretending an old repository is active.
 * ─────────────────────────────────────────────────────────────
 */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const CACHE_TTL = 30 * 60 * 1000;
const CACHE_FILE = join(dirname(fileURLToPath(import.meta.url)), ".github-cache.json");
const DAY = 24 * 60 * 60 * 1000;

const USERNAME = process.env.GITHUB_USERNAME || "RaoVrn";
const TOKEN = process.env.GITHUB_TOKEN || "";
const FEATURED = process.env.GITHUB_FEATURED_REPO || "";

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
const WINDOW_DAYS = 30; // stats + scoring window
const TIMELINE_DAYS = 14; // activity timeline span
const PROBE_REPOS = 6; // repos that get a commit probe (efficient)

let memory = { at: 0, data: null };

function log(...args) {
  console.log("[github]", ...args);
}

class GitHubError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

async function gh(path) {
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
  return res.json();
}

function loadDiskCache() {
  try {
    const raw = readFileSync(CACHE_FILE, "utf8");
    const parsed = JSON.parse(raw);
    if (parsed?.at && parsed?.data) return parsed;
  } catch {
    /* no cache yet */
  }
  return null;
}

function saveDiskCache(at, data) {
  try {
    writeFileSync(CACHE_FILE, JSON.stringify({ at, data }));
  } catch (err) {
    log("disk cache write failed:", err.message);
  }
}

const firstLine = (msg) => (msg || "Update").split("\n")[0].trim().slice(0, 72);

function isMeaningful(repo) {
  return !repo.fork && !repo.archived && repo.size > 0 && !!repo.pushed_at;
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

async function fetchLiveData() {
  const now = Date.now();
  const sinceIso = new Date(now - WINDOW_DAYS * DAY).toISOString();

  const [user, repos, events] = await Promise.all([
    gh(`/users/${USERNAME}`),
    gh(`/users/${USERNAME}/repos?sort=pushed&per_page=30&type=owner`),
    gh(`/users/${USERNAME}/events?per_page=100`),
  ]);

  const meaningful = repos.filter(isMeaningful);
  meaningful.sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime());

  // Commit probes for the most recently pushed repos (efficient: 6 requests max).
  const probes = new Map();
  for (const repo of meaningful.slice(0, PROBE_REPOS)) {
    try {
      const commits = await gh(`/repos/${USERNAME}/${repo.name}/commits?since=${sinceIso}&per_page=100`);
      probes.set(repo.name, commits);
    } catch (err) {
      log(`commit probe failed for ${repo.name}:`, err.message);
    }
  }

  // Summarize the public events feed (single request).
  const eventState = { byRepo: new Map(), totalCommits: 0, prs: 0, days: new Map() };
  for (const e of events) {
    const t = new Date(e.created_at).getTime();
    if (t < now - WINDOW_DAYS * DAY) continue;
    const repo = e.repo?.name?.split("/")[1];
    if (!repo) continue;
    const state = eventState.byRepo.get(repo) ?? { pushes: 0, prs: 0 };
    if (e.type === "PushEvent") {
      state.pushes += 1;
      eventState.totalCommits += e.payload?.size ?? 0;
    } else if (e.type === "PullRequestEvent") {
      state.prs += 1;
      eventState.prs += 1;
    }
    eventState.byRepo.set(repo, state);

    const dayKey = e.created_at.slice(0, 10);
    const day = eventState.days.get(dayKey) ?? { repos: new Map() };
    const per = day.repos.get(repo) ?? { commits: 0, prs: 0 };
    if (e.type === "PushEvent") per.commits += e.payload?.size ?? 0;
    else if (e.type === "PullRequestEvent") per.prs += 1;
    day.repos.set(repo, per);
    eventState.days.set(dayKey, day);
  }

  // Stats: commits come from the commit probes (the events feed omits sizes).
  const probedCommits = [...probes.values()].reduce((n, c) => n + c.length, 0);

  // Latest commit message per probed repo, to enrich feed messages.
  const probeLatest = new Map();
  for (const [name, commits] of probes) {
    const latest = commits[0]?.commit?.message;
    if (latest) probeLatest.set(name, firstLine(latest));
  }

  // Score every meaningful repo.
  const scored = [];
  for (const repo of meaningful) {
    const commits = probes.get(repo.name) ?? [];
    const events_ = eventState.byRepo.get(repo.name) ?? { pushes: 0, prs: 0 };
    const { score, parts, latestDate } = scoreRepository({ repo, commits, events: events_, now });
    scored.push({ repo, score, parts, latestDate });
  }
  scored.sort((a, b) => b.score - a.score);
  const best = scored[0];

  let featuredRepo = null;
  if (best && best.score >= MIN_ACTIVE_SCORE) {
    const { repo, score, parts } = best;
    featuredRepo = {
      name: repo.name,
      description: repo.description ?? "",
      url: repo.html_url,
      language: repo.language || "Unknown",
      updatedAt: best.latestDate,
      selectionReason:
        `Highest activity score (${score}): ` +
        `${parts.commits7d + parts.commits30d} commit points, ` +
        `${parts.pushEvents} push points, ${parts.prEvents} PR points` +
        `, ${repo.name} pushed ${daysBetween(now, new Date(best.latestDate).getTime()).toFixed(1)}d ago`,
      activityScore: score,
    };
  }

  // Recent activity: push/PR events from the feed, most recent first.
  const recentActivity = [];
  const seen = new Set();
  for (const e of events) {
    if (recentActivity.length >= 3) break;
    const repo = e.repo?.name?.split("/")[1];
    if (!repo || new Date(e.created_at).getTime() < now - WINDOW_DAYS * DAY) continue;
    if (e.type === "PushEvent") {
      const message =
        firstLine(e.payload?.commits?.[0]?.message) || probeLatest.get(repo) || `Push to ${e.payload?.ref ?? "branch"}`;
      const key = `${repo}-${message}`;
      if (seen.has(key)) continue;
      seen.add(key);
      recentActivity.push({ repo, message, type: "commit", timestamp: e.created_at, url: `https://github.com/${USERNAME}/${repo}` });
    } else if (e.type === "PullRequestEvent") {
      const pr = e.payload?.pull_request;
      const message = `PR: ${firstLine(pr?.title ?? "Update")}`;
      const key = `${repo}-${message}`;
      if (seen.has(key)) continue;
      seen.add(key);
      recentActivity.push({ repo, message, type: "pr", timestamp: e.created_at, url: pr?.html_url ?? `https://github.com/${USERNAME}/${repo}` });
    }
  }

  // Activity timeline: last 14 days from the events feed.
  const timeline = [];
  for (let i = TIMELINE_DAYS - 1; i >= 0; i--) {
    const dayStart = new Date(now - i * DAY);
    const key = dayStart.toISOString().slice(0, 10);
    const day = eventState.days.get(key);
    if (!day) continue;
    let bestRepo = null;
    let bestType = null;
    let bestCount = 0;
    for (const [name, per] of day.repos) {
      const commits = per.commits;
      const prs = per.prs;
      if (commits === 0 && prs === 0) continue;
      const total = commits + prs;
      if (total > bestCount) {
        bestCount = total;
        bestRepo = name;
        bestType = commits >= 3 ? "commits" : commits > 0 ? "push" : "pr";
      }
    }
    if (!bestRepo) continue;
    timeline.push({ date: key, repo: bestRepo, type: bestType, count: bestCount });
  }

  return {
    featuredRepo,
    recentActivity,
    stats: {
      recentCommits: probedCommits,
      recentPullRequests: eventState.prs,
      publicRepos: user.public_repos,
    },
    timeline,
  };
}

export async function handleGithub(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const now = Date.now();

  if (memory.data && now - memory.at < CACHE_TTL) {
    res.json(memory.data);
    return;
  }

  const disk = loadDiskCache();
  if (disk && now - disk.at < CACHE_TTL) {
    memory = disk;
    res.json(disk.data);
    return;
  }

  try {
    log(`fetching for "${USERNAME}" (token: ${TOKEN ? "configured" : "none"}, pin: ${FEATURED || "auto"})`);
    const data = await fetchLiveData();
    memory = { at: now, data };
    saveDiskCache(now, data);
    log(
      `ok — stats: ${data.stats.recentCommits} commits/30d, ${data.stats.recentPullRequests} PRs/30d, ${data.stats.publicRepos} repos; ` +
        `featured: ${data.featuredRepo ? `"${data.featuredRepo.name}" (score ${data.featuredRepo.activityScore})` : "none (below threshold)"}`
    );
    res.json(data);
  } catch (err) {
    const stale = memory.data || disk?.data;
    if (stale) {
      log("serving stale cache after failure:", err.message);
      res.json(stale);
      return;
    }
    const status = err.status ?? 502;
    const detail =
      status === 403
        ? "GitHub rate limit exceeded — add GITHUB_TOKEN to raise it (5,000 req/hr)"
        : status === 404
          ? "GitHub returned 404 — check GITHUB_USERNAME"
          : "fetch failure — check network/serverless configuration";
    log(`FAILED (${detail}):`, err.message);
    res.status(status).json({ error: "GitHub unavailable", detail });
  }
}