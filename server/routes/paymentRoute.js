const express = require('express');
const paymentController = require('../controllers/paymentController');
const { isAuth } = require('../middleware/authenticate');
const router = express.Router();

router.post('/payment', isAuth, paymentController.postPayment);
router.post(
  '/payment/create-address',
  isAuth,
  paymentController.postCreateAddress,
);

module.exports = router;
