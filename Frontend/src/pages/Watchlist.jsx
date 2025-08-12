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
        if (!symbol.trim()) {
            toast.error("Please enter a coin ID");
            return;
        }
        try {
            await addToWatchlist({ symbol: symbol.trim().toLowerCase() });
            toast.success(`${symbol.trim()} added to watchlist!`);
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
        <div className="relative flex justify-center items-center min-h-[90.8vh] p-4 overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            {/* Background glow */}
            <div className="absolute top-0 left-0 w-60 h-60 bg-purple-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-400 rounded-full blur-3xl opacity-20 animate-pulse delay-200"></div>

            {/* Main Card */}
            <div className="relative w-full max-w-7xl backdrop-blur-xl bg-white/40 dark:bg-gray-800/40 border border-white/30 rounded-2xl shadow-2xl p-6 sm:p-10 animate-fadeIn">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent mb-8">
                    My Watchlist
                </h1>

                {/* Add Coin */}
                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                    <input
                        value={symbol}
                        onChange={(e) => setSymbol(e.target.value)}
                        placeholder="Enter coin ID (e.g. bitcoin)"
                        className="flex-1 px-5 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/70 dark:bg-gray-900/70 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                        autoComplete="off"
                    />
                    <button
                        onClick={handleAdd}
                        className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-purple-500/50 transition-all duration-300"
                    >
                        Add
                    </button>
                </div>

                {/* Watchlist */}
                <div className="bg-white/60 dark:bg-gray-900/60 rounded-xl shadow-lg border border-white/30 dark:border-gray-700 overflow-hidden">
                    {loading ? (
                        <p className="text-center text-gray-600 dark:text-gray-300 p-8 text-lg animate-pulse">
                            Loading watchlist...
                        </p>
                    ) : watchlist.length === 0 ? (
                        <p className="text-center text-gray-600 dark:text-gray-400 p-8 text-lg">
                            No coins in your watchlist yet.
                        </p>
                    ) : (
                        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                            {watchlist.map((item) => (
                                <li
                                    key={item.symbol}
                                    className="flex justify-between items-center px-6 py-4 hover:bg-white/30 dark:hover:bg-gray-700/30 transition cursor-default"
                                >
                                    <Link
                                        to={`/crypto/${item.symbol}`}
                                        className="font-semibold text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                                    >
                                        {item.symbol.toUpperCase()}
                                    </Link>
                                    <button
                                        onClick={() => openModal(item.symbol)}
                                        className="text-sm text-red-600 dark:text-red-400 hover:underline focus:outline-none"
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
                <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setShowModal(false)}
                    ></div>
                    <div className="relative backdrop-blur-xl bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-2xl p-6 w-full max-w-sm mx-auto z-10 animate-fadeIn">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                            Remove from Watchlist
                        </h2>
                        <p className="mb-6 text-gray-700 dark:text-gray-300 text-center">
                            Are you sure you want to remove{" "}
                            <span className="font-semibold">{selectedSymbol.toUpperCase()}</span>?
                        </p>
                        <div className="flex justify-center gap-6">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-5 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmRemove}
                                className="px-5 py-2 rounded-lg bg-red-600 dark:bg-red-500 text-white hover:bg-red-700 dark:hover:bg-red-600 transition"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Animation */}
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.8s ease-out forwards;
                }
            `}</style>
        </div>
    );
}
