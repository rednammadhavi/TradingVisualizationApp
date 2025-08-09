import API from './api';

export const getWatchlist = () => API.get('/watchlist');
export const addToWatchlist = (item) => API.post('/watchlist', item);
export const removeFromWatchlist = (symbol) => API.delete(`/watchlist/${symbol}`);
