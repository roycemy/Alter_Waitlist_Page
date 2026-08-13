import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Page container — one measure for every section on the page. */
export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1100px] px-6", className)}>
      {children}
    </div>
  );
}

/**
 * Mono eyebrow: index — hairline — label. Section grammar, repeated on every
 * section so the page reads as one document.
 */
export function Eyebrow({
  index,
  label,
  className,
}: {
  index: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.22em]",
        className,
      )}
    >
      <span className="text-signature">{index}</span>
      <span aria-hidden className="h-px w-7 bg-line" />
      <span className="text-ink-faint">{label}</span>
    </div>
  );
}
