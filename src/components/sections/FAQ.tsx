import Accordion from '../ui/Accordion';

const faqs = [
    {
        question: "How quickly can we see results?",
        answer: "Most clients see significant efficiency gains within 2 weeks of deployment. Our 'Audit & Strategy' phase identifies immediate quick wins, while custom agent development typically takes 4-6 weeks."
    },
    {
        question: "Do I need technical expertise to manage the agents?",
        answer: "Not at all. We build 'human-in-the-loop' systems with intuitive dashboards. You simply oversee the output while the AI handles the heavy lifting. We also provide full training and ongoing support."
    },
    {
        question: "Is my data secure?",
        answer: "Absolutely. We prioritize enterprise-grade security. We use local LLMs where possible, or secure private instances (Azure OpenAI / AWS Bedrock) to ensure your proprietary data never trains public models."
    },
    {
        question: "How does the pricing model work?",
        answer: "We operate on a transparent retainer model. 'Core Integration' covers maintenance of existing workflows, while 'Business Autopilot' includes active development of new agents and continuous optimization."
    },
    {
        question: "Can you integrate with my custom internal software?",
        answer: "Yes. Our engineering team specializes in building custom API connectors and scrapers. If it runs on the web or has a database, we can likely automate it."
    }
];

const FAQ = () => {
    return (
        <section className="py-24 relative">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

            <div className="max-w-3xl mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                    <p className="section-eyebrow">
                        Got Questions?
                    </p>
                    <h2 className="section-heading">
                        Frequently Asked Questions
                    </h2>
                </div>
                <Accordion items={faqs} />
            </div>
        </section>
    );
};

export default FAQ;
