import {
  Headset,
  type LucideIcon,
  Mic,
  Phone,
  Puzzle,
  Waypoints,
} from "lucide-react";

/**
 * The real order a call moves through the platform, per the feature
 * catalogue in docs/siplink-documentation.md §4: SIP connectivity, then
 * call routing/IVR, then queues and contact-center handling, then recording
 * and reporting, then the CRM and business-application sync. This is a
 * documented pipeline rather than an invented one, which is what earns it a
 * path diagram instead of a card grid — the order itself is the fact.
 */
const STAGES: { label: string; detail: string; icon: LucideIcon }[] = [
  {
    label: "Call arrives",
    detail: "SIP trunk / DID",
    icon: Phone,
  },
  {
    label: "Routed",
    detail: "IVR, time & department rules",
    icon: Waypoints,
  },
  {
    label: "Handled",
    detail: "Queues, ring groups, agents",
    icon: Headset,
  },
  {
    label: "Recorded",
    detail: "CDR, call recording, analytics",
    icon: Mic,
  },
  {
    label: "Synced",
    detail: "CRM activity log, screen pop",
    icon: Puzzle,
  },
];

export function CapabilityPath() {
  return (
    <div>
      <ol
        aria-label="How a call moves through SipLink, in order"
        className="relative grid gap-8 sm:grid-cols-5 sm:gap-4"
      >
        {/* The rail. One continuous line on desktop, hidden on a phone where
            the steps stack and the gap between them already reads as a
            sequence. */}
        <div
          aria-hidden
          className="absolute top-6 right-[10%] left-[10%] hidden h-px bg-border sm:block"
        >
          <div
            className="trace-pulse absolute inset-0 h-0.5 -translate-y-px bg-primary"
            style={{ "--trace-duration": "4.8s" } as React.CSSProperties}
          />
        </div>

        {STAGES.map(({ label, detail, icon: Icon }, index) => (
          <li key={label} className="relative flex flex-col items-center text-center">
            <span className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border border-primary bg-background text-primary shadow-sm">
              <Icon className="size-5" aria-hidden />
              <span className="absolute -top-2 -right-2 flex size-5 items-center justify-center rounded-full bg-primary font-mono text-[10px] font-semibold text-primary-foreground">
                {index + 1}
              </span>
            </span>
            <h3 className="mt-3 text-sm font-semibold text-foreground">
              {label}
            </h3>
            <p className="mt-1 max-w-[12ch] text-xs text-pretty text-muted-foreground">
              {detail}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
