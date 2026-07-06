import {
  Blocks,
  Cloud,
  FileText,
  GitBranch,
  Link2,
  Lock,
  Puzzle,
  Settings2,
  TerminalSquare,
  Workflow,
} from "lucide-react";
import type { Capability } from "@/types";

/** Odoo expertise grid — capabilities grounded in the CV's ERP work. */
export const odooCapabilities: Capability[] = [
  {
    title: "Custom Modules",
    description: "Building Odoo v16-v19 modules with Python and the Odoo ORM.",
    icon: Blocks,
  },
  {
    title: "Customization",
    description: "Tailoring ERP modules for client implementations and accuracy.",
    icon: Puzzle,
  },
  {
    title: "Workflows",
    description: "Modeling business processes and optimizing module workflows.",
    icon: Workflow,
  },
  {
    title: "REST APIs",
    description: "Integrating Odoo with registration and payment systems.",
    icon: Link2,
  },
  {
    title: "Reports & Views",
    description: "Custom XML views and reporting for better usability.",
    icon: FileText,
  },
  {
    title: "Automation",
    description: "Automating data sync and recurring business processes.",
    icon: TerminalSquare,
  },
  {
    title: "Data & Security",
    description: "PostgreSQL data modeling with authenticated data exchange.",
    icon: Lock,
  },
  {
    title: "Deployment",
    description: "Module deployment and project management on Odoo.sh.",
    icon: Cloud,
  },
];

/** Apps shown in the recreated Odoo dashboard mock (original recreation). */
export const odooApps: { name: string; icon: typeof Settings2; tint: string }[] = [
  { name: "Inventory", icon: Blocks, tint: "#8B5CF6" },
  { name: "Accounting", icon: FileText, tint: "#22D3EE" },
  { name: "CRM", icon: GitBranch, tint: "#D946EF" },
  { name: "Sales", icon: Workflow, tint: "#A78BFA" },
  { name: "Purchase", icon: Link2, tint: "#34D399" },
  { name: "Settings", icon: Settings2, tint: "#60A5FA" },
];
