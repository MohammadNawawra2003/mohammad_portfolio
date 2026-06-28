"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { skillGroups, marqueeTech } from "@/data/skills";
import type { Skill } from "@/types";
import { SectionHeader, Marquee } from "@/components/ui";
import { BlueprintGrid } from "@/components/visuals";
import { viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

const levelPercent: Record<NonNullable<Skill["level"]>, number> = {
  core: 92,
  proficient: 74,
  familiar: 56,
};
const levelLabel: Record<NonNullable<Skill["level"]>, string> = {
  core: "Core",
  proficient: "Proficient",
  familiar: "Familiar",
};

export function Skills() {
  const [active, setActive] = useState(0);
  const group = skillGroups[active]!;
  const ActiveIcon = group.icon;

  return (
    <section id="skills" className="section relative overflow-hidden">
      <BlueprintGrid className="opacity-60" />
      <div className="container-page relative">
        <SectionHeader
          eyebrow="Skills"
          title="A toolkit spanning simulation and software"
          description="From numerical solvers to production ERP — pick a discipline to see what I work with."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[300px_1fr] lg:gap-10">
          {/* Category selector */}
          <div
            role="tablist"
            aria-label="Skill categories"
            className="flex gap-2 overflow-x-auto no-scrollbar lg:flex-col lg:overflow-visible"
          >
            {skillGroups.map((g, i) => {
              const Icon = g.icon;
              const selected = i === active;
              return (
                <button
                  key={g.category}
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActive(i)}
                  className={cn(
                    "group relative flex shrink-0 items-center gap-3 rounded-lg border px-4 py-3 text-left transition-colors",
                    selected
                      ? "border-brand-500/40 bg-brand-500/10"
                      : "border-[var(--border)] bg-surface hover:border-[var(--border-strong)]",
                  )}
                >
                  {selected ? (
                    <motion.span
                      layoutId="skill-active"
                      className="absolute left-0 top-1/2 hidden h-6 w-0.5 -translate-y-1/2 rounded-full bg-gradient-brand lg:block"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  ) : null}
                  <Icon className={cn("size-4 shrink-0", selected ? "text-brand-400" : "text-text-faint")} />
                  <span className={cn("whitespace-nowrap text-sm font-medium", selected ? "text-text" : "text-text-muted")}>
                    {g.category}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active category detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-xl border border-[var(--border)] bg-bg-elev/40 p-6 sm:p-8"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-md bg-brand-500/10 text-brand-400">
                  <ActiveIcon className="size-5" />
                </span>
                <div>
                  <h3 className="text-h3 font-semibold text-text">{group.category}</h3>
                  <p className="text-sm text-text-faint">{group.description}</p>
                </div>
              </div>

              <ul className="mt-7 flex flex-col gap-5">
                {group.skills.map((skill, i) => {
                  const pct = levelPercent[skill.level ?? "proficient"];
                  return (
                    <li key={skill.name}>
                      <div className="mb-1.5 flex items-center justify-between">
                        <span className="text-sm font-medium text-text">{skill.name}</span>
                        <span className="font-mono text-[0.65rem] uppercase tracking-wider text-text-faint">
                          {levelLabel[skill.level ?? "proficient"]}
                        </span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-strong">
                        <motion.div
                          className="h-full rounded-full bg-gradient-brand"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          viewport={viewportOnce}
                          transition={{ duration: 0.9, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* tech marquee */}
      <div className="relative mt-16">
        <Marquee
          items={marqueeTech.map((tech) => (
            <span key={tech} className="font-mono text-lg font-medium text-text-faint">
              {tech}
            </span>
          ))}
        />
      </div>
    </section>
  );
}
