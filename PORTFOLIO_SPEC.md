# PORTFOLIO_SPEC.md
### Software Specification — Mohammad Alnawawreh · Personal Portfolio
**Version:** 1.0 (pre-build, awaiting approval) · **Owner:** Mohammad Alnawawreh · **Author:** Engineering (senior-staff-level spec) · **Status:** DRAFT — DO NOT IMPLEMENT UNTIL APPROVED

---

## 0. Purpose & Reading Guide

This document is the single source of truth for building Mohammad Alnawawreh's portfolio website. It defines every design token, interaction, component, file, and quality gate **before** a line of application code is written. Nothing in the build should contradict this document; if reality forces a change, the change is recorded here first.

The goal is a site that reads as the personal site of an elite engineer — the visual register of Apple, Linear, Stripe, Vercel, Framer, Raycast, and Arc — while telling an honest story drawn **only** from the CV: a Computational Engineer and Odoo developer who bridges numerical simulation (FEM/CFD), scientific computing, and production ERP software.

**Hard content rule:** Every factual claim (roles, dates, GPA, skills, contacts) comes from the CV PDF. No invented employers, titles, metrics, or testimonials. Where the design needs "proof" visuals (FEM contours, CFD streamlines, equations, mesh, Odoo dashboard), these are *illustrative engineering art*, clearly decorative, never fabricated client logos or fake numbers presented as achievements.

---

## 1. Source-of-Truth Data (from CV)

These values are frozen and must be encoded verbatim in the data layer (`src/data/*`).

- **Name:** Mohammad Alnawawreh
- **Title / role line:** Junior Odoo Developer | Computational Engineer
- **One-line positioning (hero subhead):** "Bridging computational engineering, simulation, and software development to build intelligent ERP and business solutions."
- **Location:** Bethlehem, Palestine
- **Email:** mnawawra900@gmail.com
- **Phone:** +970 568833066
- **LinkedIn:** https://www.linkedin.com/in/mnawawra/
- **Existing portfolio (legacy):** https://mohammadnawawra2003.github.io/mohammad-portfolio/

**Professional summary (verbatim):** Motivated Computational Engineer with a strong academic background in numerical methods, finite element analysis, and programming. Proficient in Python, FEA tools, and Odoo development, with experience in developing custom modules, building APIs, and automating business processes.

**Experience (most-recent first):**
1. **Odoo Development Intern — AlShayeb Partners**, Palestine · Hybrid · Apr 2026 – Present
   - Hands-on training on Odoo v19 modules: Inventory, Accounting, CRM, Sales, Purchase.
   - Building deep understanding of module functionality and workflows for business-process optimization.
   - Practical experience with Odoo.sh for module deployment and project management.
2. **Odoo Development Intern — ProMax Serve**, Qatar · Remote · Aug 2025 – Apr 2026
   - Developed and customized Odoo modules (v16/v17) with Python and the Odoo ORM to automate business processes.
   - Built REST APIs integrating Odoo with external systems (registration and payment), handling data exchange and authentication.
   - Customized ERP modules for client implementations, improving workflow automation and data accuracy.
3. **FEA & Modeling Intern — FAU Erlangen-Nürnberg**, Germany · Remote · Jul 2024
   - Modeled a 3D cantilever beam under load; conducted mesh-sensitivity analysis; assessed shear locking and hourglass effects.
   - Performed finite-element analysis with ABAQUS.
   - Analyzed structural behavior in engineering applications.

**Education:**
1. **B.Sc. in Computer Simulation Engineering** — Bethlehem University, Palestine · Aug 2021 – Jul 2025 · GPA 3.39/4.0 (Major 3.43/4.0).
2. **Exchange Student** — Université catholique de Louvain (UCLouvain), Belgium · Mar 2025 – May 2025 · Scientific report on Space-Time Discontinuous Galerkin Methods for Hyperbolic Equations.

**Technical skills (grouped):**
- Programming: Python, Java, JavaScript, C++ (OpenGL)
- Databases: PostgreSQL
- Web: HTML5, CSS3, Bootstrap
- Engineering software: ABAQUS, ETABS, MATLAB
- Tools: Git, GitHub, VS Code, CodeBlocks, Eclipse, Postman, Odoo.sh

**Languages:** Arabic (Native), English (Fluent).

**Derived "What I Do" pillars** (re-grouping of the above, not new claims): Computational Engineering (FEM, CFD, numerical methods, modeling) · Odoo Development (custom modules, workflows, reports, automation) · API Integration (REST APIs, external systems, data exchange) · Automation (business-process automation, cron, ORM) · Data & Backend (PostgreSQL, data modeling) · Analysis & Optimization (accuracy, stability, performance).

---

## 2. Brand Identity

**Brand essence:** *Precision made beautiful.* The portfolio sits at the intersection of two worlds — rigorous computational engineering and clean modern software. The brand voice is confident, calm, and exact: short declarative sentences, engineering nouns, zero hype.

**Personality axes:**
- Technical ↔ Human → lean technical but always warm and legible.
- Minimal ↔ Expressive → minimal structure, expressive in motion and the hero composition.
- Corporate ↔ Personal → personal; this is one person's craft, not an agency.

**Monogram / logo:** A wordmark "MA" set as a stylized monogram — two letterforms sharing a stroke, drawn in the brand violet gradient. Implemented as an inline SVG (`Logo.tsx`) so it is crisp at any size and animatable (stroke draw-on on first load). Fallback text "Mohammad Alnawawreh" for screen readers via `aria-label`.

**Tagline options (hero eyebrow):** "Computational Engineer · Odoo Developer" (primary). Secondary microcopy used across sections: "From mesh to module."

