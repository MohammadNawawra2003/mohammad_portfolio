"use client";

import { motion } from "framer-motion";
import { drawLine, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Compact FEA von-Mises stress contour on an L-shaped mounting bracket. The
 * stress concentrates at the re-entrant (inner) corner — the classic hot spot —
 * fading outward through a vivid blue→green→yellow→red field, with a quad mesh
 * overlay, fixed bolt holes, an applied load and a MPa legend. Hero-card scale.
 */
export function FeaBracket({ className }: { className?: string }) {
  const outline = "M34 26 H150 V48 H64 V118 H34 Z";

  return (
    <svg
      viewBox="0 0 240 160"
      className={cn("h-auto w-full", className)}
      role="img"
      aria-label="Finite element von Mises stress contour on an L-bracket"
    >
      <defs>
        <radialGradient id="fb-stress" cx="64" cy="48" r="118" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="16%" stopColor="#f97316" />
          <stop offset="34%" stopColor="#facc15" />
          <stop offset="56%" stopColor="#22c55e" />
          <stop offset="78%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </radialGradient>
        <linearGradient id="fb-legend" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="30%" stopColor="#22d3ee" />
          <stop offset="52%" stopColor="#22c55e" />
          <stop offset="74%" stopColor="#facc15" />
          <stop offset="100%" stopColor="#ef4444" />
        </linearGradient>
        <clipPath id="fb-clip">
          <path d={outline} />
        </clipPath>
        <filter id="fb-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* stressed body + mesh */}
      <g clipPath="url(#fb-clip)">
        <rect x="30" y="22" width="124" height="100" fill="url(#fb-stress)" />
        <g stroke="rgba(255,255,255,0.18)" strokeWidth="0.5">
          {Array.from({ length: 12 }).map((_, c) => (
            <line key={`c${c}`} x1={34 + c * 11} y1="22" x2={34 + c * 11} y2="122" />
          ))}
          {Array.from({ length: 10 }).map((_, r) => (
            <line key={`r${r}`} x1="30" y1={26 + r * 11} x2="154" y2={26 + r * 11} />
          ))}
        </g>
      </g>

      {/* bracket outline draw-on */}
      <motion.path
        d={outline}
        fill="none"
        stroke="var(--text)"
        strokeWidth="1.2"
        filter="url(#fb-glow)"
        variants={drawLine}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      />

      {/* fixed bolt holes */}
      {[
        [132, 37],
        [49, 104],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="5" fill="var(--bg)" stroke="var(--text-muted)" strokeWidth="1" />
          <circle cx={x} cy={y} r="2" fill="var(--text-faint)" />
        </g>
      ))}

      {/* applied load at the free tip */}
      <g stroke="#fb923c" strokeWidth="1.6" fill="#fb923c">
        <line x1="141" y1="12" x2="141" y2="24" />
        <path d="M137 19 L141 26 L145 19 Z" />
      </g>

      {/* legend */}
      <g fontFamily="var(--font-mono)">
        <rect x="34" y="140" width="120" height="7" rx="2" fill="url(#fb-legend)" />
        <text x="34" y="137" fontSize="7" fill="var(--text-faint)">σᵥ (MPa)</text>
        <text x="34" y="156" fontSize="6.5" fill="var(--text-faint)">0</text>
        <text x="154" y="156" fontSize="6.5" fill="var(--text-muted)" textAnchor="end">320</text>
      </g>
    </svg>
  );
}
