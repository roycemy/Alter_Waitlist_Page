import { Container } from "./kit";

/** Sticky hairline nav: wordmark left, file chip + waitlist anchor right. */
export function Nav() {
  return (
    <header className="act-night sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur-md">
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
