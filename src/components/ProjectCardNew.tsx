import React, { useState } from 'react';
import type { Project } from '../data/projects.ts';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [showAllTech, setShowAllTech] = useState(false);

  return (
    <div className="relative flex flex-col items-center">
      {/* Laptop Mockup */}
      <div className="relative">
        {/* Laptop Screen */}
        <div className="relative bg-gray-800 dark:bg-gray-900 rounded-t-xl p-3 shadow-xl">
          {/* Browser Bar */}
          <div className="bg-gray-700 dark:bg-gray-800 rounded-t-lg p-2.5 flex items-center space-x-2 mb-3">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="flex-1 bg-gray-600 dark:bg-gray-700 rounded-md mx-3 h-4 flex items-center justify-center">
              <span className="text-sm text-gray-300 font-mono truncate px-2">{project.title.split(' - ')[0]}</span>
            </div>
          </div>
          
          {/* Screen Content - Project Details */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 w-96 h-56 rounded-lg p-5 overflow-hidden relative border border-gray-700">
            {/* Project Title */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 pr-2">
                <h3 className="text-lg font-bold text-white leading-tight mb-1">
                  {project.title}
                </h3>
                {/* Project Category/Type */}
                <p className="text-primary-400 text-xs font-medium">
                  {project.title.includes('Desktop') ? 'Desktop Application' :
                   project.title.includes('Management') ? 'Web Application' :
                   project.title.includes('Property') ? 'Real Estate Platform' :
                   project.title.includes('Home') ? 'Pet Adoption Platform' :
                   project.title.includes('Feed') ? 'Content Management' :
                   project.title.includes('Network') ? 'Analytics Dashboard' : 'Full-Stack Project'}
                </p>
              </div>
              <div className="text-xl opacity-80 flex-shrink-0">
                {project.title.includes('Aura') ? '🤖' :
                 project.title.includes('TeamSync') ? '👥' :
                 project.title.includes('RentEase') ? '🏠' :
                 project.title.includes('FurEverHome') ? '🐕' :
                 project.title.includes('FeedWise') ? '📡' :
                 project.title.includes('NetPulse') ? '📊' : '💻'}
              </div>
            </div>

            {/* Project Description */}
            <p className="text-gray-300 text-sm mb-4 line-clamp-3 leading-snug">
              {project.description}
            </p>

            {/* Tech Stack */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-1.5 mb-2">
                {(showAllTech ? project.techStack : project.techStack.slice(0, 4)).map((tech, techIndex) => (
                  <span key={techIndex} className="px-2 py-0.5 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 text-primary-300 text-xs font-medium rounded-md border border-primary-500/30">
                    {tech}
                  </span>
                ))}
              </div>
              {project.techStack.length > 4 && (
                <div className="flex justify-start">
                  <button 
                    onClick={() => setShowAllTech(!showAllTech)}
                    className="px-2 py-0.5 bg-gray-600 hover:bg-gray-500 text-gray-300 text-xs font-medium rounded-md transition-colors cursor-pointer"
                  >
                    {showAllTech ? 'Show Less' : `+${project.techStack.length - 4} more`}
                  </button>
                </div>
              )}
            </div>

            {/* Action Button - Bottom Right */}
            <div className="absolute bottom-3 right-4">
              <a 
                href={project.githubLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 text-white text-xs font-medium rounded-md transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                </svg>
                Code
              </a>
            </div>
          </div>
        </div>
        
        {/* Laptop Base */}
        <div className="bg-gradient-to-b from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 h-5 rounded-b-2xl shadow-lg relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gray-400 dark:bg-gray-500"></div>
          <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 w-24 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-sm"></div>
        </div>
      </div>
    </div>
    );
};

export default ProjectCard;
