"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { destinations } from "@/data/content";
import { Label } from "./ui";

const regions = (["Garhwal", "Kumaon"] as const).map((r) => ({
  name: r,
  blurb:
    r === "Garhwal"
      ? "The western half: river towns, pilgrim roads and the high valleys of the Char Dham."
      : "The eastern half: lake towns, forest sanctuaries and the longest skylines in the state.",
  places: destinations.filter((d) => d.region === r),
}));

/**
 * Desktop: the section is pinned and vertical scroll drives the strip sideways.
 * Below lg (or with reduced motion) it is a native swipeable strip.
 */
export function Panorama() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const el = track.current;
    if (!el) return;
    const wide = window.matchMedia("(min-width: 1024px)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    const measure = () => setDistance(wide.matches && !still.matches ? Math.max(0, el.scrollWidth - window.innerWidth) : 0);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const pinned = distance > 0;
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 32, mass: 0.4 });
  const x = useTransform(smooth, (p) => -p * distance);
  const bar = useTransform(smooth, [0, 1], [0, 1]);

  return (
    <section
      id="destinations"
      ref={section}
      aria-labelledby="dest-title"
      className="relative bg-slate text-snow"
      style={pinned ? { height: `calc(100svh + ${distance}px)` } : undefined}
    >
      <div className={pinned ? "sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden" : "py-24 sm:py-32"}>
        <motion.div
          ref={track}
          style={pinned ? { x } : undefined}
          className={
            pinned
              ? "flex w-max items-end gap-6 pl-10 pr-10"
              : "no-scrollbar flex snap-x snap-mandatory scroll-px-5 items-end gap-4 overflow-x-auto overscroll-x-contain px-5 sm:scroll-px-10 sm:gap-6 sm:px-10"
          }
        >
          <div className="w-[82vw] shrink-0 snap-start self-center pr-4 sm:w-[60vw] lg:w-[36rem] lg:pr-16">
            <Label n="06" light>
              Destinations
            </Label>
            <h2 id="dest-title" className="mt-8 font-display text-[2.6rem] font-semibold leading-[0.95] tracking-[-0.05em] sm:text-7xl">
              Garhwal and Kumaon, end to end.
            </h2>
            <p className="mt-6 max-w-sm text-[17px] leading-relaxed text-snow/70">
              Eleven places to add before or after a trek, from the ghats of Haridwar to the forests of Corbett.
            </p>
            <p className="mt-8 hidden items-center gap-3 text-[13px] text-snow/50 lg:flex">
              <span className="h-px w-10 bg-snow/30" /> Keep scrolling
            </p>
            <p className="mt-8 flex items-center gap-3 text-[13px] text-snow/50 lg:hidden">
              <span className="h-px w-10 bg-snow/30" /> Swipe
            </p>
          </div>

          {regions.map((r) => (
            <div key={r.name} className="flex shrink-0 items-end gap-4 sm:gap-6">
              <div className="flex h-[58svh] w-[64vw] shrink-0 snap-start flex-col justify-between rounded-[24px] border border-snow/15 p-6 sm:w-[22rem] lg:h-[64svh] lg:w-[20rem]">
                <h3 className="font-condensed text-[5.5rem] leading-[0.8] tracking-[-0.03em] text-snow lg:text-[7rem]">{r.name}</h3>
                <p className="text-[15px] leading-relaxed text-snow/70">{r.blurb}</p>
              </div>
              {r.places.map((d, i) => (
                <figure key={d.name} className={`group w-[64vw] shrink-0 snap-start sm:w-[22rem] lg:w-[24rem] ${i % 2 ? "lg:mb-16" : ""}`}>
                  <div className="relative h-[46svh] overflow-hidden rounded-[24px] bg-slate-2 lg:h-[52svh]">
                    <Image
                      src={d.image}
                      alt={d.alt}
                      fill
                      sizes="(min-width: 1024px) 24rem, 64vw"
                      className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-glide)] group-hover:scale-[1.06]"
                    />
                  </div>
                  <figcaption className="mt-4 flex items-baseline justify-between gap-4">
                    <span className="font-display text-2xl font-semibold tracking-[-0.04em]">{d.name}</span>
                    <span className="text-right text-[13px] text-snow/60">{d.note}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          ))}
        </motion.div>

        {pinned && (
          <div className="mx-10 mt-10 h-px bg-snow/15" aria-hidden="true">
            <motion.div style={{ scaleX: bar }} className="h-px origin-left bg-snow" />
          </div>
        )}
      </div>
    </section>
  );
}
