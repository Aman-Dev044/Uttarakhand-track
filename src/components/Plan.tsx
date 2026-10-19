"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, CheckCircle2, Mail, Phone } from "lucide-react";
import { site, telHref } from "@/data/site";
import { treks } from "@/data/content";
import { ease } from "./ui";
import { Select } from "./Select";

const trekOptions = ["Char Dham Yatra", ...treks.map((t) => t.name), "Not sure yet"].map((v) => ({ value: v, label: v }));

export function Plan() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const [sent, setSent] = useState(false);
  const [trek, setTrek] = useState("");

  // Frontend only: wire this to your CRM or email API
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  const input =
    "w-full rounded-2xl border border-snow/15 bg-snow/5 px-4 py-3.5 text-snow placeholder:text-snow/40 outline-none transition focus:border-saffron focus:bg-snow/10";

  return (
    <section id="plan" ref={ref} aria-labelledby="plan-title" className="relative isolate overflow-hidden bg-ink py-24 text-snow sm:py-32">
      <motion.div style={{ y }} className="absolute -inset-y-[20%] inset-x-0 -z-10">
        <Image src="/images/hero-2.jpg" alt="" fill sizes="100vw" className="object-cover opacity-40" />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />

      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-saffron-2">Plan with a trek expert</p>
          <h2 id="plan-title" className="mt-5 font-display text-5xl leading-[1] tracking-tight sm:text-7xl">
            The mountains are <em className="font-light italic text-saffron-2">calling.</em>
          </h2>
          <p className="mt-6 max-w-lg text-lg text-snow/75">
            Tell us when you&apos;re free and how adventurous you feel. We&apos;ll suggest the right trek, batch and
            fitness plan, at no cost.
          </p>
          <ul className="mt-10 space-y-4">
            {site.phones.map((p) => (
              <li key={p}>
                <a href={telHref(p)} className="group inline-flex items-center gap-4 text-xl">
                  <span className="grid size-12 place-items-center rounded-full bg-snow/10 transition group-hover:bg-saffron group-hover:text-ink">
                    <Phone className="size-5" aria-hidden="true" />
                  </span>
                  {p}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${site.email}`} className="group inline-flex items-center gap-4 text-xl">
                <span className="grid size-12 place-items-center rounded-full bg-snow/10 transition group-hover:bg-saffron group-hover:text-ink">
                  <Mail className="size-5" aria-hidden="true" />
                </span>
                {site.email}
              </a>
            </li>
          </ul>
        </div>

        <div className="relative rounded-[2rem] bg-ink/60 p-6 ring-1 ring-snow/15 backdrop-blur-xl sm:p-10">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease }}
                className="flex min-h-[26rem] flex-col items-center justify-center text-center"
                role="status"
              >
                <CheckCircle2 className="size-16 text-moss" aria-hidden="true" />
                <p className="mt-6 font-display text-3xl">Namaste! We&apos;ve got your request.</p>
                <p className="mt-3 max-w-sm text-snow/70">A trek expert will call you shortly to plan your Himalayan journey.</p>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={submit} exit={{ opacity: 0, y: -10 }} className="grid gap-4 sm:grid-cols-2">
                <p className="font-display text-2xl sm:col-span-2">Request a free callback</p>
                <label className="sm:col-span-2">
                  <span className="sr-only">Full name</span>
                  <input required name="name" autoComplete="name" placeholder="Full name" className={input} />
                </label>
                <label>
                  <span className="sr-only">Phone number</span>
                  <input required name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="Phone / WhatsApp" className={input} />
                </label>
                <label>
                  <span className="sr-only">Email</span>
                  <input name="email" type="email" autoComplete="email" placeholder="Email (optional)" className={input} />
                </label>
                <Select name="trek" label="Trek or yatra" placeholder="Trek or yatra" value={trek} onChange={setTrek} options={trekOptions} />
                <label>
                  <span className="sr-only">Group size</span>
                  <input name="group" type="number" min={1} max={40} placeholder="Group size" className={input} />
                </label>
                <label className="sm:col-span-2">
                  <span className="sr-only">Message</span>
                  <textarea name="message" rows={3} placeholder="Preferred month, experience level, questions…" className={input} />
                </label>
                <button
                  type="submit"
                  className="group flex items-center justify-center gap-3 rounded-full bg-saffron py-4 font-semibold text-ink transition hover:bg-saffron-2 sm:col-span-2"
                >
                  Get my trek plan
                  <ArrowRight className="size-5 transition group-hover:translate-x-1" aria-hidden="true" />
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
