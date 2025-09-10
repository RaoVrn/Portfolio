import React, { useState } from 'react';
import type { Project } from '../data/projects.ts';

interface ProjectCardProps {
  project: Project;
  index: number;
  viewMode?: 'grid' | 'showcase';
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, viewMode = 'grid' }) => {
  const [showAllTech, setShowAllTech] = useState(false);
  const isEven = index % 2 === 0;

  const displayedTech = showAllTech ? project.techStack : project.techStack.slice(0, 3);

  if (viewMode === 'grid') {
    return (
      <div className="group relative bg-white dark:bg-dark-400 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-dark-500 hover:scale-[1.02]">
        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-3 right-3 z-10">
            <span className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-xs font-medium px-2 py-1 rounded-full">
              ⭐
            </span>
          </div>
        )}

        {/* Computer Mockup - Compact */}
        <div className="relative h-40 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-dark-300 dark:to-dark-200 p-4 flex items-center justify-center">
          {/* Laptop */}
          <div className="relative transform transition-transform duration-300 group-hover:scale-105">
            {/* Screen */}
            <div className="relative bg-gray-800 rounded-t-md p-0.5 shadow-lg">
              <div className="bg-gray-700 rounded-t-sm p-1 flex items-center space-x-1">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 w-32 h-20 rounded-b-sm flex items-center justify-center">
                <div className="text-2xl">
                  {project.title.includes('Aura') ? '🤖' :
                   project.title.includes('TeamSync') ? '👥' :
                   project.title.includes('RentEase') ? '🏠' :
                   project.title.includes('FurEverHome') ? '🐕' :
                   project.title.includes('FeedWise') ? '📡' :
                   project.title.includes('NetPulse') ? '📊' : '💻'}
                </div>
              </div>
            </div>
            {/* Base */}
            <div className="bg-gray-300 dark:bg-gray-600 h-1 rounded-b-lg"></div>
          </div>
        </div>

        {/* Content - Compact */}
        <div className="p-4 space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors line-clamp-1">
            {project.title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
            {project.description}
          </p>

          {/* Tech Stack - Compact */}
          <div className="flex flex-wrap gap-1">
            {displayedTech.map((tech, techIndex) => (
              <span key={techIndex} className="px-2 py-0.5 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-xs rounded">
                {tech}
              </span>
            ))}
            {project.techStack.length > 3 && (
              <button onClick={() => setShowAllTech(!showAllTech)} className="text-xs text-primary-500 hover:text-primary-600">
                {showAllTech ? '−' : `+${project.techStack.length - 3}`}
              </button>
            )}
          </div>

          {/* Buttons - Compact */}
          <div className="flex gap-2">
            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" 
               className="flex-1 flex items-center justify-center px-3 py-1.5 bg-gray-100 dark:bg-dark-500 text-gray-700 dark:text-gray-300 text-sm rounded hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
              </svg>
              Code
            </a>
            {project.liveDemo !== '#' && (
              <a href={project.liveDemo} target="_blank" rel="noopener noreferrer"
                 className="flex-1 flex items-center justify-center px-3 py-1.5 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm rounded hover:shadow-lg transition-all">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Demo
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Showcase View - Detailed Layout
  return (
    <div className="group relative bg-white dark:bg-dark-400 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 dark:border-dark-500 hover:scale-[1.01]">
      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-md">
            ⭐ Featured
          </span>
        </div>
      )}

      <div className={`flex flex-col lg:flex-row ${!isEven ? 'lg:flex-row-reverse' : ''} min-h-[300px]`}>
        {/* Computer/Device Mockup Section */}
        <div className="relative lg:w-1/2 bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 dark:from-dark-300 dark:via-dark-200 dark:to-dark-100 flex items-center justify-center p-6">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-6 left-6 w-8 h-8 bg-primary-400 rounded-full"></div>
            <div className="absolute top-10 right-10 w-6 h-6 bg-secondary-400 rounded-full"></div>
            <div className="absolute bottom-8 left-10 w-4 h-4 bg-accent-400 rounded-full"></div>
          </div>

          {/* Real Computer Mockup */}
          <div className="relative transform transition-transform duration-500 group-hover:scale-105">
            {/* Laptop Screen */}
            <div className="relative bg-gray-800 dark:bg-gray-900 rounded-t-lg p-1 shadow-2xl">
              <div className="bg-gray-700 dark:bg-gray-800 rounded-t-md p-2 flex items-center space-x-1">
                <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
                <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></div>
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                <div className="flex-1 bg-gray-600 dark:bg-gray-700 rounded-sm mx-3 h-4 flex items-center justify-center">
                  <span className="text-xs text-gray-300">{project.title.split(' - ')[0]}</span>
                </div>
              </div>
              
              {/* Screen Content */}
              <div className="bg-white dark:bg-gray-100 w-48 h-28 rounded-b-md p-2 relative overflow-hidden">
                {/* Fake UI Elements */}
                <div className="space-y-1">
                  <div className="h-3 bg-gradient-to-r from-primary-200 to-secondary-200 rounded w-3/4"></div>
                  <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                </div>
                
                {/* Project Icon */}
                <div className="absolute bottom-2 right-2 text-3xl opacity-20">
                  {project.title.includes('Aura') ? '🤖' :
                   project.title.includes('TeamSync') ? '👥' :
                   project.title.includes('RentEase') ? '🏠' :
                   project.title.includes('FurEverHome') ? '🐕' :
                   project.title.includes('FeedWise') ? '📡' :
                   project.title.includes('NetPulse') ? '📊' : '💻'}
                </div>
              </div>
            </div>
            
            {/* Laptop Base */}
            <div className="bg-gray-300 dark:bg-gray-600 h-2 rounded-b-xl shadow-lg relative">
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gray-400 dark:bg-gray-500"></div>
            </div>
          </div>
        </div>

        {/* Project Details Section */}
        <div className="lg:w-1/2 p-6 flex flex-col justify-center space-y-4">
          {/* Title */}
          <div>
            <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-300 mb-2">
              {project.title}
            </h3>
            <div className="w-12 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"></div>
          </div>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Technologies:</h4>
            <div className="flex flex-wrap gap-2">
              {displayedTech.map((tech, techIndex) => (
                <span key={techIndex} className="px-2.5 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-sm font-medium rounded-md border border-primary-200 dark:border-primary-800">
                  {tech}
                </span>
              ))}
            </div>
            
            {project.techStack.length > 3 && (
              <button onClick={() => setShowAllTech(!showAllTech)} className="text-sm text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 font-medium">
                {showAllTech ? 'Show Less' : `Show ${project.techStack.length - 3} More`}
              </button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" 
               className="flex items-center justify-center px-4 py-2 bg-gray-100 dark:bg-dark-500 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-dark-600 transition-all duration-200">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
              </svg>
              View Code
            </a>
            
            {project.liveDemo !== '#' && (
              <a href={project.liveDemo} target="_blank" rel="noopener noreferrer"
                 className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-200">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500"></div>
    </div>
  );
};

export default ProjectCard;
