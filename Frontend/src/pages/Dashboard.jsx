import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

export default function MarketDashboard() {
    const [currencies, setCurrencies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(
                    "https://api.coingecko.com/api/v3/coins/markets",
                    {
                        params: {
                            vs_currency: "usd",
                            order: "market_cap_desc",
                            per_page: 50,
                            page: 1,
                            sparkline: false,
                            price_change_percentage: "24h",
                        },
                    }
                );

                // Fetch INR prices in same request using ids
                const { data: inrData } = await axios.get(
                    "https://api.coingecko.com/api/v3/simple/price",
                    {
                        params: {
                            ids: data.map((coin) => coin.id).join(","),
                            vs_currencies: "inr",
                        },
                    }
                );

                const merged = data.map((coin) => ({
                    ...coin,
                    inr_price: inrData[coin.id]?.inr || null,
                }));

                setCurrencies(merged);
            } catch (error) {
                console.error("Error fetching market data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredCurrencies = currencies.filter(
        (coin) =>
            coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="relative flex justify-center min-h-[90.8vh] p-3 sm:p-4 overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            {/* Background glow */}
            <div className="absolute top-0 left-0 w-40 sm:w-60 h-40 sm:h-60 bg-purple-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-52 sm:w-72 h-52 sm:h-72 bg-blue-400 rounded-full blur-3xl opacity-20 animate-pulse delay-200"></div>

            {/* Main Container */}
            <div className="relative w-full max-w-7xl backdrop-blur-xl bg-white/40 dark:bg-gray-800/40 border border-white/30 rounded-2xl shadow-2xl p-6 animate-fadeIn">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent mb-8">
                    Market Dashboard
                </h1>

                {/* Search Bar with Icon */}
                <div className="mb-8 flex justify-center">
                    <div className="relative w-full max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Search coin by name or symbol..."
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/70 dark:bg-gray-700/70 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            autoComplete="off"
                        />
                    </div>
                </div>

                {loading ? (
                    <p className="text-center text-gray-600 dark:text-gray-300 text-lg animate-pulse">
                        Loading currencies...
                    </p>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredCurrencies.length === 0 ? (
                            <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
                                No coins found matching "{searchTerm}"
                            </p>
                        ) : (
                            filteredCurrencies.map((coin) => (
                                <div
                                    key={coin.id}
                                    className="group bg-white/50 dark:bg-gray-700/50 border border-white/20 rounded-xl p-5 shadow-md hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 ease-out cursor-pointer"
                                    onClick={() => window.open(`/crypto/${coin.id}`, "_self")}
                                    title={`${coin.name} (${coin.symbol.toUpperCase()})`}
                                >
                                    {/* Header */}
                                    <div className="flex items-center gap-3 mb-4">
                                        <img
                                            src={coin.image}
                                            alt={coin.name}
                                            className="w-12 h-12 rounded-full border border-white/30 shadow-sm"
                                            loading="lazy"
                                        />
                                        <div>
                                            <Link
                                                to={`/crypto/${coin.id}`}
                                                className="text-lg font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                {coin.name}
                                            </Link>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {coin.symbol.toUpperCase()}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Price Info */}
                                    <div className="space-y-2 text-sm sm:text-base">
                                        <p className="text-gray-900 dark:text-gray-100">
                                            <span className="font-medium">USD:</span> ${coin.current_price.toLocaleString()}
                                        </p>
                                        <p className="text-gray-900 dark:text-gray-100">
                                            <span className="font-medium">INR:</span> ₹{coin.inr_price?.toLocaleString() || "N/A"}
                                        </p>
                                        <p
                                            className={`font-semibold ${coin.price_change_percentage_24h >= 0
                                                ? "text-green-600 dark:text-green-400"
                                                : "text-red-600 dark:text-red-400"
                                                }`}
                                        >
                                            24h: {coin.price_change_percentage_24h?.toFixed(2)}%
                                        </p>
                                        <p className="text-gray-900 dark:text-gray-100">
                                            📊 <span className="font-medium">Mkt Cap:</span> ${coin.market_cap.toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>

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
