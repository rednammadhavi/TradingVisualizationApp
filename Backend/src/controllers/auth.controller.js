import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { ApiError } from '../utils/apiError.js';

const register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!email || !password) {
        throw new ApiError(400, 'Email and password required');
    }

    const existing = await User.findOne({ email });
    if (existing) {
        throw new ApiError(400, 'User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = new User({ name, email, password: hash });
    await user.save();

    const token = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '2d'
    });

    return res
        .status(201)
        .json(new ApiResponse(201, { token, user: { id: user._id, email: user.email, name: user.name } }, 'User registered successfully'));
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ApiError(400, 'Email and password required');
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(400, 'Invalid credentials');
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
        throw new ApiError(400, 'Invalid credentials');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d'
    });

    return res
        .status(200)
        .json(new ApiResponse(200, { token, user: { id: user._id, email: user.email, name: user.name } }, 'Login successful'));
});

const logout = asyncHandler(async (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    });

    return res
        .status(200)
        .json(new ApiResponse(200, null, 'Logged out successfully'));
});

export { register, login, logout };
