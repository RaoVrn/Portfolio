import { useState } from "react";
import { formatShortDate, type TimelineDay } from "../../lib/github";
import styles from "./LiveDevelopment.module.css";

const TYPE_TEXT: Record<TimelineDay["type"], (count: number) => string> = {
  commits: (count) => `${count} commit${count === 1 ? "" : "s"}`,
  push: () => "Push activity",
  pr: (count) => `${count} pull request${count === 1 ? "" : "s"}`,
};

export function ActivityTimeline({ days }: { days: TimelineDay[] }) {
  const [tip, setTip] = useState<{ x: number; y: number; day: TimelineDay } | null>(null);

  return (
    <div className={styles.timeline} style={{ "--d": "540ms" } as React.CSSProperties}>
      <p className={styles.blockLabel}>Activity timeline</p>
      <div className={styles.nodes} role="list" aria-label="Recent GitHub activity">
        {days.map((day, i) => (
          <button
            key={`${day.date}-${i}`}
            type="button"
            role="listitem"
            className={styles.node}
            style={{ opacity: 0.4 + 0.6 * ((i + 1) / days.length) }}
            aria-label={`${formatShortDate(day.date)}, ${day.repo ?? "unknown"}, ${TYPE_TEXT[day.type](day.count)}`}
            onPointerEnter={(e) => setTip({ x: e.currentTarget.offsetLeft + 8, y: e.currentTarget.offsetTop, day })}
            onPointerLeave={() => setTip(null)}
            onFocus={() => setTip(null)}
          >
            <span className={styles.nodeCore} />
          </button>
        ))}
      </div>
      {tip && (
        <div
          className={styles.nodeTip}
          style={{ left: Math.min(tip.x, 220), top: tip.y + 26 }}
          role="status"
        >
          <span className={styles.nodeTipDate}>{formatShortDate(tip.day.date)}</span>
          <span className={styles.nodeTipRepo}>{tip.day.repo}</span>
          <span className={styles.nodeTipType}>{TYPE_TEXT[tip.day.type](tip.day.count)}</span>
        </div>
      )}
    </div>
  );
}