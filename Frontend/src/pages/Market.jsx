import { useState, useEffect, useRef } from "react";
import { getPrice } from "../api/market";
import { Search, XCircle, AlertCircle } from "lucide-react";

export default function Market() {
    const [coins, setCoins] = useState([]);
    const [filteredCoins, setFilteredCoins] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedCoin, setSelectedCoin] = useState(null);
    const [priceData, setPriceData] = useState(null);
    const [loadingCoins, setLoadingCoins] = useState(false);
    const [loadingPrice, setLoadingPrice] = useState(false);
    const [error, setError] = useState("");
    const [highlightIndex, setHighlightIndex] = useState(0);
    const dropdownRef = useRef(null);

    useEffect(() => {
        async function fetchCoins() {
            setLoadingCoins(true);
            try {
                const res = await fetch(
                    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
                );
                const data = await res.json();
                setCoins(data);
                setFilteredCoins(data);
            } catch {
                setError("Failed to load coins list");
            } finally {
                setLoadingCoins(false);
            }
        }
        fetchCoins();
    }, []);

    useEffect(() => {
        if (!search) {
            setFilteredCoins(coins);
            return;
        }
        const filtered = coins.filter(
            (coin) =>
                coin.name.toLowerCase().includes(search.toLowerCase()) ||
                coin.symbol.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredCoins(filtered);
        setHighlightIndex(0);
    }, [search, coins]);

    const fetchPrice = async (symbol) => {
        setError("");
        setPriceData(null);
        setLoadingPrice(true);
        try {
            const { data } = await getPrice(symbol);
            if (data?.data) {
                setPriceData(data.data);
            } else {
                setError("No price data found");
            }
        } catch {
            setError("Failed to fetch price data");
        } finally {
            setLoadingPrice(false);
        }
    };

    const handleSelectCoin = (coin) => {
        setSelectedCoin(coin);
        setSearch(coin.name);
        setFilteredCoins([]);
        fetchPrice(coin.id);
    };

    const clearSelection = () => {
        setSelectedCoin(null);
        setSearch("");
        setPriceData(null);
        setFilteredCoins(coins);
        setError("");
    };

    useEffect(() => {
        if (!selectedCoin) return;
        const interval = setInterval(() => fetchPrice(selectedCoin.id), 30000);
        return () => clearInterval(interval);
    }, [selectedCoin]);

    const handleKeyDown = (e) => {
        if (!filteredCoins.length) return;
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlightIndex((prev) => (prev + 1) % filteredCoins.length);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlightIndex((prev) => (prev - 1 + filteredCoins.length) % filteredCoins.length);
        } else if (e.key === "Enter") {
            e.preventDefault();
            handleSelectCoin(filteredCoins[highlightIndex]);
        }
    };

    return (
        <div className="relative flex justify-center min-h-[90.8vh] p-3 sm:p-4 overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            {/* Background glow */}
            <div className="absolute top-0 left-0 w-40 sm:w-60 h-40 sm:h-60 bg-purple-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-52 sm:w-72 h-52 sm:h-72 bg-blue-400 rounded-full blur-3xl opacity-20 animate-pulse delay-200"></div>

            {/* Main Card */}
            <div className="relative w-full max-w-7xl backdrop-blur-xl bg-white/40 dark:bg-gray-800/40 border border-white/30 rounded-2xl shadow-2xl p-4 sm:p-6 md:p-10 animate-fadeIn">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent mb-6 sm:mb-8">
                    Market Prices
                </h1>

                {/* Search Bar */}
                <div className="relative mb-6 sm:mb-8">
                    <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-purple-500 bg-white dark:bg-gray-800 shadow-sm">
                        <Search className="ml-3 text-gray-500 flex-shrink-0" size={20} />
                        <input
                            type="text"
                            placeholder={loadingCoins ? "Loading coins..." : "Search and select a coin by name or symbol"}
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setSelectedCoin(null);
                                setPriceData(null);
                                setError("");
                            }}
                            onKeyDown={handleKeyDown}
                            disabled={loadingCoins}
                            className="w-full px-3 py-2 sm:py-3 bg-transparent text-gray-900 dark:text-gray-100 outline-none text-sm sm:text-base"
                            autoComplete="off"
                        />
                    </div>

                    {/* Dropdown */}
                    {search && filteredCoins.length > 0 && (
                        <ul
                            ref={dropdownRef}
                            className="absolute z-50 w-full max-h-48 sm:max-h-60 overflow-y-auto rounded-b-lg bg-white dark:bg-gray-800 border border-t-0 border-gray-300 dark:border-gray-600 shadow-lg scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-100 dark:scrollbar-track-gray-700"
                        >
                            {filteredCoins.map((coin, idx) => (
                                <li
                                    key={coin.id}
                                    onClick={() => handleSelectCoin(coin)}
                                    className={`cursor-pointer px-3 sm:px-4 py-2 sm:py-3 transition flex items-center gap-3 ${idx === highlightIndex
                                        ? "bg-purple-500 text-white"
                                        : "hover:bg-purple-100 dark:hover:bg-gray-700"
                                        }`}
                                >
                                    <img src={coin.image} alt={coin.name} className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex-shrink-0" />
                                    <div className="flex-grow min-w-0">
                                        <p className="font-semibold truncate">{coin.name}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                            {coin.symbol.toUpperCase()}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                    {search && filteredCoins.length === 0 && !loadingCoins && (
                        <div className="absolute z-50 w-full px-4 py-2 bg-white dark:bg-gray-800 border border-t-0 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 rounded-b-lg flex items-center gap-2">
                            <AlertCircle size={18} /> No coins found.
                        </div>
                    )}
                </div>

                {/* Clear Selection */}
                {selectedCoin && (
                    <div className="text-center mb-6 sm:mb-8">
                        <button
                            onClick={clearSelection}
                            className="inline-flex items-center gap-1 text-purple-600 hover:text-purple-800 dark:hover:text-purple-400 transition font-semibold text-sm sm:text-base"
                        >
                            <XCircle size={18} /> Clear selection &amp; search again
                        </button>
                    </div>
                )}

                {/* Error */}
                {error && (
                    <p className="text-center text-red-600 dark:text-red-400 mb-6 font-semibold flex justify-center items-center gap-2 text-sm sm:text-base">
                        <AlertCircle size={18} /> {error}
                    </p>
                )}

                {/* Loading Price */}
                {loadingPrice && (
                    <p className="text-center text-gray-600 dark:text-gray-300 mb-6 animate-pulse text-sm sm:text-base">
                        Loading price data...
                    </p>
                )}

                {/* Price Data */}
                {priceData && selectedCoin && (
                    <div className="max-w-md w-full mx-auto bg-white/60 dark:bg-gray-800/60 rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/30 p-4 sm:p-6 flex flex-col items-center gap-3 sm:gap-4 backdrop-blur-lg animate-fadeIn text-center">
                        <img src={selectedCoin.image} alt={selectedCoin.name} className="w-16 h-16 sm:w-20 sm:h-20 rounded-full shadow-md" />
                        <h2 className="text-lg sm:text-2xl font-extrabold text-gray-900 dark:text-gray-100">
                            {selectedCoin.name} ({selectedCoin.symbol.toUpperCase()})
                        </h2>
                        <p className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300">
                            Current Price:{" "}
                            <span className="text-blue-600 dark:text-blue-400">
                                ${priceData.price_usd?.toLocaleString() || "N/A"}
                            </span>
                        </p>
                        <p
                            className={`font-semibold text-sm sm:text-base ${priceData.percent_change_24h >= 0 ? "text-green-600" : "text-red-600"
                                }`}
                        >
                            24h Change: {priceData.percent_change_24h?.toFixed(2)}%
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                            Market Cap: ${priceData.market_cap_usd?.toLocaleString() || "N/A"}
                        </p>
                    </div>
                )}
            </div>

            {/* Animation Styles */}
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
