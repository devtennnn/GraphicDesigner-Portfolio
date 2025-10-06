import React, { useState, useMemo } from 'react';
import type { DeveloperPortfolioProject, Language } from '../types';
import SectionHeader from './SectionHeader';
import TechIcon from './TechIcon';

const DeveloperPortfolioCard: React.FC<{ project: DeveloperPortfolioProject; language: Language }> = ({ project, language }) => {
  const content = {
    en: { liveDemo: "Live Demo", sourceCode: "Source Code" },
    km: { liveDemo: "មើលផ្ទាល់", sourceCode: "កូដប្រភព" }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl flex flex-col">
      <div className="aspect-video w-full overflow-hidden border-b">
        <img
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          src={project.imageUrl}
          alt={project.title[language]}
          loading="lazy"
        />
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold text-gray-900">{project.title[language]}</h3>
        <p className="mt-2 text-sm text-gray-600 flex-grow">{project.description[language]}</p>
        
        <div className="mt-4">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Tech Stack</h4>
          <div className="mt-2 flex flex-wrap gap-3">
            {project.techStack.map(tech => <TechIcon key={tech} tech={tech} />)}
          </div>
        </div>
      </div>
      <div className="p-4 bg-gray-50 border-t flex flex-col sm:flex-row items-center sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3">
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto text-center text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 px-4 py-2 rounded-md border border-gray-300 transition-colors">
          {content[language].liveDemo}
        </a>
        <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto text-center text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 px-4 py-2 rounded-md transition-colors">
          {content[language].sourceCode}
        </a>
      </div>
    </div>
  );
};

interface DeveloperPortfolioProps {
  language: Language;
  projects: DeveloperPortfolioProject[];
}

const DeveloperPortfolio: React.FC<DeveloperPortfolioProps> = ({ language, projects }) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const content = {
    en: {
      title: 'Developer Portfolio',
      subtitle: 'A selection of my coding projects and technical work.',
      all: 'All'
    },
    km: {
      title: 'គម្រោង​កូដ',
      subtitle: 'ការជ្រើសរើសគម្រោងកូដ និងការងារបច្ចកទេសរបស់ខ្ញុំ។',
      all: 'ទាំងអស់'
    }
  };

  const allTechs = useMemo(() => {
    const techs = new Set<string>();
    projects.forEach(p => p.techStack.forEach(t => techs.add(t)));
    return ['All', ...Array.from(techs).sort()];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') {
      return projects;
    }
    return projects.filter(p => p.techStack.includes(activeFilter));
  }, [projects, activeFilter]);

  const getFilterDisplayName = (filter: string) => {
    if (filter === 'All') return content[language].all;
    if (filter.toLowerCase() === 'html5' || filter.toLowerCase() === 'css3') return filter.toUpperCase();
    return filter.charAt(0).toUpperCase() + filter.slice(1);
  };

  return (
    <section id="dev-portfolio" className="py-16 sm:py-24">
      <SectionHeader 
        title={content[language].title}
        subtitle={content[language].subtitle}
      />

      <div className="mt-8 flex justify-center flex-wrap gap-2 sm:gap-3">
        {allTechs.map(tech => (
          <button
            key={tech}
            onClick={() => setActiveFilter(tech)}
            className={`px-4 py-2 text-sm font-medium rounded-full border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ${
              activeFilter === tech
                ? 'bg-gray-800 text-white border-gray-800'
                : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'
            }`}
          >
            {getFilterDisplayName(tech)}
          </button>
        ))}
      </div>

      <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2">
        {filteredProjects.map((project) => (
          <DeveloperPortfolioCard key={project.id} project={project} language={language} />
        ))}
      </div>
      <hr className="border-t border-gray-200 w-full mx-auto mt-16 sm:mt-24" />
    </section>
  );
};

export default DeveloperPortfolio;