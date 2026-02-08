"use client";

import React, { useRef } from 'react';
import { HTMLMotionProps, motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PremiumCardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    glowColor?: string;
    borderColor?: string;
    className?: string;
    onClick?: () => void;
}

export const PremiumCard: React.FC<PremiumCardProps> = ({
    children,
    glowColor = "#7C3AED", // Default to primary purple
    borderColor,
    className,
    onClick,
    ...props
}) => {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth spring animation for the mouse interaction
    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const xPct = (clientX - left) / width - 0.5;
        const yPct = (clientY - top) / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    // Dynamic transform for tilt effect based on mouse position
    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);
    // We map x/y percentage to rotation degrees (e.g. -10 to 10 degrees)
    // NOTE: Framer Motion's useTransform would be cleaner, but simple spring mapping works too.
    // Let's use simple logic: negative Y percent -> positive rotateX (tilt up)

    // Actually, let's use the mouseX/Y springs directly in style transform if we want sophisticated 3d
    const transform = useMotionTemplate`perspective(1000px) rotateX(${mouseY.get() * -20}deg) rotateY(${mouseX.get() * 20}deg)`;

    const maskImage = useMotionTemplate`radial-gradient(240px circle at ${mouseX.get() * 100 + 50}% ${mouseY.get() * 100 + 50}%, white, transparent)`;
    const style = { transform }; // Apply tilt

    // Determine border style based on borderColor prop
    const borderStyle = borderColor
        ? { borderColor: borderColor, borderWidth: '1px', borderStyle: 'solid' as const }
        : {};

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            initial={{ y: 0 }}
            whileHover={{ y: -5, boxShadow: `0 20px 40px -10px ${borderColor || 'rgba(0,0,0,0.5)'}40` }}
            className={cn(
                "relative group rounded-3xl border bg-white/[0.02] overflow-hidden transition-all duration-300",
                borderColor ? "border-opacity-30 hover:border-opacity-100" : "border-white/5",
                "hover:bg-white/[0.05]",
                className
            )}
            style={{
                perspective: 1000,
                ...borderStyle
            }}
            {...props}
        >
            {/* 3D Tilt Wrapper */}
            <motion.div
                style={{
                    rotateX: useMotionTemplate`${mouseY.get() * -5}deg`,
                    rotateY: useMotionTemplate`${mouseX.get() * 5}deg`,
                    transformStyle: "preserve-3d"
                }}
                className="relative h-full w-full"
            >

                {/* Glow Effect Layer */}
                <motion.div
                    className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
                    style={{
                        maskImage,
                        WebkitMaskImage: maskImage,
                        background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), ${glowColor}40, transparent 40%)`
                    }}
                />

                {/* Animated Border Gradient Reveal */}
                <div className="absolute inset-0 rounded-3xl opacity-0 transition duration-500 group-hover:opacity-100"
                    style={{
                        background: `radial-gradient(600px circle at ${mouseX.get() * 100 + 50}% ${mouseY.get() * 100 + 50}%, ${glowColor}20, transparent 40%)`,
                        zIndex: -1
                    }}
                />

                {/* Content */}
                <div className="relative h-full w-full p-6">
                    {children}
                </div>
            </motion.div>
        </motion.div>
    );
};