**Tone of voice in copy:** Use first person ("I build…", "I model…"). Never overclaim seniority — the CV says *Junior Odoo Developer* and *Intern*; copy frames Mohammad as early-career but exceptional, emphasizing depth (numerical methods + production ERP) rather than years.

---

## 3. Visual Language

The reference screenshot is a *light*, airy, single-viewport composition with purple accents, soft engineering visuals, and a portrait centerpiece. We honor that direction and **exceed** it by:

- Making it a full multi-section scrolling experience (not one screen).
- Adding a true dark mode as a first-class, equally-designed theme (default = dark, the "engineering studio at night" look favored by Linear/Vercel/Raycast; light mode mirrors the reference).
- Replacing flat clip-art with cohesive, animated, on-brand engineering art (SVG/Canvas) so every visual feels engineered, not stock.
- Introducing glassmorphism, soft gradient meshes, grain, and micro-interactions throughout.

**Visual motifs (used consistently):**
- **Mesh / grid:** thin 1px lines forming FEM-like meshes and dot grids in backgrounds and card borders.
- **Field / contour:** smooth violet→cyan gradients evoking stress or velocity fields.
- **Equation marks:** subtle LaTeX-style glyphs (∇·σ + b = 0, Ku = f, Navier–Stokes) as low-opacity decoration.
- **Glass:** frosted translucent cards floating over gradient meshes.
- **Particles:** sparse drifting points (nodes) connected by faint lines (a living mesh), GPU-cheap.

---

## 4. Color Palette

Defined as design tokens (CSS custom properties + Tailwind theme). All colors meet contrast targets in §22. Purple is the signature (it bridges the Odoo brand violet with a more electric, premium hue).

**Brand / accent (shared across themes):**
| Token | Hex | Use |
|---|---|---|
| `--brand-50` | `#F5F3FF` | tint backgrounds |
| `--brand-100` | `#EDE9FE` | hover tints |
| `--brand-300` | `#C4B5FD` | borders, soft text on dark |
| `--brand-400` | `#A78BFA` | secondary accent, icons |
| `--brand-500` | `#8B5CF6` | primary accent |
| `--brand-600` | `#7C3AED` | primary buttons (the hero violet) |
| `--brand-700` | `#6D28D9` | pressed state |
| `--accent-cyan` | `#22D3EE` | gradient pair / field highlight |
| `--accent-fuchsia` | `#D946EF` | gradient pair / glow |
| `--odoo-violet` | `#714B67` | Odoo-section authenticity accent |

**Gradients:**
- `--gradient-brand`: `linear-gradient(135deg, #7C3AED 0%, #A78BFA 50%, #22D3EE 100%)` — buttons, headings, glows.
- `--gradient-field`: `linear-gradient(90deg,#3B0764,#7C3AED,#22D3EE)` — contour/legend bars.
- `--gradient-mesh` (radial mesh, dark): layered radial-gradients of brand-600/fuchsia/cyan at low alpha over near-black.

**Dark theme (default):**
| Token | Hex |
|---|---|
| `--bg` | `#0A0A0F` (near-black, slight violet) |
| `--bg-elev` | `#111119` |
| `--surface` | `rgba(255,255,255,0.04)` (glass) |
| `--surface-strong` | `rgba(255,255,255,0.07)` |
| `--border` | `rgba(255,255,255,0.10)` |
| `--text` | `#EDEDF2` |
| `--text-muted` | `#A1A1B5` |
| `--text-faint` | `#6B6B80` |

**Light theme (mirrors reference):**
| Token | Hex |
|---|---|
| `--bg` | `#FBFBFD` |
| `--bg-elev` | `#FFFFFF` |
| `--surface` | `rgba(255,255,255,0.65)` (glass over tint) |
| `--border` | `rgba(17,17,25,0.08)` |
| `--text` | `#15151F` |
| `--text-muted` | `#52526B` |
| `--text-faint` | `#8A8AA0` |

**Semantic:** `--success #34D399`, `--warning #FBBF24`, `--danger #F87171`, `--info #60A5FA`. Used sparingly (e.g., form states, contour legend labels).

All tokens live in `globals.css` under `:root` (light) and `.dark` (dark), and are surfaced to Tailwind via `tailwind.config.ts` `theme.extend.colors` using `hsl(var(--…))`-style or direct `var()` references through the `@theme`/CSS-var bridge.

---

## 5. Typography

**Typefaces (self-hosted via `next/font` for zero layout shift, no external requests):**
- **Display / headings:** *Geist* (or *Satoshi* fallback) — geometric, modern, the Vercel register. Used for H1–H3 and large numerals.
- **Body / UI:** *Inter* — proven legibility at all sizes.
- **Mono / code & data:** *Geist Mono* (fallback *JetBrains Mono*) — used for code snippets, metrics, equation labels, axis ticks, and the "engineering" texture (eyebrows in mono uppercase).

**Type scale (fluid, `clamp()`), 1.25 modular ratio anchored to a 16px base:**
| Token | clamp() | Use |
|---|---|---|
| `display` | `clamp(2.75rem, 6vw, 5.5rem)` | hero name |
| `h1` | `clamp(2.25rem, 4vw, 3.5rem)` | section heroes |
| `h2` | `clamp(1.75rem, 3vw, 2.5rem)` | section titles |
| `h3` | `clamp(1.25rem, 2vw, 1.5rem)` | card titles |
| `body-lg` | `1.125rem` | lead paragraphs |
| `body` | `1rem` | default |
| `sm` | `0.875rem` | captions |
| `xs` | `0.75rem` | mono eyebrows, legends |

