# STATE.md — re-read every pass

## WHAT
Alter is a user-owned personal context layer for AI. A file that learns how someone
works and carries it into every AI tool they already use. Not a companion, not a
chatbot, not a destination app.

## POSITIONING RULE (non-negotiable)
Every line of copy must describe a **TOOL getting better**, never a **PERSON getting
reshaped**. Banned: "partner," "second identity," "it trains you," "your nature,"
"grows with you," "meet your Alter." Source: Yash's standing directive.
(SOURCING CORRECTION 2026-08-13: the earlier "Josh Elman / a16z flagged it twice"
attribution is NOT verifiable in any Granola transcript (78 meetings, Feb–Aug) or
Drive doc — the only a16z meeting on record (Arnav Kumar, Jul 20) never discusses
Alter. The rule stands on Yash's authority; do not cite investor validation for
it in any deck or copy until Yash confirms the conversation existed off-record.)

## GOAL
A waitlist landing page good enough to send to a16z partners, WHOOP, and 30 warm
intros without embarrassment. Bar: a partner screenshots it and sends it to a
colleague.

## GOAL v3 (2026-08-17, from Royce's design doc, Yash-approved: "refine based on
## this document") — overrides where it conflicts with v2 below
Core diagnosis: the page explains what Alter IS, never shows what it DOES.
Nobody joins a waitlist for a noun. The verb: **Alter pushes back on your work
so it comes out sharper than it would have alone.** Show it, don't say it.
Priority order (Royce): 1) push-demo section between 03 and 04 (two-fates
visual language, same rough input → generic-AI sycophancy vs Alter pushback);
2) .alter card rebuilt as an ARTIFACT (passport/specimen object, 3D flip:
front=object worth having, back=contents; prose below: vs ChatGPT memory /
gets better over time / costs nothing) — never a terminal/config-file look;
3) CTA rebuilt with real weight + specifics (scarcity number ONLY if Yash
confirms it's real — trust rule 5; "we'll write back" promise also needs his
confirm); 4) nav follows the act (dark over night, paper over paper — current
hardcoded dark bar reads as a bug on paper sections); 5) compress section 02
(scroll tax >> content once push demo exists; keep the recognition list —
it's the feel-seen engine); 6) render Voice/Reasoning/Decisions as fields of
ONE file object, not a 3-card features grid; 7) arc = manifesto typography
(huge year labels, editorial prose, no timeline-dot roadmap UI).
DON'T TOUCH (Royce, explicit): the palette + temperature shift; the
typography (display is Instrument Serif — Royce wrote "Fraunces" in error);
the two-fates section (the model for everything); the moat copy; the .alter
file as central metaphor.

## ACCEPTANCE CRITERIA (v2, set 2026-08-13 — grade against real screenshots +
## Lighthouse runs, never descriptions; supersedes the v1 list)
North star: a stranger lands not knowing what Alter is; by the bottom they get
it, believe it's real, and want in.
THE OVERRIDING TEST (Yash, 2026-08-13): the finish line is a FEELING, not a
feature list. Does the exact person this is for stop scrolling and feel caught
off guard by how well it gets them — "wait, this is me"? A beautiful page that
doesn't make someone feel understood has failed. Grade every pass against this
first; the recognition engines are the stakes list and the file-card rows
(see recipe skill "The finish line is a feeling").

THE FEELING (screenshot + honest read):
1. First four seconds feel expensive and considered — nothing reads as a
   template with the logo swapped.
2. A stranger could explain Alter in one sentence after only the hero.
3. The "isn't this just ChatGPT memory?" doubt is answered before they'd think
   to ask it — never after, never buried.
4. Exactly ONE screenshot moment on the page, named before building: "The two
   fates" (memory-objection contrast — their column decays, your file persists).
5. Zero fake urgency / fake numbers / fake scarcity. Confidence, not pressure.

THE CRAFT (real screenshots at 1440/768/390):
6. Motion timing/easing match the rules extracted from the thread-v4 reference
   pass (recipe skill "Motion numbers") — not defaults, not guesses.
7. prefers-reduced-motion leaves the page fully readable, zero animation.
8. No section shares an entrance style with the section before it.
9. Lighthouse mobile: performance ≥90, accessibility ≥95.
10. Zero placeholder text, zero lorem ipsum, zero unmodified library-default
    styling.

