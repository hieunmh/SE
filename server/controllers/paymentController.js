const {
  models: { User_payment, User_address, User },
  sequelize,
} = require('../models');

// Chua hieu User_payment lam gi
class paymentController {
  // [POST] /payment
  async postPayment(req, res, next) {
    const user_id = req.session.userId;
    const totalPrice = req.session.totalPrice;
    const productInCart = req.session.cart;
    const amountOfProducts = productInCart.length;

    if (!user_id || !totalPrice || !productInCart) {
      return res.status(400).json({
        msg: 'Fail to create order! ',
      });
    } else {
      // Lay thong tin nguoi dung
      // username, telephone, user_address
      try {
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
}

module.exports = new paymentController();
