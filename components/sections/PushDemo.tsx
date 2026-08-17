"use client";

import { Fragment, useRef } from "react";
import { Container, Eyebrow } from "./kit";
import { EASE, NO_REDUCED_MOTION, gsap, useGSAP } from "./gsap-setup";

/**
 * One rough input, two systems. Verbatim dialogue — this is the section that
 * shows the verb instead of describing it, so the words are the product, not
 * page copy. Do not paraphrase.
 */
const USER_MESSAGE =
  "I think we should raise the price to $99 because our competitors are at $89.";

/** Hand-split words so the input can be laid down word by word on scroll. */
const USER_WORDS = USER_MESSAGE.split(" ");

const GENERIC_REPLY =
  "Great strategic thinking! Raising your price above competitors can signal premium positioning. Consider highlighting your unique value proposition to justify the price increase...";

/**
 * The push, broken at its own sentence seams so each claim can land on its
 * own beat. Read continuously the text is unchanged.
 */
const ALTER_LINES = [
  "That’s a competitor-anchored reason, not a value reason.",
  "Why $99 specifically?",
  "If you can’t name what a customer gets at $99 that they don’t get at $89, the market will punish you for the extra $10.",
];

/** Hairline token, mirrored for the border-colour scrub on the Alter panel. */
const LINE = "#e3e0d5";

/** Shared type for the generic reply and its blurred echo — same box, same wrap. */
const GENERIC_TYPE = "text-[15.5px] leading-[1.72] text-ink-faint";

/**
 * "The push" — the demo section.
 *
 * A user's message with a genuine weakness in it, then the two replies it can
 * get. The generic answer drifts in soft and never sharpens: it agrees, it
 * carries a blurred echo of itself, it earns no accent. The Alter answer lands
 * line by line with the accent bar drawing and its edge turning to signature.
 *
 * Rendering contract (same as the two fates): the MARKUP is the resolved end
 * state — both replies fully written, fully readable, chips and hairlines in
 * place. GSAP only sets start states inside the no-reduced-motion matchMedia
 * and scrubs back to the markup, so JS-off, hydration-off and reduced-motion
 * all land on a complete demo, and no scroll position can show an empty panel.
 */
