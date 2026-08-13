"use client";

import { useRef } from "react";
import { AlterFileCard } from "@/components/AlterFileCard";
import { WaitlistForm } from "@/components/WaitlistForm";
import { Container, Eyebrow } from "./kit";
import { EASE, NO_REDUCED_MOTION, gsap, useGSAP, SplitText } from "./gsap-setup";

/**
 * Hero — per-character cascade on the headline (SplitText), everything else
 * lifts in behind it. Total headline reveal stays under 1.2s.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const headline = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(NO_REDUCED_MOTION, () => {
        let played = false;

        // autoSplit re-splits on font load / reflow so the reveal never fights
        // a late webfont. The replay guard keeps the cascade a one-time event.
        const split = SplitText.create(headline.current, {
          type: "words,chars",
          mask: "words",
          autoSplit: true,
          aria: "hidden",
          onSplit(self) {
            if (played) {
              gsap.set(self.chars, { yPercent: 0, opacity: 1 });
              return;
            }
            played = true;
            // 49 chars × 0.011s + 0.62s duration ≈ 1.16s total.
            gsap.from(self.chars, {
              yPercent: 116,
              opacity: 0,
              duration: 0.62,
              ease: EASE,
              stagger: 0.011,
            });
          },
        });

        const fades = gsap.utils.toArray<HTMLElement>(
          "[data-hero-fade]",
          root.current,
        );
        // Measured thread signature: rise + blur-to-sharp, ~90-155ms stagger.
        gsap.from(fades, {
          y: 22,
          opacity: 0,
          filter: "blur(10px)",
          duration: 0.85,
          ease: EASE,
          stagger: 0.09,
          delay: 0.32,
          clearProps: "filter",
        });

        return () => split.revert();
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="act-night relative">
      <Container className="grid items-center gap-14 pb-[clamp(80px,11vw,120px)] pt-14 lg:grid-cols-[1.04fr_0.96fr] lg:gap-20 lg:pt-24">
        <div className="max-w-[40rem]">
          <div data-hero-fade>
            <Eyebrow index="01" label="The file" />
          </div>

          <h1
            ref={headline}
            aria-label="AI should learn how you think — not think for you."
            className="mt-8 font-display text-[clamp(2.5rem,6.6vw,5.5rem)] leading-[0.99] tracking-[-0.018em] text-ink"
          >
            AI should learn
            <br />
            how you <em>think</em> —
            <br />
            not think for you.
          </h1>

          <p
            data-hero-fade
            className="mt-8 max-w-[34rem] text-[16.5px] leading-[1.68] text-ink-soft"
          >
            Every AI you use forgets you the second you close the tab. Switch
            models, start over. You&apos;re spending the first ten minutes of
            every conversation re-explaining who you are before you can ask the
            real question.
          </p>

          <p
            data-hero-fade
            className="mt-5 max-w-[34rem] text-[16.5px] leading-[1.68] text-ink"
          >
            Alter is the file that ends that. It learns how you actually work —
            and carries it into every AI you already use.
          </p>

          <div
            data-hero-fade
            className="act-day mt-6 flex min-h-10 w-full flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-sm border border-line bg-paper px-4 py-2 font-mono text-[11px] lg:hidden"
          >
            <span className="text-signature">you.alter</span>
            <span className="text-ink-soft">voice · reasoning · decisions</span>
            <span className="flex items-center gap-1.5 text-ink-faint">
              <span
                aria-hidden
                className="inline-block size-1.5 rounded-full bg-signature"
              />
              local
            </span>
          </div>

          <div data-hero-fade className="mt-10">
            <WaitlistForm />
          </div>
        </div>

        <div className="act-day flex justify-center lg:justify-end">
          <AlterFileCard />
        </div>
      </Container>
    </section>
  );
}
