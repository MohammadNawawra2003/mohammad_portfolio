"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface Equation {
  expr: string;
  label: string;
}

const equations: Equation[] = [
  { expr: "∇·σ + b = 0", label: "Equilibrium" },
  { expr: "K u = f", label: "FEM system" },
  { expr: "ρ(∂u/∂t + u·∇u) = −∇p + μ∇²u + f", label: "Navier-Stokes" },
  { expr: "∂u/∂t = α ∇²u", label: "Heat equation" },
];

/** Governing equations rendered as mono glyph cards. */
export function EquationGlyphs({ className }: { className?: string }) {
  return (
    <motion.ul
      variants={staggerContainer(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={cn("flex flex-col gap-3", className)}
    >
      {equations.map((eq) => (
        <motion.li
          key={eq.label}
          variants={fadeUp}
          className="flex items-center justify-between gap-4 rounded-lg border border-[var(--border)] bg-surface px-4 py-3"
        >
          <code className="font-mono text-sm text-text">{eq.expr}</code>
          <span className="eyebrow shrink-0 text-[0.6rem]">{eq.label}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
}
