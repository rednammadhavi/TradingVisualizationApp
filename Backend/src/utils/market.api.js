import axios from 'axios';
const base = process.env.COINGECKO_BASE || 'https://api.coingecko.com/api/v3';

const getPriceFor = async (symbol) => {
    const url = `${base}/simple/price?ids=${encodeURIComponent(symbol)}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true`;
    const resp = await axios.get(url);
    return resp.data;
};

const getOHLC = async (symbol, days = 7) => {
    const url = `${base}/coins/${encodeURIComponent(symbol)}/ohlc?vs_currency=usd&days=${days}`;
    const resp = await axios.get(url);
    return resp.data;
};

const initMarketPolling = (io) => {
    const interval = parseInt(process.env.POLL_INTERVAL_MS || '5000', 10);
    const staticList = (process.env.POLL_SYMBOLS || 'bitcoin,ethereum').split(',').map(s => s.trim()).filter(Boolean);

    setInterval(async () => {
        try {
            if (!staticList.length) return;
            const ids = staticList.join(',');
            const url = `${base}/simple/price?ids=${encodeURIComponent(ids)}&vs_currencies=usd&include_24hr_change=true`;
            const resp = await axios.get(url);
            io.emit('market:update', { ts: Date.now(), data: resp.data });
        } catch (err) {
            console.error('Polling market error', err.message);
        }
    }, interval);
};

export {
    getPriceFor,
    getOHLC,
    initMarketPolling
};
