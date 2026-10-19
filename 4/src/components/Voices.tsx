"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { pillars, testimonials } from "@/data/content";
import { site } from "@/data/site";
import { Bell, Mandala, Reveal, SectionTitle, ease } from "./ui";

export function Voices() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const t = testimonials[index];

  useEffect(() => {
    if (paused || reduce) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % testimonials.length), 7000);
    return () => window.clearTimeout(id);
  }, [index, paused, reduce]);

  const go = (d: number) => setIndex((i) => (i + d + testimonials.length) % testimonials.length);

  return (
    <section id="why-us" aria-labelledby="why-title" className="aipan relative overflow-hidden bg-maroon py-24 text-ivory sm:py-32">
      <div className="pointer-events-none absolute -right-40 -top-40 size-[34rem] animate-mandala-reverse text-brass-light/10" aria-hidden="true">
        <Mandala className="size-full" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
        <SectionTitle
          id="why-title"
          tone="dark"
          align="left"
          hindi="अतिथि देवो भव"
          eyebrow={`Travelling with ${site.name}`}
          title={
            <>
              The guest is god. <em className="text-marigold">We plan like it.</em>
            </>
          }
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <ul className="grid gap-4 sm:grid-cols-2">
            {pillars.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.07} className="rounded-2xl border border-brass-light/20 bg-night/25 p-6">
                <span className="block h-px w-10 bg-marigold" aria-hidden="true" />
                <h3 className="mt-4 font-display text-2xl">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ivory/70">{p.copy}</p>
              </Reveal>
            ))}
          </ul>

          <div
            className="relative rounded-[2rem] bg-ivory p-8 text-umber shadow-2xl shadow-night/40 sm:p-12"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <Bell className="absolute -top-8 right-10 h-16 w-10 text-brass" />
            <p className="font-inscription text-xs uppercase tracking-[0.3em] text-brass">Yatri voices</p>
            <figure className="mt-6 min-h-[17rem] sm:min-h-[15rem]" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -16, filter: "blur(4px)" }}
                  transition={{ duration: 0.6, ease }}
                >
                  <blockquote className="font-display text-2xl italic leading-snug text-maroon-deep sm:text-3xl">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6">
                    <span className="block font-semibold text-maroon">{t.name}</span>
                    <span className="text-sm text-clay">
                      {t.place} · {t.trip}
                    </span>
                  </figcaption>
                </motion.div>
              </AnimatePresence>
            </figure>
            <div className="mt-6 flex items-center justify-between">
              <div className="flex gap-1.5" aria-hidden="true">
                {testimonials.map((x, i) => (
                  <span key={x.name} className={`h-1.5 rounded-full transition-all duration-500 ${i === index ? "w-8 bg-kumkum" : "w-3 bg-sandstone"}`} />
                ))}
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => go(-1)} aria-label="Previous review" className="grid size-11 place-items-center rounded-full ring-1 ring-sandstone transition hover:bg-maroon hover:text-ivory">
                  <ChevronLeft className="size-5" aria-hidden="true" />
                </button>
                <button type="button" onClick={() => go(1)} aria-label="Next review" className="grid size-11 place-items-center rounded-full ring-1 ring-sandstone transition hover:bg-maroon hover:text-ivory">
                  <ChevronRight className="size-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
