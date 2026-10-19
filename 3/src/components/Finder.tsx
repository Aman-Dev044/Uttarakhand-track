"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, RotateCcw, Mountain } from "lucide-react";
import { grades, months, treks, type State, type Trek } from "@/data/content";
import { SectionHeading, ease, ft, inr } from "./ui";
import { Select } from "./Select";

type Fitness = "first" | "regular" | "seasoned";
type Days = "short" | "mid" | "long";
type Answers = { fitness?: Fitness; days?: Days; month: string; region: State | "any" };

const fitnessOptions: { value: Fitness; title: string; copy: string; ideal: [number, number]; max: number }[] = [
  { value: "first", title: "First Himalayan trek", copy: "I walk and jog a little. No high-altitude experience yet.", ideal: [0, 1], max: 1 },
  { value: "regular", title: "Fit and keen", copy: "I can run 5 km in under 35 minutes and have done a trek or two.", ideal: [1, 3], max: 3 },
  { value: "seasoned", title: "Seasoned trekker", copy: "I've slept above 14,000 ft and want a real challenge.", ideal: [3, 4], max: 4 },
];

const dayOptions: { value: Days; title: string; copy: string; range: [number, number] }[] = [
  { value: "short", title: "Up to 5 days", copy: "A long weekend plus a day or two.", range: [0, 4] },
  { value: "mid", title: "6 to 7 days", copy: "A full week in the mountains.", range: [5, 6] },
  { value: "long", title: "8 days or more", copy: "Time for the big crossings.", range: [7, 99] },
];

const monthOptions = [{ value: "any", label: "Any month works" }, ...months.map((m, i) => ({ value: String(i + 1), label: m }))];
const regionOptions = [
  { value: "any", label: "Anywhere" },
  { value: "Uttarakhand", label: "Uttarakhand" },
  { value: "Himachal", label: "Himachal" },
  { value: "Kashmir", label: "Kashmir" },
];

const camps = ["Base", "Camp 1", "Camp 2", "Summit"];

function score(t: Trek, a: Answers) {
  const g = grades.indexOf(t.grade);
  const fit = fitnessOptions.find((f) => f.value === a.fitness);
  const day = dayOptions.find((d) => d.value === a.days);
  let s = 0;
  if (fit) s += g >= fit.ideal[0] && g <= fit.ideal[1] ? 40 : g <= fit.max ? 25 : 0;
  if (day) {
    const [lo, hi] = day.range;
    s += t.nights >= lo && t.nights <= hi ? 25 : Math.abs(t.nights - (t.nights < lo ? lo : hi)) <= 1 ? 12 : 0;
  }
  s += a.month === "any" || t.months.includes(Number(a.month)) ? 25 : 0;
  s += a.region === "any" || t.state === a.region ? 10 : 0;
  return s;
}

function Choice<T extends string>({
  name,
  value,
  current,
  onPick,
  title,
  copy,
  index,
}: {
  name: string;
  value: T;
  current?: T;
  onPick: (v: T) => void;
  title: string;
  copy: string;
  index: number;
}) {
  const checked = current === value;
  return (
    <label
      className={`relative flex cursor-pointer flex-col rounded-2xl border p-5 transition has-[:focus-visible]:border-volt ${
        checked ? "border-glacier bg-glacier/10" : "border-ice/10 bg-ice/[0.03] hover:border-ice/25"
      }`}
    >
      <input type="radio" name={name} value={value} checked={checked} onChange={() => onPick(value)} className="sr-only" />
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-mist">Option 0{index + 1}</span>
      <span className="mt-3 font-display text-lg font-semibold">{title}</span>
      <span className="mt-1.5 text-sm text-mist">{copy}</span>
      <span
        aria-hidden="true"
        className={`absolute right-4 top-4 size-4 rounded-full border transition ${checked ? "border-volt bg-volt shadow-[0_0_12px_#c8ff3a]" : "border-ice/30"}`}
      />
    </label>
  );
}

