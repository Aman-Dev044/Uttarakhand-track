"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { stats } from "@/data/content";
import { site } from "@/data/site";
import { Counter, ease, FadeUp, Label } from "./ui";

/** A photo that opens out of a pill inside the sentence */
function Pill({ src, alt, delay }: { src: string; alt: string; delay: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  return (
    <motion.span
      ref={ref}
      initial={{ clipPath: "inset(0 45% 0 45% round 999px)" }}
      animate={inView ? { clipPath: "inset(0 0% 0 0% round 999px)" } : undefined}
      transition={{ duration: 1.1, ease, delay }}
      className="relative mx-[0.12em] inline-block h-[0.78em] w-[1.9em] -translate-y-[0.04em] overflow-hidden rounded-full align-baseline"
    >
      <motion.span
        className="absolute inset-0 block"
        initial={{ scale: 1.35 }}
        animate={inView ? { scale: 1 } : undefined}
        transition={{ duration: 1.4, ease, delay }}
      >
        <Image src={src} alt={alt} fill sizes="160px" className="object-cover" />
      </motion.span>
    </motion.span>
  );
}

export function Manifesto() {
  return (
    <section aria-labelledby="about-title" className="relative bg-snow px-5 pb-24 pt-28 sm:px-10 sm:pb-32 sm:pt-40">
      <div className="mx-auto max-w-[1600px]">
        <Label n="01" as="h2" id="about-title">
          About {site.name}
        </Label>
        <FadeUp>
          <p className="mt-10 max-w-[22ch] font-display text-[2.15rem] font-medium leading-[1.06] tracking-[-0.045em] text-slate sm:text-6xl xl:max-w-[24ch] xl:text-[5.2rem]">
            We lead small groups
            <Pill src="/images/kedarkantha.jpg" alt="Kedarkantha in snow" delay={0.1} />
            into the Land of the God, one season
            <Pill src="/images/valley-of-flowers.jpg" alt="Valley of Flowers in bloom" delay={0.25} />
            at a time, <span className="text-stone">on trails we know</span>
            <Pill src="/images/kuari-pass.jpg" alt="Meadows at Kuari Pass" delay={0.4} />
            <span className="text-stone">by heart.</span>
          </p>
        </FadeUp>

        <div className="mt-20 grid gap-12 border-t border-frost pt-10 lg:mt-28 lg:grid-cols-[1fr_2fr]">
          <FadeUp>
            <p className="max-w-sm text-[17px] leading-relaxed text-slate-2">
              {site.name} is a trek operator in {site.address.locality}. This page gathers our trek list with the places,
              seasons and pilgrim routes that make Uttarakhand worth the long road up.
            </p>
          </FadeUp>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {stats.map((s, i) => (
              <FadeUp key={s.label} delay={i * 0.08} className="flex flex-col">
                <dt className="order-2 mt-2 max-w-[12rem] text-[14px] leading-snug text-stone">{s.label}</dt>
                <dd className="order-1 whitespace-nowrap font-display text-4xl font-semibold tracking-[-0.05em] text-slate sm:text-5xl">
                  {s.value === 2018 ? s.value : <Counter value={s.value} suffix={s.suffix} />}
                </dd>
              </FadeUp>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
