"use client";

import { motion } from "framer-motion";
import { viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** PostgreSQL relational schema: three tables with a foreign-key relation. */
export function DbSchema({ className }: { className?: string }) {
  const tables = [
    { x: 8, y: 16, name: "res_partner", rows: ["id  PK", "name", "email"] },
    { x: 120, y: 10, name: "sale_order", rows: ["id  PK", "partner_id  FK", "amount"] },
    { x: 120, y: 96, name: "account_move", rows: ["id  PK", "order_id  FK"] },
  ];
  return (
    <svg viewBox="0 0 220 160" className={cn("h-auto w-full", className)} role="img" aria-label="PostgreSQL relational schema with foreign keys">
      {/* relation lines */}
      <path d="M72 40 H100 V34 H120" fill="none" stroke="#22D3EE" strokeWidth="1" strokeDasharray="3 3" />
      <path d="M150 76 V96" fill="none" stroke="#22D3EE" strokeWidth="1" strokeDasharray="3 3" />

      {tables.map((t, i) => (
        <motion.g
          key={t.name}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.4, delay: i * 0.12 }}
        >
          <rect x={t.x} y={t.y} width="92" height={18 + t.rows.length * 13} rx="6" fill="var(--surface-strong)" stroke="var(--border-strong)" strokeWidth="1" />
          <rect x={t.x} y={t.y} width="92" height="16" rx="6" fill="rgba(124,58,237,0.18)" />
          <text x={t.x + 8} y={t.y + 11} fontSize="7" fill="#A78BFA" fontFamily="var(--font-mono)" fontWeight="600">{t.name}</text>
          {t.rows.map((row, r) => (
            <text key={r} x={t.x + 8} y={t.y + 28 + r * 13} fontSize="6.5" fill="var(--text-muted)" fontFamily="var(--font-mono)">
              {row}
            </text>
          ))}
        </motion.g>
      ))}
    </svg>
  );
}
