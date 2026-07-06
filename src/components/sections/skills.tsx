"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { skillGroups, marqueeTech } from "@/data/skills";
import type { Skill } from "@/types";
import { SectionHeader, Marquee, Pill } from "@/components/ui";
import { BlueprintGrid } from "@/components/visuals";
import { cn } from "@/lib/utils";

type Tier = NonNullable<Skill["level"]>;
const tierOrder: Tier[] = ["core", "proficient", "familiar"];
const tierLabel: Record<Tier, string> = {
  core: "Core",
  proficient: "Proficient",
  familiar: "Familiar",
};
const tierDot: Record<Tier, string> = {
  core: "bg-gradient-brand",
  proficient: "bg-brand-400/70",
  familiar: "bg-text-faint/50",
};

export function Skills() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const group = skillGroups[active]!;
  const ActiveIcon = group.icon;

  // Group the active category's skills into proficiency tiers.
  const byTier = tierOrder
    .map((tier) => ({
      tier,
      skills: group.skills.filter((s) => (s.level ?? "proficient") === tier),
    }))
    .filter((t) => t.skills.length > 0);

  function onKeyNav(e: React.KeyboardEvent, i: number) {
    const last = skillGroups.length - 1;
    let next = i;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = i === last ? 0 : i + 1;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = i === 0 ? last : i - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <section id="skills" className="section relative overflow-hidden">
      <BlueprintGrid className="opacity-60" />
      <div className="container-page relative">
        <SectionHeader
          eyebrow="Skills"
          title="A toolkit spanning simulation and software"
          description="From numerical solvers to production ERP. Pick a discipline to see what I work with."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[300px_1fr] lg:gap-10">
          {/* Category selector */}
          <div
            role="tablist"
            aria-label="Skill categories"
            aria-orientation="vertical"
            className="flex gap-2 overflow-x-auto no-scrollbar lg:flex-col lg:overflow-visible"
          >
            {skillGroups.map((g, i) => {
              const Icon = g.icon;
              const selected = i === active;
              return (
                <button
                  key={g.category}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  id={`skill-tab-${i}`}
                  aria-selected={selected}
                  aria-controls="skill-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => onKeyNav(e, i)}
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
              id="skill-panel"
              role="tabpanel"
              aria-labelledby={`skill-tab-${active}`}
              tabIndex={0}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="surface-card p-6 focus-visible:outline-none sm:p-8"
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

              <div className="mt-7 flex flex-col gap-6">
                {byTier.map(({ tier, skills }, ti) => (
                  <div key={tier}>
                    <p className="mb-3 flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-wider text-text-faint">
                      <span className={cn("size-1.5 rounded-full", tierDot[tier])} />
                      {tierLabel[tier]}
                    </p>
                    <motion.ul
                      initial="hidden"
                      animate="visible"
                      variants={{ visible: { transition: { staggerChildren: 0.03, delayChildren: ti * 0.05 } } }}
                      className="flex flex-wrap gap-2"
                    >
                      {skills.map((skill) => (
                        <motion.li
                          key={skill.name}
                          variants={{
                            hidden: { opacity: 0, scale: 0.9 },
                            visible: { opacity: 1, scale: 1 },
                          }}
                        >
                          <Pill className={cn(tier === "core" && "border-brand-500/40 text-text")}>
                            {skill.name}
                          </Pill>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>
                ))}
              </div>
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
