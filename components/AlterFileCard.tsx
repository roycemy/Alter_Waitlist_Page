"use client";

import { motion, useAnimate, useReducedMotion } from "motion/react";
import { useEffect, useLayoutEffect, useState } from "react";

/** power3.out equivalent — the page's single easing family. */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Fine paper grain, same source as the page's .grain layer. */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E\")";

/**
 * The contents of the file — the recognition engine. These rows are the reason
 * someone feels seen; they are copy, not decoration. Changes go to Yash.
 */
const GROUPS: { label: string; rows: [string, string][] }[] = [
  {
    label: "voice",
    rows: [
      ["uses", "“ship it” · “the real question is”"],
      ["avoids", "“synergy” · “circle back” · exclamation points"],
      ["register", "short when busy — reads as cold, isn’t"],
    ],
  },
  {
    label: "reasoning",
    rows: [
      ["argues", "data first, analogy second"],
      ["pushback", "wants it early, not after the fact"],
    ],
  },
  {
    label: "decisions",
    rows: [
      ["fast yes", "small reversible experiments"],
      ["always no", "anything with lock-in"],
    ],
  },
];

const META: [string, string][] = [
  ["location", "this device"],
  ["network", "none"],
];

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Shared card shell — one object, two faces. */
const FACE =
  "act-day [grid-area:1/1] flex min-h-[500px] flex-col rounded-md border border-line bg-paper p-[9px] shadow-[0_1px_2px_rgba(0,0,0,0.18),0_30px_60px_-26px_rgba(0,0,0,0.55)]";

function Grain() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-md"
      style={{ backgroundImage: GRAIN, opacity: 0.05 }}
    />
  );
}

/** Registration brackets in the margin between card edge and inner frame. */
function Brackets() {
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0">
      <span className="absolute left-[3px] top-[3px] size-[7px] border-l border-t border-ink-faint/45" />
      <span className="absolute right-[3px] top-[3px] size-[7px] border-r border-t border-ink-faint/45" />
      <span className="absolute bottom-[3px] left-[3px] size-[7px] border-b border-l border-ink-faint/45" />
      <span className="absolute bottom-[3px] right-[3px] size-[7px] border-b border-r border-ink-faint/45" />
    </span>
  );
}

/**
 * The .alter file — the page's proof object. An artifact, not a terminal:
 * a thick paper card on a stack of sheets that flips to its contents.
 *
 * Markup is the end state: the server renders BOTH faces complete, so JS-off
 * and reduced-motion readers get the object and the document. The back face is
 * hidden by the flip transform (never display:none) and by aria-hidden, which
 * swaps with the flip so the reading order always matches what is visible.
 */
