"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowRight, Moon, Mountain } from "lucide-react";
import { sacredTrails, treks, type Trek } from "@/data/content";
import { sendEnquire } from "@/lib/events";
import { SectionTitle, inr } from "./ui";

const items = sacredTrails.map((s) => ({ ...s, trek: treks.find((t) => t.slug === s.slug) as Trek }));

function TrailCard({
  item,
  index,
  total,
  progress,
}: {
  item: (typeof items)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const { trek } = item;
  // Earlier cards shrink and dim slightly as later ones stack over them
  const scale = useTransform(progress, [index / total, 1], [1, 1 - (total - index) * 0.035]);
  const dim = useTransform(progress, [index / total, (index + 1) / total], [0, 0.35]);

  return (
    <div className="sticky h-[34rem] sm:h-[30rem] lg:h-[28rem]" style={{ top: `calc(5.5rem + ${index * 1.1}rem)` }}>
      <motion.article
        style={{ scale }}
        className="relative grid h-full origin-top overflow-hidden rounded-[2rem] border border-brass-light/30 bg-maroon shadow-2xl shadow-night/50 lg:grid-cols-[.9fr_1.1fr]"
      >
        <div className="relative h-44 overflow-hidden sm:h-52 lg:h-full">
          <Image src={trek.image} alt={`${trek.name} trek, ${trek.region}`} fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,#6b1527,transparent_45%)] lg:bg-[linear-gradient(90deg,transparent_62%,#6b1527)]" />
        </div>
        <div className="relative flex flex-col p-6 sm:p-8 lg:p-10">
          <p className="font-inscription text-xs uppercase tracking-[0.3em] text-marigold">{item.legend}</p>
          <h3 className="mt-2 font-display text-3xl text-ivory sm:text-4xl">{trek.name}</h3>
          <p className="mt-3 line-clamp-5 leading-relaxed text-ivory/75 sm:line-clamp-none">{item.story}</p>
          <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-6 text-sm text-ivory/85">
            <span className="inline-flex items-center gap-1.5">
              <Moon className="size-4 text-brass-light" aria-hidden="true" />
              {trek.nights} nights
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Mountain className="size-4 text-brass-light" aria-hidden="true" />
              {trek.altitudeFt.toLocaleString("en-IN")} ft
            </span>
            <span className="rounded-full bg-ivory/10 px-3 py-1">{trek.grade}</span>
            <span className="ml-auto font-display text-2xl text-marigold">
              {inr(trek.price)}
              <span className="ml-1 font-sans text-xs text-ivory/60">/ person</span>
            </span>
          </div>
          <a
            href="#sankalp"
            onClick={() => sendEnquire(trek.name)}
            className="group mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-marigold px-5 py-2.5 text-sm font-semibold text-maroon-deep transition hover:bg-ivory"
          >
            Enquire about {trek.name.split(" ")[0]}
            <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </div>
        <motion.div style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-night" aria-hidden="true" />
      </motion.article>
    </div>
  );
}

export function SacredTrails() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section id="trails" aria-labelledby="trails-title" className="relative bg-night py-24 text-ivory sm:py-32">
      <div className="aipan absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-8">
        <SectionTitle
          id="trails-title"
          tone="dark"
          hindi="तीर्थ पथ"
          eyebrow="Pilgrimage treks"
          title={
            <>
              Six trails that end <em className="text-marigold">at something holy</em>
            </>
          }
          lede="Treks to the source of the Ganga, Shiva's lake, Hemkund Sahib and the highest Shiva temple in the world. Each one has a story the villages along the way still tell."
        />
        <div ref={ref} className="mt-16 space-y-8 pb-8">
          {items.map((item, i) => (
            <TrailCard key={item.slug} item={item} index={i} total={items.length} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}
