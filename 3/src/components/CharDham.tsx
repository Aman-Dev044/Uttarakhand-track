"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { MapPin } from "lucide-react";
import { dhams } from "@/data/content";
import { site } from "@/data/site";
import { SectionHeading, Ticker, ease } from "./ui";

const summary = [
  { value: 1250, suffix: " km", label: "Road loop from Haridwar, approx." },
  { value: 22, suffix: " km", label: "On foot (Yamunotri + Kedarnath)" },
  { value: 10, suffix: "–12 days", label: "Comfortable pace" },
] as const;

export function CharDham() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const draw = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <section id="char-dham" aria-labelledby="dham-title" className="relative overflow-hidden bg-night-2/50 py-20 sm:py-28">
      <div className="hud-grid absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          code="06"
          eyebrow="Char Dham route"
          id="dham-title"
          title={
            <>
              Four shrines, <span className="text-aurora">one west-to-east loop.</span>
            </>
          }
          intro="The yatra is traditionally done clockwise: Yamunotri, Gangotri, Kedarnath, then Badrinath. Shrines usually open around Akshaya Tritiya in late April or May and close near Diwali."
        />

        <dl className="mt-10 grid gap-3 sm:grid-cols-3">
          {summary.map((s) => (
            <div key={s.label} className="glass rounded-2xl px-5 py-4">
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-mist">{s.label}</dt>
              <dd className="mt-1 whitespace-nowrap text-2xl text-ice">
                <Ticker value={s.value} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </dl>

        <div ref={ref} className="relative mt-16">
          {/* route line */}
          <div aria-hidden="true" className="absolute bottom-0 left-[15px] top-0 w-px bg-ice/10 md:left-1/2">
            <motion.div style={{ scaleY: draw }} className="absolute inset-0 origin-top bg-gradient-to-b from-teal via-glacier to-violet" />
          </div>
          <ol className="relative space-y-14 md:space-y-20">

          <li className="relative pl-12 md:pl-0 md:text-center">
            <span aria-hidden="true" className="absolute left-[9px] top-1 size-3 rounded-full border-2 border-teal bg-night md:left-1/2 md:-translate-x-1/2" />
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-teal md:pt-6">Start · Haridwar / Rishikesh</p>
          </li>

          {dhams.map((d, i) => {
            const right = i % 2 === 1;
            return (
              <li key={d.name} className="relative grid gap-6 pl-12 md:grid-cols-2 md:gap-16 md:pl-0">
                <span aria-hidden="true" className="absolute left-[7px] top-2 grid size-4 place-items-center md:left-1/2 md:-translate-x-1/2">
                  <span className="absolute size-4 animate-pulse-ring rounded-full bg-glacier/50" />
                  <span className="size-3 rounded-full bg-glacier" />
                </span>
                <motion.div
                  initial={{ opacity: 0, x: right ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-15% 0px" }}
                  transition={{ duration: 0.8, ease }}
                  className={right ? "md:order-2" : "md:text-right"}
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mist">
                    Dham 0{i + 1} · {d.leg}
                  </p>
                  <h3 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">{d.name}</h3>
                  <p className="mt-1 text-sm text-glacier">
                    {d.deity} · {d.district}
                  </p>
                  <p className={`mt-4 max-w-md text-sm leading-relaxed text-ice/80 ${right ? "" : "md:ml-auto"}`}>{d.copy}</p>
                  <dl className={`mt-5 flex flex-wrap gap-2 font-mono text-[11px] ${right ? "" : "md:justify-end"}`}>
                    <div className="rounded-full border border-ice/15 px-3 py-1">
                      <dt className="sr-only">Altitude</dt>
                      <dd>
                        {d.altitudeM.toLocaleString("en-IN")} m · {Math.round(d.altitudeM * 3.281).toLocaleString("en-IN")} ft
                      </dd>
                    </div>
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-ice/15 px-3 py-1">
                      <dt className="sr-only">Access</dt>
                      <MapPin className="size-3 text-volt" aria-hidden="true" />
                      <dd>{d.access}</dd>
                    </div>
                  </dl>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.92, clipPath: "inset(12% round 24px)" }}
                  whileInView={{ opacity: 1, scale: 1, clipPath: "inset(0% round 24px)" }}
                  viewport={{ once: true, margin: "-15% 0px" }}
                  transition={{ duration: 1, ease }}
                  className={`relative aspect-[16/10] overflow-hidden rounded-3xl ${right ? "md:order-1" : ""}`}
                >
                  <Image src={d.image} alt={`${d.name} temple, ${d.district} district, Uttarakhand`} fill sizes="(min-width: 768px) 45vw, 90vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-night/40 to-transparent" />
                </motion.div>
              </li>
            );
          })}

          <li className="relative pl-12 md:pl-0 md:text-center">
            <span aria-hidden="true" className="absolute left-[9px] top-1 size-3 rounded-full border-2 border-violet bg-night md:left-1/2 md:-translate-x-1/2" />
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-violet md:pt-6">Return · Badrinath → Haridwar · ~320 km</p>
          </li>
          </ol>
        </div>

        <p className="glass mt-16 rounded-2xl p-5 text-sm leading-relaxed text-mist sm:p-6">
          Every pilgrim has to register with the state before the yatra; we handle it as part of the package, along with
          Kedarnath helicopter bookings where available. For official notices and opening dates, see{" "}
          <a href={site.officialTourism} target="_blank" rel="noopener noreferrer" className="text-glacier underline decoration-glacier/40 underline-offset-4 hover:decoration-glacier">
            Uttarakhand Tourism
          </a>
          .
        </p>
      </div>
    </section>
  );
}
