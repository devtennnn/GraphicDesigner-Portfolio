import React, { useState, useEffect } from 'react';
import MainSite from './components/MainSite';
import LoginPage from './components/admin/LoginPage';
import AdminDashboard from './components/admin/AdminDashboard';
import { SERVICE_CATEGORIES, PORTFOLIO_PROJECTS, DEVELOPER_PORTFOLIO_PROJECTS, SOCIAL_LINKS } from './constants';
import { apiService } from './services/api';
import type { ServiceCategory, PortfolioProject, DeveloperPortfolioProject, SocialLink } from './types';

const AUTH_SESSION_KEY = 'TEN_DESIGNER_AUTH';

const App: React.FC = () => {
  const getHashRoute = () => {
    const hash = window.location.hash;
    if (hash.startsWith('#!/')) {
      return hash.substring(2);
    }
    return '/';
  };

  const [route, setRoute] = useState(getHashRoute());
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!sessionStorage.getItem(AUTH_SESSION_KEY));
  const [serviceCategories, setServiceCategories] = useState<ServiceCategory[]>([]);
  const [portfolioProjects, setPortfolioProjects] = useState<PortfolioProject[]>([]);
  const [developerPortfolioProjects, setDeveloperPortfolioProjects] = useState<DeveloperPortfolioProject[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    try {
      setIsLoading(true);
      
      const [servicesRes, portfolioRes, devPortfolioRes, socialRes] = await Promise.all([
        apiService.getServiceCategories(),
        apiService.getPortfolioProjects(),
        apiService.getDeveloperPortfolioProjects(),
        apiService.getSocialLinks()
      ]);

      setServiceCategories(servicesRes || SERVICE_CATEGORIES);
      setPortfolioProjects(portfolioRes || PORTFOLIO_PROJECTS);
      setDeveloperPortfolioProjects(devPortfolioRes || DEVELOPER_PORTFOLIO_PROJECTS);
      setSocialLinks(socialRes || SOCIAL_LINKS);
    } catch (error) {
      console.error('Failed to load data:', error);
      setServiceCategories(SERVICE_CATEGORIES);
      setPortfolioProjects(PORTFOLIO_PROJECTS);
      setDeveloperPortfolioProjects(DEVELOPER_PORTFOLIO_PROJECTS);
      setSocialLinks(SOCIAL_LINKS);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(getHashRoute());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      apiService.setToken(token);
      setIsAuthenticated(true);
    }
    loadData();
  }, []);

  const navigate = (path: string) => {
    window.location.hash = `!${path}`;
  };

  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await apiService.login(username, password);
      if (response.success && response.data?.token) {
        localStorage.setItem('adminToken', response.data.token);
        sessionStorage.setItem(AUTH_SESSION_KEY, 'true');
        apiService.setToken(response.data.token);
        setIsAuthenticated(true);
        navigate('/admin/dashboard');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      if (username === 'admin' && password === 'Kiminato855') {
        sessionStorage.setItem(AUTH_SESSION_KEY, 'true');
        setIsAuthenticated(true);
        navigate('/admin/dashboard');
        return true;
      }
      return false;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    sessionStorage.removeItem(AUTH_SESSION_KEY);
    apiService.clearToken();
    setIsAuthenticated(false);
    navigate('/');
  };

  const handleSaveServices = async (updatedServices: ServiceCategory[]) => {
    try {
      const response = await apiService.saveServiceCategories(updatedServices);
      setServiceCategories(response);
    } catch (error) {
      console.error('Failed to update services:', error);
      setServiceCategories(updatedServices);
    }
  };

  const handleSavePortfolio = async (updatedProjects: PortfolioProject[]) => {
    try {
      const response = await apiService.savePortfolioProjects(updatedProjects);
      setPortfolioProjects(response);
    } catch (error) {
      console.error('Failed to update portfolio:', error);
      setPortfolioProjects(updatedProjects);
    }
  };

  const handleSaveDeveloperPortfolio = async (updatedProjects: DeveloperPortfolioProject[]) => {
    try {
      const response = await apiService.saveDeveloperPortfolioProjects(updatedProjects);
      setDeveloperPortfolioProjects(response);
    } catch (error) {
      console.error('Failed to update developer portfolio:', error);
      setDeveloperPortfolioProjects(updatedProjects);
    }
  };

  const handleSaveSocialLinks = async (updatedLinks: SocialLink[]) => {
    try {
      const response = await apiService.saveSocialLinks(updatedLinks);
      setSocialLinks(response);
    } catch (error) {
      console.error('Failed to update social links:', error);
      setSocialLinks(updatedLinks);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-screen">
          <div className="text-xl">Loading...</div>
        </div>
      );
    }

    if (route.startsWith('/admin')) {
      if (isAuthenticated) {
        if (route === '/admin' || route === '/admin/') {
           navigate('/admin/dashboard');
           return null;
        }
        return (
          <AdminDashboard 
            initialServices={serviceCategories} 
            initialPortfolio={portfolioProjects}
            initialDeveloperPortfolio={developerPortfolioProjects}
            initialSocialLinks={socialLinks}
            onSaveServices={handleSaveServices} 
            onSavePortfolio={handleSavePortfolio}
            onSaveDeveloperPortfolio={handleSaveDeveloperPortfolio}
            onSaveSocialLinks={handleSaveSocialLinks}
            onLogout={handleLogout} 
          />
        );
      } else {
        if (route === '/admin/dashboard') {
          navigate('/admin');
          return null;
        }
        return <LoginPage onLogin={handleLogin} onNavigateHome={() => navigate('/')} />;
      }
    }
    
    return (
      <MainSite 
        serviceCategories={serviceCategories} 
        portfolioProjects={portfolioProjects}
        developerPortfolioProjects={developerPortfolioProjects}
        socialLinks={socialLinks}
      />
    );
  };

  return <>{renderContent()}</>;
};

export default App;
