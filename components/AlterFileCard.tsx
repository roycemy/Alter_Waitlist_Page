"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
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

export function AlterFileCard() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [visible, setVisible] = useState(reduce ? ROWS.length : 0);

  useEffect(() => {
    if (reduce) return;
    if (!inView) return;
    if (visible >= ROWS.length) return;
    const t = setTimeout(() => setVisible((v) => v + 1), visible === 0 ? 400 : 90);
    return () => clearTimeout(t);
  }, [inView, visible, reduce]);

  return (
    <motion.div
      ref={ref}
      initial={
        reduce
          ? false
          : { opacity: 0, y: 26, scale: 0.97, filter: "blur(10px)" }
      }
      animate={
        !reduce && inView
          ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
          : undefined
      }
      transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.38 }}
      className="relative w-full max-w-[440px]"
    >
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
        <div className="px-5 py-4 font-mono text-[12.5px] leading-[1.85]">
          {ROWS.slice(0, visible).map((row, i) => (
            <div key={i} className={row.cls ?? "text-ink"}>
              {row.text === "" ? " " : row.text}
            </div>
          ))}
          {!reduce && visible < ROWS.length && (
            <span className="caret" aria-hidden />
          )}
        </div>
      </div>
    </motion.div>
  );
}
