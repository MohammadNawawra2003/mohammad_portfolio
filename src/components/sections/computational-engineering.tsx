"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui";
import {
  FemContour,
  CfdAirfoil,
  ConvergencePlot,
  SparseSolver,
  EquationGlyphs,
  SimulationPipeline,
  Wireframe,
} from "@/components/visuals";
import { fadeUp, scaleIn, viewportOnce } from "@/lib/motion";

export function ComputationalEngineering() {
  return (
    <section id="engineering" className="section relative overflow-hidden">
      <Wireframe className="opacity-50" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/40 to-transparent"
      />
      <div className="container-page relative">
        <SectionHeader
          align="center"
          eyebrow="Computational Engineering"
          title="The science underneath"
          description="A B.Sc. in Computer Simulation Engineering means I treat every model with the same rigor: accuracy, stability, and convergence first."
        />

        {/* Signature pipeline ribbon */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto mt-12 max-w-3xl"
        >
          <SimulationPipeline />
        </motion.div>

        {/* Featured FEM + equations */}
        <div className="mt-8 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
          <motion.figure
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-bg-elev/50 p-6 sm:p-8"
          >
            <p className="eyebrow text-[0.6rem]">FEM Analysis · von Mises</p>
            <div className="mx-auto mt-4 max-w-[460px]">
              <FemContour />
            </div>
            <figcaption className="mt-4 text-sm leading-relaxed text-text-muted">
              <span className="font-medium text-text">Finite-element stress fields.</span> Modeling
              structures under load, characterising mesh sensitivity, shear-locking and hourglass
              effects so a result can be trusted.
            </figcaption>
          </motion.figure>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col rounded-2xl border border-[var(--border)] bg-bg-elev/50 p-6 sm:p-8"
          >
            <p className="eyebrow text-[0.6rem]">Mathematical Modeling</p>
            <h3 className="mt-3 text-h3 font-semibold text-text">Governing equations</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              The mathematics behind the models: equilibrium, the FEM system, Navier-Stokes, and the
              heat equation.
            </p>
            <EquationGlyphs className="mt-5" />
          </motion.div>
        </div>

        {/* Supporting tiles */}
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {[
            {
              eyebrow: "CFD Simulation",
              title: "Flow & velocity fields",
              body: "Momentum, pressure, and velocity: the continuum mechanics behind moving fluids.",
              visual: <CfdAirfoil />,
            },
            {
              eyebrow: "Mesh Convergence",
              title: "Convergence & accuracy",
              body: "Refining discretisation until the numbers stop moving, tracking error against degrees of freedom.",
              visual: <ConvergencePlot />,
            },
          ].map((tile, i) => (
            <motion.figure
              key={tile.eyebrow}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-[var(--border)] bg-bg-elev/50 p-5"
            >
              <p className="eyebrow text-[0.6rem]">{tile.eyebrow}</p>
              <div className="mt-3 rounded-lg border border-[var(--border)] bg-bg/40 p-3">
                {tile.visual}
              </div>
              <figcaption className="mt-3">
                <span className="text-sm font-semibold text-text">{tile.title}</span>
                <p className="mt-1 text-sm leading-relaxed text-text-muted">{tile.body}</p>
              </figcaption>
            </motion.figure>
          ))}

          <motion.figure
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={{ delay: 0.2 }}
            className="flex flex-col rounded-2xl border border-brand-500/20 bg-brand-500/[0.04] p-5"
          >
            <p className="eyebrow text-[0.6rem]">Numerical Methods</p>
            <div className="mt-3 rounded-lg border border-brand-500/15 bg-bg/40 p-3">
              <SparseSolver />
            </div>
            <figcaption className="mt-3">
              <span className="text-sm font-semibold text-text">From PDEs to solvers</span>
              <p className="mt-1 text-sm leading-relaxed text-text-muted">
                Discretising operators into sparse linear systems and driving the residual to zero,
                with the stability analysis that keeps them honest.
              </p>
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