**Rules:**
- Eyebrows: mono, uppercase, `letter-spacing: 0.18em`, `--text-faint`, e.g. `// FEM ANALYSIS`.
- Headings: `font-weight: 600–700`, `letter-spacing: -0.02em`, `line-height: 1.05–1.1`.
- Body: `line-height: 1.6`, `max-width: 65ch` for readable measure.
- Gradient text reserved for one or two key phrases per section (the name, a single highlighted word) — never whole paragraphs.
- Numerals (GPA, dates, metrics): mono, tabular figures.

---

## 6. Layout System

- **Container:** `max-width: 1200px` (`--container`), centered, horizontal padding `clamp(1.25rem, 5vw, 2.5rem)`.
- **Grid:** 12-column conceptual grid; implemented per-section with CSS grid/flex. Standard content gutter `--gap: clamp(1rem, 2.5vw, 2rem)`.
- **Section rhythm:** vertical padding `clamp(5rem, 10vw, 9rem)` top/bottom; sections separated by hairline `--border` or gradient divider.
- **Bento layouts:** "What I Do", "Odoo Expertise", "Tools", and "Projects" use bento-grid cards (varied spans) — the Linear/Vercel aesthetic.
- **Asymmetry:** Hero is asymmetric (text left, composition right on desktop) matching the reference; stacks to single column on mobile.
- **Z-layering (z-index scale):** background effects `0`, content `10`, sticky navbar `50`, command palette/menus `60`, modals `70`, toasts `80`, custom cursor `90`.

---

## 7. Spacing Scale

8px base spacing scale, exposed as Tailwind spacing + CSS vars:
`0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128, 160` (px).
Component internal padding standard: cards `24–32px`, buttons `12px × 20px`, inputs `12px × 16px`. Section gaps use the larger end (`80–160`). Consistent use is enforced via Tailwind utilities only (no arbitrary magic numbers except documented exceptions).

---

## 8. Border Radius

| Token | Value | Use |
|---|---|---|
| `--radius-sm` | 8px | chips, tags, inputs |
| `--radius-md` | 14px | buttons, small cards |
| `--radius-lg` | 20px | standard cards |
| `--radius-xl` | 28px | hero glass panels, feature cards |
| `--radius-2xl` | 36px | large bento containers |
| `--radius-full` | 9999px | avatars, pills, icon buttons |

Rounded-everything, but consistent: cards `lg`/`xl`, never mixing within one grid.

---

## 9. Shadows & Elevation

Soft, colored, multi-layer shadows (no harsh black). Tokens:
- `--shadow-sm`: `0 1px 2px rgba(10,10,15,.06)`
- `--shadow-md`: `0 8px 24px -8px rgba(10,10,15,.25)`
- `--shadow-lg`: `0 24px 60px -16px rgba(10,10,15,.45)`
- `--shadow-glow`: `0 0 40px -8px rgba(124,58,237,.45)` (brand glow for primary CTAs and the portrait halo)
- `--shadow-inset-glass`: `inset 0 1px 0 rgba(255,255,255,.08)` (top edge highlight on glass)

Light theme uses softer, less-saturated equivalents. Elevation increases on hover (md → lg) with the glow appearing for interactive brand elements.

---

## 10. Glassmorphism Rules

A single `.glass` system, never ad-hoc:
- Background: `--surface` (translucent), with `--surface-strong` on hover.
- `backdrop-filter: blur(16px) saturate(140%)` (and `-webkit-` prefix). Capped blur to keep perf; disabled gracefully where unsupported (solid fallback at higher alpha).
- Border: `1px solid --border` + `--shadow-inset-glass` top highlight.
- Optional inner noise/grain overlay at 3–5% opacity for texture (one shared PNG/SVG).
- Never stack more than two glass layers (blur cost + legibility). Text on glass always uses `--text`, never muted, to maintain contrast.
- Glass only over interesting backgrounds (gradient mesh, portrait composition) — not over flat sections, where we use `--bg-elev` solid cards instead.

---

## 11. Motion Language

**Philosophy:** Motion communicates structure and rewards attention; it never blocks reading. Inspired by Linear's restraint and Framer's polish. Everything respects `prefers-reduced-motion` (see §22).

**Easing tokens:**
- `--ease-out`: `cubic-bezier(0.16, 1, 0.3, 1)` (primary entrance — "expo-out")
- `--ease-in-out`: `cubic-bezier(0.65, 0, 0.35, 1)`
- `--ease-spring`: Framer spring `{ stiffness: 260, damping: 30, mass: 1 }` for interactive elements
- `--ease-snappy`: `{ stiffness: 400, damping: 28 }` for buttons/toggles

**Duration scale:** micro `120ms`, fast `200ms`, base `350ms`, slow `600ms`, ambient (background loops) `8–24s`.

**Signature motions:**
1. **Entrance reveals:** on scroll-into-view, content fades up `y: 24 → 0`, `opacity 0 → 1`, `350ms`, staggered `60ms` per child (`staggerChildren`).
2. **Hero choreography:** on first paint, name draws/fades, subhead follows, composition elements (FEM beam, CFD car-equivalent abstract, equations, Odoo panel) animate in sequence over ~1.2s.
3. **Magnetic buttons:** primary CTAs translate slightly toward the cursor (max 6px) and the glow intensifies.
4. **Tilt cards:** feature/project cards do subtle 3D tilt (`rotateX/rotateY ≤ 6°`) following pointer, with a moving specular highlight.
5. **Number count-up:** stats (GPA 3.39, years, counts) animate from 0 when in view.
6. **Marquee:** tools/tech logos scroll in an infinite, pausable marquee.
7. **Active-section underline:** navbar indicator slides between links using `layoutId` (shared-layout animation).
8. **Theme toggle:** animated sun/moon morph + a brief radial wipe of the new background.

