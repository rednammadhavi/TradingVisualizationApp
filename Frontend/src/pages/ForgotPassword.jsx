import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { forgotPassword } from "../api/user";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await forgotPassword({ email });
            toast.success("Password reset link sent to your email!");
            setEmail("");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send reset link");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex justify-center items-center min-h-[90.8vh] px-6 sm:px-8 md:px-12 lg:px-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-0 left-0 w-56 h-56 bg-purple-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-400 rounded-full blur-3xl opacity-20 animate-pulse delay-200"></div>

            {/* Card */}
            <div className="relative w-full max-w-md backdrop-blur-xl bg-white/60 dark:bg-gray-800/60 border border-white/30 dark:border-gray-700 rounded-3xl shadow-2xl p-10 sm:p-12 animate-fadeIn">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent mb-6 p-2">
                    Forgot Password
                </h1>
                <p className="text-center text-gray-600 dark:text-gray-200 mb-8 text-base sm:text-lg">
                    Enter your email and we’ll send you a link to reset your password.
                </p>

                <form onSubmit={handleSubmit} className="space-y-7">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                        className="border border-gray-300 dark:border-gray-600 p-4 w-full rounded-xl focus:ring-3 focus:ring-blue-500 focus:outline-none bg-white/80 placeholder-gray-500 transition"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-500 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-purple-500/60 transition-transform duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? "Sending..." : "Reset Password"}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <Link
                        to="/login"
                        className="text-sm text-gray-600 dark:text-gray-300 hover:underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                        Back to Login
                    </Link>
                </div>
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
