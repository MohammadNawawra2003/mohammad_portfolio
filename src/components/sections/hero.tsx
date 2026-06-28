"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/ui/gradient-text";
import { Magnetic } from "@/components/ui/magnetic-button";
import { ResumeButton } from "@/components/shared/resume-button";
import { ScrollCue } from "@/components/shared/scroll-cue";
import { HeroComposition } from "@/components/hero";
import { GradientMesh, DotGrid, ParticleField } from "@/components/visuals";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh items-center overflow-hidden pb-10 pt-28 lg:pb-6 lg:pt-20"
    >
      <GradientMesh />
      <DotGrid variant="line" className="opacity-60" />
      <ParticleField />

      <div className="container-page relative z-10">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.08fr] lg:gap-6">
          {/* Copy */}
          <motion.div variants={staggerContainer(0.1, 0.1)} initial="hidden" animate="visible">
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-surface px-3 py-1.5 text-xs text-text-muted">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-success" />
                </span>
                {profile.availability}
              </span>
            </motion.div>

            <motion.p variants={fadeUp} className="eyebrow mt-6 flex items-center gap-2">
              <Sparkles className="size-3.5 text-brand-400" aria-hidden />
              {profile.eyebrow}
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="mt-4 text-display font-bold leading-[1.02] tracking-tight"
            >
              {profile.firstName}
              <br />
              <GradientText>{profile.lastName}</GradientText>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-prose text-balance text-body-lg leading-relaxed text-text-muted"
            >
              Bridging computational engineering, simulation, and software development to build
              intelligent ERP and business solutions.
            </motion.p>

            {/* Dual-discipline pillars — communicate both crafts instantly */}
            <motion.div variants={fadeUp} className="mt-7 flex flex-wrap gap-3">
              {[
                { k: "Computational Engineering", v: "FEM · CFD · Numerical Methods" },
                { k: "Odoo Development", v: "Modules · APIs · Automation" },
              ].map((p) => (
                <div
                  key={p.k}
                  className="rounded-lg border border-[var(--border)] bg-surface px-4 py-2.5"
                >
                  <p className="text-sm font-semibold text-text">{p.k}</p>
                  <p className="font-mono text-[0.7rem] text-text-faint">{p.v}</p>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
              <Magnetic>
                <Button asChild size="lg" className="h-14 px-8 text-base">
                  <a href="#engineering" data-cursor="View">
                    View My Work
                    <ArrowRight aria-hidden />
                  </a>
                </Button>
              </Magnetic>
              <ResumeButton size="lg" className="h-14 px-7 text-base" />
            </motion.div>
          </motion.div>

          {/* Composition */}
          <div className="relative">
            <HeroComposition />
          </div>
        </div>
      </div>

      <ScrollCue className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:flex" />
    </section>
  );
}
