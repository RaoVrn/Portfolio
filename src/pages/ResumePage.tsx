import { ArrowUpRight } from "lucide-react";
import { resume, resumePdfUrl } from "../data/resume";
import { Reveal } from "../components/Reveal";
import styles from "./ResumePage.module.css";

/**
 * Dedicated /resume page — a structured online resume document.
 * Narrow document width, professional hierarchy, real contact links.
 */
export function ResumePage() {
  return (
    <main className={styles.page} id="main">
      <div className={`container ${styles.inner}`}>
        <header className={styles.head}>
          <div className={styles.headMain}>
            <h1 className={styles.name}>{resume.name}</h1>
            <p className={styles.title}>{resume.title}</p>
            <ul className={styles.contacts}>
              <li>
                <a href={resume.contacts.phone.href} className={styles.contact}>
                  {resume.contacts.phone.label}
                </a>
              </li>
              <li>
                <a href={resume.contacts.email.href} className={styles.contact}>
                  {resume.contacts.email.label}
                </a>
              </li>
              <li>
                <a href={resume.contacts.linkedin.href} target="_blank" rel="noopener noreferrer" className={styles.contact}>
                  {resume.contacts.linkedin.label}
                  <ArrowUpRight size={11} aria-hidden="true" />
                </a>
              </li>
              <li>
                <a href={resume.contacts.github.href} target="_blank" rel="noopener noreferrer" className={styles.contact}>
                  {resume.contacts.github.label}
                  <ArrowUpRight size={11} aria-hidden="true" />
                </a>
              </li>
              <li>
                <span className={styles.location}>{resume.location}</span>
              </li>
            </ul>
          </div>

          <a
            href={resumePdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.pdfBtn}
          >
            View Resume PDF
            <ArrowUpRight size={13} aria-hidden="true" />
          </a>
        </header>

        <section className={styles.section}>
          <h2 className={styles.title}>Experience</h2>
          <div className={styles.list}>
            {resume.experience.map((exp, i) => (
              <Reveal as="article" variant="rise" delay={i * 40} key={exp.company + exp.period} className={styles.entry}>
                <div className={styles.entryHead}>
                  <div>
                    <h3 className={styles.entryRole}>{exp.role}</h3>
                    <p className={styles.entryCompany}>{exp.company}</p>
                  </div>
                  <p className={styles.entryPeriod}>{exp.period}</p>
                </div>
                <ul className={styles.bullets}>
                  {exp.bullets.map((b) => (
                    <li key={b} className={styles.bullet}>{b}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.title}>Technical Skills</h2>
          <div className={styles.skilllines}>
            {resume.skillGroups.map((group) => (
              <div key={group.label} className={styles.skillLine}>
                <p className={styles.skillLabel}>{group.label}</p>
                <p className={styles.skillItems}>{group.items}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.title}>Projects</h2>
          <div className={styles.list}>
            {resume.projects.map((proj, i) => (
              <Reveal as="article" variant="rise" delay={i * 40} key={proj.name} className={styles.entry}>
                <div className={styles.entryHead}>
                  <h3 className={styles.entryRole}>{proj.name}</h3>
                  <p className={styles.entryPeriod}>{proj.meta}</p>
                </div>
                <ul className={styles.bullets}>
                  {proj.bullets.map((b) => (
                    <li key={b} className={styles.bullet}>{b}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.title}>Education</h2>
          <div className={styles.eduRow}>
            <div>
              <p className={styles.eduSchool}>{resume.education.school}</p>
              <p className={styles.eduDegree}>{resume.education.degree}</p>
            </div>
            <p className={styles.eduMeta}>
              {resume.education.period} &nbsp;·&nbsp; CGPA: {resume.education.cgpa} &nbsp;·&nbsp; {resume.education.location}
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.title}>Achievements</h2>
          <ul className={styles.achievements}>
            {resume.achievements.map((a, i) => (
              <Reveal as="li" variant="rise" delay={i * 30} key={a.event} className={styles.achievement}>
                <span className={styles.achievementEvent}>{a.event}</span>
                <span className={styles.achievementResult}>{a.result}</span>
                <span className={styles.achievementDate}>{a.date}</span>
              </Reveal>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.title}>Certifications</h2>
          <ul className={styles.certs}>
            {resume.certifications.map((c) => (
              <li key={c.title} className={styles.cert}>
                {c.title}
                <span className={styles.certMeta}>{c.issuer}</span>
              </li>
            ))}
          </ul>
          <p className={styles.certNote}>All certifications completed in 2024.</p>
          <a href="/#certifications" className={styles.certLink}>
            View credentials
            <ArrowUpRight size={12} aria-hidden="true" />
          </a>
        </section>
      </div>
    </main>
  );
}