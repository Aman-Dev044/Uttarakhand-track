"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { adventures } from "@/data/content";
import { SectionHeading, TiltCard, ease } from "./ui";

const spans = ["lg:col-span-4", "lg:col-span-2", "lg:col-span-2", "lg:col-span-2", "lg:col-span-2", "lg:col-span-6"];
const heights = ["h-80 lg:h-[26rem]", "h-80 lg:h-[26rem]", "h-72", "h-72", "h-72", "h-72 lg:h-64"];

export function Adventures() {
  return (
    <section id="adventures" aria-labelledby="adventures-title" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          code="05"
          eyebrow="Beyond the trail"
          id="adventures-title"
          title={
            <>
              Rapids, ski slopes and <span className="text-aurora">tiger country.</span>
            </>
          }
          intro="Uttarakhand is more than its summits. Add a day of rafting to a Rishikesh pickup, ski at Auli between winter treks, or end with a safari in Corbett."
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {adventures.map((a, i) => (
            <motion.li
              key={a.key}
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.8, ease, delay: (i % 3) * 0.08 }}
              className={`${spans[i]} ${i === 0 || i === 5 ? "sm:col-span-2" : ""}`}
            >
              <TiltCard max={5} className="h-full rounded-[1.5rem]">
                <article className={`relative isolate flex ${heights[i]} flex-col justify-end overflow-hidden rounded-[1.5rem] border border-ice/10 p-6`}>
                  <Image
                    src={a.image}
                    alt={a.alt}
                    fill
                    sizes={i === 0 ? "(min-width: 1024px) 66vw, 100vw" : i === 5 ? "100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
                    className="-z-10 object-cover brightness-[.82] saturate-[.9] transition duration-[1.2s] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-night/40 to-night/0" />
                  {/* scan line on hover */}
                  <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-0 transition group-hover:opacity-100">
                    <div className="h-1/3 w-full animate-scan bg-gradient-to-b from-transparent via-glacier/10 to-transparent" />
                  </div>
                  <span className="absolute right-5 top-5 rounded-full border border-ice/20 bg-night/50 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ice/90 backdrop-blur">
                    Season · {a.spec}
                  </span>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-glacier">{a.place}</p>
                  <h3 className="mt-2 font-display text-xl font-semibold sm:text-2xl">{a.title}</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-ice/80">{a.copy}</p>
                </article>
              </TiltCard>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
