import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

router.get('/info', userController.getInfo);
router.get('/login', userController.getLoginPage);
router.post('/login', userController.login);
router.post('/logout', userController.logout);


export default router;