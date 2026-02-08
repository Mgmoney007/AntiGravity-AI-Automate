import { Marquee } from "@/components/ui/marquee";
import { PremiumCard } from '../ui/PremiumCard';

const testimonials = [
    {
        quote: "AI AUTOMATE completely automated our client onboarding. We save 20 hours a week.",
        author: "Alex M.",
        role: "Founder, GrowthAgency"
    },
    {
        quote: "The customer support bot handles 80% of our tickets now. Costs are down, satisfaction is up.",
        author: "Sarah J.",
        role: "COO, E-com Giant"
    },
    {
        quote: "Best investment we made this year. Our outreach is now fully autopilot and booking 10x more calls.",
        author: "Marcus R.",
        role: "Director of Sales"
    },
    {
        quote: "We went from chaos to complete clarity. The AI workflows just work.",
        author: "David L.",
        role: "VP of Operations"
    },
    {
        quote: "ROI was insane. Paid for itself in the first month.",
        author: "Michelle T.",
        role: "CEO, TechStart"
    },
    {
        quote: "Our team finally has time to focus on strategy instead of repetitive tasks.",
        author: "James K.",
        role: "Head of Marketing"
    }
];

// Split testimonials into two rows for the marquee effect
const firstRow = testimonials.slice(0, testimonials.length / 2);
const secondRow = testimonials.slice(testimonials.length / 2);

function TestimonialCard({ quote, author, role }: { quote: string; author: string; role: string }) {
    return (
        <PremiumCard className="w-[350px] flex-shrink-0 flex flex-col h-full justify-between">
            <div>
                <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                        <span key={j} className="text-brand-orange text-sm">★</span>
                    ))}
                </div>
                <p className="text-lg mb-6 text-white">"{quote}"</p>
            </div>
            <div>
                <div className="font-bold text-white">{author}</div>
                <div className="text-sm text-text-secondary">{role}</div>
            </div>
        </PremiumCard>
    );
}

export default function Testimonials() {
    return (
        <section className="py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 mb-12">
                <h2 className="section-heading text-center">
                    Trusted by Industry Leaders
                </h2>
            </div>

            <div className="relative">
                {/* Gradient fade edges */}
                <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-brand-black to-transparent z-10" />
                <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-brand-black to-transparent z-10" />

                {/* First row - scrolls left */}
                <Marquee pauseOnHover className="[--duration:40s] mb-6">
                    {firstRow.map((t, i) => (
                        <TestimonialCard key={i} {...t} />
                    ))}
                </Marquee>

                {/* Second row - scrolls right (reversed) */}
                <Marquee pauseOnHover reverse className="[--duration:40s]">
                    {secondRow.map((t, i) => (
                        <TestimonialCard key={i} {...t} />
                    ))}
                </Marquee>
            </div>
        </section>
    );
}
