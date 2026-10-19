"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowDownRight } from "lucide-react";
import heroImg from "../../public/images/hero.jpg";
import { levels, monthNames, treks, type Level } from "@/data/content";
import { site } from "@/data/site";
import { Arrow, Postmark, Scribble, Underline, ease } from "./ui";
import { Select } from "./Select";

export const TREK_FILTER_EVENT = "trek-filter";
export type TrekFilterDetail = { month: number | null; level: Level | null };

const monthOptions = [{ value: "", label: "Any month" }, ...monthNames.map((m, i) => ({ value: String(i + 1), label: m }))];
const levelOptions = [{ value: "", label: "Any pace" }, ...levels.map((l) => ({ value: l.value, label: l.label }))];

const headline = ["Uttarakhand", "trekking,"];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const lift = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Polaroids lean gently toward the pointer
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tiltX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 18 });
  const tiltY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 18 });

  const [month, setMonth] = useState("");
  const [level, setLevel] = useState("");

  function find(e: React.FormEvent) {
    e.preventDefault();
    const detail: TrekFilterDetail = { month: month ? Number(month) : null, level: (level || null) as Level | null };
    window.dispatchEvent(new CustomEvent(TREK_FILTER_EVENT, { detail }));
    document.getElementById("trek-log")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      id="top"
      ref={ref}
      aria-labelledby="hero-title"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      className="paper graph relative isolate overflow-hidden pb-20 pt-28 sm:pt-32 lg:min-h-[100svh] lg:pb-24"
    >
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div style={{ y: lift, opacity: fade }}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-3 rounded-full border border-ink/15 bg-card/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-graphite"
          >
            <span className="size-2 rounded-full bg-vermilion" aria-hidden="true" />
            Field notes · Season 2026–27
          </motion.p>

          <h1 id="hero-title" className="mt-7 font-display text-[clamp(3.2rem,8.6vw,5.8rem)] leading-[0.92] tracking-tight">
            {headline.map((w, i) => (
              <span key={w} className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
                <motion.span
                  className="block"
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, ease, delay: 0.1 + i * 0.12 }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
            <span className="block overflow-hidden pb-[0.14em] whitespace-nowrap">
              <motion.em
                className="block italic text-forest"
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease, delay: 0.34 }}
              >
                season by season.
              </motion.em>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-graphite text-pretty"
          >
            A field journal for the <Underline>Land of the God</Underline>: which trail to walk in which month, how the days really unfold, what
            to pack, and the {site.address.locality} crew who will walk it with you.
          </motion.p>

          <motion.form
            onSubmit={find}
            aria-label="Find a trek"
            initial={{ opacity: 0, y: 30, rotate: -1 }}
            animate={{ opacity: 1, y: 0, rotate: -1 }}
            transition={{ duration: 0.9, ease, delay: 0.85 }}
            className="relative mt-10 max-w-xl rounded-md bg-card p-6 shadow-[0_20px_40px_-20px_rgb(28_26_22/0.4)] ring-1 ring-ink/5 sm:p-7"
          >
            <span className="tape absolute -top-3 left-1/2 h-6 w-28 -translate-x-1/2 rotate-2" aria-hidden="true" />
            <p className="font-hand text-2xl text-vermilion">Plan my trek →</p>
            <div className="mt-4 grid gap-5 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
              <Select variant="inline" label="I'm free in" value={month} onChange={setMonth} options={monthOptions} />
              <Select variant="inline" label="I'd like it" value={level} onChange={setLevel} options={levelOptions} />
              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-vermilion px-6 py-3.5 font-semibold text-card transition hover:bg-ink"
              >
                Find trails
                <ArrowDownRight className="size-4 transition group-hover:rotate-[-45deg]" aria-hidden="true" />
              </button>
            </div>
          </motion.form>
        </motion.div>

        {/* Polaroid stack */}
        <motion.div style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1000 }} className="relative mx-auto h-[26rem] w-full max-w-[34rem] sm:h-[32rem]">
          <Polaroid
            src="/images/valley-of-flowers.jpg"
            alt="Valley of Flowers in bloom during the monsoon"
            caption="VoF, August"
            className="left-[2%] top-[8%] w-[56%]"
            rotate={-9}
            delay={0.5}
          />
          <Polaroid
            src="/images/kedarnath.jpg"
            alt="Kedarnath temple against snow peaks"
            caption="Kedarnath, May"
            className="right-[0%] top-[0%] w-[48%]"
            rotate={7}
            delay={0.65}
          />
          <Polaroid
            image={heroImg}
            alt="Chaukhamba peaks seen from Budha Madhyamaheshwar meadow"
            caption="Chaukhamba from Madhyamaheshwar"
            className="-bottom-[2%] left-[26%] w-[62%]"
            rotate={-2}
            delay={0.8}
            preload
          />
          <motion.div
            initial={{ opacity: 0, scale: 1.6, rotate: -30 }}
            animate={{ opacity: 1, scale: 1, rotate: -12 }}
            transition={{ duration: 0.5, ease, delay: 1.3 }}
            className="absolute -right-2 bottom-6 z-20 size-28 sm:size-32"
          >
            <Postmark top={site.address.locality} bottom="Uttarakhand" center={`EST ${site.foundedYear}`} className="size-full animate-spin-slow" />
          </motion.div>
          <div className="absolute -top-14 left-[4%] z-20 hidden -rotate-3 items-start gap-1 text-forest sm:flex">
            <Scribble text={`${treks.length} trails logged so far`} className="text-2xl" delay={1.4} />
            <Arrow className="mt-3 h-10 w-14 rotate-[25deg]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Polaroid({
  src,
  image,
  alt,
  caption,
  className,
  rotate,
  delay,
  preload,
}: {
  src?: string;
  image?: typeof heroImg;
  alt: string;
  caption: string;
  className: string;
  rotate: number;
  delay: number;
  preload?: boolean;
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 120, rotate: rotate * 3 }}
      animate={{ opacity: 1, y: 0, rotate }}
      whileHover={{ rotate: 0, scale: 1.04, zIndex: 30 }}
      transition={{ type: "spring", stiffness: 90, damping: 16, delay }}
      className={`absolute z-10 bg-card p-3 pb-10 shadow-[0_24px_50px_-18px_rgb(28_26_22/0.45)] ${className}`}
    >
      <span className="tape absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 -rotate-3" aria-hidden="true" />
      <div className="relative aspect-[4/3] overflow-hidden bg-paper-2">
        {image ? (
          <Image src={image} alt={alt} fill sizes="(min-width: 1024px) 380px, 70vw" placeholder="blur" preload={preload} className="object-cover" />
        ) : (
          <Image src={src!} alt={alt} fill sizes="(min-width: 1024px) 300px, 55vw" className="object-cover" />
        )}
      </div>
      <figcaption className="absolute inset-x-3 bottom-2 truncate font-hand text-xl text-graphite">{caption}</figcaption>
    </motion.figure>
  );
}