---

## 12. Animation Timing & Choreography (per section)

- **Navbar:** appears at load (`-y → 0`, 400ms); on scroll past hero it gains glass + shadow (state change, 200ms). Hide-on-scroll-down / show-on-scroll-up optional (config flag).
- **Hero:** orchestrated timeline (eyebrow → name → role → subhead → CTAs → composition), total ≤ 1.3s; background mesh + particles start immediately and loop.
- **Section titles:** eyebrow + title + description reveal as a group, 60ms stagger.
- **Cards / bento:** stagger by grid order, 50–70ms; tilt + glow on hover.
- **Timeline (experience):** vertical line draws as it enters; each entry slides in from alternating sides on desktop, from left on mobile; the active node pulses.
- **Skills:** category groups stagger; skill pills pop with spring; optional proficiency bars animate width.
- **Contact:** form fields reveal sequentially; submit button shows loading→success micro-animation.

All scroll-triggered animations use Framer Motion `whileInView` with `viewport={{ once: true, margin: "-10% 0px" }}` to fire slightly before fully in view and only once.

---

## 13. Scroll Behavior

- **Smooth scroll:** Lenis for buttered inertial scrolling (with `prefers-reduced-motion` → native). Anchor links and nav use Lenis `scrollTo` with offset for the sticky navbar.
- **Scroll progress:** a 2px gradient progress bar fixed at the very top (`useScroll` → `scaleX`).
- **Parallax:** background mesh, particles, and select hero elements move at reduced rate via `useScroll` + `useTransform` (subtle, ≤ 40px range) to add depth without nausea.
- **Scroll-spy:** IntersectionObserver tracks the active section to drive the navbar indicator.
- **Snap:** no full-page snap (it fights long content); only the hero may use a gentle "scroll cue" chevron that bounces.

---

## 14. Hover, Mouse & Cursor Behavior

- **Hover:** every interactive element has a defined hover (color shift, elevation, glow, or underline). Cards lift + tilt; links get an animated gradient underline; icons rotate/scale subtly.
- **Mouse-reactive background:** the hero gradient/glow follows the pointer (a soft spotlight), throttled via `requestAnimationFrame`.
- **Custom cursor (desktop, pointer devices only):** a small dot + trailing ring (`mix-blend-mode: difference` or brand tint). It grows over interactive elements and shows contextual labels ("View", "Open", "Drag") on cards/links. Disabled on touch devices and when `prefers-reduced-motion` or `(hover: none)`.
- **Focus:** keyboard focus shows a clear brand focus ring (`outline` + offset), never removed.

---

## 15. Loading Animation

- **Initial preloader:** a brief (≤ 1.2s, skippable, only on first load via `sessionStorage`) overlay showing the "MA" monogram drawing its strokes + a thin progress line, then a curtain-reveal of the hero. Avoids blocking interaction; respects reduced motion (instant fade).
- **Route/section transitions:** content is single-page; section changes are scroll-based, not route changes. If a dedicated `/projects/[slug]` is added later, use Framer Motion `AnimatePresence` page transitions.
- **Skeletons:** for any client-fetched/deferred content (e.g., lazy 3D/canvas), show a shimmering glass skeleton.

---

## 16. Section-by-Section Design Spec

### 16.1 Navbar
- Sticky, top, full-width; inner `max-w` container. Left: "MA" logo. Center/right: links — About, Skills, Experience, Projects, Contact (matching reference, plus Education/Odoo reachable via scroll or grouped). Right cluster: location chip, theme toggle, and a primary "Get in touch" / "Resume" button.
- Transparent over hero → glass + hairline border after scroll.
- Mobile: hamburger → full-screen glass overlay menu (see §16.13).
- Sub-feature: ⌘K command palette trigger (optional, behind flag) to jump to sections / copy email / open links.

### 16.2 Hero
- **Layout:** left column = eyebrow (`// COMPUTATIONAL ENGINEER · ODOO DEVELOPER`), display name "Mohammad Alnawawreh" (gradient on surname), role line, subhead (positioning sentence), CTA row ("View My Work →", "Download CV ⬇"), and a small location/availability chip.
- **Right column = the centerpiece engineering composition** (§16.11): the portrait as the anchor, surrounded by glass cards and animated engineering art (FEM beam with stress contour + legend, CFD streamlines, mesh-convergence plot, mathematical-modeling equations, Odoo dashboard panel). Purple lighting halo behind the portrait; particles/mesh in the far background.
- **Mobile:** portrait composition stacks above or below the text; decorative cards reduce to the 2–3 strongest (FEM contour, equation, Odoo chip) to protect performance and clarity.

### 16.3 About
- Two-column: left = a longer narrative built strictly from the summary (numerical methods, FEA, programming; Python/FEA/Odoo; modules, APIs, automation), written in first person; right = a glass "facts" card (location, languages Arabic/English, education headline, current role) + a portrait-derived secondary image or signature.
- Includes 2–4 count-up stats sourced honestly: GPA **3.39/4.0**, **3** internships, **2** countries studied/worked, **6+** core tools. (Stats are literal counts from the CV, labeled plainly.)

### 16.4 Skills
- Bento grid grouped by the CV categories: Programming, Databases, Web, Engineering Software, Tools. Each skill is a pill with a Lucide/brand icon; hover reveals a one-word context. Optional radial/linear proficiency is **omitted or shown qualitatively** (no fake percentages) — instead group cards convey breadth. A "Languages" mini-card (Arabic Native, English Fluent).

