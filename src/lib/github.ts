/**
 * Client-side access to the live GitHub feed. All fetching happens
 * server-side (server/github.js → GitHub API, cached 30 min); this
 * module only defines the sanitized contract and the /api call.
 */

export interface FeaturedRepo {
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

export interface PulseStats {
  /** Commits in the last 30 days across the most recently pushed repos. */
  recentCommits: number;
  /** Pull request events in the last 30 days (public feed). */
  recentPullRequests: number;
  publicRepos: number;
}

export interface TimelineDay {
  date: string;
  repo: string | null;
  type: "commits" | "push" | "pr";
  count: number;
}

export interface LiveDevelopmentData {
  /** Null when no repo shows meaningful recent activity. */
  featuredRepo: FeaturedRepo | null;
  recentActivity: ActivityItem[];
  stats: PulseStats;
  timeline: TimelineDay[];
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