"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import type { Project, ProjectVisual } from "@/types";
import { SectionHeader, Badge, Pill } from "@/components/ui";
import {
  ApiArchitecture,
  MeshDeform,
  SpacetimeField,
  Spotlight,
} from "@/components/visuals";
import { clipUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Each project owns a different graphic — no illustration repeats. */
const visualMap: Record<ProjectVisual, React.ComponentType<{ className?: string }>> = {
  "api-architecture": ApiArchitecture,
  "mesh-deform": MeshDeform,
  spacetime: SpacetimeField,
};

const categoryVariant: Record<Project["category"], "brand" | "odoo" | "success"> = {
  Odoo: "odoo",
  Computational: "brand",
  Research: "success",
};

/** Accent-tinted frame that houses a project's signature visual. */
function ProjectMedia({ project, tall }: { project: Project; tall?: boolean }) {
  const Visual = visualMap[project.visual];
  return (
    <div
      className={cn(
        "group/media relative flex items-center justify-center overflow-hidden rounded-2xl border p-6 transition-colors duration-500 sm:p-8",
        tall && "h-full",
      )}
      style={{
        borderColor: `${project.accent}33`,
        background: `radial-gradient(120% 120% at 50% 0%, ${project.accent}14, transparent 70%)`,
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/media:opacity-100"
        style={{ boxShadow: `inset 0 0 60px -10px ${project.accent}40` }}
      />
      <div className="w-full max-w-[440px] transition-transform duration-500 ease-out group-hover/media:scale-[1.03]">
        <Visual />
      </div>
    </div>
  );
}

function ProjectBody({ project }: { project: Project }) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant={categoryVariant[project.category]}>{project.category}</Badge>
        <span className="font-mono text-xs text-text-faint">{project.context}</span>
      </div>

      <h3 className="mt-4 text-h3 font-semibold tracking-tight text-text">{project.title}</h3>
      <p className="mt-2 text-body-lg leading-relaxed text-text-muted">{project.summary}</p>
      <p className="mt-3 text-sm leading-relaxed text-text-muted">{project.description}</p>

      {/* CV-grounded outcome */}
      <p
        className="mt-5 flex items-start gap-2.5 border-l-2 pl-3 text-sm font-medium text-text"
        style={{ borderColor: project.accent }}
      >
        <ArrowUpRight className="mt-0.5 size-4 shrink-0" style={{ color: project.accent }} />
        {project.highlight}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Pill key={tag} className="text-xs">
            {tag}
          </Pill>
        ))}
      </div>
    </div>
  );
}

export function Work() {
  const featured = projects.find((p) => p.featured) ?? projects[0]!;
  const rest = projects.filter((p) => p !== featured);

  return (
    <section id="work" className="section relative overflow-hidden">
      <Spotlight />
      <div className="container-page relative">
        <SectionHeader
          eyebrow="Selected Work"
          title="Things I've actually built"
          description="Three case studies where the theory left the page, from an ERP payment integration to a finite-element stress study and space-time PDE research."
        />

        {/* Featured — large split row */}
        <motion.article
          variants={clipUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="surface-card group mt-12 grid items-center gap-6 p-6 transition-colors duration-500 hover:border-[var(--border-strong)] sm:p-8 lg:grid-cols-[1.15fr_1fr] lg:gap-10"
        >
          <ProjectMedia project={featured} tall />
          <ProjectBody project={featured} />
        </motion.article>

        {/* Remaining — 2-up grid with staggered clip reveal */}
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-4 grid gap-4 md:grid-cols-2"
        >
          {rest.map((project) => (
            <motion.article
              key={project.title}
              variants={clipUp}
              className="surface-card group flex flex-col gap-6 p-6 transition-colors duration-500 hover:border-[var(--border-strong)]"
            >
              <ProjectMedia project={project} />
              <ProjectBody project={project} />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
