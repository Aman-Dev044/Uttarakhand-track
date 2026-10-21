"use client";

import { useId } from "react";
import { motion, type Variants } from "motion/react";
import Image from "next/image";

export const ease = [0.22, 1, 0.36, 1] as const;

export const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

/** Fades content up out of a soft blur as it enters the viewport */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "p" | "span";
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </Tag>
  );
}

/** Section heading: a Devanagari word, a small ornament and the English title */
export function SectionTitle({
  id,
  hindi,
  eyebrow,
  title,
  lede,
  tone = "light",
  align = "center",
}: {
  id: string;
  hindi: string;
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  tone?: "light" | "dark";
  align?: "center" | "left";
}) {
  const dark = tone === "dark";
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <Reveal>
        <p
          className={`font-deva text-2xl sm:text-3xl ${dark ? "text-marigold" : "text-kumkum"}`}
          lang="hi"
          aria-hidden="true"
        >
          {hindi}
        </p>
        <div className={`mt-3 flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}>
          <Ornament className={dark ? "text-brass-light" : "text-brass"} />
          <p className={`font-inscription text-xs uppercase tracking-[0.3em] ${dark ? "text-brass-light" : "text-brass"}`}>
            {eyebrow}
          </p>
          <Ornament className={`-scale-x-100 ${dark ? "text-brass-light" : "text-brass"}`} />
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          id={id}
          className={`mt-5 font-display text-4xl font-medium leading-[1.05] tracking-tight text-balance sm:text-6xl ${
            dark ? "text-ivory" : "text-maroon-deep"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {lede && (
        <Reveal delay={0.16}>
          <p className={`mt-5 text-lg leading-relaxed text-pretty ${dark ? "text-ivory/75" : "text-clay"}`}>{lede}</p>
        </Reveal>
      )}
    </div>
  );
}

export function Ornament({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 12" className={`h-3 w-12 ${className ?? ""}`} fill="none" aria-hidden="true">
      <path d="M0 6h30" stroke="currentColor" strokeWidth="1" />
      <path d="M34 6c3-4 6-4 8 0-2 4-5 4-8 0Z" fill="currentColor" />
      <circle cx="46" cy="6" r="1.6" fill="currentColor" />
      <circle cx="31" cy="6" r="1.2" fill="currentColor" />
    </svg>
  );
}

/**
 * Aipan-style mandala: concentric petal rings built from simple paths.
 * Drawn in currentColor so each section can tint it.
 */
export function Mandala({ className, rings = 4 }: { className?: string; rings?: number }) {
  const petals = (count: number, r: number, len: number, w: number) =>
    Array.from({ length: count }, (_, i) => {
      const a = (360 / count) * i;
      return (
        <path
          key={`${r}-${i}`}
          d={`M100 ${100 - r} c ${w} ${-len * 0.45} ${w} ${-len * 0.8} 0 ${-len} c ${-w} ${len * 0.2} ${-w} ${len * 0.55} 0 ${len}Z`}
          transform={`rotate(${a} 100 100)`}
        />
      );
    });
  const dots = (count: number, r: number, size: number) =>
    Array.from({ length: count }, (_, i) => {
      const a = ((Math.PI * 2) / count) * i;
      return <circle key={`d${r}-${i}`} cx={100 + Math.sin(a) * r} cy={100 - Math.cos(a) * r} r={size} />;
    });
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="0.8">
        <circle cx="100" cy="100" r="12" />
        <circle cx="100" cy="100" r="22" strokeDasharray="1.5 3" />
        {petals(8, 12, 22, 7)}
        {rings > 1 && <circle cx="100" cy="100" r="44" />}
        {rings > 1 && petals(16, 44, 20, 5)}
        {rings > 2 && <circle cx="100" cy="100" r="68" strokeDasharray="0.5 4" />}
        {rings > 2 && petals(24, 68, 18, 4)}
        {rings > 3 && <circle cx="100" cy="100" r="92" />}
      </g>
      <g fill="currentColor">
        {rings > 1 && dots(16, 36, 1.2)}
        {rings > 2 && dots(24, 60, 1)}
        {rings > 3 && dots(48, 96, 1)}
      </g>
    </svg>
  );
}

