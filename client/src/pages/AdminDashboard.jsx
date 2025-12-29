import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users, Lightbulb, Download, Search,
  ArrowLeft, Loader2, Database, Lock,
  User, Eye, EyeOff
} from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [registrations, setRegistrations] = useState([]);
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('registrations');
  const [searchTerm, setSearchTerm] = useState('');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  // 🔒 Restore session safely
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      setLoading(false);
      return;
    }

    setIsLoggedIn(true);
    fetchData(token, true);
  }, []);

  // 🔁 Retry-safe fetch (handles Render cold start)
  const fetchData = async (token, silent = false) => {
    if (!silent) setLoading(true);

    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      const [regRes, ideaRes] = await Promise.all([
        axios.get(`${apiUrl}/api/events/registrations`, config),
        axios.get(`${apiUrl}/api/events/ideas`, config)
      ]);

      setRegistrations(regRes.data);
      setIdeas(ideaRes.data);
    } catch (err) {
      console.error(err);
      toast.error('Server waking up… retrying');

      // ⏳ retry after 3s
      setTimeout(() => {
        fetchData(token, true);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  // 🔑 Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthLoading(true);

    try {
      const { data } = await axios.post(`${apiUrl}/api/auth/login`, loginData);

      if (!data.isAdmin) {
        toast.error('Not an admin');
        return;
      }

      localStorage.setItem('adminToken', data.token);
      setIsLoggedIn(true);
      toast.success('Welcome back, Admin!');
      fetchData(data.token);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
    setRegistrations([]);
    setIdeas([]);
  };

  // 🔐 LOGIN SCREEN (UNCHANGED)
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-8 w-full max-w-md">
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="admin@codestorm.com"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              className="w-full p-3 rounded bg-white/10 text-white"
              required
            />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              className="w-full p-3 rounded bg-white/10 text-white"
              required
            />
            <button className="w-full bg-blue-600 py-3 rounded font-bold">
              {authLoading ? 'Checking…' : 'Unlock Dashboard'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // ⏳ LOADING SCREEN
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="animate-spin text-blue-500" size={48} />
      </div>
    );
  }

  // 📊 DASHBOARD
  return (
    <div className="min-h-screen bg-[#050505] text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* LOGOUT — bottom-right */}
      <button
        onClick={handleLogout}
        className="fixed bottom-6 right-6 bg-red-600 px-6 py-3 rounded-xl font-bold shadow-lg"
      >
        Logout
      </button>

      <div className="mt-10">
        {activeTab === 'registrations' && registrations.length === 0 && (
          <p className="text-gray-400">No registrations yet</p>
        )}

        {activeTab === 'ideas' && ideas.length === 0 && (
          <p className="text-gray-400">No ideas submitted</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
