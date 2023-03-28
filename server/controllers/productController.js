// import path from 'path';
// import productModel from '../models/productModel';
const productModel = require('../models/productModel');

class productController {
  // [GET] /products
  async getAllProducts(req, res, next) {
    try {
      const result = await productModel.findAll();
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
      const result = await productModel.findOne({
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

  // [POST] /products/add

  //To do
  async addProduct(req, res, next) {
    const { name, desc, category_id, price, 
      discount_id, sold_number} = req.body;
    
    const file_path = (req.file) ? path.join('upload', 'productImage', req.file.filename) : null;
    if (!name || !desc || !file_path) {
      return res.status(400).json({ message: 'fill all attributes' });
    }
    try {
      const result = await productModel.insertProduct({
        name: name,
        desc: desc,
        image: formatMediaURL(file_path),
      });

      return res.status(200).send(result);
    } catch (error) {
      console.log('Cant add product!');
      next(error);
    }
  }

  // [PUT] /products/:id/modify
  async modifyProduct(req, res, next) {
    const IDProduct = req.params.id;
    const { name, desc } = req.body;

    if (!name && !desc) {
      res.status(400).json({ message: 'Nothing changed' });
    }

    try {
      // check whether product exist or not
      const checkIdExist = await productModel.checkExistence({
        where: {
          id: IDProduct,
        },
      });

      if (!checkIdExist) {
        return res.status(404).json({ message: 'Cant detect product! ' });
      } else {
        const result = productModel.updateProduct({
          IDProduct,
          name,
          desc,
        });
        return res.status(200).send('Modify product: Success!');
      }
    } catch (error) {
      console.log('cant modify product! ');
      next(error);
    }
  }

  // [DELETE] /products/:id/delete
  async deleteProduct(req, res, next) {
    const IDProduct = req.params.id;
    try {
      // check whether product exist or not
      const checkIdExist = await productModel.checkExistence({
        where: {
          id: IDProduct,
        },
      });

      if (!checkIdExist) {
        return res.status(404).json({ message: 'Cant detect product! ' });
      } else {
        const result = productModel.deleteProduct(IDProduct);
        return res.status(200).send(result);
      }
    } catch (error) {
      console.log('cant delete product! ');
      next(error);
    }
  }
}

// export default new productController();
module.exports = new productController();
