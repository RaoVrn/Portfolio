import { useState } from "react";
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
import { useMagnetic } from "./lib/useMagnetic";
import "./styles/tokens.css";
import "./styles/base.css";

export default function App() {
  const [contactOpen, setContactOpen] = useState(false);
  useMagnetic();

  return (
    <>
      <SkipLink />
      <Background />
      <Navbar onOpenContact={() => setContactOpen(true)} />
      <ScrollProgress />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Achievements />
        <Arsenal />
        <Certifications />
      </main>
      <Contact onOpenContact={() => setContactOpen(true)} />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
      <Footer />
    </>
  );
}