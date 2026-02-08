import React from 'react';
import { Bot, Mail, Database, PenTool, Search, Brain } from 'lucide-react';
import { PremiumCard } from '../ui/PremiumCard';

const features = [
    {
        icon: Bot,
        title: "AI Customer Support",
        desc: "24/7 intelligent chatbots that handle inquiries and bookings."
    },
    {
        icon: Mail,
        title: "Automated Outreach",
        desc: "Personalized email and LinkedIn sequences at scale."
    },
    {
        icon: Database,
        title: "Data Processing",
        desc: "Automate data entry, cleaning, and analysis workflows."
    },
    {
        icon: PenTool,
        title: "Content Systems",
        desc: "End-to-end content generation and publishing pipelines."
    },
    {
        icon: Search,
        title: "Workflow Audits",
        desc: "We identify bottlenecks and design efficiency roadmaps."
    },
    {
        icon: Brain,
        title: "Custom AI Agents",
        desc: "Bespoke LLM solutions tailored to your unique specific needs."
    }
];

export default function FeatureGrid() {
    return (
        <section id="features" className="py-24 relative">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="section-heading mb-6">
                        Engineered for <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Scale</span>
                    </h2>
                    <p className="section-subheading mx-auto">
                        Stop relying on manual busywork. AI AUTOMATE integrates intelligent agents into your business to automate operations and drive growth.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feat, i) => {
                        // Alternating border colors matching page theme
                        const borderColors = [
                            '#10b981', // emerald-500
                            '#8b5cf6', // violet-500
                            '#06b6d4', // cyan-500
                        ];
                        const borderColor = borderColors[i % borderColors.length];

                        return (
                            <PremiumCard
                                key={i}
                                className="flex flex-col items-start h-full"
                                borderColor={borderColor}
                                glowColor={borderColor}
                            >
                                <div className="h-12 w-12 rounded-lg flex items-center justify-center mb-6 bg-brand-purple/10 group-hover:scale-110 transition-transform duration-300">
                                    <feat.icon className="text-brand-purple w-6 h-6" />
                                </div>
                                <h3 className="card-title mb-3">{feat.title}</h3>
                                <p className="card-description">{feat.desc}</p>
                            </PremiumCard>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
