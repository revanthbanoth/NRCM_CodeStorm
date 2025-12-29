import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users, Lightbulb, Download, Search, ArrowLeft,
  Loader2, Database, Lock, User, Eye, EyeOff
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
        axios.get(`${API_BASE_URL}/api/events/registrations`, config),
        axios.get(`${API_BASE_URL}/api/events/ideas`, config)
      ]);

      setRegistrations(regRes.data);
      setIdeas(ideaRes.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

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

  const handleDownloadPPT = (path) => {
    if (!path) return;
    window.open(`${API_BASE_URL}/${path}`, '_blank');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <form onSubmit={handleLogin} className="w-full max-w-md p-8 glass-card">
          <h2 className="text-3xl font-bold mb-6 text-center">Admin Login</h2>

          <input
            type="email"
            placeholder="Admin Email"
            className="input"
            value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            required
          />

          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="input mt-4"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            required
          />

          <button
            type="submit"
            disabled={authLoading}
            className="btn-primary w-full mt-6"
          >
            {authLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-500" size={40} />
      </div>
    );
  }

  const filteredData =
    activeTab === 'registrations'
      ? registrations.filter(r =>
          r.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : ideas.filter(i =>
          i.projectTitle.toLowerCase().includes(searchTerm.toLowerCase())
        );

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-6">Admin Control Center</h1>

      <button onClick={handleLogout} className="btn-danger mb-6">
        Logout
      </button>

      <input
        type="text"
        placeholder="Search..."
        className="input mb-6"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {activeTab === 'registrations' ? (
        registrations.map((r, i) => (
          <div key={i} className="card mb-3">
            {r.name} — {r.email}
          </div>
        ))
      ) : (
        ideas.map((i, idx) => (
          <div key={idx} className="card mb-3">
            {i.projectTitle}
            {i.pptPath && (
              <button
                onClick={() => handleDownloadPPT(i.pptPath)}
                className="btn-secondary ml-4"
              >
                View PPT
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default AdminDashboard;
