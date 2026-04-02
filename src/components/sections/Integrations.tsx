"use client";

import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { ShimmerButton } from '../ui/shimmer-button';
import IntegrationDiagram from './IntegrationDiagram';

const Integrations = () => {
    return (
        <section id="process" className="py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                {/* Bento Grid Container */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">

                    {/* Left Side - Text Content */}
                    <motion.div
                        className="flex flex-col justify-center p-8 lg:p-12 items-center lg:items-start text-center lg:text-left"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h2 className="section-heading mb-6">
                            Integrate with your current Stack
                        </h2>
                        <p className="section-subheading mb-8">
                            Supports <span className="text-white font-semibold">100+ integrations</span> and counting.
                            Connect with your favorite tools seamlessly.
                        </p>

                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 mb-10 text-left">
                            {[
                                "Google Drive",
                                "WhatsApp",
                                "Messenger",
                                "Notion",
                                "Slack",
                                "Zapier"
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-center gap-4">
                                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-950/40 flex items-center justify-center border border-blue-900/50">
                                        <Check className="w-4 h-4 text-blue-500" strokeWidth={3} />
                                    </div>
                                    <span className="text-lg text-slate-300 font-medium tracking-wide">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>



                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-75 transition duration-500"></div>
                            <ShimmerButton
                                className="shadow-2xl relative z-10 w-full sm:w-auto"
                                background="linear-gradient(90deg, #0f172a 0%, #1e293b 100%)"
                                shimmerColor="#22d3ee"
                                shimmerSize="0.1em"
                                borderRadius="9999px"
                            >
                                <span className="whitespace-pre-wrap text-center text-base font-semibold leading-none tracking-tight text-white flex items-center gap-2">
                                    Explore All Integrations
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </ShimmerButton>
                        </div>
                    </motion.div>

                    {/* Right Side - Integration Hub Visualization */}
                    <motion.div
                        className="relative bg-[#0B0F17] backdrop-blur-xl rounded-3xl min-h-[500px] lg:min-h-[600px] overflow-hidden border border-white/5 shadow-2xl flex items-center justify-center"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Integration Diagram */}
                        <div className="absolute inset-0 flex items-center justify-center [&>canvas]:w-[125%] [&>canvas]:h-auto [&>canvas]:max-w-none">
                            <IntegrationDiagram />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Integrations;
