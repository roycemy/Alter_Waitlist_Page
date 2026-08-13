"use client";

import { useRef } from "react";
import { Container, Eyebrow } from "./kit";
import { EASE, INK_SOFT, NO_REDUCED_MOTION, gsap, useGSAP } from "./gsap-setup";

/**
 * The same five facts, in both fates. Diagram labels — not page copy. They
 * echo the .alter file card in the hero so the visitor recognises the object.
 */
const FACTS = [
  { key: "voice", value: "direct, no hedging", stamp: "2m" },
  { key: "reasoning", value: "data before analogy", stamp: "14m" },
  { key: "pushback", value: "early, not after", stamp: "1h" },
  { key: "fast yes", value: "small reversible bets", stamp: "3h" },
  { key: "always no", value: "anything with lock-in", stamp: "1d" },
];

/** Hairline token, mirrored for the border-colour scrub on the your-file card. */
const LINE = "#e3e0d5";

/**
 * Where the stage parks while it is pinned: 15vh clears the 56px sticky nav at
 * every viewport height and leaves the ~66vh columns optically centred.
 */
const STAGE_TOP = 0.15;

/**
 * "The two fates" — the page's one wow moment.
 *
 * Two paths diverge under the visitor's own scroll: the their-memory column
 * strikes out fact by fact, its timestamps go stale, its recall counter runs
 * to zero and the whole panel sinks out of focus; the your-file column pulls
 * the other way — accent draws, the same five facts commit one by one, the
 * counter fills, the card lifts and its edge turns to the signature.
 *
 * Rendering contract: the MARKUP is the resolved end state (theirs struck and
 * faint, yours solid). GSAP sets the healthy/ghost start states at build time
 * and scrubs back to the markup. So JS-off and prefers-reduced-motion both
 * land on a fully readable, fully populated diagram that already makes the
 * point — and no scroll position, however fast, can ever show an empty box:
 * every row carries text in both fates, at every progress value.
 */
