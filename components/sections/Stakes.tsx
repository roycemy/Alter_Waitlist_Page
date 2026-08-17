"use client";

import { Fragment, useRef } from "react";
import { Container, Eyebrow } from "./kit";
import { EASE, NO_REDUCED_MOTION, gsap, useGSAP } from "./gsap-setup";

/**
 * Rewritten 2026-08-13 per Yash's hedge-cut directive: claims ≤9 words
 * (resend 7-10, linear 5-6, thread 4-5 measured), exactly one long sentence —
 * the recognition list (thread precedent: one 20-word sentence max). Clause 3
 * of the old copy pointed at the person ("moments you're not at your best");
 * this points at the work.
 */
/* Cut 2026-08-17 per Yash: the "catch the work that slips" run removed —
   the push demo (04) now does that job by showing it. */
const PHRASES = [
  "Most AI is optimizing to agree with you.",
  "That's comfortable.",
  "Comfort doesn't make anything better.",
];

/**
 * Stakes — compressed 2026-08-17 per Royce's doc (P5): the sticky 150/170vh
 * runway and pinned scroll-scrub cost more scroll tax than the section earns,
 * especially once the push-demo section gives the page its real wow moment.
 * This is now a compact, non-sticky band. The recognition list (this
 * paragraph) is one of the page's two "feel-seen" engines per STATE.md — it
 * must read instantly, at rest, with no scroll gesture required.
 *
 * Base state is markup-is-end-state: every phrase is fully readable at
 * text-ink-soft with zero animation applied (JS-off / reduced-motion both
 * land here). The last two phrases pin to the explicit #c7c1b2 tier rather
 * than the text-ink-faint token — ink-faint's night value (#8a8372) risks
 * dropping below AA at this weight; #c7c1b2 is the measured-safe floor and
 * happens to equal the section's own ink-soft base, so it can never go
 * dimmer than the rest of the paragraph.
 */
export function Stakes() {
  const root = useRef<HTMLElement>(null);
  const copy = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(NO_REDUCED_MOTION, () => {
        const phrases = gsap.utils.toArray<HTMLElement>(
          "[data-phrase]",
          copy.current,
        );

        // Once-on-scroll stagger, distinct from the hero's per-character
        // cascade and the what-it-does cards' rise-with-rotation: whole
        // phrases rise 18px and unblur together, 0.08s apart.
        gsap.from(phrases, {
          y: 18,
          filter: "blur(8px)",
          opacity: 0,
          duration: 0.8,
          ease: EASE,
          stagger: 0.08,
          clearProps: "filter",
          scrollTrigger: { trigger: copy.current, start: "top 82%" },
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="act-night relative py-[clamp(72px,9vw,110px)]"
    >
      <Container>
        <Eyebrow index="02" label="The stakes" />
        <div className="rule mt-6 mb-12" />
        <p
          ref={copy}
          className="max-w-[54rem] font-display text-[clamp(1.5rem,3.9vw,3.1rem)] leading-[1.3] tracking-[-0.014em] text-ink-soft"
        >
          {PHRASES.map((phrase, i) => (
            <Fragment key={phrase}>
              <span
                data-phrase
                className={
                  i >= PHRASES.length - 2
                    ? "inline-block text-[#c7c1b2]"
                    : "inline-block"
                }
              >
                {phrase}
              </span>
              {i < PHRASES.length - 1 ? " " : ""}
            </Fragment>
          ))}
        </p>
      </Container>
    </section>
  );
}
