"use client";

import { useEffect, useRef } from "react";
import { useIsMobile, usePrefersReducedMotion } from "@/lib/hooks";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

/**
 * Lightweight particle network ("living mesh"): drifting nodes connected by
 * faint lines, brightening near the cursor. GPU-cheap, paused offscreen/hidden,
 * disabled under reduced motion. Purely decorative.
 */
export function ParticleField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const count = isMobile ? 38 : 88;
    const maxDist = isMobile ? 110 : 150;
    const mouse = { x: -9999, y: -9999 };
    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let raf = 0;
    let running = true;

    function resize() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function seed() {
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
      }));
    }

    function draw() {
      if (!running) return;
      ctx!.clearRect(0, 0, width, height);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]!;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]!;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.18;
            ctx!.strokeStyle = `rgba(79, 70, 229,${alpha})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }

        const md = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        const near = md < 160;
        ctx!.fillStyle = near ? "rgba(45, 212, 191,0.9)" : "rgba(167,139,250,0.5)";
        ctx!.beginPath();
        ctx!.arc(a.x, a.y, near ? 2.4 : 1.6, 0, Math.PI * 2);
        ctx!.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    function onMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }
    function onLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }
    function onVisibility() {
      running = !document.hidden;
      if (running) {
        raf = requestAnimationFrame(draw);
      } else {
        cancelAnimationFrame(raf);
      }
    }

    resize();
    seed();
    draw();

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced, isMobile]);

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    />
  );
}
