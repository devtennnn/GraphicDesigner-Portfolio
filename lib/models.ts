import mongoose from 'mongoose';
import type { ServiceCategory, PortfolioProject, DeveloperPortfolioProject, SocialLink } from '../types';

// Service Category Schema
const ServiceCategorySchema = new mongoose.Schema<ServiceCategory>({
  category: {
    en: { type: String, required: true },
    km: { type: String, required: true }
  },
  items: [{
    name: {
      en: { type: String, required: true },
      km: { type: String, required: true }
    },
    description: {
      en: { type: String },
      km: { type: String }
    },
    price: { type: String, required: true }
  }]
}, { timestamps: true });

// Portfolio Project Schema
const PortfolioProjectSchema = new mongoose.Schema<PortfolioProject>({
  id: { type: Number, required: true, unique: true },
  title: {
    en: { type: String, required: true },
    km: { type: String, required: true }
  },
  imageUrl: { type: String, required: true },
  description: {
    en: { type: String, required: true },
    km: { type: String, required: true }
  },
  tools: [{ type: String }],
  categories: [{ type: String }],
  order: { type: Number, default: 0 }
}, { timestamps: true });

// Developer Portfolio Project Schema
const DeveloperPortfolioProjectSchema = new mongoose.Schema<DeveloperPortfolioProject>({
  id: { type: Number, required: true, unique: true },
  title: {
    en: { type: String, required: true },
    km: { type: String, required: true }
  },
  imageUrl: { type: String, required: true },
  description: {
    en: { type: String, required: true },
    km: { type: String, required: true }
  },
  techStack: [{ type: String }],
  liveUrl: { type: String, required: true },
  sourceUrl: { type: String, required: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

// Social Link Schema
const SocialLinkSchema = new mongoose.Schema<SocialLink>({
  platform: { type: String, required: true },
  url: { type: String, required: true },
  icon: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

// User Schema for authentication
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin'], default: 'admin' }
}, { timestamps: true });

// Export models
export const ServiceCategoryModel = mongoose.models.ServiceCategory || mongoose.model('ServiceCategory', ServiceCategorySchema);
export const PortfolioProjectModel = mongoose.models.PortfolioProject || mongoose.model('PortfolioProject', PortfolioProjectSchema);
export const DeveloperPortfolioProjectModel = mongoose.models.DeveloperPortfolioProject || mongoose.model('DeveloperPortfolioProject', DeveloperPortfolioProjectSchema);
export const SocialLinkModel = mongoose.models.SocialLink || mongoose.model('SocialLink', SocialLinkSchema);
export const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);