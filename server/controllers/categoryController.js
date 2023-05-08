// Chưa dùng đến

const {
  models: { Product_category },
} = require('../models');

class categoryController {
  async getAllCategory(req, res, next) {
    try {
      const categories = await Product_category.findAll({
        attributes: { exclude: ['created_at'] },
      });
      return res.status(200).send(categories);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async addCategory(req, res, next) {
    // TODO
    // ADD image column to table
    const { nameCategory, description } = req.body;
    if (!nameCategory || !description) {
      return res.status(400).json({
        msg: 'All filled must be required',
      });
    } else {
      try {
        const result = await Product_category.findOrCreate({
          where: {
            name: nameCategory,
            description,
          },
        });

        if (result[0]._options.isNewRecord) {
          return res.status(200).json({
            success: 'Added category success',
          });
        } else {
          return res.status(200).json({
            msg: 'Already had this category',
          });
        }
      } catch (error) {
        console.log(error);
        next(error);
      }
    }
  }
}

module.exports = new categoryController();
