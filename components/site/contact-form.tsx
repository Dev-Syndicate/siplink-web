"use client";

import {
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type FormEvent,
  type ReactNode,
} from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import {
  Building2,
  Cable,
  Check,
  CircleAlert,
  Clock,
  Cloud,
  Ellipsis,
  Globe,
  Headset,
  LoaderCircle,
  Mail,
  MessageSquareMore,
  Phone,
  PhoneCall,
  RotateCcw,
  Send,
  Sparkles,
  User,
  Users,
  UsersRound,
  Wifi,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
  enquiryCountries,
  enquiryLimits,
  enquiryServices,
  enquiryText,
  enquiryUserCounts,
  validateEnquiry,
  type EnquiryFields,
} from "@/lib/contact";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

/** Public by design, and only able to send to support@siplink.in. Web3Forms rejects server-side calls on the free plan, so this runs in the browser. */
const WEB3FORMS_ACCESS_KEY = "05860680-81ce-4d6a-ade4-ad53d67c7b86";

/** Faster than this from opening the page to sending is not a person. */
const MIN_FILL_MS = 3000;

type EnquiryState =
  | { status: "idle" | "sending" | "failed" }
  | { status: "sent"; name: string; email: string };

/** Emails the enquiry to the team. `email` is also what a reply goes to. Empty optional fields are left out. */
async function sendEnquiry(fields: EnquiryFields): Promise<boolean> {
  const name = fields.name.trim();
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `Website enquiry: ${fields.services.join(", ")} — ${name}`,
      from_name: "SipLink website",
      name,
      email: fields.email.trim(),
      Company: fields.company.trim() || undefined,
      Phone: fields.phone.trim(),
      Country: fields.country,
      "Team size": fields.users || undefined,
      "Looking for": fields.services.join(", "),
      Message: fields.message.trim() || undefined,
    }),
    signal: AbortSignal.timeout(15_000),
  });
  // A refusal can still arrive as HTTP 200, so only `success` proves delivery.
  const result: { success?: boolean; message?: string } = await response.json();
  if (!result.success) console.error("Contact form: Web3Forms refused the enquiry", result.message);
  return result.success === true;
}

const EMPTY: EnquiryFields = {
  name: "",
  email: "",
  company: "",
  phone: "",
  country: "",
  users: "",
  services: [],
  message: "",
  consent: false,
};

/** The order fields are focused in when the form has problems. */
const ORDER: (keyof EnquiryFields)[] = ["name", "email", "company", "phone", "country", "users", "services", "message", "consent"];

const SERVICE_ICONS: Record<(typeof enquiryServices)[number], LucideIcon> = {
  "Business CloudPBX": Cloud,
  "USA Unlimited Calling": PhoneCall,
  "SIP Trunking": Cable,
  "International Numbers & Porting": Globe,
  "Contact Center Solutions": Headset,
  "AI Voice Assistant": Sparkles,
  "Voice, SMS & WhatsApp APIs": MessageSquareMore,
  "Microsoft Teams Integration": UsersRound,
  "Business Internet": Wifi,
  Other: Ellipsis,
};

