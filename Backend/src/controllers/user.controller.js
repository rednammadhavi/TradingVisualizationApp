import { User } from '../models/user.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { ApiError } from '../utils/apiError.js';
import bcrypt from 'bcryptjs';

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

    // Prevent password changes here
    if ('password' in updates || 'currentPassword' in updates || 'newPassword' in updates) {
        throw new ApiError(400, 'Password update not allowed via this route');
    }

    // Update user
    const user = await User.findByIdAndUpdate(req.user._id, updates, {
        new: true,
        runValidators: true
    }).select('-password');

    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    return res.status(200).json(
        new ApiResponse(200, user, 'User profile updated successfully')
    );
});

const changePassword = asyncHandler(async (req, res) => {
    if (!req.user) {
        throw new ApiError(401, 'Unauthorized access');
    }

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        throw new ApiError(400, 'Both current and new password are required');
    }

    const user = await User.findById(req.user._id);
    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
        throw new ApiError(400, 'Current password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json(
        new ApiResponse(200, null, 'Password updated successfully')
    );
});

const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    if (!email) throw new ApiError(400, 'Email is required');

    const user = await User.findOne({ email });
    if (!user) throw new ApiError(404, 'User not found');

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');

    user.resetPasswordToken = resetTokenHash;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    const message = `You requested a password reset. Click here to reset: ${resetUrl}`;

    try {
        await sendEmail({
            to: user.email,
            subject: 'Password Reset Request',
            text: message
        });

        res.status(200).json(new ApiResponse(200, null, 'Password reset link sent to email'));
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        throw new ApiError(500, 'Email could not be sent');
    }
});

const resetPassword = asyncHandler(async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!newPassword) throw new ApiError(400, 'New password is required');

    const resetTokenHash = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
        resetPasswordToken: resetTokenHash,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) throw new ApiError(400, 'Invalid or expired reset token');

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json(new ApiResponse(200, null, 'Password reset successful'));
});

export {
    getProfile,
    updateProfile,
    changePassword,
    forgotPassword,
    resetPassword
};
