"use client";

import { useEffect, useRef, type ReactNode } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { site } from "@/data/site";

export const ease = [0.2, 0.8, 0.2, 1] as const;

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
export const ft = (n: number) => `${n.toLocaleString("en-IN")} ft`;

const GLYPHS = "▲△◆◇01#/<>+=*%";

/**
 * Decodes text from random glyphs when it scrolls into view. The final text is what the
 * server renders, so crawlers and screen readers always get the real string. Use it on
 * monospace labels so the width never changes.
 */
export function Scramble({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    // Mutate React's own text node so reconciliation never sees a foreign node
    const el = ref.current?.firstChild;
    if (!inView || reduce || !el) return;
    let frame = 0;
    const start = performance.now();
    const duration = 700 + text.length * 18;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const revealed = Math.floor(p * text.length);
      el.nodeValue = text
        .split("")
        .map((c, i) => (i < revealed || c === " " ? c : GLYPHS[(i + Math.floor(now / 50)) % GLYPHS.length]))
        .join("");
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      el.nodeValue = text;
    };
  }, [inView, reduce, text]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}

export function Eyebrow({ code, children }: { code: string; children: string }) {
  return (
    <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-glacier">
      <span className="rounded border border-glacier/30 px-1.5 py-0.5 text-[10px] text-glacier/80">{code}</span>
      <Scramble text={children} />
    </p>
  );
}

export function SectionHeading({
  code,
  eyebrow,
  title,
  id,
  intro,
  className = "",
}: {
  code: string;
  eyebrow: string;
  title: ReactNode;
  id: string;
  intro?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`max-w-3xl ${className}`}>
      <Eyebrow code={code}>{eyebrow}</Eyebrow>
      <motion.h2
        id={id}
        initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.9, ease }}
        className="mt-5 font-display text-3xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl"
      >
        {title}
      </motion.h2>
      {intro && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="mt-5 max-w-2xl text-base leading-relaxed text-mist text-pretty sm:text-lg"
        >
          {intro}
        </motion.p>
      )}
    </div>
  );
}

/** Mono number that counts up once when visible */
export function Ticker({ value, suffix = "", className }: { value: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current?.firstChild;
    if (!inView || reduce || !el) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => (el.nodeValue = Math.round(v).toLocaleString("en-IN")),
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <span className={`font-mono tabular-nums ${className ?? ""}`}>
      <span ref={ref}>{value.toLocaleString("en-IN")}</span>
      {suffix && <span className="text-[0.55em] text-mist">{suffix}</span>}
    </span>
  );
}

/** Pulls its child toward the pointer. Inert on touch and with reduced motion. */
export function Magnetic({ children, strength = 0.3, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(0, { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(0, { stiffness: 220, damping: 18, mass: 0.4 });

  function move(e: React.PointerEvent) {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onPointerMove={move}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={`inline-block ${className ?? ""}`}
    >
      {children}
    </motion.div>
  );
}

/** 3D tilt with a cursor-following spotlight */
export function TiltCard({ children, className, max = 8 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 160, damping: 18 });
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 160, damping: 18 });
  const mx = useTransform(px, (v) => `${v * 100}%`);
  const my = useTransform(py, (v) => `${v * 100}%`);
  const light = useMotionTemplate`radial-gradient(380px circle at ${mx} ${my}, rgb(127 227 255 / 0.18), transparent 45%)`;

  function move(e: React.PointerEvent) {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={move}
      onPointerLeave={() => {
        px.set(0.5);
        py.set(0.5);
      }}
      style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={`group relative ${className ?? ""}`}
    >
      {children}
      <motion.div
        aria-hidden="true"
        style={{ background: light }}
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
    </motion.div>
  );
}

export function PeakGlyph({ className = "size-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="peak-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7fe3ff" />
          <stop offset="1" stopColor="#8b6cff" />
        </linearGradient>
      </defs>
      <path d="M6 54 26 20l8 13 6-9 18 30Z" fill="url(#peak-g)" />
      <path d="m26 20 6 10-6-3-5 4Z" fill="#e9f3ff" />
      <path d="m48 6 1.6 4.4L54 12l-4.4 1.6L48 18l-1.6-4.4L42 12l4.4-1.6Z" fill="#c8ff3a" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <PeakGlyph className="size-8" />
      <span className="leading-none">
        <span className="block font-display text-xs font-semibold uppercase tracking-[0.1em] sm:text-sm sm:tracking-[0.12em]">{site.name}</span>
        <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.2em] text-mist">
          {site.address.locality} · est. {site.foundedYear}
        </span>
      </span>
    </span>
  );
}
