"use client";

import { profile } from "@/data/profile";
import { SectionHeader, GlassCard, GradientText, CopyChip, Reveal } from "@/components/ui";
import { ContactForm } from "./contact-form";
import { GradientMesh } from "@/components/visuals";
import { fadeLeft, fadeRight } from "@/lib/motion";

export function Contact() {
  return (
    <section id="contact" className="section relative overflow-hidden">
      <GradientMesh className="opacity-70" />
      <div className="container-page relative">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          {/* Invitation + details */}
          <Reveal variants={fadeRight}>
            <SectionHeader
              eyebrow="Contact"
              title={
                <>
                  Let&apos;s build something <GradientText>precise</GradientText>
                </>
              }
              description="Open to internships, collaborations, and Odoo or computational-engineering projects. The fastest way to reach me is below."
            />

            <ul className="mt-8 flex flex-col gap-3">
              {profile.links
                .filter((l) => ["Email", "Phone", "LinkedIn", "Location"].includes(l.label))
                .map((link) => (
                  <li key={link.label}>
                    <CopyChip
                      label={link.label}
                      value={link.value ?? link.href}
                      href={link.href}
                      icon={<link.icon className="size-4" />}
                    />
                  </li>
                ))}
            </ul>
          </Reveal>

          {/* Form */}
          <Reveal variants={fadeLeft}>
            <GlassCard className="p-6 sm:p-8">
              <h3 className="text-h3 font-semibold text-text">Send a message</h3>
              <p className="mt-1 text-sm text-text-muted">
                Fill in the form and I&apos;ll get back to you.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
