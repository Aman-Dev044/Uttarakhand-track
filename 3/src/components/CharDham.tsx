"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { dhams } from "@/data/content";
import { site } from "@/data/site";
import { ArrowUpRight, ease, FadeUp, Label, LineReveal } from "./ui";

const toFt = (m: number) => Math.round(m * 3.281).toLocaleString("en-IN");

export function CharDham() {
  return (
    <section id="char-dham" aria-labelledby="dham-title" className="bg-snow px-5 py-24 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <Label n="05">Char Dham Yatra</Label>
            <LineReveal
              id="dham-title"
              lines={["Four temples,", "west to east."]}
              className="mt-8 font-display text-[2.6rem] font-semibold leading-[0.95] tracking-[-0.05em] sm:text-7xl xl:text-[5.6rem]"
            />
          </div>
          <FadeUp>
            <p className="max-w-md text-[17px] leading-relaxed text-slate-2 lg:ml-auto">
              The pilgrimage is traditionally made clockwise, from the source of the Yamuna to the temple of Badrinath. We
              plan the roads, the walks and the rest days between them.
            </p>
          </FadeUp>
        </div>

        <div className="relative mt-16 lg:mt-24">
          {/* The route line draws itself across (desktop) or down (mobile) */}
          <motion.span
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "0px 0px -20% 0px" }}
            transition={{ duration: 1.8, ease }}
            className="absolute left-0 right-0 top-[7px] hidden h-px origin-left bg-slate lg:block"
          />
          <motion.span
            aria-hidden="true"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "0px 0px -20% 0px" }}
            transition={{ duration: 2.2, ease }}
            className="absolute bottom-0 left-[7px] top-0 w-px origin-top bg-frost lg:hidden"
          />
          <ol className="grid gap-14 lg:grid-cols-4 lg:gap-8">
            {dhams.map((d, i) => (
              <li key={d.name} className="relative pl-10 lg:pl-0 lg:pt-12">
                <motion.span
                  aria-hidden="true"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "0px 0px -20% 0px" }}
                  transition={{ duration: 0.6, ease, delay: 0.3 + i * 0.25 }}
                  className="absolute left-0 top-0 size-[15px] rounded-full border-[3px] border-snow bg-alpine shadow-[0_0_0_1px_var(--color-alpine)]"
                />
                <FadeUp delay={i * 0.1}>
                  <p className="text-[13px] tabular-nums text-stone">
                    0{i + 1} · {d.district}
                  </p>
                  <h3 className="mt-2 font-display text-4xl font-semibold tracking-[-0.045em] text-slate">{d.name}</h3>
                  <p className="mt-1 text-[15px] text-glacier-deep">{d.deity}</p>
                </FadeUp>
                <motion.div
                  initial={{ clipPath: "inset(100% 0 0 0 round 20px)" }}
                  whileInView={{ clipPath: "inset(0% 0 0 0 round 20px)" }}
                  viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                  transition={{ duration: 1.2, ease, delay: 0.1 + i * 0.12 }}
                  className="relative mt-6 aspect-[4/5] overflow-hidden rounded-[20px] bg-ice"
                >
                  <Image src={d.image} alt={`${d.name} temple, ${d.district} district`} fill sizes="(min-width: 1024px) 24vw, 90vw" className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-glide)] hover:scale-105" />
                </motion.div>
                <dl className="mt-5 space-y-2 text-[14px]">
                  <div className="flex justify-between gap-4 border-b border-frost pb-2">
                    <dt className="text-stone">Altitude</dt>
                    <dd className="font-medium tabular-nums text-slate">
                      {d.altitudeM.toLocaleString("en-IN")} m · {toFt(d.altitudeM)} ft
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-frost pb-2">
                    <dt className="text-stone">Access</dt>
                    <dd className="text-right font-medium text-slate">{d.access}</dd>
                  </div>
                </dl>
                <p className="mt-4 text-[15px] leading-relaxed text-slate-2">{d.copy}</p>
              </li>
            ))}
          </ol>
        </div>

        <FadeUp className="mt-20 grid gap-6 rounded-[28px] bg-ice p-6 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <p className="max-w-3xl text-[16px] leading-relaxed text-slate-2">
            <strong className="font-semibold text-slate">Good to know:</strong> the temples usually open in late April or May
            and close in October or November; the temple committees announce exact dates each year. Every pilgrim must register
            with the state government before travelling. Avoid July and August, when landslides are most frequent.
          </p>
          <a
            href={site.officialTourism}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-[14px] font-medium text-slate ring-1 ring-slate/10 transition hover:ring-slate/30"
          >
            Official Uttarakhand Tourism site
            <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </FadeUp>
      </div>
    </section>
  );
}
