"use client";

import { useEffect } from "react";

/** Lock body scroll while a value is true (mobile menu, dialogs). */
export function useLockBodyScroll(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;
    const original = document.body.style.overflow;
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollBarWidth}px`;
    return () => {
      document.body.style.overflow = original;
      document.body.style.paddingRight = "";
    };
  }, [locked]);
}
