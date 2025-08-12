import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
    getWatchlist,
    addToWatchlist,
    removeFromWatchlist,
} from "../api/watchlist";

export default function Watchlist() {
    const [watchlist, setWatchlist] = useState([]);
    const [symbol, setSymbol] = useState("");
    const [loading, setLoading] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [selectedSymbol, setSelectedSymbol] = useState("");

    const loadWatchlist = async () => {
        try {
            setLoading(true);
            const { data } = await getWatchlist();
            setWatchlist(data.data || []);
        } catch {
            toast.error("Failed to load watchlist");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadWatchlist();
    }, []);

    const handleAdd = async () => {
        if (!symbol) {
            toast.error("Please enter a coin ID");
            return;
        }
        try {
            await addToWatchlist({ symbol });
            toast.success(`${symbol} added to watchlist!`);
            setSymbol("");
            loadWatchlist();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add coin");
        }
    };

    const openModal = (sym) => {
        setSelectedSymbol(sym);
        setShowModal(true);
    };

    const confirmRemove = async () => {
        try {
            await removeFromWatchlist(selectedSymbol);
            toast.success(`${selectedSymbol} removed from watchlist`);
            loadWatchlist();
        } catch {
            toast.error("Failed to remove coin");
        } finally {
            setShowModal(false);
            setSelectedSymbol("");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                    My Watchlist
                </h1>

                {/* Add Coin */}
                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                    <input
                        value={symbol}
                        onChange={(e) => setSymbol(e.target.value)}
                        placeholder="Enter coin ID (e.g. bitcoin)"
                        className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-3 flex-1 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                    <button
                        onClick={handleAdd}
                        className="bg-blue-600 text-white px-5 py-3 rounded-lg shadow-sm hover:bg-blue-700 transition"
                    >
                        Add
                    </button>
                </div>

                {/* Watchlist */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                    {loading ? (
                        <p className="text-gray-500 p-6 text-center">Loading watchlist...</p>
                    ) : watchlist.length === 0 ? (
                        <p className="text-gray-500 p-6 text-center">
                            No coins in your watchlist yet.
                        </p>
                    ) : (
                        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                            {watchlist.map((item) => (
                                <li
                                    key={item.symbol}
                                    className="flex justify-between items-center px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                                >
                                    <Link
                                        to={`/crypto/${item.symbol}`}
                                        className="font-medium text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                                    >
                                        {item.symbol.toUpperCase()}
                                    </Link>
                                    <button
                                        onClick={() => openModal(item.symbol)}
                                        className="text-sm text-red-600 hover:underline"
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {/* Confirmation Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    {/* Overlay */}
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setShowModal(false)}
                    ></div>

                    {/* Modal */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg z-10 w-full max-w-sm">
                        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
                            Remove from Watchlist
                        </h2>
                        <p className="mb-6 text-gray-600 dark:text-gray-300">
                            Are you sure you want to remove{" "}
                            <span className="font-semibold">{selectedSymbol}</span>?
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmRemove}
                                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
