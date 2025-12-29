import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowRight, Users, Trophy, Phone, Clock, FileText, LayoutGrid } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Sections (Imported as components)
import EventSchedule from './EventSchedule';
import ProgramPlan from './ProgramPlan';
import Process from './Process';
import Themes from './Themes';

// --- Sub-components (Defined before usage to avoid hoisting issues) ---

const PremiumHeroButton = ({ icon, text, color, glowColor, isAnimated = false, onClick }) => {
    return (
        <button onClick={onClick} className="text-left focus:outline-none group/btn">
            <motion.div
                whileHover={{
                    rotateY: 10,
                    rotateX: -5,
                    scale: 1.05,
                    z: 30
                }}
                animate={isAnimated ? {
                    y: [0, -8, 0],
                } : {}}
                transition={{
                    y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                    duration: 0.3,
                    ease: "easeOut"
                }}
                className="relative perspective-1000"
            >
                {/* Outer Glow Layer */}
                <div className={`absolute -inset-1 ${glowColor} rounded-xl blur-lg opacity-20 group-hover/btn:opacity-50 transition-opacity duration-300`}></div>

                {/* 3D Container */}
                <div className="relative w-56 h-16 transform-style-3d">
                    {/* Shadow Layer */}
                    <div className="absolute inset-1 bg-black/40 rounded-lg blur-sm transform translate-z-[-10px]"></div>

                    {/* Main Body */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${color} rounded-xl border border-white/20 backdrop-blur-xl shadow-xl flex items-center px-4 gap-3 overflow-hidden group-hover/btn:border-white/40 transition-colors duration-300`}>

                        {/* Dynamic Light Reflection */}
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none"></div>

                        {/* Animated Shine Sweep */}
                        <div className="absolute -inset-x-full top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12 group-hover/btn:animate-shine pointer-events-none"></div>

                        {/* Icon Container with Dual Rings */}
                        <div className="relative flex-shrink-0">
                            <div className="absolute -inset-2 border border-white/10 rounded-full animate-spin-slow"></div>
                            <div className="relative z-10 w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-md border border-white/20 group-hover/btn:scale-105 transition-transform duration-300 shadow-inner">
                                {icon}
                            </div>
                        </div>

                        {/* Text */}
                        <div className="flex flex-col min-w-0">
                            <span className="font-heading font-black text-white text-sm tracking-tight leading-tight group-hover/btn:tracking-normal transition-all duration-300 drop-shadow-md truncate">
                                {text.split(' ')[0]}
                            </span>
                            <span className="font-heading font-medium text-white/70 text-[10px] tracking-widest uppercase opacity-80 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap overflow-hidden">
                                {text.split(' ').slice(1).join(' ')}
                            </span>
                        </div>

                        {/* Interactive Corner Accent */}
                        <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-white/20 rounded-br group-hover/btn:border-white/40 transition-colors"></div>
                    </div>
                </div>
            </motion.div>
        </button>
    );
};

const CommitteeCard = ({ title, names }) => (
    <div className="group">
        <h3 className="text-xl font-bold text-blue-400 mb-4 uppercase tracking-wider border-l-4 border-blue-500 pl-3 group-hover:border-blue-400 transition-colors">{title}</h3>
        <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-blue-500/30 transition-all">
            <ul className="space-y-2">
                {names.map((name, i) => (
                    <li key={i} className="text-gray-300 text-sm font-medium flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                        {name}
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

const CoordinatorCard = ({ name, phone }) => (
    <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex items-center justify-between hover:bg-white/10 transition-colors">
        <div>
            <h4 className="font-bold text-white text-sm">{name}</h4>
        </div>
        <div className="flex items-center gap-2 text-blue-400 font-mono text-sm bg-blue-500/10 px-2 py-1 rounded">
            <Phone size={14} /> {phone}
        </div>
    </div>
);

// --- Main Home Component ---

const Home = () => {
    const [count, setCount] = useState(null);

    const scrollToSection = (id) => {
        const element = document.getElementById(id.replace('#', ''));
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        // Handle initial hash if present
        if (window.location.hash) {
            const hash = window.location.hash;
            setTimeout(() => {
                scrollToSection(hash);
            }, 800);
        }

        const fetchCount = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                const { data } = await axios.get(`${apiUrl}/api/events/count`);
                setCount(data.count);
            } catch (error) {
                console.error("Error fetching participant count:", error);
                setCount(0);
            }
        };

        fetchCount();
        const interval = setInterval(fetchCount, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative overflow-hidden" id="home">
            {/* Background Blobs - Fixed and low z-index */}
            <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] animate-blob"></div>
                <div className="absolute top-[30%] right-[-10%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-[20%] left-[-5%] w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[120px] animate-blob animation-delay-4000"></div>
                <div className="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] animate-blob"></div>
            </div>

            {/* Hero Section */}
            <section className="relative pt-32 pb-12 lg:pt-40 lg:pb-12 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block px-4 py-2 mb-6 text-sm font-semibold tracking-wider text-blue-400 uppercase bg-blue-500/10 rounded-full border border-blue-500/20 backdrop-blur-sm">
                            The Ultimate 36 Hours Hackathon Challenge
                        </span>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-2 leading-tight">
                            CODE<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">STORM</span> <span className="text-white">2026</span>
                        </h1>
                        <p className="text-xl text-blue-300 font-semibold mb-6">
                            Feb 26-27, 2026 | Time: 10:00 AM (Feb 26) - 4:00 PM (Feb 27)
                        </p>

                        <div className="flex flex-wrap justify-center gap-8 mb-16 px-4">
                            <PremiumHeroButton
                                onClick={() => scrollToSection('#event-schedule')}
                                icon={<Calendar className="w-6 h-6 text-white" />}
                                text="EVENT SCHEDULE"
                                color="from-rose-600 via-pink-600 to-rose-700"
                                glowColor="bg-rose-500"
                            />
                            <PremiumHeroButton
                                onClick={() => scrollToSection('#program-plan')}
                                icon={<Clock className="w-6 h-6 text-white" />}
                                text="PROGRAM PLAN"
                                color="from-blue-600 via-cyan-600 to-blue-700"
                                glowColor="bg-cyan-500"
                                isAnimated
                            />
                            <PremiumHeroButton
                                onClick={() => scrollToSection('#themes')}
                                icon={<LayoutGrid className="w-6 h-6 text-white" />}
                                text="HACKATHON THEMES"
                                color="from-violet-600 via-purple-600 to-violet-700"
                                glowColor="bg-purple-500"
                            />
                            <PremiumHeroButton
                                onClick={() => scrollToSection('#process')}
                                icon={<FileText className="w-6 h-6 text-white" />}
                                text="OUR PROCESS"
                                color="from-amber-500 via-orange-600 to-amber-700"
                                glowColor="bg-orange-500"
                            />
                        </div>

                        <div className="max-w-4xl mx-auto mb-16">
                            <h2 className="text-3xl font-bold text-white mb-4 uppercase tracking-tight">Welcome to CodeStorm 2026</h2>
                            <p className="text-lg text-gray-400 leading-relaxed">
                                Join us in the ultimate 36-hour hackathon where innovators, developers, and engineers come together to solve real-world problems through cutting-edge technology.
                            </p>
                        </div>

                        {/* Prizes Section */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="bg-gradient-to-r from-yellow-500/10 via-amber-500/10 to-yellow-500/10 border border-yellow-500/30 rounded-2xl p-8 max-w-5xl mx-auto mb-12 relative overflow-hidden group"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
                            <div className="flex flex-col items-center justify-center">
                                <Trophy className="w-16 h-16 text-yellow-400 mb-4 drop-shadow-lg animate-pulse" />
                                <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">PRIZES WORTH <span className="text-yellow-400">₹1,00,000</span></h2>
                                <p className="text-yellow-200/80">Compete to win amazing prizes, cash rewards, and tech goodies!</p>
                            </div>
                        </motion.div>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                            <Link to="/register" className="btn-primary w-full sm:w-auto flex items-center justify-center group text-lg px-8 py-4">
                                Register Now
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Main Content Sections */}
            <div id="event-schedule" className="relative z-10 border-t border-white/5 bg-gray-900/10">
                <EventSchedule />
            </div>

            <div id="program-plan" className="relative z-10 border-t border-white/5">
                <ProgramPlan />
            </div>

            <div id="themes" className="relative z-10 border-t border-white/5 bg-gray-900/10">
                <Themes />
            </div>

            <div id="process" className="relative z-10 border-t border-white/5">
                <Process />
            </div>

            {/* Committee & Stats Sections (Moved to Bottom) */}
            <section className="relative py-20 px-6 bg-black/40 border-t border-white/5">
                <div className="max-w-7xl mx-auto">
                    {/* Committee Section */}
                    <div className="text-left space-y-16 mb-24">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <CommitteeCard title="Chief Patrons" names={[
                                "Sri. J. Narsimha Reddy - Chairman",
                                "Sri. J. Trishul Reddy - Secretary",
                                "Sri. J. Thrilok Reddy - Treasurer"
                            ]} />
                            <CommitteeCard title="Patrons" names={[
                                "Dr. A.Mohan Babu - Director",
                                "Dr. R. Lokanadham - Principal"
                            ]} />
                            <CommitteeCard title="Conveners" names={[
                                "Dr.Purushotham - Vice Principal",
                                "Dr.G.Ramu - Professor & HoD CSE"
                            ]} />
                        </div>

                        <div className="mb-12">
                            <h3 className="text-2xl font-bold text-blue-400 mb-8 text-center uppercase tracking-wider border-b border-blue-500/20 pb-4">Faculty Coordinators</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                                <CoordinatorCard name="Mrs. D. Nikhitha Reddy" phone="8125207382" />
                                <CoordinatorCard name="Mr. G. Praveen Kumar" phone="9959732146" />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-blue-400 mb-8 text-center uppercase tracking-wider border-b border-blue-500/20 pb-4">Students Coordinators</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                                <CoordinatorCard name="Ms.Manepally Archana" phone="8309734530" />
                                <CoordinatorCard name="Mr. Tulasitilak" phone="7780554004" />
                            </div>
                        </div>
                    </div>

                    {/* Stats / Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
                    >
                        <div className="glass-card p-6 flex flex-col items-center group cursor-pointer" onClick={() => scrollToSection('#event-schedule')}>
                            <div className="p-3 bg-blue-500/10 rounded-full mb-4 group-hover:bg-blue-500/20 transition-colors">
                                <Calendar className="w-8 h-8 text-blue-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Feb 26-27, 2026</h3>
                            <p className="text-gray-400">36 Hours of Code</p>
                        </div>
                        <a href="https://www.google.com/maps/search/Narsimha+Reddy+Engineering+College" target="_blank" rel="noopener noreferrer" className="glass-card p-6 flex flex-col items-center group cursor-pointer hover:border-blue-500/50">
                            <div className="p-3 bg-purple-500/10 rounded-full mb-4 group-hover:bg-purple-500/20 transition-colors">
                                <MapPin className="w-8 h-8 text-purple-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">NRCM Campus</h3>
                            <p className="text-gray-400">Hyderabad, India</p>
                        </a>
                        <div className="glass-card p-6 flex flex-col items-center group cursor-pointer">
                            <div className="p-3 bg-pink-500/10 rounded-full mb-4 group-hover:bg-pink-500/20 transition-colors">
                                <Users className="w-8 h-8 text-pink-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">
                                {count !== null ? (
                                    <span className="flex items-center gap-1">
                                        {count > 0 ? count + "+" : "0"} <span className="text-sm font-normal text-gray-400">Registered</span>
                                    </span>
                                ) : (
                                    "Loading..."
                                )}
                            </h3>
                            <p className="text-gray-400">Total Participants</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            <footer className="py-12 text-center text-gray-400/60 text-sm border-t border-white/5 bg-black/60 backdrop-blur-md relative z-20">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p>© 2026 CodeStorm Hackathon, NRCMEC. All rights reserved.</p>
                    <div className="flex gap-6 text-xs uppercase tracking-widest font-bold items-center">
                        <button onClick={() => scrollToSection('#home')} className="hover:text-white transition-colors">Back to Top</button>
                        <Link to="/register" className="hover:text-white transition-colors">Register</Link>
                        <a href="https://nrcmec.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">College</a>
                        <Link to="/admin" className="p-1.5 bg-white/5 hover:bg-white/10 rounded-md text-[10px] text-gray-500 hover:text-blue-400 transition-all border border-white/5">Admin</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
