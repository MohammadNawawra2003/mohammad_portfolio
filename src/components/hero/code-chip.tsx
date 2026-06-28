"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const lines: { t: string; c: string }[] = [
  { t: "class SaleOrder(models.Model):", c: "text-brand-400" },
  { t: "  _inherit = 'sale.order'", c: "text-text-muted" },
  { t: "  @api.model", c: "text-accent-cyan" },
  { t: "  def sync_payment(self):", c: "text-brand-400" },
  { t: "    return self._post(api)", c: "text-text-muted" },
];

/** Floating code snippet chip (Odoo/Python flavour). */
export function CodeChip({ className }: { className?: string }) {
  return (
    <div className={cn("w-[208px] font-mono text-[0.6rem] leading-relaxed", className)}>
      <div className="mb-2 flex items-center justify-between">
        <span className="eyebrow text-[0.5rem]">models.py</span>
        <span className="flex gap-1">
          <span className="size-1.5 rounded-full bg-text-faint/50" />
          <span className="size-1.5 rounded-full bg-text-faint/50" />
        </span>
      </div>
      {lines.map((line, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 + i * 0.08 }}
          className={cn("whitespace-pre", line.c)}
        >
          {line.t}
        </motion.p>
      ))}
    </div>
  );
}
