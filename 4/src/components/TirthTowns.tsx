"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { tirthTowns } from "@/data/content";
import { Mandala, Reveal, SectionTitle } from "./ui";

type Town = (typeof tirthTowns)[number];

const hindiNames: Record<string, string> = {
  Haridwar: "हरिद्वार",
  Rishikesh: "ऋषिकेश",
  Jageshwar: "जागेश्वर",
  Baijnath: "बैजनाथ",
  "Joshimath & Auli": "जोशीमठ",
};

function TownCard({ town, tall }: { town: Town; tall?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const spin = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <Reveal>
      <article ref={ref} className="group">
        <div
          className={`relative overflow-hidden rounded-t-full rounded-b-[1.75rem] border-[5px] border-ivory shadow-xl shadow-maroon/15 ring-1 ring-brass/40 ${
            tall ? "aspect-[3/4.4]" : "aspect-[4/4.4]"
          }`}
        >
          {town.image ? (
            <motion.div style={{ y }} className="absolute -inset-y-[14%] inset-x-0">
              <Image
                src={town.image}
                alt={`${town.name}, ${town.region}`}
                fill
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                className="object-cover transition-transform duration-[1.4s] group-hover:scale-105"
              />
            </motion.div>
          ) : (
            // No photo: an Aipan panel with the town's name in Devanagari
            <div className="aipan absolute inset-0 grid place-items-center bg-kumkum">
              <motion.div style={{ rotate: spin }} className="absolute inset-[-10%] text-ivory/20">
                <Mandala className="size-full" />
              </motion.div>
              <span className="relative font-deva text-5xl text-ivory" lang="hi" aria-hidden="true">
                {hindiNames[town.name]}
              </span>
            </div>
          )}
        </div>
        <div className="mt-5 px-1">
          <p className="font-inscription text-[11px] uppercase tracking-[0.25em] text-brass">{town.region}</p>
          <h3 className="mt-1 font-display text-3xl font-semibold text-maroon-deep">{town.name}</h3>
          <p className="mt-2 leading-relaxed text-clay">{town.copy}</p>
        </div>
      </article>
    </Reveal>
  );
}

export function TirthTowns() {
  const [haridwar, rishikesh, jageshwar, baijnath, mana] = tirthTowns;
  return (
    <section id="tirth" aria-labelledby="tirth-title" className="paper relative bg-ivory py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <SectionTitle
          id="tirth-title"
          hindi="तीर्थ नगरी"
          eyebrow="Temple towns"
          title={
            <>
              Where the yatra begins, <em className="text-kumkum">and where it lingers</em>
            </>
          }
          lede="From the aarti on the ghats of Haridwar to the stone temples of Kumaon, these are the places to slow down before or after the high shrines."
        />
        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          <div className="lg:pt-24">
            <TownCard town={haridwar} tall />
          </div>
          <div className="space-y-12">
            <TownCard town={jageshwar} />
            <TownCard town={rishikesh} />
          </div>
          <div className="space-y-12 sm:col-span-2 sm:grid sm:grid-cols-2 sm:gap-10 sm:space-y-0 lg:col-span-1 lg:block lg:space-y-12 lg:pt-12">
            <TownCard town={mana} />
            <TownCard town={baijnath} />
          </div>
        </div>
      </div>
    </section>
  );
}
