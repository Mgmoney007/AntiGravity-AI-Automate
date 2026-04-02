"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccordionItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
    index: number;
}

const AccordionItem = ({ question, answer, isOpen, onClick, index }: AccordionItemProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className={cn(
                "relative group rounded-2xl overflow-hidden transition-all duration-500",
                "backdrop-blur-sm border",
                isOpen
                    ? "bg-gradient-to-br from-[#0B152A] to-[#111A31] border-blue-500/50 shadow-[0_0_40px_rgba(59,130,246,0.2)]"
                    : "bg-slate-900/50 border-white/10 hover:border-white/20 hover:bg-slate-900/80"
            )}
        >
            {/* Gradient glow on hover/open */}
            <div className={cn(
                "absolute inset-0 transition-opacity duration-500 pointer-events-none",
                "bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10",
                isOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            )} />

            <button
                onClick={onClick}
                className="relative w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded-2xl"
                aria-expanded={isOpen}
            >
                <span className={cn(
                    "text-lg font-medium transition-colors duration-500 pr-4",
                    isOpen ? "text-blue-300" : "text-slate-200 group-hover:text-white"
                )}>
                    {question}
                </span>

                <span className={cn(
                    "flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500",
                    isOpen
                        ? "bg-blue-500 text-white rotate-0 shadow-[0_0_15px_rgba(59,130,246,0.6)]"
                        : "bg-white/5 text-slate-400 group-hover:bg-white/10 group-hover:text-white"
                )}>
                    <AnimatePresence mode="wait" initial={false}>
                        {isOpen ? (
                            <motion.div
                                key="minus"
                                initial={{ scale: 0, rotate: -90 }}
                                animate={{ scale: 1, rotate: 0 }}
                                exit={{ scale: 0, rotate: 90 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Minus className="w-5 h-5" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="plus"
                                initial={{ scale: 0, rotate: 90 }}
                                animate={{ scale: 1, rotate: 0 }}
                                exit={{ scale: 0, rotate: -90 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Plus className="w-5 h-5" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </span>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                        className="overflow-hidden"
                    >
                        <motion.div 
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                            className="px-6 pb-6"
                        >
                            <div className="h-px bg-gradient-to-r from-blue-500/30 via-cyan-500/20 to-transparent mb-5" />
                            <p className="text-slate-300 leading-relaxed text-[1.05rem]">
                                {answer}
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

interface AccordionProps {
    items: { question: string; answer: string }[];
    className?: string;
    allowMultiple?: boolean;
}

const Accordion = ({ items, className, allowMultiple = false }: AccordionProps) => {
    const [openIndices, setOpenIndices] = useState<number[]>([0]);

    const handleClick = (index: number) => {
        if (allowMultiple) {
            setOpenIndices(prev =>
                prev.includes(index)
                    ? prev.filter(i => i !== index)
                    : [...prev, index]
            );
        } else {
            setOpenIndices(prev =>
                prev.includes(index) ? [] : [index]
            );
        }
    };

    const isOpen = (index: number) => openIndices.includes(index);

    return (
        <div className={cn("w-full max-w-3xl mx-auto space-y-4", className)}>
            {items.map((item, index) => (
                <AccordionItem
                    key={index}
                    index={index}
                    question={item.question}
                    answer={item.answer}
                    isOpen={isOpen(index)}
                    onClick={() => handleClick(index)}
                />
            ))}
        </div>
    );
};

export default Accordion;
