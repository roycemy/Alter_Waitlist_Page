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
 * Where it goes — a vertical rule draws downward against the scroll, tying the
 * three years together as it passes each node.
 */
export function Arc() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(NO_REDUCED_MOTION, () => {
        const line = track.current?.querySelector("[data-line]") ?? [];
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: track.current,
              start: "top 66%",
              end: "bottom 82%",
              scrub: 0.5,
            },
          },
        );

        const items = gsap.utils.toArray<HTMLElement>(
          "[data-step]",
          track.current,
        );
        items.forEach((item) => {
          gsap.from(item, {
            y: 26,
            opacity: 0,
            duration: 0.85,
            ease: EASE,
            scrollTrigger: { trigger: item, start: "top 84%" },
          });
          const node = item.querySelector("[data-node]");
          if (node) {
            gsap.from(node, {
              scale: 0.2,
              opacity: 0,
              duration: 0.6,
              ease: "back.out(2)",
              scrollTrigger: { trigger: item, start: "top 84%" },
            });
          }
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative py-[clamp(80px,11vw,120px)]">
      <Container>
        <Eyebrow index="06" label="Where it goes" />
        <div className="rule mt-6 mb-14" />

        <div ref={track} className="relative pl-8 md:pl-12">
          <span
            aria-hidden
            data-line
            className="absolute left-0 top-[0.7rem] block h-[calc(100%-1.6rem)] w-px origin-top bg-line"
          />

          {STEPS.map((step) => (
            <div key={step.label} data-step className="relative pb-14 last:pb-0">
              <span
                aria-hidden
                data-node
                className="absolute -left-8 top-[0.45rem] block size-[9px] -translate-x-1/2 rounded-full border border-signature bg-paper md:-left-12"
              />
              <p className="max-w-[44rem] font-display text-[clamp(1.3rem,2.6vw,2rem)] leading-[1.38] tracking-[-0.012em] text-ink">
                <span className="mr-2 align-[0.12em] font-mono text-[0.55em] uppercase tracking-[0.18em] text-signature">
                  {step.label}
                </span>{" "}
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