export function MemoryObjection() {
  const root = useRef<HTMLElement>(null);
  const runway = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      /** Both breakpoints run the same beats; only the framing differs. */
      const build = (wide: boolean) => {
        const scope = stage.current;
        if (!scope) return;

        const pick = (selector: string) =>
          gsap.utils.toArray<HTMLElement>(selector, scope);
        const one = (selector: string) =>
          scope.querySelector<HTMLElement>(selector);

        const theirs = one("[data-col='theirs']");
        const yours = one("[data-col='yours']");
        const theirRows = pick("[data-their-row]");
        const yourRows = pick("[data-your-row]");
        const theirCount = one("[data-their-count]");
        const yourCount = one("[data-your-count]");

        const setCount = (el: HTMLElement | null, n: number) => {
          if (el) el.textContent = String(Math.round(n)).padStart(2, "0");
        };

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: wide
            ? {
                trigger: runway.current,
                start: () => `top top+=${window.innerHeight * STAGE_TOP}`,
                end: "bottom bottom",
                scrub: 0.55,
                invalidateOnRefresh: true,
              }
            : {
                trigger: runway.current,
                start: "top 78%",
                end: "bottom 58%",
                scrub: 0.55,
              },
        });

        /* ── The split: the two panels start close and pull apart ───────── */
        if (wide) {
          tl.from(theirs, { x: 34, duration: 0.6, ease: "power2.out" }, 0.04);
          tl.from(yours, { x: -34, duration: 0.6, ease: "power2.out" }, 0.04);
        }

        /* ── Their memory decays, row by row ────────────────────────────── */
        tl.from(
          pick("[data-strike]"),
          { scaleX: 0, duration: 0.17, stagger: 0.075, ease: "power2.inOut" },
          0.1,
        )
          .from(
            theirRows,
            { color: INK_SOFT, duration: 0.17, stagger: 0.075 },
            0.1,
          )
          .from(
            pick("[data-their-dash]"),
            { scaleX: 1.6, opacity: 1, duration: 0.17, stagger: 0.075 },
            0.1,
          )
          .from(
            pick("[data-stamp-stale]"),
            { opacity: 0, duration: 0.11, stagger: 0.075 },
            0.13,
          )
          .to(
            pick("[data-stamp-fresh]"),
            { opacity: 0, duration: 0.11, stagger: 0.075 },
            0.13,
          )
          .from(pick("[data-sync-stale]"), { opacity: 0, duration: 0.14 }, 0.3)
          .to(pick("[data-sync-fresh]"), { opacity: 0, duration: 0.14 }, 0.3);

        setCount(theirCount, FACTS.length);
        const theirTally = { v: FACTS.length };
        tl.to(
          theirTally,
          {
            v: 0,
            duration: 0.44,
            snap: { v: 1 },
            onUpdate: () => setCount(theirCount, theirTally.v),
          },
          0.11,
        );

        /* ── …and the whole panel sinks out of focus ────────────────────── */
        tl.to(
          theirs,
          { y: wide ? 20 : 10, scale: 0.985, opacity: 0.6, duration: 0.5 },
          0.16,
        ).fromTo(
          theirs,
          { filter: "blur(0px)" },
          { filter: "blur(1.1px)", duration: 0.5 },
          0.16,
        );

        /* ── The thread carries across ──────────────────────────────────── */
        tl.from(
          pick("[data-thread]"),
          wide
            ? { scaleX: 0, duration: 0.22, ease: "power2.out" }
            : { scaleY: 0, duration: 0.22, ease: "power2.out" },
          0.34,
        );

        /* ── Your file solidifies ───────────────────────────────────────── */
        tl.from(
          pick("[data-accent]"),
          { scaleX: 0, duration: 0.26, ease: "power2.out" },
          0.42,
        )
          .from(pick("[data-glow]"), { opacity: 0, duration: 0.32 }, 0.42)
          .from(yours, { borderColor: LINE, duration: 0.32 }, 0.42)
          .to(
            yours,
            {
              y: wide ? -14 : -6,
              scale: 1.012,
              duration: 0.42,
              ease: "power2.out",
            },
            0.44,
          );

        /* ── …and accumulates the same five facts as durable entries ────── */
        tl.from(
          yourRows,
          { opacity: 0.46, y: 14, duration: 0.22, stagger: 0.08 },
          0.46,
        )
          .from(
            pick("[data-your-dash]"),
            { scaleX: 0, duration: 0.22, stagger: 0.08, ease: "power2.out" },
            0.46,
          )
          .from(
            pick("[data-written]"),
            { opacity: 0, duration: 0.14, stagger: 0.08 },
            0.5,
          )
          .to(
            pick("[data-queued]"),
            { opacity: 0, duration: 0.14, stagger: 0.08 },
            0.5,
          )
          .from(pick("[data-your-chip]"), { opacity: 0.3, duration: 0.3 }, 0.6);

        setCount(yourCount, 0);
        const yourTally = { v: 0 };
        tl.to(
          yourTally,
          {
            v: FACTS.length,
            duration: 0.42,
            snap: { v: 1 },
            onUpdate: () => setCount(yourCount, yourTally.v),
          },
          0.5,
        );

        // matchMedia reverts tweens, but counters are written to the DOM by
        // hand — restore the markup's resolved values on breakpoint change.
        return () => {
          setCount(theirCount, 0);
          setCount(yourCount, FACTS.length);
        };
      };

      mm.add(NO_REDUCED_MOTION, () => {
        // Masked line reveal — the mask (not the moving heading) is the
        // trigger, so ScrollTrigger measures an untransformed element.
        const question = root.current?.querySelector("[data-question]");
        if (question) {
          gsap.from(question, {
            yPercent: 106,
            duration: 1.05,
            ease: EASE,
            scrollTrigger: { trigger: question.parentElement, start: "top 86%" },
          });
        }

        const answer = root.current?.querySelector("[data-answer]");
        if (answer) {
          gsap.from(answer, {
            y: 18,
            opacity: 0,
            duration: 0.85,
            ease: EASE,
            scrollTrigger: { trigger: answer, start: "top 92%" },
          });
        }
      });

      mm.add(`(min-width: 768px) and ${NO_REDUCED_MOTION}`, () => build(true));
      mm.add(`(max-width: 767px) and ${NO_REDUCED_MOTION}`, () => build(false));

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative py-[clamp(80px,11vw,120px)]">
      <Container>
        <Eyebrow index="04" label="The objection" />
        <div className="rule mt-6 mb-12" />

        <div className="overflow-hidden pb-[0.18em]">
          <h2
            data-question
            className="max-w-[23ch] font-display text-[clamp(2.1rem,5vw,3.6rem)] leading-[1.08] tracking-[-0.02em] text-ink"
          >
            “Doesn’t ChatGPT already have memory?”
          </h2>
        </div>
      </Container>

      {/* Scroll runway. The stage pins at 15vh and the two fates diverge
          across it: 250vh of runway minus the ~81vh the stage occupies is
          ~1.7 viewports of scrub — the pacing a big narrative beat gets.
          Below md the stage rides the page and the same beats run in
          sequence: theirs decays out of frame, yours accumulates in. */}
      <div ref={runway} className="relative mt-14 md:mt-16 md:h-[250vh]">
        <div ref={stage} className="md:sticky md:top-[15vh]">
          <Container>
            <div className="grid grid-cols-1 items-stretch md:grid-cols-[1fr_auto_1fr]">
              {/* ── Their memory ─────────────────────────────────────────── */}
              <div
                data-col="theirs"
                className="relative flex min-w-0 flex-col overflow-hidden rounded-md border border-line bg-paper-deep p-6 sm:p-8 md:min-h-[52vh] lg:min-h-[56vh]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2.5 font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-faint">
                      <span
                        aria-hidden
                        className="size-1.5 rounded-[1px] bg-ink-faint"
                      />
                      Their memory
                    </div>
                    <div className="relative mt-3 block h-[15px] w-[11rem] font-mono text-[10.5px] leading-[15px] tracking-[0.06em] text-ink-faint">
                      <span
                        data-sync-fresh
                        aria-hidden
                        className="absolute inset-0 opacity-0"
                      >
                        synced · 2m ago
                      </span>
                      <span data-sync-stale aria-hidden className="absolute inset-0">
                        stale · 47d
                      </span>
                    </div>
                  </div>
                  <div className="shrink-0 font-mono text-[10.5px] tracking-[0.14em] text-ink-faint">
                    recall <span data-their-count>00</span>/05
                  </div>
                </div>

                <ul className="mt-8 flex flex-1 flex-col justify-center">
                  {FACTS.map((fact) => (
                    <li
                      key={fact.key}
                      data-their-row
                      className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1.5 border-t border-line py-[clamp(10px,1.5vh,17px)] text-ink-faint first:border-t-0 lg:grid-cols-[7.5rem_1fr_auto]"
                    >
                      <span className="flex items-center gap-2.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-faint lg:col-start-1 lg:row-start-1">
                        <span
                          aria-hidden
                          data-their-dash
                          className="block h-px w-2.5 shrink-0 origin-left bg-ink-faint opacity-60"
                        />
                        {fact.key}
                      </span>
                      <span className="relative block h-[15px] w-[4.4rem] justify-self-end text-right font-mono text-[10.5px] leading-[15px] text-ink-faint lg:col-start-3 lg:row-start-1">
                        <span
                          data-stamp-fresh
                          aria-hidden
                          className="absolute inset-0 opacity-0"
                        >
                          {fact.stamp}
                        </span>
                        <span data-stamp-stale aria-hidden className="absolute inset-0">
                          cleared
                        </span>
                      </span>
                      <span className="relative col-span-2 justify-self-start font-mono text-[clamp(12.5px,1vw,14px)] lg:col-span-1 lg:col-start-2 lg:row-start-1">
                        {fact.value}
                        <span
                          aria-hidden
                          data-strike
                          className="absolute left-0 top-1/2 block h-px w-full origin-left bg-current"
                        />
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-2.5 py-1 font-mono text-[10px] uppercase leading-none tracking-[0.16em] text-ink-faint">
                    <span
                      aria-hidden
                      className="size-1 rounded-full bg-ink-faint"
                    />
                    Forgets
                  </span>
                  <span className="font-mono text-[10.5px] tracking-[0.08em] text-ink-faint">
                    app-locked
                  </span>
                </div>
              </div>

              {/* ── The thread: horizontal at desktop, vertical when stacked ─ */}
              <div
                aria-hidden
                className="relative flex h-14 w-full items-center justify-center md:h-auto md:w-[clamp(28px,4.6vw,72px)]"
              >
                <span className="relative block h-full w-px bg-line md:h-px md:w-full">
                  <span
                    data-thread
                    className="absolute inset-0 block origin-top bg-signature md:origin-left"
                  />
                </span>
                <span className="absolute bottom-[-2px] left-1/2 block size-1 -translate-x-1/2 rounded-[1px] bg-signature md:bottom-auto md:left-auto md:right-[-2px] md:top-1/2 md:-translate-y-1/2 md:translate-x-0" />
              </div>

              {/* ── Your file ────────────────────────────────────────────── */}
              <div
                data-col="yours"
                className="relative flex min-w-0 flex-col rounded-md border border-signature/35 bg-paper p-6 sm:p-8 md:min-h-[52vh] lg:min-h-[56vh]"
              >
                {/* Lift shadow lives on its own layer so the card can stay
                    unclipped — an overflow-hidden parent would eat it. */}
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
                  <div>
                    <div className="flex items-center gap-2.5 font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink">
                      <span
                        aria-hidden
                        className="size-1.5 rounded-[1px] bg-signature"
                      />
                      Your file
                    </div>
                    <div className="mt-3 h-[15px] font-mono text-[10.5px] leading-[15px] tracking-[0.06em] text-ink-faint">
                      you.alter · local
                    </div>
                  </div>
                  <div className="shrink-0 font-mono text-[10.5px] tracking-[0.14em] text-ink-faint">
                    entries <span data-your-count className="text-signature">05</span>/05
                  </div>
                </div>

                <ul className="relative mt-8 flex flex-1 flex-col justify-center">
                  {FACTS.map((fact) => (
                    <li
                      key={fact.key}
                      data-your-row
                      className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1.5 border-t border-line py-[clamp(10px,1.5vh,17px)] first:border-t-0 lg:grid-cols-[7.5rem_1fr_auto]"
                    >
                      <span className="flex items-center gap-2.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-soft lg:col-start-1 lg:row-start-1">
                        <span
                          aria-hidden
                          data-your-dash
                          className="block h-px w-2.5 shrink-0 origin-left bg-signature"
                        />
                        {fact.key}
                      </span>
                      <span className="relative block h-[15px] w-[4.4rem] justify-self-end text-right font-mono text-[10.5px] leading-[15px] text-ink-faint lg:col-start-3 lg:row-start-1">
                        <span
                          data-queued
                          aria-hidden
                          className="absolute inset-0 opacity-0"
                        >
                          queued
                        </span>
                        <span data-written aria-hidden className="absolute inset-0">
                          written
                        </span>
                      </span>
                      <span className="col-span-2 justify-self-start font-mono text-[clamp(12.5px,1vw,14px)] text-ink lg:col-span-1 lg:col-start-2 lg:row-start-1">
                        {fact.value}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="relative mt-8 flex items-center gap-3">
                  <span
                    data-your-chip
                    className="inline-flex items-center gap-1.5 rounded-full bg-signature-soft px-2.5 py-1 font-mono text-[10px] uppercase leading-none tracking-[0.16em] text-signature"
                  >
                    <span
                      aria-hidden
                      className="size-1 rounded-full bg-signature"
                    />
                    Yours
                  </span>
                  <span className="font-mono text-[10.5px] tracking-[0.08em] text-ink-faint">
                    portable
                  </span>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>

      <Container>
        <p
          data-answer
          className="mt-16 max-w-[42rem] text-[16.5px] leading-[1.7] text-ink-soft md:mt-20"
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
