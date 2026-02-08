import React from 'react';

interface LogoStripProps {
    theme?: 'dark' | 'light';
}

const LogoStrip = ({ theme = 'dark' }: LogoStripProps) => {
    const logos = ["OpenAI", "Anthropic", "Make", "Zapier", "HubSpot", "Salesforce"];
    const isLight = theme === 'light';

    return (
        <section className="py-16 border-y bg-white/[0.02] border-white/5">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <p className="section-eyebrow text-center">
                    Powering Next-Gen Businesses
                </p>
                <div className="flex flex-wrap justify-center gap-8 md:gap-16 transition-all duration-500 opacity-50 grayscale hover:grayscale-0">
                    {logos.map((logo) => (
                        /* Placeholder used for text logos, in real app these would be SVGs */
                        <div key={logo} className="text-xl md:text-2xl font-bold font-serif text-white">
                            {logo}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LogoStrip;
