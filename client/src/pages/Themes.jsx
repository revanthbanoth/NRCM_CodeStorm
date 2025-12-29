import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Cpu, Car, Zap, Leaf, Shield, AlertTriangle, Gamepad2, Globe, Database, X, Lightbulb, Layers } from 'lucide-react';

const themes = [
    {
        title: "Artificial Intelligence",
        description: "Explore the vast capabilities of AI, including machine learning, deep learning, and NLP. Build systems to solve real-world problems.",
        icon: <Bot className="w-8 h-8 text-blue-400" />,
        color: "from-blue-500/20 to-cyan-500/20",
        details: "Dive deep into the world of AI. Projects can range from predictive analytics and computer vision to natural language processing (NLP) and generative AI.",
        ideas: [
            "AI-powered healthcare diagnostic tool",
            "Smart personal assistant for producitivity",
            "Fake news detection system",
            "AI-driven crop disease identification"
        ]
    },
    {
        title: "Robotics",
        description: "Develop innovative solutions that enhance human-robot collaboration, assist in healthcare, or solve challenges in hazardous environments.",
        icon: <Cpu className="w-8 h-8 text-purple-400" />,
        color: "from-purple-500/20 to-pink-500/20",
        details: "Robotics intersects hardware and software. Build prototypes or simulations that automate physical tasks or explore dangerous terrain.",
        ideas: [
            "Autonomous warehouse sorting robot",
            "Gesture-controlled robotic arm",
            "Disaster relief drone simulation",
            "Smart home cleaning bot"
        ]
    },
    {
        title: "Smart Vehicles",
        description: "Design intelligent transportation solutions. Work on autonomous vehicles, connected cars, or smart traffic management systems.",
        icon: <Car className="w-8 h-8 text-red-400" />,
        color: "from-red-500/20 to-orange-500/20",
        details: "The future of mobility is smart. Focus on efficiency, safety, and connectivity in transportation networks.",
        ideas: [
            "Real-time traffic congestion optimizer",
            "Accident detection and alert system",
            "EV charging station finder app",
            "Driver drowsiness detection system"
        ]
    },
    {
        title: "Automation",
        description: "Create automation solutions for manufacturing, agriculture, and home automation using RPA or AI-driven workflows.",
        icon: <Zap className="w-8 h-8 text-yellow-400" />,
        color: "from-yellow-500/20 to-amber-500/20",
        details: "Streamline repetitive tasks and improve efficiency. Automation can be applied to industries, homes, or digital workflows.",
        ideas: [
            "IoT-based smart irrigation system",
            "Home energy usage optimizer",
            "Automated resume screening tool",
            "Industrial inventory management system"
        ]
    },
    {
        title: "Green Tech",
        description: "Build solutions focused on renewable energy, reducing carbon footprints, recycling, or smart waste management.",
        icon: <Leaf className="w-8 h-8 text-green-400" />,
        color: "from-green-500/20 to-emerald-500/20",
        details: "Technology for a sustainable future. Address climate change, waste, and energy consumption with innovative tech.",
        ideas: [
            "Carbon footprint tracker app",
            "Smart waste bin with segregation",
            "Community food sharing platform",
            "Renewable energy monitoring dashboard"
        ]
    },
    {
        title: "Blockchain",
        description: "Leverage decentralized systems for finance, healthcare, and supply chain using smart contracts and distributed ledgers.",
        icon: <Database className="w-8 h-8 text-indigo-400" />,
        color: "from-indigo-500/20 to-violet-500/20",
        details: "Decentralization fosters trust and transparency. explora DeFi, NFTs, DAOs, or secure data sharing protocols.",
        ideas: [
            "Decentralized voting system",
            "Fake product identification using blockchain",
            "Secure medical record sharing",
            "Crowdfunding platform using smart contracts"
        ]
    },
    {
        title: "Cyber Security",
        description: "Build systems that protect against cyber threats. Focus on encryption, threat detection, and data privacy.",
        icon: <Shield className="w-8 h-8 text-gray-400" />,
        color: "from-gray-500/20 to-slate-500/20",
        details: "Protecting digital assets is critical. Develop tools for encryption, vulnerability scanning, or secure communication.",
        ideas: [
            "Phishing website detector extension",
            "Encrypted file sharing platform",
            "Password strength analyzer",
            "Network intrusion detection system"
        ]
    },
    {
        title: "Disaster Management",
        description: "Develop smart systems that predict, monitor, and manage disaster scenarios to improve early warnings and recovery.",
        icon: <AlertTriangle className="w-8 h-8 text-orange-400" />,
        color: "from-orange-500/20 to-red-500/20",
        details: "Tech that saves lives. Focus on early warning systems, resource coordination, and communication during emergencies.",
        ideas: [
            "Flood prediction and alert system",
            "Emergency resource coordinator app",
            "Offline communication mesh network",
            "Earthquake damage assessment tool"
        ]
    },
    {
        title: "Game Development",
        description: "Design engaging and immersive games that feature unique mechanics, captivating stories, or educational purposes.",
        icon: <Gamepad2 className="w-8 h-8 text-pink-400" />,
        color: "from-pink-500/20 to-rose-500/20",
        details: "Combine creativity with coding. Build 2D/3D games, VR experiences, or educational gamified platforms.",
        ideas: [
            "Educational puzzle game for kids",
            "VR historical tour experience",
            "Multiplayer strategy game",
            "Eco-awareness adventure game"
        ]
    },
    {
        title: "Open Innovation",
        description: "Have an idea that doesn’t fit? This category is for all other innovative solutions tackling real-world challenges.",
        icon: <Globe className="w-8 h-8 text-teal-400" />,
        color: "from-teal-500/20 to-cyan-500/20",
        details: "No boundaries. If your idea solves a problem and uses technology in a novel way, this is the track for you.",
        ideas: [
            "Mental health support chatbot",
            "Fintech budget tracker",
            "Augmented reality shopping assistant",
            "Any other crazy idea!"
        ]
    }
];

