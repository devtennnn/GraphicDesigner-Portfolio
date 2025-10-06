import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = 'mongodb+srv://portfolio:admin855867@tenten.ykgllhj.mongodb.net/portfolio?retryWrites=true&w=majority';

console.log('Testing MongoDB connection...');
console.log('Connection string:', MONGODB_URI);

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Successfully connected to MongoDB Atlas!');
    process.exit(0);
  })
  .catch((error) => {
    console.log('❌ MongoDB connection failed:');
    console.log('Error code:', error.code);
    console.log('Error message:', error.message);
    console.log('Error response:', error.errorResponse);
    
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. Check if username "portfolio" exists in MongoDB Atlas Database Access');
    console.log('2. Verify the password is exactly "admin855867"');
    console.log('3. Ensure IP address is whitelisted (try 0.0.0.0/0 for testing)');
    console.log('4. Confirm user has read/write permissions to "portfolio" database');
    
    process.exit(1);
  });