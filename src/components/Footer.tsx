import { ArrowUpRight } from "lucide-react";
import { site } from "../data/site";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.top}>
          <p className={styles.name}>{site.name}</p>
          <p className={styles.role}>Software Engineer · Building with AI</p>

          <div className={styles.socials}>
            <a href={site.links.github} target="_blank" rel="noopener noreferrer" className={styles.social}>
              GitHub <ArrowUpRight size={12} aria-hidden="true" />
            </a>
            <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className={styles.social}>
              LinkedIn <ArrowUpRight size={12} aria-hidden="true" />
            </a>
            <a href={`mailto:${site.email}`} className={styles.social}>
              Email <ArrowUpRight size={12} aria-hidden="true" />
            </a>
          </div>
        </div>

        <p className={styles.meta}>© 2026 {site.name} · {site.location}</p>
      </div>
    </footer>
  );
}