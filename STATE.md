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

## AMPLIFICATION REGISTER (2026-08-17, Yash — supersedes/extends the rule above)
Josh Elman's line (confirmed by Yash from Josh's emails, off-Granola): AI that
AMPLIFIES a real person = good; AI that SIMULATES being human = his uncanny
valley. Alter lives on the right side of the line — the WORDS must too. Every
sentence test: does it sound like a tool, or a fake friend? Fake friend → cut.
Danger → safe swaps (binding):
- "second personal identity" → "your context, attached to any model"
- "a partner as good as you" → "makes ChatGPT write like you, not like everyone"
- "it pushes you like a partner" → "spots your patterns before you do"
- "living model of you" → "a file you own that travels between tools"
- "Alter knows you" → "Alter carries your context"
- "companion" → never, in any form
Never name Josh/a16z in public copy. The lab-question answer to have COLD
(now rendered as section 06): each lab's memory only improves its own app;
none will build the layer that improves a competitor; Alter answers to no lab.

## PRODUCT TRUTH (2026-08-17, from Jul 21–29 calls — the page must match THIS)
One-liner: "AI has amnesia. Alter is the fix." Three layers: access/input
(interview, Claude export, extension) → identity (the kernel / personality
card + evidence graph) → outcome (tools sound like you, continue your work).
MVP: <10-min onboarding → "holy shit, this is me" → downloadable profile card.
The extension is a PIPE, not the product; a chat surface may be the front
door, but the identity object is the product. The card on the page = the
personality card (carrier); the COPY sells the outcome (tools working like
you), never the noun. Trajectory: file works → other tools call it → it's the
format ("Stripe for identity" — internal framing only, not page copy).

## GOAL
A waitlist landing page good enough to send to a16z partners, WHOOP, and 30 warm
intros without embarrassment. Bar: a partner screenshots it and sends it to a
colleague.

