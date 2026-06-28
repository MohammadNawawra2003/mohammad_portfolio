"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/hooks";

interface LogoProps {
  className?: string;
  /** Animate the stroke draw on first paint. */
  animate?: boolean;
}

/** "MA" monogram, drawn in the brand gradient. Crisp and animatable. */
export function Logo({ className, animate = false }: LogoProps) {
  const reduced = usePrefersReducedMotion();
  const doAnimate = animate && !reduced;

  return (
    <svg
      viewBox="0 0 48 32"
      role="img"
      aria-label="Mohammad Alnawawreh"
      className={cn("h-7 w-auto", className)}
    >
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7C3AED" />
          <stop offset="55%" stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      <motion.path
        d="M3 29 L3 5 L13 22 L23 5 L23 29"
        fill="none"
        stroke="url(#logo-grad)"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={doAnimate ? { pathLength: 0 } : false}
        animate={doAnimate ? { pathLength: 1 } : undefined}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.path
        d="M27 29 L36 5 L45 29 M30.5 21 L41.5 21"
        fill="none"
        stroke="url(#logo-grad)"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={doAnimate ? { pathLength: 0 } : false}
        animate={doAnimate ? { pathLength: 1 } : undefined}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      />
    </svg>
  );
}
