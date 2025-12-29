import { motion } from 'framer-motion';
import { Calendar, Bell, UserPlus, Flag } from 'lucide-react';

const timelineEvents = [
    {
        date: "15 Feb 2026",
        title: "Last Date for Idea Submission",
        description: "Submit your project ideas and abstracts by this deadline. No entry fee required at this stage.",
        icon: <Calendar className="w-6 h-6 text-blue-400" />,
        color: "from-blue-500/20 to-cyan-500/20",
        borderColor: "group-hover:border-blue-500/50"
    },
    {
        date: "19 Feb 2026",
        title: "Notification to Shortlisted Teams",
        description: "Shortlisted teams will be notified via email and SMS. Check your status on the portal.",
        icon: <Bell className="w-6 h-6 text-purple-400" />,
        color: "from-purple-500/20 to-pink-500/20",
        borderColor: "group-hover:border-purple-500/50"
    },
    {
        date: "21 Feb 2026",
        title: "Last Date for Registration",
        description: "Selected teams must complete their registration and fee payment to confirm their participation.",
        icon: <UserPlus className="w-6 h-6 text-cyan-400" />,
        color: "from-cyan-500/20 to-blue-500/20",
        borderColor: "group-hover:border-cyan-500/50"
    },
    {
        date: "26-27 Feb 2026",
        title: "Hackathon Days",
        description: "The 36-hour non-stop hackathon kicks off at 9:00 AM on 26th Feb and concludes on 27th Feb.",
        icon: <Flag className="w-6 h-6 text-rose-400" />,
        color: "from-rose-500/20 to-red-500/20",
        borderColor: "group-hover:border-rose-500/50"
    }
];

const EventSchedule = () => {
    return (
        <div className="pt-24 pb-20 px-6 max-w-5xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16"
            >
                <span className="text-blue-400 font-semibold tracking-wider uppercase">Roadmap</span>
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mt-2 mb-6">
                    Event <span className="text-gradient">Schedule</span>
                </h2>
                <p className="max-w-xl mx-auto text-gray-400 text-lg">
                    Important dates and deadlines for CodeStorm 2026.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-6">
                {timelineEvents.map((event, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative"
                    >
                        <div className={`absolute inset-0 bg-gradient-to-r ${event.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl`} />
                        <div className={`relative glass-card p-1 flex flex-col md:flex-row overflow-hidden hover:border-white/20 transition-all duration-300 ${event.borderColor}`}>

                            {/* Date Section */}
                            <div className="w-full md:w-40 p-6 flex flex-col items-center justify-center bg-white/5 border-b md:border-b-0 md:border-r border-white/10 shrink-0">
                                <span className="text-2xl font-black text-white leading-tight">{event.date.split(' ')[0]}</span>
                                <span className="text-sm font-bold text-blue-400 uppercase tracking-widest">{event.date.split(' ')[1]}</span>
                                <span className="text-xs text-gray-500 mt-1">{event.date.split(' ')[2]}</span>
                            </div>

                            {/* Content Section */}
                            <div className="flex-1 p-6 md:p-8 flex items-start gap-6">
                                <div className="hidden sm:flex p-3 bg-white/5 rounded-xl border border-white/10 group-hover:scale-110 transition-transform">
                                    {event.icon}
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-200 transition-colors">
                                        {event.title}
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed max-w-2xl">
                                        {event.description}
                                    </p>
                                </div>
                            </div>

                            {/* Decorative Accent */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/5 to-transparent pointer-events-none" />
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default EventSchedule;
