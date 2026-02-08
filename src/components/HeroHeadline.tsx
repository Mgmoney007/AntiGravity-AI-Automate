"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import Badge from './ui/Badge';
import { Sparkles, Pencil, TrendingUp, Send, Layers } from 'lucide-react';

const PRESETS = [
    {
        id: "gradient-run",
        word: "Run",
        icon: Sparkles,
        // violet-400 (#a78bfa) -> indigo-600 (#4f46e5)
        colors: ["#a78bfa", "#4f46e5"],
        gradient: "from-violet-400 to-indigo-600",
        tracking: "-tracking-[0.01em]",
    },
    {
        id: "gradient-build",
        word: "Build",
        icon: Layers,
        // cyan-400 (#22d3ee) -> blue-600 (#2563eb)
        colors: ["#22d3ee", "#2563eb"],
        gradient: "from-cyan-400 to-blue-600",
        tracking: "tracking-normal",
    },
    {
        id: "gradient-scale",
        word: "Scale",
        icon: TrendingUp,
        // emerald-400 (#34d399) -> teal-600 (#0d9488)
        colors: ["#34d399", "#0d9488"],
        gradient: "from-emerald-400 to-teal-600",
        tracking: "tracking-[0.01em]",
    }
];

export default function HeroHeadline() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % PRESETS.length);
        }, 2200);

        return () => clearInterval(timer);
    }, []);

    const current = PRESETS[index];
    const Icon = current.icon;

    return (
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-white mb-6 max-w-5xl mx-auto px-4">
            {/* SVG Gradients Definition Block */}
            <svg width="0" height="0" className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
                <defs>
                    {PRESETS.map((preset) => (
                        <linearGradient key={preset.id} id={preset.id} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor={preset.colors[0]} />
                            <stop offset="100%" stopColor={preset.colors[1]} />
                        </linearGradient>
                    ))}
                </defs>
            </svg>

            <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-y-2 gap-x-3 md:gap-x-4">
                {/* Icon + Word Container */}
                <div className="relative inline-flex items-center justify-center md:justify-end gap-3 h-[1.1em] w-full md:w-auto min-w-[200px] md:min-w-[220px] overflow-visible">
                    <AnimatePresence mode="popLayout">
                        <motion.div
                            key={current.word}
                            initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
                            transition={{ duration: 0.32, ease: [0.2, 0.8, 0.2, 1] }}
                            className="absolute md:right-0 top-0 flex items-center gap-3 justify-center md:justify-end w-full md:w-auto"
                        >
                            {/* Icon with Gradient Stroke */}
                            <Icon
                                className="w-8 h-8 md:w-12 md:h-12 transition-all duration-300"
                                style={{ stroke: `url(#${current.id})` }}
                            />
                            <span className={cn(
                                "bg-clip-text text-transparent bg-gradient-to-r",
                                current.gradient,
                                current.tracking
                            )}>
                                {current.word}
                            </span>
                        </motion.div>
                    </AnimatePresence>
                    {/* Screen reader only */}
                    <span className="sr-only">Automate Your Business</span>
                </div>

                {/* Static Text "AI Ad Creatives" */}
                <span className={cn(
                    "bg-clip-text text-transparent bg-gradient-to-r transition-colors duration-500",
                    current.gradient
                )}>
                    Your Business
                </span>
            </div>

            {/* Second Line */}
            <div className="flex flex-wrap justify-center items-center gap-x-2 md:gap-x-3 mt-2 md:mt-4">
                <span>ON</span>
                <Badge variant="orange-pill" className="mx-2 text-xl md:text-3xl px-4 py-1 md:py-2 align-middle inline-flex items-center justify-center h-[1.4em]">
                    AUTOPILOT
                </Badge>
                <span>24/7</span>
            </div>
        </h1>
    );
}
