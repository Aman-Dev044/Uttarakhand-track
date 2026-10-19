"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Plus } from "lucide-react";
import { faqs } from "@/data/content";
import { SectionHeading, ease } from "./ui";

export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" aria-labelledby="faq-title" className="relative py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[22rem_1fr]">
        <SectionHeading
          code="10"
          eyebrow="FAQs"
          id="faq-title"
          title="Questions before you pack."
          intro="Still unsure? The callback form below reaches a trek expert in Dehradun."
          className="lg:sticky lg:top-28 lg:self-start"
        />
        <ul className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q} className={`rounded-2xl border transition ${isOpen ? "border-glacier/40 bg-glacier/[0.05]" : "border-ice/10 bg-ice/[0.02]"}`}>
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-start gap-4 p-5 text-left sm:p-6"
                  >
                    <span className="pt-1 font-mono text-[11px] text-mist">{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex-1 font-display text-base font-semibold sm:text-lg">{f.q}</span>
                    <Plus className={`mt-1 size-5 shrink-0 transition duration-300 ${isOpen ? "rotate-45 text-volt" : "text-mist"}`} aria-hidden="true" />
                  </button>
                </h3>
                <motion.div
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.4, ease }}
                  className="overflow-hidden"
                  inert={!isOpen}
                >
                  <p className="px-5 pb-6 pl-14 text-sm leading-relaxed text-mist sm:px-6 sm:pl-[3.75rem]">{f.a}</p>
                </motion.div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
