// import express from 'express';
// import productController from '../controllers/productController';

const express = require('express');
const productController = require('../controllers/productController');
const upload = require('../middleware/uploadImage');
const path = require('path');

const router = express.Router();
const saved_image_folder = "productImage";
const upload_image_field = "myImage";

router.get('/products/:id', productController.getProduct);
router.post('/products/add', productController.addProduct);
router.put('/products/:id/modify', productController.modifyProduct);
router.delete('/products/:id/delete', productController.deleteProduct);
router.get('/products', productController.getAllProducts);

// to do, not finished yet
router.post('/upload/photo', upload(saved_image_folder).single(upload_image_field), (req,res,next) => {
  const file_path = (req.file) ? path.join('upload', 'productImage', req.file.filename) : null;
  console.log(file_path);
  console.log(req.file);
  res.redirect('/');
});


// export default router;
module.exports = router;
