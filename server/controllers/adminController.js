const {
  models: { Product },
} = require('../models');
const path = require('path');
const { formatMediaURL } = require('../helper/url_formatter');
const discount = require('../models/discount');
class adminController {
  // [POST] /admin/product/add
  async addProduct(req, res, next) {
    // need category_id, discount_id, quantity, sold
    // to do
    // handle category and discount
    // admin pick one of all categories and pick discount
    // search for category id in table product_category and discount_id in discount
    // get foreign key

    let { name, desc, price, quantity, sold_number } = req.body;
    price = parseInt(price);

    if (!name || !desc || !price || !quantity || !sold_number) {
      return res.status(400).json({
        msg: 'Please fill all !!!',
      });
    } else {
      const file_path = req.file
        ? path.join('upload', 'productImage', req.file.filename)
        : null;
      console.log(formatMediaURL(file_path));

      const result = await Product.findOrCreate({
        where: {
          name,
          desc,
          price,
        },
        defaults: {
          image: formatMediaURL(file_path),
        },
      })
        .then((data) => {
          console.log(data[0]);
          if (data[0]._options.isNewRecord) {
            return res.status(200).json({
              success: 'Uploaded Success !!',
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
        const result = Product.update(
          { name, desc, price, discountPercent },
          {
            where: {
              id: IDProduct,
            },
          },
        );
        return res.status(200).json({ success: 'Modify product: Success!' });
      }
    } catch (error) {
      console.log('cant modify product! ');
      next(error);
    }
  }

  // [POST] /admin/product/:id/delete
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
        const result = await Product.destroy({ where: { id: IDProduct } });
        return res.status(200).json({
          success: 'Deleted success!',
        });
      }
    } catch (error) {
      console.log('Cant delete product! ');
      next(error);
    }
  }
}

module.exports = new adminController();
