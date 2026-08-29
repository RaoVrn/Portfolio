import { useRef } from "react";
import { site } from "../../data/site";
import { useScroll } from "../../lib/useScroll";
import { Reveal } from "../Reveal";
import { Terminal } from "./Terminal";
import styles from "./Hero.module.css";

export function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);

  useScroll((p) => {
    const el = contentRef.current;
    if (!el) return;
    const y = Math.min(p * 50, 50);
    el.style.transform = `translate3d(0, ${y}px, 0)`;
    el.style.opacity = String(Math.max(0, 1 - p * 1.4));
  });

  return (
    <section className={styles.hero} id="top" aria-label="Introduction">
      <div className={`container ${styles.grid}`} ref={contentRef}>
        <div className={styles.text}>
          <Reveal as="p" variant="fade" delay={60} className={styles.eyebrow}>
            Hi, I'm Varun.
          </Reveal>

          <Reveal as="h1" variant="line" delay={140} className={styles.title}>
            I build useful software
            <br />
            and AI-powered experiences.
          </Reveal>

          <Reveal as="p" variant="rise" delay={300} className={styles.support}>
            I build applications and intelligent tools that turn ideas into
            products people can actually use.
          </Reveal>

          <Reveal as="div" variant="rise" delay={400} className={styles.actions}>
            <a href="#work" className={styles.ctaPrimary} data-magnetic>
              View my work
              <svg
                viewBox="0 0 16 16"
                width="14"
                height="14"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M8 2.5v11M3.5 9 8 13.5 12.5 9" />
              </svg>
            </a>
            <a href={site.links.github} className={styles.ctaGhost} target="_blank" rel="noreferrer">
              GitHub
              <span aria-hidden="true">↗</span>
            </a>
          </Reveal>

          <Reveal as="p" variant="fade" delay={500} className={styles.focus}>
            <span className={styles.focusDot} aria-hidden="true" />
            Currently focused on AI, automation, and full-stack development.
          </Reveal>
        </div>

        <Reveal as="div" variant="fade" delay={300} className={styles.visual}>
          <Terminal />
        </Reveal>
      </div>

      <div className={styles.scroll} aria-hidden="true">
        <span className={styles.scrollLine} />
      </div>
    </section>
  );
}