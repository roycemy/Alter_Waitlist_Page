"use client";

import { useRef } from "react";
import { Container, Eyebrow } from "./kit";
import { EASE, NO_REDUCED_MOTION, gsap, useGSAP } from "./gsap-setup";

/**
 * Like you (02) — 2026-08-17 type-only rebuild per Yash: no cards, no panels,
 * no UI mockups; the words ARE the visual. Three giant lines, one per tool.
 * On desktop the section pins and the visitor's scroll walks focus down the
 * stack — one line lit at a time — then the finale lights all three.
 *
 * Markup is the end state: all three lines fully inked. JS-off, reduced
 * motion, and any frozen scrub frame all read as a complete argument.
 */
const LINES = ["ChatGPT writes", "Claude argues", "Cursor builds"];

export function LikeYou() {
  const root = useRef<HTMLElement>(null);
  const runway = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop: pinned focus wave, scrub-bound to the runway.
      mm.add(`(min-width: 768px) and ${NO_REDUCED_MOTION}`, () => {
        const lines = gsap.utils.toArray<HTMLElement>(
          "[data-line]",
          stage.current,
        );
        if (lines.length < 3) return;

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: runway.current,
            start: () => `top top+=${window.innerHeight * 0.15}`,
            end: "bottom bottom",
            scrub: 0.55,
            invalidateOnRefresh: true,
          },
        });

        // Each line arrives from soft-blur ghost to full ink…
        tl.from(lines[0], { opacity: 0.18, filter: "blur(7px)", duration: 0.24 }, 0.02)
          .to(lines[0], { opacity: 0.4, duration: 0.2 }, 0.3)
          .from(lines[1], { opacity: 0.18, filter: "blur(7px)", duration: 0.24 }, 0.3)
          .to(lines[1], { opacity: 0.4, duration: 0.2 }, 0.58)
          .from(lines[2], { opacity: 0.18, filter: "blur(7px)", duration: 0.24 }, 0.58)
          // …and the finale restores the whole stack to the markup state.
          .to([lines[0], lines[1]], { opacity: 1, duration: 0.16 }, 0.84);
      });

      // Mobile / stacked: one staggered unblur, no pin.
      mm.add(`(max-width: 767px) and ${NO_REDUCED_MOTION}`, () => {
        const lines = gsap.utils.toArray<HTMLElement>(
          "[data-line]",
          stage.current,
        );
        gsap.from(lines, {
          y: 20,
          opacity: 0,
          filter: "blur(8px)",
          duration: 0.85,
          ease: EASE,
          stagger: 0.12,
          clearProps: "filter",
          scrollTrigger: { trigger: stage.current, start: "top 78%" },
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative">
      <div ref={runway} className="relative md:h-[240vh]">
        <div
          ref={stage}
          className="md:sticky md:top-[15vh] md:flex md:h-[70vh] md:flex-col md:justify-center"
        >
          <Container className="py-[clamp(72px,9vw,110px)] md:py-0">
            <Eyebrow index="02" label="Like you" />
            <div className="mt-10 space-y-[0.35em]">
              {LINES.map((head) => (
                <p
                  key={head}
                  data-line
                  className="font-display text-[clamp(2.4rem,6.6vw,5.4rem)] leading-[1.06] tracking-[-0.02em] text-ink"
                >
                  {head} like <em>you</em>.
                </p>
              ))}
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
