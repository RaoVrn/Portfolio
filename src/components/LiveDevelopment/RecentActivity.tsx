import { ArrowUpRight } from "lucide-react";
import { formatRelativeTime, type ActivityItem } from "../../lib/github";
import styles from "./LiveDevelopment.module.css";

export function RecentActivity({ items }: { items: ActivityItem[] }) {
  return (
    <div className={styles.activity}>
      <p className={styles.blockLabel}>Recent activity</p>
      <ul className={styles.activityList}>
        {items.map((item, i) => (
          <li key={`${item.repo}-${item.timestamp}`} style={{ "--d": `${220 + i * 110}ms` } as React.CSSProperties}>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.activityRow}
              aria-label={`${item.repo}: ${item.message}`}
            >
              <span className={styles.activityDot} aria-hidden="true" />
              <span className={styles.activityBody}>
                <span className={styles.activityRepo}>{item.repo}</span>
                <span className={styles.activityMsg}>
                  {item.type === "pr" ? "Pull Request · " : "Commit · "}
                  {item.message}
                </span>
              </span>
              <span className={styles.activityTime}>{formatRelativeTime(item.timestamp)}</span>
              <ArrowUpRight className={styles.activityArrow} size={12} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}