import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import type { LanguageItem, Profile, Stat } from "@/types";

export const profile: Profile = {
  name: "Mohammad Alnawawreh",
  firstName: "Mohammad",
  lastName: "Alnawawreh",
  title: "Junior Odoo Developer | Computational Engineer",
  eyebrow: "Computational Engineer · Odoo Developer",
  tagline: "From mesh to module.",
  summary:
    "Motivated Computational Engineer with a strong academic background in numerical methods, finite element analysis, and programming. Proficient in Python, FEA tools, and Odoo development, with experience in developing custom modules, building APIs, and automating business processes.",
  about: [
    "I work at the intersection of two disciplines that rarely meet: rigorous computational engineering and clean, production software. I model physical systems with finite-element and numerical methods, then translate that same precision into ERP platforms that businesses actually run on.",
    "My engineering foundation comes from a B.Sc. in Computer Simulation Engineering — numerical methods, finite-element analysis, and modeling — sharpened by an exchange semester at UCLouvain studying space-time discontinuous Galerkin methods for hyperbolic equations.",
    "Today I build and customize Odoo modules with Python and the Odoo ORM, design REST APIs that connect ERP systems to the outside world, and automate the business processes in between. Whether it is a stress field on a cantilever beam or a payment integration inside Odoo, I care about the same things: accuracy, stability, and a result you can trust.",
  ],
  location: "Bethlehem, Palestine",
  email: "mnawawra900@gmail.com",
  phone: "+970 568833066",
  availability: "Open to opportunities",
  resumeUrl: "/cv/Mohammad-Alnawawreh-CV.pdf",
  links: [
    {
      label: "Email",
      href: "mailto:mnawawra900@gmail.com",
      icon: Mail,
      value: "mnawawra900@gmail.com",
    },
    {
      label: "Phone",
      href: "tel:+970568833066",
      icon: Phone,
      value: "+970 568833066",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/mnawawra/",
      icon: Linkedin,
      value: "in/mnawawra",
    },
    {
      label: "GitHub",
      href: "https://github.com/mohammadnawawra2003",
      icon: Github,
      value: "mohammadnawawra2003",
    },
    {
      label: "Location",
      href: "https://maps.google.com/?q=Bethlehem,Palestine",
      icon: MapPin,
      value: "Bethlehem, Palestine",
    },
  ],
};

/** Literal counts derived from the CV — no invented metrics. */
export const stats: Stat[] = [
  { value: 3.39, label: "GPA / 4.0", decimals: 2 },
  { value: 3, suffix: "", label: "Internships" },
  { value: 4, suffix: "", label: "Countries — work & study" },
  { value: 7, suffix: "+", label: "Core tools & frameworks" },
];

export const languages: LanguageItem[] = [
  { name: "Arabic", level: "Native" },
  { name: "English", level: "Fluent" },
];
