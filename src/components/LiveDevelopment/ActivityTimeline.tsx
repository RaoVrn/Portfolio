import { useRef, useState } from "react";
import { formatShortDate, type TimelineDay } from "../../lib/github";
import { useInView } from "../../lib/useInView";
import styles from "./LiveDevelopment.module.css";

const LABEL_SLOTS = new Set([0, 4, 9, 13]);

/** 14-day recent-activity timeline: dynamic slots, dim idle days. */
export function ActivityTimeline({ days }: { days: TimelineDay[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const [tip, setTip] = useState<{ x: number; y: number; day: TimelineDay } | null>(null);

  const hasActivity = days.some((d) => d.count > 0);
  const now = new Date();
  const todayKey = now.toISOString().slice(0, 10);

  return (
    <div ref={ref} className={styles.timeline} style={{ "--d": "540ms" } as React.CSSProperties}>
      <p className={styles.blockLabel}>Activity timeline</p>

      {!hasActivity ? (
        <p className={styles.timelineEmpty}>No recent GitHub activity</p>
      ) : (
        <>
          <div className={styles.tl}>
            <span className={`${styles.tlLine} ${inView ? styles.tlLineOn : ""}`} aria-hidden="true" />
            <div className={styles.tlSlots} role="list" aria-label="GitHub activity over the last 14 days">
              {days.map((day, i) => {
                const active = day.count > 0;
                return (
                  <div key={day.date} className={styles.tlSlot} role="listitem">
                    <button
                      type="button"
                      className={`${styles.tlNode} ${active ? styles.tlNodeActive : ""}`}
                      style={{
                        "--tl-d": `${i * 45}ms`,
                        ...(active
                          ? { width: `${6 + Math.min(day.count, 6) * 1.4}px`, height: `${6 + Math.min(day.count, 6) * 1.4}px` }
                          : {}),
                      } as React.CSSProperties}
                      aria-label={
                        active
                          ? `${formatShortDate(day.date)}, ${day.repos.join(", ")}, ${day.commits} commits, ${day.prs} pull requests`
                          : `${formatShortDate(day.date)}, no activity`
                      }
                      onPointerEnter={(e) => active && setTip({ x: e.currentTarget.offsetLeft + 10, y: e.currentTarget.offsetTop, day })}
                      onPointerLeave={() => setTip(null)}
                      onFocus={() => setTip(null)}
                    />
                    {LABEL_SLOTS.has(i) && (
                      <span className={`${styles.tlLabel} ${day.date === todayKey ? styles.tlLabelToday : ""}`}>
                        {day.date === todayKey ? "Today" : formatShortDate(day.date)}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {tip && (
            <div className={styles.nodeTip} style={{ left: Math.min(tip.x, 230), top: tip.y + 30 }} role="status">
              <span className={styles.nodeTipDate}>{formatShortDate(tip.day.date)}</span>
              <span className={styles.nodeTipRepo}>{tip.day.repos.join(" · ")}</span>
              <span className={styles.nodeTipType}>
                {tip.day.commits > 0 && `${tip.day.commits} commit${tip.day.commits === 1 ? "" : "s"}`}
                {tip.day.commits > 0 && tip.day.prs > 0 && " · "}
                {tip.day.prs > 0 && `${tip.day.prs} pull request${tip.day.prs === 1 ? "" : "s"}`}
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}