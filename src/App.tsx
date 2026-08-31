import { useEffect, useState } from "react";
import { Background } from "./components/Background";
import { Navbar } from "./components/Navbar";
import { ScrollProgress } from "./components/ScrollProgress";
import { SkipLink } from "./components/SkipLink";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Achievements } from "./components/Achievements";
import { Arsenal } from "./components/Arsenal";
import { Certifications } from "./components/Certifications";
import { Contact } from "./components/Contact";
import { ContactModal } from "./components/ContactModal";
import { Footer } from "./components/Footer";
import { ResumePage } from "./pages/ResumePage";
import { useMagnetic } from "./lib/useMagnetic";
import "./styles/tokens.css";
import "./styles/base.css";

const isResumeRoute = () =>
  typeof window !== "undefined" && window.location.pathname.replace(/\/+$/, "") === "/resume";

/** After a full-load navigation to /#section, scroll to the section. */
function useHashScroll() {
  useEffect(() => {
    if (!window.location.hash) return;
    const el = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
    if (el) {
      window.setTimeout(() => el.scrollIntoView({ block: "start" }), 60);
    }
  }, []);
}

export default function App() {
  const [contactOpen, setContactOpen] = useState(false);
  const [resumeRoute] = useState(isResumeRoute);
  useMagnetic();
  useHashScroll();

  return (
    <>
      <SkipLink />
      <Background />
      <Navbar onOpenContact={() => setContactOpen(true)} />
      <ScrollProgress />

      {resumeRoute ? (
        <ResumePage />
      ) : (
        <main id="main">
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Achievements />
          <Arsenal />
          <Certifications />
        </main>
      )}

      {!resumeRoute && <Contact onOpenContact={() => setContactOpen(true)} />}
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
      <Footer />
    </>
  );
}