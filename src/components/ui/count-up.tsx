"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

interface CountUpProps {
  value: number;
  decimals?: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

/** Animate a number from 0 to `value` when scrolled into view. */
export function CountUp({ value, decimals = 0, suffix = "", duration = 1.4, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (reduced || !inView) {
      if (reduced) node.textContent = value.toFixed(decimals) + suffix;
      return;
    }

    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(latest) {
        node.textContent = latest.toFixed(decimals) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, value, decimals, suffix, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
