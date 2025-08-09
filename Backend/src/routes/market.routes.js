import express from 'express';
import { getPrice, getOHLC } from '../controllers/market.controller.js';

const router = express.Router();

router.route('/price').get(getPrice);
router.route('/ohlc').get(getOHLC);

export default router;
