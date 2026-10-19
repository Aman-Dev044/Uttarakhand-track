"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { signature, trekBySlug } from "@/data/content";
import { Arrow, ease, FadeUp, ft, inr, Label, LineReveal, pickTrek } from "./ui";

const chapters = signature.map((c) => ({ ...c, trek: trekBySlug(c.slug) }));

export function Signature() {
  const listRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start center", "end center"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.max(0, Math.min(chapters.length - 1, Math.floor(v * chapters.length))));
  });

  return (
    <section id="signature" aria-labelledby="signature-title" className="relative bg-snow">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-10">
        <div className="grid gap-8 border-t border-frost pt-10 lg:grid-cols-[1.6fr_1fr] lg:items-end">
          <div>
            <Label n="02">Signature treks</Label>
            <LineReveal
              id="signature-title"
              lines={["Five trails we’d walk", "again tomorrow."]}
              className="mt-8 font-display text-[2.6rem] font-semibold leading-[0.95] tracking-[-0.05em] sm:text-7xl xl:text-[5.6rem]"
            />
          </div>
          <FadeUp>
            <p className="max-w-md text-[17px] leading-relaxed text-slate-2 lg:ml-auto">
              One for every season and every kind of walker, from a first snow summit to a seven-night expedition. Scroll
              through them in the order the year brings them.
            </p>
          </FadeUp>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-[1600px] lg:mt-0 lg:grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div ref={listRef} className="px-5 sm:px-10 lg:pr-16">
          {chapters.map((c, i) => (
            <article
              key={c.slug}
              aria-labelledby={`sig-${c.slug}`}
              className="flex flex-col justify-center py-10 lg:min-h-[100svh] lg:py-0"
            >
              <motion.div
                className="relative mb-8 aspect-[4/5] overflow-hidden rounded-[22px] sm:aspect-[16/11] lg:hidden"
                initial={{ clipPath: "inset(12% 8% 12% 8% round 22px)" }}
                whileInView={{ clipPath: "inset(0% 0% 0% 0% round 22px)" }}
                viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                transition={{ duration: 1.1, ease }}
              >
                <Image src={c.trek.image} alt={`${c.trek.name} trek, ${c.trek.region}`} fill sizes="100vw" className="object-cover" />
              </motion.div>
              <FadeUp>
                <p className="flex items-center gap-3 text-[13px] font-medium text-stone">
                  <span className="tabular-nums text-alpine">0{i + 1}</span>
                  {c.kicker}
                </p>
                <h3 id={`sig-${c.slug}`} className="mt-5 font-display text-[2.1rem] font-semibold leading-[1] tracking-[-0.045em] text-slate sm:text-5xl">
                  <span className="block text-[15px] font-medium tracking-[-0.01em] text-glacier-deep sm:text-base">{c.trek.name}</span>
                  <span className="mt-3 block">{c.title}</span>
                </h3>
                <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-slate-2">{c.copy}</p>
                <dl className="mt-8 grid max-w-lg grid-cols-3 border-y border-frost">
                  {[
                    ["Summit", ft(c.trek.altitudeFt)],
                    ["Duration", `${c.trek.nights} nights`],
                    ["From", inr(c.trek.price)],
                  ].map(([k, v], j) => (
                    <div key={k} className={`py-4 ${j > 0 ? "border-l border-frost pl-4" : ""}`}>
                      <dt className="text-[12px] text-stone">{k}</dt>
                      <dd className="mt-1 whitespace-nowrap text-[15px] font-semibold tabular-nums text-slate sm:text-base">{v}</dd>
                    </div>
                  ))}
                </dl>
                <a
                  href="#plan"
                  onClick={(e) => {
                    e.preventDefault();
                    pickTrek(c.trek.name);
                  }}
                  className="group mt-8 inline-flex items-center gap-2 text-[15px] font-medium text-slate"
                >
                  <span className="underline decoration-frost decoration-2 underline-offset-[6px] transition group-hover:decoration-alpine">
                    Plan {c.trek.name}
                  </span>
                  <Arrow className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </FadeUp>
            </article>
          ))}
        </div>

        {/* Desktop stage: stays pinned while the chapters scroll past */}
        <div className="hidden lg:block">
          <div className="sticky top-0 flex h-[100svh] items-center py-5 pr-5">
            <div className="relative h-full w-full overflow-hidden rounded-[28px] bg-ice">
              {chapters.map((c, i) => (
                <motion.div
                  key={c.slug}
                  className="absolute inset-0"
                  initial={false}
                  animate={{ opacity: active === i ? 1 : 0, scale: active === i ? 1 : 1.12 }}
                  transition={{ opacity: { duration: 0.9, ease }, scale: { duration: 1.6, ease } }}
                  aria-hidden={active !== i}
                >
                  <Image src={c.trek.image} alt={`${c.trek.name} trek, ${c.trek.region}`} fill sizes="58vw" className="object-cover" />
                </motion.div>
              ))}
              <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-slate/60 to-transparent" />
              <div className="absolute inset-x-8 bottom-8 flex items-end justify-between gap-6 text-snow">
                <div className="overflow-hidden">
                  <motion.p
                    key={active}
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.8, ease }}
                    className="font-display text-3xl font-semibold tracking-[-0.04em]"
                  >
                    {chapters[active].trek.name}
                  </motion.p>
                </div>
                <div className="flex items-center gap-4 text-[13px] tabular-nums">
                  <span>
                    0{active + 1} / 0{chapters.length}
                  </span>
                  <span className="relative h-px w-28 bg-snow/30">
                    <motion.span style={{ scaleX: progress }} className="absolute inset-0 origin-left bg-snow" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
