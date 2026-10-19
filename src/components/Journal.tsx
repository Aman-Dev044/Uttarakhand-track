"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Plus } from "lucide-react";
import { faqs, journal } from "@/data/content";
import { Reveal, SectionHeading, ease } from "./ui";

const dateFmt = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

export function Journal() {
  const [lead, ...rest] = journal;
  return (
    <section aria-labelledby="journal-title" className="grain relative bg-snow py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading id="journal-title" eyebrow="Fresh off the trails" title="The trail" accent="journal." />
          <a href="#" className="group inline-flex items-center gap-2 font-semibold text-ink">
            All stories
            <ArrowUpRight className="size-5 transition group-hover:rotate-45" aria-hidden="true" />
          </a>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Reveal as="article" className="group relative min-h-[28rem] overflow-hidden rounded-[2rem]">
            <Image src={lead.image} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition duration-[1.2s] group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8 text-snow">
              <Meta tag={lead.tag} date={lead.date} read={lead.read} light />
              <h3 className="mt-3 max-w-lg font-display text-3xl leading-tight sm:text-4xl">
                <a href="#" className="after:absolute after:inset-0">
                  {lead.title}
                </a>
              </h3>
            </div>
          </Reveal>

          <ul className="grid gap-6">
            {rest.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.08}>
                <article className="group relative flex gap-5 rounded-[1.75rem] bg-white p-4 ring-1 ring-ink/5 transition hover:ring-ink/15">
                  <div className="relative aspect-square w-28 shrink-0 overflow-hidden rounded-2xl sm:w-36">
                    <Image src={p.image} alt="" fill sizes="144px" className="object-cover transition duration-700 group-hover:scale-110" />
                  </div>
                  <div className="flex flex-col justify-center py-1">
                    <Meta tag={p.tag} date={p.date} read={p.read} />
                    <h3 className="mt-2 font-display text-xl leading-snug text-ink">
                      <a href="#" className="after:absolute after:inset-0">
                        {p.title}
                      </a>
                    </h3>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Meta({ tag, date, read, light }: { tag: string; date: string; read: number; light?: boolean }) {
  return (
    <p className={`flex flex-wrap items-center gap-3 text-xs ${light ? "text-snow/70" : "text-charcoal/60"}`}>
      <span className="rounded-full bg-saffron px-2.5 py-0.5 font-semibold text-ink">{tag}</span>
      <time dateTime={date}>{dateFmt.format(new Date(date))}</time>
      <span aria-hidden="true">·</span>
      {read} min read
    </p>
  );
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" aria-labelledby="faq-title" className="relative bg-parchment py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="faq-title"
            eyebrow="Before you pack"
            title="Questions,"
            accent="answered."
            description="Still unsure about altitude, fitness or permits? Our trek experts are one call or WhatsApp message away."
          />
        </div>
        <ul className="divide-y divide-ink/10 border-y border-ink/10">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q}>
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left font-display text-xl text-ink sm:text-2xl"
                  >
                    {f.q}
                    <span
                      className={`grid size-10 shrink-0 place-items-center rounded-full border border-ink/15 transition duration-500 ${
                        isOpen ? "rotate-45 bg-ink text-snow" : ""
                      }`}
                    >
                      <Plus className="size-5" aria-hidden="true" />
                    </span>
                  </button>
                </h3>
                {/* Answers stay in the DOM when collapsed so crawlers can read them */}
                <motion.div
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  inert={!isOpen}
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.5, ease }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-7 leading-relaxed text-charcoal/75">{f.a}</p>
                </motion.div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
