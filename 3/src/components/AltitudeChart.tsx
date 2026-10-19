"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { treks } from "@/data/content";
import { SectionHeading, ease, inr } from "./ui";

type Metric = "altitudeFt" | "price" | "nights";

const metrics: { key: Metric; label: string; min: number; max: number; ticks: number[]; fmt: (v: number) => string }[] = [
  { key: "altitudeFt", label: "Altitude", min: 11000, max: 16600, ticks: [12000, 13000, 14000, 15000, 16000], fmt: (v) => `${(v / 1000).toFixed(v % 1000 ? 1 : 0)}k ft` },
  { key: "price", label: "Price", min: 4000, max: 22000, ticks: [5000, 10000, 15000, 20000], fmt: (v) => `₹${v / 1000}k` },
  { key: "nights", label: "Nights", min: 2, max: 8, ticks: [3, 4, 5, 6, 7], fmt: (v) => `${v}N` },
];

const W = 1000;
const H = 440;
const PAD = { l: 64, r: 28, t: 28, b: 92 };

export function AltitudeChart() {
  const [metric, setMetric] = useState<Metric>("altitudeFt");
  const [active, setActive] = useState("bali-pass");
  const m = metrics.find((x) => x.key === metric)!;

  const points = useMemo(() => {
    const sorted = [...treks].sort((a, b) => a[metric] - b[metric] || a.altitudeFt - b.altitudeFt);
    const step = (W - PAD.l - PAD.r) / (sorted.length - 1);
    return sorted.map((t, i) => ({
      t,
      x: PAD.l + i * step,
      y: PAD.t + (1 - (t[metric] - m.min) / (m.max - m.min)) * (H - PAD.t - PAD.b),
    }));
  }, [metric, m]);

  const line = points.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
  const current = points.find((p) => p.t.slug === active) ?? points[points.length - 1];
  const yOf = (v: number) => PAD.t + (1 - (v - m.min) / (m.max - m.min)) * (H - PAD.t - PAD.b);

  return (
    <section id="altitude" aria-labelledby="altitude-title" className="relative overflow-hidden py-20 sm:py-28">
      <div className="aurora opacity-30" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            code="03"
            eyebrow="Trek constellation"
            id="altitude-title"
            title={
              <>
                Fifteen trails, <span className="text-aurora">mapped like stars.</span>
              </>
            }
            intro="Each star is a trek, ranked from lowest to highest. Switch the measure to see how altitude, price and time trade off."
          />
          <div role="group" aria-label="Chart measure" className="glass flex shrink-0 gap-1 self-start rounded-full p-1 lg:self-auto">
            {metrics.map((x) => (
              <button
                key={x.key}
                type="button"
                aria-pressed={metric === x.key}
                onClick={() => setMetric(x.key)}
                className={`relative rounded-full px-4 py-2 text-sm transition ${metric === x.key ? "text-night" : "text-ice/70 hover:text-ice"}`}
              >
                {metric === x.key && <motion.span layoutId="metric-pill" className="absolute inset-0 rounded-full bg-volt" transition={{ duration: 0.4, ease }} />}
                <span className="relative">{x.label}</span>
              </button>
            ))}
          </div>
        </div>

        <figure className="mt-12 grid gap-6 lg:grid-cols-[1fr_17rem]">
          <div className="glass relative rounded-[1.5rem] p-3 sm:p-5">
            <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-labelledby="chart-cap">
              {m.ticks.map((v) => (
                <g key={v}>
                  <line x1={PAD.l} x2={W - PAD.r} y1={yOf(v)} y2={yOf(v)} stroke="#e9f3ff" strokeOpacity="0.08" strokeDasharray="2 6" />
                  <text x={PAD.l - 12} y={yOf(v) + 4} textAnchor="end" className="fill-mist font-mono text-[13px]">
                    {m.fmt(v)}
                  </text>
                </g>
              ))}
              <motion.path
                key={metric}
                d={line}
                fill="none"
                stroke="url(#constellation)"
                strokeWidth="1.5"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: false, margin: "-15% 0px" }}
                transition={{ duration: 1.6, ease }}
              />
              <defs>
                <linearGradient id="constellation" x1="0" x2="1">
                  <stop offset="0" stopColor="#2de2c4" />
                  <stop offset="1" stopColor="#8b6cff" />
                </linearGradient>
              </defs>
              {points.map((p) => {
                const on = p.t.slug === current.t.slug;
                return (
                  <motion.g
                    key={p.t.slug}
                    initial={false}
                    animate={{ x: p.x, y: p.y }}
                    transition={{ duration: 0.8, ease }}
                    tabIndex={0}
                    role="button"
                    aria-label={`${p.t.name}: ${p.t.altitudeFt.toLocaleString("en-IN")} ft, ${p.t.nights} nights, from ${inr(p.t.price)}`}
                    aria-pressed={on}
                    onPointerEnter={() => setActive(p.t.slug)}
                    onFocus={() => setActive(p.t.slug)}
                    onClick={() => setActive(p.t.slug)}
                    className="cursor-pointer outline-none [&:focus-visible>circle:nth-child(2)]:stroke-volt"
                  >
                    <circle r="22" fill="transparent" />
                    <circle r={on ? 9 : 5} fill={on ? "#c8ff3a" : "#e9f3ff"} stroke="#060a1c" strokeWidth="2" className="transition-all duration-300" />
                    {on && <circle r="16" fill="none" stroke="#c8ff3a" strokeOpacity="0.4" />}
                  </motion.g>
                );
              })}
              {points.map((p) => (
                <motion.g key={`${p.t.slug}-l`} initial={false} animate={{ x: p.x + 4, y: H - PAD.b + 20 }} transition={{ duration: 0.8, ease }} aria-hidden="true">
                  <text
                    transform="rotate(-38)"
                    textAnchor="end"
                    className={`font-mono text-[12px] max-sm:hidden ${p.t.slug === current.t.slug ? "fill-volt" : "fill-mist"}`}
                  >
                    {p.t.name.split(" · ")[0].replace("Kashmir Great Lakes", "Kashmir G. Lakes")}
                  </text>
                </motion.g>
              ))}
            </svg>
          </div>

          <div className="glass flex flex-col justify-between rounded-[1.5rem] p-6" aria-live="polite">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mist">Selected star</p>
              <p className="mt-3 font-display text-2xl font-semibold leading-tight">{current.t.name}</p>
              <p className="mt-1 text-sm text-mist">
                {current.t.region}, {current.t.state}
              </p>
            </div>
            <dl className="mt-6 grid grid-cols-3 gap-3 font-mono lg:grid-cols-1">
              {[
                ["Altitude", `${current.t.altitudeFt.toLocaleString("en-IN")} ft`],
                ["Duration", `${current.t.nights + 1}D/${current.t.nights}N`],
                ["From", inr(current.t.price)],
              ].map(([k, v]) => (
                <div key={k} className="border-t border-ice/10 pt-3">
                  <dt className="text-[10px] uppercase tracking-[0.18em] text-mist">{k}</dt>
                  <dd className="mt-1 text-sm text-ice sm:text-base">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <figcaption id="chart-cap" className="font-mono text-[11px] uppercase tracking-[0.15em] text-mist lg:col-span-2">
            {m.label} of each trek, lowest to highest. Tap or hover a star for details; the full numbers are in the compare table.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
