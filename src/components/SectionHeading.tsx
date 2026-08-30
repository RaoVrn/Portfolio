import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import styles from "./SectionHeading.module.css";

interface SectionHeadingProps {
  index: string;
  label: string;
  heading: ReactNode;
  support?: string;
  headingId?: string;
}

/** Mono section index + label, large serif heading, optional support line. */
export function SectionHeading({ index, label, heading, support, headingId }: SectionHeadingProps) {
  return (
    <div className={styles.wrap}>
      <Reveal as="p" variant="fade" delay={0} className={styles.eyebrow}>
        <span className={styles.index}>{index}</span>
        <span className={styles.rule} aria-hidden="true" />
        <span>{label}</span>
      </Reveal>
      <Reveal as="h2" variant="line" delay={80} className={styles.heading} id={headingId}>
        {heading}
      </Reveal>
      {support && (
        <Reveal as="p" variant="rise" delay={160} className={styles.support}>
          {support}
        </Reveal>
      )}
    </div>
  );
}