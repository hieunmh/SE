import express from 'express';
import productController from '../controllers/productController';

const router = express.Router();

router.get('/products/:id', productController.getProduct);
router.post('/products/add', productController.addProduct);
router.put('/products/:id/modify', productController.modifyProduct);
router.delete('/products/:id/delete', productController.deleteProduct);
router.get('/products', productController.getAllProducts);

export default router;
