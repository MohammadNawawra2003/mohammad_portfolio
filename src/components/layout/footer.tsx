"use client";

import { ArrowUp, ArrowUpRight } from "lucide-react";
import { navItems } from "@/data/navigation";
import { profile } from "@/data/profile";
import { Logo } from "@/components/shared/logo";
import { SocialLinks } from "@/components/shared/social-links";
import { GradientText } from "@/components/ui/gradient-text";
import { currentYear } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[var(--border)]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-brand opacity-70" />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-40%] left-1/2 h-[60vh] w-[80vw] -translate-x-1/2 rounded-full opacity-40 blur-[120px]"
        style={{ background: "radial-gradient(circle, var(--halo), transparent 70%)" }}
      />

      <div className="container-page relative">
        {/* Big closing CTA */}
        <div className="flex flex-col items-start gap-6 border-b border-[var(--border)] py-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Let&apos;s work together</p>
            <h2 className="mt-3 max-w-2xl text-balance text-h1 font-semibold tracking-tight text-text">
              Have a project in <GradientText>simulation</GradientText> or{" "}
              <GradientText>Odoo</GradientText>? Let&apos;s build it.
            </h2>
          </div>
          <a
            href="#contact"
            data-cursor="Say hi"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-brand px-7 py-4 text-base font-medium text-white shadow-glow transition-all duration-300 hover:shadow-glow-lg hover:brightness-110"
          >
            Start a conversation
            <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Lower grid */}
        <div className="grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <a href="#top" aria-label="Home" className="inline-flex">
              <Logo className="h-8" />
            </a>
            <p className="mt-4 text-sm leading-relaxed text-text-muted">
              {profile.name}, {profile.title}.
            </p>
            <div className="mt-5">
              <SocialLinks />
            </div>
          </div>

          <nav aria-label="Footer">
            <p className="mb-4 text-xs font-medium uppercase tracking-widest text-text-faint">
              Navigate
            </p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-text-muted transition-colors hover:text-brand-400"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-widest text-text-faint">
              Get in touch
            </p>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <a href={`mailto:${profile.email}`} className="text-text-muted hover:text-brand-400">
                  {profile.email}
                </a>
              </li>
              <li>
                <a href="tel:+970568833066" className="text-text-muted hover:text-brand-400">
                  {profile.phone}
                </a>
              </li>
              <li className="text-text-muted">{profile.location}</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-[var(--border)] py-6 sm:flex-row sm:items-center">
          <p className="text-xs text-text-faint">
            © {currentYear()} {profile.name}. Built with Next.js, TypeScript, Tailwind & Framer
            Motion.
          </p>
          <a
            href="#top"
            className="group flex items-center gap-2 text-xs text-text-muted transition-colors hover:text-brand-400"
          >
            Back to top
            <span className="flex size-7 items-center justify-center rounded-full border border-[var(--border)] transition-transform group-hover:-translate-y-0.5">
              <ArrowUp className="size-3.5" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
