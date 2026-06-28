# Mohammad Alnawawreh — Portfolio

A premium, production-grade personal portfolio for **Mohammad Alnawawreh**, a Computational
Engineer & Odoo Developer. Built to read like the personal site of an elite engineer — Apple /
Linear / Stripe / Vercel register — with a dark-first design, glassmorphism, soft gradients,
custom engineering visuals (FEM, CFD, mesh convergence, equations), and smooth, accessible motion.

> The full design + engineering specification lives in [`PORTFOLIO_SPEC.md`](./PORTFOLIO_SPEC.md).

## Tech stack

- **Framework:** Next.js 15 (App Router, React 19, RSC-first)
- **Language:** TypeScript (strict, `noUncheckedIndexedAccess`)
- **Styling:** Tailwind CSS + CSS design tokens (light & dark themes)
- **Animation:** Framer Motion (centralized motion vocabulary in `src/lib/motion.ts`)
- **UI primitives:** shadcn-style components on Radix Slot + custom primitives
- **Icons:** Lucide
- **Smooth scroll:** Lenis
- **Forms:** React Hook Form + Zod
- **Email (optional):** Resend (graceful `mailto:` fallback)
- **Theme:** next-themes (class strategy, no FOUC)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

### Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (next/core-web-vitals + TS) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run format` | Prettier with Tailwind class sorting |

## Environment variables

Copy `.env.example` → `.env.local`. All are optional — without them the contact form falls back to
opening the visitor's mail client.

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Enables server-side email delivery via Resend |
| `CONTACT_TO_EMAIL` | Inbox that receives contact submissions |
| `CONTACT_FROM_EMAIL` | Verified Resend "from" address |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (metadata, sitemap, OG) |

## Project structure

```
src/
├─ app/                # routes, layout, globals, metadata, api, sitemap, robots
├─ components/
│  ├─ layout/          # navbar, mobile menu, footer, scroll progress, theme toggle
│  ├─ sections/        # hero, about, skills, experience, education, odoo, engineering, projects, contact
│  ├─ hero/            # portrait + floating engineering cards composition
│  ├─ visuals/         # gradient mesh, particles, FEM/CFD/mesh/equation art
│  ├─ ui/              # reusable primitives (button, glass-card, reveal, tilt, marquee, …)
│  ├─ shared/          # logo, social links, resume button, scroll cue
│  └─ providers/       # theme + Lenis providers
├─ data/               # typed content (CV is the single source of truth)
├─ lib/                # utils, motion variants, hooks, seo, validations
└─ types/              # shared TypeScript interfaces
```

## Content

All content (name, summary, experience, education, skills, contact) is sourced verbatim from
Mohammad's CV and lives under `src/data/`. To update the site, edit those typed files — no component
changes required.

## The portrait

The hero portrait is the exact uploaded photo with the background cleanly removed (identity
preserved, lighting only lightly improved). Source files:

- `public/images/portrait.png` — processed, transparent, web-optimized
- `public/images/portrait-original.jpg` — untouched original

## Accessibility & performance

- WCAG 2.1 AA targets: semantic landmarks, keyboard nav, focus rings, skip link, focus-trapped
  mobile menu, `aria-live` form status, `prefers-reduced-motion` honored everywhere.
- RSC-first with client interactivity at the leaves; canvas particles paused offscreen and disabled
  under reduced motion; images via `next/image` (AVIF/WebP, priority LCP portrait).

## Deployment (Vercel)

1. Push to GitHub and import the repo into Vercel (zero config).
2. Add the environment variables above (optional).
3. Set a custom domain and update `NEXT_PUBLIC_SITE_URL`.

## License

MIT © Mohammad Alnawawreh
