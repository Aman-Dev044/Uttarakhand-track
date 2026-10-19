"use client";

import { useRef, useSyncExternalStore } from "react";
import { motion } from "motion/react";
import { faqs, notes } from "@/data/content";
import { ChapterHead, Scribble } from "./ui";

const spots = [
  { x: "2%", y: "6%", r: -5 },
  { x: "36%", y: "0%", r: 3 },
  { x: "70%", y: "8%", r: -2 },
  { x: "14%", y: "52%", r: 4 },
  { x: "52%", y: "48%", r: -4 },
];
const paper = ["bg-card", "bg-[#f6e7a8]", "bg-card", "bg-[#d8e6cf]", "bg-[#f3d3c4]"];

const desktopQuery = "(min-width: 1024px)";
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(desktopQuery);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

export function Notes() {
  const board = useRef<HTMLUListElement>(null);
  const desktop = useSyncExternalStore(subscribe, () => window.matchMedia(desktopQuery).matches, () => false);

  return (
    <section id="notes" aria-labelledby="notes-title" className="paper relative overflow-hidden bg-card py-24 sm:py-32">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <ChapterHead
            n="09"
            id="notes-title"
            title={
              <>
                Notes left <em className="italic text-forest">on the board</em>
              </>
            }
            lede="Trekkers pin a note on our office wall in Dehradun before they head home. A few of them are here."
          />
          <p className="hidden shrink-0 -rotate-3 text-forest lg:block">
            <Scribble text="psst, you can drag them" className="text-2xl" />
          </p>
        </div>

        <ul ref={board} className="relative mt-14 grid gap-6 sm:grid-cols-2 lg:block lg:h-[36rem]">
          {notes.map((n, i) => {
            const s = spots[i % spots.length];
            return (
              <motion.li
                key={n.name}
                drag={desktop}
                dragConstraints={board}
                dragElastic={0.15}
                whileDrag={{ scale: 1.06, rotate: 0, zIndex: 20, cursor: "grabbing" }}
                initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                whileInView={{ opacity: 1, scale: 1, rotate: s.r }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ type: "spring", stiffness: 140, damping: 15, delay: i * 0.07 }}
                style={{ "--x": s.x, "--y": s.y } as React.CSSProperties}
                className={`relative p-6 pt-8 shadow-[0_20px_36px_-20px_rgb(28_26_22/0.55)] ring-1 ring-ink/5 lg:absolute lg:left-[var(--x)] lg:top-[var(--y)] lg:w-[28%] lg:cursor-grab ${paper[i]}`}
              >
                <span className="tape absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 rotate-3" aria-hidden="true" />
                <blockquote className="font-hand text-2xl leading-snug text-ink">&ldquo;{n.text}&rdquo;</blockquote>
                <p className="mt-4 text-sm text-graphite">
                  <span className="font-semibold text-ink">{n.name}</span>, {n.from} · {n.trek}
                </p>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="paper relative py-24 sm:py-32">
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <ChapterHead
          n="10"
          id="faq-title"
          title={
            <>
              Questions people ask <em className="italic text-forest">before they book</em>
            </>
          }
          lede="Still unsure? Write to us at the end of the journal and a trek expert will call you back."
          className="lg:sticky lg:top-28 lg:self-start"
        />
        <div className="ruled rounded-sm bg-card py-4 pl-16 pr-5 shadow-[0_30px_60px_-36px_rgb(28_26_22/0.5)] sm:pr-8">
          {faqs.map((f, i) => (
            <details key={f.q} name="faq" className="faq group border-b border-dashed border-ink/15 last:border-0" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-4 [&::-webkit-details-marker]:hidden">
                <h3 className="font-display text-2xl leading-8">{f.q}</h3>
                <span
                  className="mt-1 grid size-7 shrink-0 place-items-center rounded-full border border-ink/20 font-hand text-xl leading-none transition group-open:rotate-45 group-open:border-vermilion group-open:text-vermilion"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="pb-5 text-[15px] leading-8 text-ink/80">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
