"use client";

import { useRef } from "react";
import { Container, Eyebrow } from "./kit";
import { EASE, NO_REDUCED_MOTION, gsap, useGSAP } from "./gsap-setup";

const CARDS = [
  {
    index: "01",
    title: "Voice.",
    body: "The words you use. The words you'd never use.",
  },
  {
    index: "02",
    title: "Reasoning.",
    body: "Whether you argue from data or from instinct. How you build a case.",
  },
  {
    index: "03",
    title: "Decisions.",
    body: "What you say yes to fast. What you always push back on.",
  },
];

/**
 * What it actually does — three cards rise and settle, each with a small
 * counter-rotation that resolves to flat. Hand-built on paper/ink tokens.
 */
export function WhatItDoes() {
  const root = useRef<HTMLElement>(null);
  const grid = useRef<HTMLDivElement>(null);

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

        const cards = gsap.utils.toArray<HTMLElement>(
          "[data-card]",
          grid.current,
        );
        gsap.from(cards, {
          y: 58,
          opacity: 0,
          rotate: (i: number) => (i % 2 === 0 ? -1.4 : 1.4),
          transformOrigin: "50% 100%",
          duration: 0.95,
          ease: EASE,
          stagger: 0.12,
          scrollTrigger: { trigger: grid.current, start: "top 82%" },
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
    <section
      ref={root}
      className="relative py-[clamp(64px,8vw,96px)]"
    >
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

        <div
          ref={grid}
          className="mt-14 grid gap-5 md:grid-cols-3 md:gap-6"
        >
          {CARDS.map((card) => (
            <article
              key={card.index}
              data-card
              className="rounded-md border border-line bg-white/60 p-7 shadow-[0_1px_2px_rgba(22,21,15,0.03),0_18px_44px_-28px_rgba(22,21,15,0.16)]"
            >
              <div className="flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-faint">
                <span>{card.index}</span>
                <span className="normal-case text-signature">.alter</span>
              </div>
              <div className="mt-6 h-px w-full bg-line" />
              <h3 className="mt-6 font-display text-[1.7rem] leading-none tracking-[-0.015em] text-ink">
                {card.title}
              </h3>
              <p className="mt-4 text-[15.5px] leading-[1.62] text-ink-soft">
                {card.body}
              </p>
            </article>
          ))}
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
