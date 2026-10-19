"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Plus } from "lucide-react";
import { charDham, yatraSteps } from "@/data/content";
import { site } from "@/data/site";
import { Reveal, SectionTitle, ease, toDevanagari } from "./ui";

export function CharDhamRoute() {
  const [open, setOpen] = useState(0);
  const current = charDham[open] ?? charDham[0];

  return (
    <section id="char-dham" aria-labelledby="char-dham-title" className="relative bg-sand py-24 sm:py-32">
      <div className="aipan-light absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
        <SectionTitle
          id="char-dham-title"
          hindi="चार धाम यात्रा"
          eyebrow="The Char Dham route"
          title={
            <>
              Four shrines, west to east, <em className="text-kumkum">the way pilgrims have always gone</em>
            </>
          }
          lede="The yatra traditionally begins at Yamunotri and ends at Badrinath. Open each dham to see its altitude, how to reach it, when its portals open and where the deity spends the winter."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
          {/* Sticky arched photo of the open shrine (desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-[2rem] border-[6px] border-ivory shadow-2xl shadow-maroon/20 ring-1 ring-brass/40">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={current.slug}
                    initial={{ clipPath: "circle(0% at 50% 100%)" }}
                    animate={{ clipPath: "circle(150% at 50% 100%)" }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease }}
                    className="absolute inset-0"
                  >
                    <Image src={current.image} alt={`${current.name} temple, ${current.district} district`} fill sizes="(min-width: 1024px) 40vw, 0px" className="object-cover" />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/85 via-night/30 to-transparent p-8 pt-24 text-ivory">
                  <p className="font-deva text-3xl text-marigold" lang="hi">
                    {current.hindi}
                  </p>
                  <p className="mt-1 font-display text-4xl">{current.name}</p>
                  <p className="text-ivory/75">
                    {current.deity} · {current.altitudeM.toLocaleString("en-IN")} m
                  </p>
                </div>
              </div>
            </div>
          </div>

          <ol className="relative">
            {charDham.map((d, i) => {
              const isOpen = open === i;
              const panelId = `dham-${d.slug}`;
              return (
                <li key={d.slug} className="relative pb-4 pl-20">
                  {i < charDham.length - 1 && (
                    <span className="absolute bottom-0 left-[27px] top-[4.5rem] w-px overflow-hidden bg-sandstone" aria-hidden="true">
                      <motion.span
                        className="absolute inset-0 origin-top bg-kumkum"
                        initial={false}
                        animate={{ scaleY: i < open ? 1 : 0 }}
                        transition={{ duration: 0.7, ease }}
                      />
                    </span>
                  )}
                  <span
                    className={`absolute left-0 top-2 grid size-14 place-items-center rounded-full border-2 font-deva text-2xl transition-colors duration-500 ${
                      i <= open ? "border-kumkum bg-kumkum text-ivory" : "border-sandstone bg-ivory text-brass"
                    }`}
                    aria-hidden="true"
                  >
                    {toDevanagari(i + 1)}
                  </span>
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(i)}
                      className="group flex w-full items-center justify-between gap-4 rounded-2xl py-4 text-left"
                    >
                      <span>
                        <span className="block font-display text-3xl font-semibold text-maroon-deep sm:text-4xl">{d.name}</span>
                        <span className="mt-1 block text-sm text-clay">
                          {d.deity} · {d.altitudeM.toLocaleString("en-IN")} m · {d.district}
                        </span>
                      </span>
                      <span
                        className={`grid size-10 shrink-0 place-items-center rounded-full ring-1 transition duration-500 ${
                          isOpen ? "rotate-45 bg-maroon text-ivory ring-maroon" : "text-maroon ring-sandstone group-hover:ring-maroon"
                        }`}
                      >
                        <Plus className="size-4" aria-hidden="true" />
                      </span>
                    </button>
                  </h3>
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-label={`${d.name} details`}
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.6, ease }}
                    className="overflow-hidden"
                    inert={!isOpen}
                  >
                    <div className="pb-6">
                      <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-t-[999px] rounded-b-2xl lg:hidden">
                        <Image src={d.image} alt={`${d.name} temple, ${d.district} district`} fill sizes="(max-width: 1023px) 90vw, 0px" className="object-cover" />
                      </div>
                      <p className="text-lg leading-relaxed text-umber/85">{d.note}</p>
                      <dl className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-sandstone bg-sandstone sm:grid-cols-2">
                        {[
                          ["River", d.river],
                          ["Stay before", d.base],
                          ["Portals open", d.opens],
                          ["Portals close", d.closes],
                          ["Winter seat", d.winterSeat],
                          ["How to reach", d.reach],
                        ].map(([k, v]) => (
                          <div key={k} className={`bg-ivory p-4 ${k === "How to reach" || k === "Winter seat" ? "sm:col-span-2" : ""}`}>
                            <dt className="font-inscription text-[11px] uppercase tracking-[0.2em] text-brass">{k}</dt>
                            <dd className="mt-1 text-umber">{v}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Before you go */}
        <div className="mt-24 rounded-[2rem] bg-maroon-deep p-6 text-ivory sm:p-12">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="font-inscription text-xs uppercase tracking-[0.3em] text-brass-light">Before you go</p>
              <h3 className="mt-3 font-display text-4xl sm:text-5xl">Four steps for a smooth yatra</h3>
            </div>
            <a
              href={site.officialTourism}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-brass-light underline-offset-4 hover:underline"
            >
              Official updates on Uttarakhand Tourism
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {yatraSteps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.08} className="relative rounded-2xl border border-brass-light/20 bg-ivory/[0.04] p-6">
                <span className="font-deva text-4xl text-marigold" aria-hidden="true">
                  {toDevanagari(i + 1)}
                </span>
                <p className="mt-3 font-display text-2xl">{s.title}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-ivory/70">{s.copy}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
