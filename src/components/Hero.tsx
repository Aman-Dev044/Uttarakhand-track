"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDownRight, Search } from "lucide-react";
import heroImg from "../../public/images/hero.jpg";
import { months } from "@/data/content";
import { ease } from "./ui";
import { Select } from "./Select";

const regionOptions = [
  { value: "All", label: "All regions" },
  { value: "Uttarakhand", label: "Uttarakhand" },
  { value: "Himachal", label: "Himachal Pradesh" },
  { value: "Kashmir", label: "Jammu & Kashmir" },
];
const monthOptions = [{ value: "", label: "Any month" }, ...months.map((m, i) => ({ value: String(i + 1), label: m }))];
const gradeOptions = [
  { value: "All", label: "Any level" },
  { value: "Easy", label: "Easy, first trek" },
  { value: "Moderate", label: "Moderate" },
  { value: "Difficult", label: "Difficult" },
];

export type TrekFilterDetail = { state: string; grade: string; month: number | null };
export const TREK_FILTER_EVENT = "trek-filter";

const headline = ["Trek", "into", "your"];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.22]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const ridgeBack = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const ridgeMid = useTransform(scrollYProgress, [0, 1], ["0%", "-9%"]);

  return (
    <section
      id="top"
      ref={ref}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-snow"
    >
      <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0 -z-20">
        <Image
          src={heroImg}
          alt="Chaukhamba peaks reflected in a still alpine lake at Budha Madhmaheshwar, Garhwal Himalaya"
          fill
          preload
          placeholder="blur"
          sizes="100vw"
          className="object-cover object-[50%_40%]"
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/70 via-ink/30 to-ink/80" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_20%_60%,rgba(10,23,20,.75),transparent_60%)]" />

      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pb-80 pt-32 sm:px-8 md:pb-52 lg:pb-60"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
          className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-snow/80"
        >
          <span lang="hi" className="font-deva text-xl text-saffron-2">
            देवभूमि उत्तराखंड
          </span>
          <span className="h-px w-10 bg-snow/40" aria-hidden="true" />
          <span className="uppercase tracking-[0.3em] text-xs">Land of the God</span>
        </motion.p>

        <h1
          id="hero-title"
          className="font-display text-[clamp(3.2rem,10vw,9rem)] font-light leading-[0.88] tracking-[-0.03em]"
        >
          <span className="sr-only">Himalayan treks and Char Dham Yatra in Uttarakhand: trek into your own story</span>
          <span aria-hidden="true" className="block">
            {headline.map((w, i) => (
              <span key={w} className="mr-[0.22em] inline-block overflow-hidden pb-[0.08em] align-bottom">
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.1, ease, delay: 0.35 + i * 0.09 }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
            <span className="block overflow-hidden pb-[0.1em]">
              <motion.em
                className="inline-block font-normal italic text-saffron-2"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.1, ease, delay: 0.65 }}
              >
                own story.
              </motion.em>
            </span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.9 }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-snow/80 text-pretty"
        >
          Snow summits, flower valleys and the four sacred dhams. 150+ guided Himalayan journeys across Uttarakhand,
          Himachal and Kashmir, led by the people who grew up on these trails.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 1.05 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#treks"
            className="group inline-flex items-center gap-3 rounded-full bg-saffron py-2 pl-6 pr-2 font-semibold text-ink transition hover:bg-saffron-2"
          >
            See upcoming treks
            <span className="grid size-10 place-items-center rounded-full bg-ink text-snow transition group-hover:rotate-45">
              <ArrowDownRight className="size-5" aria-hidden="true" />
            </span>
          </a>
          <a
            href="#char-dham"
            className="inline-flex items-center rounded-full border border-snow/30 px-6 py-4 font-semibold backdrop-blur-sm transition hover:border-snow hover:bg-snow/10"
          >
            Char Dham Yatra 2027
          </a>
        </motion.div>
      </motion.div>

      <TripFinder />

      <CompassBadge />

      {/* Parallax ridgelines blending into the next section */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 -z-0 h-[34vh] min-h-56">
        <motion.svg style={{ y: ridgeBack }} viewBox="0 0 1440 320" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-full w-full">
          <path
            d="M0 210 120 150l80 40 110-95 90 70 70-40 120 110 90-60 130-120 100 90 80-30 120 100 110-70 90 50 140-90v215H0Z"
            fill="#10302a"
            opacity=".55"
          />
        </motion.svg>
        <motion.svg style={{ y: ridgeMid }} viewBox="0 0 1440 320" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-[80%] w-full">
          <path d="M0 230 90 200l120 50 140-90 100 60 150-80 120 90 140-40 120 70 130-90 110 60 120-30 100 50v140H0Z" fill="#0a1714" opacity=".8" />
        </motion.svg>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="absolute inset-x-0 -bottom-px h-24 w-full">
          <path d="M0 80 160 50l140 40 180-55 160 45 200-60 180 50 160-30 260 45v55H0Z" fill="#f6f2ea" />
        </svg>
      </div>
    </section>
  );
}

function TripFinder() {
  const [state, setState] = useState("All");
  const [grade, setGrade] = useState("All");
  const [month, setMonth] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    window.dispatchEvent(
      new CustomEvent<TrekFilterDetail>(TREK_FILTER_EVENT, {
        detail: { state, grade, month: month ? Number(month) : null },
      }),
    );
    document.getElementById("treks")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <motion.form
      onSubmit={submit}
      aria-label="Find a trek"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease, delay: 1.25 }}
      className="absolute inset-x-4 bottom-10 z-10 mx-auto grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-3xl bg-snow/15 ring-1 ring-snow/20 backdrop-blur-xl sm:inset-x-8 md:grid-cols-[1fr_1fr_1fr_auto] lg:bottom-14"
    >
      <Select variant="glass" label="Where" value={state} onChange={setState} options={regionOptions} className="bg-ink/40 px-5 py-4" />
      <Select variant="glass" label="When" value={month} onChange={setMonth} options={monthOptions} className="bg-ink/40 px-5 py-4" />
      <Select
        variant="glass"
        label="Difficulty"
        value={grade}
        onChange={setGrade}
        options={gradeOptions}
        className="col-span-2 bg-ink/40 px-5 py-4 md:col-span-1"
      />
      <button
        type="submit"
        className="col-span-2 flex items-center justify-center gap-2 bg-saffron px-8 py-4 font-semibold text-ink transition hover:bg-saffron-2 md:col-span-1"
      >
        <Search className="size-5" aria-hidden="true" /> Find treks
      </button>
    </motion.form>
  );
}

function CompassBadge() {
  return (
    <div aria-hidden="true" className="absolute right-8 top-1/3 hidden size-36 xl:block">
      <svg viewBox="0 0 200 200" className="absolute inset-0 animate-spin-slow text-snow/70">
        <defs>
          <path id="badge-circle" d="M100 100m-78 0a78 78 0 1 1 156 0a78 78 0 1 1-156 0" />
        </defs>
        <text fontSize="13.5" letterSpacing="5" fill="currentColor" className="uppercase">
          <textPath href="#badge-circle">5,000+ trekkers a year · 150+ trails · </textPath>
        </text>
      </svg>
      <div className="absolute inset-[30%] grid place-items-center rounded-full bg-saffron text-ink">
        <svg viewBox="0 0 24 24" className="size-8 animate-float">
          <path d="M12 2 15 12 12 22 9 12Z" fill="currentColor" />
        </svg>
      </div>
      <p className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] tracking-[0.2em] text-snow/60">
        30.3165° N · 78.0322° E
      </p>
    </div>
  );
}
