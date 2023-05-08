const {
  models: { Discount },
} = require('../models');

// TODO
// GET ALL DISCOUNT
// ADD discount
// EDIT discount

class discountController {
  // [GET] /all-discount
  async getAllDiscount(req, res, next) {
    try {
      const allDiscount = await Discount.findAll({
        attributes: { exclude: ['created_at'] },
      });
      return res.status(200).send(allDiscount);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = new discountController();
