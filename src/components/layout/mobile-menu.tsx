"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { navItems } from "@/data/navigation";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { SocialLinks } from "@/components/shared/social-links";
import { Logo } from "@/components/shared/logo";
import { useLockBodyScroll } from "@/lib/hooks";
import { ease } from "@/lib/motion";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

/** Full-screen glass overlay menu with focus trap and staggered links. */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0]!;
        const last = focusables[focusables.length - 1]!;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed inset-0 z-[70] lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            aria-label="Close menu"
            className="absolute inset-0 bg-bg/70 backdrop-blur-sm"
            onClick={onClose}
            tabIndex={-1}
          />
          <motion.div
            ref={panelRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="glass glass-edge absolute right-0 top-0 flex h-full w-[min(88vw,360px)] flex-col gap-8 p-6"
          >
            <div className="flex items-center justify-between">
              <Logo />
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="flex size-10 items-center justify-center rounded-md border border-[var(--border)] text-text-muted hover:text-text"
              >
                <X className="size-5" />
              </button>
            </div>

            <nav>
              <ul className="flex flex-col gap-1">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + i * 0.05, ease: ease.out }}
                  >
                    <a
                      href={item.href}
                      onClick={onClose}
                      className="block rounded-lg px-3 py-3 text-h3 font-medium text-text transition-colors hover:bg-surface hover:text-brand-400"
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="mt-auto flex flex-col gap-5">
              <Button asChild className="w-full">
                <a href="#contact" onClick={onClose}>
                  Get in touch
                </a>
              </Button>
              <div className="flex items-center justify-between">
                <SocialLinks />
                <ThemeToggle />
              </div>
              <p className="text-xs text-text-faint">{profile.location}</p>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
