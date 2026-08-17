"use client";

import { useRef } from "react";
import { WaitlistForm } from "@/components/WaitlistForm";
import { Container, Eyebrow } from "./kit";
import { EASE, NO_REDUCED_MOTION, gsap, useGSAP } from "./gsap-setup";

/**
 * CTA — after five worked entrances, restraint: the whole block lifts once,
 * as a single object.
 */
export function Cta() {
  const root = useRef<HTMLElement>(null);
  const block = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(NO_REDUCED_MOTION, () => {
        gsap.from(block.current, {
          y: 34,
          opacity: 0,
          duration: 1.1,
          ease: EASE,
          scrollTrigger: { trigger: block.current, start: "top 84%" },
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="act-night relative py-[clamp(110px,14vw,170px)]">
      <Container>
        <div className="rule mb-16" />
        <div ref={block} className="mx-auto max-w-[44rem] text-center">
          <Eyebrow index="05" label="Early access" className="justify-center" />

          {/*
            YASH GATE: enable only if the numbers are true. Do not ship until
            Yash confirms an actual scarcity count and reply-time promise —
            trust rule 5 (calm, never pressure) forbids invented numbers.

            Royce-draft alternative copy (specificity + reply-time promise):
            Specificity line: "We're letting in fifty people this month."
            Reply-time promise: "We'll write back within a week."
            Softer human-promise (also gated, verifier flagged as unconfirmed):
            "Every access note is written by a person."
          */}

          <p className="mx-auto mt-10 max-w-[34rem] text-balance font-display text-[clamp(2.2rem,4.8vw,3.6rem)] leading-[1.15] tracking-[-0.02em] text-ink">
            Early access is going out by hand, a few people at a time.
          </p>

          <p className="mx-auto mt-6 max-w-[30rem] text-[16.5px] leading-[1.68] text-ink-soft">
            One file. Your device. No servers. Leave, and it leaves with you.
          </p>

          <div className="mt-12 flex justify-center">
            <div className="mx-auto w-full max-w-[34rem] [&>form]:max-w-full [&_button]:h-14 [&_button]:px-8 [&_button]:text-base [&_input]:h-14 [&_input]:px-4 [&_input]:text-base">
              <WaitlistForm id="waitlist" />
            </div>
          </div>

          <p className="mt-8 font-mono text-[11.5px] leading-[1.7] text-ink-faint">
            No spam, no drip campaign. One note when it&apos;s ready.
          </p>
        </div>
      </Container>
    </section>
  );
}
