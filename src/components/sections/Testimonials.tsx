"use client";

import React, { useRef, useState, useEffect } from "react";
import {
    motion,
    useAnimationFrame,
    useMotionValue,
    animate,
    useMotionValueEvent,
    PanInfo,
} from "framer-motion";
import { PremiumCard } from "../ui/PremiumCard";

const testimonials = [
    {
        quote:
            "AI AUTOMATE completely automated our client onboarding. We save 20 hours a week.",
        author: "Alex M.",
        role: "Founder, GrowthAgency",
    },
    {
        quote:
            "The customer support bot handles 80% of our tickets now. Costs are down, satisfaction is up.",
        author: "Sarah J.",
        role: "COO, E-com Giant",
    },
    {
        quote:
            "Best investment we made this year. Our outreach is now fully autopilot and booking 10x more calls.",
        author: "Marcus R.",
        role: "Director of Sales",
    },
    {
        quote:
            "We went from chaos to complete clarity. The AI workflows just work.",
        author: "David L.",
        role: "VP of Operations",
    },
    {
        quote: "ROI was insane. Paid for itself in the first month.",
        author: "Michelle T.",
        role: "CEO, TechStart",
    },
    {
        quote:
            "Our team finally has time to focus on strategy instead of repetitive tasks.",
        author: "James K.",
        role: "Head of Marketing",
    },
];

// Quadruple the items to ensure smoother loop on larger screens
const duplicatedTestimonials = [
    ...testimonials,
    ...testimonials,
    ...testimonials,
    ...testimonials,
];

function TestimonialCard({
    quote,
    author,
    role,
}: {
    quote: string;
    author: string;
    role: string;
}) {
    return (
        <PremiumCard className="w-[300px] md:w-[350px] flex-shrink-0 flex flex-col h-full justify-between select-none mx-4 group hover:border-brand-primary/50 transition-colors duration-300">
            <div>
                <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                        <span key={j} className="text-brand-orange text-sm">
                            ★
                        </span>
                    ))}
                </div>
                <p className="text-lg mb-6 text-white group-hover:text-white/90 transition-colors">
                    "{quote}"
                </p>
            </div>
            <div>
                <div className="font-bold text-white">{author}</div>
                <div className="text-sm text-text-secondary">{role}</div>
            </div>
        </PremiumCard>
    );
}

export default function Testimonials() {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const [isHovered, setIsHovered] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [contentWidth, setContentWidth] = useState(0);

    const x = useMotionValue(0);

    // Configuration
    // Configuration
    const speed = 0.8; // Pixels per frame
    const direction = -1; // 1 = Left to Right, -1 = Right to Left

    useEffect(() => {
        // Calculate width of one set of testimonials (1/4 of total since we quadrupled)
        if (contentRef.current) {
            // We use scrollWidth of the container divided by 4 to get the loop length
            // This assumes flex-row and no wrapping
            setContentWidth(contentRef.current.scrollWidth);
        }
    }, []);

    // Update width on resize
    useEffect(() => {
        const handleResize = () => {
            if (contentRef.current) {
                setContentWidth(contentRef.current.scrollWidth);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useAnimationFrame((t, delta) => {
        if (!contentWidth) return;
        if (isHovered || isDragging) return;

        // Calculate move distance based on time delta (normalized to ~60fps)
        const moveBy = direction * speed * (delta / 16);

        let newX = x.get() + moveBy;

        // Loop logic
        const loopWidth = contentWidth / 4;

        // Right to left logic
        // We start at 0 and move towards -loopWidth.
        // Once we hit -loopWidth, we snap back to 0.
        if (newX <= -loopWidth) {
            newX = 0;
        } else if (newX > 0) {
            // Safety check if dragged too far right
            newX = -loopWidth;
        }

        x.set(newX);
    });

    const handleDragStart = () => setIsDragging(true);
    const handleDragEnd = () => setIsDragging(false);

    return (
        <section id="case-studies" className="py-24 overflow-hidden relative bg-black/20" ref={containerRef}>
            <div className="max-w-7xl mx-auto px-4 mb-16">
                <h2 className="section-heading text-center">
                    Trusted by Industry Leaders
                </h2>
                <p className="text-text-secondary text-center mt-4 max-w-2xl mx-auto">
                    See what founders and executives are saying about our AI automation solutions.
                </p>
            </div>

            <div className="w-full">
                <motion.div
                    ref={contentRef}
                    className="flex w-fit cursor-grab active:cursor-grabbing py-4"
                    style={{ x }}
                    drag="x"
                    dragConstraints={{ left: -contentWidth + 100, right: 100 }} // Loose constraints
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                >
                    {duplicatedTestimonials.map((t, i) => (
                        <TestimonialCard key={i} {...t} />
                    ))}
                </motion.div>
            </div>

            {/* Decorative Gradients for smooth fade in/out edges */}
            <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-brand-black to-transparent pointer-events-none z-10 hidden md:block" />
            <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-brand-black to-transparent pointer-events-none z-10 hidden md:block" />
        </section>
    );
}