### 16.5 Experience Timeline
- Vertical timeline, most-recent first: AlShayeb Partners (current, badge "Present"), ProMax Serve, FAU Erlangen-Nürnberg. Each entry: role, company, location, mode (Hybrid/Remote), dates, and bullet achievements (verbatim from CV). Animated draw-in line; alternating cards on desktop, left-aligned on mobile; "current" node pulses in brand color.

### 16.6 Education
- Two refined cards: Bethlehem University (B.Sc. Computer Simulation Engineering, GPA 3.39/4.0, Major 3.43) and UCLouvain exchange (with the DG-methods report note). Graduation-cap iconography (matching reference), date ranges, location chips. Possibly merged visually with Experience under a "Journey" cluster but kept semantically distinct.

### 16.7 Odoo Section ("Odoo Expertise")
- Dedicated section celebrating the ERP work, echoing the reference's "Odoo Expertise" grid: cards for Modules, Customization, Workflows, APIs, Reports, Automations, Views, Security, Integrations, Deployments (Odoo.sh). Uses the Odoo violet accent for authenticity. A stylized, **original** Odoo-style dashboard mock (our own SVG/recreation, not a screenshot of proprietary UI) demonstrates app-grid familiarity. Copy ties directly to CV bullets (v16/v17/v19, ORM, REST APIs, registration/payment integrations, cron/automation, Odoo.sh).

### 16.8 Computational Engineering Section
- The "wow" engineering showcase: animated FEM stress contour on a cantilever beam (von Mises legend 0–250 MPa as in reference), CFD-style velocity streamlines, a mesh-convergence log-log plot (Coarse→Very Fine), and governing equations (∇·σ + b = 0; Navier–Stokes momentum; Ku = f). Each visual paired with a short, accurate caption describing the concept (FEA, mesh sensitivity, shear locking/hourglass — all from the FAU bullet and degree). Rendered as performant SVG/Canvas, animated on view.

### 16.9 Projects
- Bento grid of project cards. **Honesty note:** the CV lists no named products, so projects are framed as the documented work/artifacts: (a) 3D Cantilever Beam FEA Study (ABAQUS, mesh sensitivity), (b) Odoo Custom Modules & REST API Integrations (ProMax Serve), (c) Space-Time Discontinuous Galerkin report (UCLouvain), (d) Numerical methods coursework/simulation. Each card: title, tech tags, concise CV-derived description, and an illustrative visual. Project images that don't exist are clearly marked placeholders (see §24). No fabricated live demo links unless a real URL exists (LinkedIn / legacy portfolio are real and may be linked).

### 16.10 Contact
- Split layout: left = invitation copy + direct details (email, phone, location, LinkedIn) as copy-to-clipboard chips; right = a glass contact form (Name, Email, Message) with validation. Form posts to a serverless route (`/api/contact`) wired to an email provider (Resend) **or** falls back to a `mailto:` if no key configured (documented). Success/error states animated. Social/contact icons via Lucide.

### 16.11 Hero Composition (the centerpiece — detailed)
Layered, from back to front:
1. **Background:** gradient mesh + dot-grid + drifting particle network (canvas), subtle parallax.
2. **Purple halo:** large radial brand glow behind the portrait.
3. **Portrait:** the exact uploaded photo, background removed cleanly, color/lighting subtly improved only (no face alteration). Positioned as the visual anchor, masked with a soft feather; optional thin gradient ring.
4. **Glass cards floating around portrait:** (a) FEM stress-contour beam + legend; (b) CFD streamlines tile; (c) mesh-convergence mini-plot; (d) equation card; (e) Odoo dashboard mini-panel; (f) a small "API / DB" code glass chip with floating code lines.
5. **Foreground accents:** sparkles, tiny nodes, a few floating equation glyphs.
Each card has gentle independent float (`y` oscillation, different phase) and parallax on pointer move. On mobile, reduced to the 2–3 strongest, statically placed.

### 16.12 Footer
- Compact: monogram + name, the role line, quick links (sections), social/contact icons, "Back to top" (smooth scroll), a tiny "Designed & built by Mohammad Alnawawreh — Next.js · TypeScript · Tailwind · Framer Motion" credit, copyright year (auto). Thin gradient top border.

### 16.13 Mobile Navigation
- Hamburger button (animated to X). Full-screen glass overlay: large stacked links with staggered entrance, theme toggle, contact button, and social row. Locks body scroll while open; closes on link tap / Esc / backdrop tap; fully keyboard- and screen-reader-accessible (focus trap, `aria-expanded`, `aria-modal`).

---

## 17. Dark Mode & Light Mode

- **Default:** dark (the premium engineering-studio look). User choice persisted (`localStorage`) and synced to system preference on first visit (`prefers-color-scheme`).
- Implemented via `next-themes` with `class` strategy on `<html>`; no flash (inline script in `<head>` to set the class before paint).
- Both themes are fully designed (not auto-inverted): each has bespoke surface alphas, shadow softness, gradient intensities, and portrait-halo strength. Light mode closely mirrors the reference; dark mode is the signature.
- Toggle: accessible button with animated icon; theme also reachable in mobile menu.

---

## 18. Background Effects & Particle System

