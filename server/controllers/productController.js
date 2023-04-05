const { models: { Product } } = require('../models');

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
}

// export default new productController();
module.exports = new productController();