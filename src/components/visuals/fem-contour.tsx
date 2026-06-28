"use client";

import { motion } from "framer-motion";
import { drawLine, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Stylised FEM von-Mises stress contour on a cantilever beam, with a mesh
 * overlay and a 0–250 MPa legend. Illustrative engineering art (SVG).
 */
export function FemContour({ className }: { className?: string }) {
  const cols = 14;
  const rows = 5;
  const cellW = 240 / cols;
  const cellH = 70 / rows;

  return (
    <svg viewBox="0 0 280 150" className={cn("h-auto w-full", className)} role="img" aria-label="Finite element stress contour on a cantilever beam">
      <defs>
        <linearGradient id="fem-stress" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="25%" stopColor="#06b6d4" />
          <stop offset="50%" stopColor="#22c55e" />
          <stop offset="72%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#ef4444" />
        </linearGradient>
        <linearGradient id="fem-legend" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="25%" stopColor="#06b6d4" />
          <stop offset="50%" stopColor="#22c55e" />
          <stop offset="72%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#ef4444" />
        </linearGradient>
        <clipPath id="fem-beam">
          <path d="M20 35 L260 48 L260 92 L20 105 Z" />
        </clipPath>
      </defs>

      {/* fixed-support hatching */}
      <g stroke="var(--text-faint)" strokeWidth="1" opacity="0.5">
        <line x1="14" y1="30" x2="14" y2="110" strokeWidth="2" />
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={i} x1="14" y1={34 + i * 14} x2="8" y2={42 + i * 14} />
        ))}
      </g>

      {/* stressed beam */}
      <g clipPath="url(#fem-beam)">
        <rect x="20" y="30" width="240" height="80" fill="url(#fem-stress)" opacity="0.92" />
        {/* mesh grid */}
        <g stroke="rgba(255,255,255,0.22)" strokeWidth="0.5">
          {Array.from({ length: cols + 1 }).map((_, c) => (
            <line key={`c${c}`} x1={20 + c * cellW} y1="30" x2={20 + c * cellW} y2="110" />
          ))}
          {Array.from({ length: rows + 1 }).map((_, r) => (
            <line key={`r${r}`} x1="20" y1={35 + r * cellH} x2="260" y2={48 + r * cellH} />
          ))}
        </g>
      </g>

      {/* beam outline draw-on */}
      <motion.path
        d="M20 35 L260 48 L260 92 L20 105 Z"
        fill="none"
        stroke="var(--text)"
        strokeWidth="1.2"
        variants={drawLine}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      />

      {/* applied load arrow */}
      <g stroke="#ef4444" strokeWidth="1.6" fill="#ef4444">
        <line x1="260" y1="20" x2="260" y2="44" />
        <path d="M256 38 L260 46 L264 38 Z" />
      </g>

      {/* legend */}
      <rect x="20" y="126" width="180" height="8" rx="2" fill="url(#fem-legend)" />
      <text x="20" y="146" fontSize="8" fill="var(--text-faint)" fontFamily="var(--font-mono)">0</text>
      <text x="104" y="146" fontSize="8" fill="var(--text-faint)" fontFamily="var(--font-mono)" textAnchor="middle">125</text>
      <text x="200" y="146" fontSize="8" fill="var(--text-faint)" fontFamily="var(--font-mono)" textAnchor="end">250</text>
      <text x="210" y="133" fontSize="7.5" fill="var(--text-muted)" fontFamily="var(--font-mono)">MPa</text>
    </svg>
  );
}
