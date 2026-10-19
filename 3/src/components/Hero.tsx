"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import heroImg from "../../public/images/hero.jpg";
import { treks } from "@/data/content";
import { site } from "@/data/site";
import { Arrow, inr, Magnetic } from "./ui";

const minPrice = Math.min(...treks.map((t) => t.price));
const minAlt = Math.min(...treks.map((t) => t.altitudeFt));
const maxAlt = Math.max(...treks.map((t) => t.altitudeFt));

/**
 * A giant word cut out of a snow-white layer (mix-blend-mode: screen turns the black
 * letters into windows onto the photo). Scrolling scales the layer until the photo is full-bleed.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // Eased so the letters open slowly at first, then rush past the camera
  const maskScale = useTransform(p, (v) => (reduce ? 1 : 1 + Math.pow(Math.min(v / 0.62, 1), 2.2) * 11));
  const maskOpacity = useTransform(p, [0.34, 0.6], reduce ? [1, 1] : [1, 0]);
  const photoScale = useTransform(p, [0, 0.62], reduce ? [1, 1] : [1.18, 1]);
  const introOpacity = useTransform(p, [0, 0.16], reduce ? [1, 1] : [1, 0]);
  const introY = useTransform(p, [0, 0.2], reduce ? [0, 0] : [0, -70]);
  const shade = useTransform(p, [0.5, 0.78], reduce ? [0, 0] : [0, 1]);
  const endOpacity = useTransform(p, [0.64, 0.82], reduce ? [0, 0] : [0, 1]);
  const endY = useTransform(p, [0.64, 0.86], [48, 0]);

  return (
    <section ref={ref} id="top" aria-labelledby="hero-title" className="relative h-[230svh] motion-reduce:h-[100svh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div style={{ scale: photoScale }} className="absolute inset-0 will-change-transform">
          <div className="hero-drift absolute inset-0">
            <Image
              src={heroImg}
              alt="Chaukhamba peaks reflected in a still lake at Budha Madhyamaheshwar, Garhwal Himalaya"
              fill
              preload
              placeholder="blur"
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <motion.div style={{ opacity: shade }} className="absolute inset-0 bg-gradient-to-t from-slate/80 via-slate/20 to-slate/10" />
        </motion.div>

        <motion.div
          aria-hidden="true"
          style={{ scale: maskScale, opacity: maskOpacity }}
          className="absolute inset-0 flex origin-[50%_27%] items-start justify-center bg-snow pt-[19svh] mix-blend-screen will-change-transform sm:origin-[50%_40%] sm:items-center sm:pb-[20svh] sm:pt-0"
        >
          <span className="font-condensed select-none text-[29vw] leading-[0.82] tracking-[-0.035em] text-black sm:text-[23vw]">
            HIMALAYA
          </span>
        </motion.div>

        <motion.div
          style={{ opacity: introOpacity, y: introY }}
          className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-5 pb-8 pt-24 sm:px-10 sm:pb-12"
        >
          <div className="grid items-end gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
            <h1 id="hero-title" className="font-display text-[2.6rem] font-semibold leading-[0.98] tracking-[-0.045em] text-slate sm:text-6xl xl:text-[5rem]">
              <span className="block overflow-hidden pb-1">
                <span className="hero-rise block">Signature Himalayan</span>
              </span>{" "}
              <span className="block overflow-hidden pb-1">
                <span className="hero-rise block [--d:0.08s]">treks in Uttarakhand.</span>
              </span>
            </h1>
            <div className="overflow-hidden lg:pb-2">
              <div className="hero-rise [--d:0.2s]">
                <p className="max-w-md text-[17px] leading-relaxed text-slate-2">
                  Fifteen trails across Garhwal, Kumaon and beyond, led from {site.address.locality} since{" "}
                  {site.foundedYear}. Choose by season, by summit or by the days you have.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <Magnetic>
                    <a
                      href="#treks"
                      className="group inline-flex items-center gap-3 rounded-full bg-slate py-3.5 pl-6 pr-5 text-[15px] font-medium text-snow transition-colors hover:bg-alpine"
                    >
                      Find your trek
                      <Arrow className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </Magnetic>
                  <a href="#char-dham" className="text-[15px] font-medium text-slate underline decoration-frost decoration-2 underline-offset-[6px] transition hover:decoration-alpine">
                    The Char Dham route
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 flex items-center justify-between border-t border-slate/10 pt-4 text-[13px] text-stone">
            <span className="overflow-hidden">
              <span className="hero-rise block [--d:0.3s]">From {inr(minPrice)} · {minAlt.toLocaleString("en-IN")}–{maxAlt.toLocaleString("en-IN")} ft</span>
            </span>
            <span className="overflow-hidden">
              <span className="hero-rise flex items-center gap-2 [--d:0.36s]">
                Scroll
                <span className="relative block h-5 w-px overflow-hidden bg-slate/15">
                  <span className="absolute inset-x-0 top-0 h-2 animate-[scrollcue_1.8s_ease-in-out_infinite] bg-slate motion-reduce:animate-none" />
                </span>
              </span>
            </span>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: endOpacity, y: endY }}
          aria-hidden={reduce ? true : undefined}
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 mx-auto max-w-[1600px] px-5 pb-10 text-snow sm:px-10 sm:pb-14"
        >
          <p className="max-w-4xl font-display text-[2.4rem] font-semibold leading-[0.98] tracking-[-0.04em] sm:text-7xl">
            Fifteen trails. Four seasons. One mountain state.
          </p>
          <p className="mt-5 max-w-md text-[15px] text-snow/80">
            Chaukhamba, mirrored in the high lake at Budha Madhyamaheshwar in Rudraprayag.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
