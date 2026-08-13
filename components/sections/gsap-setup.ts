"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

/**
 * Single registration point for the page. Registration is guarded to the
 * browser — the plugin modules import safely on the server, but nothing
 * should register during SSR.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
}

/** Motion constants — one ease, one duration band, one stagger band. */
export const EASE = "power3.out";
export const NO_REDUCED_MOTION = "(prefers-reduced-motion: no-preference)";

/** Ink values, mirrored from the brand tokens in globals.css. */
export const INK = "#16150f";
export const INK_SOFT = "#4c4a40";
export const INK_FAINT = "#8b887a";

export { gsap, useGSAP, ScrollTrigger, SplitText };
