"use client";

import { motion } from 'framer-motion';
import { ArrowRight, Users, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ShimmerButton } from '../ui/shimmer-button';

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
            className="w-14 h-14 rounded-2xl bg-slate-800 backdrop-blur-md shadow-lg flex items-center justify-center text-2xl border border-white/10 relative overflow-hidden group"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: delay * 2 }}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-100" />
            <span className="relative z-10">{icon}</span>
        </motion.div>
    </motion.div>
);

const Integrations = () => {
    return (
        <section id="process" className="py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                {/* Bento Grid Container */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">

                    {/* Left Side - Text Content */}
                    <motion.div
                        className="flex flex-col justify-center p-8 lg:p-12 items-center lg:items-start text-center lg:text-left"
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

                        <ul className="grid grid-cols-2 gap-x-8 lg:gap-x-24 gap-y-2 mb-8 text-left text-slate-300 list-disc pl-5">
                            <li>Google Drive</li>
                            <li>WhatsApp</li>
                            <li>Messenger</li>
                            <li>Notion</li>
                            <li>Slack</li>
                            <li>Zapier</li>
                        </ul>



                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-75 transition duration-500"></div>
                            <ShimmerButton
                                className="shadow-2xl relative z-10 w-full sm:w-auto"
                                background="linear-gradient(90deg, #0f172a 0%, #1e293b 100%)"
                                shimmerColor="#22d3ee"
                                shimmerSize="0.1em"
                                borderRadius="9999px"
                            >
                                <span className="whitespace-pre-wrap text-center text-base font-semibold leading-none tracking-tight text-white flex items-center gap-2">
                                    Explore All Integrations
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </ShimmerButton>
                        </div>
                    </motion.div>

                    {/* Right Side - Integration Hub Visualization */}
                    <motion.div
                        className="relative bg-gradient-to-br from-slate-900/90 via-slate-900/50 to-indigo-950/30 backdrop-blur-xl rounded-3xl p-8 min-h-[450px] overflow-hidden border border-white/10 shadow-2xl"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Background Glow */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent opacity-50 blur-xl" />

                        {/* Left side icons */}
                        {leftIcons.map((item, i) => (
                            <motion.div
                                key={item.label}
                                className="absolute left-8 z-20"
                                style={{ top: item.top }}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + i * 0.15 }}
                            >
                                <div className="w-14 h-14 rounded-2xl bg-slate-800 backdrop-blur-md shadow-lg border border-white/10 flex items-center justify-center group relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 opacity-100" />
                                    <item.icon className="w-6 h-6 text-cyan-200 relative z-10" />
                                </div>
                            </motion.div>
                        ))}

                        {/* Center Hub - AI Logo */}
                        <motion.div
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                        >
                            <div className="relative">
                                {/* Multiple Pulsing Rings */}
                                <motion.div
                                    className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 blur-md"
                                    animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                />
                                <motion.div
                                    className="absolute inset-0 rounded-full bg-purple-500/30 blur-sm"
                                    animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                />

                                {/* Core Hub */}
                                <div className="w-24 h-24 rounded-full bg-slate-900 shadow-[0_0_30px_rgba(6,182,212,0.4)] border border-cyan-500/30 flex items-center justify-center relative z-10 group overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-600/10 opacity-100" />
                                    <motion.div
                                        className="relative z-20"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    >
                                        <svg className="w-12 h-12 text-transparent bg-clip-text bg-gradient-to-tr from-cyan-400 to-purple-400 fill-current" viewBox="0 0 24 24">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                                        </svg>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Animated Connection Lines */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 10 }}>
                            <defs>
                                <linearGradient id="lineGradAnimated" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
                                    <stop offset="50%" stopColor="#a855f7" stopOpacity="0.8" />
                                    <stop offset="100%" stopColor="#f472b6" stopOpacity="0.8" />
                                </linearGradient>
                            </defs>

                            {/* Function to render animated line */}
                            {[
                                { x2: "75%", y2: "15%", delay: 0 },
                                { x2: "85%", y2: "30%", delay: 0.1 },
                                { x2: "90%", y2: "50%", delay: 0.2 },
                                { x2: "82%", y2: "72%", delay: 0.3 },
                                { x2: "70%", y2: "88%", delay: 0.4 },
                                // Left side connections
                                { x2: "15%", y2: "40%", delay: 0.5, isLeft: true },
                                { x2: "15%", y2: "60%", delay: 0.6, isLeft: true }
                            ].map((line, i) => (
                                <g key={i}>
                                    {/* Base Line (faint) */}
                                    <motion.line
                                        x1="50%" y1="50%" x2={line.x2} y2={line.y2}
                                        stroke="rgba(255,255,255,0.1)"
                                        strokeWidth="2"
                                    />
                                    {/* Animated flowing segment */}
                                    <motion.line
                                        x1="50%" y1="50%" x2={line.x2} y2={line.y2}
                                        stroke="url(#lineGradAnimated)"
                                        strokeWidth="2"
                                        initial={{ pathLength: 0, opacity: 0.6 }}
                                        animate={{ pathLength: 1, opacity: 1 }}
                                        transition={{ duration: 1.5, ease: "easeOut", delay: line.delay }}
                                    />
                                    {/* Traveling Particle */}
                                    {/* We would need complex path animation for true dot movement along line, 
                                         but dashed line animation provides a similar data-flow feel. 
                                         Let's add a glow effect on the line instead. */}
                                </g>
                            ))}
                        </svg>

                        {/* Right side floating integration icons */}
                        {integrations.map((item, i) => (
                            <FloatingIcon key={item.name} {...item} />
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Integrations;
