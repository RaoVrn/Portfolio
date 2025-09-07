import React, { useEffect, useState } from 'react';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentWord, setCurrentWord] = useState(0);

  // Animation trigger
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Typing animation for tagline words
  const words = ['Full-stack Developer', 'AI Enthusiast', 'Cloud Expert', 'Problem Solver'];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Download resume function
  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume-varun-prakash.pdf';
    link.download = 'Varun_Prakash_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-dark-300 dark:via-dark-200 dark:to-dark-100"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-primary-400/20 to-secondary-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-secondary-400/20 to-accent-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary-300/10 to-secondary-300/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Greeting */}
          <div className="mb-4">
            <span className="inline-block px-4 py-2 rounded-full bg-white/80 dark:bg-dark-400/80 backdrop-blur-sm text-sm font-medium text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-500">
              👋 Hello, I'm
            </span>
          </div>

          {/* Name */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 bg-clip-text text-transparent animate-gradient">
              Varun Prakash
            </span>
          </h1>

          {/* Dynamic Tagline */}
          <div className="mb-8 h-16 flex items-center justify-center">
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-700 dark:text-gray-300 font-light">
              <span className="inline-block min-w-[300px] md:min-w-[400px]">
                <span className="text-primary-500 dark:text-primary-400 font-semibold">
                  {words[currentWord]}
                </span>
              </span>
              <br />
              <span className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
                & Cloud Enthusiast
              </span>
            </p>
          </div>

          {/* Description */}
          <div className="mb-10 max-w-3xl mx-auto">
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              Passionate about creating innovative solutions with modern technologies. 
              I build scalable web applications, leverage AI for real-world problems, 
              and deploy robust cloud infrastructure.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => scrollToSection('#projects')}
              className="group px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-xl hover:shadow-glow-lg transition-all duration-300 hover:scale-105 min-w-[200px]"
            >
              <span className="flex items-center justify-center">
                View Projects
                <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
            
            <button
              onClick={downloadResume}
              className="group px-8 py-4 bg-white dark:bg-dark-400 text-gray-700 dark:text-gray-200 font-semibold rounded-xl border-2 border-gray-200 dark:border-dark-500 hover:border-primary-300 dark:hover:border-primary-400 hover:shadow-lg transition-all duration-300 hover:scale-105 min-w-[200px]"
            >
              <span className="flex items-center justify-center">
                <svg className="mr-2 w-5 h-5 transform group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Resume
              </span>
            </button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-500 dark:text-primary-400 mb-2">10+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Projects Built</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-secondary-500 dark:text-secondary-400 mb-2">2+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Years Learning</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent-500 dark:text-accent-400 mb-2">12+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Technologies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-500 dark:text-primary-400 mb-2">5+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Awards Won</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button
            onClick={() => scrollToSection('#about')}
            className="p-2 rounded-full bg-white/80 dark:bg-dark-400/80 backdrop-blur-sm border border-gray-200 dark:border-dark-500 hover:bg-white dark:hover:bg-dark-400 transition-colors duration-200"
            aria-label="Scroll to next section"
          >
            <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
