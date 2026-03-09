require('dotenv').config();
const mongoose = require('mongoose');
const File = require('./models/File');
const connectDB = require('./config/db');

const seedData = async () => {
  try {
    await connectDB();

    // Clear old data
    await File.deleteMany({});
    console.log('Database Cleared...');

    // Root folders
    const docs = await File.create({ name: 'docs', type: 'folder', parentId: null });
    const publicFolder = await File.create({ name: 'public', type: 'folder', parentId: null });
    const srcFolder = await File.create({ name: 'src', type: 'folder', parentId: null });

    // Root files
    await File.create({ name: 'README.md', type: 'file', parentId: null });
    await File.create({ name: 'package.json', type: 'file', parentId: null });

    // Docs children
    const guides = await File.create({
      name: 'guides',
      type: 'folder',
      parentId: docs._id
    });

    const tutorials = await File.create({
      name: 'tutorials',
      type: 'folder',
      parentId: docs._id
    });

    await File.create({
      name: 'introduction.md',
      type: 'file',
      parentId: docs._id
    });

    // Guides files
    await File.create({
      name: 'installation.md',
      type: 'file',
      parentId: guides._id
    });

    await File.create({
      name: 'configuration.md',
      type: 'file',
      parentId: guides._id
    });

    // Tutorials folder
    const vueTutorial = await File.create({
      name: 'vue',
      type: 'folder',
      parentId: tutorials._id
    });

    await File.create({
      name: 'vue-basics.md',
      type: 'file',
      parentId: vueTutorial._id
    });

    await File.create({
      name: 'vue-components.md',
      type: 'file',
      parentId: vueTutorial._id
    });

    // Public folder
    const images = await File.create({
      name: 'images',
      type: 'folder',
      parentId: publicFolder._id
    });

    const css = await File.create({
      name: 'css',
      type: 'folder',
      parentId: publicFolder._id
    });

    await File.create({
      name: 'logo.png',
      type: 'file',
      parentId: images._id
    });

    await File.create({
      name: 'banner.jpg',
      type: 'file',
      parentId: images._id
    });

    await File.create({
      name: 'style.css',
      type: 'file',
      parentId: css._id
    });

    // SRC folder
    const components = await File.create({
      name: 'components',
      type: 'folder',
      parentId: srcFolder._id
    });

    const views = await File.create({
      name: 'views',
      type: 'folder',
      parentId: srcFolder._id
    });

    const utils = await File.create({
      name: 'utils',
      type: 'folder',
      parentId: srcFolder._id
    });

    await File.create({
      name: 'main.js',
      type: 'file',
      parentId: srcFolder._id
    });

    await File.create({
      name: 'App.vue',
      type: 'file',
      parentId: srcFolder._id
    });

    // Components
    await File.create({
      name: 'Navbar.vue',
      type: 'file',
      parentId: components._id
    });

    await File.create({
      name: 'Sidebar.vue',
      type: 'file',
      parentId: components._id
    });

    await File.create({
      name: 'TreeItem.vue',
      type: 'file',
      parentId: components._id
    });


    await File.create({
      name: 'helpers.js',
      type: 'file',
      parentId: utils._id
    });

    console.log('Database Seeded Successfully 🌱');
    process.exit();

  } catch (error) {
    console.error('Seeding Error:', error);
    process.exit(1);
  }
};

seedData();