import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";

export default function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            await API.put(`/users/reset-password/${token}`, { newPassword });
            setMessage("Password reset successful. Redirecting to login...");
            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            setMessage(err.response?.data?.message || "Error resetting password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
            <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                    type="password"
                    className="border p-2 w-full rounded"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded w-full"
                    disabled={loading}
                >
                    {loading ? "Updating..." : "Reset Password"}
                </button>
            </form>
            {message && <p className="mt-3 text-green-600">{message}</p>}
        </div>
    );
}
