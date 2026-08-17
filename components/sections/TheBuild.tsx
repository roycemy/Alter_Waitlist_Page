"use client";

import { useRef } from "react";
import { AlterFileCard } from "@/components/AlterFileCard";
import { Container, Eyebrow } from "./kit";
import { EASE, NO_REDUCED_MOTION, gsap, useGSAP } from "./gsap-setup";

/**
 * The build (03) — new 2026-08-17 teardown pass. Replaces WhatItDoes (which
 * described the file's fields; the card back already carries them). This
 * section SHOWS the actual product flow from the July calls: a ten-minute
 * interview → the kernel compiles into the personality card → the card
 * attaches to the tools you already use, each reading only its slice.
 *
 * The AlterFileCard lives HERE now, demoted from hero shrine to what it
 * really is: the output of step two. Flipping it = inspecting what it
 * learned.
 *
 * Honesty gate: the interview chips and attach rows are product-flow
 * illustration, labeled as such in the mono caption.
 */

const INTERVIEW: {
  q: string;
  chips: { text: string; picked?: boolean }[];
}[] = [
  {
    q: "Where should pushback land?",
    chips: [
      { text: "early, before I'm attached", picked: true },
      { text: "after the draft" },
      { text: "only when asked" },
    ],
  },
  {
    q: "How do you argue a case?",
    chips: [
      { text: "data first, analogy second", picked: true },
      { text: "instinct, then evidence" },
    ],
  },
];

const ATTACH: [string, string][] = [
  ["chatgpt", "reads the way you write"],
  ["claude", "reads the way you argue"],
  ["cursor", "reads the way you build"],
];

const STEPS = [
  { index: "01", title: "You talk." },
  { index: "02", title: "It compiles." },
  { index: "03", title: "It attaches." },
];

function Chip({ text, picked }: { text: string; picked?: boolean }) {
  return (
    <span
      className={
        picked
          ? "inline-flex items-center gap-2 rounded-full border border-signature/70 px-3.5 py-1.5 text-[13.5px] leading-none text-ink"
          : "inline-flex items-center rounded-full border border-line px-3.5 py-1.5 text-[13.5px] leading-none text-ink-faint"
      }
    >
      {picked ? (
        <span aria-hidden className="size-1.5 rounded-full bg-signature" />
      ) : null}
      {text}
    </span>
  );
}

export function TheBuild() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(NO_REDUCED_MOTION, () => {
        gsap.utils
          .toArray<HTMLElement>("[data-step]", root.current)
          .forEach((step) => {
            const rule = step.querySelector("[data-step-rule]");
            const body = step.querySelectorAll("[data-step-body]");
            const tl = gsap.timeline({
              scrollTrigger: { trigger: step, start: "top 78%" },
            });
            if (rule) {
              tl.from(rule, {
                scaleX: 0,
                transformOrigin: "left center",
                duration: 0.7,
                ease: EASE,
              });
            }
            tl.from(
              body,
              {
                y: 24,
                opacity: 0,
                filter: "blur(8px)",
                duration: 0.85,
                ease: EASE,
                stagger: 0.1,
                clearProps: "filter",
              },
              0.12,
            );
          });

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
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative py-[clamp(64px,8vw,96px)]">
      <Container>
        <div data-lift>
          <Eyebrow index="03" label="The build" />
        </div>
        <div className="rule mt-6 mb-12" />

        <h2
          data-lift
          className="max-w-[44rem] font-display text-[clamp(1.6rem,3.4vw,2.6rem)] leading-[1.25] tracking-[-0.014em] text-ink"
        >
          It takes one conversation.
        </h2>
        <p
          data-lift
          className="mt-4 max-w-[38rem] text-[16.5px] leading-[1.68] text-ink-soft"
        >
          A ten-minute interview. Plain questions, tap to answer. Alter does
          the rest on your device.
        </p>

        <div className="mt-16 space-y-[clamp(56px,7vw,88px)]">
          {/* ── Step 01 · You talk ─────────────────────────────────────── */}
          <div data-step className="grid gap-6 md:grid-cols-[200px_1fr] md:gap-12">
            <div>
              <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
                <span className="text-signature">{STEPS[0].index}</span>
                <span aria-hidden data-step-rule className="h-px w-8 bg-line" />
              </div>
              <h3 className="mt-3 font-display text-[1.7rem] leading-none tracking-[-0.015em] text-ink">
                {STEPS[0].title}
              </h3>
            </div>
            <div className="max-w-[36rem] space-y-6">
              {INTERVIEW.map(({ q, chips }) => (
                <div key={q} data-step-body>
                  <p className="font-mono text-[11.5px] uppercase tracking-[0.18em] text-ink-faint">
                    {q}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {chips.map((chip) => (
                      <Chip key={chip.text} {...chip} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Step 02 · It compiles ──────────────────────────────────── */}
          <div data-step className="grid gap-6 md:grid-cols-[200px_1fr] md:gap-12">
            <div>
              <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
                <span className="text-signature">{STEPS[1].index}</span>
                <span aria-hidden data-step-rule className="h-px w-8 bg-line" />
              </div>
              <h3 className="mt-3 font-display text-[1.7rem] leading-none tracking-[-0.015em] text-ink">
                {STEPS[1].title}
              </h3>
              <p className="mt-4 max-w-[24rem] text-[14.5px] leading-[1.6] text-ink-soft">
                Voice, reasoning, decisions — reviewed by you, then sealed into
                the card. Open it.
              </p>
            </div>
            <div data-step-body className="flex justify-start">
              <div className="w-full max-w-[440px]">
                <AlterFileCard />
              </div>
            </div>
          </div>

          {/* ── Step 03 · It attaches ──────────────────────────────────── */}
          <div data-step className="grid gap-6 md:grid-cols-[200px_1fr] md:gap-12">
            <div>
              <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
                <span className="text-signature">{STEPS[2].index}</span>
                <span aria-hidden data-step-rule className="h-px w-8 bg-line" />
              </div>
              <h3 className="mt-3 font-display text-[1.7rem] leading-none tracking-[-0.015em] text-ink">
                {STEPS[2].title}
              </h3>
              <p className="mt-4 max-w-[24rem] text-[14.5px] leading-[1.6] text-ink-soft">
                Each tool reads only its slice.
              </p>
            </div>
            <div data-step-body className="w-full max-w-[36rem]">
              <div className="rounded-md border border-line">
                {ATTACH.map(([tool, slice], i) => (
                  <div
                    key={tool}
                    className={`flex items-baseline justify-between gap-4 px-4 py-3.5 font-mono text-[12.5px] sm:px-5 ${
                      i > 0 ? "border-t border-line" : ""
                    }`}
                  >
                    <span className="text-ink">{tool}</span>
                    <span aria-hidden className="h-px flex-1 self-center bg-line" />
                    <span className="text-ink-soft">{slice}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
                product flow · illustrated
              </p>
            </div>
          </div>
        </div>

        <p
          data-lift
          className="mt-16 max-w-[38rem] text-[16.5px] leading-[1.68] text-ink-soft"
        >
          One file. Yours. Never on our servers, never sold, never trained on.
          Leave, and it leaves with you.
        </p>
      </Container>
    </section>
  );
}
