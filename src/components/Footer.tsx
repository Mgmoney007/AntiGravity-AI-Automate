import React from 'react';
import Link from 'next/link';

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer className="py-12 border-t border-glass-border bg-bg-page/50 backdrop-blur-sm text-sm text-text-secondary">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2 group">
                    <div className="h-6 w-6 bg-gradient-to-tr from-primary to-brand-cyan rounded-md flex items-center justify-center text-white font-bold text-xs shadow-glow group-hover:rotate-12 transition-transform">
                        A
                    </div>
                    <span className="font-bold text-white tracking-tight">AI AUTOMATE</span>
                </div>

                <div className="flex gap-8">
                    <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
                    <Link href="#" className="hover:text-primary transition-colors">Terms</Link>
                    <Link href="#" className="hover:text-primary transition-colors">Twitter</Link>
                    <Link href="#" className="hover:text-primary transition-colors">LinkedIn</Link>
                </div>

                <div>
                    &copy; {year} AI AUTOMATE. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
