"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

export const Component = () => {
    const [count, setCount] = useState(0);

    return (
        <div className={cn("flex flex-col items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/10 glass-panel")}>
            <h1 className="text-2xl font-bold mb-2 text-white">Component Example</h1>
            <h2 className="text-xl font-semibold text-brand-purple">{count}</h2>
            <div className="flex gap-2">
                <button
                    onClick={() => setCount((prev) => prev - 1)}
                    className="px-4 py-2 bg-brand-navy rounded text-white hover:bg-brand-purple transition-colors"
                >
                    -
                </button>
                <button
                    onClick={() => setCount((prev) => prev + 1)}
                    className="px-4 py-2 bg-brand-navy rounded text-white hover:bg-brand-purple transition-colors"
                >
                    +
                </button>
            </div>
        </div>
    );
};
