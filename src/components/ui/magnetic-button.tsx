"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePointerFine, usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";

const springOpts = { stiffness: 400, damping: 28 } as const;

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  /** Max pixel pull toward the cursor. */
  strength?: number;
}

/**
 * Wraps a child and pulls it gently toward the cursor.
 * No-ops on touch devices and under reduced-motion.
 */
export function Magnetic({ children, className, strength = 6 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const pointerFine = usePointerFine();
  const reduced = usePrefersReducedMotion();
  const enabled = pointerFine && !reduced;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, springOpts);
  const sy = useSpring(y, springOpts);

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set((relX / (rect.width / 2)) * strength);
    y.set((relY / (rect.height / 2)) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      className={cn("inline-flex", className)}
    >
      {children}
    </motion.div>
  );
}