THE WORDS (fixed — verbatim from the recipe skill's approved copy):
11. Section order and copy match the approved script exactly: hero / stakes /
    what it does / memory objection / three-year arc / CTA.
12. Banned-words rule holds with zero exceptions: no "partner," "second
    identity," "grows with you," "trains you," etc.

Still true from v1 (implementation-level): Lenis site-wide without fighting
native scroll; hero reveal <1.2s no FOUC/layout-shift; form validates/disables/
success+error states/keyboard accessible/POSTs to NEXT_PUBLIC_WAITLIST_ENDPOINT,
loud console error when unset, never fake success. **Endpoint URL = HUMAN GATE.**

## TRUE TODAY (verified against files)
- Chrome extension MVP exists at ../alter (origin: roycemy/alter-extension-mvp):
  chip interview (panel/interview.ts), kernel compiler (core/compiler.ts →
  ≤300-token projection), blind A/B proof (core/blind-proof.ts), IndexedDB
  persistence (store/indexeddb-store.ts), zero network calls enforced by
  core/guard.ts. Verified by reading the repo + README on 2026-08-13.
- No public users. No backend for this page yet.
- This repo before today: README.md + stub package-lock only (Royce's
  "Add waitlist landing page" commit 9c8cf8a contained no page files).
- Scaffold now: Next 16.2.8 (pinned — never "latest"), React 19.1.0, Tailwind 4,
  motion 12.23.6, gsap + @gsap/react + lenis, shadcn (base-nova style, button+input).

## HUMAN-ONLY (never do autonomously)
- Final copy approval
- The form backend endpoint URL
- Domain / name decision (AlterHQ collision — rebrand question is open)
- Anything that ships to production. Preview deploys only, and only with explicit ship.

## STATUS (2026-08-17, overnight run complete — supersedes the 08-13 status)
Royce's full doc implemented and verifier-PASSed (round 4, commit 44f9452):
push demo (04), card artifact with flip, CTA weight, act-following nav,
stakes band, one-object what-it-does, manifesto arc, sections 01-08. Plus:
security headers, OG image/meta, .gitleaks.toml, Escape-to-close, all
unconfirmed promises gated behind YASH GATE comments (nothing unverifiable
renders). Lighthouse mobile 92/96. AWAITING YASH: deploy go; Supabase
project; domain; confirm-or-kill the gated CTA promises; verifier's design
note for the next wave: the page's second half (moat/arc) returns to telling
after 04 taught it to show — candidate for a future pass, Royce's call.

## STATUS (2026-08-13, end of autonomous loop)
Round-2 fresh-context verifier: SHIP. All non-gated criteria green on
measurement (hero 88px/3 lines, two-fates scrub confirmed as the screenshot
moment, Lighthouse mobile 93 perf / 96 a11y, copy 16/16 verbatim, zero banned
words, zero overflow, six distinct entrances, reduced-motion + JS-off both
render complete). Ship blockers fixed post-verdict: arc nodes on rail
(measured 194=194), SSR-complete file card (no inline opacity:0), h1
aria-label. main = 82f6ee7. Known deferred: mobile two-fates is sequential
(never both cards in one frame); 66vh panels slightly hollow at 1440;
copy-paste of h1 loses spaces at <br> boundaries.
AWAITING YASH (human gates): waitlist endpoint URL → .env; first Vercel
deploy (creates the project — needs a go); AlterHQ name/domain decision;
final copy sign-off incl. file-card recognition rows.

## MOAT SOURCING (corrected 2026-08-13 against primary transcripts)
What the transcripts ACTUALLY support: Max Schireson (Battery, Jun 23) — thin
wrappers are vulnerable from model companies moving up-stack and from
incumbents who own customers + data; what matters is fit into the process, not
owning the model. Chuck Davis (Stone Point, Jun 22) — AI could disintermediate
incumbent advantages ("slow deer"); proprietary-data holders are the gate; his
tone was opportunity + caution, NOT terror. What the transcripts do NOT
support: "the moat is the accumulated personality file" as an investor quote —
that line is Yash's own rehearsed pitch framing (Drive doc "Alter"), never said
by Schireson. The page's moat section (05) therefore states the structural
argument in OUR voice with zero attribution: labs need server-side data to
train; the .alter file lives on-device and reads into any model; copying it
means abandoning their business model.

## SOURCE OF TRUTH FOR COPY
The tool-coded six-section script (hero / stakes / what-it-does / memory objection /
three-year arc / CTA) — stored verbatim in .claude/skills/alter-waitlist-recipe/SKILL.md.
Newer feedback from Yash overrides it; propagate any change into STATE.md AND the
skill in the same pass.
