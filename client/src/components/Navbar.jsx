import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X, Code, Calendar, Users, Zap, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';



const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Event Schedule', path: '/event-schedule' },
        { name: 'Program Plan', path: '/program-plan' },
        { name: 'Themes', path: '/themes' },
        { name: 'Step-by-Step Process', path: '/process' },
    ];

    const toggleMenu = () => setIsOpen(!isOpen);

    // Close menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    return (
        <nav className="fixed w-full z-50 transition-all duration-300 bg-hack-base/80 backdrop-blur-lg border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
                        <div className="p-2 bg-gradient-to-br from-blue-500 to-violet-600 rounded-lg group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300">
                            <Code className="h-6 w-6 text-white" />
                        </div>
                        <span className="font-heading font-bold text-xl tracking-wider text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-violet-400 transition-all duration-300">
                            CODESTORM<span className="text-blue-500">2026</span>
                        </span>
                    </Link>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:text-blue-400 ${location.pathname === link.path ? 'text-blue-400 bg-white/5' : 'text-gray-300'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            <a href="https://forms.gle/PCrPJ63bVVNoARmJ6" target="_blank" rel="noopener noreferrer" className="btn-primary text-sm px-4 py-2">
                                Register
                            </a>
                        </div>
                    </div>

                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none transition-all"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-gray-900 border-b border-gray-800"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-4 flex gap-4">
                                <a href="https://forms.gle/PCrPJ63bVVNoARmJ6" target="_blank" rel="noopener noreferrer" className="btn-primary w-full text-center">Register</a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
