import { ApiError } from '../utils/apiError.js';

const errorHandler = (err, req, res, next) => {
    console.error(err);

    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors: err.errors,
            data: err.data
        });
    }

    return res.status(500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
};

export { errorHandler };
