import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    Lightbulb,
    Download,
    Search,
    ArrowLeft,
    Loader2,
    Database,
    Lock,
    User,
    Eye,
    EyeOff
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
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

    // ✅ SINGLE SOURCE OF TRUTH (IMPORTANT)
    const API_BASE_URL =
        import.meta.env.VITE_API_URL || 'https://nrcm-codestorm.onrender.com';

    const navigate = useNavigate();

    // =========================
    // AUTO LOGIN CHECK
    // =========================
    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            setIsLoggedIn(true);
            fetchData(token);
        } else {
            setLoading(false);
        }
    }, []);

    // =========================
    // FETCH DASHBOARD DATA
    // =========================
    const fetchData = async (token) => {
        setLoading(true);
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const [regRes, ideaRes] = await Promise.all([
                axios.get(`${API_BASE_URL}/api/events/registrations`, config),
                axios.get(`${API_BASE_URL}/api/events/ideas`, config),
            ]);

            setRegistrations(regRes.data);
            setIdeas(ideaRes.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            if (error.response?.status === 401) {
                handleLogout();
                toast.error('Session expired. Please login again.');
            } else {
                toast.error('Failed to load dashboard data');
            }
        } finally {
            setLoading(false);
        }
    };

    // =========================
    // ADMIN LOGIN
    // =========================
    const handleLogin = async (e) => {
        e.preventDefault();
        setAuthLoading(true);
        try {
            const { data } = await axios.post(
                `${API_BASE_URL}/api/auth/login`,
                loginData
            );

            if (data.isAdmin) {
                localStorage.setItem('adminToken', data.token);
                setIsLoggedIn(true);
                fetchData(data.token);
                toast.success('Welcome back, Admin!');
            } else {
                toast.error('Access denied: Not an administrator');
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || 'Invalid credentials'
            );
        } finally {
            setAuthLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        setIsLoggedIn(false);
        setRegistrations([]);
        setIdeas([]);
        setLoading(false);
    };

    const filteredData =
        activeTab === 'registrations'
            ? registrations.filter(
                  (r) =>
                      r.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      r.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      r.teamName?.toLowerCase().includes(searchTerm.toLowerCase())
              )
            : ideas.filter(
                  (i) =>
                      i.projectTitle
                          ?.toLowerCase()
                          .includes(searchTerm.toLowerCase()) ||
                      i.teamName
                          ?.toLowerCase()
                          .includes(searchTerm.toLowerCase()) ||
                      i.theme?.toLowerCase().includes(searchTerm.toLowerCase())
              );

    // =========================
    // DOWNLOAD PPT
    // =========================
    const handleDownloadPPT = (path) => {
        if (!path) return;
        window.open(`${API_BASE_URL}/${path}`, '_blank');
    };

    // =========================
    // LOGIN SCREEN
    // =========================
    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md"
                >
                    <div className="text-center mb-8">
                        <div className="inline-flex p-4 bg-blue-500/10 rounded-2xl mb-4">
                            <Lock className="w-8 h-8 text-blue-400" />
                        </div>
                        <h1 className="text-4xl font-black text-white">
                            Admin <span className="text-gradient">Gate</span>
                        </h1>
                        <p className="text-gray-500 mt-2">
                            Enter credentials to access CodeStorm 2026 data.
                        </p>
                    </div>

                    <div className="glass-card p-8">
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div>
                                <label className="text-sm text-gray-400">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={loginData.email}
                                    onChange={(e) =>
                                        setLoginData({
                                            ...loginData,
                                            email: e.target.value,
                                        })
                                    }
                                    className="w-full mt-2 bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-400">
                                    Password
                                </label>
                                <div className="relative mt-2">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={loginData.password}
                                        onChange={(e) =>
                                            setLoginData({
                                                ...loginData,
                                                password: e.target.value,
                                            })
                                        }
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                                    >
                                        {showPassword ? (
                                            <EyeOff size={18} />
                                        ) : (
                                            <Eye size={18} />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={authLoading}
                                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold"
                            >
                                {authLoading ? (
                                    <Loader2 className="animate-spin mx-auto" />
                                ) : (
                                    'Unlock Dashboard'
                                )}
                            </button>
                        </form>
                    </div>

                    <Link
                        to="/"
                        className="flex justify-center mt-6 text-gray-500 hover:text-white"
                    >
                        <ArrowLeft size={16} /> Back to Home
                    </Link>
                </motion.div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
            </div>
        );
    }

    // =========================
    // MAIN DASHBOARD
    // =========================
    return (
        <div className="min-h-screen bg-[#050505] text-white pt-24 px-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold mb-6">
                    Admin Control Center
                </h1>

                <div className="flex gap-4 mb-6">
                    <button
                        onClick={() => setActiveTab('registrations')}
                        className={`px-4 py-2 rounded ${
                            activeTab === 'registrations'
                                ? 'bg-blue-600'
                                : 'bg-white/10'
                        }`}
                    >
                        Registrations ({registrations.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('ideas')}
                        className={`px-4 py-2 rounded ${
                            activeTab === 'ideas'
                                ? 'bg-purple-600'
                                : 'bg-white/10'
                        }`}
                    >
                        Ideas ({ideas.length})
                    </button>
                    <button
                        onClick={handleLogout}
                        className="ml-auto bg-red-500/20 px-4 py-2 rounded"
                    >
                        Logout
                    </button>
                </div>

                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full mb-6 bg-white/5 border border-white/10 rounded-xl py-3 px-4"
                />

                <div className="glass-card p-6">
                    {filteredData.length === 0 ? (
                        <p className="text-gray-500 text-center">
                            No data available
                        </p>
                    ) : (
                        <pre className="text-xs overflow-x-auto">
                            {JSON.stringify(filteredData, null, 2)}
                        </pre>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
