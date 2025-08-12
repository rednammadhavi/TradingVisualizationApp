import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
                        },
                    }
                );
                setCurrencies(data);
            } catch (error) {
                console.error("Error fetching market data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Filter currencies by search term (name or symbol)
    const filteredCurrencies = currencies.filter((coin) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="relative min-h-screen px-4 py-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            {/* Background glow */}
            <div className="absolute top-0 left-0 w-60 h-60 bg-purple-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-400 rounded-full blur-3xl opacity-20 animate-pulse delay-200"></div>

            <div className="relative max-w-7xl mx-auto backdrop-blur-xl bg-white/40 dark:bg-gray-800/40 border border-white/30 rounded-2xl shadow-2xl p-6 animate-fadeIn">
                <h1 className="text-3xl font-extrabold text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent mb-6">
                    Market Dashboard
                </h1>

                {/* Search input */}
                <div className="mb-6 flex justify-center">
                    <input
                        type="text"
                        placeholder="Search coin by name or symbol..."
                        className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {loading ? (
                    <p className="text-center text-gray-600 dark:text-gray-300">
                        Loading currencies...
                    </p>
                ) : (
                    <div className="overflow-x-auto rounded-lg border border-white/20 shadow-lg">
                        <table className="min-w-full text-sm text-left backdrop-blur-sm">
                            <thead className="bg-white/40 dark:bg-gray-700/40 border-b border-white/20">
                                <tr>
                                    <th className="px-4 py-3">#</th>
                                    <th className="px-4 py-3">Coin</th>
                                    <th className="px-4 py-3">Price (USD)</th>
                                    <th className="px-4 py-3">24h Change</th>
                                    <th className="px-4 py-3">Market Cap</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCurrencies.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="text-center py-6 text-gray-500 dark:text-gray-400"
                                        >
                                            No coins found matching "{searchTerm}"
                                        </td>
                                    </tr>
                                ) : (
                                    filteredCurrencies.map((coin, index) => (
                                        <tr
                                            key={coin.id}
                                            className="border-b border-white/10 hover:bg-white/30 dark:hover:bg-gray-700/30 transition-colors"
                                        >
                                            <td className="px-4 py-3">{index + 1}</td>
                                            <td className="px-4 py-3 flex items-center gap-2">
                                                <img
                                                    src={coin.image}
                                                    alt={coin.name}
                                                    className="w-6 h-6"
                                                />
                                                <Link
                                                    to={`/crypto/${coin.id}`}
                                                    className="text-blue-600 dark:text-blue-400 hover:underline"
                                                >
                                                    {coin.name} ({coin.symbol.toUpperCase()})
                                                </Link>
                                            </td>
                                            <td className="px-4 py-3">
                                                ${coin.current_price.toLocaleString()}
                                            </td>
                                            <td
                                                className={`px-4 py-3 font-medium ${coin.price_change_percentage_24h >= 0
                                                        ? "text-green-600"
                                                        : "text-red-600"
                                                    }`}
                                            >
                                                {coin.price_change_percentage_24h?.toFixed(2)}%
                                            </td>
                                            <td className="px-4 py-3">
                                                ${coin.market_cap.toLocaleString()}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
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
