import express from 'express';
import testController from '../controllers/productController';

const router = express.Router();

router.get('/products/:id', testController.getProducts);

export default router;