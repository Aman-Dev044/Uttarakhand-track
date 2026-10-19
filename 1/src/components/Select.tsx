"use client";

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronDown } from "lucide-react";
import { ease } from "./ui";

export type SelectOption = { value: string; label: string };

type Props = {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  /** Accessible name, rendered visibly when `variant="glass"` */
  label: string;
  placeholder?: string;
  /** Adds a hidden input so the value is submitted with the surrounding form */
  name?: string;
  variant?: "glass" | "field";
  className?: string;
};

type Position = { left: number; width: number; top?: number; bottom?: number; maxHeight: number };

const noop = () => () => {};
const GAP = 8;
const MAX_HEIGHT = 288;

/**
 * Themed replacement for <select>. The native popup can't be styled across browsers,
 * so this renders an accessible listbox in a portal (escaping overflow-hidden parents).
 */
export function Select({ value, onChange, options, label, placeholder, name, variant = "field", className }: Props) {
  const id = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [pos, setPos] = useState<Position | null>(null);
  const typeahead = useRef({ text: "", timer: 0 });
  // The portal target only exists in the browser
  const mounted = useSyncExternalStore(noop, () => true, () => false);

  const selectedIndex = options.findIndex((o) => o.value === value);
  const selected = options[selectedIndex];

  const place = useCallback(() => {
    const el = buttonRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const below = window.innerHeight - r.bottom - GAP * 2;
    const above = r.top - GAP * 2;
    const flip = below < Math.min(MAX_HEIGHT, 200) && above > below;
    setPos({
      left: r.left,
      width: r.width,
      ...(flip ? { bottom: window.innerHeight - r.top + GAP } : { top: r.bottom + GAP }),
      maxHeight: Math.min(MAX_HEIGHT, flip ? above : below),
    });
  }, []);

  function openList(index = selectedIndex >= 0 ? selectedIndex : 0) {
    place();
    setActive(index);
    setOpen(true);
  }

  function close(focusButton = true) {
    setOpen(false);
    if (focusButton) buttonRef.current?.focus();
  }

  function choose(index: number) {
    const o = options[index];
    if (o) onChange(o.value);
    close();
  }

  // Keep the popup attached to its trigger while the page scrolls or resizes
  useLayoutEffect(() => {
    if (!open) return;
    listRef.current?.focus({ preventScroll: true });
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(place);
    };
    const onPointer = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!listRef.current?.contains(t) && !buttonRef.current?.contains(t)) close(false);
    };
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open, place]);

  // Scroll the highlighted option into view inside the list
  useEffect(() => {
    if (!open) return;
    listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  function onButtonKey(e: React.KeyboardEvent) {
    if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
      e.preventDefault();
      openList();
    }
  }

  function onListKey(e: React.KeyboardEvent) {
    const last = options.length - 1;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActive((a) => Math.min(last, a + 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActive((a) => Math.max(0, a - 1));
        break;
      case "Home":
        e.preventDefault();
        setActive(0);
        break;
      case "End":
        e.preventDefault();
        setActive(last);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        choose(active);
        break;
      case "Escape":
        e.preventDefault();
        close();
        break;
      case "Tab":
        close(false);
        break;
      default:
        if (e.key.length === 1) {
          const t = typeahead.current;
          window.clearTimeout(t.timer);
          t.text += e.key.toLowerCase();
          t.timer = window.setTimeout(() => (t.text = ""), 500);
          const hit = options.findIndex((o) => o.label.toLowerCase().startsWith(t.text));
          if (hit >= 0) setActive(hit);
        }
    }
  }

  const listId = `${id}-list`;
  const labelId = `${id}-label`;
  const glass = variant === "glass";

  return (
    <div
      className={`${glass ? "relative transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-inset has-[:focus-visible]:ring-saffron" : ""} ${className ?? ""}`}
    >
      {glass ? (
        <span id={labelId} className="block text-[11px] uppercase tracking-[0.2em] text-snow/60">
          {label}
        </span>
      ) : (
        <span id={labelId} className="sr-only">
          {label}
        </span>
      )}
      {name && <input type="hidden" name={name} value={value} />}
      <button
        ref={buttonRef}
        id={`${id}-button`}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-labelledby={`${labelId} ${id}-button`}
        onClick={() => (open ? close() : openList())}
        onKeyDown={onButtonKey}
        className={
          glass
            ? "group flex w-full items-center justify-between gap-2 text-left text-base font-semibold text-snow outline-none after:absolute after:inset-0 after:content-['']"
            : `group flex w-full items-center justify-between gap-2 rounded-2xl border bg-snow/5 px-4 py-3.5 text-left outline-none transition ${
                open ? "border-saffron bg-snow/10" : "border-snow/15 focus-visible:border-saffron"
              }`
        }
      >
        <span className={`truncate ${selected ? "text-snow" : "text-snow/40"}`}>{selected?.label ?? placeholder}</span>
        <ChevronDown
          className={`size-4 shrink-0 text-snow/60 transition duration-300 group-hover:text-saffron-2 ${open ? "rotate-180 text-saffron-2" : ""}`}
          aria-hidden="true"
        />
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && pos && (
              <motion.ul
                ref={listRef}
                id={listId}
                role="listbox"
                tabIndex={-1}
                aria-labelledby={labelId}
                aria-activedescendant={`${id}-opt-${active}`}
                onKeyDown={onListKey}
                data-lenis-prevent
                initial={{ opacity: 0, y: pos.top !== undefined ? -6 : 6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: pos.top !== undefined ? -6 : 6, scale: 0.98 }}
                transition={{ duration: 0.22, ease }}
                style={{
                  position: "fixed",
                  left: pos.left,
                  top: pos.top,
                  bottom: pos.bottom,
                  minWidth: Math.max(pos.width, 200),
                  maxHeight: pos.maxHeight,
                  transformOrigin: pos.top !== undefined ? "top" : "bottom",
                }}
                className="no-scrollbar z-[80] overflow-y-auto rounded-2xl bg-ink/95 p-1.5 font-sans text-sm text-snow shadow-2xl shadow-black/50 ring-1 ring-snow/15 outline-none backdrop-blur-xl"
              >
                {options.map((o, i) => {
                  const isSelected = o.value === value;
                  const isActive = i === active;
                  return (
                    <li
                      key={o.value}
                      id={`${id}-opt-${i}`}
                      data-index={i}
                      role="option"
                      aria-selected={isSelected}
                      onPointerMove={() => setActive(i)}
                      onClick={() => choose(i)}
                      className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 transition-colors ${
                        isActive ? "bg-snow/10" : ""
                      } ${isSelected ? "font-semibold text-saffron-2" : "text-snow/85"}`}
                    >
                      {o.label}
                      {isSelected && <Check className="size-4 shrink-0" aria-hidden="true" />}
                    </li>
                  );
                })}
              </motion.ul>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}
