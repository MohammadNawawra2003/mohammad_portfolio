"use client";

import { motion } from "framer-motion";
import { drawLine, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Numerical-methods composition: the sparsity pattern (spy plot) of a 2D
 * Poisson operator discretised on a structured grid, the 5-point finite-
 * difference stencil that generates it, and a solver residual trace dropping
 * over iterations. Reads like a MATLAB `spy(A)` figure paired with a stencil
 * schematic. Illustrative SVG art.
 */
export function SparseSolver({ className }: { className?: string }) {
  // ---- spy plot geometry ----
  const N = 22; // logical matrix dimension
  const MX = 24; // left of matrix
  const MY = 34; // top of matrix
  const MS = 150; // matrix side
  const cell = MS / N;
  const pos = (i: number) => MX + (i + 0.5) * cell;

  // penta-diagonal pattern: main, ±1, ±k  (k = grid width)
  const k = 5;
  const dots: { i: number; j: number; main: boolean }[] = [];
  for (let i = 0; i < N; i++) {
    dots.push({ i, j: i, main: true });
    if (i + 1 < N) {
      dots.push({ i, j: i + 1, main: false });
      dots.push({ i: i + 1, j: i, main: false });
    }
    if (i + k < N) {
      dots.push({ i, j: i + k, main: false });
      dots.push({ i: i + k, j: i, main: false });
    }
  }

  // ---- stencil geometry ----
  const cx = 268;
  const cy = 92;
  const arm = 30;

  // ---- residual trace ----
  const resD = "M214 168 C 232 170, 244 182, 258 186 C 276 191, 292 198, 332 204";

  return (
    <svg
      viewBox="0 0 360 240"
      className={cn("h-auto w-full", className)}
      role="img"
      aria-label="Sparse matrix spy plot of a 2D Poisson operator with its five-point stencil and a solver residual trace"
    >
      <defs>
        <linearGradient id="sp-main" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <filter id="sp-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2.4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ---- spy plot ---- */}
      {/* faint matrix grid */}
      <g stroke="var(--grid-line)" strokeWidth="0.5">
        {Array.from({ length: N + 1 }).map((_, i) => (
          <line key={`vx${i}`} x1={MX + i * cell} y1={MY} x2={MX + i * cell} y2={MY + MS} />
        ))}
        {Array.from({ length: N + 1 }).map((_, i) => (
          <line key={`vy${i}`} x1={MX} y1={MY + i * cell} x2={MX + MS} y2={MY + i * cell} />
        ))}
      </g>
      {/* matrix frame */}
      <rect x={MX} y={MY} width={MS} height={MS} fill="none" stroke="var(--border-strong)" strokeWidth="1" />

      {/* non-zero entries */}
      <motion.g
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={{ visible: { transition: { staggerChildren: 0.004 } } }}
      >
        {dots.map((d, n) => (
          <motion.rect
            key={n}
            x={pos(d.j) - 2}
            y={pos(d.i) - 2}
            width="4"
            height="4"
            rx="0.8"
            fill={d.main ? "url(#sp-main)" : "#22d3ee"}
            opacity={d.main ? 1 : 0.85}
            variants={{ hidden: { opacity: 0, scale: 0 }, visible: { opacity: d.main ? 1 : 0.85, scale: 1 } }}
          />
        ))}
      </motion.g>

      {/* spy labels */}
      <g fontFamily="var(--font-mono)" fill="var(--text-faint)" fontSize="7.5">
        <text x={MX} y={MY - 8}>
          spy(A) · 2D Poisson
        </text>
        <text x={MX + MS} y={MY + MS + 13} textAnchor="end">
          nnz = 5N − O(√N)
        </text>
      </g>

      {/* ---- 5-point stencil ---- */}
      <g fontFamily="var(--font-mono)">
        <text x={cx} y={26} fontSize="7.5" fill="var(--text-faint)" textAnchor="middle">
          5-point Laplacian
        </text>
        {/* connecting arms */}
        <g stroke="var(--border-strong)" strokeWidth="1">
          <line x1={cx} y1={cy} x2={cx} y2={cy - arm} />
          <line x1={cx} y1={cy} x2={cx} y2={cy + arm} />
          <line x1={cx} y1={cy} x2={cx - arm} y2={cy} />
          <line x1={cx} y1={cy} x2={cx + arm} y2={cy} />
        </g>
        {/* neighbour nodes */}
        {[
          [cx, cy - arm],
          [cx, cy + arm],
          [cx - arm, cy],
          [cx + arm, cy],
        ].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="7.5" fill="#0b0b12" stroke="#22d3ee" strokeWidth="1.2" />
            <text x={x} y={y! + 2.6} fontSize="7.5" fill="#67e8f9" textAnchor="middle">
              1
            </text>
          </g>
        ))}
        {/* centre node */}
        <circle cx={cx} cy={cy} r="9.5" fill="url(#sp-main)" filter="url(#sp-glow)" />
        <text x={cx} y={cy + 3} fontSize="8" fill="#0b0b12" textAnchor="middle" fontWeight="700">
          −4
        </text>
        {/* discrete operator caption */}
        <text x={cx} y={cy + arm + 22} fontSize="8" fill="var(--text-muted)" textAnchor="middle">
          ∇²u ≈ (Δx)⁻²·Au
        </text>
      </g>

      {/* ---- solver residual trace ---- */}
      <g fontFamily="var(--font-mono)" fontSize="7" fill="var(--text-faint)">
        <text x="214" y="156">
          ‖r‖ vs. iter
        </text>
      </g>
      <g stroke="var(--grid-line)" strokeWidth="0.5">
        {[176, 188, 200].map((y) => (
          <line key={y} x1="214" y1={y} x2="338" y2={y} />
        ))}
      </g>
      <motion.path
        d={resD}
        fill="none"
        stroke="#fb923c"
        strokeWidth="1.8"
        strokeLinecap="round"
        variants={drawLine}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.circle
        cx="332"
        cy="204"
        r="2.6"
        fill="#fb923c"
        filter="url(#sp-glow)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewportOnce}
        transition={{ delay: 1.4 }}
      />
    </svg>
  );
}
