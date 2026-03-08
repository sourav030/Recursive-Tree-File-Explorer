require('dotenv').config();
const mongoose = require('mongoose');
const File = require('./models/File');
const connectDB = require('./config/db');

const seedData = async () => {
  try {
    await connectDB();
    
    
    await File.deleteMany({});
    console.log('Database Cleared...');

    const docs = await File.create({ name: 'docs', type: 'folder', parentId: null });
    const publicFolder = await File.create({ name: 'public', type: 'folder', parentId: null });
    
    
    await File.create({ name: 'README.md', type: 'file', parentId: null });

    
    const projects = await File.create({ 
      name: 'projects', 
      type: 'folder', 
      parentId: docs._id 
    });

  
    await File.create({ 
      name: 'portfolio.js', 
      type: 'file', 
      parentId: projects._id 
    });

    console.log('Database Seeded Successfully! 🌱');
    process.exit();
  } catch (error) {
    console.error('Seeding Error:', error);
    process.exit(1);
  }
};

seedData();