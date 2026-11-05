import type { CSSProperties } from "react";
import {
  BadgeCheck,
  ChartColumn,
  Cloud,
  Globe,
  Headset,
  LayoutDashboard,
  PhoneCall,
  Send,
  Settings,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { CallPhone } from "@/components/site/call-phone";
import { ContactForm } from "@/components/site/contact-form";
import { RevealGroup } from "@/components/site/reveal-group";
import { reviewStats } from "@/lib/site";

const BENEFITS: { label: string; icon: LucideIcon }[] = [
  { label: "Global connectivity", icon: Globe },
  { label: "Reliable performance", icon: Zap },
  { label: "Dedicated support", icon: Users },
];

/**
 * Trust figures under the panel. Only what lib/site.ts stands behind: no
 * customer count or uptime figure until they are verified (see the note on
 * `certifications` there).
 */
const TRUST: { value: string; label: string; icon: LucideIcon }[] = [
  ...reviewStats,
  { value: "DoT-licensed", label: "Category A ISP", icon: BadgeCheck },
];

/** Bars on the laptop's chart, as a share of its height. */
const ACTIVITY = [0.5, 0.75, 0.45, 0.9, 0.6, 1, 0.7, 0.85, 0.55];

/** Sample lines on the laptop's dashboard. An illustration, not real calls. */
const RECENT_CALLS = [
  { team: "Customer Support", time: "02:14" },
  { team: "Sales Team", time: "01:32" },
  { team: "Marketing", time: "03:27" },
];

/**
 * The enquiry panel: the brand side with the invitation and a laptop and phone
 * on a call, and the form set into it on a white card, with the trust figures
 * beneath. On a phone the invitation comes first and the devices are left out,
 * to keep the way to the form short.
 */
export function ContactEnquiry() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* A blush ground with a faint grid and two soft lights behind it. */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-accent via-accent/40 to-background" />
        <div className="pricing-grid absolute inset-x-0 top-0 h-[50rem]" />
        <div className="pricing-drift absolute -top-40 -left-32 size-[34rem] rounded-full bg-brand-from/20 blur-3xl" />
        <div className="pricing-drift absolute top-1/2 -right-40 size-[30rem] rounded-full bg-primary/10 blur-3xl [--drift-delay:-8s]" />
      </div>

      <div className="mx-auto max-w-[84rem] px-3 pt-6 pb-16 sm:px-6 sm:pt-8 lg:px-8 lg:pb-20">
        <RevealGroup>
          <div className="reveal-item relative">
            <span
              aria-hidden
              className="pricing-halo pointer-events-none absolute -inset-2 -z-10 rounded-[3rem] bg-gradient-to-b from-brand-from/40 via-primary/15 to-transparent blur-2xl sm:-inset-4"
            />
            <div className="pricing-featured-border pricing-elevate rounded-[2.35rem] p-[1.5px]">
              <div className="relative grid overflow-hidden rounded-[2.25rem] bg-gradient-to-b from-brand-to via-primary to-accent lg:grid-cols-[minmax(0,1.02fr)_minmax(0,1fr)]">
                <span aria-hidden className="pricing-dots pointer-events-none absolute inset-0 text-primary-foreground/15" />
                <span aria-hidden className="pricing-band-sheen pointer-events-none absolute inset-0" />
                <span aria-hidden className="pointer-events-none absolute -top-24 left-1/4 size-96 rounded-full bg-primary-foreground/15 blur-3xl" />

                <BrandSide />

                <div className="relative p-2 sm:p-3 lg:p-0 lg:pt-20">
                  {/* The tag sits above the form, in the panel's corner. */}
                  <span className="absolute top-6 right-7 hidden items-center gap-1.5 rounded-full bg-primary-foreground px-3.5 py-1.5 font-mono text-[11px] font-semibold tracking-widest text-primary uppercase shadow-md shadow-primary/30 lg:inline-flex">
                    <Send className="size-3.5" aria-hidden />
                    Enquiry
                  </span>

                  <div className="relative h-full rounded-[1.9rem] bg-card p-5 shadow-2xl shadow-primary/20 sm:p-7 lg:rounded-t-[2rem] lg:rounded-b-none lg:rounded-bl-[2rem]">
                    <div className="text-center">
                      <h2 className="text-2xl font-semibold tracking-tight text-balance">
                        Tell us about your requirements
                      </h2>
                      <p className="mt-1 mb-5 text-sm text-muted-foreground">
                        Get a free demo and personalised quote.
                      </p>
                    </div>
                    <ContactForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealGroup>

        {/* Trust figures. */}
        <RevealGroup>
          <dl className="mt-6 grid grid-cols-2 gap-y-6 rounded-3xl border border-primary/10 bg-card/85 p-5 shadow-lg shadow-primary/5 backdrop-blur sm:p-6 lg:grid-cols-4 lg:divide-x lg:divide-border">
            {TRUST.map(({ value, label, icon: Icon }, i) => (
              <div
                key={value}
                className="reveal-item flex items-center gap-3 sm:gap-4 lg:justify-center lg:px-4"
                style={{ "--reveal-index": i + 1 } as CSSProperties}
              >
                <Icon className="size-8 shrink-0 text-primary sm:size-10" strokeWidth={1.5} aria-hidden />
                <div className="min-w-0">
                  <dd className="text-lg leading-tight font-semibold tracking-tight sm:text-xl">{value}</dd>
                  <dt className="mt-0.5 text-xs text-muted-foreground sm:text-sm">{label}</dt>
                </div>
              </div>
            ))}
          </dl>
        </RevealGroup>
      </div>
    </section>
  );
}

