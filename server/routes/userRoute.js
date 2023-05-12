const express = require('express');
const userController = require('../controllers/userController');
const {
  isAdmin,
  isAuth,
  isAlreadyLogin,
} = require('../middleware/authenticate');

const router = express.Router();

router.get('/info', isAuth, userController.getInfo);
router.get('/login', isAlreadyLogin, userController.getLoginPage);
router.post('/login', isAlreadyLogin, userController.login);
router.post('/logout', isAuth, userController.logout);
router.post('/register', isAlreadyLogin, userController.register);
router.post('/edit-info', isAuth, userController.updateUserInfo);
router.post('/change-password', isAuth, userController.updatePassword);
router.get('/admin/all-user', isAuth, isAdmin, userController.getAllUser);
router.post('/admin/delete-user', isAuth, isAdmin, userController.deleteUser);


// export default router;
module.exports = router;
