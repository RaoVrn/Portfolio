import React, { useEffect, useRef, useState } from 'react';

const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'education' | 'experience'>('education');
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
    <>
      <section
        id="about"
        ref={sectionRef}
        className="py-12 bg-white dark:bg-dark-200 transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Section Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              About <span className="text-primary-500">Me</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-7 gap-8 items-start">
            {/* Left Column - Text Content */}
            <div className="lg:col-span-4 space-y-4">
              <div className="prose dark:prose-invert max-w-none">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                    Hi, I'm Varun Prakash 👋
                  </h3>
                  <p className="text-base text-primary-600 dark:text-primary-400 font-medium">
                    Passionate Full-Stack Developer & Problem Solver
                  </p>
                </div>
                
                <div className="space-y-3">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    I'm a <strong className="text-primary-600 dark:text-primary-400">full-stack developer</strong> who thrives on 
                    transforming innovative ideas into impactful products. Building <em>scalable web applications</em>, integrating 
                    cutting-edge AI technologies, and delivering robust, cloud-ready solutions.
                  </p>

                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    My expertise spans <strong className="text-secondary-600 dark:text-secondary-400">modern web technologies, 
                    AI/ML, and cloud platforms</strong>. I excel in tackling complex challenges end-to-end—from crafting 
                    intuitive UIs and robust APIs to efficient databases and seamless deployments. Particularly passionate about 
                    <em>healthcare technology and accessibility</em>.
                  </p>

                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Beyond coding, I explore emerging technologies, contribute to open-source, and mentor aspiring developers. 
                    I believe in <strong className="text-accent-600 dark:text-accent-400">continuous learning</strong> and 
                    building in public.
                  </p>
                  
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium">
                      Full-Stack Development
                    </span>
                    <span className="px-2 py-1 bg-secondary-100 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-300 rounded-full text-xs font-medium">
                      AI/ML Integration
                    </span>
                    <span className="px-2 py-1 bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 rounded-full text-xs font-medium">
                      Cloud Architecture
                    </span>
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">
                      Healthcare Tech
                    </span>
                  </div>
                </div>
              </div>

              {/* Key Strengths */}
              <div className="mt-10">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
                  Why Work With Me?
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="group bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-xl border border-blue-200/50 dark:border-blue-600/30 hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg">
                        🚀
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900 dark:text-white text-sm">Fast Learner</h5>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">Quickly master new technologies</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="group bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-xl border border-green-200/50 dark:border-green-600/30 hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-lg">
                        🎯
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900 dark:text-white text-sm">Problem Solver</h5>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">Creative solutions to challenges</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="group bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-xl border border-purple-200/50 dark:border-purple-600/30 hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white text-lg">
                        🤝
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900 dark:text-white text-sm">Team Player</h5>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">Excellent collaboration skills</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="group bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-4 rounded-xl border border-orange-200/50 dark:border-orange-600/30 hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white text-lg">
                        💡
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900 dark:text-white text-sm">Innovative</h5>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">Always seeking better solutions</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Profile Card */}
            <div className="lg:col-span-3 relative">
              <div className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-dark-300 dark:to-dark-400 p-6 rounded-2xl shadow-xl border border-gray-200 dark:border-dark-500 relative overflow-hidden max-w-md mx-auto">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary-200/20 to-secondary-200/20 rounded-full -translate-y-10 translate-x-10"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-accent-200/20 to-primary-200/20 rounded-full translate-y-8 -translate-x-8"></div>
                
                {/* Profile Image */}
                <div className="relative w-48 h-48 mx-auto mb-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full animate-pulse"></div>
                  <div className="relative w-full h-full rounded-full overflow-hidden shadow-lg border-3 border-white dark:border-gray-700 bg-white dark:bg-gray-800">
                    <img 
                      src="/profile.jpg" 
                      alt="Varun Prakash - Full Stack Developer"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>

                {/* Profile Info */}
                <div className="text-center space-y-2 relative z-10">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      Varun Prakash
                    </h3>
                    <div className="flex items-center justify-center gap-1.5 mb-2">
                      <p className="text-primary-600 dark:text-primary-400 font-semibold text-sm">
                        Full-Stack Developer
                      </p>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-xs italic mb-2">
                      "Building the future, one line of code at a time"
                    </p>
                    <div className="bg-gradient-to-r from-primary-500/10 to-secondary-500/10 dark:from-primary-400/20 dark:to-secondary-400/20 px-3 py-1.5 rounded-lg">
                      <p className="text-gray-700 dark:text-gray-300 text-xs font-medium">
                        🌟 Turning Ideas into Digital Reality
                      </p>
                    </div>
                  </div>
                  
                  {/* Quick Facts */}
                  <div className="space-y-2 pt-3">
                    <div className="flex items-center justify-between p-2.5 bg-white/60 dark:bg-dark-500/60 rounded-lg backdrop-blur-sm border border-gray-200/30 dark:border-gray-600/30 hover:bg-white/80 dark:hover:bg-dark-500/80 transition-all duration-200 shadow-sm">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-6 h-6 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mr-2.5">
                          <svg className="w-3 h-3 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="text-gray-800 dark:text-gray-200 font-medium text-xs">Location</p>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-xs">India</p>
                    </div>
                    
                    <div className="flex items-center justify-between p-2.5 bg-white/60 dark:bg-dark-500/60 rounded-lg backdrop-blur-sm border border-gray-200/30 dark:border-gray-600/30 hover:bg-white/80 dark:hover:bg-dark-500/80 transition-all duration-200 shadow-sm">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-6 h-6 bg-secondary-100 dark:bg-secondary-900/30 rounded-full flex items-center justify-center mr-2.5">
                          <svg className="w-3 h-3 text-secondary-600 dark:text-secondary-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.948.684l.829 2.486A2 2 0 009.8 7.2l.005.006a2 2 0 01-.24 2.501l-1.27 1.27a11.042 11.042 0 004.727 4.727l1.27-1.27A2 2 0 0116.3 14.2l.006.005a2 2 0 011.03 1.87l-.001 2.126a1 1 0 01-1 1H16c-7.18 0-13-5.82-13-13V4a1 1 0 011-1z" />
                          </svg>
                        </div>
                        <p className="text-gray-800 dark:text-gray-200 font-medium text-xs">Phone</p>
                      </div>
                      <a href="tel:+918826207628" className="text-gray-600 dark:text-gray-400 hover:text-secondary-600 dark:hover:text-secondary-400 transition-colors text-xs">
                        +91 88262 07628
                      </a>
                    </div>
                    
                    <div className="flex items-center justify-between p-2.5 bg-white/60 dark:bg-dark-500/60 rounded-lg backdrop-blur-sm border border-gray-200/30 dark:border-gray-600/30 hover:bg-white/80 dark:hover:bg-dark-500/80 transition-all duration-200 shadow-sm">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-6 h-6 bg-accent-100 dark:bg-accent-900/30 rounded-full flex items-center justify-center mr-2.5">
                          <svg className="w-3 h-3 text-accent-600 dark:text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                        </div>
                        <p className="text-gray-800 dark:text-gray-200 font-medium text-xs">Email</p>
                      </div>
                      <a href="mailto:prakash.varun.0305@gmail.com" className="text-gray-600 dark:text-gray-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors text-xs break-all">
                        prakash.varun.0305@gmail.com
                      </a>
                    </div>
                    
                    <div className="flex items-center justify-between p-2.5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200/50 dark:border-green-600/30 shadow-sm">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mr-2.5">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                        <p className="text-green-800 dark:text-green-200 font-semibold text-xs">Status</p>
                      </div>
                      <p className="text-green-600 dark:text-green-400 text-xs">Available for projects</p>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="pt-3">
                    <h5 className="text-gray-800 dark:text-gray-200 font-medium text-xs mb-2 text-center">Connect With Me</h5>
                    <div className="flex justify-center space-x-2">
                      <a
                        href="https://github.com/RaoVrn"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group p-2.5 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-500 dark:to-dark-600 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 border border-gray-200/50 dark:border-gray-600/50"
                        title="GitHub Profile"
                      >
                        <svg className="w-4 h-4 text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                        </svg>
                      </a>
                      <a
                        href="https://linkedin.com/in/varun--prakash"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group p-2.5 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 border border-blue-200/50 dark:border-blue-600/50"
                        title="LinkedIn Profile"
                      >
                        <svg className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                        </svg>
                      </a>
                      <a
                        href="mailto:prakash.varun.0305@gmail.com"
                        className="group p-2.5 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 border border-red-200/50 dark:border-red-600/50"
                        title="Send Email"
                      >
                        <svg className="w-4 h-4 text-red-600 dark:text-red-400 group-hover:text-red-700 dark:group-hover:text-red-300 transition-colors" fill="currentColor" viewBox="0 0 20 20">
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
      </div>
    </section>

    {/* Education & Experience Section */}
    <section className="py-16 bg-gray-700 dark:bg-dark-500">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white dark:text-white mb-3">
              My Journey
            </h2>
            <p className="text-gray-300 dark:text-gray-300 max-w-xl mx-auto">
              Explore my educational background and professional experience that have shaped my career
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 dark:bg-dark-400 rounded-xl p-1.5 shadow-md">
              <div className="flex space-x-1">
                <button
                  onClick={() => setActiveTab('education')}
                  className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === 'education'
                      ? 'bg-primary-500 text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-white dark:hover:bg-dark-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                    </svg>
                    Education
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('experience')}
                  className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === 'experience'
                      ? 'bg-secondary-500 text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-300 hover:text-secondary-500 dark:hover:text-secondary-400 hover:bg-white dark:hover:bg-dark-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h2zm0 2H4v6h12V8h-2v1a1 1 0 11-2 0V8H8v1a1 1 0 11-2 0V8zm2-2h4V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v1z" clipRule="evenodd" />
                    </svg>
                    Experience
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="relative min-h-[500px]">
            {/* Education Tab */}
            <div className={`transition-all duration-500 ${activeTab === 'education' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 absolute inset-0 pointer-events-none'}`}>
              <div className="space-y-4">
                {/* University */}
                <div className="bg-white dark:bg-dark-400 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-dark-500 hover:shadow-md transition-all duration-300">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                        <div className="w-5 h-5 bg-primary-500 rounded-full"></div>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">SRM Institute of Science and Technology</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">B.Tech in Computer Science Engineering</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-medium rounded-full">Current</span>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-primary-500 text-white text-xs font-bold rounded-md">CGPA: 9.57/10</span>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">May 2022 – May 2026 • Chennai, Tamil Nadu</p>
                </div>

                {/* 12th Grade */}
                <div className="bg-white dark:bg-dark-400 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-dark-500 hover:shadow-md transition-all duration-300">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-secondary-100 dark:bg-secondary-900/30 rounded-lg flex items-center justify-center">
                        <div className="w-5 h-5 bg-secondary-500 rounded-full"></div>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Higher Secondary (12th)</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">Colonel's Central Academy (CCA)</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-secondary-100 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-300 text-xs font-medium rounded-full">Completed</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-secondary-500 text-white text-xs font-bold rounded-md">93.8%</span>
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-md">CBSE</span>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">2021 – 2022 • Gurugram, Haryana</p>
                </div>

                {/* 10th Grade */}
                <div className="bg-white dark:bg-dark-400 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-dark-500 hover:shadow-md transition-all duration-300">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-accent-100 dark:bg-accent-900/30 rounded-lg flex items-center justify-center">
                        <div className="w-5 h-5 bg-accent-500 rounded-full"></div>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Secondary (10th)</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">Colonel's Central Academy (CCA)</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 text-xs font-medium rounded-full">Completed</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-accent-500 text-white text-xs font-bold rounded-md">80%</span>
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-md">CBSE</span>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">2019 – 2020 • Gurugram, Haryana</p>
                </div>
              </div>
            </div>

            {/* Experience Tab */}
            <div className={`transition-all duration-500 ${activeTab === 'experience' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 absolute inset-0 pointer-events-none'}`}>
              <div className="space-y-4">
                {/* Infosys */}
                <div className="bg-white dark:bg-dark-400 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-dark-500 hover:shadow-md transition-all duration-300">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                        <div className="w-5 h-5 bg-primary-500 rounded-full"></div>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Infosys Springboard</h3>
                        <p className="text-primary-600 dark:text-primary-400 font-medium text-sm">Full‑Stack Intern</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-secondary-100 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-300 text-xs font-medium rounded-full">Completed</span>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 mb-3 text-sm">Oct 2024 – Dec 2024 • Remote</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    Contributed to TeamSync, a full‑stack project management tool with React.js, Node.js, and MongoDB. 
                    Enhanced task management, collaboration, and real‑time updates through API development and database design.
                  </p>
                </div>

                {/* Samsung */}
                <div className="bg-white dark:bg-dark-400 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-dark-500 hover:shadow-md transition-all duration-300">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-secondary-100 dark:bg-secondary-900/30 rounded-lg flex items-center justify-center">
                        <div className="w-5 h-5 bg-secondary-500 rounded-full"></div>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Samsung R&D Institute India</h3>
                        <p className="text-secondary-600 dark:text-secondary-400 font-medium text-sm">Research and Development Intern</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-secondary-100 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-300 text-xs font-medium rounded-full">Completed</span>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 mb-3 text-sm">Jan 2024 – Aug 2024 • Remote</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    Developed and optimized a web‑based interface leveraging Fooocus for image generation and Visual Question Answering (VQA). 
                    Integrated advanced features including image inpainting, outpainting, LoRA implementation, and dynamic prompt handling.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default About;
