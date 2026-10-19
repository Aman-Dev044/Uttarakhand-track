"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { months, treks } from "@/data/content";
import { SectionHeading, TiltCard, ft, inr } from "./ui";

const featured = treks.filter((t) => t.featured);

/** Native scroll-snap carousel with mouse drag on top, so touch, trackpad and keyboard all work */
export function Featured() {
  const track = useRef<HTMLUListElement>(null);
  const drag = useRef({ down: false, x: 0, left: 0, moved: false });

  const by = (dir: number) => {
    const el = track.current;
    const card = el?.querySelector("li");
    if (el && card) el.scrollBy({ left: dir * (card.clientWidth + 20), behavior: "smooth" });
  };

  function onDown(e: React.PointerEvent<HTMLUListElement>) {
    if (e.pointerType !== "mouse" || !track.current) return;
    drag.current = { down: true, x: e.clientX, left: track.current.scrollLeft, moved: false };
  }
  function onMove(e: React.PointerEvent<HTMLUListElement>) {
    const d = drag.current;
    const el = track.current;
    if (!d.down || !el) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 4 && !d.moved) {
      d.moved = true;
      el.style.scrollSnapType = "none";
      el.setPointerCapture(e.pointerId);
    }
    if (d.moved) el.scrollLeft = d.left - dx;
  }
  function onUp() {
    const el = track.current;
    drag.current.down = false;
    if (el) el.style.scrollSnapType = "";
  }

  return (
    <section id="treks" aria-labelledby="treks-title" className="relative py-20 sm:py-28">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 sm:px-8 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          code="04"
          eyebrow="Signature routes"
          id="treks-title"
          title="Six trails we would pick first."
          intro="Our most-requested departures across the year: drag, swipe or use the arrows to look through them."
        />
        <div className="flex shrink-0 gap-2">
          <button type="button" onClick={() => by(-1)} aria-label="Previous treks" className="grid size-12 place-items-center rounded-full border border-ice/15 transition hover:border-glacier hover:text-glacier">
            <ArrowLeft className="size-5" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => by(1)} aria-label="Next treks" className="grid size-12 place-items-center rounded-full border border-ice/15 transition hover:border-glacier hover:text-glacier">
            <ArrowRight className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <ul
        ref={track}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onClickCapture={(e) => drag.current.moved && e.preventDefault()}
        className="no-scrollbar mt-12 flex cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-5 px-5 pb-6 select-none active:cursor-grabbing sm:scroll-px-8 sm:px-8 xl:scroll-px-[max(2rem,calc((100vw-72rem)/2+2rem))] xl:px-[max(2rem,calc((100vw-72rem)/2+2rem))]"
      >
        {featured.map((t, i) => (
          <li key={t.slug} className="w-[82vw] shrink-0 snap-start sm:w-[22rem]">
            <TiltCard className="h-full rounded-[1.5rem]">
              <article className="glass flex h-full flex-col overflow-hidden rounded-[1.5rem]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={t.image}
                    alt={`${t.name} trek in ${t.region}`}
                    fill
                    draggable={false}
                    sizes="(min-width: 640px) 22rem, 82vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/10 to-transparent" />
                  <span className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.2em] text-ice/90">
                    {String(i + 1).padStart(2, "0")} / {String(featured.length).padStart(2, "0")}
                  </span>
                  <span className="absolute bottom-4 left-4 rounded-full border border-volt/40 bg-night/60 px-3 py-1 font-mono text-xs text-volt backdrop-blur">
                    ▲ {ft(t.altitudeFt)}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-xl font-semibold">{t.name}</h3>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-mist">
                    {t.region} · {t.grade}
                  </p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-ice/80">{t.note}</p>
                  <div className="mt-5 flex items-end justify-between border-t border-ice/10 pt-4">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-mist">{t.nights + 1} days · from</p>
                      <p className="font-mono text-lg text-ice">{inr(t.price)}</p>
                    </div>
                    <p className="text-right font-mono text-[10px] uppercase tracking-[0.14em] text-teal">
                      {t.months.map((m) => months[m - 1]).slice(0, 4).join(" ")}
                      {t.months.length > 4 ? " +" : ""}
                    </p>
                  </div>
                </div>
              </article>
            </TiltCard>
          </li>
        ))}
      </ul>
    </section>
  );
}
