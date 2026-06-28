"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePointerFine, usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Dot + trailing ring cursor that grows over interactive elements and can
 * show a contextual label via the data-cursor attribute. Desktop-only.
 */
export function CustomCursor() {
  const pointerFine = usePointerFine();
  const reduced = usePrefersReducedMotion();
  const enabled = pointerFine && !reduced;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 28, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 350, damping: 28, mass: 0.6 });

  const [active, setActive] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (!enabled) return;
    document.body.dataset.customCursor = "true";

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
      const target = (e.target as HTMLElement)?.closest<HTMLElement>(
        "a, button, [role='button'], [data-cursor]",
      );
      if (target) {
        setActive(true);
        setLabel(target.dataset.cursor ?? null);
      } else {
        setActive(false);
        setLabel(null);
      }
    };
    const leave = () => setHidden(true);

    window.addEventListener("pointermove", move);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      delete document.body.dataset.customCursor;
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[90]" style={{ opacity: hidden ? 0 : 1 }}>
      <motion.div
        className="fixed left-0 top-0 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500"
        style={{ x, y }}
      />
      <motion.div
        className="fixed left-0 top-0 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-brand-400/60"
        style={{ x: ringX, y: ringY }}
        animate={{
          width: active ? 56 : 32,
          height: active ? 56 : 32,
          backgroundColor: active ? "rgba(124,58,237,0.12)" : "rgba(124,58,237,0)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      >
        {label ? <span className="text-[10px] font-medium text-brand-400">{label}</span> : null}
      </motion.div>
    </div>
  );
}
