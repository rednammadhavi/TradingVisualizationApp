import * as marketApi from '../utils/market.api.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { ApiError } from '../utils/apiError.js';

const getPrice = asyncHandler(async (req, res) => {
    const { symbol } = req.query;
    if (!symbol) {
        throw new ApiError(400, 'Symbol query parameter is required');
    }

    const data = await marketApi.getPriceFor(symbol);
    if (!data || Object.keys(data).length === 0) {
        throw new ApiError(404, 'No market data found for this symbol');
    }

    return res.status(200).json(
        new ApiResponse(200, data, `Price data for ${symbol} fetched successfully`)
    );
});

const getOHLC = asyncHandler(async (req, res) => {
    const { symbol, days } = req.query;
    if (!symbol) {
        throw new ApiError(400, 'Symbol query parameter is required');
    }

    const ohlcData = await marketApi.getOHLC(symbol, days || 7);
    if (!ohlcData || !Array.isArray(ohlcData) || ohlcData.length === 0) {
        throw new ApiError(404, 'No OHLC data available for this symbol');
    }

    return res.status(200).json(
        new ApiResponse(200, ohlcData, `OHLC data for ${symbol} fetched successfully`)
    );
});

export { getPrice, getOHLC };