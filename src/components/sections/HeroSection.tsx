"use client";

import React, { useState } from 'react';
import { StrategyModal } from '../ui/StrategyModal';
import HeroHeadline from '../HeroHeadline';
import StatsCard from '../StatsCard';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { ShimmerButton } from '../ui/shimmer-button';
import { motion, useReducedMotion } from 'framer-motion';
import { Play } from 'lucide-react';

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
    }
};

// Shared orb anchor: right edge, vertically centered, 55% off-canvas
const ORB_SIZE_DESKTOP = 782;   // px — 920 × 0.85
const ORB_SIZE_TABLET  = 578;
const ORB_OFFSET_X     = 0.55; // fraction of orb pushed off the right edge

const OrbSystem = () => {
    const reducedMotion = useReducedMotion();

    // Layer 1 — video orb drift (very slow, independent)
    const videoDrift = reducedMotion ? {} : {
        animate: {
            y: [0, -10, 0],
            scale: [1, .9, 1],
        },
        transition: {
            duration: 38,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror" as const,
        }
    };

    // Layer 2 — PNG ring float (tiny amplitude, different period)
    const ringFloat = reducedMotion ? {} : {
        animate: {
            y: [0, -9, 2, 0],
            x: [0, 3, 0, -2, 0],
        },
        transition: {
            duration: 26,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror" as const,
        }
    };

    const desktopOffset = `${Math.round(ORB_SIZE_DESKTOP * ORB_OFFSET_X)}px`;
    const tabletOffset  = `${Math.round(ORB_SIZE_TABLET  * ORB_OFFSET_X)}px`;

    return (
        // Anchor container — right-edge, aligned with headline
        <div
            className="absolute top-[14%] pointer-events-none"
            style={{ right: `-${desktopOffset}` }}
            aria-hidden="true"
        >
            {/* ── DEPTH LAYER 3 — Atmospheric glow (deepest, static) ── */}
            <div
                className="absolute inset-0 rounded-full"
                style={{
                    width:  ORB_SIZE_DESKTOP,
                    height: ORB_SIZE_DESKTOP,
                    transform: 'translate(-50%, -50%) translateX(8%)',
                    background: 'radial-gradient(ellipse at 60% 50%, rgba(99,102,241,0.28) 0%, rgba(124,58,237,0.12) 35%, rgba(6,182,212,0.06) 60%, transparent 80%)',
                    filter: 'blur(48px)',
                    willChange: 'transform',
                }}
            />

            {/* ── DEPTH LAYER 1 — Animated video orb (atmospheric energy) ── */}
            <motion.div
                style={{
                    width:  ORB_SIZE_DESKTOP,
                    height: ORB_SIZE_DESKTOP,
                    transform: 'translate(-50%, -50%)',
                    mixBlendMode: 'screen',  // applied here so it blends against the page, not its own stacking context
                    willChange: 'transform',
                }}
                {...videoDrift}
            >
                <video
                    src="/circularorb.webm"
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        opacity: 0.75,
                        filter: 'blur(1px) brightness(1.1) saturate(0.9)',
                    }}
                />
            </motion.div>

            {/* ── DEPTH LAYER 2 — PNG structural ring shell ── */}
            <motion.div
                style={{
                    position: 'absolute',
                    width:  ORB_SIZE_DESKTOP,
                    height: ORB_SIZE_DESKTOP,
                    top:  '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%) translate(-1.2%, 0.8%)',
                    willChange: 'transform',
                }}
                {...ringFloat}
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/Orb_image.png"
                    alt=""
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        opacity: 0.88,
                        filter: 'brightness(1.05) contrast(1.08) saturate(0.92)',
                        willChange: 'transform',
                    }}
                />
            </motion.div>

            {/* Tablet responsive overrides via media-query wrapper */}
            <style>{`
                @media (max-width: 1023px) {
                    .orb-anchor {
                        right: -${tabletOffset}px !important;
                    }
                }
            `}</style>
        </div>
    );
};

const HeroSection = () => {
    const [isStrategyModalOpen, setIsStrategyModalOpen] = useState(false);

    return (
        <section className="relative min-h-screen w-full flex flex-col items-center justify-center pt-28 pb-16 px-4 overflow-hidden">

            {/* ── Background layer ── */}
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-radial-vignette opacity-80" />

                {/* Headline ambient purple bloom */}
                <div className="absolute top-[18%] left-1/2 -translate-x-1/2 w-[640px] h-[360px] rounded-full bg-primary/18 blur-[110px] opacity-65" />
                {/* Left edge cool accent */}
                <div className="absolute top-[38%] left-[8%] w-[360px] h-[260px] rounded-full bg-brand-cyan/12 blur-[90px] opacity-55" />

                {/* ── 3-layer orb system — desktop/tablet only ── */}
                <div className="hidden md:block">
                    <OrbSystem />
                </div>

                {/* ── Mobile — minimal background hint only ── */}
                <div className="md:hidden absolute bottom-0 right-0 w-[280px] h-[280px] rounded-full"
                    style={{
                        background: 'radial-gradient(ellipse, rgba(99,102,241,0.18) 0%, transparent 70%)',
                        filter: 'blur(40px)',
                        transform: 'translate(40%, 30%)',
                    }}
                />
            </div>

            {/* ── Hero content ── */}
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
