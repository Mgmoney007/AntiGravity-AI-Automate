"use client";

import React from 'react';
import Badge from './ui/Badge';
import Button from './ui/Button';
import NumberTicker from './ui/NumberTicker';
import { Play, Clock, TrendingUp, Zap } from 'lucide-react';

const StatsCard = () => {
    return (
        <div className="glass-panel mx-auto mt-8 md:mt-12 max-w-4xl rounded-2xl md:rounded-3xl p-4 md:p-8 backdrop-blur-xl border border-white/10 shadow-2xl bg-brand-navy/80">
            {/* Header / CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-8 md:mb-10 justify-center">
                <Button variant="primary" size="md" className="w-full sm:w-auto group shadow-glow hover:shadow-glow-cyan transition-all duration-300">
                    Book Strategy Call
                    <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                </Button>

                <Button variant="secondary" size="md" className="w-full sm:w-auto group !border-white/20 hover:!border-brand-cyan/50 hover:bg-white/5">
                    <Play className="w-4 h-4 mr-2 fill-current" />
                    View Case Studies
                </Button>
            </div>

            {/* Badge Title */}
            <div className="flex justify-center items-center mb-8">
                <Badge variant="purple-pop" className="shadow-lg">
                    Agency Performance
                </Badge>
            </div>

            {/* Bento Grid Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                {/* Card 1: Hours Saved */}
                <div className="relative overflow-hidden rounded-xl md:rounded-2xl bg-brand-black/60 border border-green-500/30 p-4 md:p-8 flex flex-col items-center justify-center gap-2 md:gap-3 group hover:bg-brand-black/80 transition-all duration-500 hover:border-green-500/50 hover:shadow-[0_0_40px_-5px_rgba(34,197,94,0.4)]">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="p-2 md:p-3 rounded-full bg-green-500/20 mb-1 md:mb-2 group-hover:scale-110 transition-transform duration-500 border border-green-500/30">
                        <Clock className="w-5 h-5 md:w-6 md:h-6 text-green-500" />
                    </div>

                    <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white flex items-baseline tracking-tight z-10">
                        <NumberTicker value={10} delay={0.2} />
                        <span className="text-green-500 text-3xl md:text-4xl lg:text-5xl ml-1 font-semibold">k+</span>
                    </div>
                    <p className="text-xs md:text-sm font-semibold text-white/80 uppercase tracking-widest z-10 mt-1">Hours Saved</p>
                </div>

                {/* Card 2: Client Revenue */}
                <div className="relative overflow-hidden rounded-xl md:rounded-2xl bg-brand-black/60 border border-white/15 p-4 md:p-8 flex flex-col items-center justify-center gap-2 md:gap-3 group hover:bg-brand-black/80 transition-all duration-500 hover:border-brand-cyan/40 hover:shadow-[0_0_40px_-5px_rgba(6,182,212,0.4)]">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="p-2 md:p-3 rounded-full bg-brand-cyan/20 mb-1 md:mb-2 group-hover:scale-110 transition-transform duration-500 border border-brand-cyan/30">
                        <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-brand-cyan" />
                    </div>

                    <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white flex items-baseline tracking-tight z-10">
                        <span className="text-brand-cyan text-3xl md:text-4xl lg:text-5xl mr-1 font-semibold">$</span>
                        <NumberTicker value={2} delay={0.4} />
                        <span className="text-brand-cyan text-3xl md:text-4xl lg:text-5xl ml-1 font-semibold">M+</span>
                    </div>
                    <p className="text-xs md:text-sm font-semibold text-white/80 uppercase tracking-widest z-10 mt-1">Client Revenue</p>
                </div>

                {/* Card 3: Efficiency Boost */}
                <div className="relative overflow-hidden rounded-xl md:rounded-2xl bg-brand-black/60 border border-white/15 p-4 md:p-8 flex flex-col items-center justify-center gap-2 md:gap-3 group hover:bg-brand-black/80 transition-all duration-500 hover:border-brand-orange/40 hover:shadow-[0_0_40px_-5px_rgba(249,115,22,0.4)]">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="p-2 md:p-3 rounded-full bg-brand-orange/20 mb-1 md:mb-2 group-hover:scale-110 transition-transform duration-500 border border-brand-orange/30">
                        <Zap className="w-5 h-5 md:w-6 md:h-6 text-brand-orange" />
                    </div>

                    <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white flex items-baseline tracking-tight z-10">
                        <NumberTicker value={10} delay={0.6} />
                        <span className="text-brand-orange text-3xl md:text-4xl lg:text-5xl ml-1 font-semibold">x</span>
                    </div>
                    <p className="text-xs md:text-sm font-semibold text-white/80 uppercase tracking-widest z-10 mt-1">Efficiency Boost</p>
                </div>
            </div>
        </div>
    );
};

export default StatsCard;
