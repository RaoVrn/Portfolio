import { useEffect, useRef } from "react";
import { site } from "../../data/site";
import { useScroll } from "../../lib/useScroll";
import { Reveal } from "../Reveal";
import styles from "./Hero.module.css";

const BASE_X = 14;
const BASE_Y = 10;

export function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useScroll((p) => {
    const el = contentRef.current;
    if (!el) return;
    const y = Math.min(p * 60, 60);
    el.style.transform = `translate3d(0, ${y}px, 0)`;
    el.style.opacity = String(Math.max(0, 1 - p * 1.4));
  });

  // Print-registration layer: the outline copy drifts against the cursor.
  useEffect(() => {
    const outline = outlineRef.current;
    const section = sectionRef.current;
    if (!outline || !section) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: PointerEvent) => {
      const r = section.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      outline.style.transform = `translate3d(${(BASE_X + px * -18).toFixed(2)}px, ${(BASE_Y + py * -14).toFixed(2)}px, 0)`;
    };

    const onLeave = () => {
      outline.style.transform = `translate3d(${BASE_X}px, ${BASE_Y}px, 0)`;
    };

    section.addEventListener("pointermove", onMove, { passive: true });
    section.addEventListener("pointerleave", onLeave);
    return () => {
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section className={styles.hero} id="top" aria-label="Introduction" ref={sectionRef}>
      <div className={`container ${styles.content}`} ref={contentRef}>
        <div className={styles.name}>
          <div className={styles.outline} ref={outlineRef} aria-hidden="true">
            <span className={styles.lineFirst}>{site.firstName}</span>
            <span className={styles.lineLast}>{site.lastName}</span>
          </div>

          <h1 className={styles.title}>
            <Reveal as="span" variant="line" delay={140} className={styles.lineFirst}>
              {site.firstName}
            </Reveal>
            <Reveal as="span" variant="line" delay={260} className={styles.lineLast}>
              {site.lastName}
            </Reveal>
          </h1>
        </div>

        <div className={styles.lower}>
          <Reveal as="p" variant="rise" delay={440} className={styles.statement}>
            Building software.
            <br />
            Exploring intelligent systems.
            <br />
            Learning by <span className={styles.accentWord}>shipping</span>.
          </Reveal>

          <Reveal as="div" variant="rise" delay={560} className={styles.action}>
            <a href="#index" className={styles.cta} data-magnetic>
              Explore the work
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
          </Reveal>
        </div>
      </div>

      <Reveal as="div" variant="fade" delay={720} className={styles.specs}>
        <p>Python · Generative AI · Agentic AI · NLP</p>
        <p>
          {site.location} — {site.currentRole.company}, {site.currentRole.title}
        </p>
      </Reveal>
    </section>
  );
}