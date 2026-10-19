"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Quote, Star } from "lucide-react";
import { festivals, testimonials } from "@/data/content";
import { SectionHeading } from "./ui";

export function Festivals() {
  return (
    <section aria-labelledby="festivals-title" className="relative overflow-hidden bg-ink py-24 text-snow sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="festivals-title"
          tone="dark"
          eyebrow="Culture & festivals"
          title="Time your trip to"
          accent="a celebration."
          description="Mountain festivals here follow the harvest, the rains and the gods. Join one and the hills feel less like scenery and more like home."
        />
        <ol className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {festivals.map((f, i) => (
            <FestivalCard key={f.name} index={i} {...f} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function FestivalCard({ name, when, copy, image, index }: (typeof festivals)[number] & { index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [index % 2 ? 40 : 0, index % 2 ? -40 : -80]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <motion.li ref={ref} style={{ y }} className="group">
      <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem]">
        <motion.div style={{ y: imgY }} className="absolute -inset-y-[12%] inset-x-0">
          <Image src={image} alt={`${name}, Uttarakhand`} fill sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw" className="object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
        <span className="absolute left-5 top-5 rounded-full bg-snow/15 px-3 py-1 text-xs backdrop-blur">{when}</span>
        <div className="absolute inset-x-0 bottom-0 p-6">
          <h3 className="font-display text-3xl">{name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-snow/75">{copy}</p>
        </div>
      </div>
    </motion.li>
  );
}

export function Testimonials() {
  const rowA = testimonials.slice(0, 3);
  const rowB = testimonials.slice(3);
  return (
    <section aria-labelledby="reviews-title" className="relative overflow-hidden bg-parchment py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="reviews-title"
          align="center"
          eyebrow="Our trekkers speak"
          title="Stories from"
          accent="the trail."
        />
      </div>
      <div className="mt-16 space-y-6 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <ReviewRow items={rowA} />
        <ReviewRow items={rowB} reverse />
      </div>
    </section>
  );
}

function ReviewRow({ items, reverse }: { items: (typeof testimonials)[number][]; reverse?: boolean }) {
  return (
    <div className="group flex overflow-hidden">
      <ul
        className={`flex w-max gap-6 pr-6 group-hover:[animation-play-state:paused] ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {[...items, ...items, ...items, ...items].map((t, i) => (
          <li key={i} aria-hidden={i >= items.length} className="w-[22rem] shrink-0 rounded-3xl bg-snow p-7 ring-1 ring-ink/5 sm:w-[26rem]">
            <figure>
              <div className="flex items-center justify-between">
                <span className="flex gap-0.5 text-saffron" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="size-4 fill-current" aria-hidden="true" />
                  ))}
                </span>
                <Quote className="size-6 text-ink/15" aria-hidden="true" />
              </div>
              <blockquote className="mt-4 font-display text-lg leading-snug text-ink">“{t.quote}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 text-sm">
                <span className="grid size-10 place-items-center rounded-full bg-ink font-semibold text-snow">{t.name[0]}</span>
                <span>
                  <span className="block font-semibold text-ink">{t.name}</span>
                  <span className="text-charcoal/60">
                    {t.trek} · {t.city}
                  </span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}

