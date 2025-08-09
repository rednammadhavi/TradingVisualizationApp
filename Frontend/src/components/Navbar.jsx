import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
        setMenuOpen(false);
    };

    return (
        <nav className="bg-blue-700 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="flex items-center gap-2">
                            <span className="font-bold text-lg">TradingApp</span>
                        </Link>
                    </div>

                    {/* Desktop Menu (only if logged in) */}
                    {token && (
                        <div className="hidden md:flex space-x-6">
                            <Link to="/" className="hover:text-gray-200">Dashboard</Link>
                            <Link to="/watchlist" className="hover:text-gray-200">Watchlist</Link>
                            <Link to="/market" className="hover:text-gray-200">Market</Link>
                        </div>
                    )}

                    {/* Desktop Auth */}
                    <div className="hidden md:flex space-x-3">
                        {token ? (
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 px-4 py-1 rounded hover:bg-red-600"
                            >
                                Logout
                            </button>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="bg-white text-blue-700 px-4 py-1 rounded hover:bg-gray-100"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-green-500 px-4 py-1 rounded hover:bg-green-600"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="focus:outline-none"
                        >
                            {menuOpen ? (
                                // Close icon
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                // Hamburger icon
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-blue-800">
                    <div className="flex flex-col space-y-2 px-4 py-3">
                        {token ? (
                            <>
                                <Link
                                    to="/"
                                    onClick={() => setMenuOpen(false)}
                                    className="hover:text-gray-200"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    to="/watchlist"
                                    onClick={() => setMenuOpen(false)}
                                    className="hover:text-gray-200"
                                >
                                    Watchlist
                                </Link>
                                <Link
                                    to="/market"
                                    onClick={() => setMenuOpen(false)}
                                    className="hover:text-gray-200"
                                >
                                    Market
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500 px-4 py-1 rounded hover:bg-red-600"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    onClick={() => setMenuOpen(false)}
                                    className="bg-white text-blue-700 px-4 py-1 rounded hover:bg-gray-100"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    onClick={() => setMenuOpen(false)}
                                    className="bg-green-500 px-4 py-1 rounded hover:bg-green-600"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
