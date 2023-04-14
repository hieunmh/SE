const {
  models: { Order_items, Order_details },
} = require('../models');

// status in Order_details need to be enum - to choose
// provider ?

class orderController {
  // [GET] /get-all-orders - author: admin
  async getAllOrders(req, res, next) {
    try {
      const Orders = await Order_details.findAll({});
      if (Orders.length) {
        return res.status(200).json({
          Orders: Orders,
        });
      } else {
        return res.json({
          msg: "User's order is empty!",
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
  // [GET] /order-by-user
  async getOrderByUser(req, res, next) {
    try {
      const user_id = req.session.userId;
      const Orders = await Order_details.findAll({
        where: { user_id },
      });
      if (Orders.length) {
        return res.status(200).json({
          Orders: Orders,
        });
      } else {
        return res.status(200).json({
          msg: 'Your order is empty!',
        });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  // [POST]
  // TO DO - ERROR
  async postCreateOrder(req, res, next) {
    const user_id = req.session.userId;
    const cartProduct = req.session.cart;
    const totalPrice = req.session.totalPrice;

    //check products in cart. if having nothing => fail
    if (!cartProduct.length) {
      return res.status(400).json({
        msg: "Cant create order! Order's empty!",
      });
    }

    //get userInfo

    if (!cartProduct || !user_id || !totalPrice) {
      return res.status(400).json({ msg: 'Cant create order!' });
    } else {
      try {
        // TO DO

        const newOrder = await Order_details.create({
          user_id,
          total: totalPrice,
          provider: 1,
          status: 'Chờ xử lý',
        });
        if (newOrder) {
          const order_id = newOrder.dataValues.id;

          // TO DO
          // after create order_details => next, add product to order_items with FK , get product_id, quantity in cartProduct array

          return res.json({ success: 'Order created successfully' });
        }
      } catch (err) {
        console.log(err);
        next(err);
      }
    }
  }

  // [PUT]
  async postUpdateOrder(req, res, next) {}

  // [DELETE]
  async postDeleteOrder(req, res, next) {}
}

module.exports = new orderController();
