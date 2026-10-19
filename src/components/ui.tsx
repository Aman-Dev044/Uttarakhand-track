"use client";

import { motion, useInView, animate } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";

const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "article" | "figure";
}) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </Comp>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  accent,
  description,
  tone = "light",
  align = "left",
}: {
  id: string;
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
}) {
  const dark = tone === "dark";
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <Reveal>
        <p
          className={`mb-5 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] ${
            dark ? "text-saffron-2" : "text-saffron"
          }`}
        >
          <CompassGlyph className="size-4" />
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          id={id}
          className={`font-display text-4xl leading-[1.02] tracking-tight text-balance sm:text-5xl lg:text-6xl ${
            dark ? "text-snow" : "text-ink"
          }`}
        >
          {title} {accent && <em className="font-light italic text-saffron">{accent}</em>}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p
            className={`mt-6 text-lg leading-relaxed text-pretty ${dark ? "text-snow/70" : "text-charcoal/70"} ${
              align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"
            }`}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}

export function CompassGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="10.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 3.5 14.2 12 12 20.5 9.8 12 12 3.5Z" fill="currentColor" />
      <path d="M12 3.5 14.2 12H9.8L12 3.5Z" fill="currentColor" opacity=".45" />
    </svg>
  );
}

export function Logo({ light = true }: { light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span
        className={`grid size-10 place-items-center rounded-full border ${
          light ? "border-snow/30 text-snow" : "border-ink/20 text-ink"
        }`}
      >
        <CompassGlyph className="size-6 text-saffron" />
      </span>
      <span className={`leading-none ${light ? "text-snow" : "text-ink"}`}>
        <span className="block font-display text-lg font-semibold tracking-tight">{site.name}</span>
        <span className="mt-1 block text-[10px] uppercase tracking-[0.3em] opacity-60">
          {site.address.locality} · Since {site.foundedYear}
        </span>
      </span>
    </span>
  );
}

export function Counter({
  to,
  suffix = "",
  className,
  suffixClassName,
}: {
  to: number;
  suffix?: string;
  className?: string;
  suffixClassName?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">
        {to.toLocaleString("en-IN")}
        {suffix}
      </span>
      <span aria-hidden="true">
        {value.toLocaleString("en-IN")}
        <span className={suffixClassName}>{suffix}</span>
      </span>
    </span>
  );
}

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
export { ease };
