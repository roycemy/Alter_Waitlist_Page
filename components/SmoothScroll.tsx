"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

/**
 * Site-wide smooth scroll provider.
 *
 * Lenis drives the scroll, gsap.ticker drives Lenis (so gsap's rAF loop is
 * the single source of truth), and ScrollTrigger is refreshed off Lenis'
 * scroll event so every scroll-triggered entrance in the page stays in sync
 * with the smoothed scroll position.
 *
 * Respects prefers-reduced-motion: when set, Lenis is never instantiated and
 * the page falls back to native scroll — no smoothing, no ScrollTrigger
 * scroll proxy, nothing to fight the OS-level reduced-motion contract.
 *
 * Does not hijack touch: syncTouch is left at its Lenis default (false), so
 * mobile/trackpad touch scrolling stays native.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({ autoRaf: false });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
