---
name: alter-waitlist-recipe
description: Durable recipe for building and iterating the Alter waitlist page — design rules, motion rules, copy rules, verbatim approved copy, and an append-only LESSONS log. Read before any pass on this repo.
---

# Alter waitlist recipe

Read STATE.md first. It wins on conflicts, newer Yash feedback wins over both —
and must be propagated into BOTH files in the same pass it is given.

## Brand tokens (locked for this page — UPDATED 2026-08-13, Yash rejection)
- **BLUE IS BANNED for Alter. All of it.** Yash, verbatim reaction to the blue
  button: "so garbage… such AI slop… why would it be blue?" Cool/saturated
  blues are the AI-landing-page tell and mean nothing for this brand. Never
  reintroduce blue from any source (library default, reference site, old
  screenshot).
- Surface: paper `#faf9f5`, deep paper `#f2f0e9`, hairlines `#e3e0d5`
- Text: ink `#16150f`, soft `#4c4a40`, faint `#6e6a5c`
- Single accent: warm oxide ink `#9c451f` on paper (+wash `#f7e9df`); lifts to
  `#d99a70` on night. Meaning: fountain-pen ink — the file is written.
- **Buttons are monochrome, never colored pills**: ink on paper acts, paper on
  night acts. Color exists only as small marks of intent (labels, dots, ticks).
- Type: Instrument Serif (display, italic for emphasis) / Instrument Sans (body) /
  IBM Plex Mono (file metadata, labels, timestamps)
- The visual idea: **identity as a file.** The `.alter` file card is the motif —
  mono metadata, registration ticks, document language. Not glassmorphism, not
  gradient orbs, not dark-SaaS.

## Design rules
- Two-act page: warm-dark ink hero (#17140f range, warm — never neutral-gray
  dark-SaaS) with the paper .alter file card as the only lit object, then paper
  body sections. The failure mode to avoid is GENERIC dark (gradient orbs, glow,
  purple), not dark itself — thread-v4's hero is dark and premium.
- One accent color, used sparingly — accent earns attention by scarcity.
- Hairline rules + mono eyebrow labels as section grammar.
- Generous white space; sections breathe (~160-240px vertical rhythm at desktop).
- No purple-to-blue gradients, no emoji in UI, no default Tailwind palette colors.
- No component ships at library default styling. Every 21st.dev / React Bits /
  Aceternity / Magic UI import gets our palette, type scale, and motion timing.
  If a stranger could name the source library, it's not done.
- shadcn @theme inline tokens are consumed by primitives — rewrite VALUES to the
  paper/ink system, never delete the tokens.

## Motion numbers (measured off thread-v4 live, 2026-08-13 — MutationObserver +
## WAAPI probes at 1440×900; use these, not defaults)
- **Hero load choreography (measured start offsets):** eyebrow t=0 → lede +270ms
  → masked headline lines +320ms (3 lines, ~118ms stagger line-to-line) → hero
  card +380ms → fineprint +460ms → floating chips +745ms and +900ms (~155ms
  stagger). Full settle ≈2.2s, but H1 is readable by ~1.5s.
- **The entrance signature:** text enters translateY(22px) + blur(10px) → 0;
  cards enter translateY(26px) + scale(0.97) + blur(10px) → identity. The
  blur-to-sharp is what reads "expensive" — pair it with opacity, ~600-800ms,
  ease-out. Headline lines use masked translateY(110%→0) inside overflow-hidden.
- **Scroll sections are SCRUBBED, not one-shot:** thread's mid-page "zoom" pins
  and scrubs scale 1→3 with opacity 1→0 across ~1,500px of scroll (measured on
  .ex-zw), then the closing line fades up translateY(~12px→0) in the last 250px.
  Motion is bound to scroll position (Lenis-driven), so the user owns the pace.
- **Ambient life (sub-perceptual, linear, infinite):** status-dot breathe
  2.2–2.6s; radar pings 2.2–2.6s; floating chips 7–9s; background veil/
  constellation drift 30–36s; caret blink 1.05s. Nothing ambient under 2s —
  fast loops read as busy, slow loops read as alive.
