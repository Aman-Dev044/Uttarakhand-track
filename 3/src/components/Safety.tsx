"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";
import { kit, safetyRules } from "@/data/content";
import { SectionHeading, ease } from "./ui";

const promises = [
  { title: "Local crews", copy: "Guides, cooks and mule handlers from the villages on our routes." },
  { title: "Leave no trace", copy: "What goes up the trail comes back down with us." },
  { title: "One clear price", copy: "Stays, meals, permits, guides and safety gear in one number." },
];

export function Safety() {
  return (
    <section id="safety" aria-labelledby="safety-title" className="relative overflow-hidden py-20 sm:py-28">
      <div className="aurora opacity-25" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <div>
            <SectionHeading
              code="08"
              eyebrow="Altitude science"
              id="safety-title"
              title={
                <>
                  Thin air is <span className="text-aurora">a numbers game.</span>
                </>
              }
              intro="Above 10,000 ft every breath carries less oxygen. Good itineraries manage that with pace, data and the discipline to turn around."
            />

            {/* Oximeter readout */}
            <div className="glass mt-10 rounded-[1.5rem] p-5 sm:p-6" aria-hidden="true">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-mist">
                <span>Camp check · pulse oximeter</span>
                <span className="flex items-center gap-2 text-teal">
                  <span className="size-1.5 animate-blink rounded-full bg-teal" /> Logging
                </span>
              </div>
              <svg viewBox="0 0 600 120" className="mt-4 h-24 w-full">
                <motion.path
                  d="M0 70 H120 l12 -8 10 8 H200 l10 -50 14 90 12 -56 10 14 H330 l12 -8 10 8 H400 l10 -50 14 90 12 -56 10 14 H540 l12 -8 10 8 H600"
                  fill="none"
                  stroke="#2de2c4"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2.4, ease: "linear" }}
                />
              </svg>
              <div className="mt-2 grid grid-cols-3 gap-3 font-mono">
                {[
                  ["Checked", "2× daily"],
                  ["Water", "4–5 L/day"],
                  ["Fitness", "5 km < 35 min"],
                ].map(([k, v]) => (
                  <div key={k} className="border-t border-ice/10 pt-3">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-mist">{k}</p>
                    <p className="mt-1 text-sm text-ice">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {safetyRules.map((r, i) => (
              <motion.article
                key={r.code}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.7, ease, delay: i * 0.08 }}
                className="glass group flex gap-5 rounded-2xl p-5 transition hover:border-glacier/40"
              >
                <span className="font-mono text-sm text-volt">{r.code}</span>
                <div>
                  <h3 className="font-display text-lg font-semibold">{r.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-mist">{r.copy}</p>
                </div>
              </motion.article>
            ))}
            <div className="glass rounded-2xl p-5">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-mist">Carried on high-altitude batches</h3>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {kit.map((k) => (
                  <li key={k} className="flex items-center gap-2 text-sm text-ice/90">
                    <Check className="size-4 shrink-0 text-teal" aria-hidden="true" />
                    {k}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <ul className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-ice/10 bg-ice/10 sm:grid-cols-3">
          {promises.map((p) => (
            <li key={p.title} className="bg-night p-6">
              <h3 className="font-display text-base font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-mist">{p.copy}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
