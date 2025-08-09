import API from './api';

export const getPrice = (symbol) => API.get(`/market/price?symbol=${symbol}`);
export const getOHLC = (symbol, days = 7) => API.get(`/market/ohlc?symbol=${symbol}&days=${days}`);
