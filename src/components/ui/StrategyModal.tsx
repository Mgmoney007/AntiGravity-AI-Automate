"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Phone, ArrowRight } from 'lucide-react';
import { GlobePulse } from './globe-pulse';
import { ShimmerButton } from './shimmer-button';

interface StrategyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const StrategyModal = ({ isOpen, onClose }: StrategyModalProps) => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Modal Wrapper */}
                    <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
                        <motion.div
                            className="w-full max-w-5xl bg-[#080B13]/90 backdrop-blur-2xl border border-white/10 rounded-3xl md:rounded-[2rem] shadow-2xl shadow-cyan-500/10 overflow-hidden pointer-events-auto relative"
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors z-20"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                {/* Left Side: Form */}
                                <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center relative">
                                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500/5 to-purple-600/5 pointer-events-none" />
                                    
                                    <div className="relative z-10">
                                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                                            Automate Your <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Empire</span>
                                        </h2>
                                        <p className="text-slate-400 mb-8 text-base md:text-lg">
                                            Enter your details below to secure a 1-on-1 strategy call with our automation experts.
                                        </p>

                                        <form onSubmit={handleSubmit} className="space-y-5">
                                            <div className="space-y-1.5">
                                                <label className="text-sm font-medium text-slate-300 ml-1">Full Name</label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                        <User className="h-5 w-5 text-slate-500" />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        required
                                                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all font-medium"
                                                        placeholder="John Doe"
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-1.5">
                                                <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                        <Mail className="h-5 w-5 text-slate-500" />
                                                    </div>
                                                    <input
                                                        type="email"
                                                        required
                                                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all font-medium"
                                                        placeholder="john@example.com"
                                                        value={formData.email}
                                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-1.5">
                                                <label className="text-sm font-medium text-slate-300 ml-1">Phone Number</label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                        <Phone className="h-5 w-5 text-slate-500" />
                                                    </div>
                                                    <input
                                                        type="tel"
                                                        required
                                                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all font-medium"
                                                        placeholder="+1 (555) 000-0000"
                                                        value={formData.phone}
                                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    />
                                                </div>
                                            </div>

                                            <div className="pt-4">
                                                <ShimmerButton
                                                    type="submit"
                                                    className="w-full shadow-2xl py-4"
                                                    background="linear-gradient(to right, #0891b2, #7c3aed)"
                                                >
                                                    <span className="whitespace-pre-wrap text-center text-lg font-bold leading-none tracking-tight text-white flex items-center gap-2">
                                                        Confirm Strategy Call
                                                        <ArrowRight className="w-5 h-5" />
                                                    </span>
                                                </ShimmerButton>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                {/* Right Side: Visual Globe */}
                                <div className="hidden lg:flex items-center justify-center p-8 bg-black/40 border-l border-white/5 relative overflow-hidden">
                                    <GlobePulse className="w-full max-w-[450px]" />
                                    
                                    {/* Gradient mist overlays to blend globe bounds */}
                                    <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-cyan-500/20 blur-3xl rounded-full mix-blend-screen pointer-events-none" />
                                    <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-600/20 blur-3xl rounded-full mix-blend-screen pointer-events-none" />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};
