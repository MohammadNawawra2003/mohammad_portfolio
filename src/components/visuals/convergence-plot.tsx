"use client";

import { motion } from "framer-motion";
import { drawLine, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Publication-style mesh-convergence study: discretisation error vs. degrees of
 * freedom on log–log axes for three element orders (P1/P2/P3), each converging
 * at a different observed rate. Includes a confidence band on the P2 series, a
 * reference-slope triangle, decade gridlines, data markers and a legend —
 * styled to resemble a figure from an engineering journal. Illustrative SVG.
 */
export function ConvergencePlot({ className }: { className?: string }) {
  // plot box
  const X0 = 52;
  const X1 = 330;
  const Y0 = 22;
  const Y1 = 200;

  // decade tick positions
  const xTicks = [
    { x: 78, label: "10²" },
    { x: 142, label: "10³" },
    { x: 206, label: "10⁴" },
    { x: 270, label: "10⁵" },
  ];
  const yTicks = [
    { y: 40, label: "10⁻¹" },
    { y: 72, label: "10⁻²" },
    { y: 104, label: "10⁻³" },
    { y: 136, label: "10⁻⁴" },
    { y: 168, label: "10⁻⁵" },
  ];

  // straight log–log lines, steeper = higher order. [x,y] node pairs.
  const series = [
    {
      label: "P1 · O(h)",
      color: "#f472b6",
      pts: [
        [78, 56],
        [142, 86],
        [206, 116],
        [296, 158],
      ],
      marker: "circle" as const,
    },
    {
      label: "P2 · O(h²)",
      color: "#818cf8",
      pts: [
        [78, 70],
        [142, 110],
        [206, 150],
        [296, 188],
      ],
      marker: "square" as const,
    },
    {
      label: "P3 · O(h³)",
      color: "#2dd4bf",
      pts: [
        [78, 84],
        [142, 132],
        [206, 178],
      ],
      marker: "triangle" as const,
    },
  ];

  const path = (pts: number[][]) => "M" + pts.map((p) => `${p[0]} ${p[1]}`).join(" L");

  const marker = (m: "circle" | "square" | "triangle", x: number, y: number, c: string) => {
    if (m === "square") return <rect key={`${x}-${y}`} x={x - 2.6} y={y - 2.6} width="5.2" height="5.2" fill={c} />;
    if (m === "triangle")
      return <path key={`${x}-${y}`} d={`M${x} ${y - 3.2} L${x + 3} ${y + 2.6} L${x - 3} ${y + 2.6} Z`} fill={c} />;
    return <circle key={`${x}-${y}`} cx={x} cy={y} r="2.8" fill={c} />;
  };

  return (
    <svg
      viewBox="0 0 360 240"
      className={cn("h-auto w-full", className)}
      role="img"
      aria-label="Log-log mesh convergence plot of error versus degrees of freedom for three element orders"
    >
      <defs>
        <linearGradient id="conv-band" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#818cf8" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#818cf8" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* decade gridlines */}
      <g stroke="var(--grid-line)" strokeWidth="0.75">
        {xTicks.map((t) => (
          <line key={`gx${t.x}`} x1={t.x} y1={Y0} x2={t.x} y2={Y1} />
        ))}
        {yTicks.map((t) => (
          <line key={`gy${t.y}`} x1={X0} y1={t.y} x2={X1} y2={t.y} />
        ))}
      </g>

      {/* confidence band around P2 */}
      <motion.path
        d="M78 64 L142 104 L206 144 L296 182 L296 194 L206 156 L142 116 L78 76 Z"
        fill="url(#conv-band)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.8, delay: 0.4 }}
      />

      {/* axes with arrowheads */}
      <g stroke="var(--border-strong)" strokeWidth="1.1" fill="none">
        <path d={`M${X0} ${Y0 - 6} L${X0} ${Y1} L${X1 + 6} ${Y1}`} />
        <path d={`M${X0 - 3} ${Y0} L${X0} ${Y0 - 7} L${X0 + 3} ${Y0}`} fill="var(--border-strong)" />
        <path d={`M${X1 + 2} ${Y1 - 3} L${X1 + 9} ${Y1} L${X1 + 2} ${Y1 + 3}`} fill="var(--border-strong)" />
      </g>

      {/* tick labels */}
      <g fontFamily="var(--font-mono)" fontSize="7.5" fill="var(--text-faint)">
        {xTicks.map((t) => (
          <text key={`tx${t.x}`} x={t.x} y={Y1 + 12} textAnchor="middle">
            {t.label}
          </text>
        ))}
        {yTicks.map((t) => (
          <text key={`ty${t.y}`} x={X0 - 6} y={t.y + 2.5} textAnchor="end">
            {t.label}
          </text>
        ))}
      </g>

      {/* reference-slope triangle (order-3 guide) */}
      <g stroke="var(--text-faint)" strokeWidth="0.9" fill="none" opacity="0.8">
        <path d="M232 150 L272 150 L272 186 Z" />
      </g>
      <g fontFamily="var(--font-mono)" fontSize="7" fill="var(--text-faint)">
        <text x="252" y="161" textAnchor="middle">
          1
        </text>
        <text x="278" y="171">
          3
        </text>
      </g>

      {/* curves + markers */}
      {series.map((s, i) => (
        <g key={s.label}>
          <motion.path
            d={path(s.pts)}
            fill="none"
            stroke={s.color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={drawLine}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={{ duration: 1.1, delay: i * 0.18, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.g
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.4, delay: 0.6 + i * 0.18 }}
          >
            {s.pts.map(([x, y]) => marker(s.marker, x!, y!, s.color))}
          </motion.g>
        </g>
      ))}

      {/* axis titles */}
      <text
        x={(X0 + X1) / 2}
        y={Y1 + 28}
        fontSize="8.5"
        fill="var(--text-muted)"
        fontFamily="var(--font-mono)"
        textAnchor="middle"
      >
        Degrees of freedom, N
      </text>
      <text
        x="16"
        y={(Y0 + Y1) / 2}
        fontSize="8.5"
        fill="var(--text-muted)"
        fontFamily="var(--font-mono)"
        transform={`rotate(-90 16 ${(Y0 + Y1) / 2})`}
        textAnchor="middle"
      >
        L² error
      </text>

      {/* legend */}
      <g fontFamily="var(--font-mono)" fontSize="7.5">
        {series.map((s, i) => (
          <g key={s.label} transform={`translate(${X1 - 70} ${Y0 + 6 + i * 12})`}>
            <line x1="0" y1="-1" x2="12" y2="-1" stroke={s.color} strokeWidth="2" />
            <g transform="translate(6 -1)">{marker(s.marker, 0, 0, s.color)}</g>
            <text x="18" y="2" fill="var(--text-muted)">
              {s.label}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}
