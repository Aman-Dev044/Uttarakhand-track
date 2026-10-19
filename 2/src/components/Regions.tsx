"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";
import { regions, type RegionKey } from "@/data/content";
import { ChapterHead, ease } from "./ui";

const keys = Object.keys(regions) as RegionKey[];
const turns = [-3, 2, -1.5, 2.5, -2, 1.5];

export function Regions() {
  const [tab, setTab] = useState<RegionKey>("Garhwal");
  const region = regions[tab];

  return (
    <section id="regions" aria-labelledby="regions-title" className="paper contours relative overflow-hidden py-24 sm:py-32">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <ChapterHead
          n="05"
          id="regions-title"
          title={
            <>
              Garhwal &amp; Kumaon: <em className="italic text-forest">two halves</em> of one state
            </>
          }
          lede="Uttarakhand splits into two old kingdoms with their own dialects, food and festivals. Turn the page to compare them."
        />

        <div role="tablist" aria-label="Region" className="mt-12 flex gap-2">
          {keys.map((k) => (
            <button
              key={k}
              id={`tab-${k}`}
              role="tab"
              type="button"
              aria-selected={tab === k}
              aria-controls="region-panel"
              onClick={() => setTab(k)}
              className={`relative rounded-t-md px-6 pb-3 pt-2.5 font-display text-2xl transition ${
                tab === k ? "bg-card text-ink shadow-[0_-6px_16px_-10px_rgb(28_26_22/0.4)]" : "bg-ink/5 text-graphite hover:text-ink"
              }`}
            >
              {k}
              {tab === k && <motion.span layoutId="region-ribbon" className="absolute -top-2 right-4 h-5 w-3 bg-vermilion [clip-path:polygon(0_0,100%_0,100%_100%,50%_75%,0_100%)]" />}
            </button>
          ))}
        </div>

        <div
          id="region-panel"
          role="tabpanel"
          aria-labelledby={`tab-${tab}`}
          className="relative grid rounded-b-md rounded-tr-md bg-card shadow-[0_40px_80px_-40px_rgb(28_26_22/0.5)] lg:grid-cols-2"
          style={{ perspective: 1800 }}
        >
          {/* Spine */}
          <span className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-10 -translate-x-1/2 bg-gradient-to-r from-transparent via-ink/10 to-transparent lg:block" aria-hidden="true" />

          <AnimatePresence mode="wait">
            <motion.div
              key={`${tab}-left`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="ruled relative p-6 pl-16 sm:p-10 sm:pl-20"
            >
              <p className="font-hand text-2xl leading-8 text-vermilion">{tab === "Garhwal" ? "West · गढ़वाल" : "East · कुमाऊँ"}</p>
              <h3 className="font-display text-6xl leading-[4rem] sm:text-7xl">{tab}</h3>
              <p className="mt-4 text-lg leading-8 text-ink/80">{region.blurb}</p>
              <ul className="mt-6 space-y-0">
                {region.facts.map((f, i) => (
                  <motion.li
                    key={f}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.08, ease }}
                    className="flex items-center gap-3 leading-8"
                  >
                    <Check className="size-5 text-forest" aria-hidden="true" />
                    <span className="font-hand text-2xl">{f}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${tab}-right`}
              initial={{ rotateY: 80, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -80, opacity: 0 }}
              transition={{ duration: 0.55, ease }}
              style={{ transformOrigin: "left center" }}
              className="relative p-6 sm:p-10"
            >
              <ul className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
                {region.places.map((p, i) => (
                  <li key={p.name}>
                    <figure
                      className="bg-card p-2 pb-3 shadow-[0_14px_28px_-16px_rgb(28_26_22/0.5)] ring-1 ring-ink/5 transition duration-300 hover:rotate-0 hover:scale-105"
                      style={{ rotate: `${turns[i % turns.length]}deg` }}
                    >
                      <div className="relative aspect-square overflow-hidden bg-paper-2">
                        <Image src={p.image} alt={`${p.name}, ${tab}, Uttarakhand`} fill sizes="(min-width: 1280px) 180px, (min-width: 640px) 30vw, 45vw" className="object-cover" />
                      </div>
                      <figcaption className="mt-2 px-1">
                        <span className="block font-display text-xl leading-none">{p.name}</span>
                        <span className="block font-hand text-lg leading-tight text-graphite">{p.note}</span>
                      </figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
