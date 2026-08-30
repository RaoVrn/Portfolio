import { ArrowUpRight } from "lucide-react";
import { site } from "../data/site";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import styles from "./Contact.module.css";

export function Contact({ onOpenContact }: { onOpenContact: () => void }) {
  return (
    <section className={styles.section} id="contact" aria-labelledby="contact-heading">
      <div className="container">
        <SectionHeading
          index="07"
          label="Contact"
          heading={
            <>
              Let's build something <em>together.</em>
            </>
          }
          support="Open to internships, collaborations, and interesting problems. I usually reply within a day."
          headingId="contact-heading"
        />

        <Reveal as="div" variant="rise" delay={140} className={styles.body}>
          <a href={`mailto:${site.email}`} className={styles.email}>
            {site.email}
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>

          <div className={styles.actions}>
            <button type="button" className={styles.cta} onClick={onOpenContact} data-magnetic>
              Start a conversation
            </button>
            <a
              href={site.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              GitHub
              <ArrowUpRight size={12} aria-hidden="true" />
            </a>
            <a
              href={site.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              LinkedIn
              <ArrowUpRight size={12} aria-hidden="true" />
            </a>
          </div>

          <p className={styles.meta}>{site.location}</p>
        </Reveal>
      </div>
    </section>
  );
}