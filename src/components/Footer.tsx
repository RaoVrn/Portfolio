import { site } from "../data/site";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.left}>© 2026 {site.name}</p>
        <p className={styles.middle}>Designed and built with curiosity.</p>
        <a className={styles.top} href="#top">
          Back to top
          <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );
}