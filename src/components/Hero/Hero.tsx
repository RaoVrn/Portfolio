import { useRef } from "react";
import { site } from "../../data/site";
import { useScroll } from "../../lib/useScroll";
import { Reveal } from "../Reveal";
import styles from "./Hero.module.css";

const INDEX = [
  { number: "01", title: "AI Systems", description: "Building intelligent applications and AI-powered experiences." },
  { number: "02", title: "Software", description: "Designing reliable full-stack products and scalable applications." },
  { number: "03", title: "Automation", description: "Creating intelligent workflows that reduce repetitive work." },
];

export function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);

  useScroll((p) => {
    const content = contentRef.current;
    if (content) {
      content.style.transform = `translate3d(0, ${Math.min(p * 36, 36)}px, 0)`;
      content.style.opacity = String(Math.max(0, 1 - p * 1.4));
    }
  });

  return (
    <section className={styles.hero} id="top" aria-label="Introduction">
      <div className={`container ${styles.grid}`} ref={contentRef}>
        <div className={styles.left}>
          <Reveal as="p" variant="fade" delay={40} className={styles.intro}>
            Hi, I'm Varun.
          </Reveal>

          <Reveal as="p" variant="fade" delay={100} className={styles.eyebrow}>
            Software Engineer · AI & Systems
          </Reveal>

          <Reveal as="h1" variant="line" delay={180} className={styles.title}>
            Building useful software
            <br />
            and <span className={styles.accent}>intelligent systems.</span>
          </Reveal>

          <Reveal as="p" variant="rise" delay={300} className={styles.support}>
            I build full-stack applications and AI-powered tools that turn
            complex ideas into useful, reliable products.
          </Reveal>

          <Reveal as="div" variant="rise" delay={380} className={styles.actions}>
            <a href="#work" className={styles.ctaPrimary} data-magnetic>
              Explore my work
              <span aria-hidden="true">↓</span>
            </a>
            <a
              href={site.links.github}
              className={styles.ctaGhost}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
              <span aria-hidden="true">↗</span>
            </a>
          </Reveal>

          <Reveal as="div" variant="fade" delay={460} className={styles.status}>
            <p className={styles.statusHead}>
              <span className={styles.statusDot} aria-hidden="true" />
              Currently focused on
            </p>
            <p className={styles.statusAreas}>
              AI Engineering · Full-Stack Systems · Intelligent Automation
            </p>
          </Reveal>
        </div>

        <Reveal as="aside" variant="fade" delay={520} className={styles.index} aria-label="Areas of work">
          {INDEX.map((item) => (
            <div key={item.number} className={styles.indexItem}>
              <span className={styles.indexNum}>{item.number}</span>
              <div className={styles.indexMain}>
                <p className={styles.indexTitle}>{item.title}</p>
                <p className={styles.indexDesc}>{item.description}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>

      <a className={styles.scroll} href="#work" aria-label="Scroll to the work section">
        Scroll to explore
        <span aria-hidden="true">↓</span>
      </a>
    </section>
  );
}