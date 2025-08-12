import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addToWatchlist } from "../api/watchlist";

export default function CryptoProfile() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
                const json = await res.json();
                setData(json);
            } catch (error) {
                console.error("Error fetching currency data:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [id]);

    const handleAddToWatchlist = async () => {
        try {
            await addToWatchlist({ symbol: id });
            toast.success(`${data.name} added to watchlist!`);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add to watchlist");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[90.8vh] bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                <p className="text-lg text-gray-600 dark:text-gray-300 animate-pulse">
                    Loading...
                </p>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="flex justify-center items-center min-h-[90.8vh] bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                <p className="text-lg text-gray-600 dark:text-gray-300">
                    No data found
                </p>
            </div>
        );
    }

    return (
        <div className="relative flex justify-center items-center min-h-[90.8vh] p-3 sm:p-4 overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            {/* Background glow */}
            <div className="absolute top-0 left-0 w-40 sm:w-60 h-40 sm:h-60 bg-purple-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-52 sm:w-72 h-52 sm:h-72 bg-blue-400 rounded-full blur-3xl opacity-20 animate-pulse delay-200"></div>

            {/* Card */}
            <div className="relative w-full max-w-3xl backdrop-blur-xl bg-white/40 dark:bg-gray-800/40 border border-white/30 rounded-2xl shadow-2xl p-4 sm:p-8 animate-fadeIn">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 border-b border-white/30 pb-4 sm:pb-6 text-center sm:text-left">
                    <img
                        src={data.image.large}
                        alt={data.name}
                        className="w-16 h-16 sm:w-24 sm:h-24 rounded-full border border-white/40 shadow-lg"
                    />
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                            {data.name}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300 uppercase tracking-wider text-sm sm:text-base">
                            {data.symbol}
                        </p>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
                    <div className="bg-white/60 dark:bg-gray-700/60 p-3 sm:p-4 rounded-lg border border-white/30 shadow">
                        <span className="block font-semibold text-gray-700 dark:text-gray-200">Current Price</span>
                        <span className="text-gray-900 dark:text-white">
                            ${data.market_data.current_price.usd.toLocaleString()}
                        </span>
                    </div>
                    <div className="bg-white/60 dark:bg-gray-700/60 p-3 sm:p-4 rounded-lg border border-white/30 shadow">
                        <span className="block font-semibold text-gray-700 dark:text-gray-200">Market Cap</span>
                        <span className="text-gray-900 dark:text-white">
                            ${data.market_data.market_cap.usd.toLocaleString()}
                        </span>
                    </div>
                    <div className="bg-white/60 dark:bg-gray-700/60 p-3 sm:p-4 rounded-lg border border-white/30 shadow">
                        <span className="block font-semibold text-gray-700 dark:text-gray-200">24h Change</span>
                        <span
                            className={
                                data.market_data.price_change_percentage_24h >= 0
                                    ? "text-green-600"
                                    : "text-red-600"
                            }
                        >
                            {data.market_data.price_change_percentage_24h.toFixed(2)}%
                        </span>
                    </div>
                    <div className="bg-white/60 dark:bg-gray-700/60 p-3 sm:p-4 rounded-lg border border-white/30 shadow">
                        <span className="block font-semibold text-gray-700 dark:text-gray-200">All Time High</span>
                        <span className="text-gray-900 dark:text-white">
                            ${data.market_data.ath.usd.toLocaleString()}
                        </span>
                    </div>
                </div>

                {/* Description Section */}
                <div className="mt-6 sm:mt-8">
                    <h2 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">Description</h2>
                    <p
                        className="text-gray-700 dark:text-gray-300 mt-2 sm:mt-3 text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{
                            __html: data.description.en.split(".")[0] + "."
                        }}
                    />
                </div>

                {/* Button */}
                <button
                    onClick={handleAddToWatchlist}
                    className="mt-6 sm:mt-8 w-full py-2.5 sm:py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-500 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-purple-500/50 transition-all duration-300"
                >
                    Add to Watchlist
                </button>
            </div>

            {/* Animation keyframes */}
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
