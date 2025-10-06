import React, { useEffect } from 'react';
import type { PortfolioProject, Language } from '../types';

interface PortfolioModalProps {
  project: PortfolioProject;
  onClose: () => void;
  language: Language;
}

const PortfolioModal: React.FC<PortfolioModalProps> = ({ project, onClose, language }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  const content = {
    en: {
      about: 'About the Project',
    },
    km: {
      about: 'អំពីគម្រោង',
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4 transition-opacity duration-300 animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="portfolio-modal-title"
    >
      <div
        className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col transform transition-transform duration-300 animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 md:p-8 flex-shrink-0 flex justify-between items-start">
            <h2 id="portfolio-modal-title" className="text-2xl md:text-3xl font-bold text-gray-900 pr-4">
              {project.title[language]}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close modal"
            >
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
        </div>

        <div className="flex-grow min-h-0 px-6 md:px-8 pb-8">
            <div className="aspect-w-4 aspect-h-3 bg-gray-100 rounded-md overflow-hidden mb-6">
                 <img
                    className="w-full h-full object-cover"
                    src={project.imageUrl}
                    alt={project.title[language]}
                    loading="lazy"
                />
            </div>
            <div className="text-gray-700">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">
                        {content[language].about}
                    </h3>
                    <p className="text-base leading-relaxed">{project.description[language]}</p>
                </div>
            </div>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
        .animate-scaleUp { animation: scaleUp 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default PortfolioModal;