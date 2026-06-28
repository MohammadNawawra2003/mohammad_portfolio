"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, MapPin } from "lucide-react";
import { navItems, sectionIds } from "@/data/navigation";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "./theme-toggle";
import { MobileMenu } from "./mobile-menu";
import { useScrollSpy } from "@/lib/hooks";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useScrollSpy(sectionIds, 0.35);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3"
      >
        <nav
          aria-label="Primary"
          className={cn(
            "flex w-full max-w-container items-center justify-between gap-4 rounded-xl px-4 py-2.5 transition-all duration-300",
            scrolled
              ? "glass glass-edge shadow-md"
              : "border border-transparent bg-transparent",
          )}
        >
          <a href="#top" aria-label="Home" className="flex items-center gap-2">
            <Logo />
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = active === id;
              return (
                <li key={item.href} className="relative">
                  <a
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive ? "text-text" : "text-text-muted hover:text-text",
                    )}
                  >
                    {item.label}
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-gradient-brand"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    ) : null}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right cluster */}
          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-1.5 rounded-full border border-[var(--border)] px-3 py-1.5 text-xs text-text-muted xl:flex">
              <MapPin className="size-3.5 text-brand-400" />
              {profile.location}
            </span>
            <ThemeToggle className="hidden sm:flex" />
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <a href="#contact">Get in touch</a>
            </Button>
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
              className="flex size-10 items-center justify-center rounded-md border border-[var(--border)] bg-surface text-text lg:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
