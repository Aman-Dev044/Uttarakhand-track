"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Rise, Scribble, ease } from "./ui";

export const chapters = [
  { id: "map", title: "The sketch map", image: "/images/hero-2.jpg", note: "where everything is" },
  { id: "trek-log", title: "The trek log", image: "/images/roopkund.jpg", note: "15 trails, honestly graded" },
  { id: "diary", title: "Five days on Kedarkantha", image: "/images/kedarkantha.jpg", note: "a day-by-day diary" },
  { id: "seasons", title: "A field guide to the seasons", image: "/images/valley-of-flowers.jpg", note: "snow, blooms, clear skies" },
  { id: "regions", title: "Garhwal & Kumaon", image: "/images/nainital.jpg", note: "two halves of one state" },
  { id: "sacred", title: "Char Dham & Panch Kedar", image: "/images/badrinath.jpg", note: "for the pilgrim in you" },
  { id: "packing", title: "The packing list", image: "/images/camp.jpg", note: "tick as you pack" },
  { id: "safety", title: "Field rules", image: "/images/kuari-pass.jpg", note: "altitude, water, trash" },
  { id: "notes", title: "Notes from the trail", image: "/images/har-ki-dun.jpg", note: "from fellow trekkers" },
  { id: "faq", title: "Questions people ask", image: "/images/chandrashila.jpg", note: "before they book" },
  { id: "contact", title: "Write to us", image: "/images/rishikesh.jpg", note: "we reply the same day" },
] as const;

export function Contents() {
  const [hover, setHover] = useState(0);
  const active = chapters[hover];

  return (
    <section aria-labelledby="contents-title" className="paper relative bg-card py-24 sm:py-32">
      <div className="ruled absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Scribble text="Before you begin" className="text-2xl text-vermilion" />
          <Rise>
            <h2 id="contents-title" className="mt-1 font-display text-5xl leading-[0.95] tracking-tight sm:text-6xl">
              What&apos;s inside this journal
            </h2>
          </Rise>
          <Rise delay={0.1}>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-graphite">
              We wrote this guide the way we brief trekkers in our office: a map, a list of trails, the seasons, and the
              small things nobody tells you until you&apos;re at 11,000 ft. Skip to any chapter.
            </p>
          </Rise>
          <div className="relative mt-10 hidden aspect-[4/3] max-w-md overflow-hidden rounded-sm bg-paper-2 shadow-xl lg:block">
            <AnimatePresence initial={false}>
              <motion.div
                key={active.id}
                initial={{ clipPath: "inset(0 0 100% 0)" }}
                animate={{ clipPath: "inset(0 0 0% 0)" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease }}
                className="absolute inset-0"
              >
                <Image src={active.image} alt="" fill sizes="450px" className="object-cover" />
              </motion.div>
            </AnimatePresence>
            <span className="absolute bottom-3 left-3 z-10 rounded-sm bg-card/90 px-3 py-1 font-hand text-xl text-ink">{active.note}</span>
          </div>
        </div>

        <ol className="relative">
          {chapters.map((c, i) => (
            <Rise as="li" key={c.id} delay={i * 0.03}>
              <a
                href={`#${c.id}`}
                onPointerEnter={() => setHover(i)}
                onFocus={() => setHover(i)}
                className="group flex items-baseline gap-4 border-b border-ink/10 py-4 sm:py-5"
              >
                <span className="w-10 shrink-0 font-hand text-2xl text-vermilion">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-3xl leading-tight transition duration-300 group-hover:translate-x-2 group-hover:italic sm:text-4xl">
                  {c.title}
                </span>
                <span className="mb-2 hidden flex-1 border-b border-dotted border-ink/30 sm:block" aria-hidden="true" />
                <span className="ml-auto hidden font-hand text-xl text-graphite sm:block">{c.note}</span>
              </a>
            </Rise>
          ))}
        </ol>
      </div>
    </section>
  );
}

const tickerWords = ["Kedarkantha", "Roopkund", "Valley of Flowers", "Har Ki Dun", "Kuari Pass", "Brahmatal", "Dayara Bugyal", "Tungnath", "Gaumukh", "Kedartal"];

/** A strip of kraft tape with trail names scrolling past */
export function Ticker() {
  const row = [...tickerWords, ...tickerWords];
  return (
    <div aria-hidden="true" className="relative z-10 -my-6 overflow-hidden py-4">
      <div className="-mx-4 -rotate-[1.5deg] bg-kraft py-3 shadow-md">
        <div className="flex w-max animate-ticker gap-10 whitespace-nowrap font-hand text-3xl text-ink/80">
          {row.map((w, i) => (
            <span key={i} className="flex items-center gap-10">
              {w}
              <span className="text-vermilion">✕</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
