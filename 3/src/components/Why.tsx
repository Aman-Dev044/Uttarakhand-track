"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { pillars } from "@/data/content";
import { ease, FadeUp, Label, LineReveal } from "./ui";

export function Why() {
  return (
    <section id="why" aria-labelledby="why-title" className="bg-ice px-5 py-24 sm:px-10 sm:py-36">
      <div className="mx-auto grid max-w-[1600px] gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Label n="08">Why walk with us</Label>
          <LineReveal
            id="why-title"
            lines={["The mountain", "decides. We", "prepare."]}
            className="mt-8 font-display text-[2.6rem] font-semibold leading-[0.95] tracking-[-0.05em] sm:text-7xl"
          />
          <FadeUp>
            <p className="mt-8 max-w-md text-[17px] leading-relaxed text-slate-2">
              Weather and altitude set the rules above the tree line. What we control is the pace, the people and the
              plan, and we sweat all three.
            </p>
          </FadeUp>
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0 round 24px)" }}
            whileInView={{ clipPath: "inset(0 0 0% 0 round 24px)" }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 1.2, ease }}
            className="relative mt-10 hidden aspect-[16/10] overflow-hidden rounded-[24px] lg:block"
          >
            <Image src="/images/roopkund.jpg" alt="Trekkers with backpacks walking across a high meadow towards Roopkund" fill sizes="40vw" className="object-cover" />
          </motion.div>
        </div>

        <ol className="border-t border-slate/15">
          {pillars.map((p, i) => (
            <li key={p.title} className="border-b border-slate/15">
              <FadeUp className="grid grid-cols-[3rem_1fr] gap-4 py-10 sm:grid-cols-[5rem_1fr] sm:py-14">
                <span className="font-display text-[15px] font-medium tabular-nums text-alpine">0{i + 1}</span>
                <div>
                  <h3 className="font-display text-3xl font-semibold tracking-[-0.04em] text-slate sm:text-[2.6rem] sm:leading-[1.05]">
                    {p.title}
                  </h3>
                  <p className="mt-4 max-w-lg text-[17px] leading-relaxed text-slate-2">{p.copy}</p>
                </div>
              </FadeUp>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
