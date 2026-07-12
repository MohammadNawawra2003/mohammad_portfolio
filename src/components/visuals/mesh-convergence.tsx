"use client";

import { motion } from "framer-motion";
import { drawLine, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Compact mesh-convergence study: a quantity of interest converging
 * monotonically toward the Richardson-extrapolated exact value (dashed
 * asymptote) as the mesh is refined, with shrinking error bars and a refining-
 * mesh glyph along the x-axis. Hero-card scale; visually distinct from the
 * section's log–log error plot.
 */
export function MeshConvergence({ className }: { className?: string }) {
  const X0 = 36;
  const X1 = 214;
  const Y1 = 116;
  const exactY = 44;

  // data points: x, y (QoI), half-error
  const pts = [
    { x: 56, y: 104, e: 13 },
    { x: 88, y: 80, e: 9 },
    { x: 124, y: 64, e: 5.5 },
    { x: 162, y: 53, e: 3 },
    { x: 198, y: 47, e: 1.5 },
  ];
  const curve = "M56 104 C 80 86, 104 70, 124 64 C 150 56, 178 49, 198 47";

  return (
    <svg
      viewBox="0 0 240 150"
      className={cn("h-auto w-full", className)}
      role="img"
      aria-label="Mesh convergence of a quantity of interest toward the extrapolated exact value"
    >
      {/* gridlines */}
      <g stroke="var(--grid-line)" strokeWidth="0.6">
        {[36, 72, 108].map((y) => (
          <line key={y} x1={X0} y1={y} x2={X1} y2={y} />
        ))}
      </g>

      {/* exact (Richardson) asymptote */}
      <line x1={X0} y1={exactY} x2={X1} y2={exactY} stroke="#34d399" strokeWidth="1" strokeDasharray="4 3" opacity="0.85" />
      <text x={X1} y={exactY - 4} fontSize="7" fill="#34d399" fontFamily="var(--font-mono)" textAnchor="end">
        exact (Richardson)
      </text>

      {/* axes */}
      <g stroke="var(--border-strong)" strokeWidth="1.1" fill="none">
        <path d={`M${X0} 26 L${X0} ${Y1} L${X1 + 4} ${Y1}`} />
      </g>

      {/* error bars */}
      <g stroke="var(--text-faint)" strokeWidth="1">
        {pts.map((p) => (
          <g key={p.x}>
            <line x1={p.x} y1={p.y - p.e} x2={p.x} y2={p.y + p.e} />
            <line x1={p.x - 2.5} y1={p.y - p.e} x2={p.x + 2.5} y2={p.y - p.e} />
            <line x1={p.x - 2.5} y1={p.y + p.e} x2={p.x + 2.5} y2={p.y + p.e} />
          </g>
        ))}
      </g>

      {/* convergence curve */}
      <motion.path
        d={curve}
        fill="none"
        stroke="#818cf8"
        strokeWidth="2"
        strokeLinecap="round"
        variants={drawLine}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* data markers */}
      <motion.g
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.4, delay: 0.7 }}
      >
        {pts.map((p, i) => (
          <circle key={p.x} cx={p.x} cy={p.y} r="2.8" fill={i === pts.length - 1 ? "#34d399" : "#c084fc"} />
        ))}
      </motion.g>

      {/* converged callout */}
      <text x="198" y="60" fontSize="7" fill="#34d399" fontFamily="var(--font-mono)" textAnchor="middle">
        converged
      </text>

      {/* refining-mesh glyph along x-axis */}
      <g transform="translate(56 124)">
        {[0, 46, 100].map((dx, gi) => {
          const n = gi + 1; // subdivision level
          const s = 18;
          return (
            <g key={dx} transform={`translate(${dx} 0)`} stroke="var(--text-faint)" strokeWidth="0.6" fill="none">
              <rect width={s} height={s} opacity="0.7" />
              {Array.from({ length: n }).map((_, j) => (
                <g key={j}>
                  <line x1={(s / (n + 1)) * (j + 1)} y1="0" x2={(s / (n + 1)) * (j + 1)} y2={s} />
                  <line x1="0" y1={(s / (n + 1)) * (j + 1)} x2={s} y2={(s / (n + 1)) * (j + 1)} />
                  <line x1="0" y1="0" x2={s} y2={s} opacity="0.5" />
                </g>
              ))}
            </g>
          );
        })}
      </g>

      {/* axis labels */}
      <text x={(X0 + X1) / 2 + 6} y="148" fontSize="7.5" fill="var(--text-muted)" fontFamily="var(--font-mono)" textAnchor="middle">
        mesh refinement →
      </text>
      <text x="14" y={(26 + Y1) / 2} fontSize="7.5" fill="var(--text-muted)" fontFamily="var(--font-mono)" transform={`rotate(-90 14 ${(26 + Y1) / 2})`} textAnchor="middle">
        QoI
      </text>
    </svg>
  );
}
