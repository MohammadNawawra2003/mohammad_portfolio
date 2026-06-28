import type { LucideIcon } from "lucide-react";

/** A single external/contact link rendered with an icon. */
export interface ProfileLink {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Short value shown in copyable chips (e.g. the raw email). */
  value?: string;
}

/** Top-level identity, sourced verbatim from the CV. */
export interface Profile {
  name: string;
  firstName: string;
  lastName: string;
  title: string;
  eyebrow: string;
  tagline: string;
  summary: string;
  about: string[];
  location: string;
  email: string;
  phone: string;
  availability: string;
  resumeUrl: string;
  links: ProfileLink[];
}

/** A headline statistic. Values are literal counts from the CV. */
export interface Stat {
  value: number;
  suffix?: string;
  label: string;
  decimals?: number;
}

export type WorkMode = "Remote" | "Hybrid" | "On-site";

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  mode: WorkMode;
  start: string;
  end: string;
  current?: boolean;
  highlights: string[];
  stack: string[];
  /** Company monogram accent colour. */
  accent: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  start: string;
  end: string;
  detail?: string;
  gpa?: string;
  icon: LucideIcon;
}

export interface Skill {
  name: string;
  /** Optional inline SVG/brand mark key handled by the renderer. */
  level?: "core" | "proficient" | "familiar";
}

export interface SkillGroup {
  category: string;
  icon: LucideIcon;
  description: string;
  skills: Skill[];
}

export interface Capability {
  title: string;
  description: string;
  icon: LucideIcon;
}

export type ProjectCategory = "Computational" | "Odoo" | "Research";

export type ProjectVisual =
  | "mesh-deform"
  | "api-architecture"
  | "spacetime"
  | "matrix-solver";

export interface Project {
  title: string;
  category: ProjectCategory;
  /** One-line hook shown under the title. */
  summary: string;
  description: string;
  tags: string[];
  /** Notable, CV-grounded outcome. */
  highlight: string;
  /** Unique visual key — each project uses a different graphic. */
  visual: ProjectVisual;
  accent: string;
  links?: { label: string; href: string }[];
  featured?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface LanguageItem {
  name: string;
  level: string;
}