export function PushDemo() {
  const root = useRef<HTMLElement>(null);
  const demo = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      /** Both breakpoints run the same beats; only the input reveal differs. */
      const build = (wide: boolean) => {
        const scope = demo.current;
        if (!scope) return;

        const pick = (selector: string) =>
          gsap.utils.toArray<HTMLElement>(selector, scope);
        const one = (selector: string) =>
          scope.querySelector<HTMLElement>(selector);

        const generic = one("[data-panel='generic']");
        const alter = one("[data-panel='alter']");

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: scope,
            start: wide ? "top 76%" : "top 86%",
            end: wide ? "bottom 80%" : "bottom 88%",
            scrub: 0.55,
            invalidateOnRefresh: true,
          },
        });

        /* ── 1. The input is laid down ──────────────────────────────────── */
        if (wide) {
          tl.from(
            pick("[data-word]"),
            {
              opacity: 0.12,
              y: 8,
              filter: "blur(5px)",
              duration: 0.16,
              stagger: 0.012,
              ease: "power2.out",
            },
            0,
          );
        } else {
          tl.from(
            one("[data-input-body]"),
            { opacity: 0.18, y: 10, duration: 0.22, ease: "power2.out" },
            0,
          );
        }
        tl.from(
          pick("[data-input-meta]"),
          { opacity: 0, duration: 0.14 },
          0.02,
        );

        /* ── 2. It forks ────────────────────────────────────────────────── */
        tl.from(pick("[data-trunk]"), { scaleY: 0, duration: 0.11 }, 0.2)
          .from(pick("[data-arm]"), { scaleX: 0, duration: 0.12 }, 0.28)
          .from(pick("[data-leg]"), { scaleY: 0, duration: 0.12 }, 0.36);

        /* ── 3. The agreeable answer drifts in — and stays soft ─────────── */
        tl.from(
          generic,
          {
            y: 26,
            opacity: 0.28,
            scale: 0.992,
            duration: 0.5,
            ease: "power1.out",
          },
          0.34,
        )
          // Long, lazy resolve: at the beat where Alter snaps crisp this one is
          // still arriving. Sycophancy reads as softness, not as an event.
          .fromTo(
            generic,
            { filter: "blur(6px)" },
            { filter: "blur(0px)", duration: 0.62, ease: "power1.out" },
            0.34,
          )
          .from(pick("[data-generic-edge]"), { scaleX: 0, duration: 0.34 }, 0.4)
          .from(pick("[data-haze]"), { opacity: 0, duration: 0.4 }, 0.5)
          .from(pick("[data-generic-chip]"), { opacity: 0.25, duration: 0.24 }, 0.7);

        /* ── 4. The push lands crisp, line by line ──────────────────────── */
        tl.from(alter, { y: 18, duration: 0.34, ease: "power2.out" }, 0.5)
          .from(pick("[data-branch]"), { scaleY: 0, duration: 0.18, ease: "power2.out" }, 0.54)
          .from(pick("[data-accent]"), { scaleX: 0, duration: 0.22, ease: "power2.out" }, 0.58)
          .from(alter, { borderColor: LINE, duration: 0.3 }, 0.58)
          .from(pick("[data-glow]"), { opacity: 0, duration: 0.34 }, 0.58)
          .from(
            pick("[data-line]"),
            {
              y: 16,
              opacity: 0.18,
              duration: 0.2,
              stagger: 0.1,
              ease: "power2.out",
            },
            0.6,
          )
          .from(pick("[data-alter-chip]"), { opacity: 0.25, duration: 0.24 }, 0.86);

        tl.from(pick("[data-caption]"), { opacity: 0, y: 8, duration: 0.16 }, 0.9);
      };

      mm.add(NO_REDUCED_MOTION, () => {
        // Blur-to-sharp rise for the header line: distinct from the card
        // stagger above it and from the masked question below it.
        const head = gsap.utils.toArray<HTMLElement>(
          "[data-head]",
          root.current,
        );
        gsap.from(head, {
          y: 22,
          opacity: 0,
          filter: "blur(10px)",
          duration: 0.9,
          stagger: 0.09,
          ease: EASE,
          scrollTrigger: { trigger: root.current, start: "top 76%" },
        });
      });

      mm.add(`(min-width: 768px) and ${NO_REDUCED_MOTION}`, () => build(true));
      mm.add(`(max-width: 767px) and ${NO_REDUCED_MOTION}`, () => build(false));

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative py-[clamp(64px,8vw,96px)]">
      <Container>
        <div data-head>
          <Eyebrow index="04" label="The push" />
        </div>
        <div className="rule mt-6 mb-12" />

        <h2
          data-head
          className="max-w-[26ch] font-display text-[clamp(1.9rem,4vw,2.9rem)] leading-[1.12] tracking-[-0.02em] text-ink"
        >
          Agreement is cheap. Pushback is the product.
        </h2>

        <div ref={demo} className="mt-12 md:mt-16">
          {/* ── The input ────────────────────────────────────────────────── */}
          <div className="relative rounded-md border border-line bg-paper-deep/60 p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div
                data-input-meta
                className="flex items-center gap-2.5 font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-faint"
              >
                <span aria-hidden className="size-1.5 rounded-[1px] bg-ink" />
                You
              </div>
              <span
                data-input-meta
                className="shrink-0 font-mono text-[10.5px] tracking-[0.14em] text-ink-faint"
              >
                raw input
              </span>
            </div>

            <p
              data-input-body
              className="mt-5 max-w-[46rem] text-[clamp(1.02rem,1.7vw,1.3rem)] leading-[1.5] text-ink"
            >
              {USER_WORDS.map((word, i) => (
                <Fragment key={`${word}-${i}`}>
                  <span data-word className="inline-block">
                    {word}
                  </span>{" "}
                </Fragment>
              ))}
            </p>
          </div>

          {/* ── The trunk ────────────────────────────────────────────────── */}
          <div aria-hidden className="relative mx-auto h-9 w-px md:h-11">
            <span
              data-trunk
              className="absolute inset-0 block origin-top bg-line"
            />
            <span className="absolute left-1/2 top-0 block size-1 -translate-x-1/2 -translate-y-1/2 rounded-[1px] bg-ink-faint" />
          </div>

          {/* ── The fork: one input, two feeds (desktop framing) ─────────── */}
          <div aria-hidden className="hidden md:grid md:grid-cols-2 md:gap-6">
            <div className="relative h-10">
              <span
                data-arm
                className="absolute left-1/2 right-[-12px] top-0 block h-px origin-right bg-line"
              />
              <span
                data-leg
                className="absolute left-1/2 top-0 block h-full w-px origin-top bg-line"
              />
            </div>
            <div className="relative h-10">
              <span
                data-arm
                className="absolute left-[-12px] right-1/2 top-0 block h-px origin-left bg-line"
              />
              <span
                data-leg
                className="absolute left-1/2 top-0 block h-full w-px origin-top bg-line"
              >
                <span
                  data-branch
                  className="absolute inset-0 block origin-top bg-signature"
                />
              </span>
            </div>
          </div>

          {/* ── The two replies ──────────────────────────────────────────── */}
          <div className="mt-5 grid grid-cols-1 items-stretch gap-5 md:mt-0 md:grid-cols-2 md:gap-6">
            {/* Generic: subordinate — deep paper, no accent, faint ink. */}
            <article
              data-panel="generic"
              className="relative flex min-w-0 flex-col overflow-hidden rounded-md border border-line bg-paper-deep p-6 sm:p-7"
            >
              <span
                aria-hidden
                data-generic-edge
                className="absolute left-[7px] right-[7px] top-0 block h-[2px] origin-left bg-line"
              />

              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2.5 font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-faint">
                  <span
                    aria-hidden
                    className="size-1.5 rounded-[1px] bg-ink-faint"
                  />
                  Generic AI
                </div>
                <span className="shrink-0 font-mono text-[10.5px] tracking-[0.14em] text-ink-faint">
                  any model
                </span>
              </div>

              {/* The reply, plus a blurred echo of itself sitting behind it —
                  the answer never quite comes into focus. */}
              <div className="relative mt-6 flex-1">
                <p
                  aria-hidden
                  data-haze
                  className={`pointer-events-none absolute inset-0 select-none opacity-[0.22] blur-[3.5px] ${GENERIC_TYPE}`}
                >
                  {GENERIC_REPLY}
                </p>
                <p className={`relative ${GENERIC_TYPE}`}>{GENERIC_REPLY}</p>
              </div>

              <div className="mt-7 flex items-center gap-3">
                <span
                  data-generic-chip
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-2.5 py-1 font-mono text-[10px] uppercase leading-none tracking-[0.16em] text-ink-faint"
                >
                  <span aria-hidden className="size-1 rounded-full bg-ink-faint" />
                  Agrees
                </span>
                <span className="font-mono text-[10.5px] tracking-[0.08em] text-ink-faint">
                  adds nothing
                </span>
              </div>
            </article>

            {/* Alter: solid — lit paper, accent edge, full ink. */}
            <article
              data-panel="alter"
              className="relative flex min-w-0 flex-col rounded-md border border-signature/35 bg-paper p-6 sm:p-7"
            >
              {/* Lift shadow on its own layer so nothing has to clip the card. */}
              <span
                aria-hidden
                data-glow
                className="pointer-events-none absolute inset-0 rounded-md shadow-[0_1px_2px_rgba(22,21,15,0.04),0_28px_60px_-34px_rgba(22,21,15,0.3)]"
              />
              <span
                aria-hidden
                data-accent
                className="absolute left-[7px] right-[7px] top-0 block h-[2px] origin-left bg-signature"
              />

              <div className="relative flex items-start justify-between gap-4">
                <div className="flex items-center gap-2.5 font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink">
                  <span
                    aria-hidden
                    className="size-1.5 rounded-[1px] bg-signature"
                  />
                  Alter
                </div>
                <span className="shrink-0 font-mono text-[10.5px] tracking-[0.14em] text-ink-faint">
                  you.alter · local
                </span>
              </div>

              <div className="relative mt-6 flex-1">
                {ALTER_LINES.map((line, i) => (
                  <p
                    key={line}
                    data-line
                    className={`text-[16px] leading-[1.62] text-ink ${i === 0 ? "" : "mt-3.5"}`}
                  >
                    {line}
                  </p>
                ))}
              </div>

              <div className="relative mt-7 flex items-center gap-3">
                <span
                  data-alter-chip
                  className="inline-flex items-center gap-1.5 rounded-full bg-signature-soft px-2.5 py-1 font-mono text-[10px] uppercase leading-none tracking-[0.16em] text-signature"
                >
                  <span aria-hidden className="size-1 rounded-full bg-signature" />
                  Pushes back
                </span>
                <span className="font-mono text-[10.5px] tracking-[0.08em] text-ink-faint">
                  names the test
                </span>
              </div>
            </article>
          </div>

          <p
            data-caption
            className="mt-6 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-faint"
          >
            same input · two systems
          </p>
        </div>
      </Container>
    </section>
  );
}
