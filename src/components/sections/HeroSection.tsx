"use client";

import React from 'react';
import HeroHeadline from '../HeroHeadline';
import StatsCard from '../StatsCard';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const HeroSection = () => {
    return (
        <section className="relative min-h-[85vh] w-full flex flex-col items-center justify-center pt-32 pb-12 px-4 overflow-hidden">
            {/* Background Visuals */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute inset-0 bg-radial-vignette opacity-80" />
            </div>

            <div className="max-w-5xl mx-auto flex flex-col items-center text-center z-10">

                {/* Badge component should be verified to use tokens, but here we invoke it */}
                <Badge variant="purple-pop" className="mb-8">
                    Premium AI Automation Agency
                </Badge>

                {/* H1 Headline */}
                <HeroHeadline />

                {/* Subcopy */}
                <p className="text-lg md:text-xl text-text-secondary max-w-2xl mb-12 leading-relaxed">
                    We design and deploy AI systems that replace manual work, reduce overhead, and run your operations for you.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-12 justify-center w-full">
                    <Button variant="primary" size="md" className="w-full sm:w-auto group shadow-glow hover:shadow-glow-cyan transition-all duration-300">
                        Book Strategy Call
                        <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                    </Button>

                    <Button variant="secondary" size="md" className="w-full sm:w-auto group !border-white/20 hover:!border-brand-cyan/50 hover:bg-white/5">
                        <Play className="w-4 h-4 mr-2 fill-current" />
                        View Case Studies
                    </Button>
                </div>

                {/* StatsCard */}
                <StatsCard />

            </div>
        </section>
    );
};

export default HeroSection;
