"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Phone } from "lucide-react";
import { faqs } from "@/data/content";
import { site, telHref } from "@/data/site";
import { Bell, SectionTitle, ease } from "./ui";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" aria-labelledby="faq-title" className="paper relative bg-ivory py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionTitle
            id="faq-title"
            align="left"
            hindi="प्रश्न उत्तर"
            eyebrow="Questions pilgrims ask"
            title={
              <>
                Before you <em className="text-kumkum">set out</em>
              </>
            }
            lede="Registration, helicopters, travelling with parents and which trek to choose. If your question isn't here, call us."
          />
          <div className="mt-8 flex items-center gap-5">
            <Bell className="h-16 w-10 text-brass" />
            <a href={telHref(site.phones[0])} className="group inline-flex items-center gap-3 rounded-full bg-maroon px-5 py-3 font-semibold text-ivory transition hover:bg-kumkum">
              <Phone className="size-4" aria-hidden="true" />
              {site.phones[0]}
            </a>
          </div>
        </div>

        <ul className="divide-y divide-sandstone border-y border-sandstone">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            const id = `faq-${i}`;
            return (
              <li key={f.q}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={id}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-start justify-between gap-6 py-6 text-left"
                  >
                    <span className={`font-display text-2xl font-semibold leading-snug transition-colors ${isOpen ? "text-kumkum" : "text-maroon-deep"}`}>{f.q}</span>
                    <span className="relative mt-2 size-4 shrink-0" aria-hidden="true">
                      <span className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-brass" />
                      <span className={`absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-brass transition-transform duration-300 ${isOpen ? "scale-y-0" : ""}`} />
                    </span>
                  </button>
                </h3>
                <motion.div
                  id={id}
                  role="region"
                  aria-label={f.q}
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.5, ease }}
                  className="overflow-hidden"
                  inert={!isOpen}
                >
                  <p className="max-w-2xl pb-6 text-lg leading-relaxed text-clay">{f.a}</p>
                </motion.div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