/** A brass diya. `lit` controls the flame so it can double as a checkbox mark */
export function Diya({ className, lit = true }: { className?: string; lit?: boolean }) {
  const glow = `glow${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <defs>
        <radialGradient id={glow} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f6a723" stopOpacity=".7" />
          <stop offset="100%" stopColor="#f6a723" stopOpacity="0" />
        </radialGradient>
      </defs>
      {lit && <circle cx="24" cy="18" r="16" fill={`url(#${glow})`} />}
      {lit && (
        <g className="origin-[24px_26px] animate-flicker">
          <path d="M24 8c4 6 5 10 0 18-5-8-4-12 0-18Z" fill="#f6a723" />
          <path d="M24 14c2 4 2.5 6.5 0 11-2.5-4.5-2-7 0-11Z" fill="#fff3c4" />
        </g>
      )}
      <path d="M6 28h36c-2 8-9 12-18 12S8 36 6 28Z" fill="#b4873a" />
      <path d="M6 28h36" stroke="#e2bd72" strokeWidth="1.5" />
      <path d="M18 40h12l-2 4h-8Z" fill="#8a6428" />
    </svg>
  );
}

/** Temple bell that sways gently from its top */
export function Bell({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 64" className={`origin-top animate-sway ${className ?? ""}`} aria-hidden="true">
      <path d="M20 0v14" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="20" cy="16" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M20 19c-8 0-11 8-11 18 0 6-3 9-5 11h32c-2-2-5-5-5-11 0-10-3-18-11-18Z" fill="currentColor" />
      <path d="M4 48h32" stroke="#fbf5e9" strokeOpacity=".35" strokeWidth="1" />
      <circle cx="20" cy="54" r="4" fill="currentColor" />
    </svg>
  );
}

const garlandFlower: Variants = {
  hidden: { scale: 0, opacity: 0 },
  show: (i: number) => ({ scale: 1, opacity: 1, transition: { delay: i * 0.05, type: "spring", stiffness: 260, damping: 14 } }),
};

/**
 * Marigold garland divider: swags of string with flowers that pop in one after another.
 */
export function Garland({ className, swags = 4 }: { className?: string; swags?: number }) {
  const width = 1200;
  const seg = width / swags;
  const droop = 46;
  const flowers: { x: number; y: number; big: boolean }[] = [];
  for (let s = 0; s < swags; s++) {
    for (let k = 0; k <= 10; k++) {
      const t = k / 10;
      const x = s * seg + t * seg;
      const y = 6 + droop * 4 * t * (1 - t);
      if (s > 0 && k === 0) continue;
      flowers.push({ x, y, big: k % 5 === 0 });
    }
  }
  const path = Array.from({ length: swags }, (_, s) => `M${s * seg} 6 Q ${s * seg + seg / 2} ${6 + droop * 2} ${(s + 1) * seg} 6`).join(" ");
  return (
    <motion.svg
      viewBox={`0 -6 ${width} 74`}
      preserveAspectRatio="none"
      className={`block h-10 w-full sm:h-16 ${className ?? ""}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      aria-hidden="true"
    >
      <path d={path} fill="none" stroke="#2f6b3a" strokeWidth="1.5" />
      {flowers.map((f, i) => (
        <motion.g key={i} custom={i} variants={garlandFlower}>
          <circle cx={f.x} cy={f.y} r={f.big ? 9 : 6.5} fill={i % 3 === 0 ? "#e46f1b" : "#f6a723"} />
          <circle cx={f.x} cy={f.y} r={f.big ? 4.5 : 3} fill={i % 3 === 0 ? "#f6a723" : "#e46f1b"} opacity=".7" />
          {f.big && <path d={`M${f.x - 4} ${f.y + 9} l4 10 l4 -10`} fill="#2f6b3a" />}
        </motion.g>
      ))}
    </motion.svg>
  );
}

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const light = tone === "light";
  return (
    <span className="flex items-center gap-3">
      <span className="block size-12 shrink-0 overflow-hidden rounded-full ring-1 ring-brass-light/60">
        <Image src="/logo.png" alt="" width={96} height={96} className="size-full" />
      </span>
      <span className="leading-none">
        <span className={`block font-display text-xl font-semibold tracking-tight ${light ? "text-ivory" : "text-maroon-deep"}`}>
          Char Dham Yatra
        </span>
        <span className={`mt-1 block font-inscription text-[10px] uppercase tracking-[0.25em] ${light ? "text-brass-light" : "text-brass"}`}>
          Yamunotri to Badrinath
        </span>
      </span>
    </span>
  );
}

const devanagariDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
export const toDevanagari = (n: number) =>
  String(n)
    .split("")
    .map((d) => devanagariDigits[Number(d)] ?? d)
    .join("");
