"use client";

import { useRef } from "react";
import { Container, Eyebrow } from "./kit";
import { EASE, NO_REDUCED_MOTION, gsap, useGSAP } from "./gsap-setup";

const STEPS = [
  {
    label: "Year one:",
    body: "the file works — noticeably better answers, in the tools you already use.",
  },
  {
    label: "Year two:",
    body: "other tools can call it — the layer underneath everything.",
  },
  {
    label: "Year three:",
    body: "it's not our app anymore. It's the format. The question stops being which AI you use, and becomes where your context lives.",
  },
];

/**
 * Where it goes — rebuilt 2026-08-17 per Royce's doc (P7): manifesto, not
 * roadmap. The timeline rail + dots read as product-roadmap UI; this is a
 * founding document instead. Each year is a standalone block: a huge mono
 * year label stands alone above the statement (the "Year one:" prefix from
 * the approved copy becomes the label — the words themselves are unchanged),
 * then the statement itself sets in display serif, large enough to read as
 * something declared rather than scheduled.
 */
export function Arc() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(NO_REDUCED_MOTION, () => {
        // Masked-line reveal, staggered block to block — distinct from the
        // moat's left-slide stagger and the CTA's single fade-up. The mask
        // (overflow-hidden parent) stays untransformed so ScrollTrigger
        // measures a stable box; only the inner wrapper travels.
        const inners = gsap.utils.toArray<HTMLElement>(
          "[data-year-inner]",
          track.current,
        );
        gsap.from(inners, {
          yPercent: 110,
          duration: 0.9,
          ease: EASE,
          stagger: 0.18,
          scrollTrigger: { trigger: track.current, start: "top 78%" },
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative py-[clamp(80px,11vw,120px)]">
      <Container>
        <Eyebrow index="07" label="Where it goes" />
        <div className="rule mt-6 mb-14" />

        <div ref={track}>
          {STEPS.map((step, i) => (
            <div
              key={step.label}
              data-year
              className={i > 0 ? "mt-16" : undefined}
            >
              <div className="overflow-hidden">
                <div data-year-inner>
                  <p className="font-mono text-[clamp(0.85rem,1.5vw,1.15rem)] uppercase tracking-[0.28em] text-signature">
                    {step.label.replace(":", "")}
                  </p>
                  <p className="mt-4 max-w-[46rem] font-display text-[clamp(1.6rem,3.4vw,2.6rem)] leading-[1.25] tracking-[-0.014em] text-ink">
                    {step.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
