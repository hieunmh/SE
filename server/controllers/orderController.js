const {
  models: { Order_items, Order_details, Cart_item, Product, User, Discount },
} = require('../models');

const { statusType } = require('../types/db_types');

const sequelize = require('sequelize');
// status in Order_details need to be enum - to choose
// provider ?

class orderController {
  // [GET] admin/get-all-orders - author: admin
  // get information of all orders
  //
  async getAllOrders(req, res, next) {
    try {
      const Orders = await Order_details.findAll({
        attributes: [
          'id',
          'total',
          'provider',
          'status',
          'address',
          'created_at',
        ],
        include: [
          {
            model: User,
            attributes: ['name', 'telephone'],
          },
          {
            model: Order_items,
            attributes: ['quantity'],
            include: {
              attributes: ['name', 'image'],
              model: Product,
              attributes: [
                ['id', 'product_id'],
                'name',
                'image',
                'price',
                [sequelize.literal('price*(1-discount_percent)'), 'salePrice'],
              ],
              include: {
                model: Discount,
                attributes: [],
              },
            },
          },
        ],
      });
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
      next(err);
    }
  }
  // [GET] /order-by-user
  async getOrderByUser(req, res, next) {
    try {
      const user_id = req.session.userId;
      const Orders = await Order_details.findAll({
        attributes: [
          'id',
          'total',
          'provider',
          'status',
          'address',
          'created_at',
        ],
        include: {
          model: Order_items,
          attributes: ['quantity'],
          include: {
            model: Product,
            attributes: [
              'name',
              'image',
              'price',
              [sequelize.literal('price*(1-discount_percent)'), 'salePrice'],
            ],
            include: {
              model: Discount,
              attributes: [],
            },
          },
        },
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
  // [POST] /create-order
  async postCreateOrder(req, res, next) {
    const user_id = req.session.userId;
    const cartProduct = req.session.cart;
    const totalPrice = req.session.totalPrice;

    // Home_location + ', ' City
    const full_address = req.body.full_address;

    //check products in cart. if having nothing => fail
    if (!cartProduct.length) {
      return res.status(400).json({
        msg: "Cant create order! Order's empty!",
      });
    }

    //get userInfo
    if (!cartProduct || !user_id || !totalPrice || !full_address) {
      return res.status(400).json({ msg: 'Cant create order!' });
    } else {
      try {
        // TO DO

        const newOrder = await Order_details.create({
          user_id,
          total: totalPrice,
          provider: 1,
          status: statusType.HANDLE,
          address: full_address,
        });
        if (newOrder) {
          // order_id : Foreign key
          const order_id = newOrder.dataValues.id;

          // get product in cart_item
          let productsInCartFilter = [];
          for (let i = 0; i < cartProduct.length; i++) {
            productsInCartFilter.push({
              order_id,
              product_id: cartProduct[i].product_id,
              quantity: cartProduct[i].quantity,
            });
          }
          console.log(productsInCartFilter);
          // add to order_item
          let insertProducts = await Order_items.bulkCreate(
            productsInCartFilter,
          );

          // if insert true, delete all products in cart
          if (insertProducts) {
            const deleteProduct = await Cart_item.destroy({
              where: { user_id },
            })
              .then(() => {
                req.session.cart = [];
                return res.json({ success: 'Order created successfully' });
              })
              .catch((err) => console.log(err));
          }
        }
      } catch (err) {
        console.log(err);
        next(err);
      }
    }
  }

  // [PUT] /update-order
  async postUpdateOrder(req, res, next) {}

  // CASE: USER want cancel order
  // Just only status order is : "Dang xu ly" == statusType.HANDLE
  // [POST] /delete-order
  async postDeleteOrder(req, res, next) {
    const { order_id } = req.body;
    const user_id = req.session.userId;

    if (!order_id || !user_id) {
      return res.status(400).json({
        msg: 'Bad request!',
      });
    } else {
      const query = await Order_details.destroy({
        where: {
          id: order_id,
          user_id,
          status: statusType.HANDLE,
        },
      })
        .then((data) => {
          console.log(data);
          if (data == 1) {
            return res.status(200).json({
              success: 'Deleted Success!',
            });
          } else {
            return res.status(400).json({
              success: "You can't delete this order!",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          next(err);
        });
    }
  }

  // [POST] /admin/update-status
  async postUpdateStatus(req, res, next) {
    const { order_id, statusOrder } = req.body;

    if (!statusOrder || !order_id) {
      return res.status(400).json({
        msg: 'Bad request!',
      });
    } else if (Object.values(statusType).includes(statusOrder)) {
      const query = await Order_details.update(
        {
          status: statusOrder,
        },
        {
          where: {
            id: order_id,
          },
        },
      )
        .then((data) => {
          if (data[0]) {
            return res.status(200).json({
              success: 'Updated Success!',
            });
          } else {
            return res.status(400).json({
              message: 'Bad request!',
            });
          }
        })
        .catch((err) => {
          console.log(err);
          next(err);
        });
    } else {
      return res.status(400).json({
        msg: 'Bad request! ',
      });
    }
  }
}

module.exports = new orderController();
