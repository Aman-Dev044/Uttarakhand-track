"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { destinations } from "@/data/content";
import { SectionHeading, ease } from "./ui";

const regions = {
  Garhwal: {
    hindi: "गढ़वाल",
    copy: "The 'land of forts' in the west: source of the Ganga and Yamuna, home to the Char Dham, Rishikesh's ashrams and the great bugyals of Chamoli.",
  },
  Kumaon: {
    hindi: "कुमाऊँ",
    copy: "The gentler east: a lake district of Nainital and Bhimtal, apple orchards, the tiger forests of Corbett and sunrise views stretching 300 km across the Himalaya.",
  },
} as const;

type Region = keyof typeof regions;

// Bento layout on a 4-column grid: region card + one 2×2 feature fill the first two rows
// alongside two tiles; the remaining tiles stretch to fill the last row evenly.
function lgSpan(i: number, total: number) {
  if (i === 0) return "lg:col-span-2 lg:row-span-2";
  if (i <= 2) return "";
  const rest = total - 3;
  if (rest === 1) return "lg:col-span-4";
  if (rest === 2) return "lg:col-span-2";
  if (rest === 3 && i === total - 1) return "lg:col-span-2";
  return "";
}

export function Destinations() {
  const [region, setRegion] = useState<Region>("Garhwal");
  const places = destinations[region];

  return (
    <section id="destinations" aria-labelledby="destinations-title" className="grain relative bg-snow py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <SectionHeading
            id="destinations-title"
            eyebrow="Places to visit"
            title="Explore the"
            accent="unexplored."
            description="Two regions, one state. Uttarakhand divides into Garhwal and Kumaon, each with its own dialect, cuisine and way of welcoming you."
          />
          <div role="tablist" aria-label="Region" className="flex gap-2 rounded-full bg-parchment p-1.5">
            {(Object.keys(regions) as Region[]).map((r) => (
              <button
                key={r}
                type="button"
                role="tab"
                aria-selected={region === r}
                aria-controls="region-panel"
                onClick={() => setRegion(r)}
                className={`relative rounded-full px-6 py-3 font-semibold transition-colors ${region === r ? "text-snow" : "text-charcoal/70"}`}
              >
                {region === r && (
                  <motion.span layoutId="region-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ duration: 0.5, ease }} />
                )}
                <span className="relative">{r}</span>
              </button>
            ))}
          </div>
        </div>

        <div id="region-panel" role="tabpanel" className="mt-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={region}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="grid auto-rows-[15rem] gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[17rem]"
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease }}
                className="flex flex-col justify-between rounded-[2rem] bg-ink p-8 text-snow sm:row-span-2"
              >
                <p lang="hi" className="font-deva text-6xl text-saffron-2">
                  {regions[region].hindi}
                </p>
                <div>
                  <h3 className="font-display text-4xl">{region}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-snow/70">{regions[region].copy}</p>
                </div>
              </motion.div>

              {places.map((p, i) => (
                <motion.figure
                  key={p.name}
                  initial={{ y: 30, opacity: 0, clipPath: "inset(15% 0 0 0 round 2rem)" }}
                  animate={{ y: 0, opacity: 1, clipPath: "inset(0% 0 0 0 round 2rem)" }}
                  transition={{ duration: 0.8, ease, delay: 0.06 * (i + 1) }}
                  className={`group relative overflow-hidden rounded-[2rem] ${lgSpan(i, places.length)}`}
                >
                  <Image
                    src={p.image}
                    alt={`${p.name}, ${region}, Uttarakhand`}
                    fill
                    sizes={i === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                    className="object-cover transition duration-[1.2s] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                  <figcaption className="absolute inset-x-0 bottom-0 p-6 text-snow">
                    <h3 className={`font-display ${i === 0 ? "text-4xl" : "text-2xl"}`}>{p.name}</h3>
                    <p className="mt-1 max-h-0 overflow-hidden text-sm text-snow/80 opacity-0 transition-all duration-500 group-hover:max-h-10 group-hover:opacity-100 max-lg:max-h-10 max-lg:opacity-100">
                      {p.note}
                    </p>
                  </figcaption>
                </motion.figure>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
