import express from 'express';
import { VerifyJwt } from '../middlewares/auth.middleware.js';
import { getProfile, updateProfile } from '../controllers/user.controller.js';

const router = express.Router();

router.route('/me').get(VerifyJwt, getProfile);
router.route('/me').put(VerifyJwt, updateProfile);

export default router;
