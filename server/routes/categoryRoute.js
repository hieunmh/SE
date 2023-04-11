const express = require('express');
const categoryController = require('../controllers/categoryController');
const router = express.Router();
const { isAdmin, isAuth } = require('../middleware/authenticate');

router.get('/all-category', categoryController.getAllCategory);
router.post('/add-category', isAuth, isAdmin, categoryController.addCategory);

module.exports = router;
