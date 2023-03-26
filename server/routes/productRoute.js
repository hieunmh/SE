// import express from 'express';
// import productController from '../controllers/productController';

const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/:id', productController.getProduct);
router.post('/add', productController.addProduct);
router.put('/:id/modify', productController.modifyProduct);
router.delete('/:id/delete', productController.deleteProduct);
router.get('/', productController.getAllProducts);

// export default router;
module.exports = router