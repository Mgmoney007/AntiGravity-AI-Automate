"use client";

import React, { useState } from 'react';
import { StrategyModal } from '../ui/StrategyModal';
import HeroHeadline from '../HeroHeadline';
import StatsCard from '../StatsCard';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { ShimmerButton } from '../ui/shimmer-button';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
    }
};

const HeroSection = () => {
    const [isStrategyModalOpen, setIsStrategyModalOpen] = useState(false);

    return (
        <section className="relative min-h-screen w-full flex flex-col items-center justify-center pt-28 pb-16 px-4 overflow-hidden">
            {/* Background Visuals */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute inset-0 bg-radial-vignette opacity-80" />
                {/* Purple glow behind headline */}
                <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-primary/20 blur-[120px] opacity-70" />
                {/* Cyan left-edge accent */}
                <div className="absolute top-[40%] left-[10%] w-[400px] h-[300px] rounded-full bg-brand-cyan/15 blur-[100px] opacity-60" />
                {/* Orange glow near CTA zone */}
                <div className="absolute top-[55%] right-[15%] w-[300px] h-[200px] rounded-full bg-cta/10 blur-[80px] opacity-50" />
            </div>

            <motion.div
                className="max-w-5xl mx-auto flex flex-col items-center text-center z-10"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
                }}
            >
                <motion.div variants={fadeUp}>
                    <Badge variant="purple-pop" className="mb-8">
                        Premium AI Automation Agency
                    </Badge>
                </motion.div>

                <motion.div variants={fadeUp}>
                    <HeroHeadline />
                </motion.div>

                <motion.p
                    variants={fadeUp}
                    className="text-lg md:text-xl text-text-secondary max-w-2xl mb-12 leading-relaxed"
                >
                    We design and deploy AI systems that replace manual work, reduce overhead, and run your operations for you.
                </motion.p>

                <motion.div
                    variants={fadeUp}
                    className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-12 justify-center w-full"
                >
                    <ShimmerButton
                        onClick={() => setIsStrategyModalOpen(true)}
                        shimmerColor="#7C3AED"
                        background="linear-gradient(135deg, #3B82F6 0%, #7C3AED 100%)"
                        borderRadius="9999px"
                        shimmerDuration="2.5s"
                        className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold shadow-[0_0_30px_rgba(124,58,237,0.4)] hover:shadow-[0_0_50px_rgba(124,58,237,0.7)] transition-shadow duration-300"
                    >
                        Book Strategy Call <span className="ml-2">→</span>
                    </ShimmerButton>

                    <Button variant="secondary" size="md" className="w-full sm:w-auto group !border-white/30 hover:!border-brand-cyan/60 hover:bg-brand-cyan/5 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all duration-300">
                        <Play className="w-4 h-4 mr-2 fill-current" />
                        View Case Studies
                    </Button>
                </motion.div>

                <motion.div variants={fadeUp}>
                    <StatsCard />
                </motion.div>
            </motion.div>
            <StrategyModal
                isOpen={isStrategyModalOpen}
                onClose={() => setIsStrategyModalOpen(false)}
            />
        </section>
    );
};

export default HeroSection;
