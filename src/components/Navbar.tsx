import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { site } from "../data/site";
import styles from "./Navbar.module.css";

const NAV = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
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

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  /** Section links: plain hash on the homepage, absolute from /resume. */
  const sectionHref = (id: string) => (resumeRoute ? `/#${id}` : `#${id}`);

  return (
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
            className={styles.burger}
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <Menu size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Menu">
          <div className={styles.overlayHead}>
            <span className={styles.brand}>Menu</span>
            <button
              type="button"
              className={styles.burger}
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>
          <nav aria-label="Mobile">
            <ul className={styles.menuList}>
              {NAV.slice(0, 5).map((n) => (
                <li key={n.id}>
                  <a href={sectionHref(n.id)} className={styles.menuLink} onClick={() => setMenuOpen(false)}>
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
        </div>
      )}
    </header>
  );
}