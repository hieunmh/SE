const express = require('express');
const discountController = require('../controllers/discountController');
const router = express.Router();
const { isAdmin, isAuth } = require('../middleware/authenticate');

router.get('/all-discount', isAuth, discountController.getAllDiscount);

module.exports = router;
