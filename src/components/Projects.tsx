import { ArrowUpRight, GitBranch } from "lucide-react";
import { featuredProject, selectedProjects } from "../data/projects";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import styles from "./Projects.module.css";

export function Projects() {
  return (
    <section className={styles.section} id="projects" aria-labelledby="projects-heading">
      <div className="container">
        <SectionHeading
          index="03"
          label="Projects"
          heading={
            <>
              Work that <em>ships.</em>
            </>
          }
          support="Selected projects, each one built, deployed, and maintained in public."
          headingId="projects-heading"
        />

        <Reveal as="article" variant="rise" delay={100} className={styles.featuredWrap}>
          <FeaturedProject />
        </Reveal>

        <div className={styles.grid}>
          {selectedProjects.map((p, i) => (
            <Reveal as="article" variant="rise" delay={i * 70} key={p.id}>
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.item}
                aria-label={`${p.name} on GitHub`}
              >
                <p className={styles.itemMeta}>
                  <span>{p.category}</span>
                  <span className={styles.itemYear}>{p.year}</span>
                </p>
                <h3 className={styles.itemName}>{p.name}</h3>
                <p className={styles.itemDesc}>{p.description}</p>
                <span className={styles.itemLink}>
                  GitHub
                  <ArrowUpRight size={12} aria-hidden="true" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedProject() {
  return (
    <div className={styles.featured}>
      <div className={styles.featuredInfo}>
        <p className={styles.featuredMeta}>
          <span>{featuredProject.category}</span>
          <span className={styles.featuredYear}>{featuredProject.year}</span>
        </p>
        <h3 className={styles.featuredName}>{featuredProject.name}</h3>
        <p className={styles.featuredDesc}>{featuredProject.description}</p>
        <p className={styles.featuredTech}>{featuredProject.tags?.join(" · ")}</p>
        <div className={styles.featuredLinks}>
          {featuredProject.github && (
            <a
              href={featuredProject.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkPrimary}
            >
              <GitBranch size={14} aria-hidden="true" />
              Source
            </a>
          )}
          {featuredProject.live && (
            <a
              href={featuredProject.live}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkGhost}
            >
              Live demo
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>

      {featuredProject.image && (
        <a
          href={featuredProject.live ?? featuredProject.github}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.featuredMedia}
          aria-label={`Open ${featuredProject.name}`}
        >
          <img
            src={featuredProject.image.src}
            alt={featuredProject.image.alt}
            className={styles.featuredImg}
            loading="lazy"
          />
        </a>
      )}
    </div>
  );
}