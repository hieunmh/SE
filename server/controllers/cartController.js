const { json } = require('body-parser');
const sequelize = require('sequelize');
const {
  models: { Cart_item, Product, Discount },
} = require('../models');

class cartController {
  constructor() {}

  isProductInCart(cart, product_id) {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].product_id == product_id) {
        return i;
      }
    }

    return -1;
  }

  getCalculateTotal(cart) {
    var total = 0;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].salePrice) {
        total += cart[i].salePrice * cart[i].quantity;
      } else {
        total += cart[i].price * cart[i].quantity;
      }
    }
    return total;
  }

  // [GET] /cart
  async getCart(req, res, next) {
    var cart = [];
    var total = 0;
    var amountOfProducts = 0;

    if (!req.session.cart) {
      // get DB
      console.log(1);
      const getCartInDB = await Cart_item.findAll({
        attributes: [
          'user_id',
          'product_id',
          'quantity',
          [sequelize.literal('price*(1-discount_percent)'), 'salePrice'],
        ],
        where: {
          user_id: req.session.userId,
        },
        include: {
          model: Product,
          include: {
            model: Discount,
          },
        },
      });
      //check existence
      if (getCartInDB.length) {
        // add to session cart
        cart = getCartInDB;
        req.session.cart = cart;

        // add total amount products
        amountOfProducts = getCartInDB.length;
        req.session.amountProducts = amountOfProducts;

        // var total = this.getCalculateTotal(cart);
        req.session.TotalPrice = total;
      }
    } else {
      console.log(2);
      cart = req.session.cart;
      amountOfProducts = req.session.amountProducts;
      total = req.session.TotalPrice;
    }

    return res.status(200).json({
      AmountOfProducts: amountOfProducts,
      ProductsInCart: cart,
      TotalPrice: total,
    });
  }

  // [POST] /add-to-cart
  async addToCart(req, res, next) {
    const { id, name, price, salePrice, quantity, image } = req.body;

    var product = { id, name, price, salePrice, quantity, image };
    var cart = [];
    if (req.session.cart) {
      cart = req.session.cart;

      // O(n) : slow
      // find new solution
      var index = this.isProductInCart(cart, id);
      if (index < 0) {
        cart.push(product);
      } else {
        cart[index].quantity += quantity;
      }
      req.session.cart = cart;
    } else {
      req.session.cart = [product];
      cart = req.session.cart;
    }

    // var total = this.getCalculateTotal(cart);

    return res.status(200).json({
      success: 'Uploaded success! ',
    });
  }

  // [DELETE] /
  async removeProduct(req, res, next) {
    var id = req.body.id;
    var cart = req.session.cart;

    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id == id) {
        cart.splice(cart.indexof(i), 1);
      }
    }

    // var total = getCalculateTotal(cart);
    req.session.TotalPrice = total;
    req.session.cart = cart;
    res.status(200).json({
      success: 'Removed success! ',
    });
  }

  // [PUT]
  async updateProductInCart(req, res, next) {
    var id = req.body.id;
    var increase_btn = req.body.increase_btn;
    var decrease_btn = req.body.decrease_btn;

    var cart = req.session.cart;

    if (increase_btn) {
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].id == id) {
          if (cart[i].quantity > 0) {
            cart[i].quantity = parseInt(cart[i].quantity) + 1;
          }
        }
      }
    } else if (decrease_btn) {
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].id == id) {
          if (cart[i].quantity > 1) {
            cart[i].quantity = parseInt(cart[i].quantity) - 1;
          }
        }
      }
    }

    // var total = getCalculateTotal(cart);
    req.session.TotalPrice = total;
    req.session.cart = cart;
    return res.status(200).json({
      success: 'Updated success !',
    });
  }
}

module.exports = new cartController();
