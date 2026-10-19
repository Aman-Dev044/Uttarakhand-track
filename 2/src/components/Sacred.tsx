"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, RotateCw } from "lucide-react";
import { dhams, panchKedar, yatraSteps } from "@/data/content";
import { site } from "@/data/site";
import { ChapterHead, Rise, Scribble, ease } from "./ui";

export function Sacred() {
  const trailRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: trailRef, offset: ["start 75%", "end 60%"] });
  const draw = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="sacred" aria-labelledby="sacred-title" className="paper relative bg-paper-2/60 py-24 sm:py-32">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <ChapterHead
          n="06"
          id="sacred-title"
          title={
            <>
              Char Dham &amp; Panch Kedar: <em className="italic text-forest">trails of faith</em>
            </>
          }
          lede="Long before trekking was a hobby, pilgrims walked these valleys to four shrines at the sources of the great rivers. Hover a card, or tap Details, to turn it over."
        />

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dhams.map((d, i) => (
            <Rise as="li" key={d.name} delay={i * 0.08}>
              <DhamCard dham={d} order={i + 1} />
            </Rise>
          ))}
        </ul>

        <div className="mt-20 grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h3 className="font-display text-4xl">The Panch Kedar circuit</h3>
            <p className="mt-3 max-w-xl text-graphite">
              Five Shiva temples in the Rudraprayag and Chamoli hills, each said to hold a part of the god as he hid from
              the Pandavas in the form of a bull.
            </p>
            <ol ref={trailRef} className="relative mt-8 space-y-7 pl-10">
              <svg className="absolute left-[11px] top-2 h-[calc(100%-1rem)] w-2 overflow-visible" preserveAspectRatio="none" viewBox="0 0 2 100" aria-hidden="true">
                <motion.line x1="1" y1="0" x2="1" y2="100" stroke="var(--color-vermilion)" strokeWidth="2" strokeDasharray="3 4" vectorEffect="non-scaling-stroke" style={{ pathLength: draw }} />
              </svg>
              {panchKedar.map((k, i) => (
                <Rise as="li" key={k.name} delay={i * 0.05} className="relative">
                  <span className="absolute -left-10 top-1 grid size-6 place-items-center rounded-full border-2 border-vermilion bg-card text-xs font-bold text-vermilion">
                    {i + 1}
                  </span>
                  <p className="flex flex-wrap items-baseline gap-x-3">
                    <span className="font-display text-2xl">{k.name}</span>
                    <span className="font-hand text-xl text-vermilion">{k.part}</span>
                    <span className="text-sm text-graphite">{k.altitudeM.toLocaleString("en-IN")} m</span>
                  </p>
                  <p className="text-[15px] text-ink/75">{k.note}</p>
                </Rise>
              ))}
            </ol>
          </div>

          <Rise>
            <aside aria-labelledby="yatra-title" className="torn relative rotate-1 bg-card px-7 pb-12 pt-8 shadow-[0_20px_40px_-24px_rgb(28_26_22/0.5)]">
              <span className="tape absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 -rotate-2" aria-hidden="true" />
              <Scribble text="Before the yatra" className="text-2xl text-vermilion" />
              <h3 id="yatra-title" className="mt-1 font-display text-3xl">
                Four things to sort out first
              </h3>
              <ol className="mt-5 space-y-4">
                {yatraSteps.map((s, i) => (
                  <li key={s} className="flex gap-4">
                    <span className="font-hand text-3xl leading-none text-forest">{i + 1}.</span>
                    <span className="text-[15px] leading-relaxed text-ink/80">{s}</span>
                  </li>
                ))}
              </ol>
              <a
                href={site.officialTourism}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-7 inline-flex items-center gap-2 border-b-2 border-forest pb-0.5 font-semibold text-forest"
              >
                Official information: Uttarakhand Tourism
                <ArrowUpRight className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
              <p className="mt-3 text-xs text-graphite">{site.name} is an independent trek operator, not a government body.</p>
            </aside>
          </Rise>
        </div>
      </div>
    </section>
  );
}

function DhamCard({ dham, order }: { dham: (typeof dhams)[number]; order: number }) {
  const [flipped, setFlipped] = useState(false);
  const face = "absolute inset-0 bg-card shadow-[0_20px_40px_-24px_rgb(28_26_22/0.5)] [backface-visibility:hidden]";
  const turn = "absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-card px-3 py-1.5 text-xs font-semibold transition hover:border-ink";

  return (
    <article
      aria-labelledby={`dham-${dham.name}`}
      onPointerEnter={(e) => e.pointerType === "mouse" && setFlipped(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setFlipped(false)}
      className="group h-[25rem] [perspective:1400px]"
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease }}
        className="relative h-full w-full [transform-style:preserve-3d]"
      >
        <div className={`${face} p-3`} inert={flipped}>
          <div className="relative h-[72%] overflow-hidden bg-paper-2">
            <Image src={dham.image} alt={`${dham.name} temple, ${dham.district}`} fill sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 90vw" className="object-cover" />
          </div>
          <div className="perforated absolute right-1 top-1 rotate-6 bg-ochre text-card">
            <span className="block border border-dashed border-card/60 px-2 py-1 text-center text-sm font-bold">{dham.altitudeM.toLocaleString("en-IN")} m</span>
          </div>
          <p className="mt-3 font-hand text-xl text-vermilion">Dham {order} of 4</p>
          <h3 id={`dham-${dham.name}`} className="font-display text-3xl leading-none">
            {dham.name}
          </h3>
          <button type="button" onClick={() => setFlipped(true)} className={turn}>
            <RotateCw className="size-3.5" aria-hidden="true" />
            Details
          </button>
        </div>
        <div className={`${face} ruled p-6 pl-16 [transform:rotateY(180deg)]`} inert={!flipped}>
          <p className="font-hand text-xl leading-8 text-vermilion">{dham.deity}</p>
          <p className="font-display text-4xl leading-[4rem]">{dham.name}</p>
          <p className="text-[15px] leading-8 text-ink/80">{dham.note}</p>
          <p className="mt-2 text-sm leading-8">
            <span className="font-semibold">Getting there:</span> {dham.access}
          </p>
          <p className="text-sm leading-8">
            <span className="font-semibold">District:</span> {dham.district}
          </p>
          <button type="button" onClick={() => setFlipped(false)} className={turn}>
            <RotateCw className="size-3.5 -scale-x-100" aria-hidden="true" />
            Photo
          </button>
        </div>
      </motion.div>
    </article>
  );
}
