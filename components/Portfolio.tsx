import React, { useState, useMemo } from 'react';
import type { PortfolioProject, Language } from '../types';
import SectionHeader from './SectionHeader';
import TechIcon from './TechIcon';

interface PortfolioCardProps {
  project: PortfolioProject;
  language: Language;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ project, language }) => {
  return (
    <div className="group bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl text-left w-full h-full flex flex-col">
      <div className="aspect-square w-full overflow-hidden">
        <img
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          src={project.imageUrl}
          alt={project.title[language]}
          loading="lazy"
        />
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold text-gray-900">{project.title[language]}</h3>
        <div className="mt-auto pt-4">
          <div className="flex flex-wrap gap-3 items-center">
            {project.tools.map(tool => <TechIcon key={tool} tech={tool} />)}
          </div>
        </div>
      </div>
    </div>
  );
};


interface PortfolioProps {
  language: Language;
  projects: PortfolioProject[];
}

const Portfolio: React.FC<PortfolioProps> = ({ language, projects }) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const content = {
    en: {
      title: 'Portfolio Design',
      subtitle: 'Here are some of the projects I have worked on.',
      all: 'All',
    },
    km: {
      title: 'គម្រោង​រចនា',
      subtitle: 'នេះគឺជាគម្រោងមួយចំនួនដែលខ្ញុំបានធ្វើកន្លងមក។',
      all: 'ទាំងអស់',
    }
  };

  const allCategories = useMemo(() => {
    const categories = new Set<string>();
    projects.forEach(p => p.categories?.forEach(c => categories.add(c)));
    return ['All', ...Array.from(categories).sort()];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') {
      return projects;
    }
    return projects.filter(p => p.categories?.includes(activeFilter));
  }, [projects, activeFilter]);
  
  const getFilterDisplayName = (filter: string) => {
    if (filter === 'All') return content[language].all;
    return filter;
  };

  return (
    <>
      <section id="portfolio" className="py-16 sm:py-24">
        <SectionHeader 
          title={content[language].title}
          subtitle={content[language].subtitle}
        />
        
        <div className="mt-8 flex justify-center flex-wrap gap-2 sm:gap-3">
          {allCategories.map(category => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 text-sm font-medium rounded-full border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ${
                activeFilter === category
                  ? 'bg-gray-800 text-white border-gray-800'
                  : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'
              }`}
            >
              {getFilterDisplayName(category)}
            </button>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <PortfolioCard key={project.id} project={project} language={language} />
          ))}
        </div>
        <hr className="border-t border-gray-200 w-full mx-auto mt-16 sm:mt-24" />
      </section>
    </>
  );
};

export default Portfolio;