"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Button from './ui/Button';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Layers, Menu, X } from 'lucide-react';

const HeroHeader = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [hidden, setHidden] = useState(false);

    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
            setMobileMenuOpen(false);
        } else {
            setHidden(false);
        }
    });

    return (
        <motion.header
            variants={{
                visible: { y: 0, opacity: 1 },
                hidden: { y: "-140%", opacity: 0 },
            }}
            initial="hidden"
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center px-4"
        >
            <nav className="bg-bg-page/80 backdrop-blur-md border border-glass-border rounded-full px-3 md:px-[12px] py-2 flex items-center gap-4 md:gap-8 lg:gap-12 w-full max-w-[1000px] justify-between shadow-2xl">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="h-8 w-8 bg-gradient-to-tr from-primary to-brand-cyan rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shadow-glow">
                        <Layers className="text-white w-5 h-5" />
                    </div>
                    <span className="font-bold text-base md:text-lg text-white tracking-tight group-hover:text-cyan-400 transition-colors">
                        AI AUTOMATE
                    </span>
                </Link>

                {/* Links (Desktop) */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="#services" className="text-sm font-medium text-white hover:text-cyan-400 hover:underline transition-all">Services</Link>
                    <Link href="#process" className="text-sm font-medium text-white hover:text-cyan-400 hover:underline transition-all">Process</Link>
                    <Link href="#case-studies" className="text-sm font-medium text-white hover:text-cyan-400 hover:underline transition-all">Case Studies</Link>
                </div>

                {/* CTAs (Desktop) */}
                <div className="hidden md:flex items-center gap-2">
                    <Button variant="primary" size="sm" className="rounded-full px-5 inline-flex whitespace-nowrap">
                        Book Audit
                    </Button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden p-2 text-white hover:text-cyan-400 transition-colors"
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </nav>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-4 right-4 mt-2 bg-bg-page/95 backdrop-blur-xl border border-glass-border rounded-2xl p-4 shadow-2xl md:hidden"
                    >
                        <div className="flex flex-col gap-3">
                            <Link href="#services" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium text-white hover:text-cyan-400 py-2 transition-all">Services</Link>
                            <Link href="#process" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium text-white hover:text-cyan-400 py-2 transition-all">Process</Link>
                            <Link href="#case-studies" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium text-white hover:text-cyan-400 py-2 transition-all">Case Studies</Link>
                            <div className="pt-2 border-t border-white/10">
                                <Button variant="primary" size="md" className="w-full rounded-full">
                                    Book Audit
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

export default HeroHeader;
