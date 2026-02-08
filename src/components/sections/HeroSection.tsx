"use client";

import React from 'react';
import HeroHeadline from '../HeroHeadline';
import StatsCard from '../StatsCard';
import Badge from '../ui/Badge';
import { motion } from 'framer-motion';

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

                {/* StatsCard */}
                <StatsCard />

                {/* CTA Row - Moved to StatsCard */}

            </div>
        </section>
    );
};

export default HeroSection;
