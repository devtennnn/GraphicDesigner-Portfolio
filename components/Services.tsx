import React, { useState } from 'react';
import type { ServiceCategory, Language } from '../types';
import SectionHeader from './SectionHeader';

interface ServicesProps {
  language: Language;
  serviceCategories: ServiceCategory[];
}

const Services: React.FC<ServicesProps> = ({ language, serviceCategories }) => {
  const [openCategoryIndex, setOpenCategoryIndex] = useState<number | null>(null);

  const handleToggleCategory = (index: number) => {
    setOpenCategoryIndex(prevIndex => (prevIndex === index ? null : index));
  };

  const content = {
    en: {
      title: 'Services',
      subtitle: 'I offer a wide range of design services. Select a category to see the options and prices.',
    },
    km: {
      title: 'សេវាកម្ម',
      subtitle: 'ខ្ញុំផ្តល់ជូននូវសេវាកម្មរចនាជាច្រើនប្រភេទ។ សូមជ្រើសរើសប្រភេទដើម្បីមើលជម្រើស និងតម្លៃ។',
    }
  }

  return (
    <section id="services" className="py-16 sm:py-24">
       <SectionHeader 
        title={content[language].title}
        subtitle={content[language].subtitle}
      />
      <div className="mt-12 space-y-4 max-w-3xl mx-auto">
        {serviceCategories.map((category: ServiceCategory, catIndex: number) => {
          const isOpen = openCategoryIndex === catIndex;
          return (
            <div key={`${category.category.en}-${catIndex}`} className="border border-gray-200 rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-md">
              <button
                onClick={() => handleToggleCategory(catIndex)}
                className="w-full flex justify-between items-center text-left px-6 py-4 bg-white hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
                aria-expanded={isOpen}
                aria-controls={`service-category-${catIndex}`}
              >
                <h3 className="text-lg font-semibold text-gray-800">{category.category[language]}</h3>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-6 w-6 text-gray-500 transform transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              <div
                id={`service-category-${catIndex}`}
                className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[1000px]' : 'max-h-0'}`}
              >
                <div className="bg-gray-50/50 divide-y divide-gray-200 border-t border-gray-200">
                  {category.items.map((item, itemIndex) => (
                    <div 
                      key={`${catIndex}-${itemIndex}`} 
                      className="px-6 py-4 flex justify-between items-start gap-4"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.name[language]}</p>
                        {item.description && (
                          <p className="text-sm text-gray-500 mt-1">{item.description[language]}</p>
                        )}
                      </div>
                      <p className="text-sm text-gray-700 font-medium whitespace-nowrap">{item.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
       <hr className="border-t border-gray-200 w-full mx-auto mt-16 sm:mt-24" />
    </section>
  );
};

export default Services;