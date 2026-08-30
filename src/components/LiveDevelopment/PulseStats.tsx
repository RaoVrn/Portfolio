/** Compact lifetime GitHub totals. */
import type { GithubStats } from "../../lib/github";
import styles from "./LiveDevelopment.module.css";

export function PulseStats({ stats }: { stats: GithubStats }) {
  return (
    <div className={styles.pulse} style={{ "--d": "420ms" } as React.CSSProperties}>
      <p className={styles.blockLabel}>GitHub pulse</p>
      <dl className={styles.pulseRow}>
        <div className={styles.pulseItem}>
          <dd className={styles.pulseValue}>{stats.totalCommits ?? "\u2014"}</dd>
          <dt className={styles.pulseLabel}>Total commits</dt>
        </div>
        <div className={styles.pulseItem}>
          <dd className={styles.pulseValue}>{stats.totalPullRequests ?? "\u2014"}</dd>
          <dt className={styles.pulseLabel}>Pull requests</dt>
        </div>
        <div className={styles.pulseItem}>
          <dd className={styles.pulseValue}>{stats.totalRepositories}</dd>
          <dt className={styles.pulseLabel}>Repositories</dt>
        </div>
      </dl>
    </div>
  );
}