import { ArrowUpRight } from "lucide-react";
import { certifications, type Certification } from "../data/highlights";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import styles from "./Certifications.module.css";

const byIssuer = (issuer: string) => certifications.filter((c) => c.issuer === issuer);

export function Certifications() {
  return (
    <section className={styles.section} id="certifications" aria-labelledby="certifications-heading">
      <div className={`container ${styles.body}`}>
        <span className={styles.yearBackdrop} aria-hidden="true">
          2024
        </span>

        <SectionHeading
          index="06"
          label="Certifications"
          heading={
            <>
              Learning, backed by <em>proof.</em>
            </>
          }
          support="A focused collection of credentials across engineering, cloud, AI, and development."
          headingId="certifications-heading"
        />

        {/* Featured: GitHub + Oracle, side by side */}
        <div className={styles.featured}>
          {["GitHub", "Oracle"].map((issuer, i) => {
            const cert = byIssuer(issuer)[0];
            return (
              <Reveal
                as="div"
                variant="rise"
                delay={i * 60}
                key={issuer}
                className={`${styles.featuredItem} ${i > 0 ? styles.pairDivider : ""}`}
              >
                <p className={styles.issuer}>{issuer}</p>
                <CredLink cert={cert} />
              </Reveal>
            );
          })}
        </div>

        {/* NPTEL — vertical collection */}
        <ArchiveGroup name="NPTEL" meta="Academic learning · 2024">
          <ol className={styles.rows}>
            {byIssuer("NPTEL").map((cert, i) => (
              <Reveal as="li" variant="rise" delay={i * 50} key={cert.title}>
                <CredLink cert={cert} index={String(i + 1).padStart(2, "0")} row />
              </Reveal>
            ))}
          </ol>
        </ArchiveGroup>

        {/* AWS — single feature row */}
        <ArchiveGroup name="AWS Academy" meta="2024">
          <CredLink cert={byIssuer("AWS Academy")[0]} row />
        </ArchiveGroup>

        {/* Meta — a pair */}
        <ArchiveGroup name="Meta" meta="2024">
          <div className={styles.pair}>
            {byIssuer("Meta").map((cert, i) => (
              <Reveal as="div" variant="rise" delay={i * 50} key={cert.title} className={`${styles.pairItem} ${i > 0 ? styles.pairDivider : ""}`}>
                <CredLink cert={cert} index={`0${i + 1}`} row />
              </Reveal>
            ))}
          </div>
        </ArchiveGroup>
      </div>
    </section>
  );
}

function CredLink({
  cert,
  index,
  row = false,
}: {
  cert: Certification;
  index?: string;
  row?: boolean;
}) {
  return (
    <a
      href={cert.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.cred} ${row ? styles.credRow : ""}`}
      aria-label={`Open certificate: ${cert.title}`}
    >
      {index && <span className={styles.index}>{index}</span>}
      <span className={styles.credTitle}>{cert.title}</span>
      <ArrowUpRight className={styles.arrow} size={13} aria-hidden="true" />
    </a>
  );
}

function ArchiveGroup({ name, meta, children }: { name: string; meta: string; children: React.ReactNode }) {
  return (
    <div className={styles.group}>
      <p className={styles.groupLabel}>
        <span className={styles.groupName}>{name}</span>
        <span className={styles.groupMeta}>{meta}</span>
      </p>
      {children}
    </div>
  );
}