import { certifications, highlights } from "../data/highlights";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import styles from "./HighlightsSection.module.css";

export function HighlightsSection() {
  return (
    <section className={styles.section} aria-labelledby="highlights-heading">
      <div className={`container ${styles.inner}`}>
        <SectionHeader
          className={styles.header}
          label="Highlights"
          heading="Selected milestones."
          support="A few milestones from competitions, projects, and continuous learning."
          headingId="highlights-heading"
        />

        <div className={styles.content}>
          <ol className={styles.list}>
            {highlights.map((h, i) => (
              <Reveal as="li" variant="rise" delay={60 + i * 50} key={h.id}>
                <div className={`${styles.row} ${h.featured ? styles.rowFeatured : ""}`}>
                  <span className={styles.num} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className={styles.main}>
                    <h3 className={`${styles.ranking} ${h.featured ? styles.rankingFeatured : ""}`}>
                      {h.ranking}
                    </h3>
                    <p className={styles.event}>{h.event}</p>
                    {h.project && (
                      <p className={styles.project}>
                        {h.project}
                        {h.detail && <span className={styles.detail}> · {h.detail}</span>}
                      </p>
                    )}
                  </div>

                  <p className={styles.date}>{h.date}</p>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal as="div" variant="rise" delay={120} className={styles.certs}>
            <p className={styles.certsLabel}>Certifications</p>
            <ul className={styles.certList}>
              {certifications.map((c) => (
                <li key={c.name} className={styles.cert}>
                  <div className={styles.certMain}>
                    <p className={styles.certName}>{c.name}</p>
                    {c.courses && (
                      <p className={styles.certCourses}>{c.courses.join(" · ")}</p>
                    )}
                  </div>
                  <p className={styles.certIssuer}>{c.issuer}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}