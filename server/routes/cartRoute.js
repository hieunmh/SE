const express = require('express');
const cartController = require('../controllers/cartController');
const {isAdmin, isAuth} = require('../middleware/authenticate');


const router = express.Router();

router.get('/cart', isAuth, cartController.getCart)



// Test

router.post('/add_to_cart', (req, res, next) => {
});




router.post('/remove_product_cart'),
  (req, res, next) => {
    const id = req.body.id;
    const cart = req.session.cart;

    // to do
    // check san pham co trong cart hay khong?
    // thuc hien viec xoa product
    // xu ly lai total price
    // return
  };

//to do
// tang giam quantity product in cart

// checkout de thanh toan => payment route

module.exports = router;
