'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function AnimatedOrb() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePosition({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative w-full h-full aspect-square pointer-events-none select-none">
      <style>{`
        .orb-float {
          animation: orbFloat 22s ease-in-out infinite;
        }
        .spin-slow {
          transform-origin: 500px 500px;
          animation: spin 70s linear infinite;
        }
        .spin-medium {
          transform-origin: 500px 500px;
          animation: spin 35s linear infinite;
        }
        .spin-fast {
          transform-origin: 500px 500px;
          animation: spin 18s linear infinite;
        }
        .spin-slow-r {
          transform-origin: 500px 500px;
          animation: spin-r 80s linear infinite;
        }
        .spin-medium-r {
          transform-origin: 500px 500px;
          animation: spin-r 45s linear infinite;
        }
        @keyframes orbFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-18px); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes spin-r {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .orb-float, .spin-slow, .spin-medium, .spin-fast, .spin-slow-r, .spin-medium-r {
            animation: none !important;
          }
        }
      `}</style>

      <motion.div
        className="w-full h-full orb-float absolute inset-0"
        animate={{ x: mousePosition.x * -12, y: mousePosition.y * -12 }}
        transition={{ type: 'spring', stiffness: 35, damping: 22 }}
      >
        <svg
          viewBox="0 0 1000 1000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            {/* Arc stroke gradients */}
            <linearGradient id="o-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="#22d3ee" stopOpacity="1" />
              <stop offset="70%"  stopColor="#06b6d4" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="o-magenta" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%"   stopColor="#e879f9" stopOpacity="1" />
              <stop offset="70%"  stopColor="#a855f7" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#e879f9" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="o-edge" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#06b6d4" stopOpacity="1" />
              <stop offset="50%"  stopColor="#6366f1" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#d946ef" stopOpacity="1" />
            </linearGradient>

            {/* Soft ambient nebula behind the rings */}
            <radialGradient id="o-nebula" cx="55%" cy="50%" r="45%">
              <stop offset="0%"   stopColor="#4f46e5" stopOpacity="0.35" />
              <stop offset="50%"  stopColor="#7c3aed" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>

            {/* Glow filters — no blend-mode complications */}
            <filter id="glow-lg" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="18" result="b" />
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="glow-md" x="-25%" y="-25%" width="150%" height="150%">
              <feGaussianBlur stdDeviation="9" result="b" />
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="glow-sm" x="-15%" y="-15%" width="130%" height="130%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="nebula-blur" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="60" />
            </filter>
          </defs>

          {/* Ambient nebula glow — soft background haze */}
          <circle
            cx="520" cy="500" r="360"
            fill="url(#o-nebula)"
            filter="url(#nebula-blur)"
          />

          {/* Outer razor ring — thin bright arc, magenta */}
          <g className="spin-slow-r">
            <circle
              cx="500" cy="500" r="455"
              fill="none"
              stroke="url(#o-magenta)"
              strokeWidth="2.5"
              strokeDasharray="300 1560"
              strokeLinecap="round"
              filter="url(#glow-lg)"
              opacity="0.9"
            />
            <circle
              cx="500" cy="500" r="458"
              fill="none"
              stroke="#ffffff"
              strokeWidth="0.8"
              strokeDasharray="60 2000"
              strokeLinecap="round"
              transform="rotate(130 500 500)"
              opacity="0.6"
            />
          </g>

          {/* Primary arc — cyan, dominant ring */}
          <g className="spin-medium">
            <circle
              cx="500" cy="500" r="400"
              fill="none"
              stroke="url(#o-cyan)"
              strokeWidth="5"
              strokeDasharray="480 1712"
              strokeLinecap="round"
              filter="url(#glow-lg)"
              transform="rotate(20 500 500)"
              opacity="0.95"
            />
            {/* Bright core line inside the main arc */}
            <circle
              cx="500" cy="500" r="400"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.2"
              strokeDasharray="200 1900"
              strokeLinecap="round"
              filter="url(#glow-sm)"
              transform="rotate(22 500 500)"
              opacity="0.7"
            />
          </g>

          {/* Mid structural ring — edge gradient */}
          <g className="spin-slow">
            <circle
              cx="500" cy="500" r="348"
              fill="none"
              stroke="url(#o-edge)"
              strokeWidth="3"
              strokeDasharray="220 1985"
              strokeLinecap="round"
              filter="url(#glow-md)"
              transform="rotate(-55 500 500)"
              opacity="0.75"
            />
          </g>

          {/* Fast inner cyan arc */}
          <g className="spin-fast">
            <circle
              cx="500" cy="500" r="290"
              fill="none"
              stroke="url(#o-cyan)"
              strokeWidth="3.5"
              strokeDasharray="150 1672"
              strokeLinecap="round"
              filter="url(#glow-md)"
              transform="rotate(200 500 500)"
              opacity="0.6"
            />
          </g>

          {/* Outer edge specular — razor thin */}
          <g className="spin-medium-r">
            <circle
              cx="500" cy="500" r="470"
              fill="none"
              stroke="url(#o-edge)"
              strokeWidth="1"
              strokeDasharray="90 2860"
              strokeLinecap="round"
              transform="rotate(-70 500 500)"
              opacity="0.7"
              filter="url(#glow-sm)"
            />
            <circle
              cx="500" cy="500" r="474"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="0.8"
              strokeDasharray="35 3000"
              strokeLinecap="round"
              transform="rotate(-50 500 500)"
              opacity="0.55"
            />
          </g>

          {/* Inner dotted holographic ring */}
          <g className="spin-slow-r">
            <circle
              cx="500" cy="500" r="238"
              fill="none"
              stroke="#c026d3"
              strokeWidth="1.5"
              strokeDasharray="4 22"
              strokeLinecap="round"
              opacity="0.35"
              filter="url(#glow-sm)"
            />
          </g>
        </svg>
      </motion.div>
    </div>
  );
}
