
const express = require('express');
const userController = require('../controllers/userController');
const { isAdmin, isAuth, isAlreadyLogin } = require('../middleware/authenticate');

const router = express.Router();

router.get('/info', isAuth, isAuth, userController.getInfo);
router.get('/login', isAlreadyLogin, isAlreadyLogin, userController.getLoginPage);
router.post('/login', isAlreadyLogin, isAlreadyLogin, userController.login);
router.post('/logout', isAuth, isAuth, userController.logout);
router.post('/register', isAlreadyLogin, isAlreadyLogin, userController.register);

// export default router;
module.exports = router;
