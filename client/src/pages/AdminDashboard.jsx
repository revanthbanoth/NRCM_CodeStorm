import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Loader2,
    Lock,
    Eye,
    EyeOff,
    ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
    const [registrations, setRegistrations] = useState([]);
    const [ideas, setIdeas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [authLoading, setAuthLoading] = useState(false);

    // ✅ SINGLE SOURCE OF TRUTH
    const API_BASE_URL =
        import.meta.env.VITE_API_URL || 'https://nrcm-codestorm.onrender.com';

    // =========================
    // AUTO LOGIN CHECK
    // =========================
    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            setIsLoggedIn(true);
            fetchData(token);
        }
    }, []);

    // =========================
    // FETCH DASHBOARD DATA
    // =========================
    const fetchData = async (token) => {
        try {
            setLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const [regRes, ideaRes] = await Promise.all([
                axios.get(`${API_BASE_URL}/api/events/registrations`, config),
                axios.get(`${API_BASE_URL}/api/events/ideas`, config),
            ]);

            setRegistrations(regRes.data || []);
            setIdeas(ideaRes.data || []);
        } catch (error) {
            console.error(error);
            toast.error('Session expired. Please login again.');
            handleLogout();
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
            const res = await axios.post(
                `${API_BASE_URL}/api/auth/login`,
                loginData
            );

            if (!res.data?.token || !res.data?.isAdmin) {
                toast.error('Not an admin account');
                return;
            }

            localStorage.setItem('adminToken', res.data.token);
            setIsLoggedIn(true);
            fetchData(res.data.token);
            toast.success('Welcome back, Admin!');
        } catch (error) {
            toast.error('Invalid admin credentials');
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

    // =========================
    // LOGIN SCREEN
    // =========================
    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md"
                >
                    <div className="text-center mb-8">
                        <Lock className="w-10 h-10 text-blue-400 mx-auto mb-4" />
                        <h1 className="text-3xl font-bold text-white">
                            Admin Gate
                        </h1>
                    </div>

                    <form
                        onSubmit={handleLogin}
                        className="bg-white/5 p-6 rounded-xl space-y-4"
                    >
                        <input
                            type="email"
                            placeholder="Admin Email"
                            required
                            value={loginData.email}
                            onChange={(e) =>
                                setLoginData({
                                    ...loginData,
                                    email: e.target.value,
                                })
                            }
                            className="w-full p-3 rounded bg-black text-white"
                        />

                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                required
                                value={loginData.password}
                                onChange={(e) =>
                                    setLoginData({
                                        ...loginData,
                                        password: e.target.value,
                                    })
                                }
                                className="w-full p-3 rounded bg-black text-white"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3 text-gray-400"
                            >
                                {showPassword ? <EyeOff /> : <Eye />}
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={authLoading}
                            className="w-full bg-blue-600 py-3 rounded text-white font-bold"
                        >
                            {authLoading ? (
                                <Loader2 className="animate-spin mx-auto" />
                            ) : (
                                'Unlock Dashboard'
                            )}
                        </button>
                    </form>

                    <Link
                        to="/"
                        className="flex items-center justify-center gap-2 mt-6 text-gray-400"
                    >
                        <ArrowLeft size={16} /> Back to Home
                    </Link>
                </motion.div>
            </div>
        );
    }

    // =========================
    // DASHBOARD
    // =========================
    return (
        <div className="min-h-screen bg-black text-white p-6">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

            {loading ? (
                <Loader2 className="animate-spin" />
            ) : (
                <pre className="text-xs bg-white/5 p-4 rounded overflow-auto">
{JSON.stringify({ registrations, ideas }, null, 2)}
                </pre>
            )}

            <button
                onClick={handleLogout}
                className="mt-6 bg-red-600 px-4 py-2 rounded"
            >
                Logout
            </button>
        </div>
    );
};

export default AdminDashboard;
