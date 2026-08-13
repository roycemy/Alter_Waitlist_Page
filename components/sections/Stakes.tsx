"use client";

import { useRef } from "react";
import { Container, Eyebrow } from "./kit";
import { NO_REDUCED_MOTION, gsap, useGSAP } from "./gsap-setup";

/* Night-act scrub endpoints — mirror .act-night tokens in globals.css. */
const NIGHT_FAINT = "#8a8372";
const NIGHT_INK = "#f5f3ec";

/**
 * The paragraph, chunked at its own clause boundaries. Concatenated with
 * single spaces this is the approved copy, character for character.
 */
const PHRASES = [
  "Most AI is optimizing to agree with you.",
  "That's comfortable, and comfort doesn't make you better at anything.",
  "Alter is built to know your patterns well enough to catch the moments you're not at your best —",
  "the rushed email, the argument you're about to lose because you're arguing the wrong way, the draft that's technically fine and actually forgettable.",
  "Not by being a friend.",
  "By knowing your work well enough to push it further than you would alone.",
];

/**
 * Stakes — the scroll moment. The section holds still while the sentence
 * darkens clause by clause against the scroll position. Base state is
 * ink-soft, so with JS off or reduced motion on the paragraph reads normally.
 */
export function Stakes() {
  const root = useRef<HTMLElement>(null);
  const runway = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(NO_REDUCED_MOTION, () => {
        const phrases = gsap.utils.toArray<HTMLElement>(
          "[data-phrase]",
          copy.current,
        );

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: runway.current,
            start: "top 55%",
            end: "bottom bottom",
            scrub: 0.6,
          },
        });

        phrases.forEach((phrase, i) => {
          tl.fromTo(
            phrase,
            { color: NIGHT_FAINT },
            { color: NIGHT_INK, ease: "none", duration: 1 },
            i === 0 ? 0 : "<0.62",
          );
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="act-night relative">
      <div ref={runway} className="h-[150vh] md:h-[170vh]">
        <div className="sticky top-0 flex min-h-[100svh] items-center py-16 md:py-24">
          <Container>
            <Eyebrow index="02" label="The stakes" />
            <div className="rule mt-6 mb-12" />
            <p
              ref={copy}
              className="max-w-[50rem] font-display text-[clamp(1.2rem,3.1vw,2.4rem)] leading-[1.38] tracking-[-0.012em] text-ink-soft"
            >
              {PHRASES.map((phrase, i) => (
                <span key={phrase} data-phrase>
                  {phrase}
                  {i < PHRASES.length - 1 ? " " : ""}
                </span>
              ))}
            </p>
          </Container>
        </div>
      </div>
    </section>
  );
}
