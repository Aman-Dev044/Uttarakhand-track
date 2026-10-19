"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowRight } from "lucide-react";
import kedarnath from "../../public/images/kedarnath.jpg";
import { monthNames, type Pace } from "@/data/content";
import { journeyLabels, sendFinder, type Journey } from "@/lib/events";
import { Bell, Mandala, ease } from "./ui";
import { Select } from "./Select";

// Deterministic ember positions so server and client markup match
const embers = Array.from({ length: 18 }, (_, i) => ({
  left: (i * 37 + 11) % 100,
  delay: (i * 0.7) % 9,
  size: 3 + (i % 3) * 1.5,
  drift: ((i % 5) - 2) * 18,
  duration: 8 + (i % 4) * 1.5,
}));

const journeyOptions = (Object.keys(journeyLabels) as Journey[]).map((value) => ({ value, label: journeyLabels[value] }));
const monthOptions = [{ value: "0", label: "Any month" }, ...monthNames.map((m, i) => ({ value: String(i + 1), label: m }))];
const paceOptions = [
  { value: "any", label: "Any pace" },
  { value: "gentle", label: "Gentle" },
  { value: "steady", label: "Steady" },
  { value: "challenging", label: "Challenging" },
];

const lines = [
  { text: "Char Dham Yatra 2026", className: "gilded" },
  { text: "& the sacred trails", className: "" },
  { text: "of Uttarakhand", className: "italic font-light" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const dayOpacity = useTransform(scrollYProgress, [0, 0.55], [0, 1]);
  const sunY = useTransform(scrollYProgress, [0, 1], ["0%", "-140%"]);
  const haloRotate = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const farY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const midY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const archY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  const [journey, setJourney] = useState<Journey>("char-dham");
  const [month, setMonth] = useState("0");
  const [pace, setPace] = useState("any");

  function find(e: React.FormEvent) {
    e.preventDefault();
    sendFinder({ journey, month: Number(month), pace: pace as Pace | "any" });
    const target = journey === "char-dham" || journey === "do-dham" ? "sankalp" : "treks";
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      id="top"
      ref={ref}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-night text-ivory"
    >
      {/* Sky: pre-dawn maroon, brightening to marigold morning as the page scrolls */}
      <div className="absolute inset-0 -z-30 bg-[linear-gradient(180deg,#24060d_0%,#5a1222_38%,#b4371c_68%,#f08a2a_86%,#f6b04a_100%)]" />
      <motion.div
        style={{ opacity: dayOpacity }}
        className="absolute inset-0 -z-30 bg-[linear-gradient(180deg,#6b1527_0%,#c24a1f_30%,#f6a723_60%,#fbe3b0_85%,#fbf5e9_100%)]"
      />
      {/* Night lifts on load: the sunrise */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 2.4, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0 -z-20 bg-night"
      />

      {/* Sun for small screens; on desktop the halo behind the temple arch plays this role */}
      <motion.div
        initial={{ y: 90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 2.6, ease }}
        className="absolute -right-12 top-[56%] -z-20 lg:hidden"
      >
        <motion.div style={{ y: sunY }} className="relative size-44">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,#fff3c4_0%,#f6a723_45%,rgba(246,167,35,0)_70%)]" />
          <motion.div style={{ rotate: haloRotate }} className="absolute -inset-16 text-marigold/40">
            <Mandala className="size-full" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Himalayan ranges, each drifting at its own pace */}
      <motion.svg
        style={{ y: farY }}
        viewBox="0 0 1440 320"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-x-0 bottom-0 -z-10 h-[46%] w-full"
        aria-hidden="true"
      >
        <path
          d="M0 320V190l90-40 80 25 90-65 70 30 90-60 80 50 90-35 90 55 80-80 80 50 90-60 80 55 90-25 80 50 80-40 90 50 90-30v200Z"
          fill="#8e2f2a"
          opacity=".55"
        />
      </motion.svg>
      <motion.svg
        style={{ y: midY }}
        viewBox="0 0 1440 320"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-x-0 bottom-0 -z-10 h-[40%] w-full"
        aria-hidden="true"
      >
        <path d="M0 320V230l120-30 90 25 120-65 90 45 100-35 100 45 100-65 60-10 60 25 120 35 120-30 100 45 120-30 140 35v90Z" fill="#4a0f1c" />
      </motion.svg>
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-x-0 bottom-0 -z-10 h-[30%] w-full"
        aria-hidden="true"
      >
        <path d="M0 320v-50c200-20 320 10 480-8s280 8 420-4 320 18 540-3v65Z" fill="#fbf5e9" />
        {/* A small stone shrine on the ridge */}
        <g fill="#3d0b16">
          <path d="M690 266v-22h10v-8h40v8h10v22Z" />
          <path d="M704 236c2-27 8-42 16-54 8 12 14 27 16 54Z" />
          <circle cx="720" cy="179" r="3" />
          <path d="M720 176v-16l12 4-12 4" fill="#e46f1b" />
        </g>
      </svg>

      {/* Rising diya embers */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[60%]" aria-hidden="true">
        {embers.map((e, i) => (
          <span
            key={i}
            className="ember absolute bottom-0 animate-rise rounded-full bg-marigold shadow-[0_0_10px_3px_rgba(246,167,35,.6)]"
            style={
              {
                left: `${e.left}%`,
                width: e.size,
                height: e.size,
                animationDelay: `${e.delay}s`,
                animationDuration: `${e.duration}s`,
                "--drift": `${e.drift}px`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <div className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-12 px-4 pb-10 pt-28 sm:px-8 sm:pt-36 lg:grid-cols-[1.15fr_.85fr] lg:pb-14">
        <motion.div style={{ y: textY, opacity: textOpacity }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease }}
            className="flex flex-wrap items-center gap-x-4 gap-y-1"
          >
            <span className="font-deva text-2xl text-marigold" lang="hi">
              देवभूमि उत्तराखंड
            </span>
            <span className="font-inscription text-xs uppercase tracking-[0.3em] text-brass-light">॥ Land of the God ॥</span>
          </motion.p>

          <h1 id="hero-title" className="mt-6 font-display text-[2.3rem] font-medium leading-[0.98] tracking-tight sm:text-7xl xl:text-[4.6rem]">
            {lines.map((l, i) => (
              <span key={l.text} className="block overflow-hidden pb-1">
                <motion.span
                  className={`block ${l.className}`}
                  initial={{ y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.1, delay: 0.55 + i * 0.14, ease }}
                >
                  {l.text}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1, ease }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-ivory/80"
          >
            Yamunotri, Gangotri, Kedarnath and Badrinath by road and on foot, and the Himalayan walks to the source
            of the Ganga, Shiva&apos;s lake and Hemkund Sahib. Planned and guided by people from these hills.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.25, ease }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href="#char-dham"
              className="group inline-flex items-center gap-2 rounded-full bg-marigold px-6 py-3.5 font-semibold text-maroon-deep shadow-xl shadow-night/30 transition hover:bg-ivory"
            >
              See the yatra route
              <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a
              href="#trails"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-semibold text-ivory ring-1 ring-ivory/40 transition hover:bg-ivory/10"
            >
              Pilgrimage treks
            </a>
          </motion.div>
        </motion.div>

        {/* Temple arch with a turning mandala halo */}
        <motion.div style={{ y: archY }} className="relative mx-auto hidden w-full max-w-[380px] lg:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, delay: 0.3, ease }}
            className="absolute -inset-24 -z-10"
          >
            <div className="absolute inset-16 rounded-full bg-[radial-gradient(circle,rgba(255,243,196,.9)_0%,rgba(246,167,35,.55)_40%,rgba(246,167,35,0)_70%)]" />
            <motion.div style={{ rotate: haloRotate }} className="absolute inset-0 text-marigold/50">
              <Mandala className="size-full animate-mandala" />
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ clipPath: "inset(100% 0% 0% 0% round 999px 999px 24px 24px)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0% round 999px 999px 24px 24px)" }}
            transition={{ duration: 1.6, delay: 0.6, ease }}
            className="relative aspect-[3/4] overflow-hidden rounded-t-full rounded-b-3xl border-[6px] border-brass-light/80 shadow-2xl shadow-night/50"
          >
            <Image
              src={kedarnath}
              alt="Kedarnath Temple, built of grey stone, with the snow-covered Kedarnath peaks behind it"
              fill
              preload
              placeholder="blur"
              sizes="380px"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/85 to-transparent p-5 pt-16">
              <p className="font-display text-2xl">Kedarnath</p>
              <p className="text-sm text-ivory/75">3,583 m · Rudraprayag</p>
            </div>
          </motion.div>
          <Bell className="absolute -top-10 left-6 h-16 w-10 text-brass-light" />
          <Bell className="absolute -top-6 right-8 h-12 w-8 text-brass [animation-delay:-1.4s]" />
        </motion.div>
      </div>

      {/* Journey finder */}
      <div className="relative z-10 px-4 pb-6 sm:px-8 sm:pb-8">
      <motion.form
        onSubmit={find}
        aria-label="Find your journey"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.4, ease }}
        className="mx-auto grid max-w-5xl grid-cols-2 gap-3 rounded-3xl border border-brass-light/30 bg-maroon-deep/75 p-4 shadow-2xl shadow-night/40 backdrop-blur-xl sm:p-5 lg:grid-cols-[1.3fr_1fr_1fr_auto] lg:items-end"
      >
        <Select className="col-span-2 lg:col-span-1" variant="dusk" showLabel label="Journey" value={journey} onChange={(v) => setJourney(v as Journey)} options={journeyOptions} />
        <Select variant="dusk" showLabel label="Month" value={month} onChange={setMonth} options={monthOptions} />
        <Select variant="dusk" showLabel label="Pace" value={pace} onChange={setPace} options={paceOptions} />
        <button
          type="submit"
          className="col-span-2 flex items-center justify-center gap-2 rounded-xl bg-kumkum px-6 py-3 lg:col-span-1 font-semibold text-ivory transition hover:bg-saffron"
        >
          Find my journey
          <ArrowDown className="size-4" aria-hidden="true" />
        </button>
      </motion.form>
      </div>
    </section>
  );
}
