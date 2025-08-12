import { useState } from "react";
import { register as registerUser } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await registerUser(form);
            toast.success("Registration successful! Please login.");
            navigate("/login");
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex justify-center items-center min-h-screen px-4 overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            {/* Background glow */}
            <div className="absolute top-0 left-0 w-60 h-60 bg-purple-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-400 rounded-full blur-3xl opacity-20 animate-pulse delay-200"></div>

            {/* Card */}
            <div className="relative w-full max-w-md backdrop-blur-xl bg-white/40 dark:bg-gray-800/40 border border-white/30 rounded-2xl shadow-2xl p-8 animate-fadeIn">
                <h1 className="text-3xl font-extrabold text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent mb-8">
                    Create Your Account
                </h1>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 dark:border-gray-600 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white/70 dark:bg-gray-700/70"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 dark:border-gray-600 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white/70 dark:bg-gray-700/70"
                    />

                    {/* Password field with toggle */}
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 dark:border-gray-600 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none pr-10 bg-white/70 dark:bg-gray-700/70"
                        />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 cursor-pointer text-gray-500"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-teal-500/50 transition-all duration-300"
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>

                <p className="mt-6 text-sm text-center text-gray-600 dark:text-gray-300">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-blue-600 hover:underline font-medium"
                    >
                        Login
                    </Link>
                </p>
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
