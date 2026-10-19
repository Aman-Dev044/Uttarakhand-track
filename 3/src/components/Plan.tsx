"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { monthNames, treks } from "@/data/content";
import { site, telHref } from "@/data/site";
import { Arrow, ease, Label, LineReveal, Magnetic, PICK_TREK_EVENT } from "./ui";
import { Select } from "./Select";

const trekOptions = ["Char Dham Yatra", ...treks.map((t) => t.name), "Not sure yet"].map((v) => ({ value: v, label: v }));
const monthOptions = [...monthNames.map((m) => ({ value: m, label: m })), { value: "Flexible", label: "Flexible" }];

export function Plan() {
  const [sent, setSent] = useState(false);
  const [trek, setTrek] = useState("");
  const [month, setMonth] = useState("");

  // "Plan this trek" buttons elsewhere on the page pre-fill the form
  useEffect(() => {
    const onPick = (e: Event) => {
      const name = (e as CustomEvent<string>).detail;
      if (trekOptions.some((o) => o.value === name)) setTrek(name);
      setSent(false);
    };
    window.addEventListener(PICK_TREK_EVENT, onPick);
    return () => window.removeEventListener(PICK_TREK_EVENT, onPick);
  }, []);

  // Frontend only: connect this to your CRM or email API
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  const field =
    "w-full rounded-xl border border-frost bg-white px-4 py-3.5 text-slate outline-none transition placeholder:text-stone/70 hover:border-stone/60 focus:border-slate focus:shadow-[0_0_0_4px_rgba(15,23,32,0.06)]";

  return (
    <section id="plan" aria-labelledby="plan-title" className="bg-ice px-5 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto grid max-w-[1600px] gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ clipPath: "inset(0 0 0 100% round 28px)" }}
          whileInView={{ clipPath: "inset(0 0 0 0% round 28px)" }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ duration: 1.3, ease }}
          className="relative flex min-h-[30rem] flex-col justify-end overflow-hidden rounded-[28px] p-6 text-snow sm:p-10"
        >
          <Image
            src="/images/kedarkantha.jpg"
            alt="Kedarkantha summit above snow and red-leaved forest"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate/85 via-slate/30 to-transparent" />
          <div className="relative">
            <Label n="11" light>
              Plan your trek
            </Label>
            <LineReveal
              id="plan-title"
              lines={["Tell us when.", "We’ll find the trail."]}
              className="mt-6 font-display text-[2.4rem] font-semibold leading-[0.95] tracking-[-0.05em] sm:text-6xl"
            />
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[15px] text-snow/85">
              {site.phones.map((p) => (
                <li key={p}>
                  <a href={telHref(p)} className="hover:text-white">
                    {p}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-white">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </motion.div>

        <div className="rounded-[28px] bg-white p-6 sm:p-10">
          <AnimatePresence mode="wait" initial={false}>
            {sent ? (
              <motion.div
                key="done"
                role="status"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease }}
                className="flex min-h-[28rem] flex-col justify-center"
              >
                <svg viewBox="0 0 48 48" className="size-14" aria-hidden="true">
                  <motion.circle
                    cx="24"
                    cy="24"
                    r="22"
                    fill="none"
                    stroke="#e0482f"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, ease }}
                  />
                  <motion.path
                    d="M15 24.5 21.5 31 33 18"
                    fill="none"
                    stroke="#0f1720"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, ease, delay: 0.6 }}
                  />
                </svg>
                <p className="mt-8 font-display text-4xl font-semibold tracking-[-0.04em] text-slate">Request received.</p>
                <p className="mt-3 max-w-sm text-[17px] leading-relaxed text-slate-2">
                  A trek leader will call you back with dates, a fitness plan and a quote.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-8 w-fit text-[15px] font-medium text-slate underline decoration-frost decoration-2 underline-offset-[6px] hover:decoration-alpine"
                >
                  Send another request
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={submit}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="grid gap-4 sm:grid-cols-2"
              >
                <p className="font-display text-2xl font-semibold tracking-[-0.03em] text-slate sm:col-span-2">Request a free callback</p>
                <p className="-mt-2 mb-2 text-[15px] text-stone sm:col-span-2">
                  No payment, no obligation. Just a conversation about the right trek.
                </p>
                <label className="sm:col-span-2">
                  <span className="sr-only">Full name</span>
                  <input required name="name" autoComplete="name" placeholder="Full name" className={field} />
                </label>
                <label>
                  <span className="sr-only">Phone or WhatsApp</span>
                  <input
                    required
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="Phone / WhatsApp"
                    className={field}
                  />
                </label>
                <label>
                  <span className="sr-only">Email</span>
                  <input name="email" type="email" autoComplete="email" placeholder="Email (optional)" className={field} />
                </label>
                <Select name="trek" label="Trek or yatra" placeholder="Trek or yatra" value={trek} onChange={setTrek} options={trekOptions} />
                <Select
                  name="month"
                  label="Preferred month"
                  placeholder="Preferred month"
                  value={month}
                  onChange={setMonth}
                  options={monthOptions}
                />
                <label className="sm:col-span-2">
                  <span className="sr-only">Message</span>
                  <textarea name="message" rows={4} placeholder="Group size, experience, questions…" className={`${field} resize-none`} />
                </label>
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2 sm:col-span-2">
                  <p className="text-[13px] text-stone">Your details are only used to plan your trek.</p>
                  <Magnetic>
                    <button
                      type="submit"
                      className="group inline-flex items-center gap-3 rounded-full bg-slate py-4 pl-7 pr-6 text-[15px] font-medium text-snow transition-colors hover:bg-alpine"
                    >
                      Get my trek plan
                      <Arrow className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </Magnetic>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
