"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowRight, MapPin, Mountain, Footprints } from "lucide-react";
import { dhams } from "@/data/content";
import { CompassGlyph } from "./ui";

export function CharDham() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const el = track.current;
    if (!el) return;
    const measure = () => setDistance(Math.max(0, el.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const x = useTransform(smooth, (p) => -p * distance);
  const bar = useTransform(smooth, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="char-dham"
      ref={section}
      aria-labelledby="dham-title"
      className="relative bg-pine text-snow"
      style={{ height: `calc(100vh + ${distance}px)` }}
    >
      <div className="topo sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <motion.div ref={track} style={{ x }} className="flex w-max items-stretch gap-6 px-5 sm:px-8 lg:gap-8 lg:pl-16">
          {/* Intro panel */}
          <div className="flex w-[85vw] max-w-xl shrink-0 flex-col justify-center pr-6 sm:w-[60vw] lg:w-[34rem]">
            <p className="mb-5 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-saffron-2">
              <CompassGlyph className="size-4" /> Char Dham Yatra
            </p>
            <h2 id="dham-title" className="font-display text-5xl leading-[1] tracking-tight sm:text-6xl lg:text-7xl">
              Four shrines. <em className="font-light italic text-saffron-2">One lifetime.</em>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-snow/70 text-pretty">
              Traditionally travelled west to east, from Yamunotri to Badrinath. Our yatras include helicopter options for
              Kedarnath, senior-friendly pacing and alternate routes around landslide-prone stretches.
            </p>
            <p className="mt-8 flex items-center gap-3 text-sm text-snow/60">
              <span className="h-px w-12 bg-snow/30" /> Scroll to travel the circuit <ArrowRight className="size-4" aria-hidden="true" />
            </p>
          </div>

          {dhams.map((d, i) => (
            <article
              key={d.name}
              className="group relative flex h-[70vh] max-h-[40rem] w-[80vw] shrink-0 flex-col justify-end overflow-hidden rounded-[2rem] sm:w-[55vw] lg:w-[30rem]"
            >
              <Image
                src={d.image}
                alt={`${d.name} temple, ${d.district}, Uttarakhand`}
                fill
                sizes="(min-width: 1024px) 30rem, 80vw"
                className="object-cover transition duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/10" />
              <span className="absolute right-6 top-4 font-display text-[7rem] leading-none text-snow/15">0{i + 1}</span>
              <div className="relative p-7 sm:p-8">
                <p className="text-sm text-saffron-2">{d.deity}</p>
                <h3 className="mt-1 font-display text-5xl">{d.name}</h3>
                <p className="mt-3 text-snow/75 text-pretty">{d.copy}</p>
                <dl className="mt-6 grid grid-cols-2 gap-3 border-t border-snow/15 pt-5 text-sm">
                  <div className="flex items-center gap-2">
                    <Mountain className="size-4 text-saffron-2" aria-hidden="true" />
                    <dt className="sr-only">Altitude</dt>
                    <dd>{d.altitudeM.toLocaleString("en-IN")} m</dd>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="size-4 text-saffron-2" aria-hidden="true" />
                    <dt className="sr-only">District</dt>
                    <dd>{d.district}</dd>
                  </div>
                  <div className="col-span-2 flex items-center gap-2 text-snow/70">
                    <Footprints className="size-4 text-saffron-2" aria-hidden="true" />
                    <dt className="sr-only">Access</dt>
                    <dd>{d.access}</dd>
                  </div>
                </dl>
              </div>
            </article>
          ))}

          {/* CTA panel */}
          <div className="flex w-[80vw] shrink-0 flex-col justify-center rounded-[2rem] bg-saffron p-8 text-ink sm:w-[55vw] lg:w-[26rem] lg:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.25em]">Season 2027</p>
            <p className="mt-4 font-display text-4xl leading-tight">Portals open around Akshaya Tritiya, late April to May.</p>
            <p className="mt-4 text-ink/75">
              10–12 day road yatras from Haridwar or Dehradun, with optional Do Dham and helicopter packages.
            </p>
            <a
              href="#plan"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 font-semibold text-snow transition hover:bg-pine"
            >
              Reserve yatra dates <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>
          <div className="w-4 shrink-0 lg:w-12" aria-hidden="true" />
        </motion.div>

        <div className="absolute inset-x-5 bottom-8 h-px bg-snow/15 sm:inset-x-8 lg:inset-x-16" aria-hidden="true">
          <motion.div style={{ width: bar }} className="h-full bg-saffron-2" />
        </div>
      </div>
    </section>
  );
}