- **Gradient mesh:** CSS layered radial gradients (brand/fuchsia/cyan) + animated very slow drift (transform on a wrapper, `prefers-reduced-motion` disables).
- **Dot/line grid:** repeating CSS background or SVG, masked with a radial fade so edges dissolve.
- **Particle network ("living mesh"):** lightweight `<canvas>` component — N nodes (responsive: ~40 mobile, ~90 desktop) drifting; lines drawn between nearby nodes; nodes near the cursor brighten. Capped DPR, `requestAnimationFrame`, paused when tab hidden (`visibilitychange`) and when offscreen. Fully decorative (`aria-hidden`), disabled under reduced motion / low-power heuristics.
- **Grain/noise:** one shared subtle noise overlay for texture (very low opacity).
- All effects sit at z-0 behind content and never intercept pointer events (`pointer-events: none`).

---

## 19. Responsive Rules

**Breakpoints (Tailwind):** `sm 640`, `md 768`, `lg 1024`, `xl 1280`, `2xl 1536`. **Mobile-first**: base styles target small screens; complexity layers up.

- **< 640 (mobile):** single column; hero text then composition (reduced); bento → 1 col; timeline left-aligned; nav → hamburger; custom cursor off; particles reduced; font sizes at clamp minimums.
- **640–1024 (tablet):** 2-col bentos; hero may stack or go 1.5-col; timeline single-side.
- **≥ 1024 (desktop):** full asymmetric hero with complete composition; multi-col bentos; alternating timeline; custom cursor + magnetic/tilt enabled.
- **≥ 1536:** container caps at 1200px; extra space becomes margin; effects unchanged.
- **Touch vs pointer:** pointer-only enhancements gated behind `(hover: hover) and (pointer: fine)`.
- **Orientation/safe areas:** respect iOS safe-area insets on the sticky nav and footer.
- Test matrix: 360, 390, 414, 768, 1024, 1280, 1440, 1920 widths.

---

## 20. Technical Architecture

**Stack:** Next.js 15 (App Router, RSC where possible) · React 19 · TypeScript (strict) · Tailwind CSS v3 (or v4 if stable at build time, documented) · Framer Motion · shadcn/ui (Radix primitives) · Lucide icons · next-themes · Lenis · Zod (form validation) · React Hook Form · Resend (optional contact email).

**Rendering strategy:**
- The page is a single static route `/` (SSG) for instant load + perfect SEO. Server Components render structure/content (from the data layer); Client Components are only the interactive/animated leaves (`"use client"`), keeping JS shipped minimal.
- Heavy/decorative client pieces (particles, custom cursor, command palette, 3D/canvas) are `next/dynamic` with `ssr: false` and lazy-loaded.
- No external runtime data dependency; all content is local typed data.

**State management:** No global store needed. Local state via React hooks; cross-cutting concerns via small contexts/providers only where required: `ThemeProvider` (next-themes), optional `CommandMenuProvider`, and a `LenisProvider`. Form state via React Hook Form. This keeps the app simple and tree-shakeable.

**Animation architecture:** A central `lib/motion.ts` exports shared variants (`fadeUp`, `stagger`, `scaleIn`, `drawLine`, etc.), easing/duration tokens, and a `<Reveal>` wrapper component standardizing `whileInView`. Components import variants rather than redefining them — one motion vocabulary, DRY and consistent. A `useReducedMotion` guard short-circuits non-essential motion.

---

## 21. Component Architecture & Folder Structure

```
Portfolio/
├─ public/
│  ├─ images/
│  │  ├─ portrait.png            # background-removed, optimized portrait (exact face)
│  │  ├─ portrait-original.jpg   # source backup
│  │  └─ og.png                  # OpenGraph image (1200×630)
│  ├─ cv/Mohammad-Alnawawreh-CV.pdf
│  ├─ icons/ (favicons, apple-touch, etc.)
│  └─ noise.svg
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx              # html, fonts, providers, metadata, JSON-LD
│  │  ├─ page.tsx                # composes all sections
│  │  ├─ globals.css             # tokens, base, utilities, glass
│  │  ├─ sitemap.ts
│  │  ├─ robots.ts
│  │  ├─ opengraph-image.tsx     # dynamic OG (optional)
│  │  └─ api/contact/route.ts    # contact form handler
│  ├─ components/
│  │  ├─ layout/ (Navbar, MobileMenu, Footer, ScrollProgress, ThemeToggle, CommandMenu)
│  │  ├─ sections/ (Hero, About, Skills, Experience, Education, OdooExpertise,
│  │  │              ComputationalEngineering, Projects, Contact)
│  │  ├─ hero/ (HeroComposition, PortraitCard, FemBeamCard, CfdStreamlinesCard,
│  │  │          MeshConvergenceCard, EquationCard, OdooDashboardCard, CodeChip)
│  │  ├─ visuals/ (ParticleField, GradientMesh, DotGrid, NoiseOverlay,
│  │  │            FemContour, CfdStreamlines, MeshPlot, EquationGlyphs)
│  │  ├─ ui/ (shadcn: button, card, badge, input, textarea, tooltip, dialog,
│  │  │       sheet, separator, sonner/toast, + custom: GlassCard, Pill,
│  │  │       SectionHeader, GradientText, MagneticButton, TiltCard, CountUp,
│  │  │       Marquee, CustomCursor, Reveal)
│  │  └─ shared/ (Logo, SocialLinks, ResumeButton, ScrollCue)
│  ├─ data/
│  │  ├─ profile.ts   # name, title, contacts, links, summary
│  │  ├─ experience.ts
│  │  ├─ education.ts
│  │  ├─ skills.ts
│  │  ├─ odoo.ts      # odoo expertise items
│  │  ├─ projects.ts
│  │  └─ navigation.ts
│  ├─ lib/
│  │  ├─ motion.ts    # variants, easings, durations
│  │  ├─ utils.ts     # cn(), formatters
│  │  ├─ hooks/ (useMediaQuery, useReducedMotion, useMousePosition,
│  │  │           useScrollSpy, useLockBodyScroll, useInView)
│  │  └─ seo.ts       # metadata + JSON-LD builders
│  ├─ types/
│  │  └─ index.ts     # all TS interfaces
│  └─ styles/ (optional extra css)
├─ tailwind.config.ts
├─ next.config.mjs
├─ tsconfig.json
├─ postcss.config.mjs
├─ components.json    # shadcn config
├─ .env.example
├─ .eslintrc / eslint.config.mjs
├─ .prettierrc
├─ package.json
└─ README.md
```

