"use client";

import Image from "next/image";
import { useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "motion/react";
import { months, seasonNotes, treks } from "@/data/content";
import { SectionHeading, ease, inr } from "./ui";

// Snow → spring → monsoon → autumn → snow, used as the month timeline backdrop
const seasonColor = [
  "#a9d4e2", "#a9d4e2", "#f4a6b8", "#9ccf7a", "#6ea83a", "#4f9a4a",
  "#3f7f6b", "#3f7f6b", "#e6b04a", "#f0782a", "#c9874b", "#a9d4e2",
];

const noop = () => () => {};

export function Seasons() {
  // Default to the visitor's current month; October is the prerendered fallback
  const currentMonth = useSyncExternalStore(noop, () => new Date().getMonth() + 1, () => 10);
  const [picked, setMonth] = useState<number | null>(null);
  const month = picked ?? currentMonth;

  const open = treks.filter((t) => t.months.includes(month));

  return (
    <section id="seasons" aria-labelledby="seasons-title" className="relative overflow-hidden bg-parchment py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="seasons-title"
          eyebrow="Best time to visit"
          title="Every month has"
          accent="a trail."
          description="Uttarakhand has six seasons, not four. Pick a month to see which treks are in their prime."
        />

        <div role="tablist" aria-label="Month" className="mt-12 grid grid-cols-6 gap-1 sm:flex">
          {months.map((m, i) => {
            const n = i + 1;
            const active = n === month;
            return (
              <button
                key={m}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls="season-panel"
                onClick={() => setMonth(n)}
                className="group relative flex flex-1 flex-col items-center gap-3 rounded-2xl px-2 pb-3 pt-4"
              >
                {active && (
                  <motion.span layoutId="month-bg" className="absolute inset-0 rounded-2xl bg-ink" transition={{ duration: 0.5, ease }} />
                )}
                <span
                  className="relative h-10 w-1.5 rounded-full transition-all duration-500 group-hover:h-14"
                  style={{ background: seasonColor[i], height: active ? 56 : undefined }}
                  aria-hidden="true"
                />
                <span className={`relative text-sm font-semibold ${active ? "text-snow" : "text-charcoal/70"}`}>{m}</span>
              </button>
            );
          })}
        </div>

        <div id="season-panel" role="tabpanel" aria-live="polite" className="mt-10 grid gap-10 lg:grid-cols-[22rem_1fr]">
          <AnimatePresence mode="wait">
            <motion.div
              key={month}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease }}
            >
              <p className="font-display text-7xl text-ink">{months[month - 1]}</p>
              <p className="mt-4 text-lg text-charcoal/75">{seasonNotes[month]}</p>
              <p className="mt-6 text-sm text-charcoal/60">
                <strong className="text-ink">{open.length}</strong> treks with fixed departures this month.
              </p>
            </motion.div>
          </AnimatePresence>

          <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {open.map((t, i) => (
                <motion.li
                  key={`${month}-${t.slug}`}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease, delay: i * 0.04 }}
                >
                  <a href="#treks" className="group flex items-center gap-4 rounded-2xl bg-snow p-3 ring-1 ring-ink/5 transition hover:ring-ink/20">
                    <span className="relative size-16 shrink-0 overflow-hidden rounded-xl">
                      <Image src={t.image} alt="" fill sizes="64px" className="object-cover transition duration-700 group-hover:scale-110" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-semibold text-ink">{t.name}</span>
                      <span className="mt-0.5 block text-xs text-charcoal/60">
                        {t.grade} · from {inr(t.price)}
                      </span>
                    </span>
                  </a>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </div>
    </section>
  );
}
