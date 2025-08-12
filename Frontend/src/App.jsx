import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

import Home from './pages/Home';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Watchlist from './pages/Watchlist';
import Market from './pages/Market';
import CryptoProfile from './pages/CryptoProfile';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* User profile */}
        <Route path="/profile" element={<Profile />} />

        {/* Main app routes */}
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/market" element={<Market />} />

        {/* Dynamic crypto details */}
        <Route path="/crypto/:id" element={<CryptoProfile />} />
      </Routes>

      {/* Toast notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}
