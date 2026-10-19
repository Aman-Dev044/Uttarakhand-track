"use client";

import { useState } from "react";
import { faqs } from "@/data/content";
import { site, telHref } from "@/data/site";
import { FadeUp, Label, LineReveal } from "./ui";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-snow px-5 pb-24 sm:px-10 sm:pb-36">
      <div className="mx-auto grid max-w-[1600px] gap-14 border-t border-frost pt-24 sm:pt-36 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Label n="10">Questions</Label>
          <LineReveal
            id="faq-title"
            lines={["Asked before", "almost every trek."]}
            className="mt-8 font-display text-[2.6rem] font-semibold leading-[0.95] tracking-[-0.05em] sm:text-6xl"
          />
          <FadeUp>
            <p className="mt-8 max-w-sm text-[17px] leading-relaxed text-slate-2">
              Something else on your mind? Call{" "}
              <a
                href={telHref(site.phones[0])}
                className="whitespace-nowrap font-medium text-slate underline decoration-frost decoration-2 underline-offset-4 hover:decoration-alpine"
              >
                {site.phones[0]}
              </a>{" "}
              and talk to a trek leader, not a call centre.
            </p>
          </FadeUp>
        </div>

        <ul className="border-t border-slate">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q} className="border-b border-frost">
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-start justify-between gap-6 py-6 text-left sm:py-8"
                  >
                    <span
                      className={`font-display text-xl font-semibold tracking-[-0.03em] transition-colors sm:text-[1.7rem] sm:leading-tight ${
                        isOpen ? "text-slate" : "text-slate-2 group-hover:text-slate"
                      }`}
                    >
                      {f.q}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`relative mt-1 grid size-8 shrink-0 place-items-center rounded-full transition-colors duration-300 ${
                        isOpen ? "bg-alpine text-white" : "bg-ice text-slate"
                      }`}
                    >
                      <span className="absolute h-[1.5px] w-3 bg-current" />
                      <span className={`absolute h-3 w-[1.5px] bg-current transition-transform duration-300 ${isOpen ? "scale-y-0" : ""}`} />
                    </span>
                  </button>
                </h3>
                {/* Answers stay in the DOM for search engines; the grid-rows trick animates the height */}
                <div
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  inert={!isOpen}
                  className={`grid transition-[grid-template-rows] duration-500 ease-[var(--ease-glide)] ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-8 pr-12 text-[17px] leading-relaxed text-slate-2">{f.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
