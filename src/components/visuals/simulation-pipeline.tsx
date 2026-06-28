"use client";

import { motion } from "framer-motion";
import { Box, Grid3x3, Cpu, LineChart } from "lucide-react";
import { viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

const stages = [
  { icon: Box, label: "Geometry", sub: "CAD / domain" },
  { icon: Grid3x3, label: "Mesh", sub: "discretize" },
  { icon: Cpu, label: "Solve", sub: "FEM / FVM" },
  { icon: LineChart, label: "Post", sub: "analyze" },
];

/** Horizontal simulation pipeline — the signature ribbon of the engineering section. */
export function SimulationPipeline({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-stretch gap-2", className)}>
      {stages.map((stage, i) => {
        const Icon = stage.icon;
        return (
          <motion.div
            key={stage.label}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.45, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-1 flex-col items-center gap-2 rounded-lg border border-[var(--border)] bg-surface px-2 py-4 text-center"
          >
            <span className="flex size-9 items-center justify-center rounded-md bg-brand-500/10 text-brand-400">
              <Icon className="size-[18px]" />
            </span>
            <span className="text-xs font-semibold text-text">{stage.label}</span>
            <span className="font-mono text-[0.6rem] text-text-faint">{stage.sub}</span>
            {i < stages.length - 1 ? (
              <span aria-hidden className="absolute -right-2.5 top-1/2 z-10 hidden -translate-y-1/2 text-brand-400 sm:block">
                →
              </span>
            ) : null}
          </motion.div>
        );
      })}
    </div>
  );
}
