"use client";

import { motion, type MotionValue, useTransform } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";

interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
  /** Entrance delay (s). */
  delay?: number;
  /** Idle float distance (px) and phase offset for variety. */
  floatRange?: number;
  floatDelay?: number;
  /** Pointer-parallax depth applied to the shared motion values. */
  depth?: number;
  px: MotionValue<number>;
  py: MotionValue<number>;
  label?: string;
  /** Adds a soft purple glow halo behind the card. */
  glow?: boolean;
}

/** A glass card that floats idly and parallaxes with the pointer. */
export function FloatingCard({
  children,
  className,
  delay = 0,
  floatRange = 10,
  floatDelay = 0,
  depth = 0,
  px,
  py,
  label,
  glow = false,
}: FloatingCardProps) {
  const reduced = usePrefersReducedMotion();
  const tx = useTransform(px, (v) => v * depth);
  const ty = useTransform(py, (v) => v * depth);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={reduced ? undefined : { x: tx, y: ty }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={reduced ? undefined : { y: [0, -floatRange, 0] }}
        transition={{
          duration: 6 + floatDelay,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatDelay,
        }}
      >
        <div className="relative">
          {glow ? (
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-3 -z-10 rounded-2xl bg-brand-500/20 blur-2xl"
            />
          ) : null}
          <GlassCard className="p-3 shadow-lg" interactive>
            {label ? <p className="eyebrow mb-2 text-[0.58rem]">{label}</p> : null}
            {children}
          </GlassCard>
        </div>
      </motion.div>
    </motion.div>
  );
}
