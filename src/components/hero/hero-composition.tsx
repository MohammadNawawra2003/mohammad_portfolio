"use client";

import { useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";
import { PortraitCard } from "./portrait-card";
import { FloatingCard } from "./floating-card";
import { OdooDashboardCard } from "./odoo-dashboard-card";
import { CodeChip } from "./code-chip";
import { FeaBracket, CfdCylinder, MeshConvergence } from "@/components/visuals";
import { useIsMobile, usePointerFine, usePrefersReducedMotion } from "@/lib/hooks";

/**
 * The hero centerpiece: the portrait surrounded by floating glass cards of
 * engineering art (FEM, CFD, mesh, equations) and the Odoo dashboard. Cards
 * parallax with the pointer; on mobile the set is reduced for clarity & perf.
 */
export function HeroComposition() {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const pointerFine = usePointerFine();
  const reduced = usePrefersReducedMotion();
  const parallaxOn = pointerFine && !reduced;

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const px = useSpring(rawX, { stiffness: 80, damping: 20 });
  const py = useSpring(rawY, { stiffness: 80, damping: 20 });

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!parallaxOn || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    rawX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    rawY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
  }
  function reset() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className="relative mx-auto aspect-[4/5] w-full max-w-[560px] lg:aspect-square lg:max-w-none"
    >
      <PortraitCard className="absolute inset-x-0 bottom-0 top-[2%]" />

      {/* FEA stress contour — top left */}
      <FloatingCard
        label="FEA · von Mises"
        className="left-0 top-[6%] w-[150px] sm:w-[170px]"
        delay={0.6}
        depth={18}
        floatDelay={0}
        px={px}
        py={py}
        glow
      >
        <FeaBracket />
      </FloatingCard>

      {/* CFD vortex street — top right */}
      <FloatingCard
        label="CFD Simulation"
        className="right-0 top-[2%] w-[150px] sm:w-[170px]"
        delay={0.75}
        depth={26}
        floatDelay={1.2}
        px={px}
        py={py}
        glow
      >
        <CfdCylinder />
      </FloatingCard>

      {/* Mesh convergence — bottom left (hidden on small mobile) */}
      <FloatingCard
        label="Mesh Convergence"
        className="bottom-[14%] left-[-2%] hidden w-[160px] sm:block"
        delay={0.9}
        depth={14}
        floatDelay={0.6}
        px={px}
        py={py}
        glow
      >
        <MeshConvergence />
      </FloatingCard>

      {/* Odoo dashboard — bottom right (in front of portrait) */}
      <FloatingCard
        className="bottom-[1%] right-[-5%] z-20 w-auto"
        delay={1.05}
        depth={22}
        floatDelay={1.8}
        px={px}
        py={py}
      >
        <OdooDashboardCard />
      </FloatingCard>

      {/* Code chip — mid left (in front, desktop only) */}
      {!isMobile ? (
        <FloatingCard
          className="left-[-6%] top-[44%] z-20 hidden lg:block"
          delay={1.2}
          depth={30}
          floatDelay={2.4}
          px={px}
          py={py}
        >
          <CodeChip />
        </FloatingCard>
      ) : null}
    </div>
  );
}