**File-naming conventions:** Components `PascalCase.tsx`; hooks `useX.ts` (camelCase); data/lib modules `kebab-or-camel.ts` (camelCase exports); types in `types/index.ts`. One component per file; co-located small subcomponents allowed. Barrel `index.ts` only where it reduces import noise (sections, ui).

**Component design principles:** Small, single-responsibility, prop-typed, composition over configuration. Presentational vs. interactive split (server vs. client). Shared primitives (`GlassCard`, `SectionHeader`, `Reveal`, `Pill`) used everywhere to guarantee consistency. No business logic in components — data flows from `src/data`.

---

## 22. Accessibility (WCAG 2.1 AA target)

- **Semantics:** one `<h1>` (hero name), logical heading order, landmark elements (`header`, `nav`, `main`, `section[aria-labelledby]`, `footer`).
- **Color contrast:** body text ≥ 4.5:1, large text ≥ 3:1 in both themes; never rely on color alone (icons/labels accompany state).
- **Keyboard:** full tab navigation, visible focus rings, skip-to-content link, focus trap in mobile menu/dialogs, Esc to close overlays, logical focus order.
- **Screen readers:** `aria-label`s on icon buttons, `aria-current` on active nav, `aria-live` for form status/toasts, decorative visuals `aria-hidden`, meaningful `alt` on the portrait ("Portrait of Mohammad Alnawawreh").
- **Motion:** `prefers-reduced-motion` disables parallax, particles, marquees, tilt, custom cursor, and replaces entrance animations with instant/opacity-only.
- **Forms:** labels tied to inputs, inline error messages, `aria-invalid`, `aria-describedby`.
- **Targets:** interactive hit areas ≥ 44×44px on touch.
- Audited with axe / Lighthouse a11y; target score ≥ 95.

---

## 23. Performance Optimization (Lighthouse ≥ 95)

- **Budgets:** initial JS ≤ ~120KB gzipped; LCP < 2.0s; CLS < 0.05; INP < 200ms; TBT minimal.
- **RSC-first:** ship interactivity only where needed; lazy-load all decorative client modules (`next/dynamic`, `ssr:false`, intersection-gated).
- **Images:** `next/image` with explicit width/height (no CLS), AVIF/WebP, responsive `sizes`, `priority` only on the portrait (LCP), blur placeholders; the portrait pre-optimized (compressed PNG with alpha + smaller responsive variants).
- **Fonts:** `next/font` self-hosted, `display: swap`, preloaded subset; no FOIT/FOUT shift.
- **Canvas/particles:** capped node count + DPR, `rAF`, paused offscreen/hidden, reduced on mobile.
- **CSS:** Tailwind JIT, purge unused; critical styles inlined by Next.
- **Code-split** per heavy component; tree-shake icons (import individual Lucide icons).
- **Caching/headers:** static assets immutable; proper `Cache-Control`.
- **Avoid layout thrash:** transform/opacity-only animations (GPU), `will-change` used sparingly, `content-visibility: auto` on long offscreen sections.
- Monitored via Lighthouse CI in the production checklist.

---

## 24. Image & Asset Pipeline (Portrait Handling)

**Portrait is sacred:** use the exact uploaded face. Process = background removal + light/color cleanup **only**; no warping, no face regeneration, realistic proportions preserved.
- Source backed up to `public/images/portrait-original.jpg`.
- Background removed (clean alpha cutout); soft feathered edge for blending into the dark/light composition.
- Lighting/contrast/white-balance gently improved; optional subtle brand-violet rim light to match the halo — face untouched.
- Exported as optimized `portrait.png` (alpha) + responsive sizes; served via `next/image` with `priority`.
- If automated background removal isn't available in-build, the spec documents the manual/script step and ships the original with a documented TODO — **the face is never substituted.**

**Other assets:** engineering visuals are code-generated (SVG/Canvas), so no licensing/stock issues. Odoo "dashboard" is an original recreation (icons/grid), not a proprietary screenshot. **Project images that don't exist** are the *only* permitted placeholders: tasteful generated gradient/mesh placeholders labeled as such, easily swapped later.

---

## 25. SEO, Metadata, OpenGraph, Structured Data

- **Metadata API:** title template "Mohammad Alnawawreh — Computational Engineer & Odoo Developer", rich description from the summary, keywords (Odoo developer, computational engineering, FEM, CFD, numerical methods, Palestine), canonical URL, theme-color, robots index/follow.
- **OpenGraph + Twitter cards:** custom 1200×630 OG image (name, role, brand mesh, portrait) via static `og.png` or dynamic `opengraph-image.tsx`.
- **Structured data (JSON-LD):** `Person` schema (name, jobTitle, address Bethlehem PS, email, sameAs LinkedIn/portfolio, alumniOf Bethlehem University & UCLouvain, knowsAbout skills) injected in `layout.tsx`. Optionally `WebSite` schema.
- **`sitemap.ts` + `robots.ts`** generated. Semantic HTML and descriptive link text aid crawling. `lang="en"`, `dir="ltr"`.
- Per-section anchor IDs for deep links (`#about`, `#experience`, …).

