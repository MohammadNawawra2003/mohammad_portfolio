"use client";

import { useEffect } from "react";

/**
 * Global mouse-tracked spotlight for `.spot-card` surfaces.
 *
 * A single delegated pointermove listener updates `--spot-x/--spot-y`
 * on the hovered card; the highlight itself is pure CSS (see globals.css),
 * so nothing renders and non-hover devices bail out entirely.
 */
export function SpotlightGlow() {
  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest?.<HTMLElement>(".spot-card");
      if (!card || raf) return;
      const { clientX, clientY } = e;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--spot-x", `${clientX - rect.left}px`);
        card.style.setProperty("--spot-y", `${clientY - rect.top}px`);
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
