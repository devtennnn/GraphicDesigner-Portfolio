import type { ServiceCategory, PortfolioProject, DeveloperPortfolioProject, SocialLink } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  private token: string | null = null;

  constructor() {
    // Get token from sessionStorage on initialization
    if (typeof window !== 'undefined') {
      this.token = sessionStorage.getItem('auth_token');
    }
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('auth_token', token);
    }
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('auth_token');
    }
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Network error' }));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth methods
  async login(username: string, password: string) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  logout() {
    this.clearToken();
  }

  // Service Categories
  async getServiceCategories(): Promise<ServiceCategory[]> {
    return this.request('/services');
  }

  async saveServiceCategories(categories: ServiceCategory[]): Promise<ServiceCategory[]> {
    return this.request('/services', {
      method: 'POST',
      body: JSON.stringify(categories),
    });
  }

  // Portfolio Projects
  async getPortfolioProjects(): Promise<PortfolioProject[]> {
    return this.request('/portfolio');
  }

  async savePortfolioProjects(projects: PortfolioProject[]): Promise<PortfolioProject[]> {
    return this.request('/portfolio', {
      method: 'POST',
      body: JSON.stringify(projects),
    });
  }

  // Developer Portfolio Projects
  async getDeveloperPortfolioProjects(): Promise<DeveloperPortfolioProject[]> {
    return this.request('/developer-portfolio');
  }

  async saveDeveloperPortfolioProjects(projects: DeveloperPortfolioProject[]): Promise<DeveloperPortfolioProject[]> {
    return this.request('/developer-portfolio', {
      method: 'POST',
      body: JSON.stringify(projects),
    });
  }

  // Social Links
  async getSocialLinks(): Promise<SocialLink[]> {
    return this.request('/social-links');
  }

  async saveSocialLinks(links: SocialLink[]): Promise<SocialLink[]> {
    return this.request('/social-links', {
      method: 'POST',
      body: JSON.stringify(links),
    });
  }

  // Initialize database with default data
  async initializeDatabase(data: {
    serviceCategories: ServiceCategory[];
    portfolioProjects: PortfolioProject[];
    developerPortfolioProjects: DeveloperPortfolioProject[];
    socialLinks: SocialLink[];
  }) {
    return this.request('/init', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const apiService = new ApiService();