import React, { useState } from 'react';
import { NAV_LINKS } from '../constants';
import type { NavLink, Language, SocialLink } from '../types';

interface HeaderProps {
  language: Language;
  toggleLanguage: () => void;
  socialLinks: SocialLink[];
}

const Header: React.FC<HeaderProps> = ({ language, toggleLanguage, socialLinks }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const siteTitle = {
    en: 'TEN Designer',
    km: 'TEN ឌីហ្សាញ'
  }

  const socialLinksComponent = (
    <div className="flex items-center space-x-4 text-lg">
      {socialLinks.map((link, index) => (
        <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.platform} className="text-gray-500 hover:text-gray-900 transition-colors">
          <i className={link.icon}></i>
        </a>
      ))}
    </div>
  );
  
  const languageSwitcher = (
    <button
      onClick={toggleLanguage}
      className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
      aria-label={`Switch to ${language === 'en' ? 'Khmer' : 'English'}`}
    >
      {language === 'en' ? 'KM' : 'EN'}
    </button>
  );

  return (
    <header className="bg-[#FBFBFA] z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4 sm:py-6 border-b border-gray-200">
          <div className="flex-shrink-0">
            <a href="#" className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900">{siteTitle[language]}</a>
          </div>

          <div className="hidden md:flex items-center">
            <nav className="ml-10">
              <div className="flex items-baseline space-x-1">
                {NAV_LINKS.map((link: NavLink) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm transition-colors"
                  >
                    {link.name[language]}
                  </a>
                ))}
              </div>
            </nav>
            <div className="ml-4 border-l border-gray-200 pl-4 flex items-center">
                {languageSwitcher}
                <div className="ml-2">{socialLinksComponent}</div>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
              <svg className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_LINKS.map((link: NavLink) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium"
              >
                {link.name[language]}
              </a>
            ))}
          </div>
          <div className="border-t border-gray-200 pt-4 pb-3">
             <div className="px-5 flex justify-between items-center">
                {socialLinksComponent}
                {languageSwitcher}
             </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;