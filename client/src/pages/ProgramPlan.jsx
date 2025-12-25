import { motion } from 'framer-motion';
import { Coffee, Play, CheckCircle, Code, Award, Music, Moon, Gamepad2, Users, Info } from 'lucide-react';

const scheduleData = [
    {
        day: "Day 1: February 26, 2026",
        activities: [
            { time: "09:00 AM - 10:00 AM", title: "Registration & Breakfast", icon: <Coffee />, type: "break" },
            { time: "10:00 AM - 11:00 AM", title: "Inauguration Ceremony", icon: <Info />, type: "main" },
            { time: "11:00 AM", title: "Hackathon Begins! 🚀", icon: <Play />, type: "highlight" },
            { time: "11:30 AM - 01:00 PM", title: "First Round of Mentoring", icon: <Users />, type: "main" },
            { time: "01:00 PM - 02:00 PM", title: "Lunch Break", icon: <Coffee />, type: "break" },
            { time: "02:00 PM - 05:00 PM", title: "Coding Continues...", icon: <Code />, type: "main" },
            { time: "05:00 PM - 06:00 PM", title: "High Tea & Snacks", icon: <Coffee />, type: "break" },
            { time: "06:00 PM - 08:00 PM", title: "Second Round of Mentoring", icon: <CheckCircle />, type: "main" },
            { time: "08:00 PM - 09:00 PM", title: "Dinner", icon: <Coffee />, type: "break" },
            { time: "09:00 PM Onwards", title: "Coding Continues (Overnight)", icon: <Moon />, type: "main" },
            { time: "12:00 AM", title: "Midnight Fun: Dance Off / Karaoke", icon: <Music />, type: "fun" }
        ]
    },
    {
        day: "Day 2: February 27, 2026",
        activities: [
            { time: "02:00 AM", title: "Mini-Games Break (Charades/Pictionary)", icon: <Gamepad2 />, type: "fun" },
            { time: "08:00 AM - 09:00 AM", title: "Breakfast", icon: <Coffee />, type: "break" },
            { time: "09:00 AM - 12:00 PM", title: "Final Coding Sprint", icon: <Code />, type: "highlight" },
            { time: "10:00 AM", title: "Final Round of Mentoring", icon: <Users />, type: "main" },
            { time: "01:00 PM - 02:00 PM", title: "Lunch", icon: <Coffee />, type: "break" },
            { time: "04:00 PM", title: "Hackathon Ends (Code Freeze)", icon: <Award />, type: "highlight" },
            { time: "04:00 PM - 05:00 PM", title: "Judging & Validation", icon: <CheckCircle />, type: "main" },
            { time: "05:00 PM", title: "Valedictory & Prize Distribution", icon: <Award />, type: "highlight" }
        ]
    }
];

const ProgramPlan = () => {
    return (
        <div className="pt-24 pb-20 px-6 max-w-5xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16"
            >
                <span className="text-blue-400 font-semibold tracking-wider uppercase">36 Hours of Innovation</span>
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mt-2 mb-6">
                    Program <span className="text-gradient">Plan</span>
                </h2>
                <p className="max-w-2xl mx-auto text-gray-400 text-lg">
                    A detailed minute-by-minute plan for the 36-hour hackathon marathon.
                </p>
            </motion.div>

            <div className="space-y-12">
                {scheduleData.map((day, index) => (
                    <div key={index} className="relative">
                        <div className="sticky top-24 z-10 bg-hack-base/90 backdrop-blur-sm py-4 border-b border-gray-800 mb-6">
                            <h3 className="text-2xl font-heading font-bold text-white flex items-center gap-3">
                                <span className="w-3 h-8 bg-blue-500 rounded-full"></span>
                                {day.day}
                            </h3>
                        </div>

                        <div className="relative border-l-2 border-gray-800 ml-6 space-y-8 pb-8">
                            {day.activities.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    className="relative pl-8"
                                >
                                    {/* Timeline Dot */}
                                    <div className={`absolute -left-[9px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-gray-900 ${item.type === 'highlight' ? 'bg-blue-500 shadow-lg shadow-blue-500/50' :
                                        item.type === 'fun' ? 'bg-pink-500' :
                                            item.type === 'break' ? 'bg-orange-500' : 'bg-gray-600'
                                        }`}></div>

                                    <div className={`glass-card p-5 group hover:border-blue-500/30 transition-all flex flex-col md:flex-row md:items-center gap-4 ${item.type === 'highlight' ? 'border-blue-500/30 bg-blue-500/5' : ''
                                        }`}>
                                        <div className={`p-3 rounded-xl flex-shrink-0 ${item.type === 'highlight' ? 'bg-blue-500/20 text-blue-400' :
                                            item.type === 'fun' ? 'bg-pink-500/20 text-pink-400' :
                                                item.type === 'break' ? 'bg-orange-500/20 text-orange-400' : 'bg-gray-700/50 text-gray-400'
                                            }`}>
                                            {item.icon}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-1">
                                                <h4 className={`text-lg font-bold ${item.type === 'highlight' ? 'text-blue-300' : 'text-gray-200'
                                                    }`}>{item.title}</h4>
                                                <span className="text-sm font-bold tracking-wide text-gray-300 bg-white/5 px-3 py-1 rounded-full border border-white/10 whitespace-nowrap">
                                                    {item.time}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProgramPlan;
