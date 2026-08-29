import styles from "./ProjectMotif.module.css";

const STROKE = "rgba(132, 128, 122, 0.45)";
const SAGE = "rgba(138, 174, 148, 0.8)";

/** Small abstract motifs that give each project its own signal. */
export function ProjectMotif({ kind }: { kind: "risk" | "rentease" | "aura" }) {
  if (kind === "risk") {
    return (
      <svg className={styles.svg} viewBox="0 0 200 64" role="img" aria-label="Signal streams">
        <path d="M4 20 C 30 14, 44 26, 62 20 S 96 14, 116 20 S 152 26, 196 16" fill="none" stroke={STROKE} strokeWidth="1.5" />
        <path d="M4 32 C 26 26, 42 40, 62 32 S 98 24, 122 32 S 158 40, 196 30" fill="none" stroke={SAGE} strokeWidth="1.5" />
        <path d="M4 46 C 28 52, 48 40, 68 46 S 100 52, 122 46 S 156 40, 196 48" fill="none" stroke={STROKE} strokeWidth="1.5" />
        <circle cx="196" cy="30" r="3.5" fill={SAGE} />
      </svg>
    );
  }

  if (kind === "rentease") {
    return (
      <svg className={styles.svg} viewBox="0 0 200 64" role="img" aria-label="Organized stacks">
        <rect x="12" y="34" width="44" height="8" rx="2" fill={STROKE} />
        <rect x="12" y="20" width="44" height="8" rx="2" fill={STROKE} />
        <rect x="72" y="34" width="56" height="8" rx="2" fill={STROKE} />
        <rect x="72" y="20" width="56" height="8" rx="2" fill={SAGE} />
        <rect x="144" y="34" width="40" height="8" rx="2" fill={STROKE} />
        <rect x="144" y="20" width="40" height="8" rx="2" fill={STROKE} />
      </svg>
    );
  }

  return (
    <svg className={styles.svg} viewBox="0 0 200 64" role="img" aria-label="Command to action">
      <path d="M8 32 H 120" stroke={STROKE} strokeWidth="1.5" strokeDasharray="4 4" />
      <path d="M120 32 L 132 32" stroke={SAGE} strokeWidth="1.5" />
      <path d="M132 20 V 44" stroke={SAGE} strokeWidth="1.5" />
      <circle cx="132" cy="16" r="3" fill={SAGE} />
      <circle cx="132" cy="48" r="3" fill={SAGE} />
      <circle cx="176" cy="32" r="4" fill={SAGE} />
    </svg>
  );
}