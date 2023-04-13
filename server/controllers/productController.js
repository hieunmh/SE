const { Op, NUMBER } = require('sequelize');
const {
  models: { Product },
} = require('../models');

class productController {
  // [GET] /products
  async getAllProducts(req, res, next) {
    try {
      const result = await Product.findAll();
      return res.status(200).send(result);
    } catch (error) {
      console.log("can't render all products");
      next(error);
    }
  }

  // [GET] /products/:id
  async getProduct(req, res, next) {
    const id = req.params.id;
    try {
      const result = await Product.findOne({
        where: {
          id,
        },
      });

      if (result) return res.status(200).send(result);
      else {
        res.status(404).json({
          message: 'Not Found',
        });
      }
    } catch (error) {
      next(error);
    }
  }

  // [POST] /product-by-category
  async getProductByCategory(req, res, next) {
    const { categoryID } = req.body;
    try {
      if (!categoryID) {
        return res.status(400).json({
          msg: 'All filled must be required',
        });
      } else {
        const result = await Product.findAll({
          where: {
            category_id: categoryID,
          },
        });
        if (result.length) {
          return res.status(200).json({
            Products: result,
          });
        } else {
          return res.status(200).json({
            msg: 'Not found any products',
          });
        }
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // [POST] /product-by-price
  async getProductByPrice(req, res, next) {
    const { maxPrice, minPrice } = req.body;
    // at least one of two variables not null

    // sanitized variables
    if (
      (!maxPrice && !minPrice) ||
      maxPrice <= 0 ||
      minPrice <= 0 ||
      typeof maxPrice == 'string' ||
      typeof minPrice == 'string'
    ) {
      return res.status(400).json({
        msg: 'Bad request!',
      });
    }
    try {
      let result;
      if (minPrice && maxPrice && maxPrice > minPrice) {
        result = await Product.findAll({
          where: {
            price: {
              [Op.between]: [minPrice, maxPrice],
            },
          },
        });
      } else if (maxPrice && !minPrice) {
        result = await Product.findAll({
          where: {
            price: {
              [Op.lte]: maxPrice,
            },
          },
        });
      } else if (minPrice && !maxPrice) {
        result = await Product.findAll({
          where: {
            price: {
              [Op.gte]: minPrice,
            },
          },
        });
      } else {
        return res.status(400).json({
          msg: 'Bad request',
        });
      }
      // handle result
      if (result.length) {
        return res.status(200).json({
          Products: result,
        });
      } else {
        return res.status(200).json({
          msg: 'Not found any products',
        });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // [POST] /add-review
  async addReviewProduct(req, res, next) {}

  // [DELETE] /delete-review
  async deleteReviewProduct(req, res, next) {}
}

// export default new productController();
module.exports = new productController();
