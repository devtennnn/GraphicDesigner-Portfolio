export type Language = 'en' | 'km';

export interface MultilingualString {
  en: string;
  km: string;
}

export interface NavLink {
  name: MultilingualString;
  href: string;
}

export interface PortfolioProject {
  id: number;
  title: MultilingualString;
  imageUrl: string;
  description: MultilingualString;
  tools: string[];
  categories?: string[];
  order?: number;
}

export interface DeveloperPortfolioProject {
  id: number;
  title: MultilingualString;
  imageUrl: string;
  description: MultilingualString;
  techStack: string[];
  liveUrl: string;
  sourceUrl: string;
  order?: number;
}

export interface ServiceItem {
  name: MultilingualString;
  description?: MultilingualString;
  price: string;
}

export interface ServiceCategory {
  category: MultilingualString;
  items: ServiceItem[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  isActive: boolean;
  order?: number;
}