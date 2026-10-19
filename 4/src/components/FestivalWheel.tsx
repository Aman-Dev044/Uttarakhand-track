"use client";

import Image from "next/image";
import { useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "motion/react";
import { festivalCalendar, monthNames, months } from "@/data/content";
import { Mandala, Reveal, SectionTitle, ease } from "./ui";

const noop = () => () => {};

export function FestivalWheel() {
  // Open on the visitor's current month once we're in the browser
  const currentMonth = useSyncExternalStore(noop, () => new Date().getMonth() + 1, () => 10);
  const [picked, setPicked] = useState<number | null>(null);
  const month = picked ?? currentMonth;
  const list = festivalCalendar[month] ?? [];
  const rotation = -(month - 1) * 30;

  return (
    <section id="festivals" aria-labelledby="festivals-title" className="relative overflow-hidden bg-[#0b3c3a] py-24 text-ivory sm:py-32">
      <div className="aipan absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
        <SectionTitle
          id="festivals-title"
          tone="dark"
          hindi="पर्व और मेले"
          eyebrow="Festivals & fairs"
          title={
            <>
              A year of festivals <em className="text-marigold">on the hill calendar</em>
            </>
          }
          lede="Turn the wheel to see what the hills celebrate each month. Most festivals follow the lunar calendar, so the dates move a little each year."
        />

        <div className="mt-16 grid items-center gap-14 lg:grid-cols-2">
          {/* The wheel */}
          <div className="relative mx-auto aspect-square w-full max-w-[min(88vw,500px)]">
            <div className="absolute inset-[16%] rounded-full bg-[radial-gradient(circle,rgba(246,167,35,.25),rgba(246,167,35,0)_70%)]" aria-hidden="true" />
            <div className="absolute inset-[22%] animate-mandala text-marigold/40" aria-hidden="true">
              <Mandala className="size-full" />
            </div>
            <motion.div
              className="absolute inset-0 rounded-full border border-brass-light/30"
              animate={{ rotate: rotation }}
              transition={{ type: "spring", stiffness: 60, damping: 16 }}
            >
              <div className="absolute inset-[9%] rounded-full border border-dashed border-brass-light/20" aria-hidden="true" />
              <ul aria-label="Months">
                {months.map((m, i) => {
                  const angle = (i * 30 * Math.PI) / 180;
                  const on = month === i + 1;
                  const count = festivalCalendar[i + 1]?.length ?? 0;
                  return (
                    <li
                      key={m}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${50 + Math.sin(angle) * 45.5}%`, top: `${50 - Math.cos(angle) * 45.5}%` }}
                    >
                      <motion.button
                        type="button"
                        onClick={() => setPicked(i + 1)}
                        aria-pressed={on}
                        aria-label={`${monthNames[i]}: ${count} festival${count === 1 ? "" : "s"}`}
                        animate={{ rotate: -rotation }}
                        transition={{ type: "spring", stiffness: 60, damping: 16 }}
                        className={`grid size-11 place-items-center rounded-full text-[13px] font-semibold transition-colors sm:size-14 sm:text-sm ${
                          on ? "bg-marigold text-maroon-deep shadow-[0_0_24px_rgba(246,167,35,.6)]" : "bg-night/40 text-ivory/80 ring-1 ring-brass-light/30 hover:bg-ivory/15"
                        }`}
                      >
                        {m}
                      </motion.button>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
            {/* Pointer at the top */}
            <span className="absolute left-1/2 top-[-6px] size-3 -translate-x-1/2 rotate-45 bg-marigold" aria-hidden="true" />
            <div className="absolute inset-0 grid place-items-center text-center" aria-hidden="true">
              <AnimatePresence mode="wait">
                <motion.div
                  key={month}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.4, ease }}
                >
                  <p className="font-display text-4xl sm:text-5xl">{monthNames[month - 1]}</p>
                  <p className="mt-1 font-inscription text-xs uppercase tracking-[0.25em] text-brass-light">
                    {list.length} {list.length === 1 ? "celebration" : "celebrations"}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* What happens this month */}
          <div aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.ul
                key={month}
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={{ show: { transition: { staggerChildren: 0.08 } }, hidden: {} }}
                className="space-y-4"
              >
                {list.map((f) => (
                  <motion.li
                    key={f.name}
                    variants={{ hidden: { opacity: 0, x: 24 }, show: { opacity: 1, x: 0, transition: { duration: 0.5, ease } } }}
                    className="rounded-2xl border border-brass-light/25 bg-night/30 p-6 backdrop-blur-sm"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-display text-3xl">{f.name}</h3>
                      {f.hindi && (
                        <span className="font-deva text-xl text-marigold" lang="hi">
                          {f.hindi}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 font-inscription text-[11px] uppercase tracking-[0.22em] text-brass-light">{f.when}</p>
                    <p className="mt-3 leading-relaxed text-ivory/75">{f.copy}</p>
                  </motion.li>
                ))}
              </motion.ul>
            </AnimatePresence>

            <Reveal className="mt-8">
              <div className="flex items-center gap-5 overflow-hidden rounded-2xl bg-ivory/[0.06] p-3 ring-1 ring-brass-light/20">
                <div className="relative size-24 shrink-0 overflow-hidden rounded-xl sm:size-28">
                  <Image src="/images/kumbh.jpg" alt="Crowds of pilgrims at a Kumbh Mela" fill sizes="112px" className="object-cover" />
                </div>
                <div className="pr-3">
                  <p className="font-display text-2xl">Kumbh Mela, Haridwar</p>
                  <p className="mt-1 text-sm leading-relaxed text-ivory/70">
                    Held about every 12 years, with an Ardh Kumbh in between. Millions bathe at Har Ki Pauri on the
                    auspicious days.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
