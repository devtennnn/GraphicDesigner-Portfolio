import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectToDatabase from './lib/mongodb';
import { 
  ServiceCategoryModel, 
  PortfolioProjectModel, 
  DeveloperPortfolioProjectModel, 
  SocialLinkModel, 
  UserModel 
} from './lib/models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Load environment variables
dotenv.config({ path: '.env.local' });

const app = express();
const PORT = process.env.API_PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectToDatabase().catch(console.error);

// Auth middleware
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Auth routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // For demo purposes, use hardcoded credentials
    if (username === 'admin' && password === 'Kiminato855') {
      const token = jwt.sign(
        { id: 'admin', username: 'admin' },
        process.env.JWT_SECRET!,
        { expiresIn: '24h' }
      );
      res.json({ token, user: { username: 'admin' } });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Service Categories routes
app.get('/api/services', async (req, res) => {
  try {
    const categories = await ServiceCategoryModel.find({}).sort({ createdAt: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch service categories' });
  }
});

app.post('/api/services', authenticateToken, async (req, res) => {
  try {
    const categories = req.body;
    await ServiceCategoryModel.deleteMany({});
    const result = await ServiceCategoryModel.insertMany(categories);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save service categories' });
  }
});

// Portfolio routes
app.get('/api/portfolio', async (req, res) => {
  try {
    const projects = await PortfolioProjectModel.find({}).sort({ order: 1, createdAt: 1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch portfolio projects' });
  }
});

app.post('/api/portfolio', authenticateToken, async (req, res) => {
  try {
    const projects = req.body;
    await PortfolioProjectModel.deleteMany({});
    const result = await PortfolioProjectModel.insertMany(projects);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save portfolio projects' });
  }
});

// Developer Portfolio routes
app.get('/api/developer-portfolio', async (req, res) => {
  try {
    const projects = await DeveloperPortfolioProjectModel.find({}).sort({ order: 1, createdAt: 1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch developer portfolio projects' });
  }
});

app.post('/api/developer-portfolio', authenticateToken, async (req, res) => {
  try {
    const projects = req.body;
    await DeveloperPortfolioProjectModel.deleteMany({});
    const result = await DeveloperPortfolioProjectModel.insertMany(projects);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save developer portfolio projects' });
  }
});

// Social Links routes
app.get('/api/social-links', async (req, res) => {
  try {
    const links = await SocialLinkModel.find({}).sort({ order: 1, createdAt: 1 });
    res.json(links);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch social links' });
  }
});

app.post('/api/social-links', authenticateToken, async (req, res) => {
  try {
    const links = req.body;
    await SocialLinkModel.deleteMany({});
    const result = await SocialLinkModel.insertMany(links);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save social links' });
  }
});

// Initialize default data
app.post('/api/init', async (req, res) => {
  try {
    const { serviceCategories, portfolioProjects, developerPortfolioProjects, socialLinks } = req.body;
    
    // Check if data already exists
    const existingServices = await ServiceCategoryModel.countDocuments();
    if (existingServices === 0) {
      await ServiceCategoryModel.insertMany(serviceCategories);
      await PortfolioProjectModel.insertMany(portfolioProjects);
      await DeveloperPortfolioProjectModel.insertMany(developerPortfolioProjects);
      await SocialLinkModel.insertMany(socialLinks);
    }
    
    res.json({ message: 'Database initialized successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to initialize database' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 API Server running on http://localhost:${PORT}`);
});