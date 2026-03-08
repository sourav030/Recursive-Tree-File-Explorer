const File = require('../models/File');

// Fetch children of a parent folder
exports.getItems = async (req, res) => {
  try {
    const parentId = req.query.parentId || null;
    const items = await File.find({ parentId });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Fetching failed", 
      error: error.message 
    });
  }
};