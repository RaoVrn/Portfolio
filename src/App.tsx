import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext.tsx';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Hero from './pages/Hero';
import About from './pages/About';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Achievements from './pages/Achievements';
import Contact from './pages/Contact';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-dark-200 transition-colors duration-300">
        {/* Navigation */}
        <Navbar />
        
        {/* Main Content */}
        <main>
          {/* Hero Section */}
          <Hero />
          
          {/* About Section */}
          <About />
          
          {/* Projects Section */}
          <Projects />
          
          {/* Skills Section */}
          <Skills />
          
          {/* Achievements Section */}
          <Achievements />
          
          {/* Contact Section */}
          <Contact />
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;
