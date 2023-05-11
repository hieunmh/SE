const { Op } = require('sequelize');
const {
  models: { Product, Discount },
  sequelize,
} = require('../models');
const path = require('path');
const { formatMediaURL } = require('../helper/url_formatter');

class productController {
  // [GET] /products
  async getAllProducts(req, res, next) {
    try {
      const result = await Product.findAll({
        attributes: [
          'id',
          'name',
          'category_id',
          'sold_number',
          'quantity',
          'image',
          'price',
          [
            sequelize.fn(
              'round',
              sequelize.literal('price*(1-discount_percent)'),
              0,
            ),
            'salePrice',
          ],
        ],
        include: {
          model: Discount,
          attributes: { exclude: ['created_at'] },
        },
      });
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
        attributes: [
          'id',
          'name',
          'sold_number',
          'quantity',
          'image',
          'price',
          [
            sequelize.fn(
              'round',
              sequelize.literal('price*(1-discount_percent)'),
              0,
            ),
            'salePrice',
          ],
        ],
        where: {
          id,
        },
        include: {
          model: Discount,
          attributes: { exclude: ['created_at'] },
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

  // [POST] /admin/product/add
  async addProduct(req, res, next) {
    // need category_id, discount_id, quantity, sold
    // to do
    // handle category and discount
    // admin pick one of all categories and pick discount
    // search for category id in table product_category and discount_id in discount
    // get foreign key

    let { name, desc, price, quantity, sold_number, category_id, discount_id } =
      JSON.parse(req.body.document);
    price = parseInt(price);

    if (!name || !desc || !price || !quantity || !category_id || !discount_id) {
      return res.status(400).json({
        msg: 'Please fill all !!!',
      });
    } else {
      const file_path = req.file
        ? path.join('upload', 'productImage', req.file.filename)
        : null;
      console.log(formatMediaURL(file_path));

      // create product
      const result = await Product.findOrCreate({
        where: {
          name,
          desc,
          price,
          quantity,
          category_id,
          discount_id,
        },
        defaults: {
          sold_number,
          image: formatMediaURL(file_path),
        },
      })
        .then((data) => {
          console.log(data[0]);
          if (data[0]._options.isNewRecord) {
            return res.status(200).json({
              success: 'Created Success !!',
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
    const { name, desc, price, discountPercent, quantity } = req.body;

    // if nothing changes, do nothing
    if (!name && !desc && !price && !discountPercent && !quantity) {
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
          { name, desc, price, discountPercent, quantity },
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

  // [POST] /add-review
  async addReviewProduct(req, res, next) {}

  // [POST] /delete-review
  async deleteReviewProduct(req, res, next) {}
}

// export default new productController();
module.exports = new productController();
