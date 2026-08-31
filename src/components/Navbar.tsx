import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { site } from "../data/site";
import styles from "./Navbar.module.css";

const NAV = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "arsenal", label: "Arsenal" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

const isResumeRoute = () =>
  typeof window !== "undefined" && window.location.pathname.replace(/\/+$/, "") === "/resume";

export function Navbar({ onOpenContact }: { onOpenContact: () => void }) {
  const [resumeRoute] = useState(isResumeRoute);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>(resumeRoute ? "resume" : "");
  const [menuOpen, setMenuOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (resumeRoute) return;
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [resumeRoute]);

  useEffect(() => {
    if (resumeRoute) return;
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-38% 0px -55% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [resumeRoute]);

  /* ----- Mobile menu: scroll lock, focus, keyboard ----- */
  useEffect(() => {
    if (!menuOpen) return;

    // Lock page scroll (content stays put; overlay scrolls itself).
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    // Move focus into the menu.
    const timer = window.setTimeout(() => closeRef.current?.focus(), 30);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        return;
      }
      if (e.key !== "Tab" || !overlayRef.current) return;
      const focusables = overlayRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
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
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
      // Return focus to the trigger.
      burgerRef.current?.focus();
    };
  }, [menuOpen]);

  /** Section links: plain hash on the homepage, absolute from /resume. */
  const sectionHref = (id: string) => (resumeRoute ? `/#${id}` : `#${id}`);

  return (
    <>
      <header className={`${styles.header} ${scrolled || resumeRoute ? styles.scrolled : ""}`}>
        <div className={`container ${styles.bar}`}>
          <a href={resumeRoute ? "/" : "#home"} className={styles.brand} aria-label="Back to top">
            {site.name}
          </a>

          <nav className={styles.nav} aria-label="Primary">
            <ul className={styles.links}>
              {NAV.map((n) => (
                <li key={n.id}>
                  <a
                    href={sectionHref(n.id)}
                    className={`${styles.link} ${active === n.id ? styles.linkActive : ""}`}
                    aria-current={active === n.id ? "true" : undefined}
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.actions}>
            <a
              href="/resume"
              className={`${styles.resumeBtn} ${resumeRoute ? styles.resumeBtnActive : ""}`}
              aria-current={resumeRoute ? "true" : undefined}
            >
              Resume
              <ArrowUpRight size={12} aria-hidden="true" />
            </a>
            <button type="button" className={styles.cta} onClick={onOpenContact} data-magnetic>
              Let's talk
            </button>
            <button
              type="button"
              ref={burgerRef}
              className={styles.burger}
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <Menu size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {menuOpen &&
        createPortal(
          <div
            ref={overlayRef}
            className={styles.overlay}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className={styles.overlayHead}>
              <span className={styles.brand}>Menu</span>
              <button
                type="button"
                ref={closeRef}
                className={styles.burger}
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>
            <nav aria-label="Mobile">
              <ul className={styles.menuList}>
                {NAV.slice(0, 6).map((n) => (
                  <li key={n.id}>
                    <a
                      href={sectionHref(n.id)}
                      className={styles.menuLink}
                      onClick={() => setMenuOpen(false)}
                    >
                      {n.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="/resume" className={styles.menuLink} onClick={() => setMenuOpen(false)}>
                    Resume
                  </a>
                </li>
                <li>
                  <a
                    href={sectionHref("contact")}
                    className={styles.menuLink}
                    onClick={() => setMenuOpen(false)}
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
            <div className={styles.overlayFoot}>
              <a href={site.links.github} target="_blank" rel="noopener noreferrer" className={styles.footLink}>
                GitHub <ArrowUpRight size={12} aria-hidden="true" />
              </a>
              <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className={styles.footLink}>
                LinkedIn <ArrowUpRight size={12} aria-hidden="true" />
              </a>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}