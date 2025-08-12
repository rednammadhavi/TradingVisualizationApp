import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await API.put(`/users/reset-password/${token}`, { newPassword });
            toast.success("Password reset successful! Redirecting to login...");
            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            toast.error(err.response?.data?.message || "Error resetting password.");
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
                <h1 className="text-3xl sm:text-4xl font-extrabold text-center bg-gradient-to-r from-green-600 to-teal-500 bg-clip-text text-transparent mb-6 p-2">
                    Reset Password
                </h1>
                <p className="text-center text-gray-600 dark:text-gray-200 mb-6 text-base sm:text-lg">
                    Please enter your new password to complete the reset.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className="border border-gray-300 dark:border-gray-600 p-4 w-full rounded-xl focus:ring-3 focus:ring-green-500 focus:outline-none bg-white/80 dark:bg-gray-700/80 placeholder-gray-500 dark:placeholder-gray-400 pr-12 transition"
                        />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-4 cursor-pointer text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-teal-500/50 transition-transform duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? "Updating..." : "Reset Password"}
                    </button>
                </form>
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
