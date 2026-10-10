import {
  ArrowRightLeft,
  BadgeCheck,
  Headset,
  Network,
  ShieldCheck,
} from "lucide-react";

/**
 * Trust strip, directly under the hero.
 *
 * Only claims SipLink can officially verify belong here. Uptime figures,
 * customer counts and certifications are deliberately absent until the
 * client can substantiate them; add them as a new entry, not as copy.
 *
 * No cards: a hairline grid keeps five short claims reading as one
 * statement instead of five competing boxes.
 */
const trustPoints = [
  { label: "HIPAA-Aligned", icon: ShieldCheck },
  { label: "DoT Licensed", icon: BadgeCheck },
  { label: "Reliable Network", icon: Network },
  { label: "24/7 Support", icon: Headset },
  { label: "Number Porting", icon: ArrowRightLeft },
] as const;

export function TrustStrip() {
  return (
    <section
      aria-labelledby="trust-heading"
      className="border-b border-border bg-muted/30"
    >
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-12">
        <h2
          id="trust-heading"
          className="font-heading text-center text-xl font-semibold tracking-tight text-balance sm:text-2xl"
        >
          Trusted Communication Infrastructure for Growing Businesses
        </h2>

        <ul className="mt-8 grid grid-cols-2 gap-y-6 sm:grid-cols-3 lg:grid-cols-5 lg:gap-y-0 lg:divide-x lg:divide-border">
          {trustPoints.map(({ label, icon: Icon }) => (
            <li
              key={label}
              className="flex flex-col items-center gap-2.5 px-4 text-center last:col-span-2 sm:last:col-span-1"
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="size-5" aria-hidden />
              </span>
              <span className="text-sm font-medium">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
