"use client";

import React from 'react';
import { Bot, Database, Search, MousePointer2, Palette, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { PremiumCard } from '../ui/PremiumCard';

const features = [
    {
        icon: Bot,
        title: "AI Customer Support",
        desc: "24/7 intelligent chatbots that handle inquiries and bookings.",
        color: "text-brand-cyan",
        bg: "bg-brand-cyan/20",
        borderColor: "#06b6d4",
        gradient: "from-brand-cyan/20 to-transparent",
        shadow: "shadow-[0_0_15px_-3px_rgba(6,182,212,0.3)]"
    },
    {
        icon: MousePointer2,
        title: "Automated Outreach",
        desc: "Personalized email and LinkedIn sequences at scale.",
        color: "text-violet-400",
        bg: "bg-violet-400/20",
        borderColor: "#8b5cf6",
        gradient: "from-violet-400/20 to-transparent",
        shadow: "shadow-[0_0_15px_-3px_rgba(139,92,246,0.3)]"
    },
    {
        icon: Database,
        title: "Data Processing",
        desc: "Automate data entry, cleaning, and analysis workflows.",
        color: "text-emerald-400",
        bg: "bg-emerald-400/20",
        borderColor: "#10b981",
        gradient: "from-emerald-400/20 to-transparent",
        shadow: "shadow-[0_0_15px_-3px_rgba(16,185,129,0.3)]"
    },
    {
        icon: Palette,
        title: "Content Systems",
        desc: "End-to-end content generation and publishing pipelines.",
        color: "text-pink-400",
        bg: "bg-pink-400/20",
        borderColor: "#f472b6",
        gradient: "from-pink-400/20 to-transparent",
        shadow: "shadow-[0_0_15px_-3px_rgba(244,114,182,0.3)]"
    },
    {
        icon: Search,
        title: "Workflow Audits",
        desc: "We identify bottlenecks and design efficiency roadmaps.",
        color: "text-amber-400",
        bg: "bg-amber-400/20",
        borderColor: "#fbbf24",
        gradient: "from-amber-400/20 to-transparent",
        shadow: "shadow-[0_0_15px_-3px_rgba(251,191,36,0.3)]"
    },
    {
        icon: Code2,
        title: "Custom AI Agents",
        desc: "Bespoke LLM solutions tailored to your unique specific needs.",
        color: "text-indigo-400",
        bg: "bg-indigo-400/20",
        borderColor: "#818cf8",
        gradient: "from-indigo-400/20 to-transparent",
        shadow: "shadow-[0_0_15px_-3px_rgba(129,140,248,0.3)]"
    }
];

export default function FeatureGrid() {
    return (
        <section id="features" className="py-24 relative">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="section-heading mb-6">
                        Engineered for <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Scale</span>
                    </h2>
                    <p className="section-subheading mx-auto">
                        Stop relying on manual busywork. AI AUTOMATE integrates intelligent agents into your business to automate operations and drive growth.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feat, i) => {
                        return (
                            <PremiumCard
                                key={i}
                                className="flex flex-col items-start h-full group"
                                borderColor={feat.borderColor}
                                glowColor={feat.borderColor}
                            >
                                <div className={`relative h-12 w-12 rounded-xl flex items-center justify-center mb-6 overflow-hidden ${feat.bg} ${feat.shadow} transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                                    {/* Gradient Overlay */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${feat.gradient} opacity-50`} />

                                    <motion.div
                                        whileHover={{
                                            rotate: [0, -10, 10, -10, 10, 0],
                                            scale: 1.2,
                                            transition: { duration: 0.4, type: "spring", stiffness: 300 }
                                        }}
                                        className="relative z-10"
                                    >
                                        <feat.icon className={`${feat.color} w-6 h-6 drop-shadow-md`} />
                                    </motion.div>
                                </div>
                                <h3 className="card-title mb-3">{feat.title}</h3>
                                <p className="card-description">{feat.desc}</p>
                            </PremiumCard>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
