"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Sparse-matrix / linear-solver visualization: a banded coefficient matrix
 * heatmap whose cells fill in as the solver "factorizes". Unique to the
 * numerical-methods story.
 */
export function MatrixSolver({ className }: { className?: string }) {
  const n = 9;
  const cell = 16;
  const cells = useMemo(() => {
    const out: { r: number; c: number; v: number }[] = [];
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        const band = Math.abs(r - c);
        if (band <= 1) out.push({ r, c, v: band === 0 ? 1 : 0.55 });
        else if (band === 2 && (r + c) % 2 === 0) out.push({ r, c, v: 0.28 });
      }
    }
    return out;
  }, []);

  return (
    <svg viewBox="0 0 220 170" className={cn("h-auto w-full", className)} role="img" aria-label="Sparse coefficient matrix being factorized by a linear solver">
      <defs>
        <linearGradient id="mtx" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22D3EE" />
          <stop offset="55%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#D946EF" />
        </linearGradient>
      </defs>

      <text x="10" y="14" fontSize="8" fill="var(--text-faint)" fontFamily="var(--font-mono)">A x = b</text>

      {/* matrix bracket */}
      <g transform="translate(12 22)">
        {cells.map((cellData, i) => (
          <motion.rect
            key={i}
            x={cellData.c * cell}
            y={cellData.r * cell}
            width={cell - 2}
            height={cell - 2}
            rx="2"
            fill="url(#mtx)"
            initial={{ opacity: 0, scale: 0.4 }}
            whileInView={{ opacity: cellData.v, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.4, delay: (cellData.r + cellData.c) * 0.03 }}
          />
        ))}
      </g>

      {/* solution vector x */}
      <g transform="translate(170 22)">
        {Array.from({ length: n }).map((_, r) => (
          <motion.rect
            key={r}
            y={r * cell}
            width={cell - 2}
            height={cell - 2}
            rx="2"
            fill="var(--surface-strong)"
            stroke="#34D399"
            strokeWidth="0.8"
            initial={{ opacity: 0, x: 8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.3, delay: 0.6 + r * 0.05 }}
          />
        ))}
        <text x="6" y={n * cell + 12} fontSize="7" fill="#34D399" fontFamily="var(--font-mono)">x</text>
      </g>
    </svg>
  );
}
