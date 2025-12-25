import { motion } from 'framer-motion';
import { Calendar, Bell, UserPlus, Flag } from 'lucide-react';

const timelineEvents = [
    {
        date: "15 Feb 2026",
        title: "Last Date for Idea Submission",
        description: "Submit your project ideas and abstracts by this deadline. No entry fee required at this stage.",
        icon: <Calendar className="w-6 h-6 text-red-100" />
    },
    {
        date: "19 Feb 2026",
        title: "Notification to Shortlisted Teams",
        description: "Shortlisted teams will be notified via email and SMS. Check your status on the portal.",
        icon: <Bell className="w-6 h-6 text-red-100" />
    },
    {
        date: "21 Feb 2026",
        title: "Last Date for Registration",
        description: "Selected teams must complete their registration and fee payment to confirm their participation.",
        icon: <UserPlus className="w-6 h-6 text-red-100" />
    },
    {
        date: "26-27 Feb 2026",
        title: "Hackathon Days",
        description: "The 36-hour non-stop hackathon kicks off at 9:00 AM on 26th Feb and concludes on 27th Feb.",
        icon: <Flag className="w-6 h-6 text-red-100" />
    }
];

const EventSchedule = () => {
    return (
        <div className="pt-24 pb-20 px-6 max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16"
            >
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-red-500 mt-2 mb-6 uppercase tracking-wide">
                    Event Schedule
                </h1>
                <p className="max-w-xl mx-auto text-gray-400 text-lg border-b-2 border-red-500 pb-2 inline-block">
                    CodeStorm 2026: Hackathon Timeline
                </p>
            </motion.div>

            <div className="space-y-6">
                {timelineEvents.map((event, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex flex-col md:flex-row group"
                    >
                        {/* Date Box */}
                        <div className="w-full md:w-48 bg-white text-red-500 font-bold p-6 flex flex-col items-center justify-center rounded-t-xl md:rounded-l-xl md:rounded-tr-none border-r-0 md:border-r border-red-100 shrink-0">
                            <span className="text-2xl text-center leading-tight">{event.date.split(' ')[0]} {event.date.split(' ')[1]}</span>
                            <span className="text-lg">{event.date.split(' ')[2]}</span>
                        </div>

                        {/* Content Box */}
                        <div className="flex-1 bg-gradient-to-r from-red-500 to-rose-500 p-6 rounded-b-xl md:rounded-r-xl md:rounded-bl-none text-white flex items-center md:items-start gap-4 shadow-lg shadow-red-900/20 transform group-hover:scale-[1.02] transition-transform duration-300">
                            <div className="mt-1 hidden sm:block p-2 bg-white/20 rounded-full">
                                {event.icon}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                                <p className="text-red-100 leading-relaxed font-medium">
                                    {event.description}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default EventSchedule;
