"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import './styles.css';

interface ScannerSectionProps {
    theme?: 'dark' | 'light';
}

const ScannerSection: React.FC<ScannerSectionProps> = ({ theme = 'dark' }) => {
    const cardStreamRef = useRef<HTMLDivElement>(null);
    const cardLineRef = useRef<HTMLDivElement>(null);
    const particleCanvasRef = useRef<HTMLCanvasElement>(null);
    const scannerCanvasRef = useRef<HTMLCanvasElement>(null);


    // We use refs to hold instances of our controllers so we can access them in buttons
    const controllerRef = useRef<any>(null);



    useEffect(() => {
        if (!cardStreamRef.current || !cardLineRef.current || !particleCanvasRef.current || !scannerCanvasRef.current) return;

        // --- HELPER FUNCTIONS ---
        const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
        const pick = (arr: any[]) => arr[randInt(0, arr.length - 1)];

        const generateCode = (width: number, height: number) => {
            const header = [
                "// compiled preview • scanner demo",
                "/* generated for visual effect – not executed */",
                "const SCAN_WIDTH = 8;",
                "const FADE_ZONE = 35;",
                "const MAX_PARTICLES = 2500;",
                "const TRANSITION = 0.05;",
            ];

            const helpers = [
                "function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }",
                "function lerp(a, b, t) { return a + (b - a) * t; }",
                "const now = () => performance.now();",
                "function rng(min, max) { return Math.random() * (max - min) + min; }",
            ];

            const particleBlock = (idx: number) => [
                `class Particle${idx} {`,
                "  constructor(x, y, vx, vy, r, a) {",
                "    this.x = x; this.y = y;",
                "    this.vx = vx; this.vy = vy;",
                "    this.r = r; this.a = a;",
                "  }",
                "  step(dt) { this.x += this.vx * dt; this.y += this.vy * dt; }",
                "}",
            ];

            const scannerBlock = [
                "const scanner = {",
                "  x: Math.floor(window.innerWidth / 2),",
                "  width: SCAN_WIDTH,",
                "  glow: 3.5,",
                "};",
                "",
                "function drawParticle(ctx, p) {",
                "  ctx.globalAlpha = clamp(p.a, 0, 1);",
                "  ctx.drawImage(gradient, p.x - p.r, p.y - p.r, p.r * 2, p.r * 2);",
                "}",
            ];

            const loopBlock = [
                "function tick(t) {",
                "  // requestAnimationFrame(tick);",
                "  const dt = 0.016;",
                "  // update & render",
                "}",
            ];

            const misc = [
                "const state = { intensity: 1.2, particles: MAX_PARTICLES };",
                "const bounds = { w: window.innerWidth, h: 300 };",
                "const gradient = document.createElement('canvas');",
                "const ctx = gradient.getContext('2d');",
                "ctx.globalCompositeOperation = 'lighter';",
                "// ascii overlay is masked with a 3-phase gradient",
            ];

            const library: string[] = [];
            header.forEach((l) => library.push(l));
            helpers.forEach((l) => library.push(l));
            for (let b = 0; b < 3; b++)
                particleBlock(b).forEach((l) => library.push(l));
            scannerBlock.forEach((l) => library.push(l));
            loopBlock.forEach((l) => library.push(l));
            misc.forEach((l) => library.push(l));

            for (let i = 0; i < 40; i++) {
                const n1 = randInt(1, 9);
                const n2 = randInt(10, 99);
                library.push(`const v${i} = (${n1} + ${n2}) * 0.${randInt(1, 9)}; `);
            }
            for (let i = 0; i < 20; i++) {
                library.push(
                    `if (state.intensity > ${1 + (i % 3)}) { scanner.glow += 0.01; } `
                );
            }

            let flow = library.join(" ");
            flow = flow.replace(/\s+/g, " ").trim();
            const totalChars = width * height;
            while (flow.length < totalChars + width) {
                const extra = pick(library).replace(/\s+/g, " ").trim();
                flow += " " + extra;
            }

            let out = "";
            let offset = 0;
            for (let row = 0; row < height; row++) {
                let line = flow.slice(offset, offset + width);
                if (line.length < width) line = line + " ".repeat(width - line.length);
                out += line + (row < height - 1 ? "\n" : "");
                offset += width;
            }
            return out;
        };

        const calculateCodeDimensions = (cardWidth: number, cardHeight: number) => {
            const fontSize = 11;
            const lineHeight = 13;
            const charWidth = 6;
            const width = Math.floor(cardWidth / charWidth);
            const height = Math.floor(cardHeight / lineHeight);
            return { width, height, fontSize, lineHeight };
        };

        // --- CONTROLLER CLASSES ---

        // 1. Scanner Controller (Particles for Scanner Beam)
        class ParticleScanner {
            canvas: HTMLCanvasElement;
            ctx: CanvasRenderingContext2D;
            w: number;
            h: number = 300;
            particles: any[] = [];
            count: number = 0;
            maxParticles: number = 800;
            intensity: number = 0.8;
            lightBarX: number;
            lightBarWidth: number = 3;
            fadeZone: number = 60;
            scanTargetIntensity: number = 1.8;
            scanTargetParticles: number = 2500;
            scanTargetFadeZone: number = 35;
            scanningActive: boolean = false;
            baseIntensity: number;
            baseMaxParticles: number;
            baseFadeZone: number;
            currentIntensity: number;
            currentMaxParticles: number;
            currentFadeZone: number;
            transitionSpeed: number = 0.05;
            animationId: number | null = null;
            gradientCanvas: HTMLCanvasElement | null = null;
            currentGlowIntensity: number = 1;
            theme: 'dark' | 'light' = 'dark';

            constructor(canvas: HTMLCanvasElement) {
                this.canvas = canvas;
                this.ctx = canvas.getContext("2d")!;
                this.w = canvas.offsetWidth; // Use offsetWidth to match layout

                this.lightBarX = this.w / 2;

                this.baseIntensity = this.intensity;
                this.baseMaxParticles = this.maxParticles;
                this.baseFadeZone = this.fadeZone;

                this.currentIntensity = this.intensity;
                this.currentMaxParticles = this.maxParticles;
                this.currentFadeZone = this.fadeZone;

                // Add theme-based color configuration
                this.theme = theme;

                this.setupCanvas();
                this.createGradientCache();
                this.initParticles();
                this.animate();

                window.addEventListener("resize", this.onResize);
            }

            setupCanvas() {
                // Match canvas resolution to display size for sharpness or just 1:1 map
                this.canvas.width = this.w;
                this.canvas.height = this.h;
                this.ctx.clearRect(0, 0, this.w, this.h);
            }

            onResize = () => {
                if (this.canvas && this.canvas.parentElement) {
                    this.w = this.canvas.parentElement.offsetWidth;
                    this.lightBarX = this.w / 2;
                    this.setupCanvas();
                }
            }

            createGradientCache() {
                this.gradientCanvas = document.createElement("canvas");
                const gCtx = this.gradientCanvas.getContext("2d")!;
                this.gradientCanvas.width = 16;
                this.gradientCanvas.height = 16;

                const half = this.gradientCanvas.width / 2;
                const gradient = gCtx.createRadialGradient(
                    half, half, 0, half, half, half
                );
                gradient.addColorStop(0, this.theme === 'light' ? "rgba(100, 50, 200, 1)" : "rgba(255, 255, 255, 1)");
                gradient.addColorStop(0.3, this.theme === 'light' ? "rgba(139, 92, 246, 0.8)" : "rgba(196, 181, 253, 0.8)");
                gradient.addColorStop(0.7, this.theme === 'light' ? "rgba(124, 58, 237, 0.4)" : "rgba(139, 92, 246, 0.4)");
                gradient.addColorStop(1, "transparent");

                gCtx.fillStyle = gradient;
                gCtx.beginPath();
                gCtx.arc(half, half, half, 0, Math.PI * 2);
                gCtx.fill();
            }

            randomFloat(min: number, max: number) {
                return Math.random() * (max - min) + min;
            }

            createParticle() {
                const intensityRatio = this.intensity / this.baseIntensity;
                // Adjust speeds based on intensity
                const speedMultiplier = 1 + (intensityRatio - 1) * 1.2;
                const sizeMultiplier = 1 + (intensityRatio - 1) * 0.7;

                return {
                    x: this.lightBarX + this.randomFloat(-this.lightBarWidth / 2, this.lightBarWidth / 2),
                    y: this.randomFloat(0, this.h),
                    vx: this.randomFloat(0.2, 1.0) * speedMultiplier,
                    vy: this.randomFloat(-0.15, 0.15) * speedMultiplier,
                    radius: this.randomFloat(0.4, 1) * sizeMultiplier,
                    alpha: this.randomFloat(0.6, 1),
                    decay: this.randomFloat(0.005, 0.025) * (2 - intensityRatio * 0.5),
                    originalAlpha: 0,
                    life: 1.0,
                    time: 0,
                    startX: 0,
                    twinkleSpeed: this.randomFloat(0.02, 0.08) * speedMultiplier,
                    twinkleAmount: this.randomFloat(0.1, 0.25),
                };
            }

            initParticles() {
                for (let i = 0; i < this.maxParticles; i++) {
                    const particle = this.createParticle();
                    particle.originalAlpha = particle.alpha;
                    particle.startX = particle.x;
                    this.count++;
                    this.particles[this.count] = particle;
                }
            }

            updateParticle(particle: any) {
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.time++;

                particle.alpha =
                    particle.originalAlpha * particle.life +
                    Math.sin(particle.time * particle.twinkleSpeed) * particle.twinkleAmount;

                particle.life -= particle.decay;

                if (particle.x > this.w + 10 || particle.life <= 0) {
                    this.resetParticle(particle);
                }
            }

            resetParticle(particle: any) {
                particle.x = this.lightBarX + this.randomFloat(-this.lightBarWidth / 2, this.lightBarWidth / 2);
                particle.y = this.randomFloat(0, this.h);
                particle.vx = this.randomFloat(0.2, 1.0);
                particle.vy = this.randomFloat(-0.15, 0.15);
                particle.alpha = this.randomFloat(0.6, 1);
                particle.originalAlpha = particle.alpha;
                particle.life = 1.0;
                particle.time = 0;
                particle.startX = particle.x;
            }

            drawParticle(particle: any) {
                if (particle.life <= 0) return;
                let fadeAlpha = 1;
                if (particle.y < this.fadeZone) {
                    fadeAlpha = particle.y / this.fadeZone;
                } else if (particle.y > this.h - this.fadeZone) {
                    fadeAlpha = (this.h - particle.y) / this.fadeZone;
                }
                fadeAlpha = Math.max(0, Math.min(1, fadeAlpha));

                this.ctx.globalAlpha = particle.alpha * fadeAlpha;
                if (this.gradientCanvas) {
                    this.ctx.drawImage(
                        this.gradientCanvas,
                        particle.x - particle.radius,
                        particle.y - particle.radius,
                        particle.radius * 2,
                        particle.radius * 2
                    );
                }
            }

            drawLightBar() {
                const verticalGradient = this.ctx.createLinearGradient(0, 0, 0, this.h);
                verticalGradient.addColorStop(0, "rgba(255, 255, 255, 0)");
                verticalGradient.addColorStop(this.fadeZone / this.h, "rgba(255, 255, 255, 1)");
                verticalGradient.addColorStop(1 - this.fadeZone / this.h, "rgba(255, 255, 255, 1)");
                verticalGradient.addColorStop(1, "rgba(255, 255, 255, 0)");

                this.ctx.globalCompositeOperation = "lighter";

                const targetGlowIntensity = this.scanningActive ? 3.5 : 1;
                this.currentGlowIntensity += (targetGlowIntensity - this.currentGlowIntensity) * this.transitionSpeed;

                const glowIntensity = this.currentGlowIntensity;
                const lineWidth = this.lightBarWidth;
                const glow1Alpha = this.scanningActive ? 1.0 : 0.8;
                const glow2Alpha = this.scanningActive ? 0.8 : 0.6;
                const glow3Alpha = this.scanningActive ? 0.6 : 0.4;

                const coreGradient = this.ctx.createLinearGradient(
                    this.lightBarX - lineWidth / 2, 0, this.lightBarX + lineWidth / 2, 0
                );
                coreGradient.addColorStop(0, "rgba(255, 255, 255, 0)");
                coreGradient.addColorStop(0.3, `rgba(255, 255, 255, ${0.9 * glowIntensity})`);
                coreGradient.addColorStop(0.5, `rgba(255, 255, 255, ${1 * glowIntensity})`);
                coreGradient.addColorStop(0.7, `rgba(255, 255, 255, ${0.9 * glowIntensity})`);
                coreGradient.addColorStop(1, "rgba(255, 255, 255, 0)");

                this.ctx.globalAlpha = 1;
                this.ctx.fillStyle = coreGradient;
                // roundRect is relatively new, fallback to rect if needed, but modern browsers support it
                if (this.ctx.roundRect) {
                    this.ctx.beginPath();
                    this.ctx.roundRect(this.lightBarX - lineWidth / 2, 0, lineWidth, this.h, 15);
                    this.ctx.fill();
                } else {
                    this.ctx.fillRect(this.lightBarX - lineWidth / 2, 0, lineWidth, this.h);
                }

                // Glow pass 1
                const glow1Gradient = this.ctx.createLinearGradient(
                    this.lightBarX - lineWidth * 2, 0, this.lightBarX + lineWidth * 2, 0
                );
                glow1Gradient.addColorStop(0, "rgba(139, 92, 246, 0)");
                glow1Gradient.addColorStop(0.5, `rgba(196, 181, 253, ${0.8 * glowIntensity})`);
                glow1Gradient.addColorStop(1, "rgba(139, 92, 246, 0)");
                this.ctx.globalAlpha = glow1Alpha;
                this.ctx.fillStyle = glow1Gradient;
                if (this.ctx.roundRect) {
                    this.ctx.beginPath();
                    this.ctx.roundRect(this.lightBarX - lineWidth * 2, 0, lineWidth * 4, this.h, 25);
                    this.ctx.fill();
                } else {
                    this.ctx.fillRect(this.lightBarX - lineWidth * 2, 0, lineWidth * 4, this.h);
                }

                // Glow pass 2
                const glow2Gradient = this.ctx.createLinearGradient(
                    this.lightBarX - lineWidth * 4, 0, this.lightBarX + lineWidth * 4, 0
                );
                glow2Gradient.addColorStop(0, "rgba(139, 92, 246, 0)");
                glow2Gradient.addColorStop(0.5, `rgba(139, 92, 246, ${0.4 * glowIntensity})`);
                glow2Gradient.addColorStop(1, "rgba(139, 92, 246, 0)");
                this.ctx.globalAlpha = glow2Alpha;
                this.ctx.fillStyle = glow2Gradient;
                if (this.ctx.roundRect) {
                    this.ctx.beginPath();
                    this.ctx.roundRect(this.lightBarX - lineWidth * 4, 0, lineWidth * 8, this.h, 35);
                    this.ctx.fill();
                } else {
                    this.ctx.fillRect(this.lightBarX - lineWidth * 4, 0, lineWidth * 8, this.h);
                }

                if (this.scanningActive) {
                    const glow3Gradient = this.ctx.createLinearGradient(
                        this.lightBarX - lineWidth * 8, 0, this.lightBarX + lineWidth * 8, 0
                    );
                    glow3Gradient.addColorStop(0, "rgba(139, 92, 246, 0)");
                    glow3Gradient.addColorStop(0.5, "rgba(139, 92, 246, 0.2)");
                    glow3Gradient.addColorStop(1, "rgba(139, 92, 246, 0)");
                    this.ctx.globalAlpha = glow3Alpha;
                    this.ctx.fillStyle = glow3Gradient;
                    if (this.ctx.roundRect) {
                        this.ctx.beginPath();
                        this.ctx.roundRect(this.lightBarX - lineWidth * 8, 0, lineWidth * 16, this.h, 45);
                        this.ctx.fill();
                    } else {
                        this.ctx.fillRect(this.lightBarX - lineWidth * 8, 0, lineWidth * 16, this.h);
                    }
                }

                this.ctx.globalCompositeOperation = "destination-in";
                this.ctx.globalAlpha = 1;
                this.ctx.fillStyle = verticalGradient;
                this.ctx.fillRect(0, 0, this.w, this.h);
            }

            render() {
                const targetIntensity = this.scanningActive ? this.scanTargetIntensity : this.baseIntensity;
                const targetMaxParticles = this.scanningActive ? this.scanTargetParticles : this.baseMaxParticles;
                const targetFadeZone = this.scanningActive ? this.scanTargetFadeZone : this.baseFadeZone;

                this.currentIntensity += (targetIntensity - this.currentIntensity) * this.transitionSpeed;
                this.currentMaxParticles += (targetMaxParticles - this.currentMaxParticles) * this.transitionSpeed;
                this.currentFadeZone += (targetFadeZone - this.currentFadeZone) * this.transitionSpeed;

                this.intensity = this.currentIntensity;
                this.maxParticles = Math.floor(this.currentMaxParticles);
                this.fadeZone = this.currentFadeZone;

                this.ctx.globalCompositeOperation = "source-over";
                this.ctx.clearRect(0, 0, this.w, this.h);

                this.drawLightBar();

                this.ctx.globalCompositeOperation = "lighter";
                for (let i = 1; i <= this.count; i++) {
                    if (this.particles[i]) {
                        this.updateParticle(this.particles[i]);
                        this.drawParticle(this.particles[i]);
                    }
                }

                // Spawn logic
                const currentIntensity = this.intensity;
                const currentMaxParticles = this.maxParticles;
                const intensityRatio = this.intensity / this.baseIntensity;

                if (Math.random() < currentIntensity && this.count < currentMaxParticles) {
                    const p = this.createParticle();
                    p.originalAlpha = p.alpha; p.startX = p.x;
                    this.count++; this.particles[this.count] = p;
                }
                if (intensityRatio > 1.1 && Math.random() < (intensityRatio - 1.0) * 1.2) {
                    const p = this.createParticle();
                    p.originalAlpha = p.alpha; p.startX = p.x;
                    this.count++; this.particles[this.count] = p;
                }
                if (intensityRatio > 1.3 && Math.random() < (intensityRatio - 1.3) * 1.4) {
                    const p = this.createParticle();
                    p.originalAlpha = p.alpha; p.startX = p.x;
                    this.count++; this.particles[this.count] = p;
                }
                if (intensityRatio > 1.5 && Math.random() < (intensityRatio - 1.5) * 1.8) {
                    const p = this.createParticle();
                    p.originalAlpha = p.alpha; p.startX = p.x;
                    this.count++; this.particles[this.count] = p;
                }
                if (intensityRatio > 2.0 && Math.random() < (intensityRatio - 2.0) * 2.0) {
                    const p = this.createParticle();
                    p.originalAlpha = p.alpha; p.startX = p.x;
                    this.count++; this.particles[this.count] = p;
                }

                if (this.count > currentMaxParticles + 200) {
                    const excessCount = Math.min(15, this.count - currentMaxParticles);
                    for (let i = 0; i < excessCount; i++) {
                        delete this.particles[this.count - i];
                    }
                    this.count -= excessCount;
                }
            }

            animate() {
                this.render();
                this.animationId = requestAnimationFrame(() => this.animate());
            }

            setScanningActive(active: boolean) {
                this.scanningActive = active;
            }

            destroy() {
                if (this.animationId) cancelAnimationFrame(this.animationId);
                window.removeEventListener("resize", this.onResize);
            }
        }


        // 2. Background Particle System (Three.js)
        class ParticleSystem {
            canvas: HTMLCanvasElement;
            scene: THREE.Scene | null = null;
            camera: THREE.OrthographicCamera | null = null;
            renderer: THREE.WebGLRenderer | null = null;
            particles: THREE.Points | null = null;
            particleCount = 400;
            velocities: Float32Array | null = null;
            alphas: Float32Array | null = null;

            constructor(canvas: HTMLCanvasElement) {
                this.canvas = canvas;
                this.init();
            }

            init() {
                this.scene = new THREE.Scene();
                const w = window.innerWidth; // Keep using window width for full width feel or container? Provided code uses window
                // Let's use window width to match the look, but we might want container width if boxed.
                // Provided code: width: 100vw.

                this.camera = new THREE.OrthographicCamera(
                    -w / 2, w / 2, 125, -125, 1, 1000
                );
                this.camera.position.z = 100;

                this.renderer = new THREE.WebGLRenderer({
                    canvas: this.canvas,
                    alpha: true,
                    antialias: true
                });
                this.renderer.setSize(w, 250);
                this.renderer.setClearColor(0x000000, 0);

                this.createParticles(w);
                this.animate();
                window.addEventListener("resize", this.onWindowResize);
            }

            createParticles(width: number) {
                const geometry = new THREE.BufferGeometry();
                const positions = new Float32Array(this.particleCount * 3);
                const colors = new Float32Array(this.particleCount * 3);
                const sizes = new Float32Array(this.particleCount);
                const velocities = new Float32Array(this.particleCount);

                const canvas = document.createElement("canvas");
                canvas.width = 100;
                canvas.height = 100;
                const ctx = canvas.getContext("2d")!;
                const half = canvas.width / 2;
                const hue = 217;
                const gradient = ctx.createRadialGradient(half, half, 0, half, half, half);
                const isLight = theme === 'light';
                gradient.addColorStop(0.025, isLight ? "#4c1d95" : "#fff");
                gradient.addColorStop(0.1, isLight ? `hsl(${hue}, 61%, 50%)` : `hsl(${hue}, 61%, 33%)`);
                gradient.addColorStop(0.25, isLight ? `hsl(${hue}, 64%, 80%)` : `hsl(${hue}, 64%, 6%)`);
                gradient.addColorStop(1, "transparent");
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(half, half, half, 0, Math.PI * 2);
                ctx.fill();
                const texture = new THREE.CanvasTexture(canvas);
                texture.flipY = false;

                for (let i = 0; i < this.particleCount; i++) {
                    positions[i * 3] = (Math.random() - 0.5) * width * 2;
                    positions[i * 3 + 1] = (Math.random() - 0.5) * 250;
                    positions[i * 3 + 2] = 0;
                    colors[i * 3] = 1; colors[i * 3 + 1] = 1; colors[i * 3 + 2] = 1;
                    const orbitRadius = Math.random() * 200 + 100;
                    sizes[i] = (Math.random() * (orbitRadius - 60) + 60) / 8;
                    velocities[i] = Math.random() * 60 + 30;
                }

                geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
                geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
                geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
                this.velocities = velocities;

                const alphas = new Float32Array(this.particleCount);
                for (let i = 0; i < this.particleCount; i++) {
                    alphas[i] = (Math.random() * 8 + 2) / 10;
                }
                geometry.setAttribute("alpha", new THREE.BufferAttribute(alphas, 1));
                this.alphas = alphas;

                const material = new THREE.ShaderMaterial({
                    uniforms: {
                        pointTexture: { value: texture },
                        size: { value: 15.0 }
                    },
                    vertexShader: `
                attribute float alpha;
                varying float vAlpha;
                varying vec3 vColor;
                uniform float size;
    void main() {
        vAlpha = alpha;
        vColor = color;
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size;
        gl_Position = projectionMatrix * mvPosition;
    }
    `,
                    fragmentShader: `
                uniform sampler2D pointTexture;
                varying float vAlpha;
                varying vec3 vColor;
    void main() {
        gl_FragColor = vec4(vColor, vAlpha) * texture2D(pointTexture, gl_PointCoord);
    }
    `,
                    transparent: true,
                    blending: THREE.AdditiveBlending,
                    depthWrite: false,
                    vertexColors: true
                });

                this.particles = new THREE.Points(geometry, material);
                this.scene!.add(this.particles);
            }

            animate = () => {
                if (!this.renderer) return;
                requestAnimationFrame(this.animate);
                if (this.particles && this.velocities && this.alphas) {
                    const positions = this.particles.geometry.attributes.position.array as Float32Array;
                    const time = Date.now() * 0.001;
                    const w = window.innerWidth; // or container width

                    for (let i = 0; i < this.particleCount; i++) {
                        positions[i * 3] += this.velocities[i] * 0.016;
                        if (positions[i * 3] > w / 2 + 100) {
                            positions[i * 3] = -w / 2 - 100;
                            positions[i * 3 + 1] = (Math.random() - 0.5) * 250;
                        }
                        positions[i * 3 + 1] += Math.sin(time + i * 0.1) * 0.5;
                        const twinkle = Math.floor(Math.random() * 10);
                        if (twinkle === 1 && this.alphas[i] > 0) this.alphas[i] -= 0.05;
                        else if (twinkle === 2 && this.alphas[i] < 1) this.alphas[i] += 0.05;
                        this.alphas[i] = Math.max(0, Math.min(1, this.alphas[i]));
                    }
                    this.particles.geometry.attributes.position.needsUpdate = true;
                    this.particles.geometry.attributes.alpha.needsUpdate = true;
                }
                if (this.renderer && this.scene && this.camera) {
                    this.renderer.render(this.scene, this.camera);
                }
            }

            onWindowResize = () => {
                if (this.camera && this.renderer) {
                    const w = window.innerWidth;
                    this.camera.left = -w / 2;
                    this.camera.right = w / 2;
                    this.camera.updateProjectionMatrix();
                    this.renderer.setSize(w, 250);
                }
            }

            destroy() {
                if (this.renderer) {
                    this.renderer.dispose();
                }
                window.removeEventListener("resize", this.onWindowResize);
            }
        }


        // 3. Card Stream Controller (Logic for cards)
        class CardStreamController {
            container: HTMLDivElement;
            cardLine: HTMLDivElement;
            speedIndicator: HTMLSpanElement | null;
            scanner: ParticleScanner;

            position: number = 0;
            velocity: number = 120;
            direction: number = -1;
            isAnimating: boolean = true;
            isDragging: boolean = false;
            lastTime: number = 0;
            lastMouseX: number = 0;
            mouseVelocity: number = 0;
            friction: number = 0.95;
            minVelocity: number = 30;
            containerWidth: number = 0;
            cardLineWidth: number = 0;
            autoInterval: any;

            constructor(container: HTMLDivElement, cardLine: HTMLDivElement, speedIndicator: HTMLSpanElement | null, scanner: ParticleScanner) {
                this.container = container;
                this.cardLine = cardLine;
                this.speedIndicator = speedIndicator;
                this.scanner = scanner;
                this.init();
            }

            init() {
                this.populateCardLine();
                this.calculateDimensions();
                this.setupEventListeners();
                this.updateCardPosition();
                this.animate();
                this.startPeriodicUpdates();
            }

            createCardWrapper(index: number) {
                const wrapper = document.createElement("div");
                wrapper.className = "card-wrapper";
                const normalCard = document.createElement("div");
                normalCard.className = "card card-normal";
                const cardImages = [
                    "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b55e654d1341fb06f8_4.1.png",
                    "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b5a080a31ee7154b19_1.png",
                    "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b5c1e4919fd69672b8_3.png",
                    "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b5f6a5e232e7beb4be_2.png",
                    "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b5bea2f1b07392d936_4.png",
                ];
                const cardImage = document.createElement("img");
                cardImage.className = "card-image";
                cardImage.src = cardImages[index % cardImages.length];
                cardImage.alt = "Credit Card";
                cardImage.onerror = () => {
                    // Fallback if image fails
                    Object.assign(cardImage.style, { background: 'linear-gradient(45deg, #667eea, #764ba2)' });
                };
                normalCard.appendChild(cardImage);

                const asciiCard = document.createElement("div");
                asciiCard.className = "card card-ascii";
                const asciiContent = document.createElement("div");
                asciiContent.className = "ascii-content";
                const { width, height, fontSize, lineHeight } = calculateCodeDimensions(400, 250);
                asciiContent.style.fontSize = fontSize + "px";
                asciiContent.style.lineHeight = lineHeight + "px";
                asciiContent.textContent = generateCode(width, height);

                asciiCard.appendChild(asciiContent);
                wrapper.appendChild(normalCard);
                wrapper.appendChild(asciiCard);
                return wrapper;
            }

            populateCardLine() {
                this.cardLine.innerHTML = "";
                const cardsCount = 30;
                for (let i = 0; i < cardsCount; i++) {
                    this.cardLine.appendChild(this.createCardWrapper(i));
                }
            }

            calculateDimensions() {
                this.containerWidth = this.container.offsetWidth;
                const cardWidth = 400;
                const cardGap = 60;
                const cardCount = this.cardLine.children.length;
                this.cardLineWidth = (cardWidth + cardGap) * cardCount;
            }

            setupEventListeners() {
                this.cardLine.addEventListener("mousedown", this.startDrag);
                document.addEventListener("mousemove", this.onDrag);
                document.addEventListener("mouseup", this.endDrag);
                this.cardLine.addEventListener("touchstart", (e) => this.startDrag(e.touches[0] as unknown as MouseEvent), { passive: false });
                document.addEventListener("touchmove", (e) => this.onDrag(e.touches[0] as unknown as MouseEvent), { passive: false });
                document.addEventListener("touchend", this.endDrag);
                this.cardLine.addEventListener("wheel", this.onWheel);
                this.cardLine.addEventListener("dragstart", (e) => e.preventDefault());
                window.addEventListener("resize", () => { this.calculateDimensions(); });
            }

            startDrag = (e: MouseEvent | Touch) => {
                // Dim calc removed to prevent jump
                // preventDefault handled in wrapper if needed, but for touch we might need passive:false
                // e.preventDefault(); // can't preventDefault on passively attached events if strict
                this.isDragging = true;
                this.isAnimating = false;
                this.lastMouseX = e.clientX;
                this.mouseVelocity = 0;
                this.cardLine.style.animation = "none";
                this.cardLine.classList.add("dragging");
                document.body.style.userSelect = "none";
                document.body.style.cursor = "grabbing";
            }

            onDrag = (e: MouseEvent | Touch) => {
                if (!this.isDragging) return;
                // e.preventDefault();
                const deltaX = e.clientX - this.lastMouseX;
                this.position += deltaX;
                this.mouseVelocity = deltaX * 60;
                this.lastMouseX = e.clientX;

                // Infinite loop check for drag
                const patternWidth = (400 + 60) * 5; // 5 unique images
                // Wrap position so we can drag infinitely
                if (this.position <= -patternWidth) {
                    this.position += patternWidth;
                } else if (this.position > 0) {
                    this.position -= patternWidth;
                }

                this.cardLine.style.transform = `translateX(${this.position}px)`;
                this.updateCardClipping();
            }

            endDrag = () => {
                if (!this.isDragging) return;
                this.isDragging = false;
                this.cardLine.classList.remove("dragging");
                if (Math.abs(this.mouseVelocity) > this.minVelocity) {
                    this.velocity = Math.abs(this.mouseVelocity);
                    this.direction = this.mouseVelocity > 0 ? 1 : -1;
                } else {
                    this.velocity = 120;
                }
                this.isAnimating = true;
                // this.updateSpeedIndicator();
                document.body.style.userSelect = "";
                document.body.style.cursor = "";
            }

            animate = () => {
                if (this.isAnimating) {
                    this.position += this.velocity * this.direction * 0.016;

                    // Infinite loop logic
                    const patternWidth = (400 + 60) * 5;
                    if (this.position <= -patternWidth) {
                        this.position += patternWidth;
                    } else if (this.position > 0) {
                        this.position -= patternWidth;
                    }

                    this.cardLine.style.transform = `translateX(${this.position}px)`;
                    this.updateCardClipping();
                    this.updateSpeedIndicator();
                }
                requestAnimationFrame(this.animate);
            }

            onWheel = (e: WheelEvent) => {
                e.preventDefault();
                const delta = e.deltaX || e.deltaY; // Support vertical scroll too?
                this.position += delta * -0.5; // Reverse direction

                // Infinite logic
                const patternWidth = (400 + 60) * 5; // 5 unique images
                if (this.position <= -patternWidth) {
                    this.position += patternWidth;
                } else if (this.position > 0) {
                    this.position -= patternWidth;
                }

                this.cardLine.style.transform = `translateX(${this.position}px)`;
                this.velocity = 0; // stop auto animation on wheel
                this.isAnimating = false;
                this.updateCardClipping();
                // Clear existing timeout to restart auto animation
                if (this.autoInterval) clearTimeout(this.autoInterval);
                // Restart auto animation after delay? Maybe not.
            }

            updateCardPosition() {
                const patternWidth = (400 + 60) * 5; // 5 unique images
                if (this.position <= -patternWidth) {
                    this.position += patternWidth;
                } else if (this.position > 0) {
                    this.position -= patternWidth;
                }
                this.cardLine.style.transform = `translateX(${this.position}px)`;
                this.updateCardClipping();
            }

            updateCardClipping() {
                if (!this.scanner) return;
                // Center of screen
                const scannerX = window.innerWidth / 2;
                const scannerWidth = 8;
                const scannerLeft = scannerX - scannerWidth / 2;
                const scannerRight = scannerX + scannerWidth / 2;
                let anyScanningActive = false;

                // We need to query wrappers from the line
                const wrappers = this.cardLine.querySelectorAll(".card-wrapper");
                wrappers.forEach((wrapper: any) => {
                    const rect = wrapper.getBoundingClientRect();
                    const cardLeft = rect.left;
                    const cardRight = rect.right;
                    const cardWidth = rect.width;

                    const normalCard = wrapper.querySelector(".card-normal");
                    const asciiCard = wrapper.querySelector(".card-ascii");

                    if (cardLeft < scannerRight && cardRight > scannerLeft) {
                        anyScanningActive = true;
                        const scannerIntersectLeft = Math.max(scannerLeft - cardLeft, 0);
                        const scannerIntersectRight = Math.min(scannerRight - cardLeft, cardWidth);

                        const normalClipRight = (scannerIntersectLeft / cardWidth) * 100;
                        const asciiClipLeft = (scannerIntersectRight / cardWidth) * 100;

                        normalCard.style.setProperty("--clip-right", `${normalClipRight}% `);
                        asciiCard.style.setProperty("--clip-left", `${asciiClipLeft}% `);

                        if (!wrapper.hasAttribute("data-scanned") && scannerIntersectLeft > 0) {
                            wrapper.setAttribute("data-scanned", "true");
                            // Removed scan-effect creation as requested
                        }
                    } else {
                        if (cardRight < scannerLeft) {
                            normalCard.style.setProperty("--clip-right", "100%");
                            asciiCard.style.setProperty("--clip-left", "100%");
                        } else if (cardLeft > scannerRight) {
                            normalCard.style.setProperty("--clip-right", "0%");
                            asciiCard.style.setProperty("--clip-left", "0%");
                        }
                        wrapper.removeAttribute("data-scanned");
                    }
                });

                this.scanner.setScanningActive(anyScanningActive);
            }

            updateAsciiContent() {
                const contents = this.cardLine.querySelectorAll(".ascii-content");
                contents.forEach((content) => {
                    if (Math.random() < 0.15) {
                        const { width, height } = calculateCodeDimensions(400, 250);
                        content.textContent = generateCode(width, height);
                    }
                });
            }

            updateSpeedIndicator() {
                if (this.speedIndicator) {
                    this.speedIndicator.textContent = Math.round(this.velocity).toString();
                }
            }

            startPeriodicUpdates() {
                this.autoInterval = setInterval(() => { this.updateAsciiContent(); }, 200);
                const updateClipping = () => {
                    this.updateCardClipping();
                    requestAnimationFrame(updateClipping);
                }
                updateClipping();
            }

            // Public methods
            toggleAnimation() {
                this.isAnimating = !this.isAnimating;
            }
            resetPosition() {
                this.position = this.containerWidth;
                this.velocity = 120;
                this.direction = -1;
                this.isAnimating = true;
                this.isDragging = false;
                this.cardLine.style.animation = "none";
                this.cardLine.style.transform = `translateX(${this.position}px)`;
                this.cardLine.classList.remove("dragging");
                this.updateSpeedIndicator();
            }
            changeDirection() {
                this.direction *= -1;
                this.updateSpeedIndicator();
            }

            destroy() {
                clearInterval(this.autoInterval);
                // Remove event listeners
                document.removeEventListener("mousemove", this.onDrag);
                document.removeEventListener("mouseup", this.endDrag);
                document.removeEventListener("touchmove", this.onDrag as any);
                document.removeEventListener("touchend", this.endDrag);
                this.cardLine.removeEventListener("mousedown", this.startDrag);
                this.cardLine.removeEventListener("wheel", this.onWheel);
            }
        }


        // --- INITIALIZATION ---
        const scanner = new ParticleScanner(scannerCanvasRef.current);
        const particles = new ParticleSystem(particleCanvasRef.current);
        const cardStream = new CardStreamController(
            cardStreamRef.current,
            cardLineRef.current,
            null,
            scanner
        );

        // Pass theme to instances if needed or use closure (modified above to use closure 'theme')
        // Scanner uses this.theme so we need to inject it.
        scanner.theme = theme;
        scanner.createGradientCache(); // Recreate cache with new theme colors

        // Re-init particles to update colors? 
        // ParticleSystem init() uses theme from closure scope if we modify it.
        // We need to modify ParticleSystem to accept theme in constructor or init.
        // Or simply rely on the fact that useEffect re-runs if theme changes?
        // But theme needs to be in dependency array.

        controllerRef.current = cardStream;

        // --- CLEANUP ---
        return () => {
            scanner.destroy();
            particles.destroy();
            cardStream.destroy();
        };

    }, [theme]); // Run when theme changes



    return (
        <div className="scanner-section-wrapper" style={{ background: theme === 'light' ? '#ffffff' : '#000000' }}>
            <div className="scanner-container">
                <canvas ref={particleCanvasRef} id="particleCanvas"></canvas>
                <canvas ref={scannerCanvasRef} id="scannerCanvas"></canvas>

                {/* The scanner div is used in CSS but logic above uses canvas. Keeping it for safety if CSS uses it */}
                <div className="scanner-beam"></div>

                <div className="card-stream" ref={cardStreamRef} id="cardStream">
                    <div className="card-line" ref={cardLineRef} id="cardLine"></div>
                </div>
            </div>


        </div>
    );
};

export default ScannerSection;
