const express = require('express');
const productController = require('../controllers/productController');
const upload = require('../middleware/uploadImage');
const {
  isAdmin,
  isAuth,
  isAlreadyLogin,
} = require('../middleware/authenticate');

// variable
const saved_image_folder = 'productImage';
const upload_image_field = 'file';

const router = express.Router();

router.get('/products/:id', productController.getProduct);
router.get('/products', productController.getAllProducts);
// router.post('/product-by-category', productController.getProductByCategory);
// router.post('/product-by-price', productController.getProductByPrice);

router.post(
  '/admin/product/add',
  upload(saved_image_folder).single(upload_image_field),
  isAuth,
  isAdmin,
  productController.addProduct,
);

router.put(
  '/admin/product/:id/modify',
  isAuth,
  isAdmin,
  productController.modifyProduct,
);
router.post(
  '/admin/product/:id/delete',
  isAuth,
  isAdmin,
  productController.deleteProduct,
);

// review
router.post('/add-review', productController.addReviewProduct);
router.post('/delete-review', productController.deleteReviewProduct);

// export default router;
module.exports = router;
