"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { adventures } from "@/data/content";
import { ease, FadeUp, Label, LineReveal } from "./ui";

// Asymmetric editorial grid: wide, narrow (dropped), narrow (lifted), wide
const layout = ["lg:col-span-7", "lg:col-span-5 lg:mt-40", "lg:col-span-5 lg:-mt-56", "lg:col-span-7"];
const ratios = ["aspect-[4/3]", "aspect-[4/5]", "aspect-[4/5]", "aspect-[4/3]"];

export function Adventures() {
  return (
    <section id="adventures" aria-labelledby="adv-title" className="bg-snow px-5 py-24 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <Label n="07">Beyond the trail</Label>
            <LineReveal
              id="adv-title"
              lines={["Rest days,", "done properly."]}
              className="mt-8 font-display text-[2.6rem] font-semibold leading-[0.95] tracking-[-0.05em] sm:text-7xl xl:text-[5.6rem]"
            />
          </div>
          <FadeUp>
            <p className="max-w-md text-[17px] leading-relaxed text-slate-2 lg:ml-auto">
              Add a river, a ski slope or a jungle to either end of your trek. Most of these are a short drive from the
              Dehradun pick-up.
            </p>
          </FadeUp>
        </div>

        <div className="mt-16 grid gap-x-10 gap-y-14 lg:mt-24 lg:grid-cols-12">
          {adventures.map((a, i) => (
            <article key={a.key} aria-labelledby={`adv-${a.key}`} className={layout[i]}>
              <motion.div
                initial={{ clipPath: "inset(18% 10% 18% 10% round 24px)" }}
                whileInView={{ clipPath: "inset(0% 0% 0% 0% round 24px)" }}
                viewport={{ once: true, margin: "0px 0px -12% 0px" }}
                transition={{ duration: 1.3, ease }}
                className={`group relative overflow-hidden rounded-[24px] bg-ice ${ratios[i]}`}
              >
                <motion.div
                  initial={{ scale: 1.25 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "0px 0px -12% 0px" }}
                  transition={{ duration: 1.8, ease }}
                  className="absolute inset-0"
                >
                  <Image
                    src={a.image}
                    alt={a.alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-glide)] group-hover:scale-105"
                  />
                </motion.div>
                <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-[12px] font-medium text-slate backdrop-blur-sm">
                  {a.when}
                </span>
              </motion.div>
              <FadeUp className="mt-6 grid gap-3 sm:grid-cols-[1fr_1.2fr] sm:gap-8">
                <div>
                  <p className="text-[13px] text-stone">{a.place}</p>
                  <h3 id={`adv-${a.key}`} className="mt-1 font-display text-3xl font-semibold tracking-[-0.04em] text-slate">
                    {a.title}
                  </h3>
                </div>
                <p className="text-[15px] leading-relaxed text-slate-2 sm:pt-6">{a.copy}</p>
              </FadeUp>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
