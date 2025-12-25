import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, School, BookOpen, Clock, Users, Send } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        college: '',
        branch: '',
        year: '',
        teamName: '',
        teamMembers: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const res = await axios.post(`${apiUrl}/api/events/register`, formData);
            toast.success('Registration Successful! 🎉 See you at CodeStorm!');
            setFormData({
                name: '', email: '', mobile: '', college: '', branch: '', year: '', teamName: '', teamMembers: ''
            });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="glass-card p-8 md:p-12 relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 p-3 opacity-10">
                    <Users size={120} />
                </div>

                <div className="text-center mb-10 relative z-10">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-gradient mb-2">Event Registration</h2>
                    <p className="text-gray-400">Join the ultimate coding battle. Fill in your details below.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputGroup icon={<User size={18} />} name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
                        <InputGroup icon={<Mail size={18} />} type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
                        <InputGroup icon={<Phone size={18} />} name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} required />
                        <InputGroup icon={<School size={18} />} name="college" placeholder="College Name" value={formData.college} onChange={handleChange} required />
                        <InputGroup icon={<BookOpen size={18} />} name="branch" placeholder="Branch" value={formData.branch} onChange={handleChange} required />
                        <InputGroup icon={<Clock size={18} />} name="year" placeholder="Year (e.g., 3rd Year)" value={formData.year} onChange={handleChange} required />
                    </div>

                    <div className="border-t border-gray-700/50 pt-6 mt-6">
                        <h3 className="text-xl font-semibold mb-4 text-gray-200 flex items-center gap-2"><Users size={20} className="text-blue-400" /> Team Details <span className="text-sm font-normal text-gray-500">(Optional)</span></h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputGroup icon={<Users size={18} />} name="teamName" placeholder="Team Name" value={formData.teamName} onChange={handleChange} />
                            <InputGroup icon={<Users size={18} />} name="teamMembers" placeholder="Team Members (Names separated by comma)" value={formData.teamMembers} onChange={handleChange} />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full btn-primary flex items-center justify-center gap-2 mt-8 text-lg ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Processing...' : <><Send size={20} /> Complete Registration</>}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

const InputGroup = ({ icon, type = "text", ...props }) => (
    <div className="relative group">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-400 transition-colors pointer-events-none">
            {icon}
        </div>
        <input
            type={type}
            className="w-full bg-gray-900/50 border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium"
            {...props}
        />
    </div>
);

export default Register;