---

## 26. Deployment

- **Target:** Vercel (zero-config Next.js). Production branch auto-deploy; preview deploys per PR.
- **Env vars:** `RESEND_API_KEY`, `CONTACT_TO_EMAIL` (optional; documented in `.env.example`). Without them, contact falls back to `mailto:`.
- **Domain:** custom domain ready (e.g., mohammadalnawawreh.com) with HTTPS; configure in Vercel + DNS (documented in README).
- **CI checks:** typecheck, lint, build must pass; optional Lighthouse CI.
- **Analytics:** Vercel Analytics / Speed Insights (privacy-friendly), optional.

---

## 27. Code Conventions & Quality

- **TypeScript strict** (`strict`, `noUncheckedIndexedAccess`, `noImplicitAny`); no `any` (use precise types/`unknown`). All data typed via `src/types`.
- **ESLint** (next/core-web-vitals + TS) + **Prettier** (consistent formatting, Tailwind class sorting plugin). Pre-commit hook optional (lint-staged + husky).
- **Imports:** absolute via `@/*` path alias; ordered (external → internal → relative).
- **Components:** named exports for primitives, default for sections is acceptable—pick one convention and keep it (spec chooses **named exports** everywhere for grep-ability).
- **Comments:** explain *why*, not *what*; engineering visuals documented (math/assumptions). Match surrounding style.
- **Accessibility & perf are review gates**, not afterthoughts.
- **No dead code, no console logs in production, no TODOs left unmarked.**

---

## 28. TypeScript Interfaces (data contracts)

```ts
// src/types/index.ts (illustrative)
export interface Profile {
  name: string;
  title: string;            // "Junior Odoo Developer | Computational Engineer"
  tagline: string;
  summary: string;
  location: string;         // "Bethlehem, Palestine"
  email: string;
  phone: string;
  links: { label: string; href: string; icon: string }[];
  resumeUrl: string;
  availability?: string;    // e.g., "Open to opportunities"
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  mode: "Remote" | "Hybrid" | "On-site";
  start: string;            // "Aug 2025"
  end: string;              // "Apr 2026" | "Present"
  current?: boolean;
  highlights: string[];
  stack?: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  start: string;
  end: string;
  detail?: string;          // GPA / report note
  gpa?: string;
}

export interface SkillGroup {
  category: string;         // "Programming", "Databases", ...
  icon: string;
  skills: { name: string; icon?: string }[];
}

export interface OdooCapability { title: string; description: string; icon: string; }

export interface Project {
  title: string;
  category: "Computational" | "Odoo" | "Research";
  description: string;
  tags: string[];
  image?: string;           // placeholder if absent
  links?: { label: string; href: string }[];
}

export interface NavItem { label: string; href: string; }
```

(Exact fields finalized during build; the data files mirror §1 verbatim.)

---

## 29. Production Checklist (Definition of Done)

**Content & truth**
- [ ] All text/dates/links match the CV PDF exactly; nothing invented.
- [ ] Portrait is the exact uploaded face, bg removed, lighting-only improvements.
- [ ] CV PDF downloadable; LinkedIn/legacy portfolio links correct.

**Functionality**
- [ ] All sections present and populated from `src/data`.
- [ ] Navbar scroll-spy, smooth scroll, theme toggle, mobile menu work.
- [ ] Contact form validates and sends (or mailto fallback) with success/error states.
- [ ] Command palette / cursor / particles degrade gracefully.

**Design & motion**
- [ ] Both themes fully designed; no FOUC.
- [ ] Animations consistent (shared variants), reduced-motion respected.
- [ ] Responsive at all test widths; no overflow; touch targets ≥ 44px.

**Quality gates**
- [ ] `tsc --noEmit` clean; ESLint clean; Prettier formatted.
- [ ] `next build` succeeds; no console errors/warnings.
- [ ] Lighthouse ≥ 95 Performance/Accessibility/Best-Practices/SEO (desktop & mobile).
- [ ] Axe a11y: no critical issues; keyboard-only pass.
- [ ] CLS < 0.05, LCP < 2.0s on mid-tier mobile.

**SEO & meta**
- [ ] Metadata, OG image, JSON-LD, sitemap, robots, favicons present.

**Deploy**
- [ ] Builds on Vercel; env documented; README complete (setup, scripts, customization, deploy).

---

## 30. Build Order (once approved)

1. Scaffold (Next 15, TS, Tailwind, shadcn, fonts, providers, tokens in `globals.css`).
2. Data layer + types (verbatim CV content).
3. Primitives (`GlassCard`, `SectionHeader`, `Reveal`, `Pill`, `MagneticButton`, `TiltCard`, `CountUp`, `Marquee`) + `lib/motion.ts`.
4. Layout (Navbar, MobileMenu, Footer, ScrollProgress, ThemeToggle).
5. Background visuals (GradientMesh, DotGrid, ParticleField, Noise) + engineering visuals (FemContour, CfdStreamlines, MeshPlot, EquationGlyphs).
6. Hero + composition (PortraitCard + surrounding glass cards).
7. Sections (About → Skills → Experience → Education → OdooExpertise → ComputationalEngineering → Projects → Contact).
8. SEO/meta/JSON-LD/sitemap/robots/OG, contact API.
9. Portrait processing + asset optimization.
10. QA pass against §29; README; deploy notes.

---

*End of specification. Awaiting approval before any application code is written.*
