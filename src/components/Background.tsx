import styles from "./Background.module.css";

/**
 * The environment — a single quiet atmosphere behind the content:
 * one soft glow and a faint architectural grid that almost
 * disappears. No particles, no motion; the content stays in charge.
 */
export function Background() {
  return (
    <div className={styles.env} aria-hidden="true">
      <div className={styles.glow} />
      <div className={styles.grid} />
      <div className={styles.vignette} />
    </div>
  );
}