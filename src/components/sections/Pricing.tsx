import { Check } from 'lucide-react';
import { ShineBorder } from '../ui/shine-border';
import { ShimmerButton } from '../ui/shimmer-button';

const plans = [
    {
        name: "Starter",
        price: "$19",
        description: "Ideal for crypto newcomers",
        features: ["Track 5 tokens", "Limited UGC avatars", "Generate unlimited viral hooks"],
        cta: "Start Tracking",
        popular: false
    },
    {
        name: "Growth",
        price: "$49",
        description: "Built for serious crypto investors",
        features: ["Monitor up to 50 tokens", "Access pro analytics & charts", "DeFi + NFT insights"],
        cta: "Upgrade Now",
        popular: true
    },
    {
        name: "Scale",
        price: "$95",
        description: "Best for crypto power users",
        features: ["Unlimited token tracking", "Full suite of advanced tools", "Whale wallet alerts & insights"],
        cta: "Go Pro",
        popular: false
    }
];

export default function Pricing() {

    return (
        <section id="pricing" className="py-24 relative bg-black">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="section-heading mb-6">
                        Pricing
                    </h2>
                    <p className="section-subheading mx-auto">Choose the plan that fits your trading style.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto pt-8">
                    {plans.map((plan, i) => (
                        <div key={i} className={`relative flex flex-col h-full ${plan.popular ? 'md:-mt-8 md:mb-8 z-10' : ''}`}>
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                                    <div className="bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-bold px-6 py-1.5 rounded-full shadow-[0_0_20px_rgba(79,70,229,0.5)] border border-white/20">
                                        Popular
                                    </div>
                                </div>
                            )}

                            <div className="relative group h-full flex flex-col bg-slate-950/50 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 p-8">
                                <ShineBorder
                                    className="!absolute inset-0 !w-full !h-full !p-[1px] !rounded-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                                    shineColor={plan.popular ? ["#A07CFE", "#FE8FB5", "#FFBE7B"] : ["#3b82f6", "#06b6d4", "#22c55e"]}
                                />

                                <div className="flex flex-col items-center w-full relative z-10 h-full">
                                    <h3 className="text-2xl font-medium text-slate-200 mb-2">{plan.name}</h3>
                                    <div className="flex items-baseline justify-center mb-2">
                                        <span className="text-6xl font-bold text-white tracking-tighter">{plan.price}</span>
                                        <span className="text-slate-400 ml-2 text-lg">/month</span>
                                    </div>
                                    <p className="text-slate-400 mb-8">{plan.description}</p>

                                    <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-8" />

                                    <ul className="w-full space-y-4 mb-8 flex-grow">
                                        {plan.features.map((feat, j) => (
                                            <li key={j} className="flex items-center gap-3 text-slate-300 justify-start md:justify-start pl-4 md:pl-0">
                                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                                                    <Check className="w-3.5 h-3.5 text-blue-400" />
                                                </div>
                                                <span className="text-left">{feat}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="w-full mt-auto">
                                        <ShimmerButton
                                            className="w-full shadow-2xl"
                                            background={plan.popular ? "linear-gradient(to right, #3b82f6, #6366f1)" : "rgba(30, 41, 59, 1)"}
                                        >
                                            <span className="whitespace-pre-wrap text-center text-lg font-medium leading-none tracking-tight text-white">
                                                {plan.cta}
                                            </span>
                                        </ShimmerButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
