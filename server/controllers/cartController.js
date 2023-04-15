const sequelize = require('sequelize');
const {
  models: { Cart_item, Product, Discount },
} = require('../models');

class cartController {
  constructor() {
    this.addToCart = this.addToCart.bind(this);
    this.getCart = this.getCart.bind(this);
  }

  isProductInCart(cart, product_id) {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].product_id == product_id) {
        return i;
      }
    }

    return -1;
  }

  getCalculateTotal(cart) {
    var totalMoneyBeforeDiscount = 0;
    var totalMoneyAfterDiscount = 0;
    for (let i = 0; i < cart.length; i++) {
      totalMoneyBeforeDiscount += cart[i].price * cart[i].quantity;
      totalMoneyAfterDiscount += cart[i].salePrice * cart[i].quantity;
    }
    return [totalMoneyBeforeDiscount, totalMoneyAfterDiscount];
  }

  // [GET] /cart
  async getCart(req, res, next) {
    var cart = [];
    // var total = 0;
    var amountOfProducts = 0;

    if (!req.session.cart) {
      // get DB
      console.log(1);
      const getCartInDB = await Cart_item.findAll({
        attributes: [
          'user_id',
          'product_id',
          sequelize.col('Product.name'),
          sequelize.col('Product.price'),
          [sequelize.literal('price*(1-discount_percent)'), 'salePrice'],
          'quantity',
          sequelize.col('Product.image'),
        ],
        where: {
          user_id: req.session.userId,
        },
        include: {
          model: Product,
          attributes: [],
          required: true,
          include: {
            model: Discount,
            attributes: [],
            require: true,
          },
        },
        raw: true,
        nest: true,
      });
      //check existence
      if (getCartInDB.length) {
        // add to session cart
        cart = getCartInDB;
        req.session.cart = cart;
        // add total amount products
        amountOfProducts = cart.length;
      }
    } else {
      console.log(2);
      cart = req.session.cart;
      amountOfProducts = cart.length;
    }
    // total money
    var [totalMoneyBeforeDiscount, totalMoneyAfterDiscount] = this.getCalculateTotal(cart);
    req.session.totalPrice = totalMoneyAfterDiscount;

    return res.status(200).json({
      amountOfProducts,
      productsInCart: cart,
      totalMoneyBeforeDiscount,
      totalMoneyAfterDiscount
    });
  }

  // [POST] /add-to-cart
  async addToCart(req, res, next) {
    const { product_id, name, price, quantity, image } = req.body;
    const user_id = req.session.userId;
    if (
      !user_id ||
      !product_id ||
      !name ||
      !price ||
      // !salePrice ||
      !quantity ||
      !image
    ) {
      return res.status(400).json({
        msg: 'All filled must be required',
      });
    }

    var product = {
      user_id,
      product_id,
      name,
      price,
      // salePrice,
      quantity,
      image,
    };
    var cart = [];
    if (req.session.cart) {
      cart = req.session.cart;

      // O(n) : slow
      // find new solution
      var index = this.isProductInCart(cart, product_id);
      if (index < 0) {
        console.log('k co trong gio hang');
        cart.push(product);
      } else {
        console.log('co trong gio hang');
        cart[index].quantity += quantity;
      }
      req.session.cart = cart;
    } else {
      console.log('Gio hang con trong');
      req.session.cart = [product];
      cart = req.session.cart;
    }

    return res.status(200).json({
      success: 'Uploaded success! ',
      amountOfProducts: cart.length
    });
  }

  // [DELETE] /remove-product-cart
  async removeProduct(req, res, next) {
    const product_id = req.body.product_id;
    const user_id = req.session.userId;
    let hasDeletedProduct = false;
    let cart = req.session.cart;

    if (!product_id || !cart || !user_id) {
      return res.status(400).json({
        msg: 'Bad request! ',
      });
    }

    for (let i = 0; i < cart.length; i++) {
      if (cart[i].product_id == product_id) {
        // if found a product
        // delete in DB, if product is exist in DB, delete them.
        // Normally, product will be saved at session and will be saved at DB when logout => Reduce response's time
        hasDeletedProduct = true;
        const deleteProduct = await Cart_item.destroy({
          where: { user_id, product_id },
        }).catch((err) => console.log(err));

        cart.splice(i, 1);
        break;
      }
    }
    if (!hasDeletedProduct) {
      return res.status(400).json({
        msg: 'Not found any products that match!',
      });
    } else {
      req.session.cart = cart;
      return res.status(200).json({
        success: 'Removed success! ',
      });
    }
  }

  // [PUT] /edit-product-cart
  async updateProductInCart(req, res, next) {
    const product_id = req.body.product_id;
    const increase_btn = req.body.increase_btn;
    const decrease_btn = req.body.decrease_btn;

    let cart = req.session.cart;

    if (increase_btn) {
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].product_id == product_id) {
          if (cart[i].quantity > 0) {
            cart[i].quantity = parseInt(cart[i].quantity) + 1;
          }
        }
      }
    } else if (decrease_btn) {
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].product_id == product_id) {
          if (cart[i].quantity > 1) {
            cart[i].quantity = parseInt(cart[i].quantity) - 1;
          }
          // TODO
          // chua xu ly tinh huong quantity = 0
        }
      }
    }

    req.session.cart = cart;
    return res.status(200).json({
      success: 'Updated success !',
    });
  }
}

module.exports = new cartController();