/** The field style: a soft bordered box that lights brand pink on focus. */
const box =
  "h-12 w-full rounded-xl border-border bg-card pl-11 text-sm shadow-none transition-all duration-300 placeholder:text-muted-foreground hover:border-primary/40 focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/15 aria-invalid:border-destructive aria-invalid:ring-0 md:text-sm dark:bg-card";

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
  const [state, setState] = useState<EnquiryState>({ status: "idle" });
  const pending = state.status === "sending";
  const startedAt = useRef(0);
  const honeypot = useRef<HTMLInputElement>(null);
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  // Errors appear once someone has tried to send, then follow their edits.
  const errors = checked ? validateEnquiry(fields) : {};

  const set = <K extends keyof EnquiryFields>(key: K, value: EnquiryFields[K]) =>
    setFields((current) => ({ ...current, [key]: value }));

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pending) return;
    setChecked(true);

    const problems = validateEnquiry(fields);
    const first = ORDER.find((key) => problems[key]);
    if (first) {
      form.current?.querySelector<HTMLElement>(`[data-field="${first}"]`)?.focus();
      return;
    }

    // Bots fill the hidden field, or send faster than anyone types. Answer as
    // if it worked, so they learn nothing.
    if (honeypot.current?.value || Date.now() - startedAt.current < MIN_FILL_MS) {
      setState({ status: "sent", name: "", email: "" });
      return;
    }

    setState({ status: "sending" });
    try {
      const sent = await sendEnquiry(fields);
      setState(
        sent
          ? { status: "sent", name: fields.name.trim(), email: fields.email.trim() }
          : { status: "failed" },
      );
    } catch (error) {
      console.error("Contact form: delivery failed", error);
      setState({ status: "failed" });
    }
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

      <div className="grid gap-3.5 sm:grid-cols-2">
        <TextField
          id="name"
          label="Your full name"
          icon={User}
          error={errors.name}
          autoComplete="name"
          maxLength={enquiryLimits.name}
          value={fields.name}
          onChange={(e) => set("name", e.target.value)}
        />
        <TextField
          id="email"
          label="Email"
          icon={Mail}
          error={errors.email}
          type="email"
          inputMode="email"
          autoComplete="email"
          value={fields.email}
          onChange={(e) => set("email", e.target.value)}
        />
        <TextField
          id="company"
          label="Company name"
          optional
          icon={Building2}
          error={errors.company}
          autoComplete="organization"
          maxLength={enquiryLimits.company}
          value={fields.company}
          onChange={(e) => set("company", e.target.value)}
        />
        <TextField
          id="phone"
          label="Phone number"
          icon={Phone}
          error={errors.phone}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          maxLength={enquiryLimits.phone}
          value={fields.phone}
          onChange={(e) => set("phone", e.target.value)}
        />
        <SelectField
          id="country"
          label="Country"
          icon={Globe}
          error={errors.country}
          value={fields.country}
          options={enquiryCountries}
          onChange={(value) => set("country", value)}
        />
        <SelectField
          id="users"
          label="Number of users"
          optional
          icon={Users}
          error={errors.users}
          value={fields.users}
          options={enquiryUserCounts}
          onChange={(value) => set("users", value)}
        />
      </div>

      {/* What they're looking for: as many as apply. */}
      <fieldset className="mt-6" aria-describedby={errors.services ? "services-error" : undefined}>
        <div className="flex items-center gap-3">
          <legend className="float-left text-sm font-semibold whitespace-nowrap">
            What are you looking for?
            <span aria-hidden className="ml-0.5 text-primary">*</span>
          </legend>
          <span aria-hidden className="h-px flex-1 bg-border" />
        </div>
        <ToggleGroup
          type="multiple"
          variant="outline"
          spacing={2}
          value={fields.services}
          onValueChange={(value) => set("services", value)}
          aria-label="What are you looking for?"
          className="mt-3 grid w-full grid-cols-2 gap-2.5 sm:grid-cols-3"
        >
          {enquiryServices.map((service, i) => {
            const Icon = SERVICE_ICONS[service];
            const on = fields.services.includes(service);
            return (
              <ToggleGroupItem
                key={service}
                value={service}
                data-field={i === 0 ? "services" : undefined}
                aria-invalid={Boolean(errors.services)}
                className={cn(
                  "group/service relative h-auto min-h-16 w-full justify-start gap-2.5 rounded-2xl border-border bg-card px-3 py-2.5 text-left text-xs font-medium whitespace-normal text-foreground/85 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-accent/40 hover:text-foreground hover:shadow-md hover:shadow-primary/10 aria-invalid:border-destructive/50 data-[state=on]:border-primary/60 data-[state=on]:bg-accent data-[state=on]:text-foreground data-[state=on]:shadow-md data-[state=on]:shadow-primary/15",
                  service === "Other" && "sm:col-span-3 sm:min-h-12",
                )}
              >
                <Icon
                  className={cn(
                    "size-5! shrink-0 transition-transform duration-300 group-hover/service:scale-110",
                    on ? "text-primary" : "text-foreground/70",
                  )}
                  strokeWidth={1.75}
                  aria-hidden
                />
                <span className="min-w-0 leading-snug text-pretty">{service}</span>
                <AnimatePresence initial={false}>
                  {on ? (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 26 }}
                      className="absolute -top-1.5 -right-1.5 grid size-5 place-items-center rounded-full bg-gradient-to-br from-brand-to to-brand-from text-primary-foreground shadow-sm shadow-primary/40"
                    >
                      <Check className="size-3!" strokeWidth={3} aria-hidden />
                    </motion.span>
                  ) : null}
                </AnimatePresence>
              </ToggleGroupItem>
            );
          })}
        </ToggleGroup>
        <FieldError id="services" error={errors.services} />
      </fieldset>

      <div className="mt-5">
        <Label htmlFor="message" className="text-sm font-semibold">
          Additional requirements
        </Label>
        <Textarea
          id="message"
          data-field="message"
          rows={3}
          maxLength={enquiryLimits.message}
          placeholder="Tell us more about your requirements..."
          value={fields.message}
          onChange={(e) => set("message", e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={cn(box, "mt-2 field-sizing-fixed h-auto min-h-24 resize-y pl-4 leading-relaxed")}
        />
        <FieldError id="message" error={errors.message} />
      </div>

      <div className="mt-4 flex items-start gap-3">
        <Checkbox
          id="consent"
          data-field="consent"
          checked={fields.consent}
          onCheckedChange={(value) => set("consent", value === true)}
          aria-invalid={Boolean(errors.consent)}
          aria-describedby={errors.consent ? "consent-error" : undefined}
          className="mt-0.5 size-5 rounded-md border-primary/30 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
        />
        <Label htmlFor="consent" className="block text-sm leading-snug font-normal text-foreground/80">
          I agree to receive communication from SipLink about this enquiry and understand its{" "}
          <Link href="/privacy" className="font-semibold text-primary underline-offset-2 hover:underline">
            Privacy Policy
          </Link>
          .<span aria-hidden className="ml-0.5 text-primary">*</span>
        </Label>
      </div>
      <FieldError id="consent" error={errors.consent} />

      {/* Status: problems sending, read out as they appear. */}
      <div id="enquiry-status" role="status" aria-live="polite">
        <AnimatePresence initial={false}>
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
        </AnimatePresence>
      </div>

      <Button
        type="submit"
        disabled={pending}
        aria-disabled={pending}
        className="pricing-sheen group/send relative mt-5 h-13 w-full overflow-hidden rounded-full border-0 bg-gradient-to-r from-brand-to to-brand-from text-base shadow-lg shadow-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 focus-visible:ring-4 focus-visible:ring-primary/30 disabled:translate-y-0 disabled:opacity-80"
      >
        {pending ? (
          <LoaderCircle className="size-5! animate-spin" aria-hidden />
        ) : (
          <Send className="size-5! transition-transform duration-300 group-hover/send:translate-x-0.5 group-hover/send:-translate-y-0.5" aria-hidden />
        )}
        {pending ? "Sending…" : "Submit enquiry"}
      </Button>

      <p className="mt-3 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
        <Clock className="size-3.5 shrink-0" aria-hidden />
        Our team will review your requirements and get back to you shortly.
      </p>
    </form>
  );
}

