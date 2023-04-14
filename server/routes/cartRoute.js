const express = require('express');
const cartController = require('../controllers/cartController');
const { isAdmin, isAuth } = require('../middleware/authenticate');

const router = express.Router();

router.get('/cart', isAuth, cartController.getCart);

router.post('/add-to-cart', cartController.addToCart);

router.delete('/remove-product-cart', cartController.removeProduct);

router.put('/edit-product-cart', cartController.updateProductInCart);

//to do
// tang giam quantity product in cart

// checkout de thanh toan => payment route

module.exports = router;
