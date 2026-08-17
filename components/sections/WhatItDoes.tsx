"use client";

import { useRef } from "react";
import { Container, Eyebrow } from "./kit";
import { EASE, NO_REDUCED_MOTION, gsap, useGSAP } from "./gsap-setup";

/**
 * The three things Alter builds — fields OF the file, never a features grid.
 * Copy is approved verbatim (recipe skill §3); titles and bodies do not change.
 */
const FIELDS = [
  {
    index: "01",
    label: "voice",
    title: "Voice.",
    body: "The words you use. The words you'd never use.",
  },
  {
    index: "02",
    label: "reasoning",
    title: "Reasoning.",
    body: "Whether you argue from data or from instinct. How you build a case.",
  },
  {
    index: "03",
    label: "decisions",
    title: "Decisions.",
    body: "What you say yes to fast. What you always push back on.",
  },
];

/** File metadata, same two marks the .alter card carries — one object, one file. */
const META: [string, string][] = [
  ["location", "this device"],
  ["network", "none"],
];

/** Registration ticks in the margin between sheet edge and certificate frame. */
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
 * What it actually does — ONE file object on a stack of sheets, its three
 * fields ruled off from each other like a passport data page. The entrance
 * reads as the file opening: the object rises whole, then its fields settle in.
 *
 * Markup is the end state — every field is complete and readable in SSR, with
 * JS off, and under prefers-reduced-motion; no start state drops below 0.25
 * opacity, so a fast scroller never meets an empty frame.
 */
export function WhatItDoes() {
  const root = useRef<HTMLElement>(null);
  const object = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(NO_REDUCED_MOTION, () => {
        const heads = gsap.utils.toArray<HTMLElement>(
          "[data-lift]",
          root.current,
        );
        gsap.from(heads, {
          y: 18,
          opacity: 0,
          duration: 0.8,
          ease: EASE,
          stagger: 0.08,
          scrollTrigger: { trigger: root.current, start: "top 72%" },
        });

        // The object arrives as a single thing — one sheet lifted onto the page.
        gsap.from(object.current, {
          y: 30,
          opacity: 0.25,
          duration: 0.9,
          ease: EASE,
          scrollTrigger: { trigger: object.current, start: "top 84%" },
        });

        // Then it opens: the fields settle in reading order, inside the frame.
        const fields = gsap.utils.toArray<HTMLElement>(
          "[data-field]",
          object.current,
        );
        gsap.from(fields, {
          y: 12,
          opacity: 0.25,
          duration: 0.7,
          delay: 0.22,
          ease: EASE,
          stagger: 0.09,
          scrollTrigger: { trigger: object.current, start: "top 84%" },
        });

        const close = root.current?.querySelector("[data-close]");
        if (close) {
          gsap.from(close, {
            y: 18,
            opacity: 0,
            duration: 0.8,
            ease: EASE,
            scrollTrigger: { trigger: close, start: "top 90%" },
          });
        }
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative py-[clamp(64px,8vw,96px)]">
      <Container>
        <div data-lift>
          <Eyebrow index="03" label="What it does" />
        </div>
        <div className="rule mt-6 mb-12" />

        <h2
          data-lift
          className="max-w-[42rem] font-display text-[clamp(1.35rem,2.5vw,1.95rem)] leading-[1.4] tracking-[-0.012em] text-ink"
        >
          Alter reads how you already write and decide — emails, docs, the
          corrections you make to AI output — and builds three things:
        </h2>

        {/* ── The file object ─────────────────────────────────────────────── */}
        <div className="relative mt-14">
          {/* Sheet edges it lifts off — the artifact family's paper thickness. */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 translate-x-[10px] translate-y-[10px] rounded-md border border-line bg-paper-deep"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 translate-x-[5px] translate-y-[5px] rounded-md border border-line bg-paper"
          />

          <div
            ref={object}
            className="relative rounded-md border border-line bg-paper p-[9px] shadow-[0_1px_2px_rgba(22,21,15,0.05),0_30px_60px_-32px_rgba(22,21,15,0.22)]"
          >
            <Brackets />

            <div className="relative rounded-[3px] border border-line">
              {/* Serial header — the file names itself before it lists anything. */}
              <div className="flex items-baseline justify-between gap-4 border-b border-line px-4 py-3 font-mono text-[9.5px] uppercase tracking-[0.26em] text-ink-faint sm:px-5">
                <span>you.alter · contents</span>
                <span className="shrink-0">03 fields</span>
              </div>

              {/* Fields — hairline-ruled columns at desktop, rows at mobile. */}
              <div className="grid md:grid-cols-3">
                {FIELDS.map((field) => (
                  <div
                    key={field.index}
                    data-field
                    className="border-t border-line px-4 py-7 first:border-t-0 sm:px-5 md:border-t-0 md:border-l md:px-6 md:py-9 md:first:border-l-0"
                  >
                    <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em]">
                      <span className="text-signature">{field.label}</span>
                      <span aria-hidden className="h-px flex-1 bg-line" />
                      <span className="text-ink-faint">{field.index}</span>
                    </div>
                    <h3 className="mt-5 font-display text-[1.7rem] leading-none tracking-[-0.015em] text-ink">
                      {field.title}
                    </h3>
                    <p className="mt-3.5 text-[15.5px] leading-[1.62] text-ink-soft">
                      {field.body}
                    </p>
                  </div>
                ))}
              </div>

              {/* Ruled meta block — the same two marks the .alter card carries. */}
              <dl className="grid grid-cols-[76px_1fr] gap-x-3 gap-y-1 border-t border-line px-4 py-3 font-mono text-[11.5px] leading-[1.5] sm:px-5">
                {META.map(([key, value]) => (
                  <div key={key} className="contents">
                    <dt className="text-ink-faint">{key}</dt>
                    <dd className="text-ink-soft">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        <p
          data-close
          className="mt-14 max-w-[38rem] text-[16.5px] leading-[1.68] text-ink-soft"
        >
          It compiles into one file. Yours. Not stored on our servers, not sold,
          not shared, not trained on. Delete it whenever you want. If you leave,
          it leaves with you.
        </p>
      </Container>
    </section>
  );
}
