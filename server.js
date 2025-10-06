import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://portfolio:admin855867@tenten.ykgllhj.mongodb.net/portfolio?retryWrites=true&w=majority';
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

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

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });

// Models
const ServiceCategory = mongoose.model('ServiceCategory', serviceSchema);
const PortfolioProject = mongoose.model('PortfolioProject', portfolioSchema);
const DeveloperPortfolioProject = mongoose.model('DeveloperPortfolioProject', developerPortfolioSchema);
const SocialLink = mongoose.model('SocialLink', socialLinkSchema);
const User = mongoose.model('User', userSchema);

// JWT middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Auth routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // For development, allow hardcoded admin login
    if (email === 'admin' && password === 'Kiminato855') {
      const token = jwt.sign({ id: 'admin', email: 'admin' }, JWT_SECRET, { expiresIn: '24h' });
      return res.json({
        success: true,
        data: { token, user: { id: 'admin', email: 'admin' } }
      });
    }

    // Check database for user
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });
    res.json({
      success: true,
      data: { token, user: { id: user._id, email: user.email } }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Service Categories routes
app.get('/api/services', async (req, res) => {
  try {
    console.log('📥 GET /api/services - Fetching service categories...');
    const categories = await ServiceCategory.find({}).sort({ order: 1, createdAt: 1 });
    console.log(`✅ Found ${categories.length} service categories`);
    res.json(categories);
  } catch (error) {
    console.error('❌ Error fetching services:', error);
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

app.post('/api/services', authenticateToken, async (req, res) => {
  try {
    await ServiceCategory.deleteMany({});
    const categories = await ServiceCategory.insertMany(req.body);
    res.json(categories);
  } catch (error) {
    console.error('Error saving services:', error);
    res.status(500).json({ error: 'Failed to save services' });
  }
});

// Portfolio routes
app.get('/api/portfolio', async (req, res) => {
  try {
    const projects = await PortfolioProject.find({}).sort({ order: 1, createdAt: 1 });
    res.json(projects);
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    res.status(500).json({ error: 'Failed to fetch portfolio' });
  }
});

app.post('/api/portfolio', authenticateToken, async (req, res) => {
  try {
    await PortfolioProject.deleteMany({});
    const projects = await PortfolioProject.insertMany(req.body);
    res.json(projects);
  } catch (error) {
    console.error('Error saving portfolio:', error);
    res.status(500).json({ error: 'Failed to save portfolio' });
  }
});

// Developer Portfolio routes
app.get('/api/developer-portfolio', async (req, res) => {
  try {
    const projects = await DeveloperPortfolioProject.find({}).sort({ order: 1, createdAt: 1 });
    res.json(projects);
  } catch (error) {
    console.error('Error fetching developer portfolio:', error);
    res.status(500).json({ error: 'Failed to fetch developer portfolio' });
  }
});

app.post('/api/developer-portfolio', authenticateToken, async (req, res) => {
  try {
    await DeveloperPortfolioProject.deleteMany({});
    const projects = await DeveloperPortfolioProject.insertMany(req.body);
    res.json(projects);
  } catch (error) {
    console.error('Error saving developer portfolio:', error);
    res.status(500).json({ error: 'Failed to save developer portfolio' });
  }
});

// Social Links routes
app.get('/api/social-links', async (req, res) => {
  try {
    const links = await SocialLink.find({}).sort({ order: 1, createdAt: 1 });
    res.json(links);
  } catch (error) {
    console.error('Error fetching social links:', error);
    res.status(500).json({ error: 'Failed to fetch social links' });
  }
});

app.post('/api/social-links', authenticateToken, async (req, res) => {
  try {
    await SocialLink.deleteMany({});
    const links = await SocialLink.insertMany(req.body);
    res.json(links);
  } catch (error) {
    console.error('Error saving social links:', error);
    res.status(500).json({ error: 'Failed to save social links' });
  }
});

// Initialize database with default data
app.post('/api/init', authenticateToken, async (req, res) => {
  try {
    const { serviceCategories, portfolioProjects, developerPortfolioProjects, socialLinks } = req.body;
    
    await Promise.all([
      ServiceCategory.deleteMany({}),
      PortfolioProject.deleteMany({}),
      DeveloperPortfolioProject.deleteMany({}),
      SocialLink.deleteMany({})
    ]);
    
    await Promise.all([
      ServiceCategory.insertMany(serviceCategories),
      PortfolioProject.insertMany(portfolioProjects),
      DeveloperPortfolioProject.insertMany(developerPortfolioProjects),
      SocialLink.insertMany(socialLinks)
    ]);
    
    res.json({ success: true, message: 'Database initialized successfully' });
  } catch (error) {
    console.error('Error initializing database:', error);
    res.status(500).json({ error: 'Failed to initialize database' });
  }
});

// Connect to MongoDB and start server
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    console.log('Starting server without database connection...');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} (No database connection)`);
    });
  });