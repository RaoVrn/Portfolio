import { site } from "../data/site";
import { Reveal } from "./Reveal";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer} id="contact">
      <div className={`container ${styles.inner}`}>
        <Reveal as="h2" variant="line" delay={80} className={styles.heading}>
          Let's build something <span className={styles.outlineWord}>together</span>.
        </Reveal>

        <Reveal as="div" variant="rise" delay={200} className={styles.emailWrap}>
          <a className={styles.email} href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </Reveal>

        <Reveal as="div" variant="rise" delay={300} className={styles.links}>
          <a href={site.links.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <span aria-hidden="true">·</span>
          <a href={site.links.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <span aria-hidden="true">·</span>
          <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
        </Reveal>

        <Reveal as="div" variant="fade" delay={420} className={styles.bottom}>
          <span>© 2026 {site.name}</span>
          <span>{site.location}</span>
          <span className={styles.colophon}>Designed and built by hand</span>
        </Reveal>
      </div>
    </footer>
  );
}