## STANDING RULE (2026-08-17, Yash, non-negotiable): SHOW, DON'T TELL
Every section must show, not tell; a section that only describes what Alter
stores has not earned its scroll. Corollaries: (a) HONESTY GATE — any
comparison/demo either comes from a real executed run and says so, or is
visibly labeled as an illustration; authoring a deliberately weak "generic AI"
response and presenting it as a real comparison is banned (a strawman is worse
than no section). (b) HUMAN GATE — access counts and reply promises are
commitments Yash keeps, never copy we invent; build slots, hand him the blanks.

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
~~the two-fates section~~ (REMOVED by Yash 2026-08-17 — overrides Royce's
don't-touch); the moat copy (superseded by the incentive rewrite, Yash-driven);
the .alter file as central metaphor (demoted: card = step-02 output, not hero).

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
4. Exactly ONE screenshot moment on the page: the push demo (04). (Was "The
   two fates" — Yash killed that section 2026-08-17: "i hate it… the thing to
   remove." Never rebuild it.)
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

## FORMAT LAW (2026-08-17, Yash verbatim — governs every future pass)
"The hero is good. The essay is shit, the words are shit, the content is
shit. Why are you doing cards? Why are you showing cards? That's so bad.
It's not the format that we wanted. The scroll animations and visuals are
amazing — think about how we can capture the user in the most simplistic
amount of words. Everything needs to be intentional, and everything needs
to be super, super insane."
Operating rules: NO cards, NO panels, NO UI mockups, NO diagrams — the page
is TYPE-ONLY after the hero. Minimal words (each section ≤ a dozen), insane
intentional motion. Show-don't-tell is now satisfied by typography + motion,
not by rendered product objects.

## STATUS (2026-08-18, five-persona QA pass — supersedes all blocks below)
Five fresh-context QA personas ran the full page. Verdicts: VC partner
FORWARD (screenshot moment = the push beat) · target user on mobile SIGNED
UP · skeptic engineer RESPECT WITH NITS (privacy claim survived forensics:
zero external requests, honest form failure, JS-off content-identical) ·
design judge QUIET RESPECT (pinned wave praised; moat wrap was his one
MAJOR) · a11y FIXABLE LAPSES (one true BLOCKER: SplitText aria-hidden on
the h1 root erased the headline from the a11y tree).
ALL FIXES APPLIED same-pass: h1 re-exposed + real h2s in every section ·
submit focus ring (outline-signature ≥3:1) · invalid-submit focuses input ·
ghost-opacity floor 0.55 in the wave · moat/push/like-you entrance floors +
earlier triggers (blank-flash killed) · moat lines rebroken (no stranded
"better."/"competitor.") · hero fills 100svh-57px (1920 sliver gone) · nav
act swap 150ms · italic accent restored in acts 04/05 (competitor, hand) ·
form 56px + double-submit guard · copy: "It doesn't chat." / "ChatGPT's
memory remembers…" / "Neither has any reason…" · favicon.ico (RGBA multi-
size) · robots.txt · poweredByHeader off.
DEPLOY CHECKLIST ITEM (from QA, blocking share cards): set
NEXT_PUBLIC_SITE_URL at deploy or og:image ships as localhost and 404s.
OPEN DESIGN NOTES (not applied, Yash's call): 2560px type-scale ceiling +
short night bands · push beat blur motif echoes the wave (could land via
mask-rise instead) · moat framing reads investor-facing to the target user
(VC called the same section the credibility anchor — tension, not a bug).

## STATUS (2026-08-17 night, type-only rebuild — superseded)
Page is now 5 beats, ~80 words after the hero: 01 hero (untouched — Yash:
"the hero is good") / 02 Like you (pinned focus-wave: "ChatGPT writes like
you. / Claude argues like you. / Cursor builds like you.") / 03 The push
(night: "Most AI agrees with you." struck through → "Alter pushes back."
lands from blur) / 04 moat (incentive lines) / 05 early access (CTA sub is
now the ownership line "One file. Your device. No servers. Leave, and it
leaves with you."). DELETED: Stakes, TheBuild, PushDemo, Arc, AlterFileCard
(all card/panel formats). Verified: no console errors, zero mobile overflow,
every scrub frame reads. AWAITING YASH eyeball.

## STATUS (2026-08-17 night, cut pass — superseded)
Yash on the two-fates section (05): "is bs… i hate it… that's the thing to
remove." REMOVED ENTIRELY — MemoryObjection.tsx deleted, sections renumbered
(moat 05, arc 06, CTA 07). The two-fates is NO LONGER the wow moment and NO
LONGER protected — that rule is DEAD; the push demo (04) is the page's proof
moment. Memory objection now answered by the hero "Vs memory" note + the
moat. Page is 7 sections: hero / stakes / the build / the push / moat / arc
/ early access.

## STATUS (2026-08-17 night, TEARDOWN pass — superseded)
Yash rejected the surgical repositioning twice ("so shit" / "so bad") — the
lesson (also in recipe LESSONS): two rejections mean the ask was a teardown,
not a tweak. Shipped: hero = "AI has *amnesia*. Alter is the fix." (his own
July-call one-liner), card REMOVED from hero, single-column hero + 3-col
notes row (Not a chatbot / Vs memory / Cost). WhatItDoes DELETED (duplicate
file-object junk); replaced by TheBuild.tsx (03 "The build" — It takes one
conversation.): step 01 You talk (chip interview), step 02 It compiles (the
AlterFileCard lives here now, as the output), step 03 It attaches (chatgpt/
claude/cursor slice rows), labeled "product flow · illustrated" per honesty
gate. Verified: SSR strings, banned grep zero, no console errors, 390px
overflow 0. AWAITING YASH eyeball.

## STATUS (2026-08-17 evening, repositioning pass — superseded)
Yash: "the card is bs — not the product anymore… the scroll animations and
visuals are great, the context itself is outdated." Visual system untouched;
copy repositioned to the amplification register + current product truth:
hero → "Every AI you use starts from zero. Alter fixes that." (eyebrow "The
fix", italic *zero*), body sells attach-to-your-tools ("ChatGPT writes like
you, not like everyone"), trust line added as first hero note ("Not a
chatbot"), Moat (06) rewritten to the lab-incentive argument. Stakes/push
demo/two-fates/arc/CTA copy unchanged (already on-register). Verify + commit
pending in-pass.

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
