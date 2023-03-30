
const express = require('express');
const userController = require('../controllers/userController');
const { isAdmin, isAuth, isAlreadyLogin } = require('../middleware/authenticate');

const router = express.Router();

router.get('/info', isAuth, userController.getInfo);
router.get('/login', isAlreadyLogin, userController.getLoginPage);
router.post('/login', isAlreadyLogin, userController.login);
router.post('/logout', isAuth, userController.logout);
router.post('/register', isAlreadyLogin, userController.register);

// export default router;
module.exports = router;
