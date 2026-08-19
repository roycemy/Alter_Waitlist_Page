"use client";

import { useRef } from "react";
import { WaitlistForm } from "@/components/WaitlistForm";
import { Container, Eyebrow } from "./kit";
import { EASE, NO_REDUCED_MOTION, gsap, useGSAP, SplitText } from "./gsap-setup";

/**
 * Rebuilt 2026-08-17 (teardown pass): the card is no longer the hero shrine —
 * it's the OUTPUT of section 03 (The build). The hero is the claim, the fix,
 * and the form. Headline is Yash's own one-liner from the July pitch calls.
 */

/** Plain-prose footnotes: not a chatbot, not app memory, costs nothing. */
const NOTES: { label: string; line: string }[] = [
  {
    /* The trust line — kills the companion read before it's asked. */
    /* "doesn't chat", not "doesn't talk back" — QA caught the collision with
       section 03's "Alter pushes back." (a literal reader trips on which). */
    label: "Not a chatbot",
    line: "It doesn't chat. It doesn't simulate anyone. It makes the tools you already use work like they actually know you.",
  },
  {
    label: "Vs memory",
    line: "ChatGPT's memory remembers what you told it, inside one app. This learns how you work — and travels.",
  },
  {
    label: "Cost",
    line: "Nothing to try. The file lives on your device, not our servers.",
  },
];

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
            // SplitText's aria:"hidden" lands on the h1 ROOT too, which
            // erases the heading (and its aria-label) from the a11y tree —
            // QA blocker. Re-expose the root; the char/word wrappers keep
            // their own aria-hidden.
            headline.current?.removeAttribute("aria-hidden");
            if (played) {
              gsap.set(self.chars, { yPercent: 0, opacity: 1 });
              return;
            }
            played = true;
            // ~28 chars × 0.013s + 0.62s duration ≈ 0.98s total.
            gsap.from(self.chars, {
              yPercent: 116,
              opacity: 0,
              duration: 0.62,
              ease: EASE,
              stagger: 0.013,
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
    <section
      ref={root}
      className="act-night relative flex min-h-[calc(100svh-57px)] items-center"
    >
      <Container className="pb-[clamp(64px,8vw,96px)] pt-12 lg:pt-16">
        <div className="max-w-[54rem]">
          <div data-hero-fade>
            <Eyebrow index="01" label="The fix" />
          </div>

          <h1
            ref={headline}
            aria-label="AI has amnesia. Alter is the fix."
            className="mt-8 font-display text-[clamp(3rem,8.4vw,7rem)] leading-[1.02] tracking-[-0.02em] text-ink"
          >
            AI has <em>amnesia</em>.
            <br />
            Alter is the fix.
          </h1>

          <p
            data-hero-fade
            className="mt-9 max-w-[38rem] text-[16.5px] leading-[1.68] text-ink-soft"
          >
            Every AI you use starts from zero. It doesn&apos;t know how you
            write, how you decide, or what you&apos;re working on — so you
            re-explain yourself, every day, to every tool.
          </p>

          <p
            data-hero-fade
            className="mt-5 max-w-[38rem] text-[16.5px] leading-[1.68] text-ink"
          >
            Alter builds a private file of exactly that and attaches it to the
            AI you already use. ChatGPT writes like you, not like everyone.
          </p>

          <div data-hero-fade className="mt-10 max-w-[34rem]">
            <WaitlistForm />
          </div>
        </div>

        {/* The three questions the claim raises, answered in plain prose. */}
        <dl
          data-hero-fade
          className="mt-[clamp(56px,7vw,84px)] grid gap-x-10 border-t border-line sm:grid-cols-3"
        >
          {NOTES.map(({ label, line }) => (
            <div key={label} className="border-b border-line py-4 sm:border-b-0 sm:pt-5">
              <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
                {label}
              </dt>
              <dd className="mt-2 max-w-[24rem] text-[14.5px] leading-[1.6] text-ink-soft">
                {line}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
