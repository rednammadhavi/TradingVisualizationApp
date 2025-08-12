import { useState } from "react";
import { login as loginUser } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await loginUser(form);
            localStorage.setItem("token", data.data.token);
            toast.success("Login successful!");
            navigate("/");
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
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
                    Welcome Back
                </h1>

                <form onSubmit={handleSubmit} className="space-y-7">
                    {/* Email */}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                        className="border border-gray-300 dark:border-gray-600 p-4 w-full rounded-xl focus:ring-3 focus:ring-blue-500 focus:outline-none bg-white/80 dark:bg-gray-700/80 placeholder-gray-500 dark:placeholder-gray-400 transition dark:text-white"
                    />

                    {/* Password with forgot password link */}
                    <div>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                value={form.password}
                                onChange={handleChange}
                                required
                                autoComplete="current-password"
                                className="border border-gray-300 dark:border-gray-600 p-4 w-full rounded-xl focus:ring-3 focus:ring-blue-500 focus:outline-none pr-12 bg-white/80 dark:bg-gray-700/80 placeholder-gray-500 dark:placeholder-gray-400 transition dark:text-white"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition focus:outline-none"
                            >
                                {showPassword ? <FaEyeSlash size={20} className="dark:text-white" /> : <FaEye size={20} className="dark:text-white" />}
                            </button>
                        </div>
                        <div className="flex justify-start mt-1">
                            <Link
                                to="/forgot-password"
                                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                Forgot Password?
                            </Link>
                        </div>
                    </div>

                    {/* Login button with register link */}
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-500 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-purple-500/60 transition-transform duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                        <div className="flex justify-end mt-2">
                            <Link
                                to="/register"
                                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                Register
                            </Link>
                        </div>
                    </div>
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
