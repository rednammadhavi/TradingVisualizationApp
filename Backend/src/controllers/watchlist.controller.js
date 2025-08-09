import { User } from '../models/user.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { ApiError } from '../utils/apiError.js';

const getWatchlist = asyncHandler(async (req, res) => {
    return res.status(200).json(new ApiResponse(200, req.user.watchlist || [], 'Watchlist fetched successfully'));
});

const addToWatchlist = asyncHandler(async (req, res) => {
    const { symbol, displayName } = req.body;
    if (!symbol) throw new ApiError(400, 'Symbol is required');

    const user = await User.findById(req.user._id);
    const exists = user.watchlist.find(w => w.symbol.toLowerCase() === symbol.toLowerCase());
    if (exists) throw new ApiError(400, 'Already in watchlist');

    user.watchlist.push({ symbol, displayName });
    await user.save();

    return res.status(201).json(new ApiResponse(201, user.watchlist, 'Added to watchlist'));
});

const removeFromWatchlist = asyncHandler(async (req, res) => {
    const { symbol } = req.params;

    const user = await User.findById(req.user._id);
    user.watchlist = user.watchlist.filter(w => w.symbol.toLowerCase() !== symbol.toLowerCase());
    await user.save();

    return res.status(200).json(new ApiResponse(200, user.watchlist, 'Removed from watchlist'));
});

export {
    getWatchlist,
    addToWatchlist,
    removeFromWatchlist
};