function TextField({
  id,
  label,
  optional,
  icon: Icon,
  error,
  ...input
}: {
  id: string;
  label: string;
  optional?: boolean;
  icon: LucideIcon;
  error?: string;
} & ComponentProps<typeof Input>) {
  return (
    <div>
      <div className="group/field relative">
        <Label htmlFor={id} className="sr-only">
          {label} ({optional ? "optional" : "required"})
        </Label>
        <Icon
          className="pointer-events-none absolute top-1/2 left-3.5 z-10 size-4.5 -translate-y-1/2 text-foreground/60 transition-colors duration-300 group-focus-within/field:text-primary"
          strokeWidth={1.75}
          aria-hidden
        />
        <Input
          id={id}
          data-field={id}
          placeholder={optional ? `${label} (optional)` : `${label} *`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={box}
          {...input}
        />
      </div>
      <FieldError id={id} error={error} />
    </div>
  );
}

function SelectField({
  id,
  label,
  optional,
  icon: Icon,
  error,
  value,
  options,
  onChange,
}: {
  id: string;
  label: string;
  optional?: boolean;
  icon: LucideIcon;
  error?: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <div className="group/field relative">
        <Label htmlFor={id} className="sr-only">
          {label} ({optional ? "optional" : "required"})
        </Label>
        <Icon
          className="pointer-events-none absolute top-1/2 left-3.5 z-10 size-4.5 -translate-y-1/2 text-foreground/60 transition-colors duration-300 group-focus-within/field:text-primary"
          strokeWidth={1.75}
          aria-hidden
        />
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger
            id={id}
            data-field={id}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${id}-error` : undefined}
            className={cn(box, "h-12! data-placeholder:text-muted-foreground")}
          >
            <SelectValue placeholder={optional ? `${label} (optional)` : `${label} *`} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
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
