"use client";

import { useRef } from "react";
import { Container, Eyebrow } from "./kit";
import { EASE, NO_REDUCED_MOTION, gsap, useGSAP } from "./gsap-setup";

/**
 * The moat — why a lab can't build this. Three sentences, stated in our own
 * voice (no investor attribution: the Battery/Stone Point transcripts inform
 * the argument but never said it — see the banned-intent/sourcing audit in
 * the recipe skill). A half-viewport breather between the objection and the
 * arc, per the pacing rhythm.
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
        <Eyebrow index="05" label="The moat" />
        <div className="rule mt-6 mb-12" />

        <div ref={block} className="max-w-[46rem]">
          <p
            data-moat-line
            className="font-display text-[clamp(1.35rem,2.9vw,2.3rem)] leading-[1.32] tracking-[-0.013em] text-ink"
          >
            A lab needs your data on its servers — that&apos;s how the next
            model gets trained.
          </p>
          <p
            data-moat-line
            className="mt-5 font-display text-[clamp(1.35rem,2.9vw,2.3rem)] leading-[1.32] tracking-[-0.013em] text-ink"
          >
            The .alter file lives on your device and reads into any model.
          </p>
          <p
            data-moat-line
            className="mt-5 font-display text-[clamp(1.35rem,2.9vw,2.3rem)] leading-[1.32] tracking-[-0.013em] text-ink-soft"
          >
            To copy it, they&apos;d have to abandon the business model that
            funds them.
          </p>
        </div>
      </Container>
    </section>
  );
}