function BrandSide() {
  return (
    <div className="relative flex flex-col p-6 pb-8 text-primary-foreground sm:p-9 lg:p-11 lg:pb-8">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-2.5">
          <span aria-hidden className="flex h-6 items-end gap-1">
            {[0.45, 0.72, 1].map((height) => (
              <span key={height} className="w-1.5 rounded-full bg-primary-foreground" style={{ height: `${height * 100}%` }} />
            ))}
          </span>
          <span className="text-lg font-semibold tracking-[0.12em] uppercase">SipLink</span>
        </span>
        <span aria-hidden className="h-7 w-px bg-primary-foreground/30" />
        <span className="flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase">
          <Headset className="size-4.5" aria-hidden />
          Support 24/7
        </span>
      </div>

      <h1 className="mt-9 max-w-xl font-heading text-[clamp(2.25rem,4.1vw,3.75rem)] leading-[1.06] font-semibold tracking-[-0.03em] text-balance lg:mt-11">
        Let&rsquo;s build a better way to <span className="text-accent">connect.</span>
      </h1>
      <p className="mt-4 max-w-md text-base text-pretty text-primary-foreground/90 sm:text-lg">
        Tell us what your business needs. We&rsquo;ll help you find the right communication solution.
      </p>

      <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
        {BENEFITS.map(({ label, icon: Icon }) => (
          <li key={label} className="flex items-center gap-2.5 text-sm font-medium">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary-foreground/15 ring-1 ring-primary-foreground/35">
              <Icon className="size-4.5" aria-hidden />
            </span>
            <span className="max-w-20 leading-tight">{label}</span>
          </li>
        ))}
      </ul>

      {/* A glass cloud with a call in it, drifting at the panel's edge. */}
      <div
        aria-hidden
        className="pricing-bob pointer-events-none absolute top-[17.5rem] right-3 hidden xl:block"
        style={{ "--bob-duration": "7s", "--bob-x": "0px", "--bob-y": "-12px" } as CSSProperties}
      >
        <span className="relative grid size-32 place-items-center">
          <span className="pricing-ripple absolute inset-4 rounded-full bg-primary-foreground/20" />
          <Cloud className="absolute inset-0 size-32 text-primary-foreground/70 drop-shadow-[0_0_18px_var(--brand-from)]" strokeWidth={0.75} />
          <PhoneCall className="relative mt-2 size-8 text-primary-foreground" strokeWidth={2} />
        </span>
      </div>

      <Devices />
    </div>
  );
}

