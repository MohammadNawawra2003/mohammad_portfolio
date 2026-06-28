import { GraduationCap, Plane } from "lucide-react";
import type { EducationItem } from "@/types";

export const education: EducationItem[] = [
  {
    degree: "B.Sc. in Computer Simulation Engineering",
    institution: "Bethlehem University",
    location: "Palestine",
    start: "Aug 2021",
    end: "Jul 2025",
    gpa: "3.39 / 4.0",
    detail: "Major GPA 3.43 / 4.0. Numerical methods, finite-element analysis, and modeling.",
    icon: GraduationCap,
  },
  {
    degree: "Exchange Student",
    institution: "Université catholique de Louvain (UCLouvain)",
    location: "Belgium",
    start: "Mar 2025",
    end: "May 2025",
    detail:
      "Scientific report on Space-Time Discontinuous Galerkin Methods for Hyperbolic Equations.",
    icon: Plane,
  },
];
