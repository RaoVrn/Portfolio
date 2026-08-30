import { ArrowUpRight } from "lucide-react";
import { formatRelativeTime, type CurrentBuild } from "../../lib/github";
import styles from "./LiveDevelopment.module.css";

export function FeaturedProject({ repo }: { repo: CurrentBuild }) {
  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.featured}
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <p className={styles.blockLabel}>Currently building</p>
      <p className={styles.name}>{repo.name}</p>
      {repo.description && <p className={styles.desc}>{repo.description}</p>}
      <div className={styles.meta}>
        <span className={styles.lang}>
          <span className={styles.metaDot} aria-hidden="true" />
          {repo.language}
        </span>
        <span className={styles.time}>Updated {formatRelativeTime(repo.updatedAt)}</span>
      </div>
      <span className={styles.arrow}>
        View on GitHub
        <ArrowUpRight size={12} aria-hidden="true" />
      </span>
    </a>
  );
}