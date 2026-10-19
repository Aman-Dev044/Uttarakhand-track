"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { diary, treks } from "@/data/content";
import { ChapterHead, Scribble, ease, inr } from "./ui";

const trek = treks.find((t) => t.slug === diary.slug)!;

// Small altitude profile: x = day, y = feet
const CW = 320;
const CH = 120;
const minFt = 5500;
const maxFt = 13000;
const pts = diary.days.map((d, i) => ({
  x: 20 + (i * (CW - 40)) / (diary.days.length - 1),
  y: CH - 18 - ((d.altitudeFt - minFt) / (maxFt - minFt)) * (CH - 36),
}));
const line = pts.map((p, i) => `${i ? "L" : "M"}${p.x} ${p.y}`).join(" ");

export function Diary() {
  const [active, setActive] = useState(0);
  const day = diary.days[active];

  return (
    <section id="diary" aria-labelledby="diary-title" className="paper relative py-24 sm:py-32">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <ChapterHead
          n="03"
          id="diary-title"
          title={
            <>
              Five days on <em className="italic text-forest">Kedarkantha</em>, as they really go
            </>
          }
          lede={`${diary.intro} From ${inr(trek.price)} per person, Dehradun to Dehradun.`}
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Sticky photo + altitude chart */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <div className="relative rotate-[-2deg] bg-card p-4 pb-14 shadow-[0_30px_60px_-30px_rgb(28_26_22/0.5)]">
                <span className="tape absolute -top-3 right-10 h-6 w-24 rotate-6" aria-hidden="true" />
                <div className="relative aspect-[4/3] overflow-hidden bg-paper-2">
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={day.image}
                      className="absolute inset-0"
                      initial={{ clipPath: "inset(0 100% 0 0)" }}
                      animate={{ clipPath: "inset(0 0% 0 0)" }}
                      exit={{ opacity: 0, transition: { delay: 0.6 } }}
                      transition={{ duration: 0.8, ease }}
                    >
                      <Image src={day.image} alt="" fill sizes="480px" className="object-cover" />
                    </motion.div>
                  </AnimatePresence>
                </div>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={day.day}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="absolute inset-x-4 bottom-3 font-hand text-2xl text-graphite"
                  >
                    Day {day.day}: {day.title}
                  </motion.p>
                </AnimatePresence>
              </div>

              <figure className="mt-10">
                <svg viewBox={`0 0 ${CW} ${CH}`} className="w-full max-w-md" role="img" aria-label="Altitude by day on the Kedarkantha trek">
                  <path d={`${line} L${pts.at(-1)!.x} ${CH - 10} L${pts[0].x} ${CH - 10}Z`} fill="rgb(35 69 49 / 0.08)" />
                  <motion.path
                    d={line}
                    fill="none"
                    stroke="var(--color-forest)"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, ease }}
                  />
                  {pts.map((p, i) => (
                    <g key={i}>
                      <circle cx={p.x} cy={p.y} r="3" fill="var(--color-forest)" />
                      <text x={p.x} y={CH - 1} fontSize="10" textAnchor="middle" fill="var(--color-graphite)" fontFamily="var(--font-inter-tight)">
                        D{i + 1}
                      </text>
                    </g>
                  ))}
                  <motion.g animate={{ x: pts[active].x, y: pts[active].y }} transition={{ type: "spring", stiffness: 140, damping: 18 }}>
                    <circle r="8" fill="none" stroke="var(--color-vermilion)" strokeWidth="2" />
                    <text y="-14" fontSize="12" textAnchor="middle" fill="var(--color-vermilion)" fontWeight="700" fontFamily="var(--font-inter-tight)">
                      {day.altitudeFt.toLocaleString("en-IN")} ft
                    </text>
                  </motion.g>
                </svg>
                <figcaption className="mt-2 font-hand text-lg text-graphite">altitude by day: up slowly, down fast</figcaption>
              </figure>
            </div>
          </div>

          {/* Diary pages */}
          <ol className="space-y-8">
            {diary.days.map((d, i) => (
              <motion.li
                key={d.day}
                initial={{ opacity: 0, y: 40, rotate: 1 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease }}
              >
                <motion.article
                  onViewportEnter={() => setActive(i)}
                  viewport={{ amount: 0.6 }}
                  className={`ruled relative overflow-hidden rounded-sm bg-card py-6 pl-16 pr-6 shadow-[0_20px_40px_-28px_rgb(28_26_22/0.5)] ring-1 transition ${
                    active === i ? "ring-vermilion/40" : "ring-ink/5"
                  }`}
                >
                  <span className="absolute left-4 top-6 font-display text-4xl leading-none text-vermilion">{d.day}</span>
                  <p className="font-hand text-xl leading-8 text-graphite">
                    Day {d.day} · {d.distance}
                  </p>
                  <h3 className="font-display text-3xl leading-8 sm:text-[2rem]">{d.title}</h3>
                  <p className="mt-2 text-[15px] leading-8 text-ink/80">{d.copy}</p>
                  <p className="mt-1 text-sm font-semibold leading-8 text-forest">Camp at {d.altitudeFt.toLocaleString("en-IN")} ft</p>
                  <div className="relative mt-4 aspect-[16/9] overflow-hidden rounded-sm lg:hidden">
                    <Image src={d.image} alt="" fill sizes="90vw" className="object-cover" />
                  </div>
                </motion.article>
              </motion.li>
            ))}
            <li className="pl-4 text-forest">
              <Scribble text="Typical plan. Leaders adjust for snow and weather." className="text-2xl" />
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
