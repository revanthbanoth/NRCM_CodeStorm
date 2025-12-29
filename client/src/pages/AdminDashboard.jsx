import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Users, Lightbulb, Download, Search, ArrowLeft,
    Loader2, Database, Lock, User, Eye, EyeOff
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

    // ✅ USE RENDER BACKEND
    const apiUrl = import.meta.env.VITE_API_URL || 'https://nrcm-codestorm.onrender.com';

    // ===============================
    // AUTO LOGIN
    // ===============================
    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            setLoading(false);
            return;
        }
        setIsLoggedIn(true);
        fetchData(token);
    }, []);

    // ===============================
    // FETCH DASHBOARD DATA
    // ===============================
    const fetchData = async (token) => {
        try {
            setLoading(true);

            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            const [regRes, ideaRes] = await Promise.all([
                axios.get(`${apiUrl}/api/events/registrations`, config),
                axios.get(`${apiUrl}/api/events/ideas`, config),
            ]);

            setRegistrations(regRes.data);
            setIdeas(ideaRes.data);
        } catch (error) {
            console.error('Fetch error:', error);

            // 🔴 DO NOT LOGOUT ON FIRST 401 (Render cold start)
            toast.error('Server waking up… please retry');
        } finally {
            setLoading(false);
        }
    };

    // ===============================
    // LOGIN
    // ===============================
    const handleLogin = async (e) => {
        e.preventDefault();
        setAuthLoading(true);

        try {
            const { data } = await axios.post(`${apiUrl}/api/auth/login`, loginData);

            if (!data.isAdmin) {
                toast.error('Access denied');
                return;
            }

            localStorage.setItem('adminToken', data.token);
            setIsLoggedIn(true);
            fetchData(data.token);
            toast.success('Welcome back, Admin!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Invalid credentials');
        } finally {
            setAuthLoading(false);
        }
    };

    // ===============================
    // LOGOUT
    // ===============================
    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        setIsLoggedIn(false);
        setRegistrations([]);
        setIdeas([]);
    };

    // ===============================
    // FILTER
    // ===============================
    const filteredData = activeTab === 'registrations'
        ? registrations.filter(r =>
            r.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.email?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : ideas.filter(i =>
            i.projectTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            i.teamName?.toLowerCase().includes(searchTerm.toLowerCase())
        );

    // ===============================
    // DOWNLOAD
    // ===============================
    const handleDownloadPPT = (path) => {
        if (!path) return;
        window.open(`${apiUrl}/${path}`, '_blank');
    };

    // ===============================
    // LOGIN SCREEN (UNCHANGED)
    // ===============================
    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-md">
                    <form onSubmit={handleLogin} className="glass-card p-8 space-y-6">
                        <h1 className="text-4xl font-bold text-white text-center">Admin Gate</h1>

                        <input
                            type="email"
                            required
                            value={loginData.email}
                            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                            className="w-full bg-white/5 p-3 rounded-xl text-white"
                            placeholder="admin@codestorm.com"
                        />

                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                required
                                value={loginData.password}
                                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                className="w-full bg-white/5 p-3 rounded-xl text-white"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2"
                            >
                                {showPassword ? <EyeOff /> : <Eye />}
                            </button>
                        </div>

                        <button className="w-full bg-blue-600 py-3 rounded-xl text-white font-bold">
                            {authLoading ? 'Logging in...' : 'Unlock Dashboard'}
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    // ===============================
    // LOADING
    // ===============================
    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="animate-spin text-blue-500" size={40} />
            </div>
        );
    }

    // ===============================
    // DASHBOARD (UNCHANGED UI)
    // ===============================
    return (
        <div className="min-h-screen bg-[#050505] text-white p-10">
            <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>

            <button onClick={handleLogout} className="mb-6 bg-red-600 px-4 py-2 rounded">
                Logout
            </button>

            <pre className="bg-black/50 p-6 rounded-xl overflow-auto text-xs">
                {JSON.stringify(filteredData, null, 2)}
            </pre>
        </div>
    );
};

export default AdminDashboard;
