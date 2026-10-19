"use client";

import { useEffect, useRef } from "react";
import { site } from "@/data/site";

declare global {
  interface Window {
    __tcIntro?: number;
  }
}

/**
 * First-visit curtain: a 0 → 100 count, then the panel lifts away.
 * The motion itself is CSS (globals.css), so it leaves on time even if JS is slow;
 * this component only drives the number, synced to when the page first parsed.
 */
export function Intro() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (document.documentElement.dataset.intro === "skip") return;
    const start = window.__tcIntro ?? performance.now();
    let frame = 0;
    const tick = () => {
      const p = Math.min(1, (performance.now() - start) / 900);
      const eased = 1 - Math.pow(1 - p, 3);
      if (ref.current) ref.current.textContent = String(Math.round(eased * 100)).padStart(2, "0");
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div aria-hidden="true" className="intro pointer-events-none fixed inset-0 z-[110] flex flex-col justify-between bg-slate px-5 py-6 text-snow sm:px-10 sm:py-8">
      <div className="flex items-center justify-between text-[13px] text-snow/60">
        <span>{site.name}</span>
        <span>Uttarakhand · 2026–27</span>
      </div>
      <div className="intro-count flex items-end justify-between gap-6">
        <span ref={ref} className="font-condensed text-[34vw] leading-[0.78] tracking-[-0.04em] tabular-nums sm:text-[22vw]">
          00
        </span>
        <span className="mb-[2vw] hidden max-w-[16rem] text-right font-display text-xl leading-tight text-snow/80 sm:block">
          Walk the Land of the God.
        </span>
      </div>
      <span className="intro-bar absolute inset-x-0 bottom-0 h-1 bg-alpine" />
    </div>
  );
}
