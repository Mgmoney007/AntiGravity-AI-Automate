import React from 'react';
import Button from '../ui/Button';

interface FinalCTAProps {
    theme?: 'dark' | 'light';
}

const FinalCTA = ({ theme = 'dark' }: FinalCTAProps) => {
    const isLight = theme === 'light';

    return (
        <section className="py-32 relative overflow-hidden">
            {/* Glow Background */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[400px] blur-[120px] rounded-full pointer-events-none bg-emerald-500/20" />

            <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                <h2 className="section-heading mb-8">
                    Ready to <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Automate Your Empire?</span>
                </h2>
                <p className="section-subheading mx-auto mb-12">
                    Stop trading time for money. Join the businesses running on autopilot with AI AUTOMATE.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button variant="primary" size="lg" className="w-full sm:w-auto">
                        Book Strategy Call
                    </Button>
                    <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                        View Case Studies
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default FinalCTA;
