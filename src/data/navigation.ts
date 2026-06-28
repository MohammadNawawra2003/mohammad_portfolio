import type { NavItem } from "@/types";

/** Primary navigation. Anchors map to section ids on the single-page layout. */
export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Odoo", href: "#odoo" },
  { label: "Engineering", href: "#engineering" },
  { label: "Contact", href: "#contact" },
];

/** Section ids tracked by the scroll-spy, in document order. */
export const sectionIds = [
  "about",
  "skills",
  "experience",
  "education",
  "odoo",
  "engineering",
  "contact",
] as const;
