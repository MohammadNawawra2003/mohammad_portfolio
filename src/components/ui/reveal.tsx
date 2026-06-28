"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface RevealProps extends React.ComponentProps<typeof motion.div> {
  variants?: Variants;
  /** Render a stagger container instead of a single item. */
  stagger?: boolean;
  delay?: number;
}

/**
 * Standard scroll-triggered reveal wrapper. Centralizes whileInView config
 * so every section animates with one consistent vocabulary.
 */
export function Reveal({
  children,
  className,
  variants = fadeUp,
  delay = 0,
  ...props
}: RevealProps) {
  return (
    <motion.div
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={delay ? { delay } : undefined}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Stagger container: children should use `motion` + a matching item variant. */
export function RevealGroup({
  children,
  className,
  variants,
  ...props
}: React.ComponentProps<typeof motion.div> & { variants: Variants }) {
  return (
    <motion.div
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      {...props}
    >
      {children}
    </motion.div>
  );
}
