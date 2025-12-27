import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Code, FileText, Layers, Lightbulb, Users, Mail, Link as LinkIcon, Download } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const IdeaSubmission = () => {
    const [formData, setFormData] = useState({
        teamName: '',
        leaderEmail: '',
        projectTitle: '',
        theme: '',
        problemStatement: '',
        solutionDescription: '',
        techStack: '',
        pptFile: null
    });
    const [loading, setLoading] = useState(false);

    const themes = [
        'FinTech', 'HealthTech', 'EdTech', 'AgriTech', 'Smart Cities', 'Web3 / Blockchain', 'AI / ML', 'Open Innovation'
    ];

    const handleChange = (e) => {
        if (e.target.type === 'file') {
            setFormData({ ...formData, [e.target.name]: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

            const submissionData = new FormData();
            Object.keys(formData).forEach(key => {
                submissionData.append(key, formData[key]);
            });

            const res = await axios.post(`${apiUrl}/api/events/idea`, submissionData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            toast.success('Idea Submitted Successfully! 🚀');
            setFormData({
                teamName: '', leaderEmail: '', projectTitle: '', theme: '', problemStatement: '', solutionDescription: '', techStack: '', pptFile: null
            });

            // Reset file input manually if needed
            document.getElementById('pptFile').value = '';

        } catch (error) {
            toast.error(error.response?.data?.message || 'Submission failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="glass-card p-8 md:p-12 relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 p-3 opacity-10">
                    <Lightbulb size={120} />
                </div>

                <div className="text-center mb-10 relative z-10">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-gradient mb-2">Submit Your Idea</h2>
                    <p className="text-gray-400">Share your innovation with us. Make sure it aligns with the themes.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputGroup icon={<Users size={18} />} name="teamName" placeholder="Team Name" value={formData.teamName} onChange={handleChange} required />
                        <InputGroup icon={<Mail size={18} />} type="email" name="leaderEmail" placeholder="Team Leader Email" value={formData.leaderEmail} onChange={handleChange} required />
                    </div>

                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-gray-300">Project Details</label>
                        <InputGroup icon={<FileText size={18} />} name="projectTitle" placeholder="Project Title" value={formData.projectTitle} onChange={handleChange} required />

                        <div className="relative group">
                            <div className="absolute left-3 top-3 text-gray-400">
                                <Layers size={18} />
                            </div>
                            <select
                                name="theme"
                                value={formData.theme}
                                onChange={handleChange}
                                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer"
                                required
                            >
                                <option value="" disabled>Select a Theme</option>
                                {themes.map(t => <option key={t} value={t} className="bg-gray-900">{t}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <TextAreaGroup name="problemStatement" placeholder="Problem Statement (Max 500 chars)" value={formData.problemStatement} onChange={handleChange} required rows={3} />
                        <TextAreaGroup name="solutionDescription" placeholder="Proposed Solution (Max 1000 chars)" value={formData.solutionDescription} onChange={handleChange} required rows={5} />
                        <InputGroup icon={<Code size={18} />} name="techStack" placeholder="Tech Stack (e.g., MERN, Python, Flutter)" value={formData.techStack} onChange={handleChange} required />
                    </div>

                    {/* PPT Section */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between px-1">
                            <label className="text-sm font-medium text-gray-300">Upload PPT Report</label>
                            <a
                                href="#"
                                className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
                            >
                                <Download size={14} /> Download Template
                            </a>
                        </div>
                        <div className="relative group">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                <LinkIcon size={18} />
                            </div>
                            <input
                                id="pptFile"
                                type="file"
                                name="pptFile"
                                accept=".ppt,.pptx,.pdf"
                                onChange={handleChange}
                                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
                                required
                            />
                        </div>
                        <p className="text-xs text-gray-500 px-1">
                            *Upload your idea presentation (PPT/PDF). Max size 5MB.
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full btn-primary flex items-center justify-center gap-2 mt-8 text-lg ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Submitting...' : <><Send size={20} /> Submit Idea</>}
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

const TextAreaGroup = ({ placeholder, ...props }) => (
    <textarea
        className="w-full bg-gray-900/50 border border-gray-700 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium resize-none"
        placeholder={placeholder}
        {...props}
    />
);

export default IdeaSubmission;