- **Pacing (from thread's section heights at 900px viewport):** hero 1.6
  viewports; big narrative beats get 2.7–3.4 viewports of scroll room (loop
  2409px, zoom 3103px); breather/pull-quote 0.5 viewport (466px); closing
  sections tighten to 0.6–0.8 viewport (689/623/538px). Rhythm = long, long,
  short, short, short — the page accelerates toward the CTA.
- **Thread's single best moment (named):** the pinned zoom-through — the
  interface scales past you 1→3 as you scroll, page emerging on the other side.
  It lands because the scroll gesture itself becomes entering the product.
  Alter does NOT copy it; Alter's one wow stays "The two fates" (see Trust
  rule 4), built from Alter's own content.
- **"The two fates" build spec (Yash correction, 2026-08-13):** do NOT build it
  as pinned scale-and-fade — that was thread's solve for thread's content. Ours
  compares two objects, so it reads as TWO PATHS DIVERGING on scroll: as the
  visitor scrolls the section, the their-memory column and the your-file column
  separate — theirs decaying (rows striking, fading, going stale), yours
  solidifying and accumulating. Use the scrub PRINCIPLE (motion bound to scroll
  position, visitor controls pace), never the exact transform.

## Motion rules
- GSAP ScrollTrigger for entrances; Lenis for smooth scroll; motion (framer) OK for
  micro-interactions. gsap.matchMedia + prefers-reduced-motion: every animation off,
  content fully visible.
- Ease: power3.out / [0.22, 1, 0.36, 1]. Durations 0.6–1.1s. Stagger 0.06–0.12s.
- Every section entrance is distinct from the previous section's.
- Never animate opacity to 0 on pulsing elements (floor 0.3), never leave content
  hidden if JS fails — initial states set via gsap.set, not CSS opacity:0.
- SplitText per-character reveal on hero only; everywhere else is lines/blocks.
  (SplitText is Club GSAP — if unavailable, hand-split words/chars in React.)

## Copy rules
- Tool-coded, never companion-coded (see STATE.md positioning rule + banned list).
- Verbatim script below is the source of truth. No paraphrasing, no additions.
- Pre-answer the memory objection. Never bury it.
- No "seamless", "unlock", "supercharge", "AI-powered", "revolutionize", "doesn't
  just", "not just", "empower", "game-changer". No fake urgency, no "limited spots."

## Approved copy (verbatim)
(TIGHTENED 2026-08-17 per Yash live direction "tight blunt bold": stakes cut to
its first three claims — the recognition list moved out, the push demo carries
that job; hero body/close, what-it-does lead/close, and the objection answer
all shortened. The rendered components are now the copy source of truth for
those blocks; the blocks below preserve the pre-cut wording for history.)

### 1 — Hero
H1: AI should learn how you think — not think for you.
Body: Every AI you use forgets you the second you close the tab. Switch models,
start over. You're spending the first ten minutes of every conversation
re-explaining who you are before you can ask the real question.
Close: Alter is the file that ends that. It learns how you actually work — and
carries it into every AI you already use.
CTA: [email] [Join the waitlist]

### 2 — Stakes (REWRITTEN 2026-08-13 per Yash hedge-cut directive; awaiting his
### eyeball on the live section — previous version preserved in git history)
Most AI is optimizing to agree with you. That's comfortable. Comfort doesn't
make anything better. Alter is built to catch the work that slips — the rushed
email, the argument argued the wrong way, the draft that's technically fine and
actually forgettable. Not by being a friend. By knowing the work well enough to
push it further than you'd take it alone.
Rewrite rationale, sentence by sentence (vs measured reference numbers):
- "That's comfortable, and comfort doesn't make you better at anything" (10w
  compound) → split into a 2-word and a 6-word claim. Stated, not explained
  (linear subhead sentences measure 5-6w).
