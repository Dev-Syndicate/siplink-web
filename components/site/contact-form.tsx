"use client";

import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, CircleAlert, LoaderCircle, Mail, RotateCcw } from "lucide-react";

import { submitEnquiry, type EnquiryState } from "@/app/contact/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  enquiryLimits,
  enquiryLineCounts,
  enquiryServices,
  enquiryText,
  validateEnquiry,
  type EnquiryFields,
} from "@/lib/contact";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const EMPTY: EnquiryFields = {
  name: "",
  email: "",
  company: "",
  phone: "",
  services: [],
  lines: "",
  message: "",
};

/** The order fields are focused in when the form has problems. */
const ORDER: (keyof EnquiryFields)[] = ["name", "email", "company", "phone", "services", "lines", "message"];

/** Underline inputs: a hairline that turns brand pink on focus. */
const line =
  "h-11 rounded-none border-0 border-b border-border bg-transparent px-0 text-base shadow-none transition-colors duration-300 placeholder:text-muted-foreground/70 hover:border-foreground/30 focus-visible:border-primary focus-visible:ring-0 aria-invalid:border-destructive aria-invalid:ring-0 md:text-base dark:bg-transparent";

/**
 * The contact form. Each "Send another" mounts a fresh form, which clears the
 * fields and the submission state together.
 */
export function ContactForm() {
  const [round, setRound] = useState(0);
  return <EnquiryForm key={round} onReset={() => setRound((n) => n + 1)} />;
}

