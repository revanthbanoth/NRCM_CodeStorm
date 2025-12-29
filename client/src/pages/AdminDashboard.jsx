import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Lightbulb, Download, Search, ArrowLeft, Loader2, Database, Lock, User, Eye, EyeOff } from 'lucide-react';
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
    const API_BASE_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            setIsLoggedIn(true);
            fetchData(token);
        } else {
            setLoading(false);
        }
    }, []);

    const fetchData = async (token) => {
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
            console.error("Error fetching data:", error);
            if (error.response?.status === 401) {
                handleLogout();
                toast.error("Session expired. Please login again.");
            } else {
                toast.error("Failed to load dashboard data");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setAuthLoading(true);
        try {
            const { data } = await axios.post(`${API_BASE_URL}/api/auth/login`, loginData);
            if (data.isAdmin) {
                localStorage.setItem('adminToken', data.token);
                setIsLoggedIn(true);
                fetchData(data.token);
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

    // --- Login Screen ---
    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
                {/* Background Blobs */}
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] animate-blob"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md relative z-10"
                >
                    <div className="text-center mb-8">
                        <div className="inline-flex p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20 mb-4 group hover:scale-110 transition-transform duration-300">
                            <Lock className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors" />
                        </div>
                        <h1 className="text-4xl font-black text-white font-heading">Admin <span className="text-gradient">Gate</span></h1>
                        <p className="text-gray-500 mt-2">Enter credentials to access CodeStorm 2026 data.</p>
                    </div>

                    <div className="glass-card p-8 border-white/5 bg-white/[0.02]">
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-400 ml-1">Email Address</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                    <input
                                        type="email"
                                        required
                                        value={loginData.email}
                                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all text-white"
                                        placeholder="admin@example.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-400 ml-1">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={loginData.password}
                                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-12 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all text-white"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={authLoading}
                                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black rounded-xl shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {authLoading ? <Loader2 className="animate-spin" size={20} /> : "Unlock Dashboard"}
                            </button>
                        </form>
                    </div>

                    <Link to="/" className="flex items-center justify-center gap-2 text-gray-500 hover:text-gray-300 transition-colors mt-8 text-sm font-bold group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
                    </Link>
                </motion.div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center">
                <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
                <p className="text-gray-400 font-medium animate-pulse">Initializing Secure Admin Portal...</p>
            </div>
        );
    }

    // --- Main Dashboard ---
    return (
        <div className="min-h-screen bg-[#050505] text-white pt-24 pb-12 px-6">
            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4 group">
                            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Website
                        </Link>
                        <h1 className="text-4xl font-bold font-heading flex items-center gap-3 text-white">
                            <Database className="text-blue-500" /> Admin <span className="text-gradient">Control Center</span>
                        </h1>
                        <p className="text-gray-500 mt-2">Manage event registrations and project submissions for CodeStorm 2026.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                        <div className="flex bg-white/5 border border-white/10 p-1 rounded-xl backdrop-blur-md">
                            <button
                                onClick={() => setActiveTab('registrations')}
                                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${activeTab === 'registrations'
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <Users size={16} /> Registrations ({registrations.length})
                            </button>
                            <button
                                onClick={() => setActiveTab('ideas')}
                                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${activeTab === 'ideas'
                                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <Lightbulb size={16} /> Ideas ({ideas.length})
                            </button>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="px-5 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Stats Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="glass-card p-6 border-blue-500/20 group hover:border-blue-500/50 transition-colors">
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Total Registrations</p>
                        <h3 className="text-4xl font-black text-white group-hover:scale-105 transition-transform origin-left">{registrations.length}</h3>
                    </div>
                    <div className="glass-card p-6 border-purple-500/20 group hover:border-purple-500/50 transition-colors">
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Ideas Submitted</p>
                        <h3 className="text-4xl font-black text-white group-hover:scale-105 transition-transform origin-left">{ideas.length}</h3>
                    </div>
                    <div className="glass-card p-6 border-cyan-500/20 group hover:border-cyan-500/50 transition-colors">
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Est. Revenue</p>
                        <h3 className="text-4xl font-black text-white group-hover:scale-105 transition-transform origin-left">₹{registrations.length * 400}</h3>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder={`Search ${activeTab}...`}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all font-medium text-white shadow-inner"
                        />
                    </div>
                    <button onClick={() => fetchData(localStorage.getItem('adminToken'))} className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-gray-300 font-bold glass shadow-lg">
                        <Loader2 size={18} className={loading ? "animate-spin" : ""} /> Refresh Data
                    </button>
                </div>

                {/* Table Section */}
                <div className="glass-card overflow-hidden border-white/5 shadow-2xl">
                    <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                        <table className="w-full text-left">
                            <thead className="bg-white/5 border-b border-white/10">
                                {activeTab === 'registrations' ? (
                                    <tr>
                                        <th className="px-6 py-5 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Name</th>
                                        <th className="px-6 py-5 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Email & Mobile</th>
                                        <th className="px-6 py-5 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Team Name</th>
                                        <th className="px-6 py-5 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">College & Year</th>
                                        <th className="px-6 py-5 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Members List</th>
                                    </tr>
                                ) : (
                                    <tr>
                                        <th className="px-6 py-5 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Project Title</th>
                                        <th className="px-6 py-5 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Team</th>
                                        <th className="px-6 py-5 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Track / Theme</th>
                                        <th className="px-6 py-5 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Documents</th>
                                    </tr>
                                )}
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredData.length > 0 ? filteredData.map((item, idx) => (
                                    <tr key={idx} className="hover:bg-white/[0.04] transition-all group">
                                        {activeTab === 'registrations' ? (
                                            <>
                                                <td className="px-6 py-5 font-bold text-blue-100">{item.name}</td>
                                                <td className="px-6 py-5">
                                                    <div className="text-gray-100 text-sm">{item.email}</div>
                                                    <div className="text-xs text-blue-400 font-mono mt-0.5">{item.mobile}</div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-[10px] font-black uppercase tracking-wider border border-blue-500/20">
                                                        {item.teamName || 'Solo'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="text-gray-300 text-sm font-medium">{item.college}</div>
                                                    <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">{item.branch} • {item.year} Year</div>
                                                </td>
                                                <td className="px-6 py-5 max-w-xs">
                                                    <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed italic">"{item.teamMembers}"</p>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td className="px-6 py-5">
                                                    <div className="font-bold text-white group-hover:text-purple-400 transition-colors">{item.projectTitle}</div>
                                                    <div className="text-[10px] text-gray-500 mt-1 uppercase tracking-tighter">Stack: {item.techStack}</div>
                                                </td>
                                                <td className="px-6 py-5 font-bold text-gray-300">{item.teamName}</td>
                                                <td className="px-6 py-5">
                                                    <span className="px-2.5 py-1 bg-purple-500/10 text-purple-400 rounded-lg text-[10px] font-black uppercase tracking-widest border border-purple-500/20">
                                                        {item.theme}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5">
                                                    {item.pptPath ? (
                                                        <button
                                                            onClick={() => handleDownloadPPT(item.pptPath)}
                                                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 hover:from-blue-600/40 hover:to-indigo-600/40 text-blue-400 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all border border-blue-500/30 group-hover:scale-105"
                                                        >
                                                            <Download size={14} /> View PPT
                                                        </button>
                                                    ) : (
                                                        <span className="text-gray-700 text-[10px] font-black uppercase tracking-[0.2em]">Pending</span>
                                                    )}
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-20 text-center">
                                            <div className="flex flex-col items-center gap-4 text-gray-600">
                                                <Database size={40} className="opacity-20" />
                                                <span className="text-sm font-bold tracking-widest uppercase opacity-40">No entries detected in sector {activeTab}</span>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
