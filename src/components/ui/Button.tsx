"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {

        const variants = {
            primary: "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:-translate-y-1 transition-all duration-300 border border-white/10 cursor-pointer relative overflow-hidden",
            secondary: "glass-panel text-brand-cyan hover:bg-white/10 hover:-translate-y-1 transition-transform cursor-pointer border border-brand-cyan/30",
            ghost: "bg-transparent text-text-secondary hover:text-white cursor-pointer hover:bg-white/5"
        };

        const sizes = {
            sm: "px-4 py-2 text-sm",
            md: "px-6 py-3 text-base",
            lg: "px-8 py-3.5 text-lg"
        };

        return (
            <motion.button
                ref={ref}
                /* whileHover removed to avoid conflict with hover:-translate-y-1 class */
                whileTap={{ scale: 0.98 }}
                className={cn(
                    "relative inline-flex items-center justify-center rounded-full font-medium transition-all duration-300",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {children}
                {variant === 'primary' && (
                    <div className="absolute inset-0 rounded-full bg-white/20 blur-md opacity-0 hover:opacity-100 transition-opacity duration-300" />
                )}
            </motion.button>
        );
    }
);

Button.displayName = 'Button';

export default Button;
