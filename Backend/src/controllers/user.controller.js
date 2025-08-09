import { User } from '../models/user.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { ApiError } from '../utils/apiError.js';

const getProfile = asyncHandler(async (req, res) => {
    if (!req.user) {
        throw new ApiError(401, 'Unauthorized access');
    }
    return res.status(200).json(
        new ApiResponse(200, req.user, 'User profile fetched successfully')
    );
});

const updateProfile = asyncHandler(async (req, res) => {
    if (!req.user) {
        throw new ApiError(401, 'Unauthorized access');
    }

    const updates = req.body;
    if ('password' in updates) {
        throw new ApiError(400, 'Password update not allowed via this route');
    }

    const user = await User.findByIdAndUpdate(req.user._id, updates, {
        new: true
    }).select('-password');

    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    return res.status(200).json(
        new ApiResponse(200, user, 'User profile updated successfully')
    );
});

export { getProfile, updateProfile };