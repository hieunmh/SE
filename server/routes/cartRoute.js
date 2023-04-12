const express = require('express');
const router = express.Router();

// Test
function isProductInCart(cart, id) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id == id) {
      return true;
    }
  }

  return false;
}

router.post('/add_to_cart', (req, res, next) => {
  const { id, name, price, sale_prices, quantity, image } = req.body;

  var product = { id, name, price, sale_prices, quantity, image };
  if (req.session.cart) {
    var cart = req.session.cart;

    if (!isProductInCart(cart, id)) {
      cart.push(product);
    }
  } else {
    req.session.cart = [product];
    var cart = req.session.cart;
  }

  //TO DO
  var total = calculateTotal(cart, req);

  return res.status(200).send();
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
router.post();

// checkout de thanh toan => payment route

module.exports = router;
