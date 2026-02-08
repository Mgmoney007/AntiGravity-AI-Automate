"use client";

import React, { useState, useEffect } from "react";

// ============================================================================
// DESIGN SYSTEM (Extracted from reference dashboard)
// ============================================================================
// Colors:
//   - Background: Deep navy (#070b14)
//   - Card Surface: Slightly lighter navy (#0d1424)
//   - Card Border: Subtle blue-tinted (#1e3a5f at 30%)
//   - Accent Cyan: #06b6d4 (primary highlights, interactive)
//   - Accent Green: #22c55e (positive/optimized)
//   - Accent Red/Coral: #ef4444 (loss/warning)
//   - Muted Text: #64748b → #94a3b8 (slate range)
// Typography:
//   - Headings: Bold, white, tracking tight
//   - Labels: Muted slate, smaller size
//   - Metrics: Large, bold, accent-colored
// Depth:
//   - Cards use subtle borders, not shadows
//   - Soft glows on interactive/important elements
// Motion:
//   - Smooth, restrained (ease-out, no bounce)
//   - Counter feels "financial" and controlled
// ============================================================================

// --- CONSTANTS & CONFIGURATION ---

const ANIMATION_DELAY_MS = 2500;
const ANIMATION_DURATION_MS = 2000;

const INDUSTRY_BENCHMARKS = {
    ecommerce: { label: "E-Commerce", conversionRate: 0.018 },
    saas: { label: "SaaS / Software", conversionRate: 0.022 },
    agency: { label: "Agency / Services", conversionRate: 0.025 },
    local: { label: "Local Business", conversionRate: 0.03 },
} as const;

type IndustryKey = keyof typeof INDUSTRY_BENCHMARKS;

const OPTIMIZATION_LIFT = 0.4;

// --- COMPONENT ---

