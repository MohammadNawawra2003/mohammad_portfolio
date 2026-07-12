"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { drawLine, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Premium CFD post-processing view: external flow over a cambered NACA airfoil
 * at angle of attack. Combines a blurred velocity/pressure field, iso-velocity
 * contour lines, animated streamlines coloured by speed, a leading-edge
 * stagnation point, drifting tracer particles and a velocity legend — styled to
 * read like a frame exported from Fluent / OpenFOAM. Illustrative SVG art.
 */
export function CfdAirfoil({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion();

  // Streamlines, ordered top → bottom. Lines grazing the suction (upper)
  // surface compress and accelerate → brighter cyan; lower surface stays slower.
  const streamlines = [
    { d: "M14 44 C 130 42, 200 36, 348 40", c: "#38bdf8", w: 1.3, o: 0.7 },
    { d: "M14 70 C 120 68, 170 54, 232 56 C 288 58, 322 64, 348 66", c: "#2dd4bf", w: 1.5, o: 0.85 },
    { d: "M14 96 C 110 96, 150 74, 202 78 C 256 82, 312 92, 348 94", c: "#67e8f9", w: 1.7, o: 0.95 },
    { d: "M14 122 C 96 122, 138 98, 192 103 C 246 108, 304 118, 348 120", c: "#a5f3fc", w: 1.8, o: 1 },
    { d: "M14 178 C 110 178, 168 186, 236 183 C 296 180, 324 177, 348 177", c: "#60a5fa", w: 1.5, o: 0.8 },
    { d: "M14 202 C 120 202, 210 205, 348 202", c: "#818cf8", w: 1.3, o: 0.7 },
    { d: "M14 222 C 120 222, 210 222, 348 221", c: "#6366f1", w: 1.2, o: 0.55 },
  ];

  // Tracer particles drifting along the upper, fast lanes.
  const particles = [
    { y0: 96, y1: 78, y2: 94, c: "#a5f3fc", dur: 3.4, delay: 0 },
    { y0: 122, y1: 103, y2: 120, c: "#67e8f9", dur: 3, delay: 0.8 },
    { y0: 70, y1: 56, y2: 66, c: "#2dd4bf", dur: 3.8, delay: 1.6 },
    { y0: 178, y1: 184, y2: 177, c: "#60a5fa", dur: 4.2, delay: 0.4 },
  ];

  const airfoil =
    "M108 150 C 128 121, 178 115, 222 126 C 240 131, 250 135, 253 138 C 240 145, 198 152, 150 154 C 128 154, 114 153, 108 150 Z";

  return (
    <svg
      viewBox="0 0 360 240"
      className={cn("h-auto w-full", className)}
      role="img"
      aria-label="CFD velocity field and streamlines over an airfoil at angle of attack"
    >
      <defs>
        <linearGradient id="cfd-vlegend" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="35%" stopColor="#60a5fa" />
          <stop offset="70%" stopColor="#2dd4bf" />
          <stop offset="100%" stopColor="#a5f3fc" />
        </linearGradient>
        <linearGradient id="cfd-foil" x1="0" y1="0" x2="1" y2="0.4">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="55%" stopColor="#4338ca" />
          <stop offset="100%" stopColor="#4c1d95" />
        </linearGradient>
        <radialGradient id="cfd-suction" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3730a3" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#3730a3" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="cfd-stag" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fb923c" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#fb923c" stopOpacity="0" />
        </radialGradient>
        <filter id="cfd-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
        <filter id="cfd-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* thin technical grid */}
      <g stroke="var(--grid-line)" strokeWidth="0.75">
        {Array.from({ length: 15 }).map((_, i) => (
          <line key={`v${i}`} x1={14 + i * 24} y1="12" x2={14 + i * 24} y2="216" />
        ))}
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`h${i}`} x1="14" y1={16 + i * 25} x2="350" y2={16 + i * 25} />
        ))}
      </g>

      {/* velocity / pressure field (blurred) */}
      <g filter="url(#cfd-blur)">
        <ellipse cx="186" cy="108" rx="92" ry="30" fill="url(#cfd-suction)" />
        <ellipse cx="210" cy="118" rx="70" ry="20" fill="#2dd4bf" opacity="0.18" />
        <ellipse cx="110" cy="150" rx="26" ry="20" fill="url(#cfd-stag)" />
        <ellipse cx="300" cy="150" rx="60" ry="24" fill="#1e3a8a" opacity="0.22" />
      </g>

      {/* iso-velocity contour lines over the suction side */}
      <g fill="none" stroke="#a5f3fc" strokeWidth="0.8" opacity="0.4" strokeDasharray="2 4">
        <path d="M120 118 C 160 92, 220 92, 268 116" />
        <path d="M130 124 C 168 104, 218 104, 256 122" />
      </g>

      {/* streamlines */}
      {streamlines.map((l, i) => (
        <motion.path
          key={i}
          d={l.d}
          fill="none"
          stroke={l.c}
          strokeWidth={l.w}
          strokeLinecap="round"
          opacity={l.o}
          strokeDasharray="7 11"
          initial={{ strokeDashoffset: 0 }}
          animate={reduced ? undefined : { strokeDashoffset: -180 }}
          transition={{ duration: 3 + i * 0.22, repeat: Infinity, ease: "linear" }}
        />
      ))}

      {/* tracer particles */}
      {!reduced &&
        particles.map((p, i) => (
          <motion.circle
            key={i}
            r="1.9"
            fill={p.c}
            filter="url(#cfd-glow)"
            initial={{ cx: 14, cy: p.y0, opacity: 0 }}
            animate={{ cx: [14, 186, 348], cy: [p.y0, p.y1, p.y2], opacity: [0, 1, 0] }}
            transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "linear" }}
          />
        ))}

      {/* airfoil */}
      <path d={airfoil} fill="url(#cfd-foil)" filter="url(#cfd-glow)" />
      <motion.path
        d={airfoil}
        fill="none"
        stroke="#ede9fe"
        strokeWidth="1.3"
        variants={drawLine}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      />
      {/* chord line at angle of attack */}
      <line x1="108" y1="150" x2="253" y2="138" stroke="#ede9fe" strokeWidth="0.6" strokeDasharray="3 3" opacity="0.5" />

      {/* leading-edge stagnation point */}
      <circle cx="108" cy="150" r="3.2" fill="#fb923c" filter="url(#cfd-glow)" />
      <circle cx="108" cy="150" r="6" fill="none" stroke="#fb923c" strokeWidth="0.8" opacity="0.5" />

      {/* technical annotations */}
      <g fontFamily="var(--font-mono)" fill="var(--text-faint)" fontSize="8">
        <text x="346" y="20" textAnchor="end">Re = 1.2×10⁶</text>
        <text x="346" y="32" textAnchor="end">α = 6°  ·  M = 0.15</text>
      </g>

      {/* velocity legend */}
      <g fontFamily="var(--font-mono)">
        <rect x="14" y="226" width="118" height="7" rx="2" fill="url(#cfd-vlegend)" />
        <text x="14" y="223" fontSize="7.5" fill="var(--text-faint)">|U|</text>
        <text x="14" y="232" fontSize="6" fill="#0b0b12">0</text>
        <text x="132" y="223" fontSize="7.5" fill="var(--text-muted)" textAnchor="end">68 m/s</text>
      </g>
    </svg>
  );
}
