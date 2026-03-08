const express = require('express');
const router = express.Router();
const { getItems } = require('../controllers/fileController');

// GET: /api/files?parentId=ID
router.get('/', getItems);



module.exports = router;