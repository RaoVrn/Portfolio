import React, { useEffect, useRef, useState } from 'react';
import { skills } from '../data/projects.ts';

const Skills: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'frontend' | 'backend' | 'cloud' | 'language' | 'tools'>('all');
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

  // Filter skills by category
  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

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

  // Skill progress bar component
  const SkillBar: React.FC<{ skill: any; index: number }> = ({ skill, index }) => (
    <div
      className={`transform transition-all duration-700 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <span className="text-2xl mr-3">{skill.icon}</span>
          <span className="font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
        </div>
        <span className="text-sm font-semibold text-primary-500 dark:text-primary-400">
          {skill.level}%
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-dark-500 rounded-full h-3 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transition-all duration-1000 ease-out"
          style={{
            width: isVisible ? `${skill.level}%` : '0%',
            transitionDelay: `${index * 100 + 500}ms`
          }}
        ></div>
      </div>
    </div>
  );

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 bg-white dark:bg-dark-200 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              My <span className="text-primary-500">Skills</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A comprehensive overview of my technical expertise across different domains of software development.
            </p>
          </div>

          {/* Skills by Category */}
          <div className="space-y-16">
            {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
              <div key={category} className="bg-gray-50 dark:bg-dark-300 rounded-2xl p-8 border border-gray-200 dark:border-dark-400">
                <div className="flex items-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {categoryNames[category as keyof typeof categoryNames]}
                  </h3>
                  <div className="ml-4 flex-1 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {categorySkills.map((skill, index) => (
                    <SkillBar key={skill.name} skill={skill} index={index} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Skill Summary Cards */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 p-6 rounded-xl border border-primary-200 dark:border-primary-800">
              <div className="text-3xl mb-3">⚛️</div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Frontend</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Modern React, TypeScript, and responsive design with Tailwind CSS
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 dark:from-secondary-900/20 dark:to-secondary-800/20 p-6 rounded-xl border border-secondary-200 dark:border-secondary-800">
              <div className="text-3xl mb-3">🚀</div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Backend</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Node.js, Express, Python with robust database management
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-accent-50 to-accent-100 dark:from-accent-900/20 dark:to-accent-800/20 p-6 rounded-xl border border-accent-200 dark:border-accent-800">
              <div className="text-3xl mb-3">☁️</div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Cloud</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                AWS, Docker, and scalable cloud infrastructure deployment
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 p-6 rounded-xl border border-primary-200 dark:border-secondary-800">
              <div className="text-3xl mb-3">🤖</div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">AI/ML</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Machine learning integration and AI-powered solutions
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Continuous Learning</h3>
              <p className="text-lg opacity-90 max-w-3xl mx-auto">
                I'm constantly updating my skills and exploring new technologies. 
                The percentages above reflect my current proficiency, but I'm always 
                striving to improve and learn more.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
