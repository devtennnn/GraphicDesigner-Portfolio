import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://portfolio:admin855867@tenten.ykgllhj.mongodb.net/portfolio?retryWrites=true&w=majority';

// Import default data
const SERVICE_CATEGORIES = [
  {
    id: "branding",
    icon: "🎨",
    title: { km: "ការបង្កើតម៉ាក", en: "Branding & Identity" },
    description: { 
      km: "ការបង្កើតអត្តសញ្ញាណម៉ាកយីហោដ៏មានអានុភាព", 
      en: "Creating powerful brand identities that resonate" 
    },
    features: [
      { km: "ការរចនាឡូហ្គោ", en: "Logo Design" },
      { km: "ការកំណត់ពណ៌ម៉ាក", en: "Brand Color Palette" },
      { km: "ការបង្កើតគោលការណ៍ម៉ាក", en: "Brand Guidelines" }
    ],
    order: 1
  },
  {
    id: "print",
    icon: "📄",
    title: { km: "ការរចនាបោះពុម្ព", en: "Print Design" },
    description: { 
      km: "ការរចនាសម្ភារៈបោះពុម្ពដ៏ទាក់ទាញ", 
      en: "Eye-catching print materials that make an impact" 
    },
    features: [
      { km: "ការរចនាប័ណ្ណអញ្ជើញ", en: "Business Cards" },
      { km: "ការរចនាព្រីនសៀវភៅ", en: "Brochures & Flyers" },
      { km: "ការរចនាផោស្ទ័រ", en: "Posters & Banners" }
    ],
    order: 2
  }
];

const PORTFOLIO_PROJECTS = [
  {
    id: "brand-concept-1",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80",
    category: { km: "ម៉ាកយីហោ", en: "Branding" },
    title: { km: "ការរចនាម៉ាកកាហ្វេ", en: "Coffee Brand Identity" },
    description: { 
      km: "ការបង្កើតអត្តសញ្ញាណម៉ាកកាហ្វេទំនើប", 
      en: "Modern coffee brand identity with minimalist approach" 
    },
    tags: ["Branding", "Logo", "Packaging"],
    demoUrl: "https://example.com",
    githubUrl: "",
    order: 1
  }
];

const DEVELOPER_PORTFOLIO_PROJECTS = [
  {
    id: "react-dashboard",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    title: { km: "ផ្ទាំងគ្រប់គ្រង React", en: "React Admin Dashboard" },
    description: { 
      km: "ផ្ទាំងគ្រប់គ្រងទំនើបដែលបង្កើតដោយ React", 
      en: "Modern admin dashboard built with React and TypeScript" 
    },
    tags: ["React", "TypeScript", "Dashboard"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com",
    order: 1
  }
];

const SOCIAL_LINKS = [
  { platform: "Facebook", url: "https://facebook.com", icon: "fab fa-facebook", order: 1 },
  { platform: "Instagram", url: "https://instagram.com", icon: "fab fa-instagram", order: 2 },
  { platform: "LinkedIn", url: "https://linkedin.com", icon: "fab fa-linkedin", order: 3 }
];

// MongoDB Schemas
const serviceSchema = new mongoose.Schema({
  id: String,
  icon: String,
  title: { km: String, en: String },
  description: { km: String, en: String },
  features: [{ km: String, en: String }],
  order: { type: Number, default: 0 }
}, { timestamps: true });

const portfolioSchema = new mongoose.Schema({
  id: String,
  image: String,
  category: { km: String, en: String },
  title: { km: String, en: String },
  description: { km: String, en: String },
  tags: [String],
  demoUrl: String,
  githubUrl: String,
  order: { type: Number, default: 0 }
}, { timestamps: true });

const developerPortfolioSchema = new mongoose.Schema({
  id: String,
  image: String,
  title: { km: String, en: String },
  description: { km: String, en: String },
  tags: [String],
  demoUrl: String,
  githubUrl: String,
  order: { type: Number, default: 0 }
}, { timestamps: true });

const socialLinkSchema = new mongoose.Schema({
  platform: String,
  url: String,
  icon: String,
  order: { type: Number, default: 0 }
}, { timestamps: true });

// Models
const ServiceCategory = mongoose.model('ServiceCategory', serviceSchema);
const PortfolioProject = mongoose.model('PortfolioProject', portfolioSchema);
const DeveloperPortfolioProject = mongoose.model('DeveloperPortfolioProject', developerPortfolioSchema);
const SocialLink = mongoose.model('SocialLink', socialLinkSchema);

async function initializeDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');
    
    console.log('\n🔄 Initializing database with default data...');
    
    // Clear existing data
    await Promise.all([
      ServiceCategory.deleteMany({}),
      PortfolioProject.deleteMany({}),
      DeveloperPortfolioProject.deleteMany({}),
      SocialLink.deleteMany({})
    ]);
    console.log('🗑️ Cleared existing data');
    
    // Insert default data
    await Promise.all([
      ServiceCategory.insertMany(SERVICE_CATEGORIES),
      PortfolioProject.insertMany(PORTFOLIO_PROJECTS),
      DeveloperPortfolioProject.insertMany(DEVELOPER_PORTFOLIO_PROJECTS),
      SocialLink.insertMany(SOCIAL_LINKS)
    ]);
    
    console.log('✅ Database initialized successfully!');
    console.log(`📊 Added ${SERVICE_CATEGORIES.length} service categories`);
    console.log(`📊 Added ${PORTFOLIO_PROJECTS.length} portfolio projects`);
    console.log(`📊 Added ${DEVELOPER_PORTFOLIO_PROJECTS.length} developer projects`);
    console.log(`📊 Added ${SOCIAL_LINKS.length} social links`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  }
}

initializeDatabase();