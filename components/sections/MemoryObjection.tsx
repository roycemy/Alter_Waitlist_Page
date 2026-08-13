"use client";

import { useRef } from "react";
import { Container, Eyebrow } from "./kit";
import {
  EASE,
  INK_FAINT,
  INK_SOFT,
  NO_REDUCED_MOTION,
  gsap,
  useGSAP,
} from "./gsap-setup";

const THEIRS = ["lives on their servers", "one app only", "dies on switch"];
const YOURS = ["lives on your device", "every tool", "yours, portable"];

/**
 * Memory objection — the load-bearing section. Two columns arrive from
 * opposite sides: their memory degrades (rows strike through and fade), the
 * .alter file solidifies (accent draws in, rows land crisp).
 *
 * Static state is the resolved state: strikes drawn, accent bar full. Nothing
 * depends on JS to be readable or to make the point.
 */
export function MemoryObjection() {
  const root = useRef<HTMLElement>(null);
  const split = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(NO_REDUCED_MOTION, () => {
        const question = root.current?.querySelector("[data-question]");
        if (question) {
          gsap.from(question, {
            y: 26,
            opacity: 0,
            duration: 1,
            ease: EASE,
            scrollTrigger: { trigger: question, start: "top 82%" },
          });
        }

        const theirs = split.current?.querySelector("[data-col='theirs']") ?? [];
        const yours = split.current?.querySelector("[data-col='yours']") ?? [];
        const strikes = gsap.utils.toArray<HTMLElement>(
          "[data-strike]",
          split.current,
        );
        const theirRows = gsap.utils.toArray<HTMLElement>(
          "[data-their-row]",
          split.current,
        );
        const yourRows = gsap.utils.toArray<HTMLElement>(
          "[data-your-row]",
          split.current,
        );
        const accent = split.current?.querySelector("[data-accent]") ?? [];

        gsap.set(strikes, { scaleX: 0 });
        gsap.set(accent, { scaleX: 0 });

        const tl = gsap.timeline({
          scrollTrigger: { trigger: split.current, start: "top 74%" },
        });

        tl.from(theirs, { x: -52, opacity: 0, duration: 1, ease: EASE }, 0)
          .from(yours, { x: 52, opacity: 0, duration: 1, ease: EASE }, 0)
          .fromTo(
            theirRows,
            { color: INK_SOFT },
            { color: INK_FAINT, duration: 0.6, stagger: 0.12, ease: "none" },
            0.45,
          )
          .to(
            strikes,
            { scaleX: 1, duration: 0.5, stagger: 0.12, ease: "power2.inOut" },
            0.45,
          )
          .to(accent, { scaleX: 1, duration: 0.8, ease: EASE }, 0.5)
          .from(
            yourRows,
            {
              y: 12,
              opacity: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: EASE,
            },
            0.55,
          );

        const answer = root.current?.querySelector("[data-answer]");
        if (answer) {
          gsap.from(answer, {
            y: 18,
            opacity: 0,
            duration: 0.85,
            ease: EASE,
            scrollTrigger: { trigger: answer, start: "top 90%" },
          });
        }
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative py-[clamp(80px,11vw,120px)]">
      <Container>
        <Eyebrow index="04" label="The objection" />
        <div className="rule mt-6 mb-14" />

        <h2
          data-question
          className="max-w-[24ch] font-display text-[clamp(2rem,4.6vw,3.3rem)] leading-[1.1] tracking-[-0.02em] text-ink"
        >
          &quot;Doesn&apos;t ChatGPT already have memory?&quot;
        </h2>

        <div
          ref={split}
          className="mt-16 grid gap-px overflow-hidden rounded-md border border-line bg-line md:grid-cols-2"
        >
          {/* Theirs — app-locked, degrading */}
          <div data-col="theirs" className="bg-paper-deep p-7 sm:p-9">
            <div className="flex items-center gap-2.5 font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-faint">
              <span aria-hidden className="size-1.5 rounded-[1px] bg-ink-faint" />
              Their memory
            </div>
            <ul className="mt-8">
              {THEIRS.map((row) => (
                <li
                  key={row}
                  data-their-row
                  className="border-t border-line py-4 font-mono text-[13px] text-ink-faint first:border-t-0 first:pt-0"
                >
                  <span className="relative inline-block">
                    {row}
                    <span
                      aria-hidden
                      data-strike
                      className="absolute left-0 top-1/2 block h-px w-full origin-left bg-current"
                    />
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Yours — portable, solidifying */}
          <div
            data-col="yours"
            className="relative bg-white/70 p-7 sm:p-9"
          >
            <span
              aria-hidden
              data-accent
              className="absolute left-0 top-0 block h-[2px] w-full origin-left bg-signature"
            />
            <div className="flex items-center gap-2.5 font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-faint">
              <span aria-hidden className="size-1.5 rounded-[1px] bg-signature" />
              Your file
            </div>
            <ul className="mt-8">
              {YOURS.map((row) => (
                <li
                  key={row}
                  data-your-row
                  className="flex items-center gap-3 border-t border-line py-4 font-mono text-[13px] text-ink first:border-t-0 first:pt-0"
                >
                  <span
                    aria-hidden
                    className="inline-block h-px w-3 shrink-0 bg-signature"
                  />
                  {row}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p
          data-answer
          className="mt-14 max-w-[42rem] text-[16.5px] leading-[1.7] text-ink-soft"
        >
          Theirs remembers what you told it, inside one app. Alter learns how you
          actually work, and it&apos;s the same file whether you&apos;re in
          Claude, ChatGPT, or whatever ships next quarter. Their memory dies if
          you switch tools. Yours doesn&apos;t, because it was never theirs.
        </p>
      </Container>
    </section>
  );
}