export function Finder() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [a, setA] = useState<Answers>({ month: "any", region: "any" });

  const results = useMemo(
    () =>
      treks
        .map((t) => ({ t, s: score(t, a) }))
        .sort((x, y) => y.s - x.s || x.t.price - y.t.price)
        .slice(0, 3),
    [a],
  );

  const canNext = (step === 0 && a.fitness) || (step === 1 && a.days) || step === 2;
  const go = (n: number) => {
    setDir(n > step ? 1 : -1);
    setStep(n);
  };

  return (
    <section id="finder" aria-labelledby="finder-title" className="relative overflow-hidden py-20 sm:py-28">
      <div className="hud-grid absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          code="01"
          eyebrow="Trek finder"
          id="finder-title"
          title={
            <>
              Four questions. <span className="text-aurora">One right trail.</span>
            </>
          }
          intro="Tell us how fit you are, how long you have, when you can travel and where. We score every trek we run against your answers."
        />

        <div className="glass mt-12 rounded-[1.75rem] p-5 sm:p-8">
          {/* Camp progress */}
          <ol className="flex items-center gap-2 sm:gap-3" aria-label="Progress">
            {camps.map((c, i) => (
              <li key={c} className="flex flex-1 items-center gap-2 sm:gap-3" aria-current={i === step ? "step" : undefined}>
                <span
                  className={`grid size-7 shrink-0 place-items-center rounded-full border font-mono text-[10px] transition ${
                    i < step ? "border-teal bg-teal text-night" : i === step ? "border-volt text-volt" : "border-ice/20 text-mist"
                  }`}
                >
                  {i === camps.length - 1 ? <Mountain className="size-3.5" aria-hidden="true" /> : i}
                </span>
                <span className={`hidden font-mono text-[10px] uppercase tracking-[0.18em] md:block ${i === step ? "text-ice" : "text-mist"}`}>{c}</span>
                {i < camps.length - 1 && (
                  <span className="relative h-px flex-1 bg-ice/15">
                    <motion.span
                      className="absolute inset-0 origin-left bg-gradient-to-r from-teal to-glacier"
                      animate={{ scaleX: i < step ? 1 : 0 }}
                      transition={{ duration: 0.6, ease }}
                    />
                  </span>
                )}
              </li>
            ))}
          </ol>

          <div className="relative mt-8 min-h-[22rem]">
            <AnimatePresence mode="wait" custom={dir} initial={false}>
              <motion.div
                key={step}
                custom={dir}
                initial={{ opacity: 0, x: dir * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -40 }}
                transition={{ duration: 0.35, ease }}
              >
                {step === 0 && (
                  <fieldset>
                    <legend className="font-display text-xl font-semibold sm:text-2xl">How trail-ready are you?</legend>
                    <div className="mt-6 grid gap-3 md:grid-cols-3">
                      {fitnessOptions.map((o, i) => (
                        <Choice key={o.value} name="fitness" index={i} value={o.value} current={a.fitness} title={o.title} copy={o.copy} onPick={(v) => setA({ ...a, fitness: v })} />
                      ))}
                    </div>
                  </fieldset>
                )}
                {step === 1 && (
                  <fieldset>
                    <legend className="font-display text-xl font-semibold sm:text-2xl">How many days can you give the mountains?</legend>
                    <div className="mt-6 grid gap-3 md:grid-cols-3">
                      {dayOptions.map((o, i) => (
                        <Choice key={o.value} name="days" index={i} value={o.value} current={a.days} title={o.title} copy={o.copy} onPick={(v) => setA({ ...a, days: v })} />
                      ))}
                    </div>
                  </fieldset>
                )}
                {step === 2 && (
                  <div>
                    <p className="font-display text-xl font-semibold sm:text-2xl">When and where?</p>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <Select variant="hud" label="Travel month" value={a.month} onChange={(v) => setA({ ...a, month: v })} options={monthOptions} />
                      <Select
                        variant="hud"
                        label="Region"
                        value={a.region}
                        onChange={(v) => setA({ ...a, region: v as Answers["region"] })}
                        options={regionOptions}
                      />
                    </div>
                    <p className="mt-6 max-w-lg text-sm text-mist">
                      Snow treks run December to April, high passes open in May–June and again after the monsoon, and the
                      flower valleys peak in July–August.
                    </p>
                  </div>
                )}
                {step === 3 && (
                  <div aria-live="polite">
                    <p className="font-display text-xl font-semibold sm:text-2xl">Your best matches</p>
                    <ol className="mt-6 grid gap-4 md:grid-cols-3">
                      {results.map(({ t, s }, i) => (
                        <motion.li
                          key={t.slug}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1, duration: 0.5, ease }}
                          className="overflow-hidden rounded-2xl border border-ice/10 bg-night-2/60"
                        >
                          <div className="relative aspect-[16/10]">
                            <Image src={t.image} alt={`${t.name} trek, ${t.region}`} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                            <span className="absolute left-3 top-3 rounded-full bg-night/80 px-2.5 py-1 font-mono text-[11px] text-volt backdrop-blur">
                              {s}% match
                            </span>
                          </div>
                          <div className="p-4">
                            <h3 className="font-display text-base font-semibold">{t.name}</h3>
                            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-mist">
                              {ft(t.altitudeFt)} · {t.nights + 1}D/{t.nights}N · {t.grade}
                            </p>
                            <p className="mt-3 text-sm text-ice/80">{t.note}</p>
                            <p className="mt-3 font-mono text-sm text-glacier">from {inr(t.price)}</p>
                          </div>
                        </motion.li>
                      ))}
                    </ol>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-ice/10 pt-6">
            <button
              type="button"
              onClick={() => (step === 3 ? (setA({ month: "any", region: "any" }), go(0)) : go(Math.max(0, step - 1)))}
              disabled={step === 0}
              className="inline-flex items-center gap-2 rounded-full border border-ice/15 px-4 py-2.5 text-sm text-ice transition hover:border-ice/40 disabled:opacity-30"
            >
              {step === 3 ? <RotateCcw className="size-4" aria-hidden="true" /> : <ArrowLeft className="size-4" aria-hidden="true" />}
              {step === 3 ? "Start over" : "Back"}
            </button>
            {step < 3 ? (
              <button
                type="button"
                onClick={() => go(step + 1)}
                disabled={!canNext}
                className="inline-flex items-center gap-2 rounded-full bg-volt px-5 py-2.5 text-sm font-semibold text-night transition hover:bg-volt-2 disabled:bg-ice/15 disabled:text-mist"
              >
                {step === 2 ? "Show my treks" : "Next camp"}
                <ArrowRight className="size-4" aria-hidden="true" />
              </button>
            ) : (
              <a href="#compare" className="inline-flex items-center gap-2 rounded-full bg-volt px-5 py-2.5 text-sm font-semibold text-night">
                Compare every trek
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
