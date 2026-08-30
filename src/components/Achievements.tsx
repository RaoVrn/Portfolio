import { ExternalLink } from "lucide-react";
import { highlights } from "../data/highlights";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import styles from "./Achievements.module.css";

/** Split a ranking string into an uppercase achievement marker. */
function splitRanking(ranking: string): { main: string; sub: string } {
  const top = /^Top (\d+)\s+of\s+(.+)$/i.exec(ranking);
  if (top) return { main: `TOP ${top[1]}`, sub: top[2].toUpperCase() };
  const runner = /^(\d)(?:st|nd|rd|th)\s+Runner-?Up$/i.exec(ranking);
  if (runner) {
    const suffix = { "1": "ST", "2": "ND", "3": "RD" }[runner[1]] ?? "TH";
    return { main: `${runner[1]}${suffix}`, sub: "RUNNER-UP" };
  }
  return { main: ranking.toUpperCase(), sub: "" };
}

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
          support="Selected results from hackathons, global challenges, and competitive builds."
          headingId="achievements-heading"
        />

        <ol className={styles.list}>
          {highlights.map((h, i) => {
            const { main, sub } = splitRanking(h.ranking);
            return (
              <Reveal as="li" variant="rise" delay={i * 50} key={h.id}>
                <div className={styles.row}>
                  <span className={styles.node} aria-hidden="true" />
                  <div className={styles.rank}>
                    <p className={styles.rankMain}>{main}</p>
                    {sub && <p className={styles.rankSub}>{sub}</p>}
                  </div>
                  <div className={styles.info}>
                    <h3 className={styles.event}>{h.event}</h3>
                    {(h.project || h.detail) && (
                      <p className={styles.meta}>
                        {h.project && <span className={styles.category}>{h.project}</span>}
                        {h.project && h.detail && <span className={styles.metaSep} aria-hidden="true" />}
                        {h.detail && <span className={styles.desc}>{h.detail}</span>}
                      </p>
                    )}
                  </div>
                  <div className={styles.right}>
                    <p className={styles.date}>{h.date}</p>
                    {h.certificate && (
                      <a
                        href={h.certificate}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.cert}
                        aria-label={`View certificate for ${h.event}`}
                      >
                        View certificate
                        <ExternalLink size={11} aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}