- "built to know your patterns well enough to catch the moments you're not at
  your best" (18w) → "built to catch the work that slips" (9w). The old clause
  was BOTH hedged ("well enough to") and person-pointed (banned-intent
  violation: the AI correcting the person's weak moments). New clause points at
  the work.
- Recognition list: "the argument you're about to lose because you're arguing
  the wrong way" (explained) → "the argument argued the wrong way" (stated).
  List stays the section's single long sentence (thread precedent: one ~20w
  sentence max per section).
- Closer: "your work" → "the work" (output-pointed), hedge retained
  intentionally in "well enough" as the one earned qualifier of the section.
- Type stepped up clamp 2.4rem→3.1rem max, leading 1.38→1.3: the claim gets
  the biggest body type on the page (directive: type steps up when the claim
  gets bigger).

### 3 — What it actually does
Lead: Alter reads how you already write and decide — emails, docs, the corrections
you make to AI output — and builds three things:
Card 1 — Voice. The words you use. The words you'd never use.
Card 2 — Reasoning. Whether you argue from data or from instinct. How you build a case.
Card 3 — Decisions. What you say yes to fast. What you always push back on.
Close: It compiles into one file. Yours. Not stored on our servers, not sold, not
shared, not trained on. Delete it whenever you want. If you leave, it leaves with you.

### 4 — Memory objection
Q: "Doesn't ChatGPT already have memory?"
A: Theirs remembers what you told it, inside one app. Alter learns how you actually
work, and it's the same file whether you're in Claude, ChatGPT, or whatever ships
next quarter. Their memory dies if you switch tools. Yours doesn't, because it was
never theirs.

### 5 — The moat (ADDED 2026-08-13 per Yash directive; our voice, no attribution)
A lab needs your data on its servers — that's how the next model gets trained.
The .alter file lives on your device and reads into any model.
To copy it, they'd have to abandon the business model that funds them.
(Sourcing: structural argument from the Drive "Alter" doc's sovereignty section,
informed by — but never quoting — the Schireson and Davis calls. See STATE.md
"MOAT SOURCING." Section numbering: moat=05, arc=06, CTA=07.)

### 6 — Where it goes
Year one: the file works — noticeably better answers, in the tools you already use.
Year two: other tools can call it — the layer underneath everything.
Year three: it's not our app anymore. It's the format. The question stops being
which AI you use, and becomes where your context lives.

### 6 — CTA
Early access is going out by hand, a few people at a time.
[email] [Join the waitlist]
No spam, no drip campaign. One note when it's ready.

