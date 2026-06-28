"use client";

import { RefObject, useEffect, useRef, useState } from "react";

interface MousePosition {
  x: number;
  y: number;
  /** Normalized -1..1 relative to the element center. */
  nx: number;
  ny: number;
}

const INITIAL: MousePosition = { x: 0, y: 0, nx: 0, ny: 0 };

/**
 * Pointer position relative to a ref element, throttled to animation frames.
 * Used for tilt cards and the magnetic/spotlight effects.
 */
export function useMousePosition<T extends HTMLElement>(
  ref: RefObject<T | null>,
  enabled = true,
): MousePosition {
  const [pos, setPos] = useState<MousePosition>(INITIAL);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    const onMove = (e: PointerEvent) => {
      if (frame.current !== null) return;
      frame.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setPos({
          x,
          y,
          nx: clampUnit((x / rect.width) * 2 - 1),
          ny: clampUnit((y / rect.height) * 2 - 1),
        });
        frame.current = null;
      });
    };

    const onLeave = () => setPos(INITIAL);

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [ref, enabled]);

  return pos;
}

function clampUnit(v: number): number {
  return Math.min(Math.max(v, -1), 1);
}
