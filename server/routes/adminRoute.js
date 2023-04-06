const express = require('express');
const productController = require('../controllers/productController');
const adminController = require('../controllers/adminController');
const upload = require('../middleware/uploadImage');
const {isAdmin, isAuth, isAlreadyLogin} = require('../middleware/authenticate');

const router = express.Router();

// variable
const saved_image_folder = "productImage";
const upload_image_field = "myImage";

// Upload image with name: productImage 
// router.post('/product/add',isAuth, isAdmin, upload(saved_image_folder).single(upload_image_field), 
//               adminController.addProduct);


router.post('/product/add', upload(saved_image_folder).single(upload_image_field), 
adminController.addProduct);

router.put('/product/:id/modify', isAuth, isAdmin, adminController.modifyProduct);
router.delete('/product/:id/delete', isAuth, isAdmin, adminController.deleteProduct);


module.exports = router;