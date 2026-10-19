"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Mail, Phone, Radio } from "lucide-react";
import { months, treks } from "@/data/content";
import { site, telHref } from "@/data/site";
import { Eyebrow, Magnetic, ease } from "./ui";
import { Select } from "./Select";
import { Starfield } from "./Starfield";

const trekOptions = [...treks.map((t) => t.name), "Char Dham Yatra", "Rafting / skiing / safari add-on", "Help me choose"].map((v) => ({ value: v, label: v }));
const monthOptions = [...months.map((m) => ({ value: m, label: m })), { value: "Flexible", label: "Flexible" }];

export function Plan() {
  const [sent, setSent] = useState(false);
  const [trek, setTrek] = useState("");
  const [month, setMonth] = useState("");

  // Frontend only: connect this to your CRM or email API
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  const field =
    "w-full rounded-xl border border-ice/15 bg-ice/[0.04] px-4 py-3.5 text-sm text-ice placeholder:text-ice/45 outline-none transition hover:border-ice/30 focus:border-glacier focus:bg-glacier/10 focus:shadow-[0_0_0_4px_rgb(127_227_255/0.12)]";

  return (
    <section id="plan" aria-labelledby="plan-title" className="relative isolate overflow-hidden py-20 sm:py-28">
      <Starfield density={0.6} className="-z-10" />
      <div className="aurora -z-10 opacity-40" aria-hidden="true" />
      <div className="mx-auto grid max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <Eyebrow code="11">Mission control</Eyebrow>
          <h2 id="plan-title" className="mt-5 font-display text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl">
            Ready when the <span className="text-aurora">mountains are.</span>
          </h2>
          <p className="mt-6 max-w-md text-mist">
            Share your dates and comfort level. A trek expert from our Dehradun desk calls back with the right route,
            batch and a training plan, free.
          </p>
          <ul className="mt-10 space-y-3">
            {site.phones.map((p) => (
              <li key={p}>
                <a href={telHref(p)} className="group inline-flex items-center gap-4 font-mono text-lg">
                  <span className="grid size-11 place-items-center rounded-full border border-ice/15 transition group-hover:border-volt group-hover:text-volt">
                    <Phone className="size-4" aria-hidden="true" />
                  </span>
                  {p}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${site.email}`} className="group inline-flex items-center gap-4 font-mono text-base sm:text-lg">
                <span className="grid size-11 place-items-center rounded-full border border-ice/15 transition group-hover:border-volt group-hover:text-volt">
                  <Mail className="size-4" aria-hidden="true" />
                </span>
                {site.email}
              </a>
            </li>
          </ul>
        </div>

        <div className="glass relative rounded-[1.75rem] p-6 sm:p-8">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="done"
                role="status"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease }}
                className="flex min-h-[27rem] flex-col items-center justify-center text-center"
              >
                <span className="relative grid size-16 place-items-center rounded-full bg-volt text-night">
                  <span className="absolute inset-0 animate-pulse-ring rounded-full bg-volt/60" />
                  <Radio className="relative size-7" aria-hidden="true" />
                </span>
                <p className="mt-6 font-display text-2xl font-semibold">Signal received. Namaste!</p>
                <p className="mt-3 max-w-sm text-sm text-mist">A trek expert will call you shortly to plan the climb.</p>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={submit} exit={{ opacity: 0, y: -10 }} className="grid gap-4 sm:grid-cols-2">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mist sm:col-span-2">Request a free callback</p>
                <label className="sm:col-span-2">
                  <span className="sr-only">Full name</span>
                  <input required name="name" autoComplete="name" placeholder="Full name" className={field} />
                </label>
                <label>
                  <span className="sr-only">Phone or WhatsApp</span>
                  <input required name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="Phone / WhatsApp" className={field} />
                </label>
                <label>
                  <span className="sr-only">Email</span>
                  <input name="email" type="email" autoComplete="email" placeholder="Email (optional)" className={field} />
                </label>
                <Select name="trek" label="Trek or trip" placeholder="Trek or trip" value={trek} onChange={setTrek} options={trekOptions} />
                <Select name="month" label="Preferred month" placeholder="Preferred month" value={month} onChange={setMonth} options={monthOptions} />
                <label className="sm:col-span-2">
                  <span className="sr-only">Message</span>
                  <textarea name="message" rows={3} placeholder="Group size, experience, questions…" className={field} />
                </label>
                <Magnetic strength={0.15} className="sm:col-span-2">
                  <button
                    type="submit"
                    className="group flex w-full items-center justify-center gap-3 rounded-full bg-volt py-4 font-semibold text-night transition hover:bg-volt-2"
                  >
                    Send my plan request
                    <ArrowRight className="size-5 transition group-hover:translate-x-1" aria-hidden="true" />
                  </button>
                </Magnetic>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
