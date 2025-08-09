import mongoose, { Schema } from 'mongoose';

const WatchItemSchema = new Schema({
    symbol: {
        type: String,
        required: true
    },
    displayName: {
        type: String
    },
    addedAt: {
        type: Date,
        default: Date.now
    }
});

const PortfolioItemSchema = new Schema({
    symbol: String,
    amount: Number,
    avgPrice: Number
});

const UserSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    watchlist: [WatchItemSchema],
    portfolio: [PortfolioItemSchema],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const User = mongoose.model('User', UserSchema);
