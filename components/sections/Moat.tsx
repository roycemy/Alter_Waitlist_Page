"use client";

import { useRef } from "react";
import { Container, Eyebrow } from "./kit";
import { EASE, NO_REDUCED_MOTION, gsap, useGSAP } from "./gsap-setup";

/**
 * The moat — why a lab can't build this. Rewritten 2026-08-17 to the
 * incentive argument (the answer to "why doesn't Claude Projects just do
 * this?" — the one to have cold): each lab's memory only improves its own
 * app, and none will build the layer that improves a competitor. Stated in
 * our own voice, no investor attribution (see the sourcing audit in the
 * recipe skill). A half-viewport breather between the objection and the arc.
 */
export function Moat() {
  const root = useRef<HTMLElement>(null);
  const block = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(NO_REDUCED_MOTION, () => {
        const lines = gsap.utils.toArray<HTMLElement>(
          "[data-moat-line]",
          block.current,
        );
        gsap.from(lines, {
          x: -28,
          opacity: 0,
          duration: 0.9,
          ease: EASE,
          stagger: 0.14,
          scrollTrigger: { trigger: block.current, start: "top 78%" },
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative py-[clamp(64px,8vw,96px)]">
      <Container>
        <Eyebrow index="04" label="The moat" />
        <div className="rule mt-6 mb-12" />

        <div ref={block} className="max-w-[46rem]">
          <p
            data-moat-line
            className="text-balance font-display text-[clamp(1.35rem,2.9vw,2.3rem)] leading-[1.32] tracking-[-0.013em] text-ink"
          >
            OpenAI&apos;s memory makes ChatGPT better. Anthropic&apos;s makes
            Claude better.
          </p>
          <p
            data-moat-line
            className="mt-5 font-display text-[clamp(1.35rem,2.9vw,2.3rem)] leading-[1.32] tracking-[-0.013em] text-ink"
          >
            Neither will ever build the layer that improves a competitor.
          </p>
          <p
            data-moat-line
            className="mt-5 font-display text-[clamp(1.35rem,2.9vw,2.3rem)] leading-[1.32] tracking-[-0.013em] text-ink-soft"
          >
            Alter answers to no lab. Your file makes every one of them work
            like you.
          </p>
        </div>
      </Container>
    </section>
  );
}
