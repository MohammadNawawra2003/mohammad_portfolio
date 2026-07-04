import type { Project } from "@/types";

/**
 * Selected Work — case studies drawn directly from real internship and research
 * experience (ProMax Serve, FAU Erlangen, UCLouvain exchange). No invented
 * metrics; each entry maps to a distinct engineering visual.
 */
export const projects: Project[] = [
  {
    title: "Odoo Payment & Registration API",
    category: "Odoo",
    context: "ProMax Serve · Qatar",
    summary: "A REST bridge connecting Odoo ERP to external registration and payment systems.",
    description:
      "Built and customised Odoo modules (v16/v17) in Python on the Odoo ORM, then exposed REST endpoints that connect the ERP to outside registration and payment providers — handling authentication, validation, and reliable two-way data exchange.",
    tags: ["Odoo v16/v17", "Python", "Odoo ORM", "REST API", "PostgreSQL", "Auth"],
    highlight: "Automated the registration-to-invoice flow across two external systems.",
    visual: "api-architecture",
    accent: "#22D3EE",
    featured: true,
  },
  {
    title: "Cantilever Beam FEA Study",
    category: "Computational",
    context: "FAU Erlangen-Nürnberg · Germany",
    summary: "3D finite-element stress analysis with a full mesh-sensitivity investigation.",
    description:
      "Modelled a 3D cantilever beam under tip load in ABAQUS, ran a mesh-sensitivity study, and quantified the numerical artefacts — shear locking and hourglassing — to establish exactly when the computed stress field can be trusted.",
    tags: ["ABAQUS", "FEA", "Mesh Sensitivity", "Structural Mechanics"],
    highlight: "Characterised shear-locking & hourglass effects across mesh refinements.",
    visual: "mesh-deform",
    accent: "#D946EF",
  },
  {
    title: "Space–Time DG for Hyperbolic PDEs",
    category: "Research",
    context: "UCLouvain · Belgium",
    summary: "Exchange-semester research on discontinuous-Galerkin methods for wave propagation.",
    description:
      "During an exchange semester at UCLouvain, studied space–time discontinuous-Galerkin discretisations of hyperbolic conservation laws — analysing how a wavefront propagates across an (x, t) grid and the stability that keeps the scheme accurate.",
    tags: ["Numerical Methods", "DG / FEM", "Hyperbolic PDEs", "Stability"],
    highlight: "Space–time DG discretisation for a propagating wavefront.",
    visual: "spacetime",
    accent: "#8B5CF6",
  },
];
