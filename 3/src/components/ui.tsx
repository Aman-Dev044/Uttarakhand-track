"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type HTMLMotionProps,
} from "motion/react";
import { site } from "@/data/site";

export const ease = [0.22, 1, 0.36, 1] as const;

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
export const ft = (n: number) => `${n.toLocaleString("en-IN")} ft`;

/** Dispatched by "Plan this trek" buttons; the callback form listens and pre-fills itself */
export const PICK_TREK_EVENT = "tc:pick-trek";
export function pickTrek(name: string) {
  window.dispatchEvent(new CustomEvent(PICK_TREK_EVENT, { detail: name }));
  scrollToId("plan");
}

/** Smooth-scrolls through Lenis when it is running, natively otherwise */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -64 });
  else el.scrollIntoView({ behavior: "smooth" });
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg viewBox="0 0 32 32" className="size-7" aria-hidden="true">
        <path d="M2 27 13 8l5 8.5 3.5-5L30 27Z" fill={light ? "#f7f9fb" : "#0f1720"} />
        <path d="m13 8 4 6.8-4-1.8-3.2 2.4Z" fill="#6f9fc4" />
        <circle cx="25.5" cy="6.5" r="2.5" fill="#e0482f" />
      </svg>
      <span className={`whitespace-nowrap font-display text-[17px] font-semibold tracking-[-0.02em] ${light ? "text-snow" : "text-slate"}`}>
        {site.name}
      </span>
    </span>
  );
}

/** Small numbered section label: (03) Seasons */
export function Label({
  n,
  children,
  light = false,
  as: Tag = "p",
  id,
}: {
  n: string;
  children: ReactNode;
  light?: boolean;
  as?: ElementType;
  id?: string;
}) {
  return (
    <div className={`flex items-center gap-3 font-sans text-[13px] font-medium tracking-[-0.01em] ${light ? "text-snow/70" : "text-stone"}`}>
      <span aria-hidden="true" className="tabular-nums text-alpine">
        ({n})
      </span>
      <span className={`h-px w-8 ${light ? "bg-snow/30" : "bg-frost"}`} aria-hidden="true" />
      <Tag id={id}>
        {children}
      </Tag>
    </div>
  );
}

/**
 * Heading whose lines slide up out of overflow-hidden masks.
 * Lines are passed explicitly so the reveal never depends on measuring text.
 */
export function LineReveal({
  lines,
  as: Tag = "h2",
  className,
  id,
  delay = 0,
}: {
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  id?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  return (
    <Tag ref={ref} id={id} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className="block"
            initial={{ y: "105%" }}
            animate={inView ? { y: "0%" } : undefined}
            transition={{ duration: 1, ease, delay: delay + i * 0.09 }}
          >
            {line}
          </motion.span>
          {i < lines.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
}

export function FadeUp({ children, delay = 0, className, ...rest }: HTMLMotionProps<"div"> & { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, ease, delay }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function Counter({ value, suffix = "", grouping = true }: { value: number; suffix?: string; grouping?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  // Starts just before it scrolls in, so the SSR value never visibly jumps back
  const inView = useInView(ref, { once: true, margin: "0px 0px 10% 0px" });
  const reduce = useReducedMotion();
  const format = (n: number) => (grouping ? Math.round(n).toLocaleString("en-IN") : String(Math.round(n)));

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    if (reduce) {
      el.textContent = format(value);
      return;
    }
    const controls = animate(value * 0.6, value, {
      duration: 1.6,
      ease,
      onUpdate: (v) => (el.textContent = format(v)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value, reduce]);

  return (
    <span className="tabular-nums">
      <span ref={ref}>{format(value)}</span>
      {suffix}
    </span>
  );
}

/** Pulls its child gently toward the cursor */
export function Magnetic({ children, strength = 0.3, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });

  function move(e: React.PointerEvent) {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * strength);
    y.set((e.clientY - r.top - r.height / 2) * strength);
  }
  function leave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span ref={ref} onPointerMove={move} onPointerLeave={leave} style={{ x, y }} className={`inline-block ${className ?? ""}`}>
      {children}
    </motion.span>
  );
}

export function Arrow({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowUpRight({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path d="M5 11 11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
