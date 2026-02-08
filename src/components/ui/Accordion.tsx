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
                "relative group rounded-2xl overflow-hidden transition-all duration-300",
                "bg-slate-900/50 backdrop-blur-sm border",
                isOpen
                    ? "border-primary/30 shadow-[0_0_30px_rgba(139,92,246,0.15)]"
                    : "border-white/10 hover:border-white/20"
            )}
        >
            {/* Gradient glow on hover/open */}
            <div className={cn(
                "absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none",
                "bg-gradient-to-br from-primary/5 via-transparent to-cyan-500/5",
                (isOpen || "group-hover:opacity-100")
            )} />

            <button
                onClick={onClick}
                className="relative w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded-2xl"
                aria-expanded={isOpen}
            >
                <span className={cn(
                    "text-lg font-medium transition-colors duration-300 pr-4",
                    isOpen ? "text-white" : "text-slate-200 group-hover:text-white"
                )}>
                    {question}
                </span>

                <span className={cn(
                    "flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300",
                    isOpen
                        ? "bg-primary text-white rotate-0"
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
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 pb-5">
                            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4" />
                            <p className="text-slate-400 leading-relaxed">
                                {answer}
                            </p>
                        </div>
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
