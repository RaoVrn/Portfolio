import { highlights } from "../data/highlights";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import styles from "./Achievements.module.css";

export function Achievements() {
  return (
    <section className={styles.section} id="achievements" aria-labelledby="achievements-heading">
      <div className="container">
        <SectionHeading
          index="04"
          label="Achievements"
          heading={
            <>
              Recognized in <em>competition.</em>
            </>
          }
          support="Hackathons and global challenges, with results verified against the events."
          headingId="achievements-heading"
        />

        <ol className={styles.list}>
          {highlights.map((h, i) => (
            <Reveal as="li" variant="rise" delay={i * 60} key={h.id}>
              <div className={styles.row}>
                <p className={styles.rank}>{h.ranking}</p>
                <div className={styles.info}>
                  <h3 className={styles.event}>{h.event}</h3>
                  {(h.project || h.detail) && (
                    <p className={styles.detail}>
                      {h.project && <span className={styles.project}>{h.project}</span>}
                      {h.detail && <span className={styles.detailText}>{h.detail}</span>}
                    </p>
                  )}
                </div>
                <p className={styles.date}>{h.date}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}