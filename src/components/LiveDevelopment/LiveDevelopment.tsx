import { useEffect, useState } from "react";
import { getLiveDevelopmentData, type LiveDevelopmentData } from "../../lib/github";
import { ActivityTimeline } from "./ActivityTimeline";
import { FeaturedProject } from "./FeaturedProject";
import { PulseStats } from "./PulseStats";
import { RecentActivity } from "./RecentActivity";
import styles from "./LiveDevelopment.module.css";

type Status = "loading" | "live" | "offline";

export function LiveDevelopment() {
  const [status, setStatus] = useState<Status>("loading");
  const [data, setData] = useState<LiveDevelopmentData | null>(null);

  useEffect(() => {
    let cancelled = false;
    getLiveDevelopmentData().then((d) => {
      if (cancelled) return;
      if (d) {
        setData(d);
        setStatus("live");
      } else {
        setStatus("offline");
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <p className={styles.liveLabel}>
          <span className={styles.liveDot} aria-hidden="true" />
          Live development
        </p>
        <p className={styles.sync}>
          {status === "live" ? "Synced with GitHub" : status === "offline" ? "GitHub offline" : "Loading"}
        </p>
      </div>

      {status === "loading" ? (
        <Skeleton />
      ) : status === "live" && data ? (
        <>
          {data.currentBuild ? (
            <FeaturedProject repo={data.currentBuild} />
          ) : (
            <ExploringState />
          )}
          {data.recentActivity.length > 0 && <RecentActivity items={data.recentActivity} />}
          {data.githubStats && <PulseStats stats={data.githubStats} />}
          <ActivityTimeline days={data.activityTimeline} />
        </>
      ) : (
        <ExploringState offline />
      )}
    </div>
  );
}

/**
 * Shown when GitHub is offline, or when the scoring system finds no
 * meaningful recent activity. Never invents a repository.
 */
function ExploringState({ offline = false }: { offline?: boolean }) {
  return (
    <div className={styles.fallback}>
      <p className={styles.blockLabel}>Currently building</p>
      <p className={styles.fallbackTitle}>Exploring something new.</p>
      <p className={styles.fallbackSub}>
        {offline ? "GitHub activity is temporarily unavailable. Building, learning, and shipping projects." : "Building, learning, and shipping projects."}
      </p>
    </div>
  );
}

function Skeleton() {
  return (
    <div className={styles.skeleton} aria-hidden="true">
      <p className={styles.skLabel} />
      <p className={styles.skTitle} />
      <p className={styles.skLine} />
      <p className={styles.skLine} style={{ width: "60%" }} />
      <div className={styles.skRows}>
        <p className={styles.skRow} />
        <p className={styles.skRow} />
        <p className={styles.skRow} />
      </div>
      <div className={styles.skNodes}>
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i} className={styles.skNode} style={{ animationDelay: `${i * 90}ms` }} />
        ))}
      </div>
    </div>
  );
}