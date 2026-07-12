"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { experience } from "@/data/experience";
import type { ExperienceItem } from "@/types";
import { SectionHeader, Badge, Pill } from "@/components/ui";
import { Spotlight } from "@/components/visuals";
import { drawLine, viewportOnce } from "@/lib/motion";

function monogram(company: string): string {
  return company
    .replace(/[^A-Za-z ]/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
}

function Entry({ item, index }: { item: ExperienceItem; index: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="relative grid grid-cols-[auto_1fr] gap-x-5 gap-y-3 pb-12 last:pb-0 sm:grid-cols-[140px_auto_1fr]"
    >
      {/* date rail (desktop) */}
      <div className="hidden pt-1 text-right sm:block">
        <p className="font-mono text-sm font-semibold text-text">{item.start}</p>
        <p className="font-mono text-xs text-text-faint">to {item.end}</p>
      </div>

      {/* node + monogram */}
      <div className="relative flex justify-center">
        <span
          className="relative z-10 flex size-12 items-center justify-center rounded-xl font-mono text-sm font-bold"
          style={{
            color: item.accent,
            backgroundColor: `${item.accent}1a`,
            boxShadow: item.current ? `0 0 0 3px ${item.accent}33` : undefined,
          }}
        >
          {monogram(item.company)}
        </span>
      </div>

      {/* content */}
      <div className="surface-card spot-card p-5 transition-colors duration-300 hover:border-[var(--border-strong)] sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h3 className="text-h3 font-semibold text-text">{item.role}</h3>
            <p className="mt-0.5 font-medium" style={{ color: item.accent }}>
              {item.company}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {item.current ? <Badge variant="success">Current</Badge> : null}
            <Badge>{item.mode}</Badge>
            <span className="flex items-center gap-1 text-xs text-text-faint">
              <MapPin className="size-3" />
              {item.location}
            </span>
          </div>
        </div>

        {/* date on mobile */}
        <p className="mt-2 font-mono text-xs text-text-faint sm:hidden">
          {item.start} to {item.end}
        </p>

        <ul className="mt-4 flex flex-col gap-2">
          {item.highlights.map((h, i) => (
            <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-text-muted">
              <span
                className="mt-2 size-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: item.accent }}
              />
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-wrap gap-2">
          {item.stack.map((tech) => (
            <Pill key={tech} className="text-xs">
              {tech}
            </Pill>
          ))}
        </div>
      </div>
    </motion.li>
  );
}

export function Experience() {
  return (
    <section id="experience" className="section relative overflow-hidden">
      <Spotlight />
      <div className="container-page relative">
        <SectionHeader
          eyebrow="Experience"
          title="The work so far"
          description="Internships across ERP development and computational engineering: remote, hybrid, and across borders."
        />

        <div className="relative mt-14">
          {/* connecting rail aligned to the monogram column */}
          <svg
            aria-hidden
            className="absolute left-[24px] top-2 hidden h-[calc(100%-3rem)] w-0.5 sm:left-[185px] sm:block"
            preserveAspectRatio="none"
            viewBox="0 0 2 100"
          >
            <motion.line
              x1="1"
              y1="0"
              x2="1"
              y2="100"
              stroke="url(#exp-rail)"
              strokeWidth="2"
              variants={drawLine}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            />
            <defs>
              <linearGradient id="exp-rail" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4F46E5" />
                <stop offset="50%" stopColor="#2DD4BF" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
            </defs>
          </svg>

          <ol className="relative">
            {experience.map((item, i) => (
              <Entry key={`${item.company}-${item.start}`} item={item} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
