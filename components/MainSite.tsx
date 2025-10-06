import React, { useState } from 'react';
import Header from './Header';
import About from './About';
import Portfolio from './Portfolio';
import DeveloperPortfolio from './DeveloperPortfolio';
import Services from './Services';
import Contact from './Contact';
import type { Language, ServiceCategory, PortfolioProject, DeveloperPortfolioProject, SocialLink } from '../types';

interface MainSiteProps {
  serviceCategories: ServiceCategory[];
  portfolioProjects: PortfolioProject[];
  developerPortfolioProjects: DeveloperPortfolioProject[];
  socialLinks: SocialLink[];
}

const MainSite: React.FC<MainSiteProps> = ({ serviceCategories, portfolioProjects, developerPortfolioProjects, socialLinks }) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === 'en' ? 'km' : 'en'));
  };

  const activeSocialLinks = socialLinks.filter(link => link.isActive);

  const footerText = {
    en: `© ${new Date().getFullYear()} TEN Designer. All rights reserved.`,
    km: `© ${new Date().getFullYear()} TEN ឌីហ្សាញ. រក្សា​រ​សិទ្ធ​គ្រប់យ៉ាង។`
  }

  return (
    <div className="bg-[#FBFBFA] min-h-screen text-gray-800 font-['Kantumruy_Pro']">
      <Header language={language} toggleLanguage={toggleLanguage} socialLinks={activeSocialLinks} />
      <About language={language} />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Portfolio language={language} projects={portfolioProjects} />
        <DeveloperPortfolio language={language} projects={developerPortfolioProjects} />
        <Services language={language} serviceCategories={serviceCategories} />
        <Contact language={language} />
      </main>
      <footer className="text-center py-8 text-gray-500 text-sm">
        <div className="mb-4 flex justify-center space-x-6 text-xl sm:text-2xl">
           {activeSocialLinks.map((link, index) => (
             <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.platform} className="text-gray-500 hover:text-gray-900 transition-colors">
                <i className={link.icon}></i>
             </a>
           ))}
        </div>
        <p>{footerText[language]}</p>
      </footer>
    </div>
  );
};

export default MainSite;