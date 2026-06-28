"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/** Bouncing scroll hint shown at the bottom of the hero. */
export function ScrollCue({ className }: { className?: string }) {
  return (
    <motion.a
      href="#about"
      aria-label="Scroll to content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4, duration: 0.6 }}
      className={cn(
        "group flex flex-col items-center gap-2 text-text-faint transition-colors hover:text-brand-400",
        className,
      )}
    >
      <span className="eyebrow text-[0.65rem]">Scroll</span>
      <motion.span
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="flex size-9 items-center justify-center rounded-full border border-[var(--border)]"
      >
        <ChevronDown className="size-4" aria-hidden />
      </motion.span>
    </motion.a>
  );
}
