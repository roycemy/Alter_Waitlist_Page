"use client";

import { useRef } from "react";
import { Container, Eyebrow } from "./kit";
import { EASE, NO_REDUCED_MOTION, gsap, useGSAP } from "./gsap-setup";

/**
 * The push (03) — type-only, night act. The first line rises, gets struck
 * through and dims under the visitor's eyes; the answer lands sharp out of
 * blur. Eight words total.
 *
 * Markup is the end state: struck, dimmed premise + solid answer — a frozen
 * frame or JS-off both read as the finished argument.
 */
export function PushLine() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(NO_REDUCED_MOTION, () => {
        const premise = root.current?.querySelector("[data-premise]");
        const strike = root.current?.querySelector("[data-strike]");
        const answer = root.current?.querySelector("[data-answer]");
        if (!premise || !strike || !answer) return;

        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top 72%" },
        });

        tl.from(premise, {
          y: 22,
          opacity: 0,
          color: "#f2efe6",
          duration: 0.7,
          ease: EASE,
        })
          .from(
            strike,
            { scaleX: 0, duration: 0.5, ease: "power2.inOut" },
            0.55,
          )
          .from(
            answer,
            {
              y: 30,
              opacity: 0,
              filter: "blur(12px)",
              duration: 0.9,
              ease: EASE,
              clearProps: "filter",
            },
            0.85,
          );
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="act-night relative py-[clamp(96px,12vw,150px)]"
    >
      <Container>
        <Eyebrow index="03" label="The push" />

        <p
          data-premise
          className="relative mt-10 inline-block font-display text-[clamp(1.7rem,4.4vw,3.4rem)] leading-[1.12] tracking-[-0.016em] text-ink-faint"
        >
          Most AI agrees with you.
          <span
            aria-hidden
            data-strike
            className="absolute left-0 top-[0.58em] block h-[2px] w-full origin-left bg-current"
          />
        </p>

        <p
          data-answer
          className="mt-5 font-display text-[clamp(2.4rem,6.4vw,5.2rem)] leading-[1.04] tracking-[-0.02em] text-ink"
        >
          Alter pushes <em>back</em>.
        </p>
      </Container>
    </section>
  );
}
