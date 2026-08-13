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
    <section ref={root} className="act-night relative py-[clamp(96px,13vw,150px)]">
      <Container>
        <div className="rule mb-16" />
        <div ref={block} className="mx-auto max-w-[40rem] text-center">
          <Eyebrow index="07" label="Early access" className="justify-center" />

          <p className="mx-auto mt-8 max-w-[30rem] text-balance font-display text-[clamp(1.6rem,3.4vw,2.45rem)] leading-[1.24] tracking-[-0.018em] text-ink">
            Early access is going out by hand, a few people at a time.
          </p>

          <div className="mt-10 flex justify-center">
            <WaitlistForm id="waitlist" />
          </div>

          <p className="mt-6 font-mono text-[11.5px] leading-[1.7] text-ink-faint">
            No spam, no drip campaign. One note when it&apos;s ready.
          </p>
        </div>
      </Container>
    </section>
  );
}
