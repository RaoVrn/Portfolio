import { certifications } from "../data/highlights";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import styles from "./Certifications.module.css";

export function Certifications() {
  return (
    <section className={styles.section} id="certifications" aria-labelledby="certifications-heading">
      <div className="container">
        <SectionHeading
          index="06"
          label="Certifications"
          heading={
            <>
              Formal <em>validation.</em>
            </>
          }
          support="Credentials earned through official programs."
          headingId="certifications-heading"
        />

        <div className={styles.grid}>
          {certifications.map((c, i) => (
            <Reveal as="article" variant="rise" delay={i * 80} key={c.name}>
              <div className={styles.card}>
                <h3 className={styles.name}>{c.name}</h3>
                <p className={styles.issuer}>{c.issuer}</p>
                {c.courses && (
                  <ul className={styles.courses}>
                    {c.courses.map((course) => (
                      <li key={course} className={styles.course}>{course}</li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}