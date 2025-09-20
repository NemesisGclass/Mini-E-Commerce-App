const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function createAdminUser() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: 'admin@freshmarket.com' });
    if (existingAdmin) {
      console.log('⚠️ Admin user already exists');
      console.log('📧 Email: admin@freshmarket.com');
      console.log('👤 Username:', existingAdmin.username);
      console.log('🔑 Role:', existingAdmin.role);
      process.exit(0);
    }

    // Create admin user
    const adminUser = new User({
      username: 'admin',
      email: 'admin@freshmarket.com',
      password: 'admin123', // This will be hashed by the pre-save middleware
      role: 'admin'
    });

    await adminUser.save();
    console.log('🎉 Admin user created successfully!');
    console.log('📧 Email: admin@freshmarket.com');
    console.log('🔑 Password: admin123');
    console.log('👤 Username: admin');
    console.log('🔐 Role: admin');
    console.log('');
    console.log('⚠️ IMPORTANT: Change the password after first login!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    process.exit(1);
  }
}

createAdminUser();
