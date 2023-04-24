const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/products/:id', productController.getProduct);
router.get('/products', productController.getAllProducts);
// router.post('/product-by-category', productController.getProductByCategory);
// router.post('/product-by-price', productController.getProductByPrice);

// review

router.post('/add-review', productController.addReviewProduct);
router.post('/delete-review', productController.deleteReviewProduct);

// export default router;
module.exports = router;
