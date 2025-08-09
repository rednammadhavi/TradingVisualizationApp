import { useState } from 'react';
import { getPrice } from '../api/market';

export default function Market() {
    const [symbol, setSymbol] = useState('');
    const [priceData, setPriceData] = useState(null);

    const fetchPrice = async () => {
        if (!symbol) return;
        const { data } = await getPrice(symbol);
        setPriceData(data.data);
    };

    return (
        <div className="px-4 py-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Market Prices</h1>
            <div className="flex flex-col sm:flex-row gap-2 mb-4">
                <input value={symbol} onChange={(e) => setSymbol(e.target.value)} placeholder="Enter symbol (e.g. bitcoin)" className="border p-3 flex-1 rounded" />
                <button onClick={fetchPrice} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Get Price</button>
            </div>
            {priceData && (
                <div className="bg-white rounded-lg shadow p-4">
                    <pre className="whitespace-pre-wrap break-words">{JSON.stringify(priceData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}
