import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/error.middleware.js';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true
}));

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());

// routes
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/users.routes.js';
import watchlistRoutes from './routes/watchlist.routes.js';
import marketRoutes from './routes/market.routes.js';

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/watchlist', watchlistRoutes);
app.use('/api/market', marketRoutes);

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: Date.now() });
});

app.use(errorHandler);

export { app };
