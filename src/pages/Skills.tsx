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

  const categoryNames = {
    frontend: 'Frontend',
    backend: 'Backend', 
    cloud: 'Cloud & DevOps',
    language: 'Languages',
    tools: 'Tools'
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-16 bg-white dark:bg-dark-200 transition-colors duration-300 min-h-screen flex items-center"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              My <span className="text-primary-500">Skills</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A comprehensive overview of my technical expertise across different domains of software development.
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Frontend & Backend */}
            <div className="space-y-6">
              {/* Frontend */}
              <div className="bg-gray-50 dark:bg-dark-300 rounded-xl p-6 border border-gray-200 dark:border-dark-400">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  Frontend
                  <div className="ml-3 flex-1 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500"></div>
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {skillsByCategory.frontend.map((skill, index) => (
                    <div key={skill.name} className="flex items-center justify-between p-3 bg-white dark:bg-dark-400 rounded-lg">
                      <div className="flex items-center">
                        <span className="text-xl mr-3">{skill.icon}</span>
                        <span className="font-medium text-gray-700 dark:text-gray-300 text-sm">{skill.name}</span>
                      </div>
                      <span className="text-xs font-semibold text-primary-500 dark:text-primary-400">{skill.level}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Backend */}
              <div className="bg-gray-50 dark:bg-dark-300 rounded-xl p-6 border border-gray-200 dark:border-dark-400">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  Backend
                  <div className="ml-3 flex-1 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500"></div>
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {skillsByCategory.backend.map((skill, index) => (
                    <div key={skill.name} className="flex items-center justify-between p-3 bg-white dark:bg-dark-400 rounded-lg">
                      <div className="flex items-center">
                        <span className="text-xl mr-3">{skill.icon}</span>
                        <span className="font-medium text-gray-700 dark:text-gray-300 text-sm">{skill.name}</span>
                      </div>
                      <span className="text-xs font-semibold text-primary-500 dark:text-primary-400">{skill.level}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Cloud, Languages & Tools */}
            <div className="space-y-6">
              {/* Cloud & DevOps */}
              <div className="bg-gray-50 dark:bg-dark-300 rounded-xl p-6 border border-gray-200 dark:border-dark-400">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  Cloud & DevOps
                  <div className="ml-3 flex-1 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500"></div>
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {skillsByCategory.cloud.map((skill, index) => (
                    <div key={skill.name} className="flex items-center justify-between p-3 bg-white dark:bg-dark-400 rounded-lg">
                      <div className="flex items-center">
                        <span className="text-xl mr-3">{skill.icon}</span>
                        <span className="font-medium text-gray-700 dark:text-gray-300 text-sm">{skill.name}</span>
                      </div>
                      <span className="text-xs font-semibold text-primary-500 dark:text-primary-400">{skill.level}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages & Tools Combined */}
              <div className="grid grid-cols-1 gap-6">
                {/* Languages */}
                <div className="bg-gray-50 dark:bg-dark-300 rounded-xl p-6 border border-gray-200 dark:border-dark-400">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    Languages
                    <div className="ml-3 flex-1 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500"></div>
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {skillsByCategory.language.map((skill, index) => (
                      <div key={skill.name} className="flex items-center justify-between p-2 bg-white dark:bg-dark-400 rounded-lg">
                        <div className="flex items-center">
                          <span className="text-lg mr-2">{skill.icon}</span>
                          <span className="font-medium text-gray-700 dark:text-gray-300 text-sm">{skill.name}</span>
                        </div>
                        <span className="text-xs font-semibold text-primary-500 dark:text-primary-400">{skill.level}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tools */}
                <div className="bg-gray-50 dark:bg-dark-300 rounded-xl p-6 border border-gray-200 dark:border-dark-400">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    Tools
                    <div className="ml-3 flex-1 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500"></div>
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {skillsByCategory.tools.map((skill, index) => (
                      <div key={skill.name} className="flex items-center justify-between p-2 bg-white dark:bg-dark-400 rounded-lg">
                        <div className="flex items-center">
                          <span className="text-lg mr-2">{skill.icon}</span>
                          <span className="font-medium text-gray-700 dark:text-gray-300 text-sm">{skill.name}</span>
                        </div>
                        <span className="text-xs font-semibold text-primary-500 dark:text-primary-400">{skill.level}%</span>
                      </div>
                    ))}
                  </div>
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
