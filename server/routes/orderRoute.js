const express = require('express');
const orderController = require('../controllers/orderController');
const { isAuth, isAdmin } = require('../middleware/authenticate');
const router = express.Router();

router.get('admin/get-all-orders', isAuth, isAdmin, orderController.getAllOrders);
router.post(
  '/admin/update-status',
  isAuth,
  isAdmin,
  orderController.postUpdateStatus,
);

router.get('/order-by-user', isAuth, orderController.getOrderByUser);
router.post('/create-order', isAuth, orderController.postCreateOrder);
router.put('/update-order', isAuth, orderController.postUpdateOrder);
router.post('/delete-order', isAuth, orderController.postDeleteOrder);

module.exports = router;
