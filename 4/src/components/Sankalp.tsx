"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { monthNames, treks } from "@/data/content";
import { site, telHref } from "@/data/site";
import { ENQUIRE_EVENT, FINDER_EVENT, journeyLabels, type FinderDetail } from "@/lib/events";
import { Diya, Mandala, ease } from "./ui";
import { Select } from "./Select";

const journeyOptions = [journeyLabels["char-dham"], journeyLabels["do-dham"], ...treks.map((t) => t.name), "Not sure yet"].map((v) => ({
  value: v,
  label: v,
}));
const monthOptions = [{ value: "Flexible", label: "Flexible" }, ...monthNames.map((m) => ({ value: m, label: m }))];

export function Sankalp() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-45, 90]);
  const [sent, setSent] = useState(false);
  const [journey, setJourney] = useState("");
  const [month, setMonth] = useState("");

  useEffect(() => {
    const onFinder = (e: Event) => {
      const d = (e as CustomEvent<FinderDetail>).detail;
      if (d.journey === "char-dham" || d.journey === "do-dham") {
        setJourney(journeyLabels[d.journey]);
        if (d.month) setMonth(monthNames[d.month - 1]);
      }
    };
    const onEnquire = (e: Event) => setJourney((e as CustomEvent<string>).detail);
    window.addEventListener(FINDER_EVENT, onFinder);
    window.addEventListener(ENQUIRE_EVENT, onEnquire);
    return () => {
      window.removeEventListener(FINDER_EVENT, onFinder);
      window.removeEventListener(ENQUIRE_EVENT, onEnquire);
    };
  }, []);

  // Frontend only: connect this to your CRM or email service
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  const field =
    "w-full rounded-xl border border-sandstone bg-ivory px-4 py-3 text-umber placeholder:text-clay/70 outline-none transition hover:border-brass focus:border-saffron focus:ring-2 focus:ring-marigold/30";

  return (
    <section id="sankalp" ref={ref} aria-labelledby="sankalp-title" className="aipan relative isolate overflow-hidden bg-maroon-deep py-24 text-ivory sm:py-32">
      <motion.div style={{ rotate }} className="pointer-events-none absolute -left-52 top-1/2 -z-10 size-[44rem] -translate-y-1/2 text-marigold/[0.12]" aria-hidden="true">
        <Mandala className="size-full" />
      </motion.div>
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-8 lg:grid-cols-[.9fr_1.1fr]">
        <div>
          <p className="font-deva text-3xl text-marigold" lang="hi">
            संकल्प
          </p>
          <h2 id="sankalp-title" className="mt-4 font-display text-5xl leading-[1.02] sm:text-7xl">
            Take the <em className="gilded">sankalp.</em>
            <br />
            We&apos;ll plan the rest.
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ivory/75">
            Tell us who is travelling and when. A yatra planner from {site.address.locality} will call you back with a
            route, dates and a clear price, free of charge.
          </p>
          <ul className="mt-10 space-y-4">
            {site.phones.map((p) => (
              <li key={p}>
                <a href={telHref(p)} className="group inline-flex items-center gap-4 text-xl">
                  <span className="grid size-12 place-items-center rounded-full ring-1 ring-brass-light/40 transition group-hover:bg-marigold group-hover:text-maroon-deep">
                    <Phone className="size-5" aria-hidden="true" />
                  </span>
                  {p}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${site.email}`} className="group inline-flex items-center gap-4 text-lg break-all sm:text-xl">
                <span className="grid size-12 shrink-0 place-items-center rounded-full ring-1 ring-brass-light/40 transition group-hover:bg-marigold group-hover:text-maroon-deep">
                  <Mail className="size-5" aria-hidden="true" />
                </span>
                {site.email}
              </a>
            </li>
          </ul>
        </div>

        <div className="relative rounded-[2rem] border-[6px] border-brass-light/60 bg-ivory p-6 text-umber shadow-2xl shadow-night/50 sm:p-10">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease }}
                className="flex min-h-[28rem] flex-col items-center justify-center text-center"
                role="status"
              >
                <Diya className="size-24" />
                <p className="mt-4 font-display text-4xl text-maroon-deep">Dhanyavaad!</p>
                <p className="mt-3 max-w-sm text-clay">Your request has reached us. A yatra planner will call you shortly.</p>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={submit} exit={{ opacity: 0, y: -10 }} className="grid gap-4 sm:grid-cols-2">
                <p className="font-display text-3xl font-semibold text-maroon-deep sm:col-span-2">Request a free yatra plan</p>
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
                <Select name="journey" label="Yatra or trek" placeholder="Yatra or trek" value={journey} onChange={setJourney} options={journeyOptions} />
                <Select name="month" label="Travel month" placeholder="Travel month" value={month} onChange={setMonth} options={monthOptions} />
                <label>
                  <span className="sr-only">Number of travellers</span>
                  <input name="travellers" type="number" min={1} max={60} placeholder="Travellers" className={field} />
                </label>
                <label>
                  <span className="sr-only">Age of the eldest traveller</span>
                  <input name="eldest" type="number" min={1} max={100} placeholder="Eldest traveller's age" className={field} />
                </label>
                <label className="sm:col-span-2">
                  <span className="sr-only">Message</span>
                  <textarea name="message" rows={3} placeholder="Helicopter for Kedarnath? Special needs? Tell us anything." className={field} />
                </label>
                <button
                  type="submit"
                  className="group flex items-center justify-center gap-3 rounded-full bg-kumkum py-4 font-semibold text-ivory shadow-lg shadow-kumkum/30 transition hover:bg-maroon sm:col-span-2"
                >
                  Send my request
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
