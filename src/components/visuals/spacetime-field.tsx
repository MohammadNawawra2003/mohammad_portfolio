"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Space-time heatmap for a hyperbolic PDE: a wavefront propagating across an
 * (x, t) grid. Unique to the discontinuous-Galerkin research story.
 */
export function SpacetimeField({ className }: { className?: string }) {
  const nx = 16;
  const nt = 9;
  const w = 16;
  const cells = useMemo(() => {
    const out: { x: number; t: number; v: number }[] = [];
    for (let t = 0; t < nt; t++) {
      for (let x = 0; x < nx; x++) {
        // travelling gaussian wave: center moves with t
        const center = 3 + t * 1.0;
        const v = Math.exp(-((x - center) ** 2) / 6);
        out.push({ x, t, v });
      }
    }
    return out;
  }, []);

  return (
    <motion.svg
      viewBox="0 0 280 168"
      className={cn("h-auto w-full", className)}
      role="img"
      aria-label="Space-time heatmap of a propagating wave"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <defs>
        <linearGradient id="st-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0b1220" />
          <stop offset="45%" stopColor="#4338CA" />
          <stop offset="100%" stopColor="#2DD4BF" />
        </linearGradient>
      </defs>
      <text x="6" y="12" fontSize="7" fill="var(--text-faint)" fontFamily="var(--font-mono)">t ↑</text>
      <g transform="translate(14 16)">
        {cells.map((c, i) => (
          <motion.rect
            key={i}
            x={c.x * w}
            y={(nt - 1 - c.t) * w}
            width={w - 1.5}
            height={w - 1.5}
            rx="1.5"
            fill="url(#st-grad)"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 0.12 + c.v * 0.88,
                transition: { duration: 0.5, delay: c.t * 0.06 },
              },
            }}
          />
        ))}
      </g>
      <text x="250" y="164" fontSize="7" fill="var(--text-faint)" fontFamily="var(--font-mono)" textAnchor="end">x →</text>
    </motion.svg>
  );
}
