const {
  models: { User_payment, User_address, User },
  sequelize,
} = require('../models');

const { getCalculateTotal } = require('./cartController');

// Chua hieu User_payment lam gi
class paymentController {
  // [POST] /payment
  async postPayment(req, res, next) {
    const user_id = req.session.userId;
    const totalPrice = req.session.totalPrice;
    const productInCart = req.session.cart;

    if (!user_id || !totalPrice || !productInCart.length) {
      return res.status(400).json({
        msg: 'Fail to create order! ',
      });
    } else {
      // Lay thong tin nguoi dung
      // username, telephone, user_address
      try {
        const amountOfProducts = productInCart.length;
        const getUserInfo = await User.findOne({
          attributes: ['name', 'telephone'],
          where: {
            id: user_id,
          },
        });

        // get address user
        // lay san trong DB
        // Tao them nut bam de tao dia chi, roi luu vao DB
        const getUserAddress = await User_address.findAll({
          where: {
            user_id,
          },
        });

        // get UserInfo, userAddress have or not
        if (getUserInfo) {
          return res.status(200).json({
            success: 'Create order success!',
            userInfo: getUserInfo,
            userAddress: getUserAddress,
            productInCart: productInCart,
            amountOfProducts: amountOfProducts,
            totalPrice: totalPrice,
          });
        }
      } catch (error) {
        console.log(error);
        next(error);
      }
    }
  }
  // [POST] /payment/create-address
  async postCreateAddress(req, res, next) {
    const { city, home_location } = req.body;
    const user_id = req.session.userId;

    if (!city || !home_location || !user_id) {
      return res.status(400).json({
        msg: 'Bad request!',
      });
    } else {
      const query = await User_address.findOrCreate({
        where: {
          user_id,
          city,
          home_location,
        },
      })
        .then((data) => {
          console.log(data[0]);
          if (data[0]._options.isNewRecord) {
            return res.status(200).json({
              success: 'Created address Success !!',
            });
          } else {
            return res.status(200).json({
              msg: 'Already Had !!',
            });
          }
        })
        .catch((err) => {
          console.log(err);
          next(err);
        });
    }
  }
}

module.exports = new paymentController();
