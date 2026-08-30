import { useRef } from "react";
import { experience } from "../data/experience";
import { useInView } from "../lib/useInView";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import styles from "./Experience.module.css";

export function Experience() {
  const railRef = useRef<HTMLDivElement>(null);
  const inView = useInView(railRef);

  return (
    <section className={styles.section} id="experience" aria-labelledby="experience-heading">
      <div className={`container ${styles.grid}`}>
        <div className={styles.lead}>
          <SectionHeading
            index="02"
            label="Experience"
            heading={
              <>
                Where I've <em>worked.</em>
              </>
            }
            support="Three internships across research, full-stack, and agentic AI, from computer vision to developer infrastructure."
            headingId="experience-heading"
          />
        </div>

        <div ref={railRef} className={styles.timeline}>
          <span className={`${styles.rail} ${inView ? styles.railOn : ""}`} aria-hidden="true" />
          {experience.map((e, i) => (
            <Reveal as="article" variant="rise" delay={i * 90} key={e.company} className={styles.entry}>
              <span className={styles.node} aria-hidden="true" />
              <div className={styles.entryBody}>
                <p className={styles.period}>{e.period}</p>
                <h3 className={styles.company}>{e.company}</h3>
                <p className={styles.role}>{e.role}</p>
                <p className={styles.focus}>{e.focus}</p>
                {e.flow && (
                  <p className={styles.flow} aria-label="Architecture flow">
                    {e.flow.map((step, j) => (
                      <span key={step}>
                        {step}
                        {j < (e.flow?.length ?? 0) - 1 && (
                          <span className={styles.flowArrow} aria-hidden="true">→</span>
                        )}
                      </span>
                    ))}
                  </p>
                )}
                <p className={styles.tech}>{e.tags.join(" · ")}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}