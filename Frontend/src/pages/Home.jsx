import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Home() {
    const [trending, setTrending] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulated auth state
    const navigate = useNavigate();

    useEffect(() => {
        // Simulate login check (replace with actual auth check)
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);

        const fetchTrending = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(
                    "https://api.coingecko.com/api/v3/coins/markets",
                    {
                        params: {
                            vs_currency: "usd",
                            order: "market_cap_desc",
                            per_page: 10,
                            page: 1,
                            sparkline: false,
                        },
                    }
                );
                setTrending(data);
            } catch (error) {
                console.error("Error fetching trending coins:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTrending();
    }, []);

    return (
        <div className="relative px-4 py-10 max-w-7xl mx-auto">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-60 h-60 bg-purple-400 rounded-full blur-3xl opacity-25 -z-10 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-400 rounded-full blur-3xl opacity-20 -z-10 animate-pulse delay-200"></div>

            {/* Hero Section */}
            <section className="text-center mb-16 backdrop-blur-xl bg-white/40 dark:bg-gray-800/40 rounded-3xl p-12 shadow-2xl border border-white/20 animate-fadeIn">
                <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent drop-shadow-md">
                    CryptoTracker Pro
                </h1>
                <p className="mt-5 text-gray-700 text-lg max-w-2xl mx-auto leading-relaxed">
                    Track your favorite cryptocurrencies, manage your watchlist, and stay updated with live market data — beautifully and effortlessly.
                </p>

                {/* Conditional Buttons */}
                <div className="mt-10 flex flex-wrap gap-5 justify-center">
                    {isLoggedIn ? (
                        <>
                            <Link
                                to="/market"
                                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg hover:shadow-blue-500/50 hover:scale-105 transition-all"
                            >
                                View Market
                            </Link>
                            <Link
                                to="/dashboard"
                                className="px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg hover:shadow-yellow-500/50 hover:scale-105 transition-all"
                            >
                                Go to Dashboard
                            </Link>
                            <Link
                                to="/watchlist"
                                className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg hover:shadow-green-500/50 hover:scale-105 transition-all"
                            >
                                My Watchlist
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/register"
                                className="px-8 py-4 text-lg rounded-xl bg-gradient-to-r from-blue-600 to-purple-500 text-white shadow-lg hover:shadow-purple-500/50 hover:scale-105 transition-all"
                            >
                                Get Started
                            </Link>
                            <Link
                                to="/login"
                                className="px-8 py-4 text-lg rounded-xl bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg hover:shadow-teal-500/50 hover:scale-105 transition-all"
                            >
                                Login
                            </Link>
                        </>
                    )}
                </div>
            </section>

            {/* Trending Coins Arc */}
            <section className="mt-14">
                {loading ? (
                    <p className="text-center text-lg text-gray-500 animate-pulse">
                        Loading market data...
                    </p>
                ) : (
                    <div className="flex justify-center items-end">
                        {trending.slice(0, 5).map((coin, index) => {
                            const yOffset = [20, 10, 0, 10, 20];
                            return (
                                <div
                                    key={coin.id}
                                    onClick={() => navigate(`/coin/${coin.id}`)}
                                    style={{
                                        transform: `translateY(${yOffset[index]}px)`,
                                        zIndex: index === 2 ? 10 : 5 - Math.abs(2 - index),
                                    }}
                                    className="cursor-pointer -ml-8 first:ml-0 rounded-full border-4 border-white shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 bg-white group relative"
                                >
                                    <img
                                        src={coin.image}
                                        alt={coin.name}
                                        className="w-28 h-28 rounded-full"
                                    />
                                    <div className="opacity-0 group-hover:opacity-100 absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full bg-black/70 text-white text-xs px-2 py-1 rounded-lg mt-1 transition-all">
                                        {coin.name}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>

            {/* Footer */}
            <footer className="mt-20 text-center text-gray-500 text-sm border-t border-gray-300 pt-6 animate-fadeIn delay-200">
                &copy; {new Date().getFullYear()}{" "}
                <span className="font-medium text-blue-600">
                    CryptoTracker Pro
                </span>
                . All rights reserved.
            </footer>

            {/* Animations */}
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
