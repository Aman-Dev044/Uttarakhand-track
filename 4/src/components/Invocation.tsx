"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { treks } from "@/data/content";
import { Garland, Mandala, Reveal, ease, toDevanagari } from "./ui";

const stats = [
  { value: 4, label: "Char Dham shrines", note: "Yamunotri to Badrinath" },
  { value: 5, label: "Panch Kedar temples", note: "Shiva across five valleys" },
  { value: 5, label: "Panch Prayag", note: "Sacred river confluences" },
  { value: treks.length, label: "Guided trails", note: "Uttarakhand & beyond" },
];

export function Invocation() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-60, 120]);
  const rotateBack = useTransform(scrollYProgress, [0, 1], [40, -90]);

  return (
    <section ref={ref} aria-labelledby="invocation-title" className="paper relative overflow-hidden bg-ivory pb-20 pt-6 sm:pb-28">
      <Garland />
      <motion.div style={{ rotate }} className="pointer-events-none absolute -left-40 top-24 size-[30rem] text-kumkum/[0.07] sm:size-[40rem]">
        <Mandala className="size-full" />
      </motion.div>
      <motion.div style={{ rotate: rotateBack }} className="pointer-events-none absolute -right-48 bottom-0 size-[26rem] text-brass/10">
        <Mandala className="size-full" rings={3} />
      </motion.div>

      <div className="relative mx-auto max-w-5xl px-4 pt-14 text-center sm:px-8 sm:pt-20">
        <Reveal>
          <p className="font-deva text-3xl text-kumkum sm:text-4xl" lang="hi">
            ॥ हर हर गंगे ॥
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 id="invocation-title" className="mt-6 font-display text-3xl leading-[1.2] text-maroon-deep text-balance sm:text-5xl">
            In the hills of Uttarakhand every river is a goddess and every peak has a story.{" "}
            <em className="text-kumkum">We walk you to them</em>, at a pace that leaves room for prayer.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-clay">
            This is Devbhoomi, the Land of the God. Pilgrims have walked here for centuries, to the four dhams at the
            sources of the Yamuna and Ganga, to Shiva&apos;s five Kedar temples and to the confluences where the
            rivers meet. We plan the roads, the stays, the registration and the walks, so you can be present for the
            darshan.
          </p>
        </Reveal>

        <ul className="mt-16 grid grid-cols-2 gap-y-10 sm:grid-cols-4">
          {stats.map((s, i) => (
            <motion.li
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease }}
              className="flex flex-col items-center"
            >
              <div className="relative grid size-28 place-items-center">
                <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90" aria-hidden="true">
                  <circle cx="50" cy="50" r="46" fill="none" stroke="#d8bd8c" strokeWidth="1" strokeDasharray="2 4" />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="46"
                    fill="none"
                    stroke="#e46f1b"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.6, delay: 0.2 + i * 0.12, ease }}
                  />
                </svg>
                <span className="font-display text-5xl font-semibold text-maroon">{s.value}</span>
                <span className="absolute -bottom-1 rounded-full bg-ivory px-2 font-deva text-lg text-kumkum" aria-hidden="true">
                  {toDevanagari(s.value)}
                </span>
              </div>
              <p className="mt-4 font-semibold text-maroon-deep">{s.label}</p>
              <p className="text-sm text-clay">{s.note}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
