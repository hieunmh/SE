const { json } = require('body-parser');
const {
  models: { Cart_item, Product, Discount },
} = require('../models');

class classController {

  isProductInCart(cart, id) {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id == id) {
        return true;
      }
    }
  
    return false;
  }

  calculateTotal(cart, req) {
    total = 0;
    for(let i=0; i< cart.length; i++) {
      if(cart[i].sale_price) {
        total += (cart[i].sale_price) * (cart[i].quantity);
      } else {
        total += (cart[i].price) * (cart[i].quantity)
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
        where: {
          user_id: req.session.userId,
        },
        // include: {
        //   model: Product, as: "Products"
        // }
      })

      //check existence
      if (getCartInDB.length) {
        // add to session cart
        cart = getCartInDB;
        req.session.cart = cart;

        // add total 
        amountOfProducts = getCartInDB.length;
        req.session.amountProducts = amountOfProducts;

        // var total = this.calculateTotal(cart)
        req.session.TotalPrice = total;
      }
    } else {
      console.log(2)
      cart = req.session.cart;
      amountOfProducts = req.session.amountProducts;
      total = req.session.TotalPrice;
    }
    
    
    return res.status(200).json({
      AmountOfProducts: amountOfProducts,
      ProductsInCart: cart,
      TotalPrice: total
    })
  }

  // [POST] /add-to-cart
  async addToCart(req, res, next) {
    const { id, name, price, sale_price, quantity, image } = req.body;

    var product = { id, name, price, sale_price, quantity, image };
    if (req.session.cart) {
      var cart = req.session.cart;

      if (!this.isProductInCart(cart, id)) {
        cart.push(product);
      }
    } else {
      req.session.cart = [product];
      var cart = req.session.cart;
    }

    var total = this.calculateTotal(cart,req);

    return res.status(200).json({
      msg: "Upload success! "
    });
  }

  // [DELETE] /
  async removeProduct(req, res, next) {
    var id = req.body.id;
    var cart = req.session.cart;

    
    for (let i=0; i < cart.length; i++) {
      if(cart[i].id == id) {
        cart.splice(cart.indexof(i), 1);
      }
    }

    var total = this.calculateTotal(cart, req);
    res.status(200).json({
      msg : "Remove success! "
    })
  }

  // [PUT] 
  async updateProductInCart(req, res, next) {
    var id = req.body.id;
    var quantity = req.body.quantity;
    var increase_btn = req.body.increase_btn;
    var decrease_btn = req.body.decrease_btn;

    var cart = req.session.cart;

    if (increase_btn) {
      for(let i=0; i<cart.length; i++) {
        if(cart[i].id == id) {
          if(cart[i].quantity > 0) {
            cart[i].quantity = parseInt(cart[i].quantity) + 1
          }
        }
      }
    }

    if (decrease_btn) {
      for(let i=0; i<cart.length; i++) {
        if(cart[i].id == id) {
          if(cart[i].quantity > 1) {
            cart[i].quantity = parseInt(cart[i].quantity) - 1
          }
        }
      }
    }


    var total =  this.calculateTotal(cart, req);
  }
}

module.exports = new classController();