"use client";

import { motion } from "framer-motion";
import {
  Boxes,
  FileText,
  GitBranch,
  ShoppingCart,
  Truck,
  Users,
} from "lucide-react";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";

const modules = [
  { icon: Boxes, label: "Inventory", angle: -90, tint: "#4F46E5" },
  { icon: FileText, label: "Accounting", angle: -30, tint: "#2DD4BF" },
  { icon: GitBranch, label: "CRM", angle: 30, tint: "#F59E0B" },
  { icon: ShoppingCart, label: "Sales", angle: 90, tint: "#818CF8" },
  { icon: Truck, label: "Purchase", angle: 150, tint: "#34D399" },
  { icon: Users, label: "Employees", angle: 210, tint: "#60A5FA" },
];

/**
 * Odoo module ecosystem: a central ORM hub with satellite modules connected by
 * animated data links — the centerpiece of the Odoo section (replaces a card grid).
 */
export function OdooEcosystem({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion();
  const cx = 160;
  const cy = 160;
  const R = 112;

  const pos = (angle: number) => {
    const rad = (angle * Math.PI) / 180;
    return { x: cx + R * Math.cos(rad), y: cy + R * Math.sin(rad) };
  };

  return (
    <svg viewBox="0 0 320 320" className={cn("h-auto w-full", className)} role="img" aria-label="Odoo module ecosystem connected to a central ORM hub">
      <defs>
        <radialGradient id="hub-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(67, 56, 202,0.55)" />
          <stop offset="100%" stopColor="rgba(67, 56, 202,0)" />
        </radialGradient>
      </defs>

      {/* orbit ring */}
      <circle cx={cx} cy={cy} r={R} fill="none" stroke="var(--border)" strokeWidth="1" strokeDasharray="2 5" />
      <circle cx={cx} cy={cy} r="86" fill="url(#hub-glow)" />

      {/* links + packets */}
      {modules.map((m, i) => {
        const p = pos(m.angle);
        return (
          <g key={`l-${m.label}`}>
            <line x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="var(--border-strong)" strokeWidth="1" opacity="0.6" />
            {!reduced ? (
              <motion.circle
                r="2.2"
                fill={m.tint}
                initial={{ cx, cy }}
                animate={{ cx: [cx, p.x], cy: [cy, p.y] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.25 }}
              />
            ) : null}
          </g>
        );
      })}

      {/* module nodes */}
      {modules.map((m, i) => {
        const p = pos(m.angle);
        const Icon = m.icon;
        return (
          <motion.g
            key={m.label}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <circle cx={p.x} cy={p.y} r="26" fill="var(--bg-elev)" stroke="var(--border-strong)" strokeWidth="1" />
            <foreignObject x={p.x - 11} y={p.y - 16} width="22" height="22">
              <Icon style={{ width: 18, height: 18, color: m.tint }} />
            </foreignObject>
            <text x={p.x} y={p.y + 16} fontSize="7.5" fill="var(--text-muted)" textAnchor="middle" fontFamily="var(--font-mono)">
              {m.label}
            </text>
          </motion.g>
        );
      })}

      {/* central hub */}
      <motion.g
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <circle cx={cx} cy={cy} r="34" fill="var(--bg-elev)" stroke="#714B67" strokeWidth="1.5" />
        <text x={cx} y={cy - 2} fontSize="13" fill="#818CF8" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="700">
          odoo
        </text>
        <text x={cx} y={cy + 12} fontSize="7" fill="var(--text-faint)" textAnchor="middle" fontFamily="var(--font-mono)">
          ORM core
        </text>
      </motion.g>
    </svg>
  );
}
