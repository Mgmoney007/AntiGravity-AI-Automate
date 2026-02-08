"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface BadgeProps {
    variant?: 'purple' | 'green-live' | 'orange-pill' | 'purple-pop';
    children: React.ReactNode;
    className?: string;
}

const Badge = ({ variant = 'purple', children, className }: BadgeProps) => {
    if (variant === 'purple-pop') {
        return (
            <div className={cn(
                "group relative inline-flex items-center gap-2 rounded-full bg-primary/10 px-6 py-1.5 text-sm font-semibold text-white shadow-[inset_0_-8px_10px_rgba(6,182,212,0.1)] backdrop-blur-md transition-shadow duration-500 hover:shadow-[inset_0_-5px_10px_rgba(6,182,212,0.2)]",
                className
            )}>
                <span
                    className={cn(
                        "absolute inset-0 block h-full w-full animate-gradient rounded-full bg-gradient-to-r from-primary/50 via-brand-cyan/50 to-primary/50 bg-[length:300%_100%] p-[1px]"
                    )}
                    style={{
                        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "destination-out",
                        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        maskComposite: "subtract",
                        WebkitClipPath: "padding-box",
                        // @ts-ignore - Custom CSS variable
                        "--bg-size": "300%",
                    }}
                />
                <div className="relative flex items-center gap-2 z-10">
                    <Sparkles className="w-4 h-4 text-brand-cyan fill-brand-cyan/20 animate-spin-slow" />
                    {children}
                </div>
            </div>
        );
    }

    if (variant === 'green-live') {
        // Keeping hardcoded green as 'live' indicator is often distinct from brand palette
        // But verifying opacity
        return (
            <div className={cn(
                "inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-bold tracking-widest text-green-500 uppercase",
                className
            )}>
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                {children}
            </div>
        );
    }

    if (variant === 'orange-pill') {
        return (
            <span className={cn(
                "inline-block rounded-full bg-gradient-to-r from-cta to-red-500 px-3 py-1 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transform -rotate-2",
                className
            )}>
                {children}
            </span>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={cn(
                "inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary shadow-glow",
                className
            )}
        >
            <span className="text-primary">✨</span>
            {children}
        </motion.div>
    );
};

export default Badge;
