import { ArrowUpRight, Mail } from "lucide-react";
import { site } from "../data/site";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import styles from "./Contact.module.css";

const MAILTO = "mailto:prakash.varun.0305@gmail.com";

export function Contact({ onOpenContact }: { onOpenContact: () => void }) {
  return (
    <section className={styles.section} id="contact" aria-labelledby="contact-heading">
      <div className={`container ${styles.grid}`}>
        <SectionHeading
          index="08"
          label="Contact"
          heading={
            <>
              Let's build something <em>together.</em>
            </>
          }
          support="Open to software engineering opportunities, collaborations, and interesting problems."
          headingId="contact-heading"
        />

        <Reveal as="div" variant="rise" delay={140} className={styles.block}>
          <a href={MAILTO} className={styles.email} aria-label={`Email ${site.email}`}>
            <Mail size={15} className={styles.emailIcon} aria-hidden="true" />
            {site.email}
            <ArrowUpRight size={14} className={styles.emailArrow} aria-hidden="true" />
          </a>

          <button type="button" className={styles.cta} onClick={onOpenContact}>
            Start a conversation
          </button>

          <div className={styles.links}>
            <a href={site.links.github} target="_blank" rel="noopener noreferrer" className={styles.link}>
              GitHub
              <ArrowUpRight size={12} aria-hidden="true" />
            </a>
            <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className={styles.link}>
              LinkedIn
              <ArrowUpRight size={12} aria-hidden="true" />
            </a>
            <span className={styles.location}>{site.location}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}