"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Printer, RotateCcw } from "lucide-react";
import { fieldRules, packing, promises } from "@/data/content";
import { site } from "@/data/site";
import { ChapterHead, Rise, Scribble, ease } from "./ui";

const total = packing.reduce((n, g) => n + g.items.length, 0);

export function Packing() {
  const [checked, setChecked] = useState<Set<string>>(() => new Set());
  const done = checked.size;

  function toggle(item: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(item)) next.delete(item);
      else next.add(item);
      return next;
    });
  }

  return (
    <section id="packing" aria-labelledby="packing-title" className="paper relative py-24 sm:py-32">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <ChapterHead
            n="07"
            id="packing-title"
            title={
              <>
                The packing list, <em className="italic text-forest">tick as you go</em>
              </>
            }
            lede="The same list we email after every booking, for a winter or shoulder-season trek up to about 13,000 ft. High passes need a few extras, and your trek leader will tell you which."
          />
          <div className="shrink-0 lg:w-72">
            <p className="font-hand text-3xl text-forest" aria-live="polite">
              {done === total ? "All packed. See you in Dehradun!" : `${done} of ${total} packed`}
            </p>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-ink/10" aria-hidden="true">
              <motion.div className="h-full origin-left bg-forest" animate={{ scaleX: done / total }} transition={{ duration: 0.5, ease }} />
            </div>
            <div className="mt-4 flex gap-4 text-sm font-semibold">
              <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-1.5 text-ink hover:text-vermilion">
                <Printer className="size-4" aria-hidden="true" />
                Print
              </button>
              <button type="button" onClick={() => setChecked(new Set())} className="inline-flex items-center gap-1.5 text-ink hover:text-vermilion">
                <RotateCcw className="size-4" aria-hidden="true" />
                Reset
              </button>
            </div>
          </div>
        </div>

        <div className="ruled relative mt-12 grid gap-x-10 gap-y-8 rounded-sm bg-card py-8 pl-16 pr-6 shadow-[0_30px_60px_-36px_rgb(28_26_22/0.5)] sm:grid-cols-2 lg:grid-cols-4">
          {packing.map((g) => (
            <fieldset key={g.group}>
              <legend className="font-hand text-2xl leading-8 text-vermilion">{g.group}</legend>
              <ul>
                {g.items.map((item) => {
                  const on = checked.has(item);
                  return (
                    <li key={item}>
                      <label className="flex cursor-pointer items-start gap-3 leading-8">
                        <input type="checkbox" checked={on} onChange={() => toggle(item)} className="peer sr-only" />
                        <span
                          className="relative mt-1.5 grid size-5 shrink-0 place-items-center rounded-[3px] border-2 border-ink/40 transition peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-dashed peer-focus-visible:outline-vermilion"
                          aria-hidden="true"
                        >
                          <svg viewBox="0 0 24 24" className="absolute -left-0.5 -top-2 size-7 overflow-visible">
                            <motion.path
                              d="M3 13c3 2 5 5 6 7 3-7 8-13 13-17"
                              fill="none"
                              stroke="var(--color-forest)"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              initial={false}
                              animate={{ pathLength: on ? 1 : 0, opacity: on ? 1 : 0 }}
                              transition={{ duration: 0.35, ease }}
                            />
                          </svg>
                        </span>
                        <span className={`text-[15px] transition ${on ? "text-graphite line-through decoration-forest/60" : "text-ink"}`}>{item}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </fieldset>
          ))}
        </div>
      </div>
    </section>
  );
}

const noteColors = ["bg-[#f6e7a8]", "bg-[#f3d3c4]", "bg-[#d8e6cf]", "bg-[#d6e1ec]"];
const noteTilt = [-3, 2, -1.5, 3];

export function FieldRules() {
  return (
    <section id="safety" aria-labelledby="safety-title" className="paper graph relative bg-paper-2/50 py-24 sm:py-32">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <ChapterHead
          n="08"
          id="safety-title"
          title={
            <>
              Field rules for <em className="italic text-forest">thin air</em>
            </>
          }
          lede="Altitude is the one thing on a Himalayan trek you can't train away. These four habits matter more than your boots."
        />

        <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {fieldRules.map((r, i) => (
            <motion.li
              key={r.title}
              initial={{ opacity: 0, y: -40, rotate: noteTilt[i] * 3 }}
              whileInView={{ opacity: 1, y: 0, rotate: noteTilt[i] }}
              whileHover={{ rotate: 0, scale: 1.03 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ type: "spring", stiffness: 120, damping: 14, delay: i * 0.08 }}
              className={`relative min-h-60 p-6 shadow-[0_18px_30px_-18px_rgb(28_26_22/0.5)] ${noteColors[i]}`}
            >
              <span className="absolute -top-2 left-1/2 size-4 -translate-x-1/2 rounded-full bg-vermilion shadow" aria-hidden="true" />
              <span className="font-hand text-5xl leading-none text-ink/30">{i + 1}</span>
              <h3 className="mt-2 font-display text-3xl leading-tight">{r.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink/80">{r.copy}</p>
            </motion.li>
          ))}
        </ul>

        <div className="mt-20 grid gap-10 border-t border-dashed border-ink/20 pt-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Scribble text="What we promise" className="text-2xl text-vermilion" />
            <h3 className="mt-1 font-display text-4xl leading-tight">Signed by the {site.address.locality} team</h3>
            <svg viewBox="0 0 260 70" className="mt-4 h-14 w-56 text-ink" aria-hidden="true">
              <motion.path
                d="M6 48c14-26 28-36 34-30s-12 34-4 34 26-38 34-36-6 28 2 28 16-18 24-20 4 16 12 16 20-24 34-24-8 22 4 22 40-14 62-26M30 60c60-6 140-8 220-10"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </svg>
          </div>
          <ul className="grid gap-6 sm:grid-cols-2">
            {promises.map((p, i) => (
              <Rise as="li" key={p.title} delay={i * 0.06} className="border-l-2 border-forest pl-5">
                <h4 className="font-display text-2xl">{p.title}</h4>
                <p className="mt-1 text-[15px] text-ink/75">{p.copy}</p>
              </Rise>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
