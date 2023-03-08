import path from 'path';
import Test from '../models/productModel';

class testController {
  // [GET] /products/:id
  async getProducts(req, res, next) {
    const id = req.params.id;
    try {
      const result = await Test.findOne({
        where: {
          id,
        }
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

export default new testController();