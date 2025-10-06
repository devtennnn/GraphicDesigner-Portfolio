import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://portfolio:admin855867@tenten.ykgllhj.mongodb.net/portfolio?retryWrites=true&w=majority';

// MongoDB Schemas (same as server)
const serviceSchema = new mongoose.Schema({
  id: String,
  icon: String,
  title: { km: String, en: String },
  description: { km: String, en: String },
  features: [{ km: String, en: String }],
  order: { type: Number, default: 0 }
}, { timestamps: true });

const ServiceCategory = mongoose.model('ServiceCategory', serviceSchema);

async function checkDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');
    
    console.log('\n📊 Checking database contents...');
    
    const services = await ServiceCategory.find({});
    console.log(`Found ${services.length} service categories:`);
    services.forEach(service => {
      console.log(`- ${service.title.en} (${service.id})`);
    });
    
    console.log('\n✅ Database check completed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database check failed:', error);
    process.exit(1);
  }
}

checkDatabase();