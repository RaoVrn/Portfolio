import type { PulseStats as PulseStatsData } from "../../lib/github";
import styles from "./LiveDevelopment.module.css";

/** Compact, honest 30-day pulse counters. */
export function PulseStats({ stats }: { stats: PulseStatsData }) {
  return (
    <div className={styles.pulse} style={{ "--d": "420ms" } as React.CSSProperties}>
      <p className={styles.blockLabel}>GitHub pulse</p>
      <dl className={styles.pulseRow}>
        <div className={styles.pulseItem}>
          <dd className={styles.pulseValue}>{stats.recentCommits}</dd>
          <dt className={styles.pulseLabel}>Commits</dt>
          <span className={styles.pulsePeriod}>30d</span>
        </div>
        <div className={styles.pulseItem}>
          <dd className={styles.pulseValue}>{stats.recentPullRequests}</dd>
          <dt className={styles.pulseLabel}>Pull requests</dt>
          <span className={styles.pulsePeriod}>30d</span>
        </div>
        <div className={styles.pulseItem}>
          <dd className={styles.pulseValue}>{stats.publicRepos}</dd>
          <dt className={styles.pulseLabel}>Repositories</dt>
        </div>
      </dl>
    </div>
  );
}