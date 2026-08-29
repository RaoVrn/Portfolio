import { Header } from "./components/Header";
import { SkipLink } from "./components/SkipLink";
import { ScrollProgress } from "./components/ScrollProgress";
import { Ambient } from "./components/Ambient";
import { Hero } from "./components/Hero/Hero";
import { WorkSection } from "./components/Work/WorkSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { SkillsSection } from "./components/SkillsSection";
import { AboutSection } from "./components/AboutSection";
import { HighlightsSection } from "./components/HighlightsSection";
import { Footer } from "./components/Footer";
import { useMagnetic } from "./lib/useMagnetic";
import "./styles/tokens.css";
import "./styles/base.css";

export default function App() {
  useMagnetic();

  return (
    <>
      <SkipLink />
      <Ambient />
      <Header />
      <ScrollProgress />
      <main id="main">
        <Hero />
        <WorkSection />
        <ExperienceSection />
        <SkillsSection />
        <AboutSection />
        <HighlightsSection />
      </main>
      <Footer />
    </>
  );
}
