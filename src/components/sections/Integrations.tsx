"use client";

import { motion } from 'framer-motion';
import { ArrowRight, Users, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// Integration icons data with positions
const integrations = [
    { name: 'Google Drive', icon: '📁', position: { top: '10%', right: '15%' }, delay: 0 },
    { name: 'Docs', icon: '📄', position: { top: '25%', right: '5%' }, delay: 0.1 },
    { name: 'WhatsApp', icon: '💬', position: { top: '50%', right: '0%' }, delay: 0.2 },
    { name: 'Messenger', icon: '💭', position: { top: '70%', right: '8%' }, delay: 0.3 },
    { name: 'Notion', icon: '📝', position: { top: '85%', right: '20%' }, delay: 0.4 },
];

const leftIcons = [
    { icon: Users, label: 'Team', top: '35%' },
    { icon: Share2, label: 'Share', top: '55%' },
];

// Animated connection line component
const ConnectionLine = ({ startX, startY, endX, endY, delay }: { startX: string; startY: string; endX: string; endY: string; delay: number }) => (
    <motion.svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.3, duration: 0.5 }}
    >
        <motion.line
            x1={startX}
            y1={startY}
            x2={endX}
            y2={endY}
            stroke="url(#lineGradient)"
            strokeWidth="1"
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: delay + 0.3, duration: 0.8, ease: "easeOut" }}
        />
        <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(139, 92, 246, 0.3)" />
                <stop offset="100%" stopColor="rgba(139, 92, 246, 0.1)" />
            </linearGradient>
        </defs>
    </motion.svg>
);

// Floating icon component
const FloatingIcon = ({ icon, name, position, delay }: { icon: string; name: string; position: { top: string; right: string }; delay: number }) => (
    <motion.div
        className="absolute z-10"
        style={{ top: position.top, right: position.right }}
        initial={{ opacity: 0, scale: 0, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay, duration: 0.5, type: "spring", stiffness: 200 }}
    >
        <motion.div
            className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm shadow-lg flex items-center justify-center text-2xl border border-white/10"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: delay * 2 }}
        >
            {icon}
        </motion.div>
    </motion.div>
);

const Integrations = () => {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                {/* Bento Grid Container */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">

                    {/* Left Side - Text Content */}
                    <motion.div
                        className="flex flex-col justify-center p-8 lg:p-12"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h2 className="section-heading mb-6">
                            Integrations
                        </h2>
                        <p className="section-subheading mb-8">
                            Supports <span className="text-white font-semibold">100+ integrations</span> and counting.
                            Connect with your favorite tools seamlessly.
                        </p>
                        <div>
                            <motion.button
                                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/5 transition-all duration-300"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Learn more
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Right Side - Integration Hub Visualization */}
                    <motion.div
                        className="relative bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 min-h-[400px] overflow-hidden border border-white/10 shadow-xl"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Left side icons */}
                        {leftIcons.map((item, i) => (
                            <motion.div
                                key={item.label}
                                className="absolute left-6 z-10"
                                style={{ top: item.top }}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + i * 0.15 }}
                            >
                                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm shadow-md border border-white/10 flex items-center justify-center">
                                    <item.icon className="w-5 h-5 text-cyan-200" />
                                </div>
                            </motion.div>
                        ))}

                        {/* Center Hub - AI Logo */}
                        <motion.div
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                        >
                            <div className="relative">
                                {/* Pulsing ring effect */}
                                <motion.div
                                    className="absolute inset-0 rounded-full bg-cyan-500/20"
                                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                                <div className="w-20 h-20 rounded-full bg-slate-800 shadow-xl border border-cyan-500/30 flex items-center justify-center relative z-10">
                                    <svg className="w-10 h-10 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                                    </svg>
                                </div>
                            </div>
                        </motion.div>

                        {/* Connection lines (Vibrant) */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
                            <defs>
                                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.5" />
                                    <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.5" />
                                    <stop offset="100%" stopColor="#f472b6" stopOpacity="0.5" />
                                </linearGradient>
                            </defs>
                            {/* Lines from center to right icons */}
                            <motion.line x1="50%" y1="50%" x2="75%" y2="15%" stroke="url(#lineGrad)" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.6, duration: 0.6 }} />
                            <motion.line x1="50%" y1="50%" x2="85%" y2="30%" stroke="url(#lineGrad)" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.7, duration: 0.6 }} />
                            <motion.line x1="50%" y1="50%" x2="90%" y2="50%" stroke="url(#lineGrad)" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.8, duration: 0.6 }} />
                            <motion.line x1="50%" y1="50%" x2="82%" y2="72%" stroke="url(#lineGrad)" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.9, duration: 0.6 }} />
                            <motion.line x1="50%" y1="50%" x2="70%" y2="88%" stroke="url(#lineGrad)" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.0, duration: 0.6 }} />
                            {/* Lines from center to left icons */}
                            <motion.line x1="50%" y1="50%" x2="15%" y2="40%" stroke="url(#lineGrad)" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5, duration: 0.6 }} />
                            <motion.line x1="50%" y1="50%" x2="15%" y2="60%" stroke="url(#lineGrad)" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.55, duration: 0.6 }} />
                        </svg>

                        {/* Right side floating integration icons */}
                        {integrations.map((item) => (
                            <FloatingIcon key={item.name} {...item} />
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Integrations;
