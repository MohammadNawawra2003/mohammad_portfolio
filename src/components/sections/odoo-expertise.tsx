"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { odooCapabilities } from "@/data/odoo";
import { SectionHeader, Badge } from "@/components/ui";
import { OdooEcosystem, Aurora } from "@/components/visuals";
import { fadeRight, viewportOnce } from "@/lib/motion";

/** Compact "business process" flow — distinct styling from the sim pipeline. */
const flow = ["Sales Order", "Inventory", "Invoice", "Payment"];

export function OdooExpertise() {
  return (
    <section id="odoo" className="section relative overflow-hidden">
      <Aurora className="opacity-50" />
      <div className="container-page relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          {/* Diagram centerpiece */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative order-2 mx-auto w-full max-w-[460px] lg:order-1"
          >
            <OdooEcosystem />
          </motion.div>

          {/* Copy */}
          <div className="order-1 lg:order-2">
            <SectionHeader
              eyebrow="Odoo Expertise"
              title={
                <>
                  One ORM core,
                  <br />
                  every module connected
                </>
              }
              description="I build and customize the modules a business runs on — and wire them together with Python, the Odoo ORM, and REST integrations across v16, v17, and v19."
            />

            <div className="mt-6 flex flex-wrap gap-2">
              <Badge variant="odoo">v16 / v17 / v19</Badge>
              <Badge variant="odoo">Python · ORM</Badge>
              <Badge variant="odoo">Odoo.sh</Badge>
            </div>

            {/* business process flow */}
            <div className="mt-8">
              <p className="eyebrow mb-3 text-[0.6rem]">A workflow I automate</p>
              <div className="flex flex-wrap items-center gap-1.5">
                {flow.map((step, i) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={viewportOnce}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex items-center gap-1.5"
                  >
                    <span className="rounded-md border border-odoo/30 bg-odoo/10 px-2.5 py-1 text-xs font-medium text-text">
                      {step}
                    </span>
                    {i < flow.length - 1 ? <ArrowRight className="size-3.5 text-text-faint" /> : null}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* capabilities as compact inline rows */}
            <motion.ul
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2"
            >
              {odooCapabilities.slice(0, 6).map((cap) => {
                const Icon = cap.icon;
                return (
                  <li key={cap.title} className="flex items-center gap-2.5">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-odoo/15 text-odoo">
                      <Icon className="size-3.5" />
                    </span>
                    <span className="text-sm font-medium text-text">{cap.title}</span>
                  </li>
                );
              })}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
}
