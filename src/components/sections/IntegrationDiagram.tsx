'use client';
import { useEffect, useRef } from 'react';

// ─── Types ─────────────────────────────────────────────────────────────────

interface DustParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  decay: number;
  r: number;
  col: string;
  white: boolean;
}

interface PulseRing {
  r: number;
  alpha: number;
}

interface CenterRing extends PulseRing {
  color: string;
}

interface Packet {
  progress: number;
  dir: 1 | -1;
}

interface Node {
  label: string;
  icon: string;
  color: string;
  baseAngle: number;
  // runtime state
  scale: number;
  scaleDir: number;
  scaleProg: number;
  dust: DustParticle[];
  packet: Packet;
  pulseRings: PulseRing[];
}

interface Vec2 {
  x: number;
  y: number;
}

interface Star {
  x: number;
  y: number;
  r: number;
  phase: number;
  spd: number;
}

// ─── Component ─────────────────────────────────────────────────────────────

export default function IntegrationDiagram() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    if (!ctx) return;

    const W = 700, H = 700;
    canvas.width  = W;
    canvas.height = H;

    const CX = W / 2;
    const CY = H / 2;

    // ─── Palette ─────────────────────────────────────────────
    const BG     = '#08090f';
    const CYAN   = '#00d4ff';
    const PURPLE = '#7c3aed';
    const WHITE  = '#ffffff';

    function hexToRgb(hex: string): string {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `${r},${g},${b}`;
    }

    // ─── Sizes ───────────────────────────────────────────────
    const ORBIT_R  = 200;
    const NODE_R   = 34;
    const CENTER_R = 52;

    // ─── Nodes ───────────────────────────────────────────────
    const nodes: Node[] = [
      { label: 'OpenAI',     icon: '⬡', color: '#10b981', baseAngle: 0   },
      { label: 'Anthropic',  icon: '◈', color: '#d97757', baseAngle: 60  },
      { label: 'Make',       icon: '⬟', color: '#8b5cf6', baseAngle: 120 },
      { label: 'Zapier',     icon: '⚡', color: '#f59e0b', baseAngle: 180 },
      { label: 'HubSpot',    icon: '❋', color: '#f4623a', baseAngle: 240 },
      { label: 'Salesforce', icon: '◉', color: '#38bdf8', baseAngle: 300 },
    ].map((n, i) => ({
      ...n,
      scale:      1,
      scaleDir:   0,
      scaleProg:  0,
      dust:       [] as DustParticle[],
      packet:     { progress: i / 6, dir: 1 as const },
      pulseRings: [] as PulseRing[],
    }));

    let t              = 0;
    let orbitAngle     = 0;
    const ORBIT_SPD    = 0.003;
    const centerRings: CenterRing[] = [];

    // ─── Helpers ─────────────────────────────────────────────
    function nodePos(i: number): Vec2 {
      const a = (nodes[i].baseAngle * Math.PI / 180) + orbitAngle;
      return {
        x: CX + Math.cos(a) * ORBIT_R,
        y: CY + Math.sin(a) * ORBIT_R,
      };
    }

    function getCP(np: Vec2): Vec2 {
      const mx   = (CX + np.x) / 2;
      const my   = (CY + np.y) / 2;
      const perp = { x: -(np.y - CY), y: np.x - CX };
      const len  = Math.sqrt(perp.x ** 2 + perp.y ** 2) || 1;
      return { x: mx + (perp.x / len) * 26, y: my + (perp.y / len) * 26 };
    }

    function bezierPt(cp: Vec2, np: Vec2, p: number): Vec2 {
      const mt = 1 - p;
      return {
        x: mt * mt * CX + 2 * mt * p * cp.x + p * p * np.x,
        y: mt * mt * CY + 2 * mt * p * cp.y + p * p * np.y,
      };
    }

    function eio(v: number): number {
      return v < 0.5 ? 2 * v * v : -1 + (4 - 2 * v) * v;
    }

    // ─── Stars ───────────────────────────────────────────────
    const STARS: Star[] = Array.from({ length: 140 }, () => ({
      x:     Math.random() * W,
      y:     Math.random() * H,
      r:     Math.random() * 1.2 + 0.2,
      phase: Math.random() * Math.PI * 2,
      spd:   Math.random() * 0.016 + 0.004,
    }));

    function drawStars(): void {
      STARS.forEach(s => {
        s.phase += s.spd;
        const a = 0.08 + 0.22 * (0.5 + 0.5 * Math.sin(s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,210,255,${a})`;
        ctx.fill();
      });
    }

    // ─── Grid ────────────────────────────────────────────────
    function drawGrid(): void {
      ctx.strokeStyle = 'rgba(100,130,200,0.032)';
      ctx.lineWidth   = 1;
      for (let x = 0; x < W; x += 50) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y < H; y += 50) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }
    }

    // ─── Connections ─────────────────────────────────────────
    function drawConnections(): void {
      nodes.forEach((node, i) => {
        const np  = nodePos(i);
        const cp  = getCP(np);
        const col = node.color;

        const grad = ctx.createLinearGradient(CX, CY, np.x, np.y);
        grad.addColorStop(0, `rgba(${hexToRgb(CYAN)},0.55)`);
        grad.addColorStop(1, `rgba(${hexToRgb(col)},0.55)`);

        ctx.save();
        ctx.shadowColor = col;
        ctx.shadowBlur  = 10;
        ctx.beginPath();
        ctx.moveTo(CX, CY);
        ctx.quadraticCurveTo(cp.x, cp.y, np.x, np.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth   = 1.3;
        ctx.stroke();
        ctx.restore();

        ctx.beginPath();
        ctx.moveTo(CX, CY);
        ctx.quadraticCurveTo(cp.x, cp.y, np.x, np.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth   = 0.55;
        ctx.stroke();
      });
    }

    // ─── Packets ─────────────────────────────────────────────
    function updateAndDrawPackets(): void {
      nodes.forEach((node, i) => {
        const pkt = node.packet;
        const np  = nodePos(i);
        const cp  = getCP(np);
        const col = node.color;

        pkt.progress += 0.0042;
        if (pkt.progress >= 1) {
          pkt.progress = 0;
          if (pkt.dir === 1) {
            node.pulseRings.push({ r: 0, alpha: 0.75 });
          } else {
            centerRings.push({ r: 0, alpha: 0.45, color: col });
          }
          pkt.dir = pkt.dir === 1 ? -1 : 1;
        }

        const raw = pkt.dir === 1 ? pkt.progress : 1 - pkt.progress;
        const p   = eio(raw);
        const pos = bezierPt(cp, np, p);

        for (let k = 1; k <= 5; k++) {
          const tp   = Math.max(0, p - k * 0.032);
          const tpos = bezierPt(cp, np, tp);
          ctx.beginPath();
          ctx.arc(tpos.x, tpos.y, 2.0 - k * 0.3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${hexToRgb(col)},${0.28 * (1 - k / 5)})`;
          ctx.fill();
        }

        ctx.save();
        ctx.shadowColor = col;
        ctx.shadowBlur  = 16;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 3.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${hexToRgb(col)},0.9)`;
        ctx.fill();
        ctx.restore();

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = WHITE;
        ctx.fill();
      });
    }

    // ─── Pulse rings ─────────────────────────────────────────
    function drawPulseRings(): void {
      nodes.forEach((node, i) => {
        const np = nodePos(i);
        node.pulseRings = node.pulseRings.filter(r => r.alpha > 0.01);
        node.pulseRings.forEach(ring => {
          ring.r    += 2.2;
          ring.alpha *= 0.92;
          ctx.beginPath();
          ctx.arc(np.x, np.y, ring.r, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${hexToRgb(node.color)},${ring.alpha})`;
          ctx.lineWidth   = 1.2;
          ctx.stroke();
        });
      });

      for (let i = centerRings.length - 1; i >= 0; i--) {
        const ring = centerRings[i];
        ring.r    += 1.8;
        ring.alpha *= 0.93;
        if (ring.alpha < 0.01) { centerRings.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(CX, CY, ring.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${hexToRgb(ring.color)},${ring.alpha})`;
        ctx.lineWidth   = 0.9;
        ctx.stroke();
      }
    }

    // ─── Central hub ─────────────────────────────────────────
    function drawCenter(): void {
      const pulse = 1 + 0.06 * Math.sin(t * 0.06);

      [80, 60, 45].forEach((r, idx) => {
        const alpha = [0.04, 0.08, 0.12][idx];
        const grad  = ctx.createRadialGradient(CX, CY, 0, CX, CY, r * pulse);
        grad.addColorStop(0, `rgba(${hexToRgb(CYAN)},${alpha * 2})`);
        grad.addColorStop(1, `rgba(${hexToRgb(CYAN)},0)`);
        ctx.beginPath();
        ctx.arc(CX, CY, r * pulse, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      ctx.save();
      ctx.translate(CX, CY);
      ctx.rotate(t * 0.008);
      for (let i = 0; i < 8; i++) {
        const a     = (i / 8) * Math.PI * 2;
        const rx    = Math.cos(a) * (CENTER_R + 18) * pulse;
        const ry    = Math.sin(a) * (CENTER_R + 18) * pulse;
        const alpha = 0.3 + 0.2 * Math.sin(t * 0.05 + i);
        ctx.beginPath();
        ctx.arc(rx, ry, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${hexToRgb(CYAN)},${alpha})`;
        ctx.fill();
      }
      ctx.restore();

      ctx.save();
      ctx.shadowColor = CYAN;
      ctx.shadowBlur  = 40;
      const grad = ctx.createRadialGradient(CX, CY, 0, CX, CY, CENTER_R * pulse);
      grad.addColorStop(0,   `rgba(${hexToRgb(CYAN)},0.25)`);
      grad.addColorStop(0.6, `rgba(${hexToRgb(PURPLE)},0.4)`);
      grad.addColorStop(1,   `rgba(${hexToRgb(CYAN)},0.15)`);
      ctx.beginPath();
      ctx.arc(CX, CY, CENTER_R * pulse, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();

      ctx.save();
      ctx.shadowColor = CYAN;
      ctx.shadowBlur  = 20;
      ctx.beginPath();
      ctx.arc(CX, CY, CENTER_R * pulse, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${hexToRgb(CYAN)},0.9)`;
      ctx.lineWidth   = 1.5;
      ctx.stroke();
      ctx.restore();

      ctx.beginPath();
      ctx.arc(CX, CY, 6, 0, Math.PI * 2);
      ctx.fillStyle = WHITE;
      ctx.fill();

      ctx.font         = 'bold 11px monospace';
      ctx.fillStyle    = `rgba(${hexToRgb(CYAN)},0.9)`;
      ctx.textAlign    = 'center';
      ctx.textBaseline = 'alphabetic';
      ctx.fillText('AI AUTOMATE', CX, CY + CENTER_R * pulse + 22);
    }

    // ─── Branded nodes ───────────────────────────────────────
    function drawNodes(): void {
      nodes.forEach((node, i) => {
        const np  = nodePos(i);
        const col = node.color;
        const sc  = node.scale;

        const aura = ctx.createRadialGradient(np.x, np.y, 0, np.x, np.y, NODE_R * 2.3 * sc);
        aura.addColorStop(0, `rgba(${hexToRgb(col)},0.10)`);
        aura.addColorStop(1, `rgba(${hexToRgb(col)},0)`);
        ctx.beginPath();
        ctx.arc(np.x, np.y, NODE_R * 2.3 * sc, 0, Math.PI * 2);
        ctx.fillStyle = aura;
        ctx.fill();

        ctx.save();
        ctx.shadowColor = col;
        ctx.shadowBlur  = 28 * sc;
        const fill = ctx.createRadialGradient(np.x - 8, np.y - 8, 2, np.x, np.y, NODE_R * sc);
        fill.addColorStop(0,   `rgba(${hexToRgb(col)},0.45)`);
        fill.addColorStop(0.6, `rgba(8,9,15,0.85)`);
        fill.addColorStop(1,   `rgba(${hexToRgb(col)},0.05)`);
        ctx.beginPath();
        ctx.arc(np.x, np.y, NODE_R * sc, 0, Math.PI * 2);
        ctx.fillStyle = fill;
        ctx.fill();
        ctx.restore();

        ctx.save();
        ctx.shadowColor = col;
        ctx.shadowBlur  = 15 * sc;
        ctx.beginPath();
        ctx.arc(np.x, np.y, NODE_R * sc, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${hexToRgb(col)},0.88)`;
        ctx.lineWidth   = 1.5;
        ctx.stroke();
        ctx.restore();

        ctx.font         = `bold ${Math.round(20 * sc)}px sans-serif`;
        ctx.textAlign    = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle    = col;
        ctx.fillText(node.icon, np.x, np.y - 4 * sc);

        ctx.font         = 'bold 10px monospace';
        ctx.textBaseline = 'alphabetic';
        ctx.fillStyle    = `rgba(${hexToRgb(col)},0.95)`;
        ctx.fillText(node.label, np.x, np.y + NODE_R * sc + 16);
      });
    }

    // ─── Scale pulse ─────────────────────────────────────────
    const SCALE_MAX = 1.42;
    const PULSE_IN  = 0.38;

    function updateScalePulse(): void {
      nodes.forEach(node => {
        if (node.scaleDir === 0) return;
        node.scaleProg += 0.02;
        if (node.scaleProg >= 1) {
          node.scaleProg = 0;
          node.scaleDir  = 0;
          node.scale     = 1;
          return;
        }
        if (node.scaleProg <= PULSE_IN) {
          const p    = node.scaleProg / PULSE_IN;
          node.scale = 1 + (SCALE_MAX - 1) * p;
        } else {
          const p    = (node.scaleProg - PULSE_IN) / (1 - PULSE_IN);
          node.scale = SCALE_MAX - (SCALE_MAX - 1) * p;
        }
      });
    }

    // ─── Stardust ────────────────────────────────────────────
    function spawnDust(i: number): void {
      const np  = nodePos(i);
      const col = nodes[i].color;
      for (let k = 0; k < 42; k++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3.5 + 0.8;
        nodes[i].dust.push({
          x:     np.x,
          y:     np.y,
          vx:    Math.cos(angle) * speed,
          vy:    Math.sin(angle) * speed,
          life:  1,
          decay: Math.random() * 0.024 + 0.016,
          r:     Math.random() * 2.8 + 0.6,
          col,
          white: Math.random() < 0.28,
        });
      }
    }

    function updateAndDrawDust(): void {
      nodes.forEach(node => {
        node.dust = node.dust.filter(p => p.life > 0);
        node.dust.forEach(p => {
          p.x    += p.vx;
          p.y    += p.vy;
          p.vx   *= 0.93;
          p.vy   *= 0.93;
          p.life -= p.decay;

          const a   = Math.max(0, p.life);
          const col = p.white
            ? `rgba(255,255,255,${a})`
            : `rgba(${hexToRgb(p.col)},${a})`;

          ctx.save();
          ctx.shadowColor = p.col;
          ctx.shadowBlur  = 7;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = col;
          ctx.fill();
          ctx.restore();
        });
      });
    }

    // ─── Vignette ────────────────────────────────────────────
    function drawVignette(): void {
      const grad = ctx.createRadialGradient(CX, CY, W * 0.28, CX, CY, W * 0.76);
      grad.addColorStop(0, 'rgba(11,15,23,0)');
      grad.addColorStop(1, 'rgba(11,15,23,0.95)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);
    }

    // ─── Click handler ───────────────────────────────────────
    function handleClick(e: MouseEvent): void {
      const rect   = canvas.getBoundingClientRect();
      const scaleX = W / rect.width;
      const scaleY = H / rect.height;
      const mx     = (e.clientX - rect.left) * scaleX;
      const my     = (e.clientY - rect.top)  * scaleY;

      nodes.forEach((node, i) => {
        const np = nodePos(i);
        const dx = mx - np.x;
        const dy = my - np.y;
        if (Math.sqrt(dx * dx + dy * dy) <= NODE_R * node.scale + 10) {
          node.scaleDir  = 1;
          node.scaleProg = 0;
          node.scale     = 1;
          spawnDust(i);
        }
      });
    }

    canvas.addEventListener('click', handleClick);

    // ─── Main loop ───────────────────────────────────────────
    let animId: number;

    function draw(): void {
      t++;
      orbitAngle += ORBIT_SPD;

      ctx.clearRect(0, 0, W, H);

      drawGrid();
      drawStars();
      drawConnections();
      drawPulseRings();
      updateAndDrawPackets();
      updateAndDrawDust();
      updateScalePulse();
      drawCenter();
      drawNodes();
      drawVignette();

      animId = requestAnimationFrame(draw);
    }

    draw();

    // ─── Cleanup ─────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: 'block', cursor: 'pointer' }}
    />
  );
}
