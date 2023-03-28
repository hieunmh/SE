const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
//const { loginCheck, isAuth, isAdmin } = require("../middleware/auth");

router.post('/register', userController.register);
router.post('/login', userController.login);

router.post('/password/forgot', userController.forgotPassword);
router.put('/password/reset/:token', userController.resetPassword);

router.post('/logout', userController.logout);

router.get('/me', userController.getUserProfile);
router.put('/password/update', userController.updatePassword);
router.put('/me/update', userController.updateProfile);

router.get('/admin/users', userController.getAllUsers);
router.route('/admin/user/:id')
  .get(userController.getUserDetails)
  .delete(userController.deleteUser);


//router.post("/user", loginCheck, isAuth, isAdmin, userController.allUser);

module.exports = router;
