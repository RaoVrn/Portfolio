import { useEffect, useRef, useState } from "react";
import { chapters, site } from "../data/site";
import styles from "./Header.module.css";

const SECTION_NAV: Record<string, string> = {
  work: "work",
  index: "journey",
  contact: "contact",
};

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 16);

        const probe = 0.45 * window.innerHeight;
        let current = "";
        for (const id of ["work", "index", "contact"]) {
          const el = document.getElementById(id);
          if (!el) continue;
          const r = el.getBoundingClientRect();
          if (r.top <= probe && r.bottom > probe) {
            current = id;
            break;
          }
        }
        setActive(SECTION_NAV[current] ?? "");
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const raf = requestAnimationFrame(() => firstLinkRef.current?.focus());

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const dialog = document.getElementById("mobile-menu");
      if (!dialog) return;
      const focusables = dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previouslyFocused?.focus();
    };
  }, [menuOpen]);

  const navLinks = chapters.filter((c) => c.id !== "contact");

  return (
    <>
      <header
        className={`${styles.header} ${scrolled || menuOpen ? styles.scrolled : ""} ${menuOpen ? styles.menuRaised : ""}`}
      >
        <div className={`container ${styles.inner}`}>
          <a href="#top" className={styles.wordmark} aria-label="Varun Prakash — home">
            {site.name}
          </a>

          <div className={styles.right}>
            <nav aria-label="Primary" className={styles.nav}>
              <ul className={styles.links}>
                {navLinks.map((c) => (
                  <li key={c.id}>
                    <a
                      className={`${styles.link} ${active === c.id ? styles.linkActive : ""}`}
                      href={`#${c.id}`}
                      aria-current={active === c.id ? "true" : undefined}
                    >
                      {c.title}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    className={`${styles.link} ${active === "contact" ? styles.linkActive : ""}`}
                    href="#contact"
                    aria-current={active === "contact" ? "true" : undefined}
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </nav>

            <a className={styles.contact} href={`mailto:${site.email}`}>
              Let's talk
            </a>

            <button
              className={styles.menuButton}
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <span className={styles.menuBar} />
              <span className={styles.menuBar} />
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`${styles.menu} ${menuOpen ? styles.menuOpen : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile">
          <ul className={styles.menuLinks}>
            {chapters.map((c, i) => (
              <li key={c.id}>
                <a
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={`#${c.id}`}
                  onClick={() => setMenuOpen(false)}
                  className={styles.menuLink}
                >
                  <span className={styles.menuNum}>{c.n}</span>
                  {c.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.menuFooter}>
          <a className={styles.menuEmail} href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <div className={styles.menuMeta}>
            <a href={site.links.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <span aria-hidden="true">·</span>
            <a href={site.links.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <span aria-hidden="true">·</span>
            <span>{site.location}</span>
          </div>
        </div>
      </div>
    </>
  );
}