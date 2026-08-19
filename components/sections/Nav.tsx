"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "./kit";
import { cn } from "@/lib/utils";

type Act = "night" | "day";

/**
 * Sticky hairline nav: wordmark left, file chip + waitlist anchor right.
 *
 * The nav follows the act of whatever section sits behind it — dark bar over
 * the night hero/stakes/cta, paper bar over the paper body sections — instead
 * of a hardcoded dark bar that used to read as a bug over paper sections.
 *
 * Detection: on scroll (rAF-throttled to at most one hit-test per frame),
 * elementFromPoint just below the nav's bottom edge finds whatever section is
 * currently underneath it; `.closest(".act-night")` on that element decides
 * the act. No sentinel elements needed in the sections themselves — every
 * section (or an ancestor) already carries the .act-night class when it's a
 * night-act section, so this reads the DOM that already exists.
 *
 * SSR default is act-night (the page opens on the night hero), so there's no
 * flash or layout shift on hydration — only the token remap (background-
 * color/color) crossfades in, and content/height never move.
 */
export function Nav() {
  const [act, setAct] = useState<Act>("night");
  const headerRef = useRef<HTMLElement>(null);
  const tickingRef = useRef(false);

  useEffect(() => {
    const update = () => {
      const header = headerRef.current;
      if (!header) return;

      const rect = header.getBoundingClientRect();
      const x = window.innerWidth / 2;
      const y = rect.bottom + 1;
      const el = document.elementFromPoint(x, y);
      if (!el) return;

      setAct(el.closest(".act-night") ? "night" : "day");
    };

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(() => {
        update();
        tickingRef.current = false;
      });
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur-md transition-colors duration-150",
        act === "night" ? "act-night" : "act-day",
      )}
    >
      <Container className="flex h-14 items-center justify-between">
        <span className="font-display text-[19px] leading-none tracking-[-0.01em] text-ink">
          Alter
        </span>

        <div className="flex items-center gap-4">
          <span className="hidden rounded-full border border-line px-2.5 py-1 font-mono text-[10.5px] leading-none tracking-[0.06em] text-ink-faint sm:inline-block">
            you.alter
          </span>
          <a
            href="#waitlist"
            className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink transition-colors hover:text-signature"
          >
            Join waitlist
          </a>
        </div>
      </Container>
    </header>
  );
}
