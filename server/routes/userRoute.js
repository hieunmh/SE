
const express = require('express');
const userController = require('../controllers/userController');
const authenticateUser = require('../middleware/authenticate');

const router = express.Router();

router.get('/info', authenticateUser, userController.getInfo);
router.get('/login', userController.getLoginPage);
router.post('/login', userController.login);
router.post('/logout', authenticateUser,userController.logout);
router.post('/register', userController.register);

// export default router;
module.exports = router;
