"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

/** Consistent section intro: mono eyebrow, title, optional description. */
export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <motion.div
      variants={staggerContainer(0.08)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <motion.span variants={fadeUp} className="eyebrow flex items-center gap-2">
        <span aria-hidden className="text-brand-500">
          {"//"}
        </span>
        {eyebrow}
      </motion.span>
      <motion.h2
        variants={fadeUp}
        className="text-balance text-h2 font-semibold tracking-tight text-text"
      >
        {title}
      </motion.h2>
      {description ? (
        <motion.p
          variants={fadeUp}
          className={cn(
            "max-w-prose text-body-lg leading-relaxed text-text-muted",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
