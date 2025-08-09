import mongoose, { Schema } from 'mongoose';

const WatchlistSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
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
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Watchlist = mongoose.model('Watchlist', WatchlistSchema);
