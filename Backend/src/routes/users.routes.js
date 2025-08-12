import express from 'express';
import { VerifyJwt } from '../middlewares/auth.middleware.js';
import {
    getProfile,
    updateProfile,
    changePassword,
    forgotPassword,
    resetPassword
} from '../controllers/user.controller.js';

const router = express.Router();

router.route('/me').get(VerifyJwt, getProfile);
router.route('/me').put(VerifyJwt, updateProfile);
router.route('/change-password').put(VerifyJwt, changePassword);
router.route('/forgot-password').put(VerifyJwt, forgotPassword);
router.route('/reset-password/:token').put(VerifyJwt, resetPassword);

export default router;
