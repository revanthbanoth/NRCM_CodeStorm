import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Code } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Event Schedule', path: '/event-schedule' },
        { name: 'Program Plan', path: '/program-plan' },
        { name: 'Themes', path: '/themes' },
        { name: 'Step-by-Step Process', path: '/process' },
    ];

    const toggleMenu = () => setIsOpen(!isOpen);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${scrolled
                ? 'bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20 py-2'
                : 'bg-transparent border-b border-transparent py-4'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
                        <div className="relative p-2 rounded-lg transition-all duration-300">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-violet-600 rounded-lg blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
                            <div className="relative bg-black rounded-lg p-1">
                                <Code className="h-5 w-5 text-white group-hover:rotate-12 transition-transform duration-300" />
                            </div>
                        </div>
                        <span className="font-heading font-bold text-lg tracking-wider text-white">
                            CODESTORM<span className="text-blue-500 group-hover:text-violet-500 transition-colors">2026</span>
                        </span>
                    </Link>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 group ${location.pathname === link.path ? 'text-white' : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    {link.name}
                                    {/* Hover Underline (Slide from center) */}
                                    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gray-500 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>

                                    {/* Active Tab Gradient */}
                                    {location.pathname === link.path && (
                                        <motion.div
                                            layoutId="navbar-indicator"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-violet-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </Link>
                            ))}

                            <Link to="/register" className="relative ml-4 px-6 py-2 group overflow-hidden rounded-lg">
                                <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 to-violet-600 group-hover:from-blue-600 group-hover:to-violet-600 opacity-100 transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.5)] group-hover:shadow-[0_0_30px_rgba(37,99,235,0.8)]"></span>
                                <span className="relative text-white font-semibold text-sm">Register</span>
                            </Link>
                        </div>
                    </div>

                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none transition-all"
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
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
                    >
                        <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`block px-3 py-3 rounded-lg text-base font-medium transition-colors ${location.pathname === link.path
                                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
<<<<<<< HEAD
    <div className="pt-4 px-3">
        <Link to="/register" className="w-full block py-3 text-center bg-gradient-to-r from-blue-600 to-violet-600 rounded-lg text-white font-bold shadow-lg shadow-blue-500/25">Register Now</Link>
=======
                            <div className="pt-4 flex gap-4">
            <a href="https://forms.gle/PCrPJ63bVVNoARmJ6" target="_blank" rel="noopener noreferrer" className="btn-primary w-full text-center">Register</a>
>>>>>>> a2b72e3496ef2e319d3bba718e364dcf6f54a33c
        </div>
    </div>
                    </motion.div >
                )}
            </AnimatePresence >
        </nav >
    );
};

export default Navbar;
