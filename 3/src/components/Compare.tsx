"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { ArrowDownUp, ArrowDown, ArrowUp } from "lucide-react";
import { grades, months, treks, type State } from "@/data/content";
import { SectionHeading, ease, inr } from "./ui";

type Key = "altitudeFt" | "nights" | "price" | "grade";
const columns: { key: Key; label: string }[] = [
  { key: "altitudeFt", label: "Max altitude" },
  { key: "grade", label: "Grade" },
  { key: "nights", label: "Duration" },
  { key: "price", label: "From" },
];
const states: (State | "All")[] = ["All", "Uttarakhand", "Himachal", "Kashmir"];

const gradeTone = ["bg-teal", "bg-teal", "bg-glacier", "bg-violet", "bg-flare"];

export function Compare() {
  const [sort, setSort] = useState<{ key: Key; dir: 1 | -1 }>({ key: "altitudeFt", dir: -1 });
  const [state, setState] = useState<State | "All">("All");

  const rows = useMemo(() => {
    const val = (t: (typeof treks)[number]) => (sort.key === "grade" ? grades.indexOf(t.grade) : t[sort.key]);
    return treks.filter((t) => state === "All" || t.state === state).sort((x, y) => (val(x) - val(y)) * sort.dir);
  }, [sort, state]);

  const toggle = (key: Key) => setSort((s) => (s.key === key ? { key, dir: s.dir === 1 ? -1 : 1 } : { key, dir: -1 }));

  return (
    <section id="compare" aria-labelledby="compare-title" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            code="02"
            eyebrow="Compare"
            id="compare-title"
            title="Every trek, side by side."
            intro="Sort by how high, how hard, how long or how much. The strip on the right shows the months each trail is in good condition."
          />
          <div role="group" aria-label="Filter by state" className="glass flex shrink-0 gap-1 self-start rounded-full p-1 lg:self-auto">
            {states.map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={state === s}
                onClick={() => setState(s)}
                className={`relative rounded-full px-3.5 py-2 text-xs font-medium transition sm:text-sm ${state === s ? "text-night" : "text-ice/70 hover:text-ice"}`}
              >
                {state === s && <motion.span layoutId="state-pill" className="absolute inset-0 rounded-full bg-glacier" transition={{ duration: 0.4, ease }} />}
                <span className="relative">{s}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="glass mt-12 overflow-hidden rounded-[1.5rem]">
          <div className="no-scrollbar relative overflow-x-auto" tabIndex={0} role="region" aria-label="Trek comparison table, scroll sideways on small screens">
            <table className="w-full min-w-[860px] border-collapse text-left text-sm">
              <caption className="sr-only">Himalayan treks compared by altitude, grade, duration, price and best months</caption>
              <thead>
                <tr className="border-b border-ice/10 font-mono text-[10px] uppercase tracking-[0.18em] text-mist">
                  <th scope="col" className="px-5 py-4 font-normal">Trek</th>
                  {columns.map((c) => {
                    const active = sort.key === c.key;
                    const Icon = active ? (sort.dir === 1 ? ArrowUp : ArrowDown) : ArrowDownUp;
                    return (
                      <th
                        key={c.key}
                        scope="col"
                        aria-sort={active ? (sort.dir === 1 ? "ascending" : "descending") : "none"}
                        className="px-3 py-4 font-normal"
                      >
                        <button
                          type="button"
                          onClick={() => toggle(c.key)}
                          className={`inline-flex items-center gap-1.5 uppercase tracking-[0.18em] transition hover:text-ice ${active ? "text-glacier" : ""}`}
                        >
                          {c.label}
                          <Icon className="size-3" aria-hidden="true" />
                        </button>
                      </th>
                    );
                  })}
                  <th scope="col" className="px-5 py-4 font-normal">Best months</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((t) => {
                  const g = grades.indexOf(t.grade);
                  return (
                    <motion.tr
                      layout
                      key={t.slug}
                      transition={{ duration: 0.45, ease }}
                      className="border-b border-ice/5 transition-colors last:border-0 hover:bg-glacier/[0.06]"
                    >
                      <th scope="row" className="min-w-[15rem] px-5 py-4 font-normal">
                        <span className="block font-display text-[15px] font-semibold text-ice">{t.name}</span>
                        <span className="mt-0.5 block text-xs text-mist">
                          {t.region}, {t.state}
                        </span>
                      </th>
                      <td className="px-3 py-4">
                        <span className="font-mono tabular-nums text-ice">{t.altitudeFt.toLocaleString("en-IN")}</span>
                        <span className="font-mono text-xs text-mist"> ft</span>
                        <span className="mt-1.5 block h-1 w-24 rounded-full bg-ice/10">
                          <span className="block h-full rounded-full bg-gradient-to-r from-teal to-glacier" style={{ width: `${(t.altitudeFt / 16500) * 100}%` }} />
                        </span>
                      </td>
                      <td className="px-3 py-4">
                        <span className="inline-flex items-center gap-2 whitespace-nowrap text-ice/90">
                          <span className="flex gap-0.5" aria-hidden="true">
                            {grades.map((_, i) => (
                              <span key={i} className={`h-3 w-1 rounded-full ${i <= g ? gradeTone[g] : "bg-ice/15"}`} />
                            ))}
                          </span>
                          {t.grade}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 font-mono tabular-nums text-ice/90">
                        {t.nights + 1}D / {t.nights}N
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 font-mono tabular-nums text-volt">{inr(t.price)}</td>
                      <td className="px-5 py-4">
                        <span className="sr-only">{t.months.map((m) => months[m - 1]).join(", ")}</span>
                        <span className="flex gap-0.5" aria-hidden="true">
                          {months.map((m, i) => (
                            <span
                              key={m}
                              title={m}
                              className={`grid h-6 w-4 place-items-center rounded-[3px] font-mono text-[8px] ${
                                t.months.includes(i + 1) ? "bg-teal/80 text-night" : "bg-ice/[0.06] text-ice/30"
                              }`}
                            >
                              {m[0]}
                            </span>
                          ))}
                        </span>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.15em] text-mist md:hidden">← Swipe the table →</p>
      </div>
    </section>
  );
}
