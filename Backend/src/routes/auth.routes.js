import express from 'express';
import { register, login, logout } from '../controllers/auth.controller.js';
import { VerifyJwt } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').post(VerifyJwt, logout);

export default router;
