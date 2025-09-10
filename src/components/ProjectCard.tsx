import React, { useState } from 'react';
import type { Project } from '../data/projects.ts';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:scale-[1.02]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute top-3 right-3 z-10">
          <span className="bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded-md">
            Featured
          </span>
        </div>
      )}

      {/* Project Image */}
      <div className="relative h-52 bg-gradient-to-br from-primary-100 via-secondary-100 to-accent-100 dark:from-primary-900/30 dark:via-secondary-900/30 dark:to-accent-900/30 overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-500/20 via-transparent to-secondary-500/20"></div>
          <div className="absolute top-4 left-4 w-8 h-8 bg-primary-300/30 rounded-full"></div>
          <div className="absolute top-8 right-8 w-6 h-6 bg-secondary-300/30 rounded-full"></div>
          <div className="absolute bottom-6 left-8 w-4 h-4 bg-accent-300/30 rounded-full"></div>
        </div>

        {/* Project Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-7xl opacity-20 transform transition-transform duration-300 group-hover:scale-110">
            {project.title.includes('Aura') ? '🤖' :
             project.title.includes('TeamSync') ? '👥' :
             project.title.includes('RentEase') ? '�' :
             project.title.includes('FurEverHome') ? '🐕' :
             project.title.includes('FeedWise') ? '�' :
             project.title.includes('NetPulse') ? '📊' : '💻'}
          </div>
        </div>
        
        {/* Overlay on hover */}
        <div className={`absolute inset-0 bg-gradient-to-t from-primary-600/90 via-primary-500/50 to-transparent transition-all duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute bottom-4 left-4 right-4 transform transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
            <p className="text-white text-sm leading-relaxed">
              {project.longDescription}
            </p>
          </div>
        </div>

        {/* Gradient overlay for better text readability */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-300 line-clamp-2">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3 min-h-[4rem]">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
            <span className="mr-2">🛠️</span>
            Tech Stack:
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.slice(0, 4).map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 text-primary-600 dark:text-primary-400 text-xs font-medium rounded-full border border-primary-200 dark:border-primary-800 hover:scale-105 transition-transform duration-200"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs font-medium rounded-full border border-gray-200 dark:border-gray-600">
                +{project.techStack.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center px-4 py-2.5 bg-gray-100 dark:bg-dark-500 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-dark-600 transition-all duration-200 group/btn"
          >
            <svg className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
            </svg>
            GitHub
          </a>
          
          {project.liveDemo !== '#' && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-200 group/btn"
            >
              <svg className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Live Demo
            </a>
          )}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500"></div>
      
      {/* Bottom accent line */}
      <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-500 ${
        isHovered ? 'w-full' : 'w-0'
      }`}></div>
    </div>
  );
};

export default ProjectCard;
