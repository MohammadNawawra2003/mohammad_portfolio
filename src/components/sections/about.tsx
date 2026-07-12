"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Languages, MapPin } from "lucide-react";
import { languages, profile, stats } from "@/data/profile";
import { SectionHeader, GlassCard, CountUp, Reveal } from "@/components/ui";
import { DotGrid } from "@/components/visuals";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const facts = [
  { icon: MapPin, label: "Location", value: profile.location },
  { icon: Briefcase, label: "Focus", value: "Odoo · ERP · Simulation" },
  { icon: GraduationCap, label: "Education", value: "B.Sc. Computer Simulation Eng." },
];

export function About() {
  return (
    <section id="about" className="section">
      <DotGrid className="opacity-40" />
      <div className="container-page relative">
        <SectionHeader
          eyebrow="About"
          title={<>Where physics meets production software</>}
          description="I move fluently between numerical models and the systems businesses run on."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          {/* Narrative */}
          <Reveal variants={staggerContainer(0.12)} className="flex flex-col gap-5">
            {profile.about.map((para, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                className="text-body-lg leading-relaxed text-text-muted"
              >
                {para}
              </motion.p>
            ))}
          </Reveal>

          {/* Facts card */}
          <Reveal variants={fadeUp}>
            <GlassCard className="flex h-full flex-col gap-5 p-6">
              <ul className="flex flex-col gap-4">
                {facts.map((fact) => {
                  const Icon = fact.icon;
                  return (
                    <li key={fact.label} className="flex items-center gap-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-brand-500/10 text-brand-400">
                        <Icon className="size-5" />
                      </span>
                      <span className="flex flex-col">
                        <span className="text-xs text-text-faint">{fact.label}</span>
                        <span className="text-sm font-medium text-text">{fact.value}</span>
                      </span>
                    </li>
                  );
                })}
                <li className="flex items-center gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-brand-500/10 text-brand-400">
                    <Languages className="size-5" />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-xs text-text-faint">Languages</span>
                    <span className="text-sm font-medium text-text">
                      {languages.map((l) => `${l.name} (${l.level})`).join(" · ")}
                    </span>
                  </span>
                </li>
              </ul>
            </GlassCard>
          </Reveal>
        </div>

        {/* Stats */}
        <motion.dl
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={fadeUp} className="surface-card spot-card p-5">
              <dd className="text-h2 font-bold tabular text-gradient">
                <CountUp value={stat.value} decimals={stat.decimals ?? 0} suffix={stat.suffix ?? ""} />
              </dd>
              <dt className="mt-1 text-sm text-text-muted">{stat.label}</dt>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
