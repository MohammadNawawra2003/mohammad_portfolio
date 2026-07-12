"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";

/**
 * Compact CFD view of flow past a circular cylinder: a von-Kármán vortex street
 * in the wake, a warm upstream stagnation / cool low-pressure pressure field,
 * animated streamlines and drifting tracer particles. Hero-card scale.
 */
export function CfdCylinder({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion();

  // streamlines: straight approach, split around the cylinder, wavy wake.
  const lines = [
    { d: "M8 30 C 70 30, 110 26, 232 28", c: "#38bdf8", o: 0.7 },
    { d: "M8 52 C 70 52, 92 42, 108 44 C 130 46, 150 58, 175 54 C 200 50, 214 56, 232 54", c: "#2dd4bf", o: 0.9 },
    { d: "M8 78 C 70 78, 90 78, 100 78 M150 78 C 170 70, 190 86, 210 76 C 222 70, 228 80, 232 76", c: "#67e8f9", o: 0.95 },
    { d: "M8 104 C 70 104, 92 114, 108 112 C 130 110, 150 98, 175 102 C 200 106, 214 100, 232 102", c: "#2dd4bf", o: 0.9 },
    { d: "M8 126 C 70 126, 110 130, 232 128", c: "#60a5fa", o: 0.7 },
  ];

  // vortex curls in the wake (alternating sign), stylised.
  const vortices = [
    { cx: 150, cy: 64, r: 7, c: "#a5f3fc" },
    { cx: 168, cy: 92, r: 8, c: "#67e8f9" },
    { cx: 190, cy: 66, r: 7, c: "#a5f3fc" },
    { cx: 208, cy: 90, r: 6, c: "#67e8f9" },
  ];

  const particles = [
    { y0: 52, y1: 50, c: "#a5f3fc", dur: 3.2, delay: 0 },
    { y0: 104, y1: 100, c: "#67e8f9", dur: 3.6, delay: 0.9 },
    { y0: 30, y1: 28, c: "#2dd4bf", dur: 4, delay: 1.7 },
  ];

  return (
    <svg
      viewBox="0 0 240 160"
      className={cn("h-auto w-full", className)}
      role="img"
      aria-label="CFD flow past a cylinder with a von Karman vortex street"
    >
      <defs>
        <linearGradient id="cc-legend" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="50%" stopColor="#2dd4bf" />
          <stop offset="100%" stopColor="#a5f3fc" />
        </linearGradient>
        <radialGradient id="cc-cyl" cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#4c1d95" />
        </radialGradient>
        <radialGradient id="cc-stag" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fb923c" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#fb923c" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="cc-low" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3730a3" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#3730a3" stopOpacity="0" />
        </radialGradient>
        <filter id="cc-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <filter id="cc-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2.4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* technical grid */}
      <g stroke="var(--grid-line)" strokeWidth="0.6">
        {Array.from({ length: 11 }).map((_, i) => (
          <line key={`v${i}`} x1={8 + i * 22} y1="8" x2={8 + i * 22} y2="136" />
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={`h${i}`} x1="8" y1={10 + i * 21} x2="232" y2={10 + i * 21} />
        ))}
      </g>

      {/* pressure field */}
      <g filter="url(#cc-blur)">
        <ellipse cx="90" cy="78" rx="20" ry="18" fill="url(#cc-stag)" />
        <ellipse cx="118" cy="58" rx="18" ry="12" fill="url(#cc-low)" />
        <ellipse cx="118" cy="98" rx="18" ry="12" fill="url(#cc-low)" />
      </g>

      {/* vortices */}
      {vortices.map((v, i) => (
        <motion.circle
          key={i}
          cx={v.cx}
          cy={v.cy}
          r={v.r}
          fill="none"
          stroke={v.c}
          strokeWidth="1.3"
          opacity="0.6"
          strokeDasharray={`${v.r * 1.2} ${v.r * 3}`}
          initial={{ rotate: 0 }}
          animate={reduced ? undefined : { rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: `${v.cx}px ${v.cy}px` }}
        />
      ))}

      {/* streamlines */}
      {lines.map((l, i) => (
        <motion.path
          key={i}
          d={l.d}
          fill="none"
          stroke={l.c}
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity={l.o}
          strokeDasharray="6 9"
          initial={{ strokeDashoffset: 0 }}
          animate={reduced ? undefined : { strokeDashoffset: -150 }}
          transition={{ duration: 2.6 + i * 0.2, repeat: Infinity, ease: "linear" }}
        />
      ))}

      {/* tracer particles */}
      {!reduced &&
        particles.map((p, i) => (
          <motion.circle
            key={i}
            r="1.7"
            fill={p.c}
            filter="url(#cc-glow)"
            initial={{ cx: 8, cy: p.y0, opacity: 0 }}
            animate={{ cx: [8, 110, 232], cy: [p.y0, p.y1, p.y0], opacity: [0, 1, 0] }}
            transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "linear" }}
          />
        ))}

      {/* cylinder */}
      <circle cx="98" cy="78" r="15" fill="url(#cc-cyl)" filter="url(#cc-glow)" />
      <circle cx="98" cy="78" r="15" fill="none" stroke="#ede9fe" strokeWidth="1.2" />
      {/* upstream stagnation point */}
      <circle cx="83" cy="78" r="2.6" fill="#fb923c" filter="url(#cc-glow)" />

      {/* annotation */}
      <text x="232" y="18" fontSize="7.5" fill="var(--text-faint)" fontFamily="var(--font-mono)" textAnchor="end">
        Re = 140
      </text>

      {/* legend */}
      <g fontFamily="var(--font-mono)">
        <rect x="8" y="146" width="104" height="6.5" rx="2" fill="url(#cc-legend)" />
        <text x="8" y="143" fontSize="7" fill="var(--text-faint)">|U|</text>
        <text x="112" y="143" fontSize="7" fill="var(--text-muted)" textAnchor="end">m/s</text>
      </g>
    </svg>
  );
}
