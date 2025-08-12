import { useEffect, useState } from "react";
import { getCurrentUser, updateUser } from "../api/user";
import API from "../api/api";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ProfilePage() {
    const [profile, setProfile] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [passwordMode, setPasswordMode] = useState(false);
    const [form, setForm] = useState({ name: "", email: "" });
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: "",
        newPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);

    const loadProfile = async () => {
        try {
            const { data } = await getCurrentUser();
            setProfile(data.data);
            setForm({
                name: data.data.name || "",
                email: data.data.email || "",
            });
        } catch (err) {
            toast.error("Failed to load profile");
        }
    };

    useEffect(() => {
        loadProfile();
    }, []);

    const handleProfileUpdate = async () => {
        setLoading(true);
        try {
            await updateUser(form);
            await loadProfile();
            setEditMode(false);
            toast.success("Profile updated successfully");
        } catch (err) {
            toast.error(err.response?.data?.message || "Error updating profile");
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordChange = async () => {
        setLoading(true);
        try {
            await API.put("/users/change-password", passwordForm);
            toast.success("Password updated successfully");
            setPasswordForm({ currentPassword: "", newPassword: "" });
            setPasswordMode(false);
        } catch (err) {
            toast.error(err.response?.data?.message || "Error updating password");
        } finally {
            setLoading(false);
        }
    };

    if (!profile)
        return (
            <div className="text-center mt-10 text-gray-600 dark:text-gray-300">
                Loading profile...
            </div>
        );

    return (
        <div className="relative flex justify-center min-h-[90.8vh] p-4 overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            {/* Background glow */}
            <div className="absolute top-0 left-0 w-60 h-60 bg-purple-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-400 rounded-full blur-3xl opacity-20 animate-pulse delay-200"></div>

            {/* Main Card */}
            <div className="relative w-full max-w-7xl backdrop-blur-xl bg-white/40 dark:bg-gray-800/40 border border-white/30 rounded-2xl shadow-2xl p-6 sm:p-10 animate-fadeIn">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent mb-6 p-2">
                    My Profile
                </h1>

                {/* Profile View */}
                {!editMode && !passwordMode && (
                    <div className="space-y-4 text-gray-800 dark:text-gray-200">
                        <p><strong>Name:</strong> {profile.name}</p>
                        <p><strong>Email:</strong> {profile.email}</p>
                        <div className="flex flex-wrap gap-4 pt-4">
                            <button
                                onClick={() => setEditMode(true)}
                                className="flex-1 min-w-[120px] py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-500 text-white shadow-lg hover:scale-105 hover:shadow-purple-500/50 transition-all"
                            >
                                Edit Profile
                            </button>
                            <button
                                onClick={() => setPasswordMode(true)}
                                className="flex-1 min-w-[120px] py-2.5 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg hover:scale-105 hover:shadow-yellow-500/50 transition-all"
                            >
                                Change Password
                            </button>
                        </div>
                    </div>
                )}

                {/* Edit Profile */}
                {editMode && (
                    <div className="space-y-4">
                        <input
                            className="border border-gray-300 dark:border-gray-600 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 bg-white/70 dark:bg-gray-700/70 dark:text-white"
                            type="text"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="Name"
                        />
                        <input
                            className="border border-gray-300 dark:border-gray-600 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 bg-white/70 dark:bg-gray-700/70 dark:text-white"
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            placeholder="Email"
                        />
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={handleProfileUpdate}
                                disabled={loading}
                                className="flex-1 min-w-[120px] py-2.5 rounded-xl bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg hover:scale-105 hover:shadow-green-500/50 transition-all"
                            >
                                {loading ? "Saving..." : "Save"}
                            </button>
                            <button
                                onClick={() => setEditMode(false)}
                                className="flex-1 min-w-[120px] py-2.5 rounded-xl bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-lg hover:scale-105 hover:shadow-gray-500/50 transition-all"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {/* Change Password */}
                {passwordMode && (
                    <div className="space-y-4">
                        <div className="relative">
                            <input
                                className="border border-gray-300 dark:border-gray-600 p-3 w-full rounded-lg pr-10 focus:ring-2 focus:ring-blue-500 bg-white/70 dark:bg-gray-700/70 dark:text-white"
                                type={showCurrent ? "text" : "password"}
                                value={passwordForm.currentPassword}
                                onChange={(e) =>
                                    setPasswordForm({
                                        ...passwordForm,
                                        currentPassword: e.target.value,
                                    })
                                }
                                placeholder="Current Password"
                            />
                            <span
                                className="absolute right-3 top-3 cursor-pointer text-gray-500 dark:text-white"
                                onClick={() => setShowCurrent(!showCurrent)}
                            >
                                {showCurrent ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>

                        <div className="relative">
                            <input
                                className="border border-gray-300 dark:border-gray-600 p-3 w-full rounded-lg pr-10 focus:ring-2 focus:ring-blue-500 bg-white/70 dark:bg-gray-700/70 dark:text-white"
                                type={showNew ? "text" : "password"}
                                value={passwordForm.newPassword}
                                onChange={(e) =>
                                    setPasswordForm({
                                        ...passwordForm,
                                        newPassword: e.target.value,
                                    })
                                }
                                placeholder="New Password"
                            />
                            <span
                                className="absolute right-3 top-3 cursor-pointer text-gray-500 dark:text-white"
                                onClick={() => setShowNew(!showNew)}
                            >
                                {showNew ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>

                        <div className="text-right">
                            <Link
                                to="/forgot-password"
                                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={handlePasswordChange}
                                disabled={loading}
                                className="flex-1 min-w-[140px] py-2.5 rounded-xl bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg hover:scale-105 hover:shadow-green-500/50 transition-all"
                            >
                                {loading ? "Updating..." : "Update Password"}
                            </button>
                            <button
                                onClick={() => setPasswordMode(false)}
                                className="flex-1 min-w-[140px] py-2.5 rounded-xl bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-lg hover:scale-105 hover:shadow-gray-500/50 transition-all"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>

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
