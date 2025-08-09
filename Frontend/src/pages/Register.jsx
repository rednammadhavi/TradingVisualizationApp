import { useState } from 'react';
import { register as registerUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        setLoading(true);
        try {
            const { data } = await registerUser(form);
            localStorage.setItem('token', data.data.token);
            navigate('/');
        } catch (error) {
            setErrorMsg(error.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 sm:p-8">
                <h1 className="text-2xl font-bold text-center mb-6">Create Account</h1>
                {errorMsg && <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">{errorMsg}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required className="border p-3 w-full rounded focus:ring-2 focus:ring-blue-500" />
                    <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required className="border p-3 w-full rounded focus:ring-2 focus:ring-blue-500" />
                    <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required className="border p-3 w-full rounded focus:ring-2 focus:ring-blue-500" />
                    <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition">{loading ? 'Registering...' : 'Register'}</button>
                </form>
            </div>
        </div>
    );
}
