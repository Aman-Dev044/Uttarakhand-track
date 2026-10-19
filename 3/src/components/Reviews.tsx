"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { reviews } from "@/data/content";
import { SectionHeading, ease } from "./ui";

export function Reviews() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const n = reviews.length;

  useEffect(() => {
    if (paused || reduce) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % n), 6000);
    return () => window.clearInterval(id);
  }, [paused, reduce, n]);

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="relative py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.3fr] lg:items-center">
        <div>
          <SectionHeading code="09" eyebrow="Trail logs" id="reviews-title" title="Notes from the night before the summit." />
          <div className="mt-8 flex items-center gap-3">
            <button type="button" onClick={() => setI((v) => (v - 1 + n) % n)} aria-label="Previous review" className="grid size-12 place-items-center rounded-full border border-ice/15 transition hover:border-glacier hover:text-glacier">
              <ArrowLeft className="size-5" aria-hidden="true" />
            </button>
            <button type="button" onClick={() => setI((v) => (v + 1) % n)} aria-label="Next review" className="grid size-12 place-items-center rounded-full border border-ice/15 transition hover:border-glacier hover:text-glacier">
              <ArrowRight className="size-5" aria-hidden="true" />
            </button>
            <p className="ml-2 font-mono text-xs text-mist" aria-live="polite">
              {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </p>
          </div>
        </div>

        <div
          className="relative h-[22rem] sm:h-80"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          {/* stacked cards behind */}
          {[2, 1].map((d) => (
            <div
              key={d}
              aria-hidden="true"
              className="glass absolute inset-0 rounded-[1.75rem]"
              style={{ transform: `translateY(${d * 14}px) scale(${1 - d * 0.04})`, opacity: 0.5 / d }}
            />
          ))}
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 30, rotateX: -12 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: -30, rotateX: 12 }}
              transition={{ duration: 0.6, ease }}
              style={{ transformPerspective: 900 }}
              className="absolute inset-0 flex flex-col justify-between rounded-[1.75rem] border border-ice/15 bg-night-2 p-6 sm:p-8"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-glacier">
                Log {String(i + 1).padStart(2, "0")} · {reviews[i].trek}
              </p>
              <blockquote className="mt-4 font-display text-lg font-medium leading-snug text-ice text-pretty sm:text-2xl">
                “{reviews[i].quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 text-sm">
                <span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-teal to-violet font-mono text-xs font-semibold text-night">
                  {reviews[i].name.slice(0, 1)}
                </span>
                <span>
                  <span className="block font-semibold text-ice">{reviews[i].name}</span>
                  <span className="block text-mist">{reviews[i].city}</span>
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
