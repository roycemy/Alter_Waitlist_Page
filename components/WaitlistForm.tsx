"use client";

import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type FormStatus = "idle" | "submitting" | "success" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(value: string) {
  return EMAIL_PATTERN.test(value.trim());
}

export function WaitlistForm({ id }: { id?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const inputId = useId();
  const errorId = useId();

  const isSubmitting = status === "submitting";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = email.trim();

    if (!isValidEmail(trimmed)) {
      setStatus("error");
      setErrorMessage("Enter a valid email address.");
      return;
    }

    const endpoint = process.env.NEXT_PUBLIC_WAITLIST_ENDPOINT;

    if (!endpoint) {
      console.error(
        "NEXT_PUBLIC_WAITLIST_ENDPOINT is not set — waitlist submissions are NOT being stored"
      );
      setStatus("error");
      setErrorMessage("Waitlist isn't connected right now. Try again shortly.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      setStatus("success");
    } catch (error) {
      console.error("Waitlist submission failed:", error);
      setStatus("error");
      setErrorMessage("Something went wrong. Try again in a moment.");
    }
  }

  if (status === "success") {
    return (
      <p
        id={id}
        role="status"
        className="font-mono text-sm text-ink-soft"
      >
        you&apos;re on the list — one note when it&apos;s ready.
      </p>
    );
  }

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      noValidate
      className="flex w-full max-w-md flex-col gap-2 sm:flex-row sm:items-start"
    >
      <div className="flex-1">
        <label htmlFor={inputId} className="sr-only">
          Email address
        </label>
        <Input
          id={inputId}
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          disabled={isSubmitting}
          aria-invalid={status === "error"}
          aria-describedby={status === "error" ? errorId : undefined}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status === "error") {
              setStatus("idle");
              setErrorMessage("");
            }
          }}
          className={cn(
            "h-11 border-line bg-paper px-3.5 text-ink placeholder:text-ink-faint focus-visible:border-signature focus-visible:ring-signature/30"
          )}
        />
        <p
          id={errorId}
          aria-live="polite"
          className={cn(
            "mt-1.5 font-mono text-xs text-destructive transition-opacity",
            status === "error" && errorMessage ? "opacity-100" : "opacity-0"
          )}
        >
          {status === "error" && errorMessage ? errorMessage : " "}
        </p>
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-11 shrink-0 rounded-sm px-5 text-sm font-medium"
      >
        {isSubmitting ? "Joining…" : "Join the waitlist"}
      </Button>
    </form>
  );
}
