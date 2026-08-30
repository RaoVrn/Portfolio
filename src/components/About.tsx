import { about } from "../data/about";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import styles from "./About.module.css";

export function About() {
  return (
    <section className={styles.section} id="about" aria-labelledby="about-heading">
      <div className={`container ${styles.grid}`}>
        <div className={styles.lead}>
          <SectionHeading
            index="01"
            label="About"
            heading={
              <>
                Building <em>intelligent software</em> from idea to production.
              </>
            }
            support={about.intro}
            headingId="about-heading"
          />
        </div>

        <div className={styles.body}>
          <FocusAreas />
          <div className={styles.split}>
            <EducationBlock />
            <JourneyBlock />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----- Primary focus areas: numbered rows ----- */

function FocusAreas() {
  return (
    <div className={styles.focus}>
      <Reveal as="p" variant="fade" className={styles.blockLabel}>
        Primary focus areas
      </Reveal>
      <ol className={styles.focusList}>
        {about.focus.map((f, i) => (
          <Reveal as="li" variant="rise" delay={i * 60} key={f.number}>
            <div className={styles.focusRow}>
              <span className={styles.focusNumber}>{f.number}</span>
              <div className={styles.focusText}>
                <h3 className={styles.focusTitle}>{f.title}</h3>
                <p className={styles.focusDesc}>{f.description}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}

/* ----- Education: compact block ----- */

function EducationBlock() {
  return (
    <div className={styles.mini}>
      <Reveal as="p" variant="fade" className={styles.blockLabel}>
        Education
      </Reveal>
      <Reveal as="div" variant="rise" delay={80}>
        <p className={styles.eduSchool}>{about.education.school}</p>
        <p className={styles.eduDegree}>{about.education.degree}</p>
        <div className={styles.eduMeta}>
          <span className={styles.eduCgpa}>
            <span className={styles.eduCgpaValue}>{about.education.cgpa}</span> {about.education.cgpaUnit}
          </span>
          <span className={styles.eduDivider} aria-hidden="true" />
          <span>{about.education.years}</span>
          <span className={styles.eduDivider} aria-hidden="true" />
          <span>{about.education.location}</span>
        </div>
      </Reveal>
    </div>
  );
}

/* ----- Engineering journey: three nodes ----- */

function JourneyBlock() {
  return (
    <div className={styles.mini}>
      <Reveal as="p" variant="fade" className={styles.blockLabel}>
        Engineering journey
      </Reveal>
      <div className={styles.journey}>
        <span className={styles.journeyLine} aria-hidden="true" />
        {about.journey.map((step, i) => (
          <Reveal as="div" variant="rise" delay={60 + i * 80} key={step.year} className={styles.journeyStep}>
            <span className={styles.journeyNode} aria-hidden="true" />
            <p className={styles.journeyYear}>{step.year}</p>
            <p className={styles.journeyTitle}>{step.title}</p>
            <p className={styles.journeyDetail}>{step.detail}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}