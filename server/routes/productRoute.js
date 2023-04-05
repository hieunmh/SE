const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/products/:id', productController.getProduct);
router.get('/products', productController.getAllProducts);

// export default router;
module.exports = router;