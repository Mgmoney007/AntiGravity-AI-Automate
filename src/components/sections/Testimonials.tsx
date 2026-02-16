"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PremiumCard } from '../ui/PremiumCard';

const testimonials = [
    {
        quote: "AI AUTOMATE completely automated our client onboarding. We save 20 hours a week.",
        author: "Alex M.",
        role: "Founder, GrowthAgency"
    },
    {
        quote: "The customer support bot handles 80% of our tickets now. Costs are down, satisfaction is up.",
        author: "Sarah J.",
        role: "COO, E-com Giant"
    },
    {
        quote: "Best investment we made this year. Our outreach is now fully autopilot and booking 10x more calls.",
        author: "Marcus R.",
        role: "Director of Sales"
    },
    {
        quote: "We went from chaos to complete clarity. The AI workflows just work.",
        author: "David L.",
        role: "VP of Operations"
    },
    {
        quote: "ROI was insane. Paid for itself in the first month.",
        author: "Michelle T.",
        role: "CEO, TechStart"
    },
    {
        quote: "Our team finally has time to focus on strategy instead of repetitive tasks.",
        author: "James K.",
        role: "Head of Marketing"
    }
];

function TestimonialCard({ quote, author, role }: { quote: string; author: string; role: string }) {
    return (
        <PremiumCard className="w-[300px] md:w-[350px] flex-shrink-0 flex flex-col h-full justify-between select-none">
            <div>
                <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                        <span key={j} className="text-brand-orange text-sm">★</span>
                    ))}
                </div>
                <p className="text-lg mb-6 text-white">"{quote}"</p>
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
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) {
                setWidth(containerRef.current.scrollWidth - containerRef.current.offsetWidth);
            }
        };

        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    return (
        <section className="py-24 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 mb-12">
                <h2 className="section-heading text-center">
                    Trusted by Industry Leaders
                </h2>
            </div>

            <div className="px-4">
                <motion.div
                    ref={containerRef}
                    className="cursor-grab active:cursor-grabbing overflow-hidden"
                >
                    <motion.div
                        drag="x"
                        dragConstraints={{ right: 0, left: -width }}
                        className="flex gap-6 w-fit"
                    >
                        {testimonials.map((t, i) => (
                            <TestimonialCard key={i} {...t} />
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