function EnquiryForm({ onReset }: { onReset: () => void }) {
  const [fields, setFields] = useState<EnquiryFields>(EMPTY);
  const [checked, setChecked] = useState(false);
  const [state, dispatch, pending] = useActionState<EnquiryState, FormData>(submitEnquiry, {
    status: "idle",
  });
  const startedAt = useRef(0);
  const honeypot = useRef<HTMLInputElement>(null);
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  // Errors appear once someone has tried to send, then follow their edits.
  const live = validateEnquiry(fields);
  const fromServer = state.status === "invalid" ? state.errors : {};
  const errors = checked ? (Object.keys(live).length > 0 ? live : fromServer) : {};

  const set = <K extends keyof EnquiryFields>(key: K, value: EnquiryFields[K]) =>
    setFields((current) => ({ ...current, [key]: value }));

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pending) return;
    setChecked(true);

    const problems = validateEnquiry(fields);
    const first = ORDER.find((key) => problems[key]);
    if (first) {
      form.current?.querySelector<HTMLElement>(`[data-field="${first}"]`)?.focus();
      return;
    }

    const data = new FormData();
    for (const key of ["name", "email", "company", "phone", "lines", "message"] as const) {
      data.set(key, fields[key]);
    }
    for (const service of fields.services) data.append("services", service);
    data.set("website", honeypot.current?.value ?? "");
    data.set("startedAt", String(startedAt.current));
    startTransition(() => dispatch(data));
  };

  if (state.status === "sent") return <Sent name={state.name} email={state.email} onReset={onReset} />;

  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
    `Website enquiry: ${fields.services.join(", ")}`,
  )}&body=${encodeURIComponent(enquiryText(fields))}`;

  return (
    <form ref={form} onSubmit={submit} noValidate aria-describedby="enquiry-status" className="relative">
      {/* People never see or fill this; bots that fill every field do. */}
      <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
        <label htmlFor="website">Leave this empty</label>
        <input ref={honeypot} id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
        <Field id="name" label="Full name" required error={errors.name}>
          <Input
            id="name"
            data-field="name"
            autoComplete="name"
            placeholder="Your name"
            maxLength={enquiryLimits.name}
            value={fields.name}
            onChange={(e) => set("name", e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={line}
          />
        </Field>

        <Field id="email" label="Work email" required error={errors.email}>
          <Input
            id="email"
            data-field="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={fields.email}
            onChange={(e) => set("email", e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={line}
          />
        </Field>

        <Field id="company" label="Company or organisation" optional error={errors.company}>
          <Input
            id="company"
            data-field="company"
            autoComplete="organization"
            placeholder="Optional"
            maxLength={enquiryLimits.company}
            value={fields.company}
            onChange={(e) => set("company", e.target.value)}
            aria-invalid={Boolean(errors.company)}
            aria-describedby={errors.company ? "company-error" : undefined}
            className={line}
          />
        </Field>

        <Field id="phone" label="Phone number" optional error={errors.phone}>
          <Input
            id="phone"
            data-field="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="Optional"
            maxLength={enquiryLimits.phone}
            value={fields.phone}
            onChange={(e) => set("phone", e.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={line}
          />
        </Field>

        {/* What they need: as many as apply. */}
        <fieldset className="sm:col-span-2" aria-describedby={errors.services ? "services-error" : undefined}>
          <legend className={labelClass}>
            What do you need?<Required />
          </legend>
          <ToggleGroup
            type="multiple"
            variant="outline"
            spacing={2}
            value={fields.services}
            onValueChange={(value) => set("services", value)}
            aria-label="What do you need?"
            className="mt-3 flex w-full flex-wrap"
          >
            {enquiryServices.map((service, i) => (
              <ToggleGroupItem
                key={service}
                value={service}
                data-field={i === 0 ? "services" : undefined}
                aria-invalid={Boolean(errors.services)}
                className="h-9 rounded-full border-border bg-card px-4 text-sm font-normal text-foreground/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-accent hover:text-foreground aria-invalid:border-destructive/50 data-[state=on]:border-transparent data-[state=on]:bg-gradient-to-r data-[state=on]:from-brand-to data-[state=on]:to-brand-from data-[state=on]:text-primary-foreground data-[state=on]:shadow-md data-[state=on]:shadow-primary/25"
              >
                {fields.services.includes(service) ? (
                  <Check className="size-3.5" strokeWidth={3} aria-hidden />
                ) : null}
                {service}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          <FieldError id="services" error={errors.services} />
        </fieldset>

        <Field id="lines" label="Team size" optional error={errors.lines} className="sm:col-span-2">
          <Select value={fields.lines} onValueChange={(value) => set("lines", value)}>
            <SelectTrigger
              id="lines"
              data-field="lines"
              aria-invalid={Boolean(errors.lines)}
              aria-describedby={errors.lines ? "lines-error" : undefined}
              className={cn(line, "w-full data-placeholder:text-muted-foreground/70 sm:w-1/2 sm:pr-8")}
            >
              <SelectValue placeholder="How many lines? Optional" />
            </SelectTrigger>
            <SelectContent>
              {enquiryLineCounts.map((count) => (
                <SelectItem key={count} value={count}>
                  {count}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field id="message" label="Tell us about your requirements" required error={errors.message} className="sm:col-span-2">
          <Textarea
            id="message"
            data-field="message"
            rows={5}
            maxLength={enquiryLimits.message}
            placeholder="Tell us a little about your requirements, your goals, and what you'd like to achieve..."
            value={fields.message}
            onChange={(e) => set("message", e.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={cn("message-count", errors.message && "message-error")}
            className={cn(line, "field-sizing-fixed h-auto min-h-36 resize-none py-3 leading-relaxed")}
          />
          <p id="message-count" className="mt-1.5 text-right font-mono text-[11px] text-muted-foreground tabular-nums">
            {fields.message.length}/{enquiryLimits.message}
          </p>
        </Field>
      </div>

      {/* Status: problems sending, read out as they appear. */}
      <div id="enquiry-status" role="status" aria-live="polite" className="mt-2">
        <AnimatePresence initial={false}>
          {state.status === "unconfigured" ? (
            <Notice key="unconfigured">
              Our form can&rsquo;t reach the team just yet, so nothing was sent. Your details are
              still here: send them by email instead and we&rsquo;ll pick it up.
              <a
                href={mailto}
                className="mt-3 inline-flex items-center gap-2 font-semibold text-primary underline-offset-4 hover:underline"
              >
                <Mail className="size-4" aria-hidden />
                Email your enquiry to {site.email}
              </a>
            </Notice>
          ) : null}
          {state.status === "failed" ? (
            <Notice key="failed">
              Something went wrong sending your enquiry, and nothing was sent. Your details are still
              here; please try again in a moment, or email us at{" "}
              <a href={mailto} className="font-semibold text-primary underline-offset-4 hover:underline">
                {site.email}
              </a>
              .
            </Notice>
          ) : null}
          {state.status === "limited" ? (
            <Notice key="limited">
              We&rsquo;ve had several enquiries from you in a short time. Please wait a few minutes
              before sending another, or email us at{" "}
              <a href={mailto} className="font-semibold text-primary underline-offset-4 hover:underline">
                {site.email}
              </a>
              .
            </Notice>
          ) : null}
        </AnimatePresence>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs text-xs text-pretty text-muted-foreground">
          <span className="text-primary">*</span> Required. Your information is only used to
          respond to your enquiry. See our{" "}
          <Link href="/privacy" className="underline underline-offset-2 hover:text-primary">
            Privacy Policy
          </Link>
          .
        </p>
        <Button
          type="submit"
          disabled={pending}
          aria-disabled={pending}
          className="group/send pricing-sheen relative h-13 shrink-0 overflow-hidden rounded-full bg-gradient-to-r from-brand-to to-brand-from pr-2 pl-7 text-base shadow-lg shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/40 focus-visible:ring-4 focus-visible:ring-primary/30 disabled:translate-y-0 disabled:opacity-80"
        >
          {pending ? "Sending…" : "Send your enquiry"}
          <span className="ml-2 grid size-9 place-items-center rounded-full bg-primary-foreground text-primary transition-transform duration-300 group-hover/send:translate-x-0.5 group-hover/send:-rotate-45">
            {pending ? (
              <LoaderCircle className="size-4 animate-spin" aria-hidden />
            ) : (
              <ArrowRight className="size-4" aria-hidden />
            )}
          </span>
        </Button>
      </div>
    </form>
  );
}

const labelClass =
  "font-mono text-[11px] font-medium tracking-[0.18em] text-muted-foreground uppercase";

function Required() {
  return (
    <span aria-hidden className="ml-0.5 text-primary">
      *
    </span>
  );
}

function Field({
  id,
  label,
  required,
  optional,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <Label htmlFor={id} className={labelClass}>
        {label}
        {required ? <Required /> : null}
        {optional ? <span className="sr-only"> (optional)</span> : null}
      </Label>
      <div className="mt-1">{children}</div>
      <FieldError id={id} error={error} />
    </div>
  );
}

function FieldError({ id, error }: { id: string; error?: string }) {
  return (
    <AnimatePresence initial={false}>
      {error ? (
        <motion.p
          id={`${id}-error`}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease }}
          className="mt-1.5 flex items-center gap-1.5 text-xs text-destructive"
        >
          <CircleAlert className="size-3.5 shrink-0" aria-hidden />
          {error}
        </motion.p>
      ) : null}
    </AnimatePresence>
  );
}

function Notice({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.35, ease }}
      className="overflow-hidden"
    >
      <div className="mt-4 flex flex-col rounded-2xl border border-primary/20 bg-accent/60 p-4 text-sm text-pretty text-foreground/85">
        {children}
      </div>
    </motion.div>
  );
}

/** Shown in place of the form once the enquiry is on its way. */
function Sent({ name, email, onReset }: { name: string; email: string; onReset: () => void }) {
  const first = name.split(/\s+/)[0];

  return (
    <motion.div
      role="status"
      aria-live="polite"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease }}
      className="flex min-h-[28rem] flex-col items-center justify-center py-8 text-center"
    >
      <span className="relative grid size-20 place-items-center">
        <motion.span
          className="absolute inset-0 rounded-full bg-primary/15"
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: [0.4, 1.25, 1], opacity: 1 }}
          transition={{ duration: 0.8, ease }}
        />
        <motion.span
          className="relative grid size-14 place-items-center rounded-full bg-gradient-to-br from-brand-to to-brand-from text-primary-foreground shadow-lg shadow-primary/30"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.15 }}
        >
          <Check className="size-7" strokeWidth={3} aria-hidden />
        </motion.span>
      </span>
      <h3 className="mt-7 text-2xl font-semibold tracking-tight">
        {first ? `Thanks, ${first}.` : "Thanks."} Your enquiry is with our team.
      </h3>
      <p className="mt-3 max-w-sm text-pretty text-muted-foreground">
        {email ? (
          <>
            We&rsquo;ll reply to <span className="font-medium text-foreground">{email}</span> as
            soon as we can.
          </>
        ) : (
          "We'll get back to you as soon as we can."
        )}
      </p>
      <Button variant="outline" onClick={onReset} className="mt-8 rounded-full px-5">
        <RotateCcw aria-hidden />
        Send another enquiry
      </Button>
    </motion.div>
  );
}
