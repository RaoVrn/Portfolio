import { site } from "../data/site";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.top}>
          <p className={styles.name}>{site.name}</p>
          <p className={styles.role}>Software Engineer</p>
        </div>
        <div className={styles.bottom}>
          <p className={styles.meta}>© 2026 {site.name} · {site.location}</p>
        </div>
      </div>
    </footer>
  );
}