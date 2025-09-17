import React, { useEffect, useRef, useState } from 'react';
import { skills } from '../data/projects.ts';

const Skills: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Group skills by category for display
  const skillsByCategory = {
    frontend: skills.filter(skill => skill.category === 'frontend'),
    backend: skills.filter(skill => skill.category === 'backend'),
    cloud: skills.filter(skill => skill.category === 'cloud'),
    language: skills.filter(skill => skill.category === 'language'),
    tools: skills.filter(skill => skill.category === 'tools'),
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-6 bg-white dark:bg-dark-200 transition-colors duration-300 min-h-screen flex items-center"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Section Header */}
          <div className="text-center mb-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-1">
              My <span className="text-primary-500">Skills</span>
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full mb-2"></div>
            <p className="text-base text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
              Technical expertise across different domains of software development
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Frontend */}
              <div className="bg-gray-50 dark:bg-dark-300 rounded-xl p-4 border border-gray-200 dark:border-dark-400">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <span className="text-primary-500">Frontend</span>
                  <div className="ml-3 flex-1 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500"></div>
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {skillsByCategory.frontend.map((skill) => (
                    <div key={skill.name} className="p-3 bg-white dark:bg-dark-400 rounded-lg border border-gray-100 dark:border-dark-500 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200 hover:shadow-md text-center">
                      <span className="text-gray-800 dark:text-gray-200 font-medium text-sm">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Backend */}
              <div className="bg-gray-50 dark:bg-dark-300 rounded-xl p-4 border border-gray-200 dark:border-dark-400">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <span className="text-primary-500">Backend</span>
                  <div className="ml-3 flex-1 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500"></div>
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {skillsByCategory.backend.map((skill) => (
                    <div key={skill.name} className="p-3 bg-white dark:bg-dark-400 rounded-lg border border-gray-100 dark:border-dark-500 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200 hover:shadow-md text-center">
                      <span className="text-gray-800 dark:text-gray-200 font-medium text-sm">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className="bg-gray-50 dark:bg-dark-300 rounded-xl p-4 border border-gray-200 dark:border-dark-400">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <span className="text-accent-500">Languages</span>
                  <div className="ml-3 flex-1 h-0.5 bg-gradient-to-r from-accent-500 to-primary-500"></div>
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {skillsByCategory.language.map((skill) => (
                    <div key={skill.name} className="p-3 bg-white dark:bg-dark-400 rounded-lg border border-gray-100 dark:border-dark-500 hover:border-accent-300 dark:hover:border-accent-600 transition-all duration-200 hover:shadow-md text-center">
                      <span className="text-gray-800 dark:text-gray-200 font-medium text-sm">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Cloud & DevOps */}
              <div className="bg-gray-50 dark:bg-dark-300 rounded-xl p-4 border border-gray-200 dark:border-dark-400">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <span className="text-secondary-500">Cloud & DevOps</span>
                  <div className="ml-3 flex-1 h-0.5 bg-gradient-to-r from-secondary-500 to-accent-500"></div>
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {skillsByCategory.cloud.map((skill) => (
                    <div key={skill.name} className="p-3 bg-white dark:bg-dark-400 rounded-lg border border-gray-100 dark:border-dark-500 hover:border-secondary-300 dark:hover:border-secondary-600 transition-all duration-200 hover:shadow-md text-center">
                      <span className="text-gray-800 dark:text-gray-200 font-medium text-sm">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div className="bg-gray-50 dark:bg-dark-300 rounded-xl p-4 border border-gray-200 dark:border-dark-400">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <span className="text-primary-500">Tools</span>
                  <div className="ml-3 flex-1 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500"></div>
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {skillsByCategory.tools.map((skill) => (
                    <div key={skill.name} className="p-3 bg-white dark:bg-dark-400 rounded-lg border border-gray-100 dark:border-dark-500 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200 hover:shadow-md text-center">
                      <span className="text-gray-800 dark:text-gray-200 font-medium text-sm">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
