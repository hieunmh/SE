const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
//const { loginCheck, isAuth, isAdmin } = require("../middleware/auth");

router.post('/register', authController.register);
router.post('/login', authController.login);

router.post('/password/forgot', authController.forgotPassword);
router.put('/password/reset/:token', authController.resetPassword);

router.post('/logout', authController.logout);

router.get('/me', authController.getUserProfile);
router.put('/password/update', authController.updatePassword);
router.put('/me/update', authController.updateProfile);

router.get('/admin/users', authController.getAllUsers);
router.route('/admin/user/:id')
  .get(authController.getUserDetails)
  .delete(authController.deleteUser);


//router.post("/user", loginCheck, isAuth, isAdmin, authController.allUser);

module.exports = router;
