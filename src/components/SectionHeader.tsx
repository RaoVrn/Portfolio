import { Reveal } from "./Reveal";
import styles from "./SectionHeader.module.css";

interface SectionHeaderProps {
  label: string;
  heading: string;
  support?: string;
  headingId?: string;
  /** "statement" for the one personal moment (About). */
  size?: "default" | "statement";
  className?: string;
}

/**
 * The portfolio's one heading system: accent line + uppercase label,
 * main heading below, optional one-line description.
 */
export function SectionHeader({
  label,
  heading,
  support,
  headingId,
  size = "default",
  className,
}: SectionHeaderProps) {
  return (
    <header className={className}>
      <Reveal as="p" variant="fade" className={styles.label}>
        {label}
      </Reveal>
      <Reveal
        as="h2"
        variant="line"
        delay={60}
        className={`${styles.heading} ${size === "statement" ? styles.headingStatement : ""}`}
        id={headingId}
      >
        {heading}
      </Reveal>
      {support && (
        <Reveal as="p" variant="rise" delay={160} className={styles.support}>
          {support}
        </Reveal>
      )}
    </header>
  );
}