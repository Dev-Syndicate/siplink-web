"use client";

import { startTransition, useActionState, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check, LoaderCircle, Mail } from "lucide-react";

import { subscribe, type SubscribeState } from "@/app/blog/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * The newsletter sign-up, on the brand panel (`tone="brand"`) or quietly in
 * the article sidebar. It only reports a sign-up as done when the server says
 * so. Where sending isn't set up yet it says that, and offers email instead.
 */
export function BlogNewsletterForm({ tone, id }: { tone: "brand" | "quiet"; id: string }) {
  const [email, setEmail] = useState("");
  const [localError, setLocalError] = useState("");
  const [state, dispatch, pending] = useActionState<SubscribeState, FormData>(subscribe, { status: "idle" });
  const honeypot = useRef<HTMLInputElement>(null);
  const brand = tone === "brand";

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pending) return;
    if (!EMAIL.test(email.trim())) {
      setLocalError("Please enter a valid email address.");
      return;
    }
    setLocalError("");
    const data = new FormData();
    data.set("email", email);
    data.set("website", honeypot.current?.value ?? "");
    startTransition(() => dispatch(data));
  };

  const mailto = `mailto:${site.email}?subject=${encodeURIComponent("Add me to the SipLink newsletter")}&body=${encodeURIComponent(
    `Please add ${email.trim()} to the newsletter.`,
  )}`;
  const linkClass = cn("font-semibold underline underline-offset-4", brand ? "text-primary-foreground" : "text-primary");

  if (state.status === "sent") {
    return (
      <p role="status" className={cn("inline-flex items-center gap-2 text-sm font-medium", brand ? "text-primary-foreground" : "text-foreground")}>
        <span className={cn("grid size-6 place-items-center rounded-full", brand ? "bg-primary-foreground text-primary" : "bg-primary text-primary-foreground")}>
          <Check className="size-3.5" strokeWidth={3} aria-hidden />
        </span>
        Thanks, you&rsquo;re on the list.
      </p>
    );
  }

  const error =
    localError || (state.status === "invalid" ? "Please enter a valid email address." : "");

  return (
    <form onSubmit={submit} noValidate className="w-full">
      <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
        <label htmlFor={`${id}-website`}>Leave this empty</label>
        <input ref={honeypot} id={`${id}-website`} type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <label htmlFor={`${id}-email`} className="sr-only">
        Email address
      </label>
      <div
        className={cn(
          "flex w-full gap-2",
          brand ? "flex-col rounded-2xl bg-card p-1.5 shadow-xl shadow-foreground/10 sm:flex-row sm:rounded-full" : "flex-col",
        )}
      >
        <Input
          id={`${id}-email`}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            "h-11 min-w-0 flex-1",
            brand
              ? "rounded-full border-0 bg-transparent px-4 text-foreground shadow-none focus-visible:ring-0 aria-invalid:ring-0"
              : "rounded-lg bg-card",
          )}
        />
        <Button type="submit" disabled={pending} className="h-11 shrink-0 rounded-full px-6">
          {pending ? <LoaderCircle className="animate-spin" aria-hidden /> : null}
          {pending ? "Subscribing…" : "Subscribe"}
          {pending ? null : <ArrowRight aria-hidden />}
        </Button>
      </div>

      <div role="status" aria-live="polite" className={cn("text-xs text-pretty", brand ? "text-primary-foreground/90" : "text-muted-foreground")}>
        {error ? (
          <p id={`${id}-error`} className={cn("mt-2.5 font-medium", brand ? "" : "text-destructive")}>
            {error}
          </p>
        ) : null}
        {state.status === "unconfigured" ? (
          <p className="mt-2.5">
            Sign-ups aren&rsquo;t open just yet, so nothing was saved.{" "}
            <a href={mailto} className={linkClass}>
              <Mail className="mr-1 inline size-3.5" aria-hidden />
              Email us to join the list
            </a>
            .
          </p>
        ) : null}
        {state.status === "failed" ? (
          <p className="mt-2.5">
            That didn&rsquo;t go through. Please try again, or{" "}
            <a href={mailto} className={linkClass}>
              email us
            </a>
            .
          </p>
        ) : null}
        {state.status === "limited" ? (
          <p className="mt-2.5">Too many tries in a short time. Please wait a few minutes.</p>
        ) : null}
      </div>
    </form>
  );
}
