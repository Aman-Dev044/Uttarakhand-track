"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { months, seasons, treks } from "@/data/content";
import { ease, FadeUp, ft, inr, Label, LineReveal, pickTrek } from "./ui";

export function Seasons() {
  // z grows with every switch so the incoming photo always wipes in above the outgoing one
  const [view, setView] = useState({ active: 3, z: 1 });
  const active = view.active;
  const setActive = (i: number) => setView((v) => (v.active === i ? v : { active: i, z: v.z + 1 }));
  const season = seasons[active];
  const fits = treks.filter((t) => t.months.some((m) => (season.months as readonly number[]).includes(m)));

  return (
    <section id="seasons" aria-labelledby="seasons-title" className="bg-ice px-5 py-24 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <Label n="04">When to go</Label>
            <LineReveal
              id="seasons-title"
              lines={["Pick a season,", "not just a trek."]}
              className="mt-8 font-display text-[2.6rem] font-semibold leading-[0.95] tracking-[-0.05em] sm:text-7xl xl:text-[5.6rem]"
            />
          </div>
          <FadeUp>
            <p className="max-w-md text-[17px] leading-relaxed text-slate-2 lg:ml-auto">
              The same mountain is four different trips a year. Choose what you want to see first, then the trail that shows
              it best.
            </p>
          </FadeUp>
        </div>

        <div role="tablist" aria-label="Seasons" className="mt-16 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {seasons.map((s, i) => {
            const on = i === active;
            return (
              <button
                key={s.key}
                id={`season-tab-${s.key}`}
                role="tab"
                type="button"
                aria-selected={on}
                aria-controls="season-panel"
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                    e.preventDefault();
                    const next = (i + (e.key === "ArrowRight" ? 1 : seasons.length - 1)) % seasons.length;
                    setActive(next);
                    document.getElementById(`season-tab-${seasons[next].key}`)?.focus();
                  }
                }}
                className={`group relative overflow-hidden rounded-2xl px-5 py-4 text-left transition-colors sm:py-5 ${on ? "text-snow" : "bg-white/60 text-slate hover:bg-white"}`}
              >
                {on && <motion.span layoutId="season-bg" transition={{ duration: 0.55, ease }} className="absolute inset-0 bg-slate" />}
                <span className="relative block font-display text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">{s.name}</span>
                <span className={`relative mt-1 block text-[13px] ${on ? "text-snow/70" : "text-stone"}`}>{s.span}</span>
              </button>
            );
          })}
        </div>

        <div
          id="season-panel"
          role="tabpanel"
          aria-labelledby={`season-tab-${season.key}`}
          className="mt-6 grid gap-6 lg:grid-cols-[1.25fr_1fr] lg:gap-10"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-frost lg:aspect-auto lg:min-h-[560px]">
            <div className="absolute inset-0 isolate">
            <AnimatePresence initial={false}>
              <motion.div
                key={season.key}
                initial={{ clipPath: "inset(0 0 0 100%)" }}
                animate={{ clipPath: "inset(0 0 0 0%)" }}
                exit={{ opacity: 1 }}
                transition={{ duration: 1, ease }}
                style={{ zIndex: view.z }}
                className="absolute inset-0"
              >
                <motion.div initial={{ scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: 1.6, ease }} className="absolute inset-0">
                  <Image src={season.image} alt={season.alt} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
                </motion.div>
              </motion.div>
            </AnimatePresence>
            </div>
            <ol aria-label={`${season.name} months`} className="absolute inset-x-4 bottom-4 z-10 grid grid-cols-12 gap-1 sm:inset-x-6 sm:bottom-6">
              {months.map((m, i) => {
                const on = (season.months as readonly number[]).includes(i + 1);
                return (
                  <li
                    key={m}
                    className={`rounded-md py-1.5 text-center text-[10px] font-medium backdrop-blur-sm transition-colors duration-500 sm:text-[11px] ${
                      on ? "bg-white text-slate" : "bg-slate/30 text-snow/80"
                    }`}
                  >
                    <span className="sm:hidden">{m[0]}</span>
                    <span className="hidden sm:inline">{m}</span>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="flex flex-col rounded-[28px] bg-white p-6 sm:p-10">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={season.key}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease }}
                className="flex h-full flex-col"
              >
                <h3 className="font-display text-3xl font-semibold tracking-[-0.04em] text-slate sm:text-4xl">
                  {season.name} <span className="text-stone">{season.span}</span>
                </h3>
                <p className="mt-4 text-[17px] leading-relaxed text-slate-2">{season.copy}</p>
                <p className="mt-8 text-[13px] font-medium text-stone">
                  {fits.length} treks in good condition
                </p>
                <ul className="mt-3 divide-y divide-frost border-y border-frost">
                  {fits.slice(0, 6).map((t) => (
                    <li key={t.slug}>
                      <button
                        type="button"
                        onClick={() => pickTrek(t.name)}
                        className="group flex w-full items-center justify-between gap-4 py-3 text-left"
                      >
                        <span className="min-w-0">
                          <span className="block truncate text-[16px] font-medium text-slate transition-colors group-hover:text-alpine">{t.name}</span>
                          <span className="block text-[13px] text-stone">
                            {t.nights} nights · {ft(t.altitudeFt)}
                          </span>
                        </span>
                        <span className="shrink-0 text-[15px] font-semibold tabular-nums text-slate">{inr(t.price)}</span>
                      </button>
                    </li>
                  ))}
                </ul>
                {fits.length > 6 && (
                  <a href="#treks" className="mt-5 text-[14px] font-medium text-slate underline decoration-frost decoration-2 underline-offset-[6px] hover:decoration-alpine">
                    See all {fits.length} in the index
                  </a>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
