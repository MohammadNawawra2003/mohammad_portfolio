import { Boxes, Code2, Cpu, Database, Globe, Wrench } from "lucide-react";
import type { SkillGroup } from "@/types";

/** Skills grouped exactly as listed on the CV. */
export const skillGroups: SkillGroup[] = [
  {
    category: "Programming Languages",
    icon: Code2,
    description: "Core languages I build and model with.",
    skills: [
      { name: "Python", level: "core" },
      { name: "JavaScript", level: "core" },
      { name: "Java", level: "proficient" },
      { name: "C++ (OpenGL)", level: "proficient" },
    ],
  },
  {
    category: "Computational & Engineering",
    icon: Cpu,
    description: "Simulation, FEA, and numerical tooling.",
    skills: [
      { name: "ABAQUS", level: "core" },
      { name: "MATLAB", level: "proficient" },
      { name: "ETABS", level: "proficient" },
      { name: "FEM / CFD", level: "core" },
      { name: "Numerical Methods", level: "core" },
    ],
  },
  {
    category: "Odoo & ERP",
    icon: Boxes,
    description: "Custom modules, ORM, and business logic.",
    skills: [
      { name: "Odoo v16-v19", level: "core" },
      { name: "Odoo ORM", level: "core" },
      { name: "Odoo.sh", level: "proficient" },
      { name: "Workflows", level: "proficient" },
    ],
  },
  {
    category: "Databases & Backend",
    icon: Database,
    description: "Data modeling and integrations.",
    skills: [
      { name: "PostgreSQL", level: "core" },
      { name: "REST APIs", level: "core" },
      { name: "Postman", level: "proficient" },
    ],
  },
  {
    category: "Web Technologies",
    icon: Globe,
    description: "Front-end fundamentals.",
    skills: [
      { name: "HTML5", level: "proficient" },
      { name: "CSS3", level: "proficient" },
      { name: "Bootstrap", level: "familiar" },
    ],
  },
  {
    category: "Tools & Workflow",
    icon: Wrench,
    description: "Day-to-day development environment.",
    skills: [
      { name: "Git", level: "core" },
      { name: "GitHub", level: "core" },
      { name: "VS Code", level: "core" },
      { name: "Eclipse", level: "familiar" },
      { name: "CodeBlocks", level: "familiar" },
    ],
  },
];

export interface MarqueeTechItem {
  name: string;
  /** Brand SVG under /public (sourced via 21st.dev / svgl); text chip when absent. */
  logo?: string;
  /** Dark-theme variant for monochrome marks. */
  logoDark?: string;
  /** Brand color for the text-only fallback dot. */
  accent?: string;
}

/** Marquee technologies with official brand marks (front-and-center brands). */
export const marqueeTech: MarqueeTechItem[] = [
  { name: "Python", logo: "/logos/python.svg" },
  { name: "PostgreSQL", logo: "/logos/postgresql.svg" },
  { name: "Odoo", accent: "#714B67" },
  { name: "Git", logo: "/logos/git.svg" },
  { name: "GitHub", logo: "/logos/github_light.svg", logoDark: "/logos/github_dark.svg" },
  { name: "VS Code", logo: "/logos/vscode.svg" },
  { name: "ABAQUS", accent: "#005386" },
  { name: "MATLAB", logo: "/logos/matlab.svg" },
  { name: "JavaScript", logo: "/logos/javascript.svg" },
  { name: "C++", logo: "/logos/c-plusplus.svg" },
  { name: "HTML5", logo: "/logos/html5.svg" },
  { name: "CSS3", logo: "/logos/css.svg" },
  { name: "Java", logo: "/logos/java.svg" },
  { name: "Postman", logo: "/logos/postman.svg" },
];
