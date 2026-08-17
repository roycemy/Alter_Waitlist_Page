---
name: alter-feedback
description: "Every correction, preference, and lesson Yash gave during the Alter waitlist build sessions (2026-08-12 → 08-17). Load before any Alter work."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: c332c6be-e44d-40f0-af6a-ea21c39ce5c2
  modified: 2026-08-17T22:33:34.038Z
---

# Alter feedback file (extracted from full session, 2026-08-12 → 2026-08-17)

**Why:** These are Yash's direct corrections and standing rules from building the
Alter waitlist page. **How to apply:** Treat every item as binding in all Alter
sessions; newer feedback overrides older. Repo source of truth: `Alter_Waitlist_Page/STATE.md`
+ `.claude/skills/alter-waitlist-recipe/SKILL.md` (both maintained same-pass).

## Design corrections (hard)
- **BLUE IS BANNED for Alter — all of it.** Verbatim: "so garbage… such AI slop…
  why would it be blue?" Accent = warm oxide ink #9c451f (day) / #d99a70 (night),
  error #a03018/#f2a58e. Buttons are monochrome (ink-on-paper / paper-on-ink),
  never colored pills. Never reintroduce blue from any library/reference.
- Two-act palette (warm-night hero/stakes/CTA + paper body) is a locked device;
  typography locked: Instrument Serif display (italic on one emotional word),
  Instrument Sans body, IBM Plex Mono meta. (Royce twice wrote "Fraunces" — error;
  it is Instrument Serif.)
- One named wow moment only: "The two fates." Everything else stays restrained.
- Artifact language: the .alter file renders as specimen/passport objects
  (certificate frames, serial lines, ruled meta) — NEVER terminal/config-file look.
- No drop-shadow card grids, no gradients, no glow, no emoji, texture ≤5% opacity.

## Copy corrections (hard)
- **Tight, blunt, bold.** "Too much verbage" = failure. Claims, not explanations;
  sentences ≤9 words except one long recognition list max per section. He cut the
  entire "catch the work that slips" run from Stakes without hesitation once the
  push demo showed the same thing.
- **Show, don't tell** (Royce doc, adopted as north star): a section that only
  describes what Alter stores has not earned its scroll. Nobody joins a waitlist
  for a noun.
- Positioning: TOOL getting better, never a PERSON being reshaped. Banned:
  partner, second identity, trains you, grows with you, your nature, meet your
  Alter, seamless, unlock, not just, doesn't just, AI-powered, fake urgency.
  Point at the output (the email, the draft, the argument), never the person's
  weak moments.
- The feeling test outranks polish: "wait, this is me" beats "looks expensive."
  Recognition engines: the stakes claims + the card rows ("register short when
  busy — reads as cold, isn't").

## Amplification register (2026-08-17, supersedes/extends positioning rule)
- Josh Elman's line, now CONFIRMED via his emails (Yash relayed 2026-08-17):
  AI that amplifies a real person = good; AI that simulates being human = his
  uncanny valley. Sentence test: tool or fake friend? Fake friend → cut.
- Danger→safe swaps: "second identity"→"your context, attached to any model";
  "partner as good as you"→"ChatGPT writes like you, not like everyone";
  "pushes you like a partner"→"spots your patterns before you do"; "living
  model of you"→"a file you own that travels between tools"; "Alter knows
  you"→"Alter carries your context"; "companion" never. Josh/a16z never named
  in public copy.
- The page sells the OUTCOME, never the noun — "the card is bs, not the
  product anymore" (visual stays; it's the personality card, the carrier).
- Product truth (Jul 21–29 calls): one-liner "AI has amnesia. Alter is the
  fix."; three layers input→identity(kernel)→outcome; extension is a pipe;
  MVP = <10-min onboarding → downloadable profile card. Lab-question answer
  to have cold: each lab's memory improves only its own app; none will build
  the layer that improves a competitor; Alter answers to no lab.

## Honesty & trust gates (non-negotiable, flag to Yash rather than decide)
- **HONESTY GATE:** any demo/comparison is either a real executed run labeled as
  such, or visibly labeled "composed illustration, not a live run." An authored
  strawman presented as real is worse than no section.
- **HUMAN GATE:** access counts and reply promises ("fifty this month", "we'll
  write back within a week", "written by a person") are commitments Yash keeps —
  build slots, leave drafts in a `YASH GATE` code comment, hand him the blanks.
- **NO VISITOR PROFILING** ever — no fingerprinting, no behavior-adaptive
  content; even analytics is a gated decision. Flag if the idea resurfaces.
- Never cite investor validation without a primary source. Audit findings: the
  "personality-file moat" line was Yash's own rehearsed framing, NOT Schireson's;
  the Josh Elman banned-words attribution is unverifiable in all recorded
  meetings — the rule stands on Yash's authority, not investor quotes.

## Process preferences
- Autonomous overnight runs: set a goal, run /loop self-paced, 10/80/10 (Opus for
  stranger-visible work, Sonnet mechanical), fresh-context verifiers grade
  against REAL screenshots at 1440/768/390 (never vibes), commit+push every
  verified pass, PushNotification when done, morning report with before/afters.
- Propagate every piece of feedback into STATE.md + the recipe skill in the SAME
  pass it's given ("noted-without-a-write doesn't count").
- Use the Playwright skill for interaction testing; open results in his browser
  tab (`open http://localhost:3117`) so he can see them.
- Never pin `latest` (16.3.0-preview burn). next is pinned 16.2.11; the 16.3.1
  refresh needs its own verify pass.
- Don't over-flag things he already knows (empty repo → "wdym its fine").
- Deploy/prod/Supabase/domain are founder-gated — never act without his explicit go.

## Operational lessons (would do differently next time)
- Vision on real references before locking design rules — memory of a site is
  not the site (thread-v4 was dark-hero → cream-body, not what I assumed).
- Motion specs in numbers, not adjectives (measured: 88px hero with orphan-free
  manual breaks beats 96px with an orphaned dash).
- "Markup is the end state" applies to LOAD animations too — SSR must contain
  everything; fast scroll must never meet an empty box.
- Test stateful colors (error/focus) in their TRIGGERED state — Lighthouse never
  sees them; the shadcn default red survived three verifier rounds.
- browse daemon: shared across agents (tabs get stolen), loses viewport between
  batches, serves stale pages — always `$B viewport` + `$B url` + `$B reload` +
  content-marker assert before trusting a screenshot; 2s waits for Lenis.
- next/font variables go on `<html>`, not `<body>` (silent Geist fallback).
- Rail-and-node layouts: position both against the SAME ancestor and measure
  centers in-browser (arc dots shipped 47px off through two verifier rounds).

## Open gates at session end (2026-08-17, main @ f96954e)
Deploy go · Supabase project for the endpoint · domain/name (AlterHQ collision) ·
CTA numbers confirm-or-kill · section-02 keep/delete (my rec: keep) · optional
real-run upgrade for the push demo.
