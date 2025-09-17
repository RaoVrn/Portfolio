import React, { useEffect, useRef, useState } from 'react';
import { achievements } from '../data/projects.ts';

const Achievements: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('hackathon');
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

  // Group achievements by category
  const achievementsByCategory = {
    hackathon: achievements.filter(achievement => achievement.category === 'hackathon'),
    certification: achievements.filter(achievement => achievement.category === 'certification'),
    award: achievements.filter(achievement => achievement.category === 'award'),
  };

  // Filter achievements based on active category
  const filteredAchievements = achievements.filter(achievement => achievement.category === activeCategory);



  const AchievementCard: React.FC<{ achievement: any; index: number }> = ({ achievement, index }) => (
    <div
      className={`transform transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="bg-white dark:bg-dark-400 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-dark-500 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="text-2xl">{achievement.icon}</div>
          {achievement.prize && (
            <span className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-1 rounded-lg text-xs font-semibold shadow-lg">
              {achievement.prize}
            </span>
          )}
        </div>

        {/* Content */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          {achievement.title}
        </h3>
        
        <div className="flex items-center mb-3">
          <span className="text-blue-400 dark:text-blue-300 text-sm font-bold">
            {achievement.organization}
          </span>
          <span className="mx-3 text-gray-400">•</span>
          <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            {achievement.date}
          </span>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
          {achievement.description}
        </p>

        {/* Link Button */}
        {achievement.link && (
          <div className="mt-auto">
            <a
              href={achievement.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View Certificate
            </a>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="py-16 bg-gray-50 dark:bg-dark-300 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">Achievements</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full mb-4"></div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center mb-8">
            <div className="bg-white dark:bg-dark-400 rounded-xl p-1 inline-flex shadow-md">
              {[
                { key: 'hackathon', title: 'Hackathons', count: achievementsByCategory.hackathon.length },
                { key: 'certification', title: 'Certifications', count: achievementsByCategory.certification.length },
                { key: 'award', title: 'Excellence', count: achievementsByCategory.award.length }
              ].map((category) => (
                <button
                  key={category.key}
                  onClick={() => setActiveCategory(category.key)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 text-sm ${
                    activeCategory === category.key
                      ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
                >
                  {category.title}
                  <span className={`ml-2 px-2 py-1 rounded text-xs font-semibold ${
                    activeCategory === category.key
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-100 dark:bg-dark-500 text-gray-600 dark:text-gray-400'
                  }`}>
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Achievements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAchievements.map((achievement, index) => (
              <AchievementCard key={achievement.id} achievement={achievement} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
