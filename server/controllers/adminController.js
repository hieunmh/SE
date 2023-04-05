const { models: { Product } } = require('../models');
const path = require('path');
const { formatMediaURL } = require('../helper/url_formatter');
const { DATE } = require('sequelize');

class adminController {

  // [POST] /admin/product/add
  async addProduct(req, res, next) {
    const {name, desc, price} = req.body;
    console.log(name, desc, price);
    if (!name || !desc || !price) {
      return res.status(400).json({
        msg: "Please fill all !!!"
      })
    } else {
      const file_path = (req.file) ? path.join('upload', 'productImage', req.file.filename) : null;
      console.log(formatMediaURL(file_path));

      //cant create product, error to insert into product table
      //to do


      // const result = await Product.findOrCreate({
      //   where: {
      //     name,
      //     desc,
      //     price,
      //   },
      //   image: file_path,
      // }).then( (data) => {
      //   console.log(data);
      // }).catch((err) => {
      //   console.log(err);
      //   next(err);
      // })
      
      // return res.status(200).send(result);
    }
  }

  // [PUT] /admin/product/:id/modify
  async modifyProduct(req, res, next) {
    const IDProduct = req.params.id;

    // Change value of Product : name, desc, price, discountPercent
    const { name, desc, price, discountPercent } = req.body;

    // if nothing changes, do nothing
    if (!name && !desc && !price && !discountPercent) {
      res.status(400).json({ message: 'Nothing changed' });
    }

    try {
      // check whether product exist or not
      const checkIdExist = await Product.findOne({
        attributes: ['name', 'desc', 'price', 'discount_id'],
        where: {
          id: IDProduct,
        },
      });

      if (!checkIdExist) {
        return res.status(404).json({ message: 'Cant detect product! ' });
      } else {
        // Admin add discount percent, we have to select discount_id in discount table to get discount_id
        // Update discount_id in product table
        // to do




      
        // if one of this values isn't changed, what will be updated ?
        const result = Product.update({ name, desc, price, discountPercent }, {
          where: {
            id: IDProduct
          }
        }
        );
        return res.status(200).send('Modify product: Success!');
      }
    } catch (error) {
      console.log('cant modify product! ');
      next(error);
    }
  }

  // [DELETE] /admin/product/:id/delete
  async deleteProduct(req, res, next) {
    const IDProduct = req.params.id;
    try {
      // check whether product exist or not
      const checkIdExist = await Product.findOne({
        where: {
          id: IDProduct,
        },
      });

      if (!checkIdExist) {
        return res.status(404).json({ message: 'Cant detect product!' });
      } else {
        const result = Product.destroy({ where: { id: IDProduct } });
        return res.status(200).send(result);
      }
    } catch (error) {
      console.log('cant delete product! ');
      next(error);
    }
  }

}

module.exports = new adminController();