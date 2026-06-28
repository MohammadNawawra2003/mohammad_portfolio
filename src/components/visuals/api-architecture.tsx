"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";

/**
 * REST API architecture diagram: external clients → API gateway → Odoo → DB,
 * with animated request packets flowing along the wires. Unique to the Odoo /
 * integrations story (not reused elsewhere).
 */
export function ApiArchitecture({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion();
  const nodes = [
    { x: 26, label: "Client", sub: "registration" },
    { x: 110, label: "REST API", sub: "auth" },
    { x: 194, label: "Odoo", sub: "ORM" },
    { x: 270, label: "DB", sub: "Postgres" },
  ];

  return (
    <svg viewBox="0 0 300 150" className={cn("h-auto w-full", className)} role="img" aria-label="REST API architecture from client to Odoo to database">
      <defs>
        <linearGradient id="api-wire" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
      </defs>

      {/* wires */}
      {[0, 1, 2].map((i) => (
        <line
          key={i}
          x1={nodes[i]!.x + 30}
          y1="62"
          x2={nodes[i + 1]!.x - 6}
          y2="62"
          stroke="url(#api-wire)"
          strokeWidth="1.4"
          opacity="0.5"
        />
      ))}

      {/* animated packets */}
      {!reduced &&
        [0, 1, 2].map((i) => (
          <motion.circle
            key={`p${i}`}
            r="2.4"
            fill="#22D3EE"
            cy="62"
            initial={{ cx: nodes[i]!.x + 30 }}
            animate={{ cx: [nodes[i]!.x + 30, nodes[i + 1]!.x - 6] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
          />
        ))}

      {/* nodes */}
      {nodes.map((n, i) => (
        <g key={n.label}>
          <rect
            x={n.x - 4}
            y="44"
            width="38"
            height="36"
            rx="8"
            fill="var(--surface-strong)"
            stroke={i === 2 ? "#714B67" : "var(--border-strong)"}
            strokeWidth="1"
          />
          <circle cx={n.x + 15} cy="56" r="3.4" fill={i === 1 ? "#22D3EE" : i === 3 ? "#34D399" : "#A78BFA"} />
          <text x={n.x + 15} y="71" fontSize="6.5" fill="var(--text)" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="600">
            {n.label}
          </text>
          <text x={n.x + 15} y="92" fontSize="5.5" fill="var(--text-faint)" textAnchor="middle" fontFamily="var(--font-mono)">
            {n.sub}
          </text>
        </g>
      ))}

      {/* method chips */}
      <g fontFamily="var(--font-mono)" fontSize="6">
        {["GET", "POST", "PATCH"].map((m, i) => (
          <g key={m} transform={`translate(${48 + i * 84} 26)`}>
            <rect width="34" height="13" rx="6.5" fill="rgba(124,58,237,0.12)" stroke="rgba(124,58,237,0.4)" strokeWidth="0.6" />
            <text x="17" y="9" fill="#A78BFA" textAnchor="middle">{m}</text>
          </g>
        ))}
      </g>
    </svg>
  );
}
