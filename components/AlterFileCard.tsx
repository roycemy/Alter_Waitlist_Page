"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type Row = { text: string; cls?: string };

const ROWS: Row[] = [
  { text: "$ open you.alter", cls: "text-ink-faint" },
  { text: "" },
  { text: "format    .alter v0.1", cls: "text-ink-soft" },
  { text: "owner     you — and only you", cls: "text-ink-soft" },
  { text: "" },
  { text: "voice", cls: "text-signature" },
  { text: "  uses      “ship it” · “the real question is”" },
  { text: "  avoids    “synergy” · “circle back” · exclamation points" },
  { text: "  register  short when busy — reads as cold, isn’t" },
  { text: "" },
  { text: "reasoning", cls: "text-signature" },
  { text: "  argues    data first, analogy second" },
  { text: "  pushback  wants it early, not after the fact" },
  { text: "" },
  { text: "decisions", cls: "text-signature" },
  { text: "  fast yes  small reversible experiments" },
  { text: "  always no anything with lock-in" },
  { text: "" },
  { text: "location  this device", cls: "text-ink-soft" },
  { text: "network   none", cls: "text-ink-soft" },
];

/**
 * The .alter file — the page's proof object. SSR ships the complete card
 * (no hidden state: JS-off and reduced-motion readers get the full document);
 * with motion allowed, the client clears it once and types it back in, so the
 * typing itself is the entrance.
 */
export function AlterFileCard() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [visible, setVisible] = useState(ROWS.length);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (reduce) return;
    setVisible(0);
    setTyping(true);
  }, [reduce]);

  useEffect(() => {
    if (!typing || !inView) return;
    if (visible >= ROWS.length) return;
    const t = setTimeout(() => setVisible((v) => v + 1), visible === 0 ? 400 : 90);
    return () => clearTimeout(t);
  }, [typing, inView, visible]);

  return (
    <div ref={ref} className="relative w-full max-w-[440px]">
      {/* Sheet behind — a second page, suggesting history/versions */}
      <div className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-md border border-line bg-paper-deep" />

      <div className="relative rounded-md border border-line bg-white/70 shadow-[0_1px_2px_rgba(22,21,15,0.04),0_12px_40px_-12px_rgba(22,21,15,0.12)] backdrop-blur-sm">
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <span className="font-mono text-[11px] tracking-wide text-ink-faint">
            you.alter
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[11px] text-ink-faint">
            <span className="inline-block size-1.5 rounded-full bg-signature" />
            local
          </span>
        </div>
        {/* min-height = 20 rows × 1.85 line-height so typing causes zero layout shift */}
        <div className="min-h-[37em] px-5 py-4 font-mono text-[12.5px] leading-[1.85]">
          {ROWS.slice(0, visible).map((row, i) => (
            <div key={i} className={row.cls ?? "text-ink"}>
              {row.text === "" ? " " : row.text}
            </div>
          ))}
          {typing && visible < ROWS.length && <span className="caret" aria-hidden />}
        </div>
      </div>
    </div>
  );
}
