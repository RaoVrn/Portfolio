import { useEffect, useRef, useState } from "react";
import { AUTO_SCRIPT, INTERACTIVE_HINT, runCommand, type TermLine } from "../../data/terminal";
import styles from "./Terminal.module.css";

const reduced =
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const sleep = (ms: number, timers: number[]) =>
  new Promise<void>((resolve) => {
    timers.push(window.setTimeout(resolve, ms));
  });

const fullScript = () =>
  AUTO_SCRIPT.flatMap((s) => [{ kind: "cmd", text: s.cmd } as TermLine, ...s.out]);

/**
 * The automated introduction. Plays a short, understandable sequence
 * on its own, then waits quietly. Clicking the terminal opens a
 * minimal interactive mode.
 */
export function Terminal() {
  const [history, setHistory] = useState<TermLine[]>(() => (reduced ? fullScript() : []));
  const [typed, setTyped] = useState("");
  const [input, setInput] = useState("");
  const [ready, setReady] = useState(() => reduced);

  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timers = useRef<number[]>([]);
  const cancelled = useRef(false);
  const hinted = useRef(false);

  useEffect(() => {
    if (reduced) return;
    cancelled.current = false;

    const run = async () => {
      await sleep(500, timers.current);
      for (const step of AUTO_SCRIPT) {
        for (let i = 1; i <= step.cmd.length; i++) {
          if (cancelled.current) return;
          setTyped(step.cmd.slice(0, i));
          await sleep(34, timers.current);
        }
        if (cancelled.current) return;
        await sleep(220, timers.current);
        setHistory((h) => [...h, { kind: "cmd", text: step.cmd }]);
        setTyped("");
        await sleep(200, timers.current);
        setHistory((h) => [...h, ...step.out]);
        await sleep(520, timers.current);
      }
      if (!cancelled.current) setReady(true);
    };

    void run();
    const timersRef = timers;
    const cancelledRef = cancelled;
    return () => {
      cancelledRef.current = true;
      timersRef.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  useEffect(() => {
    const body = bodyRef.current;
    if (body) body.scrollTop = body.scrollHeight;
  }, [history, typed, input]);

  const skipToEnd = () => {
    if (ready) return;
    cancelled.current = true;
    setHistory(fullScript());
    setTyped("");
    setReady(true);
  };

  const activate = () => {
    if (!ready) skipToEnd();
    if (!hinted.current) {
      hinted.current = true;
      setHistory((h) => [...h, { kind: "out", text: INTERACTIVE_HINT }]);
    }
    inputRef.current?.focus();
  };

  const submit = () => {
    const raw = input.trim();
    setInput("");
    if (!raw) return;
    if (raw.toLowerCase() === "clear") {
      setHistory([]);
      return;
    }
    setHistory((h) => [...h, { kind: "cmd", text: raw }]);
    const out = runCommand(raw);
    if (out.length) {
      window.setTimeout(() => setHistory((h) => [...h, ...out]), 120);
    }
  };

  return (
    <div className={styles.terminal}>
      <div className={styles.header}>
        <span className={styles.controls} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className={styles.title}>varun@portfolio: ~</span>
      </div>

      <div
        className={styles.body}
        ref={bodyRef}
        role="log"
        aria-label="A short automated introduction. Click to interact."
        onClick={activate}
      >
        {history.map((line, i) => (
          <p key={i} className={line.kind === "cmd" ? styles.cmdLine : styles.outLine}>
            {line.kind === "cmd" && <span className={styles.prompt}>$ </span>}
            {line.href ? (
              <a className={styles.outLink} href={line.href} target="_blank" rel="noreferrer">
                {line.text}
              </a>
            ) : (
              <span className={line.strong ? styles.outStrong : undefined}>{line.text}</span>
            )}
          </p>
        ))}

        {!ready && (
          <p className={styles.cmdLine}>
            <span className={styles.prompt}>$ </span>
            {typed}
            <span className={styles.cursor} aria-hidden="true" />
          </p>
        )}

        {ready && (
          <p className={styles.promptLine}>
            <span className={styles.prompt}>$ </span>
            <input
              ref={inputRef}
              className={styles.input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") submit();
              }}
              aria-label="Type a command"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
            />
            {input.length === 0 && <span className={styles.cursor} aria-hidden="true" />}
          </p>
        )}
      </div>
    </div>
  );
}