/** A laptop with the dashboard open, and the site's phone mid-call before it. */
function Devices() {
  return (
    <div aria-hidden className="relative hidden flex-1 items-center pt-10 sm:flex">
      <div className="relative mx-auto w-full max-w-xl pr-16 pb-2">
        <span className="absolute inset-x-6 -bottom-1 h-8 rounded-full bg-foreground/25 blur-xl" />

        <div
          className="pricing-bob relative"
          style={{ "--bob-duration": "9s", "--bob-x": "0px", "--bob-y": "-6px" } as CSSProperties}
        >
          <div style={{ perspective: 1400 }}>
            <div style={{ transform: "rotateY(10deg) rotateX(3deg)" }} className="origin-bottom">
              {/* The lid. */}
              <div className="rounded-t-2xl bg-foreground p-1.5 pb-2 shadow-2xl shadow-foreground/40">
                <div className="flex aspect-[16/10] overflow-hidden rounded-lg bg-card text-[8px] text-foreground">
                  <div className="flex w-[22%] flex-col gap-1 bg-foreground/95 p-2 text-background/75">
                    <span className="mb-1 flex items-center gap-1 text-[9px] font-semibold text-background">
                      <span className="flex h-2.5 items-end gap-px">
                        {[0.45, 0.72, 1].map((height) => (
                          <span key={height} className="w-0.5 rounded-full bg-background" style={{ height: `${height * 100}%` }} />
                        ))}
                      </span>
                      SipLink
                    </span>
                    {[
                      { label: "Dashboard", icon: LayoutDashboard, on: true },
                      { label: "Users", icon: Users },
                      { label: "Call logs", icon: PhoneCall },
                      { label: "Analytics", icon: ChartColumn },
                      { label: "Settings", icon: Settings },
                    ].map(({ label, icon: Icon, on }) => (
                      <span
                        key={label}
                        className={`flex items-center gap-1 rounded px-1 py-0.5 ${on ? "bg-primary text-primary-foreground" : ""}`}
                      >
                        <Icon className="size-2" />
                        {label}
                      </span>
                    ))}
                  </div>

                  <div className="grid min-w-0 flex-1 grid-cols-[1.5fr_1fr] grid-rows-[1.25fr_1fr] gap-1.5 bg-muted/60 p-2">
                    <div className="flex min-h-0 flex-col rounded-md bg-card p-1.5 shadow-sm">
                      <span className="font-semibold">Live activity</span>
                      <span className="mt-1 flex min-h-0 flex-1 items-end gap-1">
                        {ACTIVITY.map((height, i) => (
                          <span
                            key={i}
                            className="pricing-wave flex-1 origin-bottom rounded-t-sm bg-gradient-to-t from-brand-to to-brand-from"
                            style={
                              {
                                height: `${height * 100}%`,
                                "--wave-delay": `${-i * 0.4}s`,
                                "--wave-duration": `${2.2 + (i % 3) * 0.5}s`,
                              } as CSSProperties
                            }
                          />
                        ))}
                      </span>
                    </div>
                    <div className="rounded-md bg-card p-1.5 shadow-sm">
                      <span className="font-semibold">Active calls</span>
                      <span className="mt-1 flex items-center gap-1 text-base leading-none font-semibold">
                        <span className="relative flex size-1.5">
                          <span className="pricing-ping absolute inset-0 rounded-full bg-success" />
                          <span className="relative size-1.5 rounded-full bg-success" />
                        </span>
                        24
                      </span>
                      <svg viewBox="0 0 60 18" className="mt-1.5 w-full text-primary" fill="none">
                        <path d="M0 14 L10 9 L20 12 L30 4 L40 9 L50 3 L60 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="col-span-2 rounded-md bg-card p-1.5 shadow-sm">
                      <span className="font-semibold">Recent calls</span>
                      <ul className="mt-0.5">
                        {RECENT_CALLS.map(({ team, time }) => (
                          <li key={team} className="flex items-center justify-between gap-1 py-0.5 text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <span className="size-2 rounded-full bg-accent ring-1 ring-primary/30" />
                              {team}
                            </span>
                            <span className="font-mono tabular-nums">{time}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* The base. */}
              <div className="relative -mx-3 h-3 rounded-b-xl bg-gradient-to-b from-muted to-muted-foreground/50 shadow-lg">
                <span className="absolute top-0 left-1/2 h-1 w-16 -translate-x-1/2 rounded-b-md bg-muted-foreground/40" />
              </div>
            </div>
          </div>
        </div>

        {/* CallPhone has a fixed width of its own, for the page it was built
            for, so here it is scaled as a whole rather than resized. */}
        <div
          className="pricing-bob pointer-events-none absolute right-0 -bottom-3"
          style={{ "--bob-duration": "6s", "--bob-delay": "-2s", "--bob-x": "0px", "--bob-y": "-10px" } as CSSProperties}
        >
          <div className="origin-bottom-right scale-[0.46] sm:scale-[0.44] xl:scale-[0.5]">
            <CallPhone />
          </div>
        </div>
      </div>
    </div>
  );
}
