import React, { useState, useEffect } from 'react';
import type { ServiceCategory, PortfolioProject, DeveloperPortfolioProject, SocialLink, Language } from '../../types';

interface AdminDashboardProps {
  initialServices: ServiceCategory[];
  initialPortfolio: PortfolioProject[];
  initialDeveloperPortfolio: DeveloperPortfolioProject[];
  initialSocialLinks: SocialLink[];
  onSaveServices: (updatedServices: ServiceCategory[]) => void;
  onSavePortfolio: (updatedProjects: PortfolioProject[]) => void;
  onSaveDeveloperPortfolio: (updatedProjects: DeveloperPortfolioProject[]) => void;
  onSaveSocialLinks: (updatedLinks: SocialLink[]) => void;
  onLogout: () => void;
}

type SaveState = 'idle' | 'saving' | 'saved';
type ActiveTab = 'services' | 'portfolio' | 'developer' | 'social';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  initialServices, 
  initialPortfolio, 
  initialDeveloperPortfolio,
  initialSocialLinks,
  onSaveServices, 
  onSavePortfolio, 
  onSaveDeveloperPortfolio,
  onSaveSocialLinks,
  onLogout 
}) => {
  const [services, setServices] = useState<ServiceCategory[]>(initialServices);
  const [portfolio, setPortfolio] = useState<PortfolioProject[]>(initialPortfolio);
  const [developerPortfolio, setDeveloperPortfolio] = useState<DeveloperPortfolioProject[]>(initialDeveloperPortfolio);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(initialSocialLinks);
  const [saveState, setSaveState] = useState<SaveState>('idle');
  const [activeTab, setActiveTab] = useState<ActiveTab>('portfolio');

  useEffect(() => setServices(initialServices), [initialServices]);
  useEffect(() => setPortfolio(initialPortfolio), [initialPortfolio]);
  useEffect(() => setDeveloperPortfolio(initialDeveloperPortfolio), [initialDeveloperPortfolio]);
  useEffect(() => setSocialLinks(initialSocialLinks), [initialSocialLinks]);

  const resetSaveState = () => {
    if (saveState !== 'idle') {
      setSaveState('idle');
    }
  };
  
  // --- Category Handlers ---
  const handleAddCategory = () => {
    const newCategory: ServiceCategory = {
      category: { en: 'New Category', km: 'ប្រភេទថ្មី' },
      items: [],
    };
    setServices([...services, newCategory]);
    resetSaveState();
  };

  const handleRemoveCategory = (catIndex: number) => {
    const category = services[catIndex];
    const categoryName = category.category.en || 'this category';
    if (window.confirm(`Are you sure you want to delete "${categoryName}" and all ${category.items.length} items in it? This cannot be undone.`)) {
      setServices(services.filter((_, index) => index !== catIndex));
      resetSaveState();
    }
  };

  const handleDuplicateCategory = (catIndex: number) => {
    const categoryToDuplicate = services[catIndex];
    const duplicatedCategory: ServiceCategory = {
      category: { 
        en: `${categoryToDuplicate.category.en} (Copy)`, 
        km: `${categoryToDuplicate.category.km} (ចម្លង)` 
      },
      items: categoryToDuplicate.items.map(item => ({ ...item })), // Deep copy items
    };
    setServices([...services, duplicatedCategory]);
    resetSaveState();
  };

  const handleMoveCategory = (catIndex: number, direction: 'up' | 'down') => {
    const newServices = [...services];
    const targetIndex = direction === 'up' ? catIndex - 1 : catIndex + 1;
    
    if (targetIndex >= 0 && targetIndex < newServices.length) {
      [newServices[catIndex], newServices[targetIndex]] = [newServices[targetIndex], newServices[catIndex]];
      setServices(newServices);
      resetSaveState();
    }
  };
  
  const handleCategoryChange = (catIndex: number, lang: Language, value: string) => {
    const newServices = [...services];
    newServices[catIndex].category[lang] = value;
    setServices(newServices);
    resetSaveState();
  };

  const handleImportCategory = (categoryData: string) => {
    try {
      const importedCategory = JSON.parse(categoryData);
      if (importedCategory.category && importedCategory.items) {
        setServices([...services, importedCategory]);
        resetSaveState();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const handleExportCategory = (catIndex: number) => {
    const category = services[catIndex];
    const dataStr = JSON.stringify(category, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${category.category.en.replace(/\s+/g, '_')}_category.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // --- Service Item Handlers ---
  const handleAddItem = (catIndex: number) => {
    const newItem = {
      name: { en: '', km: '' },
      description: { en: '', km: '' },
      price: '',
    };
    const newServices = [...services];
    newServices[catIndex].items.push(newItem);
    setServices(newServices);
    resetSaveState();
  };
  
  const handleRemoveItem = (catIndex: number, itemIndex: number) => {
     if (window.confirm('Are you sure you want to delete this service item?')) {
        const newServices = [...services];
        newServices[catIndex].items = newServices[catIndex].items.filter((_, index) => index !== itemIndex);
        setServices(newServices);
        resetSaveState();
     }
  };

  const handleItemChange = (catIndex: number, itemIndex: number, field: 'name' | 'description' | 'price', value: string, lang?: Language) => {
    const newServices = [...services];
    const item = newServices[catIndex].items[itemIndex];
    if (field === 'price') {
      item.price = value;
    } else if (lang) {
      if (!item[field]) { // Initialize if description is undefined
        item[field] = { en: '', km: '' };
      }
      item[field]![lang] = value;
    }
    setServices(newServices);
    resetSaveState();
  };

  // --- Portfolio Handlers ---
  const handleAddProject = () => {
    const maxId = portfolio.reduce((max, p) => p.id > max ? p.id : max, 0);
    const newProject: PortfolioProject = {
      id: maxId + 1,
      title: { en: '', km: '' },
      imageUrl: '',
      description: { en: '', km: '' },
      tools: [],
      categories: [],
    };
    setPortfolio([...portfolio, newProject]);
    resetSaveState();
  };

  const handleRemoveProject = (projectIndex: number) => {
    if (window.confirm('Are you sure you want to delete this portfolio project?')) {
      setPortfolio(portfolio.filter((_, index) => index !== projectIndex));
      resetSaveState();
    }
  };

  const handleMoveProject = (projectIndex: number, direction: 'up' | 'down') => {
    const newPortfolio = [...portfolio];
    const targetIndex = direction === 'up' ? projectIndex - 1 : projectIndex + 1;
    
    if (targetIndex >= 0 && targetIndex < newPortfolio.length) {
      [newPortfolio[projectIndex], newPortfolio[targetIndex]] = [newPortfolio[targetIndex], newPortfolio[projectIndex]];
      setPortfolio(newPortfolio);
      resetSaveState();
    }
  };

  const handleDuplicateProject = (projectIndex: number) => {
    const projectToDuplicate = portfolio[projectIndex];
    const maxId = portfolio.reduce((max, p) => p.id > max ? p.id : max, 0);
    const duplicatedProject: PortfolioProject = {
      ...projectToDuplicate,
      id: maxId + 1,
      title: { 
        en: `${projectToDuplicate.title.en} (Copy)`, 
        km: `${projectToDuplicate.title.km} (ចម្លង)` 
      },
    };
    setPortfolio([...portfolio, duplicatedProject]);
    resetSaveState();
  };

  const handlePortfolioChange = (projectIndex: number, field: keyof PortfolioProject, value: string, lang?: Language) => {
    const newPortfolio = [...portfolio];
    const project = newPortfolio[projectIndex];
    
    if ((field === 'title' || field === 'description') && lang) {
        project[field][lang] = value;
    } else if (field === 'imageUrl') {
        project[field] = value;
    }
    
    setPortfolio(newPortfolio);
    resetSaveState();
  };

  const handleRemovePortfolioTool = (projectIndex: number, toolIndex: number) => {
    setPortfolio(currentPortfolio =>
      currentPortfolio.map((project, pIndex) => {
        if (pIndex === projectIndex) {
          return {
            ...project,
            tools: project.tools.filter((_, tIndex) => tIndex !== toolIndex),
          };
        }
        return project;
      })
    );
    resetSaveState();
  };

  const handleAddPortfolioTool = (projectIndex: number, tool: string) => {
    const newTool = tool.trim().toLowerCase();
    if (newTool) {
      setPortfolio(currentPortfolio => {
        const project = currentPortfolio[projectIndex];
        if (project.tools.map(t => t.toLowerCase()).includes(newTool)) {
          return currentPortfolio;
        }
        return currentPortfolio.map((p, pIndex) => {
          if (pIndex === projectIndex) {
            return {
              ...p,
              tools: [...(p.tools || []), newTool],
            };
          }
          return p;
        });
      });
      resetSaveState();
    }
  };

  const handlePortfolioToolInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, projectIndex: number) => {
      if (e.key === 'Enter' || e.key === ',') {
          e.preventDefault();
          const value = e.currentTarget.value;
          if (value) {
              handleAddPortfolioTool(projectIndex, value);
              e.currentTarget.value = '';
          }
      }
  };

  const handleRemovePortfolioCategory = (projectIndex: number, catIndex: number) => {
    setPortfolio(currentPortfolio =>
      currentPortfolio.map((project, pIndex) => {
        if (pIndex === projectIndex) {
          return {
            ...project,
            categories: (project.categories || []).filter((_, cIndex) => cIndex !== catIndex),
          };
        }
        return project;
      })
    );
    resetSaveState();
  };

  const handleAddPortfolioCategory = (projectIndex: number, category: string) => {
    const newCategory = category.trim();
    if (newCategory) {
      setPortfolio(currentPortfolio => {
        const project = currentPortfolio[projectIndex];
        if ((project.categories || []).map(c => c.toLowerCase()).includes(newCategory.toLowerCase())) {
          return currentPortfolio;
        }
        return currentPortfolio.map((p, pIndex) => {
          if (pIndex === projectIndex) {
            return {
              ...p,
              categories: [...(p.categories || []), newCategory],
            };
          }
          return p;
        });
      });
      resetSaveState();
    }
  };

  const handlePortfolioCategoryInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, projectIndex: number) => {
      if (e.key === 'Enter' || e.key === ',') {
          e.preventDefault();
          const value = e.currentTarget.value;
          if (value) {
              handleAddPortfolioCategory(projectIndex, value);
              e.currentTarget.value = '';
          }
      }
  };


  // --- Developer Portfolio Handlers ---
  const handleAddDeveloperProject = () => {
    const maxId = developerPortfolio.reduce((max, p) => p.id > max ? p.id : max, 0);
    const newProject: DeveloperPortfolioProject = {
      id: maxId + 1,
      title: { en: '', km: '' },
      imageUrl: '',
      description: { en: '', km: '' },
      techStack: [],
      liveUrl: '',
      sourceUrl: '',
    };
    setDeveloperPortfolio([...developerPortfolio, newProject]);
    resetSaveState();
  };

  const handleRemoveDeveloperProject = (projectIndex: number) => {
    if (window.confirm('Are you sure you want to delete this developer project?')) {
      setDeveloperPortfolio(developerPortfolio.filter((_, index) => index !== projectIndex));
      resetSaveState();
    }
  };

  const handleMoveDeveloperProject = (projectIndex: number, direction: 'up' | 'down') => {
    const newDeveloperPortfolio = [...developerPortfolio];
    const targetIndex = direction === 'up' ? projectIndex - 1 : projectIndex + 1;
    
    if (targetIndex >= 0 && targetIndex < newDeveloperPortfolio.length) {
      [newDeveloperPortfolio[projectIndex], newDeveloperPortfolio[targetIndex]] = [newDeveloperPortfolio[targetIndex], newDeveloperPortfolio[projectIndex]];
      setDeveloperPortfolio(newDeveloperPortfolio);
      resetSaveState();
    }
  };

  const handleDuplicateDeveloperProject = (projectIndex: number) => {
    const projectToDuplicate = developerPortfolio[projectIndex];
    const maxId = developerPortfolio.reduce((max, p) => p.id > max ? p.id : max, 0);
    const duplicatedProject: DeveloperPortfolioProject = {
      ...projectToDuplicate,
      id: maxId + 1,
      title: { 
        en: `${projectToDuplicate.title.en} (Copy)`, 
        km: `${projectToDuplicate.title.km} (ចម្លង)` 
      },
    };
    setDeveloperPortfolio([...developerPortfolio, duplicatedProject]);
    resetSaveState();
  };
  
  const handleRemoveTech = (projectIndex: number, techIndex: number) => {
    setDeveloperPortfolio(currentPortfolio =>
      currentPortfolio.map((project, pIndex) => {
        if (pIndex === projectIndex) {
          return {
            ...project,
            techStack: project.techStack.filter((_, tIndex) => tIndex !== techIndex),
          };
        }
        return project;
      })
    );
    resetSaveState();
  };

  const handleAddTech = (projectIndex: number, tech: string) => {
    const newTech = tech.trim();
    if (newTech) {
      setDeveloperPortfolio(currentPortfolio => {
        const project = currentPortfolio[projectIndex];
        // Prevent adding duplicates (case-insensitive)
        if (project.techStack.map(t => t.toLowerCase()).includes(newTech.toLowerCase())) {
          return currentPortfolio;
        }
        return currentPortfolio.map((p, pIndex) => {
          if (pIndex === projectIndex) {
            return {
              ...p,
              techStack: [...p.techStack, newTech],
            };
          }
          return p;
        });
      });
      resetSaveState();
    }
  };

  const handleTechInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, projectIndex: number) => {
      if (e.key === 'Enter' || e.key === ',') {
          e.preventDefault();
          const value = e.currentTarget.value;
          if (value) {
              handleAddTech(projectIndex, value);
              e.currentTarget.value = '';
          }
      }
  };

  const handleDeveloperPortfolioChange = (projectIndex: number, field: keyof DeveloperPortfolioProject, value: string, lang?: Language) => {
    const newPortfolio = [...developerPortfolio];
    const project = newPortfolio[projectIndex];

    if ((field === 'title' || field === 'description') && lang) {
      project[field][lang] = value;
    } else if (field === 'imageUrl' || field === 'liveUrl' || field === 'sourceUrl') {
      project[field] = value;
    }
    
    setDeveloperPortfolio(newPortfolio);
    resetSaveState();
  };
  
  // --- Social Links Handlers ---
  const handleSocialLinkChange = (linkIndex: number, field: keyof SocialLink, value: string | boolean) => {
    const newSocialLinks = [...socialLinks];
    if (field === 'isActive') {
      newSocialLinks[linkIndex][field] = value as boolean;
    } else {
      newSocialLinks[linkIndex][field] = value as string;
    }
    setSocialLinks(newSocialLinks);
    resetSaveState();
  };

  const handleAddSocialLink = () => {
    const newLink: SocialLink = {
      platform: '',
      url: '',
      icon: 'fa-brands fa-',
      isActive: true,
    };
    setSocialLinks([...socialLinks, newLink]);
    resetSaveState();
  };

  const handleRemoveSocialLink = (linkIndex: number) => {
    if (window.confirm('Are you sure you want to delete this social link?')) {
      setSocialLinks(socialLinks.filter((_, index) => index !== linkIndex));
      resetSaveState();
    }
  };
  
  const handleSaveChanges = () => {
    setSaveState('saving');
    onSaveServices(services);
    onSavePortfolio(portfolio);
    onSaveDeveloperPortfolio(developerPortfolio);
    onSaveSocialLinks(socialLinks);
    setTimeout(() => {
      setSaveState('saved');
    }, 1000);
  };

  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset all data to the original defaults? This action cannot be undone.')) {
        localStorage.removeItem('TEN_DESIGNER_SERVICES');
        localStorage.removeItem('TEN_DESIGNER_PORTFOLIO');
        localStorage.removeItem('TEN_DESIGNER_DEV_PORTFOLIO');
        localStorage.removeItem('TEN_DESIGNER_SOCIAL_LINKS');
        window.location.reload();
    }
  };

  const saveButtonText = {
    idle: 'Save All Changes',
    saving: 'Saving...',
    saved: 'Saved!'
  };

  const saveButtonClasses = {
    idle: 'bg-gray-800 hover:bg-gray-900',
    saving: 'bg-gray-500 cursor-not-allowed',
    saved: 'bg-green-600 hover:bg-green-700'
  };

  const AddNewButton: React.FC<{onClick: () => void, children: React.ReactNode}> = ({onClick, children}) => (
    <button 
      onClick={onClick} 
      className="w-full flex items-center justify-center gap-2 text-center font-medium text-gray-600 bg-white hover:bg-gray-50 border-2 border-dashed border-gray-300 hover:border-gray-400 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
      </svg>
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-['Kantumruy_Pro']">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleSaveChanges}
              disabled={saveState === 'saving'}
              className={`inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${saveButtonClasses[saveState]} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors`}
            >
               {saveState === 'saved' ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Saved!
                  </>
                ) : saveButtonText[saveState]}
            </button>
            <button
              onClick={handleResetData}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
            >
              Reset Data
            </button>
            <button
              onClick={onLogout}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        
        {/* Tab Navigation */}
        <div className="px-4 sm:px-0 mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('portfolio')}
                className={`${
                  activeTab === 'portfolio'
                    ? 'border-gray-800 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors focus:outline-none`}
              >
                Design Portfolio
              </button>
              <button
                onClick={() => setActiveTab('developer')}
                className={`${
                  activeTab === 'developer'
                    ? 'border-gray-800 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors focus:outline-none`}
              >
                Developer Portfolio
              </button>
              <button
                onClick={() => setActiveTab('services')}
                className={`${
                  activeTab === 'services'
                    ? 'border-gray-800 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors focus:outline-none`}
              >
                Services
              </button>
              <button
                onClick={() => setActiveTab('social')}
                className={`${
                  activeTab === 'social'
                    ? 'border-gray-800 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors focus:outline-none`}
              >
                Social Links
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="px-4 sm:px-0">
          {activeTab === 'services' && (
            <div className="space-y-8">
                <div className="px-4 py-5 sm:px-6 bg-white shadow-sm rounded-lg border border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h3 className="text-xl leading-6 font-semibold text-gray-900">Edit Service Categories</h3>
                            <p className="mt-2 max-w-2xl text-sm text-gray-500">Update, add, remove, or reorder service categories and their items.</p>
                        </div>
                        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {services.length} Categories
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                {services.reduce((total, cat) => total + cat.items.length, 0)} Total Items
                            </span>
                        </div>
                    </div>
                </div>
                {services.map((category, catIndex) => (
                    <div key={catIndex} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                <div className="flex items-center space-x-3">
                                    <div className="flex flex-col space-y-1">
                                        <button 
                                            onClick={() => handleMoveCategory(catIndex, 'up')}
                                            disabled={catIndex === 0}
                                            className="text-gray-400 hover:text-gray-600 disabled:opacity-25 disabled:cursor-not-allowed"
                                            title="Move up"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                                            </svg>
                                        </button>
                                        <button 
                                            onClick={() => handleMoveCategory(catIndex, 'down')}
                                            disabled={catIndex === services.length - 1}
                                            className="text-gray-400 hover:text-gray-600 disabled:opacity-25 disabled:cursor-not-allowed"
                                            title="Move down"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-800">
                                            {category.category.en || `Category #${catIndex + 1}`}
                                        </h4>
                                        <p className="text-sm text-gray-500">
                                            {category.items.length} item{category.items.length !== 1 ? 's' : ''}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button 
                                        onClick={() => handleExportCategory(catIndex)}
                                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                                        title="Export category"
                                    >
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        Export
                                    </button>
                                    <button 
                                        onClick={() => handleDuplicateCategory(catIndex)}
                                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                                        title="Duplicate category"
                                    >
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                        Copy
                                    </button>
                                    <button 
                                        onClick={() => handleRemoveCategory(catIndex)} 
                                        className="inline-flex items-center px-3 py-1.5 border border-red-300 text-xs font-medium rounded text-red-700 bg-red-50 hover:bg-red-100 transition-colors"
                                        title="Delete category"
                                    >
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-6">
                                 <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category Name (English) *</label>
                                    <input 
                                        type="text" 
                                        value={category.category.en} 
                                        onChange={e => handleCategoryChange(catIndex, 'en', e.target.value)} 
                                        className="w-full shadow-sm focus:ring-gray-500 focus:border-gray-500 text-sm border-gray-300 rounded-md"
                                        placeholder="e.g., Logo Design"
                                        required
                                    />
                                </div>
                                 <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category Name (Khmer) *</label>
                                    <input 
                                        type="text" 
                                        value={category.category.km} 
                                        onChange={e => handleCategoryChange(catIndex, 'km', e.target.value)} 
                                        className="w-full shadow-sm focus:ring-gray-500 focus:border-gray-500 text-sm border-gray-300 rounded-md"
                                        placeholder="e.g., ការរចនាស្លាកសញ្ញា"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <h5 className="text-md font-semibold text-gray-700 mb-4">Service Items</h5>
                            <div className="space-y-6">
                                {category.items.map((item, itemIndex) => (
                                    <div key={itemIndex} className="p-4 border rounded-md bg-slate-50 relative">
                                        <button onClick={() => handleRemoveItem(catIndex, itemIndex)} className="absolute top-2 right-2 text-gray-400 hover:text-red-600" aria-label="Remove item">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                        </button>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4 mb-2">
                                            <div>
                                              <label className="block text-sm font-medium text-gray-700 mb-1">Service Name (EN)</label>
                                              <input type="text" value={item.name.en} onChange={e => handleItemChange(catIndex, itemIndex, 'name', e.target.value, 'en')} className="shadow-sm w-full focus:ring-gray-500 focus:border-gray-500 text-sm border-gray-300 rounded-md" />
                                            </div>
                                            <div>
                                              <label className="block text-sm font-medium text-gray-700 mb-1">Service Name (KM)</label>
                                              <input type="text" value={item.name.km} onChange={e => handleItemChange(catIndex, itemIndex, 'name', e.target.value, 'km')} className="shadow-sm w-full focus:ring-gray-500 focus:border-gray-500 text-sm border-gray-300 rounded-md" />
                                            </div>
                                            <div>
                                              <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                                              <input type="text" value={item.price} onChange={e => handleItemChange(catIndex, itemIndex, 'price', e.target.value)} className="shadow-sm w-full focus:ring-gray-500 focus:border-gray-500 text-sm border-gray-300 rounded-md" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                                            <div>
                                              <label className="block text-sm font-medium text-gray-700 mb-1">Description (EN, optional)</label>
                                              <input type="text" value={item.description?.en || ''} onChange={e => handleItemChange(catIndex, itemIndex, 'description', e.target.value, 'en')} className="shadow-sm w-full focus:ring-gray-500 focus:border-gray-500 text-sm border-gray-300 rounded-md" />
                                            </div>
                                            <div>
                                              <label className="block text-sm font-medium text-gray-700 mb-1">Description (KM, optional)</label>
                                              <input type="text" value={item.description?.km || ''} onChange={e => handleItemChange(catIndex, itemIndex, 'description', e.target.value, 'km')} className="shadow-sm w-full focus:ring-gray-500 focus:border-gray-500 text-sm border-gray-300 rounded-md" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                             <button onClick={() => handleAddItem(catIndex)} className="mt-6 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md transition-colors inline-flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>
                                Add Service Item
                            </button>
                        </div>
                    </div>
                ))}
                <AddNewButton onClick={handleAddCategory}>Add New Category</AddNewButton>
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div className="space-y-8">
                <div className="px-4 py-5 sm:px-6 bg-white shadow-sm rounded-lg border border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h3 className="text-xl leading-6 font-semibold text-gray-900">Edit Designer Portfolio</h3>
                            <p className="mt-2 max-w-2xl text-sm text-gray-500">Update, add, remove, or reorder design portfolio projects.</p>
                        </div>
                        <div className="mt-4 sm:mt-0">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {portfolio.length} Projects
                            </span>
                        </div>
                    </div>
                </div>
                {portfolio.map((project, projectIndex) => (
                    <div key={project.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                <div className="flex items-center space-x-3">
                                    <div className="flex flex-col space-y-1">
                                        <button 
                                            onClick={() => handleMoveProject(projectIndex, 'up')}
                                            disabled={projectIndex === 0}
                                            className="text-gray-400 hover:text-gray-600 disabled:opacity-25 disabled:cursor-not-allowed"
                                            title="Move up"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                                            </svg>
                                        </button>
                                        <button 
                                            onClick={() => handleMoveProject(projectIndex, 'down')}
                                            disabled={projectIndex === portfolio.length - 1}
                                            className="text-gray-400 hover:text-gray-600 disabled:opacity-25 disabled:cursor-not-allowed"
                                            title="Move down"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-800">
                                            {project.title.en || 'New Project'}
                                        </h4>
                                        <p className="text-sm text-gray-500">
                                            Position #{projectIndex + 1}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button 
                                        onClick={() => handleDuplicateProject(projectIndex)}
                                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                                        title="Duplicate project"
                                    >
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                        Copy
                                    </button>
                                    <button 
                                        onClick={() => handleRemoveProject(projectIndex)} 
                                        className="inline-flex items-center px-3 py-1.5 border border-red-300 text-xs font-medium rounded text-red-700 bg-red-50 hover:bg-red-100 transition-colors"
                                        title="Delete project"
                                    >
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                    <input type="text" placeholder="https://example.com/image.jpg" value={project.imageUrl} onChange={e => handlePortfolioChange(projectIndex, 'imageUrl', e.target.value)} className="w-full shadow-sm focus:ring-gray-500 focus:border-gray-500 text-sm border-gray-300 rounded-md" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Title (EN)</label>
                                    <input type="text" value={project.title.en} onChange={e => handlePortfolioChange(projectIndex, 'title', e.target.value, 'en')} className="w-full shadow-sm focus:ring-gray-500 focus:border-gray-500 text-sm border-gray-300 rounded-md" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Title (KM)</label>
                                    <input type="text" value={project.title.km} onChange={e => handlePortfolioChange(projectIndex, 'title', e.target.value, 'km')} className="w-full shadow-sm focus:ring-gray-500 focus:border-gray-500 text-sm border-gray-300 rounded-md" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description (EN)</label>
                                    <textarea rows={4} value={project.description.en} onChange={e => handlePortfolioChange(projectIndex, 'description', e.target.value, 'en')} className="w-full shadow-sm focus:ring-gray-500 focus:border-gray-500 text-sm border-gray-300 rounded-md" />
                                </div>
                                 <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description (KM)</label>
                                    <textarea rows={4} value={project.description.km} onChange={e => handlePortfolioChange(projectIndex, 'description', e.target.value, 'km')} className="w-full shadow-sm focus:ring-gray-500 focus:border-gray-500 text-sm border-gray-300 rounded-md" />
                                </div>
                                 <div className="md:col-span-2 space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Categories</label>
                                        <div className="flex flex-wrap items-center gap-2 p-2 border border-gray-300 rounded-md bg-white shadow-sm focus-within:ring-1 focus-within:ring-gray-500 focus-within:border-gray-500">
                                            {(project.categories || []).map((category, catIndex) => (
                                                <div key={`${category}-${catIndex}`} className="bg-sky-100 text-sky-800 text-sm font-medium pl-3 pr-2 py-1 rounded-full flex items-center gap-2">
                                                    <span>{category}</span>
                                                    <button 
                                                        type="button" 
                                                        onClick={() => handleRemovePortfolioCategory(projectIndex, catIndex)} 
                                                        className="text-sky-500 hover:text-red-600 hover:bg-sky-200 rounded-full h-4 w-4 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-sky-400 transition-colors"
                                                        aria-label={`Remove ${category}`}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            ))}
                                            <input
                                                type="text"
                                                placeholder="Add category & press Enter"
                                                onKeyDown={(e) => handlePortfolioCategoryInputKeyDown(e, projectIndex)}
                                                className="flex-grow p-1 outline-none bg-transparent text-sm"
                                            />
                                        </div>
                                        <p className="mt-1 text-xs text-gray-500">Type a category name (e.g., UI/UX) and press Enter or comma to add it.</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Tools</label>
                                        <div className="flex flex-wrap items-center gap-2 p-2 border border-gray-300 rounded-md bg-white shadow-sm focus-within:ring-1 focus-within:ring-gray-500 focus-within:border-gray-500">
                                            {(project.tools || []).map((tool, toolIndex) => (
                                                <div key={`${tool}-${toolIndex}`} className="bg-slate-200 text-slate-800 text-sm font-medium pl-3 pr-2 py-1 rounded-full flex items-center gap-2">
                                                    <span>{tool}</span>
                                                    <button 
                                                        type="button" 
                                                        onClick={() => handleRemovePortfolioTool(projectIndex, toolIndex)} 
                                                        className="text-slate-500 hover:text-red-600 hover:bg-slate-300 rounded-full h-4 w-4 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-slate-400 transition-colors"
                                                        aria-label={`Remove ${tool}`}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            ))}
                                            <input
                                                type="text"
                                                placeholder="Add tool & press Enter"
                                                onKeyDown={(e) => handlePortfolioToolInputKeyDown(e, projectIndex)}
                                                className="flex-grow p-1 outline-none bg-transparent text-sm"
                                            />
                                        </div>
                                        <p className="mt-1 text-xs text-gray-500">Type a tool name (e.g., figma) and press Enter or comma to add it.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <AddNewButton onClick={handleAddProject}>Add New Design Project</AddNewButton>
            </div>
          )}

          {activeTab === 'developer' && (
            <div className="space-y-8">
              <div className="px-4 py-5 sm:px-6 bg-white shadow-sm rounded-lg border border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div>
                          <h3 className="text-xl leading-6 font-semibold text-gray-900">Edit Developer Portfolio</h3>
                          <p className="mt-2 max-w-2xl text-sm text-gray-500">Update, add, remove, or reorder developer portfolio projects.</p>
                      </div>
                      <div className="mt-4 sm:mt-0">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {developerPortfolio.length} Projects
                          </span>
                      </div>
                  </div>
              </div>
                {developerPortfolio.map((project, projectIndex) => (
                    <div key={project.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                <div className="flex items-center space-x-3">
                                    <div className="flex flex-col space-y-1">
                                        <button 
                                            onClick={() => handleMoveDeveloperProject(projectIndex, 'up')}
                                            disabled={projectIndex === 0}
                                            className="text-gray-400 hover:text-gray-600 disabled:opacity-25 disabled:cursor-not-allowed"
                                            title="Move up"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                                            </svg>
                                        </button>
                                        <button 
                                            onClick={() => handleMoveDeveloperProject(projectIndex, 'down')}
                                            disabled={projectIndex === developerPortfolio.length - 1}
                                            className="text-gray-400 hover:text-gray-600 disabled:opacity-25 disabled:cursor-not-allowed"
                                            title="Move down"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-800">
                                            {project.title.en || 'New Project'}
                                        </h4>
                                        <p className="text-sm text-gray-500">
                                            Position #{projectIndex + 1}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button 
                                        onClick={() => handleDuplicateDeveloperProject(projectIndex)}
                                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                                        title="Duplicate project"
                                    >
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                        Copy
                                    </button>
                                    <button 
                                        onClick={() => handleRemoveDeveloperProject(projectIndex)} 
                                        className="inline-flex items-center px-3 py-1.5 border border-red-300 text-xs font-medium rounded text-red-700 bg-red-50 hover:bg-red-100 transition-colors"
                                        title="Delete project"
                                    >
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                    <input type="text" placeholder="https://example.com/image.jpg" value={project.imageUrl} onChange={e => handleDeveloperPortfolioChange(projectIndex, 'imageUrl', e.target.value)} className="w-full shadow-sm focus:ring-gray-500 focus:border-gray-500 text-sm border-gray-300 rounded-md" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Title (EN)</label>
                                    <input type="text" value={project.title.en} onChange={e => handleDeveloperPortfolioChange(projectIndex, 'title', e.target.value, 'en')} className="w-full shadow-sm focus:ring-gray-500 focus:border-gray-500 text-sm border-gray-300 rounded-md" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Title (KM)</label>
                                    <input type="text" value={project.title.km} onChange={e => handleDeveloperPortfolioChange(projectIndex, 'title', e.target.value, 'km')} className="w-full shadow-sm focus:ring-gray-500 focus:border-gray-500 text-sm border-gray-300 rounded-md" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description (EN)</label>
                                    <textarea rows={4} value={project.description.en} onChange={e => handleDeveloperPortfolioChange(projectIndex, 'description', e.target.value, 'en')} className="w-full shadow-sm focus:ring-gray-500 focus:border-gray-500 text-sm border-gray-300 rounded-md" />
                                </div>
                                 <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description (KM)</label>
                                    <textarea rows={4} value={project.description.km} onChange={e => handleDeveloperPortfolioChange(projectIndex, 'description', e.target.value, 'km')} className="w-full shadow-sm focus:ring-gray-500 focus:border-gray-500 text-sm border-gray-300 rounded-md" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tech Stack</label>
                                    <div className="flex flex-wrap items-center gap-2 p-2 border border-gray-300 rounded-md bg-white shadow-sm focus-within:ring-1 focus-within:ring-gray-500 focus-within:border-gray-500">
                                        {project.techStack.map((tech, techIndex) => (
                                            <div key={`${tech}-${techIndex}`} className="bg-slate-200 text-slate-800 text-sm font-medium pl-3 pr-2 py-1 rounded-full flex items-center gap-2">
                                                <span>{tech}</span>
                                                <button 
                                                    type="button" 
                                                    onClick={() => handleRemoveTech(projectIndex, techIndex)} 
                                                    className="text-slate-500 hover:text-red-600 hover:bg-slate-300 rounded-full h-4 w-4 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-slate-400 transition-colors"
                                                    aria-label={`Remove ${tech}`}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        ))}
                                        <input
                                            type="text"
                                            placeholder="Add tech & press Enter"
                                            onKeyDown={(e) => handleTechInputKeyDown(e, projectIndex)}
                                            className="flex-grow p-1 outline-none bg-transparent text-sm"
                                        />
                                    </div>
                                    <p className="mt-1 text-xs text-gray-500">Type a technology and press Enter or comma to add it.</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Live Demo URL</label>
                                    <input type="text" placeholder="https://example.com" value={project.liveUrl} onChange={e => handleDeveloperPortfolioChange(projectIndex, 'liveUrl', e.target.value)} className="w-full shadow-sm focus:ring-gray-500 focus:border-gray-500 text-sm border-gray-300 rounded-md" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Source Code URL</label>
                                    <input type="text" placeholder="https://github.com/..." value={project.sourceUrl} onChange={e => handleDeveloperPortfolioChange(projectIndex, 'sourceUrl', e.target.value)} className="w-full shadow-sm focus:ring-gray-500 focus:border-gray-500 text-sm border-gray-300 rounded-md" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <AddNewButton onClick={handleAddDeveloperProject}>Add New Developer Project</AddNewButton>
            </div>
          )}

          {activeTab === 'social' && (
            <div className="space-y-8">
              <div className="px-4 py-5 sm:px-6 bg-white shadow-sm rounded-lg border border-gray-200">
                  <h3 className="text-xl leading-6 font-semibold text-gray-900">Edit Social Links</h3>
                  <p className="mt-2 max-w-2xl text-sm text-gray-500">Manage your social media links that appear in the header and footer.</p>
              </div>
              {socialLinks.map((link, linkIndex) => (
                  <div key={linkIndex} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-6 pb-4 border-b border-gray-200">
                          <h4 className="text-lg font-semibold text-gray-800">
                            {link.platform || 'New Social Link'} 
                            {link.isActive && <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Active</span>}
                            {!link.isActive && <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Inactive</span>}
                          </h4>
                          <button onClick={() => handleRemoveSocialLink(linkIndex)} className="text-red-600 hover:text-red-800 text-sm font-medium self-start sm:self-center">Remove Link</button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                          <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Platform Name</label>
                              <input 
                                type="text" 
                                placeholder="e.g., Instagram, LinkedIn" 
                                value={link.platform} 
                                onChange={e => handleSocialLinkChange(linkIndex, 'platform', e.target.value)} 
                                className="w-full shadow-sm focus:ring-gray-500 focus:border-gray-500 text-sm border-gray-300 rounded-md" 
                              />
                          </div>
                          <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Font Awesome Icon Class</label>
                              <input 
                                type="text" 
                                placeholder="e.g., fa-brands fa-instagram" 
                                value={link.icon} 
                                onChange={e => handleSocialLinkChange(linkIndex, 'icon', e.target.value)} 
                                className="w-full shadow-sm focus:ring-gray-500 focus:border-gray-500 text-sm border-gray-300 rounded-md" 
                              />
                          </div>
                          <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                              <input 
                                type="url" 
                                placeholder="https://..." 
                                value={link.url} 
                                onChange={e => handleSocialLinkChange(linkIndex, 'url', e.target.value)} 
                                className="w-full shadow-sm focus:ring-gray-500 focus:border-gray-500 text-sm border-gray-300 rounded-md" 
                              />
                          </div>
                          <div className="md:col-span-2">
                              <div className="flex items-center">
                                  <input
                                    id={`active-${linkIndex}`}
                                    type="checkbox"
                                    checked={link.isActive}
                                    onChange={e => handleSocialLinkChange(linkIndex, 'isActive', e.target.checked)}
                                    className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                                  />
                                  <label htmlFor={`active-${linkIndex}`} className="ml-2 block text-sm text-gray-900">
                                    Show this link on the website
                                  </label>
                              </div>
                              {link.icon && (
                                <div className="mt-3 flex items-center text-sm text-gray-600">
                                  <span className="mr-2">Preview:</span>
                                  <i className={`${link.icon} text-lg`}></i>
                                </div>
                              )}
                          </div>
                      </div>
                  </div>
              ))}
              <AddNewButton onClick={handleAddSocialLink}>Add New Social Link</AddNewButton>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;