import type { Transition, Variants } from "framer-motion";

/** Shared easing curves (mirror the CSS tokens in globals.css). */
export const ease = {
  out: [0.16, 1, 0.3, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
};

export const spring: Transition = { type: "spring", stiffness: 260, damping: 30, mass: 1 };
export const springSnappy: Transition = { type: "spring", stiffness: 400, damping: 28 };

export const duration = {
  micro: 0.12,
  fast: 0.2,
  base: 0.35,
  slow: 0.6,
};

/** Default viewport for whileInView reveals — fire slightly early, once. */
export const viewportOnce = { once: true, margin: "-10% 0px -10% 0px" } as const;

/** Fade + rise. The workhorse entrance. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, ease: ease.out },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.slow, ease: ease.out } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.base, ease: ease.out },
  },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0, transition: { duration: duration.base, ease: ease.out } },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 28 },
  visible: { opacity: 1, x: 0, transition: { duration: duration.base, ease: ease.out } },
};

/** Container that staggers its children's reveals. */
export const staggerContainer = (stagger = 0.06, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** Line-draw for SVG paths (timeline, equations, meshes). */
export const drawLine: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.4, ease: ease.out },
  },
};