export default function RevenueLeakSimulator() {
    const [visitors, setVisitors] = useState<number>(15000);
    const [orderValue, setOrderValue] = useState<number>(150);
    const [industry, setIndustry] = useState<IndustryKey>("ecommerce");
    const [hasAnimationStarted, setHasAnimationStarted] = useState(false);

    // --- CALCULATIONS ---
    const currentConversionRate = INDUSTRY_BENCHMARKS[industry].conversionRate;
    const currentRevenue = Math.round(visitors * currentConversionRate * orderValue);
    const optimizedRevenue = Math.round(currentRevenue * (1 + OPTIMIZATION_LIFT));
    const actualLostRevenue = optimizedRevenue - currentRevenue;

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        }).format(val);

    // --- ANIMATION EFFECTS ---
    const lossValueRef = React.useRef<HTMLDivElement>(null);

    // --- ANIMATION EFFECTS ---
    useEffect(() => {
        const timer = setTimeout(() => setHasAnimationStarted(true), ANIMATION_DELAY_MS);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!hasAnimationStarted) return;

        let startTime: number | null = null;
        let animationFrameId: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / ANIMATION_DURATION_MS, 1);
            const easeOut = 1 - Math.pow(1 - percentage, 3);

            if (lossValueRef.current) {
                lossValueRef.current.textContent = formatCurrency(Math.floor(actualLostRevenue * easeOut));
            }

            if (progress < ANIMATION_DURATION_MS) {
                animationFrameId = requestAnimationFrame(animate);
            } else {
                if (lossValueRef.current) {
                    lossValueRef.current.textContent = formatCurrency(actualLostRevenue);
                }
            }
        };

        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, [hasAnimationStarted, actualLostRevenue]);

    // --- INLINE STYLES (following reference design system) ---
    const styles = {
        // Page container - deep navy background
        container: {
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "3rem 1.5rem",
            backgroundColor: "#070b14",
            fontFamily: "'Inter', system-ui, sans-serif",
            color: "#e2e8f0",
        } as React.CSSProperties,

        // Header section
        header: {
            textAlign: "center" as const,
            marginBottom: "3rem",
        },
        headline: {
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 700,
            color: "#ffffff",
            marginBottom: "1rem",
            letterSpacing: "-0.02em",
        },
        subheadline: {
            fontSize: "1.125rem",
            color: "#94a3b8",
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: 1.6,
        },

        // Main dashboard card
        dashboardCard: {
            backgroundColor: "#0d1424",
            border: "1px solid rgba(30, 58, 95, 0.4)",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 0 60px rgba(6, 182, 212, 0.03)",
        },

        // Dashboard title bar
        titleBar: {
            padding: "1.25rem 1.5rem",
            borderBottom: "1px solid rgba(30, 58, 95, 0.4)",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
        },
        titleDot: {
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: "#06b6d4",
            boxShadow: "0 0 8px rgba(6, 182, 212, 0.6)",
        },
        titleText: {
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "#64748b",
            textTransform: "uppercase" as const,
            letterSpacing: "0.1em",
        },

        // Grid layout
        grid: {
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "0",
        },

        // Panel base
        panel: {
            padding: "1.5rem",
            borderBottom: "1px solid rgba(30, 58, 95, 0.4)",
        },

        // Left panel (inputs)
        inputPanel: {
            backgroundColor: "rgba(13, 20, 36, 0.5)",
        },

        // Center panel (truth)
        truthPanel: {
            backgroundColor: "rgba(13, 20, 36, 0.3)",
        },

        // Right panel (pain/loss)
        painPanel: {
            backgroundColor: "rgba(239, 68, 68, 0.03)",
            position: "relative" as const,
        },

        // Input group
        inputGroup: {
            marginBottom: "1.75rem",
        },
        inputLabel: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: "0.75rem",
        },
        inputLabelText: {
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "#e2e8f0",
        },
        inputValue: {
            fontSize: "0.875rem",
            fontFamily: "'JetBrains Mono', monospace",
            color: "#06b6d4",
            fontWeight: 600,
        },
        inputHelper: {
            fontSize: "0.75rem",
            color: "#64748b",
            marginTop: "0.5rem",
        },

        // Slider styling
        slider: {
            width: "100%",
            height: "6px",
            borderRadius: "3px",
            background: "linear-gradient(90deg, #1e3a5f 0%, #06b6d4 100%)",
            outline: "none",
            cursor: "pointer",
            appearance: "none" as const,
            WebkitAppearance: "none" as const,
        },

        // Select styling
        select: {
            width: "100%",
            padding: "0.75rem 1rem",
            backgroundColor: "#0d1424",
            border: "1px solid rgba(30, 58, 95, 0.6)",
            borderRadius: "8px",
            color: "#e2e8f0",
            fontSize: "0.875rem",
            cursor: "pointer",
            outline: "none",
            transition: "border-color 0.2s ease",
        },

        // Metric display
        metricGroup: {
            marginBottom: "2rem",
        },
        metricLabel: {
            fontSize: "0.8125rem",
            color: "#64748b",
            marginBottom: "0.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
        },
        metricValue: {
            fontSize: "2rem",
            fontWeight: 700,
            fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: "-0.02em",
        },
        currentValue: {
            color: "#94a3b8",
        },
        optimizedValue: {
            color: "#22c55e",
            textShadow: "0 0 20px rgba(34, 197, 94, 0.3)",
        },

        // Badge
        badge: {
            display: "inline-flex",
            alignItems: "center",
            padding: "0.25rem 0.5rem",
            backgroundColor: "rgba(34, 197, 94, 0.1)",
            border: "1px solid rgba(34, 197, 94, 0.2)",
            borderRadius: "4px",
            fontSize: "0.625rem",
            fontWeight: 600,
            color: "#22c55e",
            textTransform: "uppercase" as const,
            letterSpacing: "0.05em",
        },

        // Loss counter (pain zone)
        lossPanelInner: {
            textAlign: "center" as const,
            padding: "1rem 0",
        },
        lossLabel: {
            fontSize: "0.8125rem",
            fontWeight: 500,
            color: "#f87171",
            textTransform: "uppercase" as const,
            letterSpacing: "0.05em",
            marginBottom: "0.75rem",
        },
        lossValue: {
            fontSize: "clamp(2.5rem, 6vw, 3.5rem)",
            fontWeight: 800,
            fontFamily: "'JetBrains Mono', monospace",
            color: "#ef4444",
            textShadow: "0 0 40px rgba(239, 68, 68, 0.4)",
            letterSpacing: "-0.02em",
        },
        lossHelper: {
            fontSize: "0.6875rem",
            color: "#64748b",
            marginTop: "0.75rem",
        },

        // Bottom CTA bar
        ctaBar: {
            padding: "1.5rem",
            borderTop: "1px solid rgba(30, 58, 95, 0.4)",
            display: "flex",
            flexDirection: "column" as const,
            alignItems: "center",
            gap: "1rem",
            backgroundColor: "#0d1424",
        },
        ctaButton: {
            padding: "1rem 2rem",
            backgroundColor: "#06b6d4",
            color: "#0d1424",
            fontWeight: 700,
            fontSize: "0.9375rem",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "all 0.2s ease",
            boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)",
        },
        ctaLink: {
            fontSize: "0.875rem",
            color: "#64748b",
            textDecoration: "underline",
            textUnderlineOffset: "4px",
            cursor: "pointer",
            transition: "color 0.2s ease",
        },
    };

    return (
        <section style={styles.container}>
            {/* --- HEADER --- */}
            <div style={styles.header}>
                <h2 style={styles.headline}>Your website is leaking revenue.</h2>
                <p style={styles.subheadline}>
                    See how much money your website is losing—and what happens when it&apos;s built to convert.
                </p>
            </div>

            {/* --- DASHBOARD CARD --- */}
            <div style={styles.dashboardCard}>
                {/* Title Bar */}
                <div style={styles.titleBar}>
                    <div style={styles.titleDot} />
                    <span style={styles.titleText}>Revenue Leak Simulator</span>
                </div>

                {/* Main Grid */}
                <div style={styles.grid}>
                    {/* --- LEFT PANEL: INPUTS --- */}
                    <div style={{ ...styles.panel, ...styles.inputPanel }}>
                        {/* Visitors */}
                        <div style={styles.inputGroup}>
                            <div style={styles.inputLabel}>
                                <span style={styles.inputLabelText}>Monthly visitors</span>
                                <span style={styles.inputValue}>{visitors.toLocaleString()}</span>
                            </div>
                            <input
                                type="range"
                                min="1000"
                                max="100000"
                                step="1000"
                                value={visitors}
                                onChange={(e) => setVisitors(Number(e.target.value))}
                                style={styles.slider}
                            />
                            <p style={styles.inputHelper}>Your average monthly website traffic</p>
                        </div>

                        {/* Order Value */}
                        <div style={styles.inputGroup}>
                            <div style={styles.inputLabel}>
                                <span style={styles.inputLabelText}>Avg order / lead value</span>
                                <span style={styles.inputValue}>${orderValue}</span>
                            </div>
                            <input
                                type="range"
                                min="10"
                                max="5000"
                                step="10"
                                value={orderValue}
                                onChange={(e) => setOrderValue(Number(e.target.value))}
                                style={styles.slider}
                            />
                            <p style={styles.inputHelper}>What one conversion is worth to you</p>
                        </div>

                        {/* Industry */}
                        <div style={styles.inputGroup}>
                            <div style={styles.inputLabel}>
                                <span style={styles.inputLabelText}>Industry</span>
                            </div>
                            <select
                                value={industry}
                                onChange={(e) => setIndustry(e.target.value as IndustryKey)}
                                style={styles.select}
                            >
                                {Object.entries(INDUSTRY_BENCHMARKS).map(([key, data]) => (
                                    <option key={key} value={key}>
                                        {data.label}
                                    </option>
                                ))}
                            </select>
                            <p style={styles.inputHelper}>Used to apply conservative benchmarks</p>
                        </div>
                    </div>

                    {/* --- CENTER PANEL: TRUTH --- */}
                    <div style={{ ...styles.panel, ...styles.truthPanel }}>
                        {/* Current */}
                        <div style={styles.metricGroup}>
                            <p style={styles.metricLabel}>Revenue with your current website</p>
                            <div style={{ ...styles.metricValue, ...styles.currentValue }}>
                                {formatCurrency(currentRevenue)}
                            </div>
                        </div>

                        {/* Optimized */}
                        <div style={styles.metricGroup}>
                            <p style={styles.metricLabel}>
                                Revenue with a conversion-focused redesign
                                <span style={styles.badge}>Optimized</span>
                            </p>
                            <div style={{ ...styles.metricValue, ...styles.optimizedValue }}>
                                {formatCurrency(optimizedRevenue)}
                            </div>
                        </div>
                    </div>

                    {/* --- RIGHT PANEL: PAIN --- */}
                    <div style={{ ...styles.panel, ...styles.painPanel }}>
                        <div style={styles.lossPanelInner}>
                            <p style={styles.lossLabel}>Estimated revenue lost this month</p>
                            <div style={styles.lossValue} ref={lossValueRef}>
                                {!hasAnimationStarted ? "$0" : formatCurrency(actualLostRevenue)}
                            </div>
                            <p style={styles.lossHelper}>Based on conservative industry benchmarks</p>
                        </div>
                    </div>
                </div>

                {/* --- BOTTOM CTA BAR --- */}
                <div style={styles.ctaBar}>
                    <button
                        style={styles.ctaButton}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#0891b2";
                            e.currentTarget.style.boxShadow = "0 0 30px rgba(6, 182, 212, 0.5)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "#06b6d4";
                            e.currentTarget.style.boxShadow = "0 0 20px rgba(6, 182, 212, 0.3)";
                        }}
                    >
                        See how much revenue we can recover
                    </button>
                    <a
                        href="#"
                        style={styles.ctaLink}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#94a3b8")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
                    >
                        Get a free conversion teardown
                    </a>
                </div>
            </div>

            {/* --- CUSTOM SLIDER STYLES --- */}
            <style>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #06b6d4;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(6, 182, 212, 0.6);
          border: 2px solid #0d1424;
          transition: box-shadow 0.2s ease;
        }
        input[type="range"]::-webkit-slider-thumb:hover {
          box-shadow: 0 0 16px rgba(6, 182, 212, 0.8);
        }
        input[type="range"]::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #06b6d4;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(6, 182, 212, 0.6);
          border: 2px solid #0d1424;
        }
        select:focus {
          border-color: rgba(6, 182, 212, 0.6);
        }
        
        /* Responsive grid for larger screens */
        @media (min-width: 1024px) {
          .simulator-grid {
            grid-template-columns: 1fr 1fr 1fr !important;
          }
        }
      `}</style>
        </section>
    );
}
