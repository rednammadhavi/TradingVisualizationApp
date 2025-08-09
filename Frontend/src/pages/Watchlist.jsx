import { useEffect, useState } from 'react';
import { getWatchlist, addToWatchlist, removeFromWatchlist } from '../api/watchlist';

export default function Watchlist() {
    const [watchlist, setWatchlist] = useState([]);
    const [symbol, setSymbol] = useState('');

    const loadWatchlist = async () => {
        const { data } = await getWatchlist();
        setWatchlist(data.data);
    };

    useEffect(() => { loadWatchlist(); }, []);

    const handleAdd = async () => {
        if (!symbol) return;
        await addToWatchlist({ symbol });
        setSymbol('');
        loadWatchlist();
    };

    const handleRemove = async (sym) => {
        await removeFromWatchlist(sym);
        loadWatchlist();
    };

    return (
        <div className="px-4 py-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">My Watchlist</h1>
            <div className="flex flex-col sm:flex-row gap-2 mb-4">
                <input value={symbol} onChange={(e) => setSymbol(e.target.value)} placeholder="Enter symbol" className="border p-3 flex-1 rounded" />
                <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add</button>
            </div>
            <ul className="bg-white rounded-lg shadow divide-y">
                {watchlist.map((item) => (
                    <li key={item.symbol} className="flex justify-between items-center p-3">
                        <span className="font-medium">{item.symbol}</span>
                        <button onClick={() => handleRemove(item.symbol)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
