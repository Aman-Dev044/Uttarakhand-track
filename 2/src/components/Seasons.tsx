"use client";

import Image from "next/image";
import { useRef, useSyncExternalStore } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { seasons, treks } from "@/data/content";
import { ChapterHead } from "./ui";

const tints = ["bg-[#e6ecf0]", "bg-[#f3e2d9]", "bg-[#dfe8dc]", "bg-[#f1e6cf]"];
const accents = ["text-pencil", "text-vermilion", "text-forest", "text-ochre"];

const noop = () => () => {};

export function Seasons() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // Current month is only known in the browser; the server renders without a "this month" badge
  const now = useSyncExternalStore(noop, () => new Date().getMonth() + 1, () => 0);

  return (
    <section id="seasons" aria-labelledby="seasons-title" className="paper relative bg-card py-24 sm:py-32">
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <ChapterHead
          n="04"
          id="seasons-title"
          title={
            <>
              A field guide to the <em className="italic text-forest">seasons</em>
            </>
          }
          lede="The same trail can be a snow walk in January, a flower meadow in July and a golden ridge in October. Here is what each season looks like on the ground, and which treks are in good shape."
        />

        <div ref={ref} className="relative mt-14">
          {seasons.map((s, i) => (
            <SeasonCard key={s.key} season={s} index={i} progress={scrollYProgress} isNow={(s.months as readonly number[]).includes(now)} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SeasonCard({
  season,
  index,
  progress,
  isNow,
}: {
  season: (typeof seasons)[number];
  index: number;
  progress: MotionValue<number>;
  isNow: boolean;
}) {
  const n = seasons.length;
  const scale = useTransform(progress, [index / n, 1], [1, 1 - (n - 1 - index) * 0.045]);
  const best = treks.filter((t) => t.months.filter((m) => (season.months as readonly number[]).includes(m)).length >= 2);

  return (
    <div className="sticky mb-[18vh] last:mb-0" style={{ top: `calc(5.5rem + ${index * 1.6}rem)` }}>
      <motion.article
        style={{ scale, transformOrigin: "top center" }}
        className={`relative grid overflow-hidden rounded-md shadow-[0_-10px_40px_-20px_rgb(28_26_22/0.35)] ring-1 ring-ink/10 md:grid-cols-[0.9fr_1.1fr] ${tints[index]}`}
        aria-labelledby={`season-${season.key}`}
      >
        <div className="relative h-36 sm:h-56 md:h-auto md:min-h-[26rem]">
          <Image src={season.image} alt={`${season.name} in the Uttarakhand Himalaya`} fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
          <span className="absolute left-4 top-4 rounded-sm bg-card/90 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em]">{season.span}</span>
          {isNow && (
            <span className="absolute right-4 top-4 rotate-6 rounded-sm bg-vermilion px-3 py-1 font-hand text-xl text-card shadow">you are here →</span>
          )}
        </div>
        <div className="p-5 sm:p-8">
          <div className="flex items-baseline justify-between gap-4">
            <h3 id={`season-${season.key}`} className="font-display text-4xl leading-none sm:text-5xl">
              {season.name}
            </h3>
            <span lang="hi" className={`font-hand text-3xl ${accents[index]}`}>
              {season.hindi}
            </span>
          </div>
          <dl className="mt-5 grid gap-3 text-[15px] leading-relaxed sm:grid-cols-2 sm:gap-x-6">
            {(
              [
                ["On the trail", season.sees],
                ["In bloom", season.blooms],
                ["Wear", season.wear],
                ["On the calendar", season.festival],
              ] as const
            ).map(([k, v], j) => (
              <div key={k} className={j > 1 ? "hidden sm:block" : ""}>
                <dt className={`font-hand text-xl ${accents[index]}`}>{k}</dt>
                <dd className="text-ink/80">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-graphite">In good shape</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {best.slice(0, 7).map((t) => (
              <li key={t.slug} className="rounded-full border border-ink/15 bg-card/70 px-3 py-1 text-sm">
                {t.name.split(" · ")[0]}
              </li>
            ))}
          </ul>
        </div>
      </motion.article>
    </div>
  );
}
