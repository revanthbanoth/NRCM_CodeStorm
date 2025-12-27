import { motion } from 'framer-motion';
import { Lightbulb, FileCheck, CreditCard, Code, Download, Video, FileText, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
    {
        step: 1,
        title: "Submit Your Idea",
        date: "Before 15th February 2026",
        description: "Submit your innovation. No fee is required at this stage.",
        icon: <Lightbulb className="w-8 h-8 text-yellow-400" />,
        color: "from-yellow-500/20 to-orange-500/20",
        details: [
            "Team Size: Exactly 4 Members",
            "Team Names and Mobile Numbers Required",
            "Prepare a PPT Report using the template",
            "Record a 3-minute YouTube video explaining your idea"
        ],
        highlight: true // Template download button
    },
    {
        step: 2,
        title: "Evaluation & Shortlisting",
        date: "19th February 2026",
        description: "Our panel of experts will review all submissions. Shortlisted teams will be notified via email/SMS.",
        icon: <FileCheck className="w-8 h-8 text-blue-400" />,
        color: "from-blue-500/20 to-cyan-500/20",
        details: [
            "Technical Feasibility Check",
            "Innovation & Novelty Assessment",
            "Clarity of Solution"
        ]
    },
    {
        step: 3,
        title: "Registration",
        date: "By 21st February 2026",
        description: "Shortlisted teams must complete their registration to confirm their slot.",
        icon: <CreditCard className="w-8 h-8 text-green-400" />,
        color: "from-green-500/20 to-emerald-500/20",
        details: [
            "Registration Fee: ₹400 per head",
            "Includes: T-Shirt, ID Card, Swag",
            "Food: Lunch, Dinner, High-Tea & Snacks for 2 days"
        ]
    },
    {
        step: 4,
        title: "Hackathon & Implementation",
        date: "26th - 27th February 2026",
        description: "The Grand Finale! 36 Hours of non-stop coding, building, and fun.",
        icon: <Code className="w-8 h-8 text-purple-400" />,
        color: "from-purple-500/20 to-violet-500/20",
        details: [
            "Venue: NRCM Campus",
            "Mentoring Sessions throughout the event",
            "Final Pitching & Prize Distribution"
        ]
    }
];

const Process = () => {
    return (
        <div className="pt-24 pb-20 px-6 max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16"
            >
                <span className="text-blue-400 font-semibold tracking-wider uppercase">Roadmap to Victory</span>
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mt-2 mb-6">
                    Step-by-Step <span className="text-gradient">Process</span>
                </h2>
                <p className="max-w-2xl mx-auto text-gray-400 text-lg">
                    Follow these simple steps to participate in CodeStorm 2026.
                </p>
            </motion.div>

            <div className="relative">
                {/* Connecting Line (Desktop) */}
                <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500/20 via-purple-500/20 to-pink-500/20 -translate-x-1/2 rounded-full" />

                <div className="space-y-12 lg:space-y-24">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.7, delay: index * 0.1 }}
                            className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-center ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''
                                }`}
                        >
                            {/* Content Side */}
                            <div className="flex-1 w-full lg:w-1/2">
                                <div className="glass-card p-8 group hover:border-blue-500/30 transition-all relative overflow-hidden">
                                    <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${step.color}`} />

                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="p-3 bg-gray-800 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                            {step.icon}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-blue-400 tracking-wider">STEP {padZero(step.step)}</span>
                                            <span className="text-xs text-gray-500 font-mono">{step.date}</span>
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-200 transition-colors">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-400 mb-6 leading-relaxed">
                                        {step.description}
                                    </p>

                                    <ul className="space-y-3 mb-6">
                                        {step.details.map((detail, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                                <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>

                                    {step.highlight && (
                                        <a
                                            href="#"
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors border border-gray-700"
                                        >
                                            <Download size={16} /> Download PPT Template
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Timeline Node (Desktop) */}
                            <div className="hidden lg:flex relative items-center justify-center flex-shrink-0 w-12 h-12">
                                <div className="w-full h-full bg-gray-900 rounded-full border-4 border-gray-800 z-10 flex items-center justify-center shadow-xl shadow-blue-500/10">
                                    <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse" />
                                </div>
                            </div>

                            {/* Empty Spacer for alternating layout */}
                            <div className="hidden lg:block flex-1 w-1/2" />

                        </motion.div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mt-20 text-center"
            >
                <Link
                    to="/idea-submission"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold text-lg rounded-full shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 transition-all duration-300"
                >
                    <Lightbulb className="w-6 h-6" />
                    Submit Your Idea
                </Link>
                <p className="mt-4 text-gray-500 text-sm">
                    Ready to showcase your innovation? Submit your idea now!
                </p>
            </motion.div>
        </div>
    );
};

const padZero = (num) => num.toString().padStart(2, '0');

export default Process;
