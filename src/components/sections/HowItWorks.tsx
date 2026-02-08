import React from 'react';

const steps = [
    {
        num: "01",
        title: "Audit & Strategy",
        desc: "We analyze your current workflows to identify bottlenecks and high-ROI automation opportunities."
    },
    {
        num: "02",
        title: "Build & Integrate",
        desc: "Our engineers build custom AI agents and connect your existing tools into a seamless ecosystem."
    },
    {
        num: "03",
        title: "Deploy & Scale",
        desc: "Launch your new automated systems and watch your capacity grow without increasing headcount."
    }
];

interface HowItWorksProps {
    theme?: 'dark' | 'light';
}

const HowItWorks = ({ theme = 'dark' }: HowItWorksProps) => {
    const isLight = theme === 'light';

    return (
        <section className={`py-24 relative overflow-hidden ${isLight ? 'bg-white/80 backdrop-blur-md' : 'bg-brand-navy/50 backdrop-blur-sm'}`}>
            {/* Decorative Line */}
            <div className={`absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-purple/20 to-transparent hidden md:block ${isLight ? 'opacity-50' : ''}`} />

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="mb-16">
                    <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isLight ? 'text-brand-black' : 'text-white'}`}>How it Works</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {steps.map((step, i) => (
                        <div key={i} className="relative">
                            <div className={`text-6xl font-bold mb-6 ${isLight ? 'text-brand-purple/10' : 'text-white/5'}`}>{step.num}</div>
                            <h3 className={`text-2xl font-bold mb-4 ${isLight ? 'text-brand-black' : 'text-white'}`}>{step.title}</h3>
                            <p className={`${isLight ? 'text-gray-600' : 'text-text-secondary'} leading-relaxed`}>
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
