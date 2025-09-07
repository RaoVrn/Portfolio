import React, { useEffect, useRef, useState } from 'react';
import { achievements } from '../data/projects.ts';

const Achievements: React.FC = () => {
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

  // Group achievements by category
  const achievementsByCategory = {
    hackathon: achievements.filter(achievement => achievement.category === 'hackathon'),
    competition: achievements.filter(achievement => achievement.category === 'competition'),
    certification: achievements.filter(achievement => achievement.category === 'certification'),
    award: achievements.filter(achievement => achievement.category === 'award'),
  };

  const categoryConfig = {
    hackathon: {
      title: 'Hackathons & Competitions',
      icon: '🏆',
      color: 'from-accent-500 to-accent-600',
      bgColor: 'from-accent-50 to-accent-100 dark:from-accent-900/20 dark:to-accent-800/20',
      borderColor: 'border-accent-200 dark:border-accent-800'
    },
    competition: {
      title: 'Innovation Awards',
      icon: '💡',
      color: 'from-secondary-500 to-secondary-600',
      bgColor: 'from-secondary-50 to-secondary-100 dark:from-secondary-900/20 dark:to-secondary-800/20',
      borderColor: 'border-secondary-200 dark:border-secondary-800'
    },
    certification: {
      title: 'Certifications',
      icon: '🎓',
      color: 'from-primary-500 to-primary-600',
      bgColor: 'from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20',
      borderColor: 'border-primary-200 dark:border-primary-800'
    },
    award: {
      title: 'Academic Recognition',
      icon: '🌟',
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20',
      borderColor: 'border-green-200 dark:border-green-800'
    }
  };

  const AchievementCard: React.FC<{ achievement: any; index: number }> = ({ achievement, index }) => (
    <div
      className={`transform transition-all duration-700 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="bg-white dark:bg-dark-400 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-dark-500 hover:scale-105 group h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="text-4xl">{achievement.icon}</div>
          {achievement.prize && (
            <div className="bg-gradient-to-r from-accent-500 to-accent-600 text-white px-3 py-1 rounded-full text-sm font-bold">
              {achievement.prize}
            </div>
          )}
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-200">
          {achievement.title}
        </h3>
        
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
          <span>{achievement.organization}</span>
          <span className="mx-2">•</span>
          <span>{achievement.date}</span>
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          {achievement.description}
        </p>

        {/* Category Badge */}
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-dark-500">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${
            categoryConfig[achievement.category as keyof typeof categoryConfig]?.bgColor
          } text-gray-700 dark:text-gray-300 border ${
            categoryConfig[achievement.category as keyof typeof categoryConfig]?.borderColor
          }`}>
            {categoryConfig[achievement.category as keyof typeof categoryConfig]?.icon}
            <span className="ml-1 capitalize">{achievement.category}</span>
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="py-20 bg-gray-50 dark:bg-dark-300 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              My <span className="text-primary-500">Achievements</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Recognition and awards that highlight my dedication to excellence in technology and innovation.
            </p>
          </div>

          {/* Achievement Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-accent-500 dark:text-accent-400 mb-2">
                {achievementsByCategory.hackathon.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Hackathons Won</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary-500 dark:text-secondary-400 mb-2">
                {achievementsByCategory.competition.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Innovation Awards</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-500 dark:text-primary-400 mb-2">
                {achievementsByCategory.certification.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Certifications</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-500 dark:text-green-400 mb-2">
                {achievementsByCategory.award.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Academic Awards</div>
            </div>
          </div>

          {/* Achievements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {achievements.map((achievement, index) => (
              <AchievementCard key={achievement.id} achievement={achievement} index={index} />
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Let's Build Something Amazing Together</h3>
              <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
                These achievements represent my commitment to excellence and innovation. 
                I'm always excited to take on new challenges and create impactful solutions.
              </p>
              <button
                onClick={() => {
                  const element = document.querySelector('#contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-white text-primary-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 inline-flex items-center"
              >
                Get In Touch
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
