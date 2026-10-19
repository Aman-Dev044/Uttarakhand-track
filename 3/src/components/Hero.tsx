"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useMotionTemplate, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowRight } from "lucide-react";
import heroImg from "../../public/images/hero.jpg";
import { stats } from "@/data/content";
import { Magnetic, Scramble, Ticker, ease } from "./ui";
import { Starfield } from "./Starfield";

const lines = [
  { text: "Himalayan treks", accent: false },
  { text: "in Uttarakhand,", accent: false },
  { text: "decoded.", accent: true },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // 1 → 0 as the frame opens up to full bleed
  const k = useTransform(scrollYProgress, [0, 0.75], [1, 0], { clamp: true });
  const clip = useMotionTemplate`inset(calc(var(--ht) * ${k}) calc(4% * ${k}) calc(3% * ${k}) calc(4% * ${k}) round calc(28px * ${k}))`;
  const scale = useTransform(scrollYProgress, [0, 0.8], [1.2, 1]);
  // Keep the peaks inside the small frame, then settle with night sky showing above them
  const imgY = useTransform(scrollYProgress, [0, 0.75], ["36%", "12%"]);
  const copyY = useTransform(scrollYProgress, [0, 0.6], [0, -120]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const hudOpacity = useTransform(scrollYProgress, [0.45, 0.8], [0, 1]);

  return (
    <section ref={ref} id="top" aria-labelledby="hero-title" className="relative h-[175svh] bg-night">
      <div className="sticky top-0 h-svh overflow-hidden [--ht:50%] sm:[--ht:46%] lg:[--ht:44%]">
        <Starfield />
        <div className="aurora opacity-35" aria-hidden="true" />

        {/* Framed mountain that opens to full bleed on scroll */}
        <motion.div style={{ clipPath: clip }} className="absolute inset-0">
          <motion.div style={{ scale, y: imgY }} className="absolute inset-0 origin-bottom">
            <Image
              src={heroImg}
              alt="Snow-capped Chaukhamba reflected in a pond at Budha Madhmaheshwar, with trekkers' tents on the meadow"
              fill
              preload
              placeholder="blur"
              sizes="100vw"
              className="object-cover object-[50%_35%] brightness-[.72] saturate-[.85]"
            />
            <div className="absolute inset-x-0 top-0 h-[16%] bg-gradient-to-b from-night to-transparent" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-violet/20 via-transparent to-night/40 mix-blend-multiply" />
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-night via-night/50 to-transparent" />

          <motion.div style={{ opacity: hudOpacity }} aria-hidden="true" className="absolute inset-0">
            <div className="absolute left-5 top-24 font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-glacier/80 sm:left-8">
              <p>Base · Dehradun</p>
              <p>30.32°N 78.03°E</p>
            </div>
            <div className="absolute right-5 top-24 text-right font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-glacier/80 sm:right-8 min-[1400px]:right-16">
              <p>Range · Garhwal Himalaya</p>
              <p>Season · 2026–27 open</p>
            </div>
            <div className="absolute left-[64%] top-[17%] hidden items-center gap-3 sm:flex">
              <span className="relative size-3 rounded-full bg-volt">
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-volt/70" />
              </span>
              <span className="h-px w-10 bg-ice/40" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ice">Chaukhamba massif</span>
            </div>
          </motion.div>

          {/* Stat strip */}
          <div className="absolute inset-x-0 bottom-0 px-4 pb-5 sm:px-8 sm:pb-8">
            <dl className="glass mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-2xl sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="bg-night/30 px-4 py-3 sm:px-6 sm:py-5">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-mist">{s.label}</dt>
                  <dd className="mt-1 whitespace-nowrap text-xl text-ice sm:text-3xl">
                    <Ticker value={s.value} suffix={s.suffix} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </motion.div>

        {/* Headline over the night sky */}
        <motion.div
          style={{ y: copyY, opacity: copyOpacity }}
          className="relative mx-auto flex h-[calc(var(--ht)-1%)] max-w-6xl flex-col justify-end px-5 pb-4 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12"
        >
          <div className="min-w-0 lg:flex-1">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-glacier">
              <Scramble text="Devbhoomi · the Land of the God" />
            </p>
            <h1 id="hero-title" className="mt-4 font-display text-[2rem] font-semibold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl xl:text-[4.25rem]">
              {lines.map((l, i) => (
                <span key={l.text} className="block overflow-hidden pb-1">
                  <motion.span
                    className={`block ${l.accent ? "text-aurora" : ""}`}
                    initial={{ y: "105%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, ease, delay: 0.25 + i * 0.12 }}
                  >
                    {l.text}
                  </motion.span>
                </span>
              ))}
            </h1>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.7 }}
            className="mt-5 max-w-sm shrink-0 lg:mt-0 lg:w-[23rem] lg:max-w-none lg:pb-3"
          >
            <p className="text-sm leading-relaxed text-mist sm:text-base">
              Fifteen trails from 11,800 to 16,200 ft, measured by altitude, grade, days and price. Answer four
              questions and we&apos;ll point you to the one that fits.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Magnetic>
                <a
                  href="#finder"
                  className="group inline-flex items-center gap-2 rounded-full bg-volt px-5 py-3 text-sm font-semibold text-night transition hover:bg-volt-2"
                >
                  Find my trek
                  <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" />
                </a>
              </Magnetic>
              <a href="#compare" className="inline-flex items-center gap-2 rounded-full border border-ice/20 px-5 py-3 text-sm text-ice transition hover:border-glacier hover:text-glacier">
                Compare all 15
                <ArrowDown className="size-4" aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
