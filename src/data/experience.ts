import type { ExperienceItem } from "@/types";

/** Experience, most-recent first. Content is verbatim from the CV. */
export const experience: ExperienceItem[] = [
  {
    role: "Odoo Development Intern",
    company: "AlShayeb Partners",
    location: "Palestine",
    mode: "Hybrid",
    start: "Apr 2026",
    end: "Present",
    current: true,
    highlights: [
      "Undergoing hands-on training on Odoo v19 modules, including Inventory, Accounting, CRM, Sales, and Purchase.",
      "Developing a deep understanding of module functionalities and workflows to support business process optimization.",
      "Gaining practical experience with Odoo.sh for module deployment and project management.",
    ],
    stack: ["Odoo v19", "Inventory", "Accounting", "CRM", "Sales", "Odoo.sh"],
    accent: "#8B5CF6",
  },
  {
    role: "Odoo Development Intern",
    company: "ProMax Serve",
    location: "Qatar",
    mode: "Remote",
    start: "Aug 2025",
    end: "Apr 2026",
    highlights: [
      "Developed and customized Odoo modules (v16/v17) using Python and the Odoo ORM to automate business processes.",
      "Built REST APIs to integrate Odoo with external systems (registration and payment), handling data exchange and authentication.",
      "Customized ERP modules for client implementations, improving workflow automation and data accuracy.",
    ],
    stack: ["Odoo v16/v17", "Python", "ORM", "REST API", "PostgreSQL"],
    accent: "#22D3EE",
  },
  {
    role: "FEA & Modeling Intern",
    company: "FAU Erlangen-Nürnberg",
    location: "Germany",
    mode: "Remote",
    start: "Jul 2024",
    end: "Jul 2024",
    highlights: [
      "Modeled a 3D cantilever beam under load, conducted mesh sensitivity analysis, and assessed shear locking and hourglass effects.",
      "Performed finite element analysis using ABAQUS software.",
      "Analyzed structural behavior in engineering applications.",
    ],
    stack: ["ABAQUS", "FEA", "Mesh Analysis", "Structural Mechanics"],
    accent: "#D946EF",
  },
];
