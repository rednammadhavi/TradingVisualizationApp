import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="relative min-h-[90.8vh] flex flex-col items-center justify-center px-4 py-8 sm:px-6 sm:py-10 overflow-hidden bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            {/* Animated background blobs */}
            <div className="absolute top-0 left-0 w-60 h-60 sm:w-80 sm:h-80 bg-purple-400 rounded-full blur-3xl opacity-20 animate-[float_6s_ease-in-out_infinite]"></div>
            <div className="absolute bottom-0 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-blue-400 rounded-full blur-3xl opacity-20 animate-[float_7s_ease-in-out_infinite_reverse]"></div>

            {/* Main content */}
            <div className="relative z-10 flex flex-col items-center text-center max-w-lg">
                <h1 className="text-[5rem] sm:text-[7rem] md:text-[9rem] font-extrabold text-indigo-500 tracking-widest drop-shadow-lg">
                    404
                </h1>
                <div className="bg-indigo-500 px-4 py-1.5 text-sm sm:text-base text-white rounded rotate-3 shadow-md">
                    Page Not Found
                </div>
                <p className="mt-5 text-gray-700 dark:text-gray-400 text-base sm:text-lg md:text-xl leading-relaxed max-w-md">
                    Oops! The page you’re looking for doesn’t exist, has been moved, or is temporarily unavailable.
                </p>
                <Link
                    to="/"
                    className="mt-8 px-6 py-3 sm:px-8 sm:py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:-rotate-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                >
                    Go Back Home
                </Link>
            </div>

            {/* Floating animation keyframes */}
            <style>
                {`
                    @keyframes float {
                        0%, 100% { transform: translateY(0px) translateX(0px); }
                        50% { transform: translateY(-20px) translateX(10px); }
                    }
                `}
            </style>
        </div>
    );
}
