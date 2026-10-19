"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { destinations } from "@/data/content";
import { SectionHeading, ease } from "./ui";

type Region = keyof typeof destinations;
const regions = Object.keys(destinations) as Region[];
const blurbs: Record<Region, string> = {
  Garhwal: "The western half: the Ganga's ghats, hill stations above Dehradun, and the high meadows on the way to the Char Dham.",
  Kumaon: "The eastern half: lake towns, orchards, Corbett's forests and some of the longest Himalayan skylines in India.",
};

export function Destinations() {
  const [region, setRegion] = useState<Region>("Garhwal");
  const [active, setActive] = useState(0);
  const list = destinations[region];
  const current = list[Math.min(active, list.length - 1)];

  return (
    <section id="destinations" aria-labelledby="dest-title" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            code="07"
            eyebrow="Destinations"
            id="dest-title"
            title="Two regions, one state of mind."
            intro="Uttarakhand splits into Garhwal and Kumaon. Pick a side, then hover or tap a place to see it."
          />
          <div role="tablist" aria-label="Region" className="glass flex shrink-0 gap-1 self-start rounded-full p-1 lg:self-auto">
            {regions.map((r) => (
              <button
                key={r}
                role="tab"
                id={`tab-${r}`}
                aria-selected={region === r}
                aria-controls="dest-panel"
                type="button"
                onClick={() => {
                  setRegion(r);
                  setActive(0);
                }}
                className={`relative rounded-full px-5 py-2 text-sm transition ${region === r ? "text-night" : "text-ice/70 hover:text-ice"}`}
              >
                {region === r && <motion.span layoutId="region-pill" className="absolute inset-0 rounded-full bg-glacier" transition={{ duration: 0.4, ease }} />}
                <span className="relative">{r}</span>
              </button>
            ))}
          </div>
        </div>

        <div id="dest-panel" role="tabpanel" aria-labelledby={`tab-${region}`} className="mt-12 grid gap-10 lg:grid-cols-[1fr_28rem]">
          <div>
            <p className="max-w-lg text-sm text-mist">{blurbs[region]}</p>
            <ul className="mt-6 border-t border-ice/10">
              {list.map((d, i) => {
                const on = i === active;
                return (
                  <li key={`${region}-${d.name}`} className="border-b border-ice/10">
                    <button
                      type="button"
                      onPointerEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onClick={() => setActive(i)}
                      aria-pressed={on}
                      className="group flex w-full items-center gap-4 py-5 text-left"
                    >
                      <span className="w-8 font-mono text-[11px] text-mist">{String(i + 1).padStart(2, "0")}</span>
                      <span className="flex-1">
                        <span className={`block font-display text-2xl font-semibold transition sm:text-4xl ${on ? "translate-x-2 text-ice" : "text-ice/45 group-hover:text-ice/80"}`}>
                          {d.name}
                        </span>
                        <span className={`mt-1 block text-sm transition ${on ? "text-glacier" : "text-mist"}`}>{d.note}</span>
                      </span>
                      <span className="hidden font-mono text-[11px] tracking-[0.1em] text-mist sm:block">{d.coords}</span>
                      <ArrowUpRight className={`size-5 shrink-0 transition ${on ? "rotate-45 text-volt" : "text-ice/30"}`} aria-hidden="true" />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="order-first lg:order-none lg:sticky lg:top-28 lg:self-start">
            <div className="relative aspect-[16/11] overflow-hidden rounded-[1.75rem] border border-ice/10 lg:aspect-[4/5]">
              <AnimatePresence initial={false}>
                <motion.div
                  key={current.image + current.name}
                  initial={{ opacity: 0, scale: 1.08, filter: "blur(8px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease }}
                  className="absolute inset-0"
                >
                  <Image src={current.image} alt={`${current.name}, ${region}, Uttarakhand`} fill sizes="(min-width: 1024px) 28rem, 100vw" className="object-cover" />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-transparent to-night/30" />
              {/* HUD crosshair */}
              <div aria-hidden="true" className="pointer-events-none absolute inset-6">
                {["left-0 top-0 border-l border-t", "right-0 top-0 border-r border-t", "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r"].map((c) => (
                  <span key={c} className={`absolute size-5 border-glacier/70 ${c}`} />
                ))}
                <span className="absolute left-1/2 top-1/2 h-8 w-px -translate-x-1/2 -translate-y-1/2 bg-glacier/50" />
                <span className="absolute left-1/2 top-1/2 h-px w-8 -translate-x-1/2 -translate-y-1/2 bg-glacier/50" />
              </div>
              <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4">
                <p className="font-display text-2xl font-semibold">{current.name}</p>
                <p className="font-mono text-[11px] tracking-[0.1em] text-glacier">{current.coords}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
