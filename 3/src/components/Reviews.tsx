"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { reviews } from "@/data/content";
import { Arrow, ease, Label } from "./ui";

const INTERVAL = 7000;

export function Reviews() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const r = reviews[index];
  const go = (d: number) => setIndex((i) => (i + d + reviews.length) % reviews.length);

  useEffect(() => {
    if (paused || reduce) return;
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % reviews.length), INTERVAL);
    return () => window.clearTimeout(t);
  }, [index, paused, reduce]);

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      aria-roledescription="carousel"
      className="bg-snow px-5 py-24 sm:px-10 sm:py-36"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="flex items-center justify-between gap-6">
          <Label n="09" as="h2" id="reviews-title">
            From the trail
          </Label>
          <div className="flex items-center gap-3">
            <span className="text-[13px] tabular-nums text-stone">
              0{index + 1} / 0{reviews.length}
            </span>
            <button type="button" onClick={() => go(-1)} className="grid size-11 place-items-center rounded-full ring-1 ring-slate/15 transition hover:bg-slate hover:text-snow">
              <span className="sr-only">Previous review</span>
              <Arrow className="size-4 rotate-180" />
            </button>
            <button type="button" onClick={() => go(1)} className="grid size-11 place-items-center rounded-full ring-1 ring-slate/15 transition hover:bg-slate hover:text-snow">
              <span className="sr-only">Next review</span>
              <Arrow className="size-4" />
            </button>
          </div>
        </div>

        <div className="relative mt-14 min-h-[19rem] sm:min-h-[20rem] lg:min-h-[19rem]" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.figure
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.25 } }}
              transition={{ duration: 0.3 }}
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${reviews.length}`}
            >
              <blockquote className="max-w-[26ch] font-display text-[1.9rem] font-medium leading-[1.12] tracking-[-0.04em] text-slate sm:text-5xl xl:text-[4rem]">
                {r.quote.split(" ").map((w, i) => (
                  <span key={i} className="inline-block overflow-hidden align-bottom">
                    <motion.span
                      className="inline-block"
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 0.8, ease, delay: i * 0.018 }}
                    >
                      {i === 0 ? "“" : ""}
                      {w}
                      {i === r.quote.split(" ").length - 1 ? "”" : ""}
                    </motion.span>
                    &nbsp;
                  </span>
                ))}
              </blockquote>
              <figcaption className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-1 text-[15px]">
                <span className="font-semibold text-slate">{r.name}</span>
                <span className="text-stone">{r.city}</span>
                <span className="rounded-full bg-ice px-3 py-1 text-[13px] text-slate-2">{r.trek}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-12 grid grid-cols-4 gap-2" aria-hidden="true">
          {reviews.map((_, i) => (
            <span key={i} className="relative h-[2px] overflow-hidden bg-frost">
              {i === index && (
                <motion.span
                  key={`${index}-${paused}`}
                  className="absolute inset-0 origin-left bg-slate"
                  initial={{ scaleX: reduce ? 1 : 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: paused || reduce ? 0 : INTERVAL / 1000, ease: "linear" }}
                />
              )}
              {i < index && <span className="absolute inset-0 bg-slate/40" />}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
