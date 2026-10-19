"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { packingList, prepTips } from "@/data/content";
import { Diya, Reveal, SectionTitle, toDevanagari } from "./ui";

export function YatraPrep() {
  const [packed, setPacked] = useState<Set<number>>(() => new Set());
  const toggle = (i: number) =>
    setPacked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  const all = packed.size === packingList.length;

  return (
    <section id="prepare" aria-labelledby="prepare-title" className="relative bg-sand py-24 sm:py-32">
      <div className="aipan-light absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
        <SectionTitle
          id="prepare-title"
          hindi="यात्रा की तैयारी"
          eyebrow="Prepare for the yatra"
          title={
            <>
              Pack light, <em className="text-kumkum">climb slow</em>
            </>
          }
          lede="Mountain weather turns quickly, even in May. Tick off your bag below and light a diya for each thing packed."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <div className="rounded-[2rem] border border-sandstone bg-ivory p-6 shadow-xl shadow-maroon/10 sm:p-8">
              <div className="flex items-end justify-between gap-4">
                <h3 className="font-display text-3xl font-semibold text-maroon-deep">Your yatra bag</h3>
                <p className="text-sm text-clay" aria-live="polite">
                  {packed.size} of {packingList.length} packed
                </p>
              </div>
              <div className="mt-4 grid max-w-sm grid-cols-10 gap-1" aria-hidden="true">
                {packingList.map((item, i) => (
                  <Diya key={item} lit={packed.has(i)} className={`aspect-square w-full transition-opacity duration-500 ${packed.has(i) ? "" : "opacity-40"}`} />
                ))}
              </div>
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {packingList.map((item, i) => {
                  const on = packed.has(i);
                  return (
                    <li key={item}>
                      <button
                        type="button"
                        role="checkbox"
                        aria-checked={on}
                        onClick={() => toggle(i)}
                        className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left text-[15px] transition-colors ${
                          on ? "border-marigold bg-marigold/15 text-maroon-deep" : "border-sandstone text-umber hover:border-brass"
                        }`}
                      >
                        <span className={`grid size-5 shrink-0 place-items-center rounded-md border transition ${on ? "border-saffron bg-saffron" : "border-sandstone"}`}>
                          <motion.svg viewBox="0 0 12 12" className="size-3 text-ivory" aria-hidden="true">
                            <motion.path
                              d="M2 6.5l2.5 2.5L10 3.5"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              initial={false}
                              animate={{ pathLength: on ? 1 : 0 }}
                              transition={{ duration: 0.3 }}
                            />
                          </motion.svg>
                        </span>
                        {item}
                      </button>
                    </li>
                  );
                })}
              </ul>
              <motion.p
                initial={false}
                animate={{ opacity: all ? 1 : 0, height: all ? "auto" : 0 }}
                className="overflow-hidden text-center font-deva text-xl text-kumkum"
                lang="hi"
              >
                <span className="block pt-5">शुभ यात्रा · Have a blessed journey</span>
              </motion.p>
            </div>
          </Reveal>

          <ol className="space-y-6">
            {prepTips.map((t, i) => (
              <Reveal as="li" key={t.title} delay={i * 0.06} className="flex gap-5">
                <span className="grid size-14 shrink-0 place-items-center rounded-full border border-brass/50 bg-ivory font-deva text-2xl text-kumkum" aria-hidden="true">
                  {toDevanagari(i + 1)}
                </span>
                <div className="pt-1">
                  <h3 className="font-display text-2xl font-semibold text-maroon-deep">{t.title}</h3>
                  <p className="mt-1 leading-relaxed text-clay">{t.copy}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
