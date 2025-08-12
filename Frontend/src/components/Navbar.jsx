import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Sun, Moon, Menu, X } from "lucide-react";

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem("token");
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const [scrolled, setScrolled] = useState(false);

    const [theme, setTheme] = useState(() => {
        if (typeof window !== "undefined") {
            return (
                localStorage.getItem("theme") ||
                (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
            );
        }
        return "light";
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        }
        if (menuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuOpen]);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 5);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
        setMenuOpen(false);
    };

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    const linkClasses =
        "block px-4 py-2 rounded-md text-base font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500";

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-white/90 dark:bg-gray-900/95 border-b border-gray-300 dark:border-gray-700 transition-shadow duration-300 ${scrolled ? "shadow-lg" : ""
                    }`}
                role="navigation"
                aria-label="Main Navigation"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex-shrink-0 flex items-center">
                            <Link
                                to="/"
                                className="flex items-center justify-center select-none"
                                aria-label="Go to homepage"
                            >
                                <span className="font-extrabold text-xl sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500">
                                    CryptoTracker
                                </span>
                            </Link>
                        </div>

                        {token && (
                            <div
                                className="hidden md:flex space-x-8"
                                role="menubar"
                                aria-label="Primary navigation"
                            >
                                <Link
                                    to="/dashboard"
                                    className={`${linkClasses} text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400`}
                                    role="menuitem"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    to="/watchlist"
                                    className={`${linkClasses} text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400`}
                                    role="menuitem"
                                >
                                    Watchlist
                                </Link>
                                <Link
                                    to="/market"
                                    className={`${linkClasses} text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400`}
                                    role="menuitem"
                                >
                                    Market
                                </Link>
                                <Link
                                    to="/profile"
                                    className={`${linkClasses} text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400`}
                                    role="menuitem"
                                >
                                    Profile
                                </Link>
                            </div>
                        )}

                        <div className="hidden md:flex items-center space-x-4">
                            <button
                                onClick={toggleTheme}
                                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                                className="p-2 rounded-md hover:bg-blue-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                {theme === "dark" ? (
                                    <Sun className="text-yellow-400" size={20} />
                                ) : (
                                    <Moon className="text-gray-700" size={20} />
                                )}
                            </button>

                            {token ? (
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition"
                                    aria-label="Logout"
                                >
                                    Logout
                                </button>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="bg-green-600 hover:bg-green-800 text-white px-4 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>

                        <div className="md:hidden flex items-center space-x-2">
                            <button
                                onClick={toggleTheme}
                                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                                className="p-2 rounded-md hover:bg-blue-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                {theme === "dark" ? (
                                    <Sun className="text-yellow-400" size={20} />
                                ) : (
                                    <Moon className="text-gray-700" size={20} />
                                )}
                            </button>

                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                aria-expanded={menuOpen}
                                aria-controls="mobile-menu"
                                aria-label={menuOpen ? "Close menu" : "Open menu"}
                                className="p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 text-white"
                            >
                                {menuOpen ? <X size={24} className="text-black dark:text-white" /> : <Menu size={24} className="text-black dark:text-white" />}
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    ref={menuRef}
                    id="mobile-menu"
                    className={`md:hidden bg-white dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700 overflow-hidden transition-[max-height] duration-300 ease-in-out ${menuOpen ? "max-h-screen py-4" : "max-h-0"
                        }`}
                    aria-hidden={!menuOpen}
                >
                    <div className="flex flex-col space-y-3 px-6">
                        {token ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    onClick={() => setMenuOpen(false)}
                                    className={`${linkClasses} text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400`}
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    to="/watchlist"
                                    onClick={() => setMenuOpen(false)}
                                    className={`${linkClasses} text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400`}
                                >
                                    Watchlist
                                </Link>
                                <Link
                                    to="/market"
                                    onClick={() => setMenuOpen(false)}
                                    className={`${linkClasses} text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400`}
                                >
                                    Market
                                </Link>
                                <Link
                                    to="/profile"
                                    onClick={() => setMenuOpen(false)}
                                    className={`${linkClasses} text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400`}
                                >
                                    Profile
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    onClick={() => setMenuOpen(false)}
                                    className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    onClick={() => setMenuOpen(false)}
                                    className="bg-green-600 hover:bg-green-800 text-white px-4 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* Spacer div to prevent content being covered by fixed navbar */}
            <div className="h-16" />
        </>
    );
}
