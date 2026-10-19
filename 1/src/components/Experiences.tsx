"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { experiences } from "@/data/content";
import { SectionHeading, ease } from "./ui";

export function Experiences() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="experiences"
      aria-labelledby="experiences-title"
      className="topo relative overflow-hidden bg-pine py-24 text-snow sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="experiences-title"
            tone="dark"
            eyebrow="Things to do"
            title="Five ways to feel"
            accent="Devbhoomi"
            description="From the roar of Ganga rapids to the hush of a 4 a.m. aarti, Uttarakhand rewards every kind of traveller. Choose your rhythm."
          />
          <p className="max-w-xs text-sm text-snow/60 lg:text-right">
            Hover or tap a panel to open it. Each experience can be added to any of our treks or yatras.
          </p>
        </div>

        <ul className="mt-16 flex flex-col gap-3 lg:h-[34rem] lg:flex-row">
          {experiences.map((x, i) => {
            const open = active === i;
            return (
              <motion.li
                key={x.key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease, delay: i * 0.08 }}
                onMouseEnter={() => setActive(i)}
                className={`group relative h-[22rem] overflow-hidden rounded-[2rem] transition-[flex-grow] duration-700 ease-[cubic-bezier(.22,1,.36,1)] lg:h-auto lg:min-w-0 ${
                  open ? "lg:grow-[5]" : "lg:grow"
                } lg:basis-0`}
              >
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  aria-expanded={open}
                  className="absolute inset-0 z-10 text-left"
                >
                  <span className="sr-only">Show {x.title} experiences</span>
                </button>
                <Image
                  src={x.image}
                  alt={`${x.title} in Uttarakhand`}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className={`object-cover transition duration-1000 ${open ? "scale-100" : "scale-110"} group-hover:scale-105`}
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent transition-opacity duration-700 ${
                    open ? "opacity-90" : "opacity-70 lg:opacity-85"
                  }`}
                />

                {/* Collapsed label (desktop) */}
                <div
                  className={`absolute inset-x-0 bottom-8 hidden flex-col items-center gap-4 transition-opacity duration-500 lg:flex ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <span lang="hi" className="font-deva text-2xl text-saffron-2 [writing-mode:vertical-rl]">
                    {x.hindi}
                  </span>
                  <span className="text-xs uppercase tracking-[0.3em] text-snow/80 [writing-mode:vertical-rl] rotate-180">
                    {x.title}
                  </span>
                </div>

                <div
                  className={`absolute inset-x-0 bottom-0 p-7 transition-all duration-700 sm:p-9 ${
                    open ? "translate-y-0 opacity-100" : "lg:translate-y-6 lg:opacity-0"
                  }`}
                >
                  <p lang="hi" className="font-deva text-xl text-saffron-2">
                    {x.hindi}
                  </p>
                  <h3 className="mt-1 font-display text-4xl sm:text-5xl">{x.title}</h3>
                  <p className="mt-3 max-w-md text-snow/80 text-pretty">{x.copy}</p>
                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    {x.tags.map((t) => (
                      <span key={t} className="rounded-full border border-snow/25 px-3 py-1 text-xs text-snow/85">
                        {t}
                      </span>
                    ))}
                    <span className="ml-auto grid size-11 place-items-center rounded-full bg-saffron text-ink transition group-hover:rotate-45">
                      <ArrowUpRight className="size-5" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
