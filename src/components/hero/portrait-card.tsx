"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import { cn, withBasePath } from "@/lib/utils";

/**
 * The portrait centerpiece. Uses the exact uploaded photo (background removed),
 * anchored over a violet halo with a soft gradient ring. Identity preserved.
 */
export function PortraitCard({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className={cn("relative flex items-end justify-center", className)}
    >
      {/* violet halo */}
      <div
        aria-hidden
        className="absolute bottom-[8%] left-1/2 h-[78%] w-[78%] -translate-x-1/2 rounded-full blur-[60px]"
        style={{ background: "radial-gradient(circle, var(--halo), transparent 70%)" }}
      />
      {/* concentric ring accents */}
      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 aspect-square w-[92%] -translate-x-1/2 rounded-full border border-[var(--border)] opacity-60 mask-b-fade"
      />
      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 aspect-square w-[72%] -translate-x-1/2 rounded-full border border-brand-500/20 mask-b-fade"
      />

      {/* portrait */}
      <Image
        src={withBasePath("/images/portrait.png")}
        alt={`Portrait of ${profile.name}`}
        width={560}
        height={736}
        priority
        sizes="(max-width: 1024px) 78vw, 540px"
        className="relative z-10 h-auto w-[90%] max-w-[540px] select-none object-contain drop-shadow-[0_40px_80px_rgba(10,10,15,0.55)]"
      />

      {/* grounding gradient — blends the portrait base into the background */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-20 h-28 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/70 to-transparent"
      />
      <div
        aria-hidden
        className="absolute bottom-2 left-1/2 z-0 h-12 w-[64%] -translate-x-1/2 rounded-[100%] bg-brand-700/25 blur-2xl"
      />
    </motion.div>
  );
}
