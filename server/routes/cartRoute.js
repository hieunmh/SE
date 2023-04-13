const express = require('express');
const cartController = require('../controllers/cartController');
const { isAdmin, isAuth } = require('../middleware/authenticate');

const router = express.Router();

router.get('/cart', isAuth, cartController.getCart);

router.post('/add_to_cart', cartController.addToCart);

router.post('/remove_product_cart', cartController.removeProduct);

//to do
// tang giam quantity product in cart

// checkout de thanh toan => payment route

module.exports = router;