export function AlterFileCard() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [scope, animate] = useAnimate<HTMLDivElement>();

  // Entrance: rise + blur-to-sharp at the hero card's measured offset (+380ms).
  // Started from a layout effect so the hidden state is never painted, and
  // never expressed in SSR markup.
  useIsomorphicLayoutEffect(() => {
    const el = scope.current;
    if (!el) return;

    if (reduce) {
      animate(
        el,
        { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
        { duration: 0 },
      );
      return;
    }

    animate(
      el,
      { opacity: 0, y: 26, scale: 0.97, filter: "blur(10px)" },
      { duration: 0 },
    );
    const controls = animate(
      el,
      { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
      { duration: 0.85, delay: 0.38, ease: EASE },
    );
    return () => controls.stop();
  }, [reduce, animate, scope]);

  return (
    <div ref={scope} className="relative w-full max-w-[440px]">
      {/* Overlay control: keeps the card's text in the accessibility tree as
          document content instead of collapsing it into a button label. */}
      <button
        type="button"
        aria-pressed={open}
        onClick={() => setOpen((v) => !v)}
        className="peer absolute inset-0 z-10 cursor-pointer rounded-md focus-visible:[outline:2px_solid_var(--color-signature)] focus-visible:[outline-offset:6px]"
      >
        <span className="sr-only">
          {open ? "Close the .alter file" : "Open the .alter file"}
        </span>
      </button>

      {/* The stack it lifts off — paper has thickness and history. */}
      <span
        aria-hidden
        className="act-day absolute inset-0 translate-x-[11px] translate-y-[11px] rounded-md border border-line bg-paper-deep"
      />
      <span
        aria-hidden
        className="act-day absolute inset-0 translate-x-[5.5px] translate-y-[5.5px] rounded-md border border-line bg-paper"
      />

      <div
        className="relative transition-transform duration-300 ease-out peer-hover:-translate-y-[2px]"
        style={{ perspective: 1200 }}
      >
        <motion.div
          className="grid"
          initial={false}
          animate={{ rotateY: open ? 180 : 0 }}
          transition={reduce ? { duration: 0 } : { duration: 0.8, ease: EASE }}
          style={{ transformStyle: "preserve-3d", willChange: "transform" }}
        >
          {/* ── FRONT: the object ─────────────────────────────────────────── */}
          <div
            aria-hidden={open}
            className={FACE}
            style={{ backfaceVisibility: "hidden" }}
          >
            <Grain />
            <Brackets />

            <div className="relative flex flex-1 flex-col rounded-[3px] border border-line">
              <div className="flex items-baseline justify-between border-b border-line px-4 py-3 font-mono text-[9.5px] uppercase tracking-[0.26em] text-ink-faint">
                <span>Alter · Personal file</span>
                <span>v0.1</span>
              </div>

              <div className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-10">
                <span
                  className="font-display text-[clamp(96px,22vw,136px)] leading-[0.8] text-ink"
                  style={{ textShadow: "0 1px 0 rgba(250,249,245,0.9)" }}
                >
                  <em>a</em>
                  <span className="text-signature">.</span>
                </span>
                <span className="font-mono text-[10.5px] uppercase tracking-[0.32em] text-ink-soft">
                  you.alter
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-line px-4 py-3">
                {/* Seal — the mark of intent, the one accent that isn't type. */}
                <span
                  aria-hidden
                  className="relative flex size-8 items-center justify-center rounded-full border border-signature/45"
                >
                  <span className="absolute inset-[3px] rounded-full border border-signature/25" />
                  <span className="size-[5px] rounded-full bg-signature" />
                </span>
                <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-ink-faint">
                  tap to open
                </span>
              </div>
            </div>
          </div>

          {/* ── BACK: the contents ────────────────────────────────────────── */}
          <div
            aria-hidden={!open}
            className={FACE}
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <Grain />
            <Brackets />

            <div className="relative flex flex-1 flex-col rounded-[3px] border border-line">
              <div className="flex items-baseline justify-between border-b border-line px-4 py-3 font-mono text-[9.5px] uppercase tracking-[0.26em] text-ink-faint">
                <span>Contents</span>
                <span>you.alter</span>
              </div>

              <div className="flex-1 px-4 py-4">
                {GROUPS.map((group) => (
                  <div key={group.label} className="mb-4 last:mb-0">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-signature">
                        {group.label}
                      </span>
                      <span aria-hidden className="h-px flex-1 bg-line" />
                    </div>
                    <dl className="mt-2 grid grid-cols-[72px_1fr] gap-x-3 gap-y-1.5 font-mono text-[12.5px] leading-[1.55]">
                      {group.rows.map(([key, value]) => (
                        <div key={key} className="contents">
                          <dt className="text-ink-faint">{key}</dt>
                          <dd className="text-ink">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
              </div>

              <dl className="grid grid-cols-[72px_1fr] gap-x-3 gap-y-1 border-t border-line px-4 py-3 font-mono text-[11.5px] leading-[1.5]">
                {META.map(([key, value]) => (
                  <div key={key} className="contents">
                    <dt className="text-ink-faint">{key}</dt>
                    <dd className="text-ink-soft">{value}</dd>
                  </div>
                ))}
              </dl>

              <div className="flex items-center justify-between border-t border-line px-4 py-3 font-mono text-[9.5px] uppercase tracking-[0.22em] text-ink-faint">
                <span>Alter · Personal file</span>
                <span>tap to close</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
