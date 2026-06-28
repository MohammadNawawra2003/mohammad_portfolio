"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { education } from "@/data/education";
import { SectionHeader, GlassCard } from "@/components/ui";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function Education() {
  return (
    <section id="education" className="section pt-0">
      <div className="container-page">
        <SectionHeader
          eyebrow="Education"
          title="Foundations"
          description="A simulation-engineering degree, sharpened by a research exchange in Belgium."
        />

        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 grid gap-4 md:grid-cols-2"
        >
          {education.map((edu) => {
            const Icon = edu.icon;
            return (
              <motion.div key={edu.degree} variants={fadeUp}>
                <GlassCard interactive className="flex h-full flex-col gap-4 p-6">
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex size-12 items-center justify-center rounded-lg bg-brand-500/10 text-brand-400 ring-1 ring-brand-500/20">
                      <Icon className="size-6" />
                    </span>
                    {edu.gpa ? (
                      <span className="rounded-md bg-brand-500/10 px-3 py-1 font-mono text-sm font-semibold text-brand-300">
                        GPA {edu.gpa}
                      </span>
                    ) : null}
                  </div>
                  <div>
                    <h3 className="text-h3 font-semibold leading-snug text-text">{edu.degree}</h3>
                    <p className="mt-1 font-medium text-brand-400">{edu.institution}</p>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-text-faint">
                    <span className="font-mono">
                      {edu.start} — {edu.end}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="size-3" />
                      {edu.location}
                    </span>
                  </div>
                  {edu.detail ? (
                    <p className="mt-auto text-sm leading-relaxed text-text-muted">{edu.detail}</p>
                  ) : null}
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
