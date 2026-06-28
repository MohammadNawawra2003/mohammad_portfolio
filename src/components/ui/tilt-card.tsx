"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { usePointerFine, usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Max rotation in degrees. */
  max?: number;
  /** Show the moving specular highlight. */
  glare?: boolean;
}

/**
 * Subtle 3D tilt following the pointer, with an optional specular highlight.
 * Falls back to a plain div on touch / reduced-motion.
 */
export function TiltCard({
  children,
  className,
  max = 6,
  glare = true,
  ...props
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const pointerFine = usePointerFine();
  const reduced = usePrefersReducedMotion();
  const enabled = pointerFine && !reduced;

  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);

  const glareBg = useMotionTemplate`radial-gradient(420px circle at ${gx}% ${gy}%, rgba(255,255,255,0.12), transparent 45%)`;

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * max * 2);
    rx.set((0.5 - py) * max * 2);
    gx.set(px * 100);
    gy.set(py * 100);
  }

  function reset() {
    rx.set(0);
    ry.set(0);
  }

  if (!enabled) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className={cn("relative", className)}
      {...(props as React.ComponentProps<typeof motion.div>)}
    >
      {children}
      {glare ? (
        <motion.span
          aria-hidden
          style={{ background: glareBg }}
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
        />
      ) : null}
    </motion.div>
  );
}
