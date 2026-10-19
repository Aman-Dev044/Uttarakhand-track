"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { culture } from "@/data/content";
import { Mandala, SectionTitle, ease } from "./ui";

type Key = (typeof culture)[number]["key"];

function AipanArt() {
  return (
    <div className="aipan relative grid size-full place-items-center bg-kumkum">
      <motion.div
        initial={{ scale: 0.4, rotate: -90, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ duration: 1.4, ease }}
        className="size-[78%] text-ivory"
      >
        <Mandala className="size-full" />
      </motion.div>
      <div className="absolute inset-4 rounded-[1.5rem] border-2 border-dashed border-ivory/50" />
    </div>
  );
}

const dishes = ["Kafuli", "Bhatt ki churkani", "Aloo ke gutke", "Mandua roti", "Jhangora kheer", "Bal mithai"];

function ThaliArt() {
  return (
    <div className="relative grid size-full place-items-center bg-sand">
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease }}
        className="relative aspect-square w-[86%] rounded-full bg-[radial-gradient(circle_at_35%_30%,#f3d58f,#b4873a_60%,#8a6428)] shadow-2xl shadow-maroon/30"
      >
        <div className="absolute inset-[6%] rounded-full border border-ivory/40" />
        {dishes.map((d, i) => {
          const a = (i / dishes.length) * Math.PI * 2 - Math.PI / 2;
          return (
            <motion.div
              key={d}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 220, damping: 15 }}
              className="absolute grid size-[26%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[radial-gradient(circle_at_40%_35%,#e8c47c,#9c7430)] p-1 text-center shadow-lg"
              style={{ left: `${50 + Math.cos(a) * 31}%`, top: `${50 + Math.sin(a) * 31}%` }}
            >
              <span className="text-[10px] font-semibold leading-tight text-maroon-deep sm:text-xs">{d}</span>
            </motion.div>
          );
        })}
        <div className="absolute left-1/2 top-1/2 grid size-[24%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ivory/80 font-deva text-lg text-kumkum">
          थाली
        </div>
      </motion.div>
    </div>
  );
}

function DrumArt() {
  return (
    <div className="relative grid size-full place-items-center overflow-hidden bg-maroon-deep">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute size-48 rounded-full border-2 border-marigold/60"
          initial={{ scale: 0.6, opacity: 0.8 }}
          animate={{ scale: 2.4, opacity: 0 }}
          transition={{ duration: 2.4, delay: i * 0.8, repeat: Infinity, ease: "easeOut" }}
        />
      ))}
      <motion.svg
        viewBox="0 0 200 140"
        className="relative w-[60%]"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease }}
      >
        <ellipse cx="40" cy="70" rx="22" ry="52" fill="#e2bd72" />
        <rect x="40" y="18" width="120" height="104" fill="#b4241c" />
        <path d="M40 18L160 122M40 122L160 18M70 18l60 104M70 122l60-104" stroke="#e2bd72" strokeWidth="2" />
        <ellipse cx="160" cy="70" rx="22" ry="52" fill="#f3e6cb" stroke="#e2bd72" strokeWidth="4" />
        <ellipse cx="160" cy="70" rx="10" ry="26" fill="none" stroke="#b4873a" strokeWidth="1.5" />
      </motion.svg>
    </div>
  );
}


export function FolkCulture() {
  const [tab, setTab] = useState<Key>("aipan");
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const item = culture.find((c) => c.key === tab) ?? culture[0];

  function onKey(e: React.KeyboardEvent, i: number) {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (i + dir + culture.length) % culture.length;
    setTab(culture[next].key);
    tabs.current[next]?.focus();
  }

  return (
    <section id="culture" aria-labelledby="culture-title" className="paper relative bg-ivory py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <SectionTitle
          id="culture-title"
          hindi="लोक संस्कृति"
          eyebrow="Folk culture"
          title={
            <>
              The hills at home: <em className="text-kumkum">art, food and song</em>
            </>
          }
        />

        <div role="tablist" aria-label="Folk culture" className="mx-auto mt-12 flex w-fit flex-wrap justify-center gap-2 rounded-full bg-sand p-1.5">
          {culture.map((c, i) => {
            const on = c.key === tab;
            return (
              <button
                key={c.key}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                id={`tab-${c.key}`}
                aria-selected={on}
                aria-controls={`panel-${c.key}`}
                tabIndex={on ? 0 : -1}
                onClick={() => setTab(c.key)}
                onKeyDown={(e) => onKey(e, i)}
                className={`relative rounded-full px-5 py-2.5 text-[15px] font-semibold transition-colors ${on ? "text-ivory" : "text-maroon hover:text-kumkum"}`}
              >
                {on && <motion.span layoutId="culture-pill" className="absolute inset-0 rounded-full bg-maroon" transition={{ type: "spring", stiffness: 300, damping: 30 }} />}
                <span className="relative">{c.title}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-[2rem] shadow-2xl shadow-maroon/20 ring-1 ring-brass/40">
            <AnimatePresence mode="wait">
              <motion.div
                key={item.key}
                className="absolute inset-0"
                initial={{ clipPath: "circle(0% at 50% 50%)" }}
                animate={{ clipPath: "circle(75% at 50% 50%)" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease }}
                aria-hidden="true"
              >
                {item.key === "aipan" ? <AipanArt /> : item.key === "thali" ? <ThaliArt /> : <DrumArt />}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* All panels stay in the DOM so their text is indexable */}
          <div className="grid">
            {culture.map((c) => {
              const on = c.key === tab;
              return (
                <motion.div
                  key={c.key}
                  id={`panel-${c.key}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${c.key}`}
                  hidden={!on}
                  initial={false}
                  animate={on ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                  transition={{ duration: 0.5, ease }}
                  className="[grid-area:1/1]"
                >
                  <p className="font-deva text-3xl text-kumkum" lang="hi">
                    {c.hindi}
                  </p>
                  <h3 className="mt-2 font-display text-4xl font-semibold text-maroon-deep sm:text-5xl">{c.lede}</h3>
                  <p className="mt-5 text-lg leading-relaxed text-clay">{c.copy}</p>
                  <ul className="mt-7 space-y-3">
                    {c.points.map((p) => (
                      <li key={p} className="flex items-center gap-3 text-umber">
                        <span className="size-2 rotate-45 bg-saffron" aria-hidden="true" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
