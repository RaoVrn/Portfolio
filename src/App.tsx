import { Header } from "./components/Header";
import { SkipLink } from "./components/SkipLink";
import { ScrollProgress } from "./components/ScrollProgress";
import { Hero } from "./components/Hero/Hero";
import { Contents } from "./components/Contents";
import { Footer } from "./components/Footer";
import { useMagnetic } from "./lib/useMagnetic";
import "./styles/tokens.css";
import "./styles/base.css";

export default function App() {
  useMagnetic();

  return (
    <>
      <SkipLink />
      <Header />
      <ScrollProgress />
      <main id="main">
        <Hero />
        <Contents />
      </main>
      <Footer />
    </>
  );
}