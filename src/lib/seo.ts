import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { absoluteUrl } from "@/lib/utils";

const TITLE = `${profile.name} — Computational Engineer & Odoo Developer`;
const DESCRIPTION = profile.summary;

export const siteMetadata: Metadata = {
  metadataBase: new URL(absoluteUrl()),
  title: {
    default: TITLE,
    template: `%s — ${profile.name}`,
  },
  description: DESCRIPTION,
  applicationName: `${profile.name} Portfolio`,
  authors: [{ name: profile.name, url: "https://www.linkedin.com/in/mnawawra/" }],
  creator: profile.name,
  keywords: [
    "Mohammad Alnawawreh",
    "Odoo Developer",
    "Computational Engineer",
    "Finite Element Analysis",
    "FEM",
    "CFD",
    "Numerical Methods",
    "Python Developer",
    "ERP",
    "Odoo",
    "Palestine",
    "ABAQUS",
    "REST API",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: absoluteUrl(),
    siteName: `${profile.name} Portfolio`,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/images/og.png",
        width: 1200,
        height: 630,
        alt: `${profile.name} — Computational Engineer & Odoo Developer`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [
      { url: "/icons/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/icons/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
  category: "technology",
};

/** Person JSON-LD describing Mohammad for rich results. */
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: "Computational Engineer & Odoo Developer",
    description: profile.summary,
    email: `mailto:${profile.email}`,
    telephone: profile.phone,
    url: absoluteUrl(),
    image: absoluteUrl("/images/og.png"),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bethlehem",
      addressCountry: "PS",
    },
    sameAs: [
      "https://www.linkedin.com/in/mnawawra/",
      "https://mohammadnawawra2003.github.io/mohammad-portfolio/",
    ],
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "Bethlehem University",
      },
      {
        "@type": "CollegeOrUniversity",
        name: "Université catholique de Louvain (UCLouvain)",
      },
    ],
    knowsAbout: [
      "Finite Element Analysis",
      "Computational Fluid Dynamics",
      "Numerical Methods",
      "Odoo Development",
      "Python",
      "REST APIs",
      "PostgreSQL",
      "Business Process Automation",
    ],
    knowsLanguage: ["Arabic", "English"],
  };
}

/** WebSite JSON-LD. */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${profile.name} Portfolio`,
    url: absoluteUrl(),
    inLanguage: "en",
  };
}
