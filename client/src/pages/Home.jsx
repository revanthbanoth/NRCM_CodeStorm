import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Calendar, MapPin, ArrowRight, Users, Trophy, UserCheck, Phone, Clock, FileText, LayoutGrid } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
    const [count, setCount] = useState(null);

    useEffect(() => {
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
        <div className="relative overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] animate-blob"></div>
                <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-[-10%] left-[20%] w-96 h-96 bg-pink-500/20 rounded-full blur-[100px] animate-blob animation-delay-4000"></div>
            </div>

            {/* Hero Section */}
            <section className="relative pt-32 pb-12 lg:pt-40 lg:pb-20 px-6">
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

                        <div className="flex flex-wrap justify-center gap-6 mb-12">
                            <HeroButton
                                to="/event-schedule"
                                icon={<Calendar className="w-6 h-6 text-white" />}
                                text="Event Schedule"
                                color="from-red-600 to-rose-600"
                                shadowColor="shadow-red-500/40"
                            />
                            <ProgramPlanButton />
                            <HeroButton
                                to="/process"
                                icon={<FileText className="w-6 h-6 text-white" />}
                                text="Step-by-Step Process"
                                color="from-orange-500 to-amber-600"
                                shadowColor="shadow-orange-500/40"
                            />
                            <HeroButton
                                to="/themes"
                                icon={<LayoutGrid className="w-6 h-6 text-white" />}
                                text="Hackathon Themes"
                                color="from-violet-600 to-indigo-600"
                                shadowColor="shadow-violet-500/40"
                            />

                        </div>

                        <div className="max-w-4xl mx-auto mb-16">
                            <h2 className="text-3xl font-bold text-white mb-4">WELCOME TO CODESTORM 2026</h2>
                            <p className="text-lg text-gray-400 leading-relaxed">
                                Join us in the ultimate 36-hour hackathon where innovators, developers, and engineers come together to solve real-world problems through cutting-edge technology.
                            </p>
                        </div>

                        {/* Prizes Section */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="bg-gradient-to-r from-yellow-500/10 via-amber-500/10 to-yellow-500/10 border border-yellow-500/30 rounded-2xl p-8 max-w-5xl mx-auto mb-16 relative overflow-hidden group"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
                            <div className="flex flex-col items-center justify-center">
                                <Trophy className="w-16 h-16 text-yellow-400 mb-4 drop-shadow-lg animate-pulse" />
                                <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">PRIZES WORTH <span className="text-yellow-400">₹1,00,000</span></h2>
                                <p className="text-yellow-200/80">Compete to win amazing prizes, cash rewards, and tech goodies!</p>
                            </div>
                        </motion.div>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                            <a href="https://forms.gle/PCrPJ63bVVNoARmJ6" target="_blank" rel="noopener noreferrer" className="btn-primary w-full sm:w-auto flex items-center justify-center group text-lg px-8 py-4">
                                Register Now
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </motion.div>

                    {/* Committee Section */}
                    <div className="text-left space-y-12 max-w-6xl mx-auto">

                        {/* Row 1 */}
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


                        {/* Coordinators */}
                        {/* Faculty Coordinators */}
                        <div className="mb-12">
                            <h3 className="text-2xl font-bold text-red-400 mb-6 text-center uppercase tracking-wider border-b border-red-500/20 pb-4">Faculty Coordinators</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                                <CoordinatorCard name="Mrs. D. Nikhitha Reddy" phone="8125207382" />
                                <CoordinatorCard name="Mr. G. Praveen Kumar" phone="9959732146" />
                            </div>
                        </div>

                        {/* Students Coordinators */}
                        <div>
                            <h3 className="text-2xl font-bold text-red-400 mb-6 text-center uppercase tracking-wider border-b border-red-500/20 pb-4">Students Coordinators</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                                <CoordinatorCard name="Ms.Manepally Archana" phone="8309734530" />
                                <CoordinatorCard name="Mr. Tulasitilak" phone="7780554004" />
                            </div>
                        </div>

                    </div>


                    {/* Stats / Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
                    >
                        <div className="glass-card p-6 flex flex-col items-center group cursor-pointer">
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

            <footer className="py-8 text-center text-gray-400/60 text-sm border-t border-white/5 bg-black/20 backdrop-blur-sm relative z-10">
                © 2026 CodeStorm Hackathon, NRCMEC. All rights reserved.
            </footer>
        </div>
    );
};

const ProgramPlanButton = () => {
    return (
        <Link to="/program-plan">
            <motion.div
                whileHover={{ rotateY: 15, rotateX: 5 }}
                animate={{
                    y: [0, -10, 0],
                    rotate: [0, 1, 0, -1, 0]
                }}
                transition={{
                    y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 5, repeat: Infinity, ease: "linear" }
                }}
                className="relative group perspective-1000"
            >
                {/* 3D Box Effect Container */}
                <div className="relative w-64 h-20 transform-style-3d transition-transform duration-500 group-hover:scale-105">
                    {/* Back Layer (Glow) */}
                    <div className="absolute inset-0 bg-cyan-500 rounded-xl blur-2xl opacity-40 animate-pulse group-hover:opacity-75 transition duration-300"></div>

                    {/* Main Face */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 rounded-xl border border-white/20 shadow-2xl flex items-center justify-center gap-3 overflow-hidden">

                        {/* Animated Grid/Tech Background */}
                        <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,107,158,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] bg-no-repeat animate-shine opacity-60"></div>

                        {/* Icon with Spinning Ring */}
                        <div className="relative">
                            <div className="absolute -inset-2 border-2 border-white/30 rounded-full animate-spin-slow border-t-transparent border-l-transparent"></div>
                            <Clock className="w-6 h-6 text-white relative z-10" />
                        </div>

                        <span className="font-bold text-white text-lg tracking-wider drop-shadow-lg z-10">
                            PROGRAM PLAN
                        </span>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

const CommitteeCard = ({ title, names }) => (
    <div className="group">
        <h3 className="text-xl font-bold text-red-400 mb-4 uppercase tracking-wider border-l-4 border-red-500 pl-3 group-hover:border-red-400 transition-colors">{title}</h3>
        <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-red-500/30 transition-all">
            <ul className="space-y-2">
                {names.map((name, i) => (
                    <li key={i} className="text-gray-300 text-sm font-medium flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0" />
                        {name}
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

const HeroButton = ({ to, icon, text, color, shadowColor }) => {
    return (
        <Link to={to}>
            <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatType: "mirror"
                }}
                className="relative group"
            >
                {/* Glow behind */}
                <div className={`absolute -inset-2 bg-gradient-to-r ${color} rounded-xl blur-xl opacity-40 group-hover:opacity-60 transition duration-500 animate-pulse`}></div>

                {/* Main Button */}
                <div className={`relative px-8 py-5 rounded-xl bg-gradient-to-r ${color} flex items-center gap-4 overflow-hidden border border-white/20 shadow-xl ${shadowColor} backdrop-blur-md`}>

                    {/* Shine/Sheen overlay */}
                    <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 group-hover:animate-shine" />

                    <span className="text-2xl text-white drop-shadow-md group-hover:scale-110 transition-transform duration-300 relative z-10">
                        {icon}
                    </span>
                    <span className="font-bold text-white tracking-wide text-lg drop-shadow-md relative z-10">
                        {text}
                    </span>
                </div>
            </motion.div>
        </Link>
    );
};

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

export default Home;
