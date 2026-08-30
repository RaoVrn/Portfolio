/**
 * Client-side access to the live GitHub feed. All fetching happens
 * server-side (server/github.js → GitHub API, cached 30 min); this
 * module only defines the sanitized contract and the /api call.
 */

export interface CurrentBuild {
  name: string;
  description: string;
  language: string;
  updatedAt: string;
  url: string;
  /** Debugging: why this repo won (not displayed in the UI). */
  selectionReason: string;
  activityScore: number;
}

export type ActivityType = "commit" | "push" | "pr";

export interface ActivityItem {
  repo: string;
  message: string;
  type: ActivityType;
  timestamp: string;
  url: string;
}

export interface GithubStats {
  /** Lifetime commits authored, per GitHub's commit search index. */
  totalCommits: number | null;
  /** Lifetime pull requests authored, per GitHub's issue search. */
  totalPullRequests: number | null;
  /** Total meaningful repositories (forks/archived/empty excluded). */
  totalRepositories: number;
}

export interface TimelineDay {
  date: string;
  count: number;
  commits: number;
  prs: number;
  repos: string[];
}

export interface LiveDevelopmentData {
  /** Null when no repo shows meaningful recent activity. */
  currentBuild: CurrentBuild | null;
  recentActivity: ActivityItem[];
  /** Null when lifetime stats could not be computed. */
  githubStats: GithubStats | null;
  activityTimeline: TimelineDay[];
}

/** Returns null when GitHub is unreachable so the UI can fall back. */
export async function getLiveDevelopmentData(): Promise<LiveDevelopmentData | null> {
  try {
    const res = await fetch("/api/github", {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = (await res.json()) as LiveDevelopmentData & { error?: string };
    return data.error ? null : data;
  } catch {
    return null;
  }
}

/** Compact relative time: "just now", "2h ago", "yesterday", "3d ago". */
export function formatRelativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const diff = Date.now() - then;
  const MIN = 60_000;
  const HOUR = 60 * MIN;
  const DAY = 24 * HOUR;
  if (diff < MIN) return "just now";
  if (diff < HOUR) return `${Math.floor(diff / MIN)}m ago`;
  if (diff < DAY) return `${Math.floor(diff / HOUR)}h ago`;
  if (diff < 2 * DAY) return "yesterday";
  if (diff < 30 * DAY) return `${Math.floor(diff / DAY)}d ago`;
  return new Date(then).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

/** Full date for timeline tooltips: "Aug 28, 2026". */
export function formatShortDate(iso: string): string {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  const date = new Date(y, (m ?? 1) - 1, d ?? 1);
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}
import { useEffect, useState } from "react";

export interface LiveDevelopmentState {
  data: LiveDevelopmentData | null;
  /** True once the first fetch attempt has finished. */
  loaded: boolean;
  /** When the latest data was received (for the sync indicator). */
  syncedAt: number | null;
}

/**
 * Single source of live GitHub data for the UI. Fetches on mount,
 * polls every `refreshMs` (60s) while the tab is visible, keeps the
 * previous data visible while refreshing, and never clears data on
 * failure — a failed poll just retries on the next tick.
 */
export function useLiveDevelopment(refreshMs = 60_000): LiveDevelopmentState {
  const [data, setData] = useState<LiveDevelopmentData | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [syncedAt, setSyncedAt] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    let timer = 0;

    const load = async () => {
      const d = await getLiveDevelopmentData();
      if (cancelled) return;
      if (d) {
        setData(d);
        setSyncedAt(Date.now());
      }
      setLoaded(true);
    };

    load();
    timer = window.setInterval(() => {
      if (document.visibilityState === "visible") load();
    }, refreshMs);
    const onVisibility = () => {
      if (document.visibilityState === "visible") load();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [refreshMs]);

  return { data, loaded, syncedAt };
}
