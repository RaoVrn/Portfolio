import React, { useEffect, useRef, useState } from 'react';

const About: React.FC = () => {
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

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 bg-white dark:bg-dark-200 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              About <span className="text-primary-500">Me</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-6">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Hi there! I'm Varun Prakash 👋
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  I'm a passionate full-stack developer with a deep love for creating innovative solutions 
                  that make a real difference. My journey in tech started with curiosity about how things work, 
                  and it has evolved into a career focused on building scalable applications and leveraging 
                  cutting-edge technologies.
                </p>

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  With expertise spanning across modern web technologies, artificial intelligence, and cloud 
                  computing, I enjoy tackling complex problems and turning ideas into reality. I'm particularly 
                  passionate about healthcare technology, having developed AI-powered solutions that help 
                  improve medical accessibility and patient care.
                </p>

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  When I'm not coding, you'll find me exploring the latest tech trends, contributing to 
                  open-source projects, or mentoring aspiring developers. I believe in continuous learning 
                  and staying at the forefront of technological innovation.
                </p>
              </div>

              {/* Key Strengths */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-primary-50 dark:bg-dark-300 p-4 rounded-lg border border-primary-100 dark:border-dark-400">
                  <div className="text-2xl mb-2">🚀</div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Fast Learner</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Quick to adapt to new technologies and frameworks</p>
                </div>
                
                <div className="bg-secondary-50 dark:bg-dark-300 p-4 rounded-lg border border-secondary-100 dark:border-dark-400">
                  <div className="text-2xl mb-2">🎯</div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Problem Solver</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Love tackling complex challenges with creative solutions</p>
                </div>
                
                <div className="bg-accent-50 dark:bg-dark-300 p-4 rounded-lg border border-accent-100 dark:border-dark-400">
                  <div className="text-2xl mb-2">🤝</div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Team Player</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Excellent collaboration and communication skills</p>
                </div>
                
                <div className="bg-primary-50 dark:bg-dark-300 p-4 rounded-lg border border-primary-100 dark:border-dark-400">
                  <div className="text-2xl mb-2">💡</div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Innovative</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Always looking for better ways to build things</p>
                </div>
              </div>
            </div>

            {/* Right Column - Profile Card */}
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-dark-300 dark:to-dark-400 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-dark-500">
                {/* Profile Image Placeholder */}
                <div className="w-48 h-48 mx-auto mb-6 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-6xl text-white font-bold">VP</span>
                </div>

                {/* Profile Info */}
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Varun Prakash
                  </h3>
                  <p className="text-primary-500 dark:text-primary-400 font-medium">
                    Full-Stack Developer
                  </p>
                  
                  {/* Quick Facts */}
                  <div className="space-y-3 pt-4">
                    <div className="flex items-center justify-center text-gray-600 dark:text-gray-300">
                      <svg className="w-5 h-5 mr-2 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      India
                    </div>
                    <div className="flex items-center justify-center text-gray-600 dark:text-gray-300">
                      <svg className="w-5 h-5 mr-2 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      varun.prakash@email.com
                    </div>
                    <div className="flex items-center justify-center text-gray-600 dark:text-gray-300">
                      <svg className="w-5 h-5 mr-2 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      Available for projects
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex justify-center space-x-4 pt-6">
                    <a
                      href="https://github.com/RaoVrn"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white dark:bg-dark-500 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                    >
                      <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a
                      href="https://linkedin.com/in/varun-prakash"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white dark:bg-dark-500 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                    >
                      <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a
                      href="mailto:varun.prakash@email.com"
                      className="p-3 bg-white dark:bg-dark-500 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                    >
                      <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </a>
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

export default About;
