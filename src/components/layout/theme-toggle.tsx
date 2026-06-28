"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useMounted } from "@/lib/hooks";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Toggle theme"}
      suppressHydrationWarning
      className={cn(
        "relative flex size-10 items-center justify-center overflow-hidden rounded-md border border-[var(--border)] bg-surface text-text-muted transition-colors hover:border-brand-500/40 hover:text-brand-400",
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {mounted ? (
          <motion.span
            key={isDark ? "moon" : "sun"}
            initial={{ y: 14, opacity: 0, rotate: -30 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -14, opacity: 0, rotate: 30 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {isDark ? <Moon className="size-[18px]" /> : <Sun className="size-[18px]" />}
          </motion.span>
        ) : (
          <span className="size-[18px]" />
        )}
      </AnimatePresence>
    </button>
  );
}
