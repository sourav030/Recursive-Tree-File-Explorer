const express = require('express');
const router = express.Router();
const { getItems ,deletefile, transform,addItems, getItemsbyId} = require('../controllers/fileController');


router.post('/add',addItems)
router.get('/', getItems);
router.delete('/:id',deletefile);
router.get('/tranform/:id',transform);
router.get('/:id',getItemsbyId);



module.exports = router;