const Modal = ({ theme, onClose }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-gray-900 border border-gray-700 w-full max-w-2xl rounded-2xl p-6 md:p-10 relative shadow-2xl overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
    >
        <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors text-gray-400 hover:text-white"
        >
            <X size={24} />
        </button>

        <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-gray-800 rounded-xl">
                {theme.icon}
            </div>
            <div>
                <h3 className="text-3xl font-heading font-bold text-white">{theme.title}</h3>
                <span className="text-blue-400 text-sm font-semibold tracking-wider">CODESTORM 2026</span>
            </div>
        </div>

        <div className="space-y-6">
            <div>
                <h4 className="text-xl font-bold text-gray-200 mb-2 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-purple-400" /> Overview
                </h4>
                <p className="text-gray-400 leading-relaxed text-lg">
                    {theme.details}
                </p>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
                <h4 className="text-xl font-bold text-gray-200 mb-4 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-yellow-400" /> Project Ideas
                </h4>
                <ul className="space-y-3">
                    {theme.ideas.map((idea, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-300">
                            <span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                            {idea}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="pt-4 border-t border-gray-800">
                <p className="text-sm text-gray-500 italic">
                    * These ideas are just for inspiration. Feel free to build something unique!
                </p>
            </div>
        </div>
    </motion.div>
);

const Themes = () => {
    const [selectedTheme, setSelectedTheme] = useState(null);

    return (
        <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto relative">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16"
            >
                <span className="text-blue-400 font-semibold tracking-wider uppercase">Problem Statements</span>
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mt-2 mb-6">
                    Hackathon <span className="text-gradient">Themes</span>
                </h2>
                <p className="max-w-2xl mx-auto text-gray-400 text-lg">
                    Choose a track that inspires you. Click on any theme to learn more and see project ideas.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {themes.map((theme, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group relative cursor-pointer"
                        onClick={() => setSelectedTheme(theme)}
                        layoutId={`card-${index}`}
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${theme.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur-xl`} />
                        <div className="glass-card p-8 h-full relative z-10 flex flex-col items-start hover:-translate-y-2 transition-transform duration-300 border border-white/5 group-hover:border-white/10">
                            <div className="p-3 bg-white/5 rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                                {theme.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                                {theme.title}
                            </h3>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                {theme.description}
                            </p>
                            <div className="mt-4 text-blue-400 text-sm font-semibold flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                Read More <span className="ml-1">→</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedTheme && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedTheme(null)}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        <Modal theme={selectedTheme} onClose={() => setSelectedTheme(null)} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Themes;