## Reference rules (from live-site study, screenshots 2026-08-13)
1. **Two-act temperature (thread-v4):** dark editorial hero (warm near-black
   #1c1613 range, not neutral gray) → cream/paper documentation body. The
   temperature shift IS the narrative beat. Alter's version: dark hero where the
   paper-white .alter file card is the ONLY lit object → page becomes paper from
   "what it actually does" onward. CTA bookends back to dark.
2. **Scale contrast (thread-v4, linear, vercel):** hero display ~88-96px at
   1440 (amended 2026-08-13: orphan-free measured line breaks win ties over
   raw size — an orphaned word or dash costs more than 7px of type), 3 lines
   max, tight leading (~0.99 for Instrument Serif — 0.95 clips descenders),
   subhead stays 18-20px, no intermediate sizes competing. Italic serif on
   exactly one emotional word.
3. **Deliberate emptiness (vercel):** >50% of the hero viewport is empty surface.
   Nothing within 120px of the headline block except the eyebrow and subhead.
4. **Mono numbered index as section grammar (thread-v4):** `01 · VOICE` style
   uppercase mono eyebrows, hairline underline, consistent across all sections.
5. **Sticky rail + scrolling column (thread-v4 mid):** process/loop sections pin
   a left serif statement while right column cards scroll past. Use for the
   three-year arc or what-it-does.
6. **Structure as decoration (stripe):** visible hairline column grid on light
   sections — 1px lines at container edges, no drop shadows heavier than
   0_1px_2px + one long soft ambient.
7. **Dimmed proof (linear):** any product mockup sits below the fold at reduced
   contrast/brightness — it never competes with the headline.
8. **Quiet CTAs (all four):** pill buttons, small, one filled + one ghost max.
   The headline sells; the button just accepts.
9. **Status chips (thread-v4):** tiny mono uppercase chips with dot + soft tinted
   bg for state language (use for their-memory vs your-file: e.g. FORGETS / YOURS).
10. **Texture floor (thread-v4):** background texture (constellation/grain) stays
    ≤5% opacity — felt, never seen.

## Show, don't tell (Yash, 2026-08-17 — standing rule, grades with the feeling test)
Every section must show, not tell; a section that only describes what Alter
stores has not earned its scroll. HONESTY GATE: demos/comparisons are either
real executed runs labeled as such, or visibly labeled illustrations — never
an authored strawman presented as a real comparison. HUMAN GATE: access
counts and reply promises are Yash's commitments, never invented copy.

## The finish line is a feeling (Yash, 2026-08-13 — grades above everything)
The real test is not "does this look cool." It is: the exact person this is for
opens it and something in them goes "wait, this is me" — caught off guard by
how well it gets them. A beautiful page that doesn't make someone feel
understood has failed; a plain page that makes someone feel seen has succeeded.
- The page's recognition engines are (a) the stakes paragraph's list — rushed
  email / argument you're losing wrong / technically-fine-forgettable draft —
  and (b) the file card's rows. Every design decision should amplify these two;
  nothing may compete with them.
- Card rows must read like they were written about the visitor, not a persona.
  Sharpen toward universal-but-specific recognitions; they are sanctioned
  diagram labels (tool-coded, banned words apply), and changes get shown to
  Yash before/after.
- Before adding any effect, ask: does this make someone feel known, or just
  make the page feel expensive? Only the first justifies build time.
- Grade every pass with the question: "would a stranger stop scrolling and feel
  caught off guard by how well it gets them?" If the answer isn't a yes WITH A
  REASON, the pass isn't done.

## Trust rules (first-four-seconds — these five override everything below on conflict)
1. **The 2-second belief:** before reading a word, a stranger must believe
   "serious people made this over months." Carried by: one huge editorial serif
   headline, warm considered surface, and a single intentional object (the file
   card, typing). If any above-fold element could appear on another startup's
   template unchanged, cut it — craft is the message.
2. **The one hero takeaway:** by the end of the hero, without scrolling, a
   stranger can say "it's a file I own that makes every AI already know me."
   FILE + YOURS + EVERYWHERE. The card must SHOW it (a .alter file assembling);
   the headline must not need the card to be understood, or vice versa.
3. **Answer doubt before it compounds:** the "isn't this ChatGPT memory?" doubt
   forms the moment the premise lands. Stakes and what-it-does stay LEAN (one
   viewport each at 1440) so the memory-objection section arrives within ~4
   viewports of landing. The hero subhead pre-frames it ("forgets you the second
   you close the tab") so the objection section reads as "they knew."
4. **The screenshot moment (named before built): "The two fates."** In the
   memory-objection section, the their-memory column visibly decays — mono rows
   striking through, fading, timestamps going stale — while the your-file column
   stays solid and accumulates the same facts. Why it lands: it turns the
   abstract ownership debate into one visceral two-second image. This is the
   page's ONLY wow moment; everything else stays restrained so it can own it.
5. **Calm, never pressure:** no countdown timers, no "N people joined today," no
   fake scarcity, no exit intent, no guilt copy, no urgency adverbs. Scarcity
   language only where literally true ("going out by hand" is true). The only
   pressure allowed is the quality of the argument. Confident pages are calm.

## Visitor psychology (the grading rubric — every element must earn its place)
The visitor is an a16z partner, a WHOOP exec, or a warm intro: sophisticated,
4-second patience, pattern-matches AI slop instantly, asks "why not ChatGPT
memory?" within 30 seconds. The page is engineered for that person's clock:

- **0–2s (category signal):** warm-dark surface + editorial serif says "position,
  not product demo." The single lit paper object (the .alter file card) is the
  curiosity anchor. Intended eye path: headline → file card → email field.
  Failure: anything that reads template (gradient orbs, glow, icon grids).
- **2–10s (evidence over claim):** the file card TYPES ITSELF — the product
  visibly learning someone. We never explain personalization; we show a file
  assembling. Every animation must be narrative: file assembles = it learns;
  their-memory rows degrade = memory dying; page turning paper = the file
  becoming the environment. Decoration without meaning is the slop tell.
- **10–30s (emotional hook, tool-coded):** stakes paragraph lands the "agreeable
  AI doesn't make you better" position. The dark→paper act change signals total
  control of the medium — intentionality read.
- **30–60s (respect signal):** the memory objection answered before they can ask
  it. This is the section a partner screenshots.
- **60s+ (ambition + honest scarcity):** three-year arc shows the wedge→layer→
  format ladder. CTA "going out by hand, a few people at a time" is true and
  reads as taste, never fake urgency ("limited spots" is banned).
- **NO VISITOR PROFILING (Yash, 2026-08-13, standing rule):** no fingerprinting,
  no behavior-inferred content adaptation, no profiling visitors before they
  act. The page earns trust by being confident and clear to every visitor
  equally. If this idea resurfaces from ANY source, do not build it — flag it
  back to Yash. (Even aggregate analytics remain a human-gated decision.)

## Banned-intent audit log (2026-08-13, per Yash's re-check directive)
Rule applied: anything describing the AI knowing/correcting the PERSON — even
without a banned word — gets rewritten to point at the output (the email, the
draft, the argument). Findings, section by section:
- Hero: clean ("learns how you actually work" = work-pointed).
- Stakes: ONE violation found — "catch the moments you're not at your best"
  (AI watching the person's weak moments). Rewritten to "catch the work that
  slips." This was the only instance on the page.
- What-it-does: clean (reads writing/decisions as inputs; "builds three
  things" = artifact).
- Memory objection: clean (memory/file framing, never the person).
- Arc, CTA, footer: clean.
- File card row "register short when busy — reads as cold, isn't": KEPT —
  judgment call: it describes the person's writing register (an output
  property), not a trait being corrected. Flag to Yash if he reads it
  otherwise.
- Hedge census after rewrite: one intentional qualifier remains on the page
  ("well enough" in the stakes closer); all other claims are stated, not
  explained.

## LESSONS (append-only)
- 2026-08-13: Royce's commit 9c8cf8a said "Add waitlist landing page" but contained
  only a stub package-lock — always verify remote commits by contents, not message.
- 2026-08-13: create-next-app@latest rejected — "latest" pins broke dev before
  (next@latest → SWC 404). Scaffold is hand-rolled, next pinned 16.2.8.
- 2026-08-13: shadcn init overwrote globals.css with default oklch neutral tokens
  and injected Geist into layout — brand token values must be re-asserted after any
  shadcn/registry add; check globals.css diff every time.
- 2026-08-13: assumed "light editorial only" before looking — actual thread-v4
  screenshots showed a dark hero → cream body two-act structure. Vision on real
  references before locking design rules; memory of a site is not the site.
- 2026-08-13: the browse daemon is SHARED across agents in this session — a
  builder navigated the tab to localhost:3111 mid-way through my thread-v4
  screenshot loop, so half the "thread-*" screenshots are actually our own page.
  Always verify `$B url` before trusting a screenshot batch; consider a
  dedicated tab per agent (`newtab`/`tab`) when parallel agents browse.
- 2026-08-13 (verifier pass 1): next/font variables on <body> while @theme reads
  them at :root → silent full-page Geist fallback. Font variable classNames go
  on <html>, always.
- 2026-08-13 (verifier pass 1): scrub sections whose elements START hidden show
  an empty box to fast scrollers — base states must always be populated; the
  scrub transforms character, never existence.
- 2026-08-13 (verifier pass 1): framer-motion components need their own
  useReducedMotion gating — gsap.matchMedia only covers GSAP. A "reduced motion
  compliant" page means BOTH stacks are gated, plus timers (the typing effect).
- 2026-08-13 (verifier pass 1): #8b887a mono labels on #faf9f5 = 3.4:1, a real
  AA fail that pinned Lighthouse a11y at exactly 95. Day-act faint is #6e6a5c+.
  Check contrast per-act whenever a token value changes.
- 2026-08-13 (verifier pass 1): a locked type rule (display ≥90px) silently
  drifted to 69.6px in build — verifiers must MEASURE type against the recipe's
  numbers, and builders should treat the numbers as acceptance, not suggestion.
- 2026-08-13 (pass 2): the browse daemon loses viewport state between command
  batches — set `$B viewport` at the START of every capture batch, never assume
  it carried over. Also: Lenis keeps animating after scrollTo — wait ~2s before
  screenshotting; and a scrubbed pinned section shown "after scrolling back up"
  is at REVERSED progress, not end state — capture end state at runway end.
- 2026-08-13 (pass 2): headline wrap orphans at large display sizes are fixed
  with measured manual <br> breaks + a cap the middle line actually fits at —
  not with text-balance (fights SplitText) and not by shrinking below the scale
  band. 88px with clean breaks beats 96px with an orphaned dash.
- 2026-08-13 (pass 3): two absolutely-positioned siblings both using left-0 can
  sit 47px apart when their positioning contexts differ (padding box of the
  padded track vs content box of an inner relative div). Rail-and-node layouts:
  position both against the SAME ancestor, then verify by measuring both
  centers in the browser — the arc dots shipped misaligned through two verifier
  rounds before being caught.
- 2026-08-13 (pass 4): error/destructive states are invisible to load-time
  audits (Lighthouse never sees them) — the shadcn default red survived three
  verifier rounds until one explicitly triggered the form error. Every stateful
  color (error, focus, disabled, success) must be tested in its TRIGGERED state
  and belong to the token system (--color-error: #a03018 day / #f2a58e night).
- 2026-08-13 (pass 4): a browse-daemon tab can serve a PRE-REBUILD page from
  memory even when only one tab exists and the server has new content — before
  any before/after capture, `$B reload` and assert a content marker
  (`innerText.includes(newPhrase)`) in the same batch as the screenshot.
- 2026-08-13 (pass 3): "markup is the end state" applies to LOAD animations
  too, not just scrubs — the typing card shipped SSR-empty (inline opacity:0)
  until rebuilt so the server renders the full document and the client clears
  and retypes it as the entrance. JS-off/no-hydration is a first-class reader.
- 2026-08-17 (repositioning pass): AMPLIFICATION REGISTER is now the copy law
  (see STATE.md "AMPLIFICATION REGISTER"): every sentence must sound like a
  tool, never a fake friend. Josh Elman's amplify-vs-simulate line is now
  CONFIRMED (Yash relayed it from Josh's emails, 2026-08-17) — but he is
  never named in public copy. Banned additions on top of the standing list:
  "companion", "living model of you", "Alter knows you", "a partner as good
  as you", "second personal identity". Safe register: "your context, attached
  to any model", "ChatGPT writes like you, not like everyone", "spots your
  patterns before you do", "a file you own that travels between tools".
- 2026-08-17 (repositioning pass): the page sells the OUTCOME, never the noun
  — Yash: "the card is bs, not the product anymore" while the card's VISUAL
  stays (it is the personality card, the carrier). Hero is now "Every AI you
  use starts from zero. Alter fixes that." (matches the one-liner from the
  Jul 21–29 calls: "AI has amnesia. Alter is the fix."). Moat (06) is the
  lab-incentive argument — the answer to "why doesn't Claude Projects just
  do this?" — kept cold and on the page. When a pass touches copy, re-check
  it against STATE.md "PRODUCT TRUTH" (kernel, three layers, extension=pipe).
