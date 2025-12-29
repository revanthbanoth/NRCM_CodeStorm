import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Lightbulb, Download, Search, ArrowLeft, Loader2, Database, Lock, User, Eye, EyeOff } from 'lucide-react';
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

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            setIsLoggedIn(true);
            fetchData(token, true);
        } else {
            setLoading(false);
        }
    }, []);

    // ✅ FIXED FETCH WITH AUTO-RETRY (ONLY LOGIC CHANGE)
    const fetchData = async (token, retry) => {
        setLoading(true);
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
        } catch (error) {
            console.error("Fetch error:", error);

            if (retry) {
                toast.info("Server waking up… retrying in 5 seconds");
                setTimeout(() => fetchData(token, false), 5000);
            } else {
                toast.error("Failed to load admin data");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setAuthLoading(true);
        try {
            const { data } = await axios.post(`${apiUrl}/api/auth/login`, loginData);
            if (data.isAdmin) {
                localStorage.setItem('adminToken', data.token);
                setIsLoggedIn(true);
                fetchData(data.token, true);
                toast.success("Welcome back, Admin!");
            } else {
                toast.error("Access denied: Not an administrator");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Invalid credentials");
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

    const filteredData = activeTab === 'registrations'
        ? registrations.filter(r =>
            r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.teamName?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : ideas.filter(i =>
            i.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            i.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            i.theme.toLowerCase().includes(searchTerm.toLowerCase())
        );

    const handleDownloadPPT = (path) => {
        if (!path) return;
        window.open(`${apiUrl}/${path}`, '_blank');
    };

    // ---------------- LOGIN SCREEN ----------------
    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
                    <div className="glass-card p-8">
                        <form onSubmit={handleLogin} className="space-y-6">
                            <input type="email" required placeholder="admin@example.com"
                                value={loginData.email}
                                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                className="w-full p-3 bg-black text-white rounded"
                            />
                            <input type={showPassword ? "text" : "password"} required placeholder="••••••••"
                                value={loginData.password}
                                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                className="w-full p-3 bg-black text-white rounded"
                            />
                            <button type="submit" disabled={authLoading}
                                className="w-full py-3 bg-blue-600 text-white rounded">
                                {authLoading ? "Logging in..." : "Unlock Dashboard"}
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <Loader2 className="animate-spin text-blue-500" size={40} />
            </div>
        );
    }

    // ---------------- DASHBOARD ----------------
    return (
        <div className="min-h-screen bg-[#050505] text-white p-10">
            <button onClick={handleLogout} className="bg-red-600 px-4 py-2 rounded mb-6">Logout</button>

            <pre className="text-green-400 text-sm">
                {JSON.stringify(activeTab === 'registrations' ? registrations : ideas, null, 2)}
            </pre>
        </div>
    );
};

export default AdminDashboard;
