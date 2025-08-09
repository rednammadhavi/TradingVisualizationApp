import express from 'express';
import { VerifyJwt } from '../middlewares/auth.middleware.js';
import {
    getWatchlist,
    addToWatchlist,
    removeFromWatchlist
} from '../controllers/watchlist.controller.js';

const router = express.Router();

router.route('/').get(VerifyJwt, getWatchlist);
router.route('/').post(VerifyJwt, addToWatchlist);
router.route('/:symbol').delete(VerifyJwt, removeFromWatchlist);

export default router;
