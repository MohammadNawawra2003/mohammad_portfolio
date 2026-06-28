"use client";

import { motion } from "framer-motion";
import { odooApps } from "@/data/odoo";
import { cn } from "@/lib/utils";

/** Original recreation of an Odoo-style app grid (not a proprietary screenshot). */
export function OdooDashboardCard({ className }: { className?: string }) {
  return (
    <div className={cn("w-[220px]", className)}>
      <div className="mb-2 flex items-center gap-1.5">
        <span className="size-2 rounded-full bg-danger/70" />
        <span className="size-2 rounded-full bg-warning/70" />
        <span className="size-2 rounded-full bg-success/70" />
        <span className="ml-1 font-mono text-[0.6rem] font-semibold text-odoo">odoo</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {odooApps.map((app, i) => {
          const Icon = app.icon;
          return (
            <motion.div
              key={app.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-1 rounded-md border border-[var(--border)] bg-bg-elev/50 px-1 py-2"
            >
              <span
                className="flex size-7 items-center justify-center rounded-md"
                style={{ backgroundColor: `${app.tint}22`, color: app.tint }}
              >
                <Icon className="size-4" />
              </span>
              <span className="text-[0.55rem] font-medium text-text-muted">{app.name}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
