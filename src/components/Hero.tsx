import { ArrowDown, ArrowUpRight } from "lucide-react";
import { site } from "../data/site";
import { about } from "../data/about";
import { LiveDevelopment } from "./LiveDevelopment/LiveDevelopment";
import { Reveal } from "./Reveal";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} id="home" aria-label="Introduction">
      <div className={`container ${styles.grid}`}>
        <div className={styles.left}>
          <Reveal as="p" variant="fade" delay={40} className={styles.label}>
            <span className={styles.labelDot} aria-hidden="true" />
            Software Engineer · Building with AI
          </Reveal>

          <Reveal as="h1" variant="line" delay={140} className={styles.name}>
            <span className={styles.nameFirst}>Varun</span>
            <span className={styles.nameLast}>Prakash</span>
          </Reveal>

          <Reveal as="p" variant="rise" delay={280} className={styles.statement}>
            Software, AI systems, and tools that solve real problems,{" "}
            <em>from idea to production.</em>
          </Reveal>

          <Reveal as="p" variant="rise" delay={340} className={styles.desc}>
            {about.intro}
          </Reveal>

          <Reveal as="div" variant="rise" delay={420} className={styles.actions}>
            <a href="#projects" className={styles.ctaPrimary} data-magnetic>
              View work
              <ArrowDown size={14} aria-hidden="true" />
            </a>
            <a
              href={site.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaGhost}
            >
              GitHub
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
            <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className={styles.ctaQuiet}>
              LinkedIn
            </a>
          </Reveal>
        </div>

        <div className={styles.right}>
          <LiveDevelopment />
        </div>
      </div>

      <a className={styles.scroll} href="#about" aria-label="Scroll to the About section">
        <span aria-hidden="true">↓</span> Scroll
      </a>
    </section>
  );
}