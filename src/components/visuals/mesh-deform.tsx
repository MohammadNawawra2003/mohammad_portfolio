"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { drawLine, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * A triangulated finite-element mesh of a cantilever that bends under tip load.
 * Distinct from the flat FEM contour — this shows the *deformed* mesh geometry.
 */
export function MeshDeform({ className }: { className?: string }) {
  const cols = 9;
  const rows = 3;
  const x0 = 24;
  const w = 230;
  const h = 70;
  const { points, tris } = useMemo(() => {
    const pts: { x: number; y: number }[][] = [];
    for (let r = 0; r <= rows; r++) {
      const row: { x: number; y: number }[] = [];
      for (let c = 0; c <= cols; c++) {
        const fx = c / cols;
        const deflect = fx * fx * 26; // tip deflection grows quadratically
        row.push({ x: x0 + fx * w, y: 40 + (r / rows) * h + deflect });
      }
      pts.push(row);
    }
    const t: string[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const a = pts[r]![c]!;
        const b = pts[r]![c + 1]!;
        const d = pts[r + 1]![c]!;
        const e = pts[r + 1]![c + 1]!;
        t.push(`M${a.x} ${a.y} L${b.x} ${b.y} L${e.x} ${e.y} L${d.x} ${d.y} Z`);
        t.push(`M${a.x} ${a.y} L${e.x} ${e.y}`);
      }
    }
    return { points: pts, tris: t };
  }, []);

  return (
    <motion.svg
      viewBox="0 0 280 150"
      className={cn("h-auto w-full", className)}
      role="img"
      aria-label="Deformed finite-element mesh of a cantilever beam"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {/* support */}
      <line x1="20" y1="34" x2="20" y2="118" stroke="var(--text-faint)" strokeWidth="2" />
      {/* deformed mesh */}
      <g>
        {tris.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            fill={i % 2 === 0 ? "rgba(124,58,237,0.06)" : "none"}
            stroke="rgba(167,139,250,0.55)"
            strokeWidth="0.7"
            variants={drawLine}
            transition={{ duration: 1, delay: (i % cols) * 0.04 }}
          />
        ))}
      </g>
      {/* nodes */}
      {points.flat().map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="1.3" fill="#22D3EE" />
      ))}
      {/* load arrow at tip */}
      <g stroke="#ef4444" strokeWidth="1.5" fill="#ef4444">
        <line x1={x0 + w} y1="92" x2={x0 + w} y2="118" />
        <path d={`M${x0 + w - 4} 112 L${x0 + w} 120 L${x0 + w + 4} 112 Z`} />
      </g>
      <text x="6" y="140" fontSize="7" fill="var(--text-faint)" fontFamily="var(--font-mono)">deformed mesh · tip load</text>
    </motion.svg>
  );
}
