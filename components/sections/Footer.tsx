import { Container } from "./kit";

/** Footer — brand only. */
export function Footer() {
  return (
    <footer className="act-night border-t border-line py-10">
      <Container className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-display text-[16px] tracking-[-0.01em] text-ink">
          Alter — the file is yours.
        </span>
        <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-faint">
          © 2026 Alter.
        </span>
      </Container>
    </footer>
  );
}
