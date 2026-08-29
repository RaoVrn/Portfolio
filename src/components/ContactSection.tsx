import { useEffect, useRef, useState } from "react";
import { site, contactMailto } from "../data/site";
import { Reveal } from "./Reveal";
import { ContactModal } from "./ContactModal";
import { SectionHeader } from "./SectionHeader";
import styles from "./ContactSection.module.css";

const INTERESTS = [
  {
    number: "01",
    title: "AI Engineering",
    description: "Building intelligent applications and agentic systems.",
  },
  {
    number: "02",
    title: "Software Engineering",
    description: "Creating useful, reliable, full-stack products.",
  },
  {
    number: "03",
    title: "Data & Platform Systems",
    description: "Working with data, infrastructure, and scalable systems.",
  },
  {
    number: "04",
    title: "Interesting Problems",
    description: "Exploring ideas where technology can create real value.",
  },
];

interface ContactSectionProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export function ContactSection({ open, onOpen, onClose }: ContactSectionProps) {
  const [active, setActive] = useState(-1);
  const [indicatorTop, setIndicatorTop] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list || active < 0) return;
    const item = list.querySelectorAll("li")[active] as HTMLElement | undefined;
    setIndicatorTop(item ? item.offsetTop : 0);
  }, [active]);

  return (
    <section className={styles.section} id="contact" aria-labelledby="contact-heading">
      <div className={`container ${styles.inner}`}>
        <SectionHeader
          label="Let's talk"
          heading="Let's build something useful."
          support="Have an opportunity, an idea, or a problem worth solving? I'd be happy to connect."
          headingId="contact-heading"
        />

        <div className={styles.grid}>
          <div className={styles.primary}>
            <Reveal as="div" variant="rise" delay={140}>
              <button
                type="button"
                className={styles.cta}
                onClick={onOpen}
                data-magnetic
              >
                Start a conversation
                <span aria-hidden="true">↗</span>
              </button>
            </Reveal>

            <Reveal as="div" variant="rise" delay={240} className={styles.rows}>
              <a className={styles.row} href={contactMailto}>
                <span className={styles.rowLabel}>Email</span>
                <span className={styles.rowValue}>{site.email}</span>
                <span className={styles.rowArrow} aria-hidden="true">↗</span>
              </a>

              <a className={styles.row} href={site.links.linkedin} target="_blank" rel="noreferrer">
                <span className={styles.rowLabel}>LinkedIn</span>
                <span className={styles.rowValue}>View profile</span>
                <span className={styles.rowArrow} aria-hidden="true">↗</span>
              </a>

              <a className={styles.row} href={site.links.github} target="_blank" rel="noreferrer">
                <span className={styles.rowLabel}>GitHub</span>
                <span className={styles.rowValue}>Explore projects</span>
                <span className={styles.rowArrow} aria-hidden="true">↗</span>
              </a>
            </Reveal>
          </div>

          <Reveal as="div" variant="rise" delay={200} className={styles.interests}>
            <p className={styles.interestsLabel}>Currently interested in</p>
            <ul
              ref={listRef}
              className={styles.interestList}
              onMouseLeave={() => setActive(-1)}
            >
              <span
                className={`${styles.indicator} ${active >= 0 ? styles.indicatorOn : ""}`}
                style={{ transform: `translateY(${indicatorTop}px)` }}
                aria-hidden="true"
              />
              {INTERESTS.map((item, i) => (
                <li
                  key={item.number}
                  className={styles.interest}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                >
                  <span className={styles.interestNum}>{item.number}</span>
                  <div className={styles.interestMain}>
                    <h3 className={styles.interestTitle}>{item.title}</h3>
                    <p className={styles.interestDesc}>{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      <ContactModal open={open} onClose={onClose} />
    </section>
  );
}