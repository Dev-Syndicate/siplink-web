import Link from "next/link";
import { PhoneCall } from "lucide-react";

import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

/**
 * The closing ask, in one shape.
 *
 * The home page had this panel and every solution page had something else —
 * a dark plate on the use-case pages, a ringed white card on business size, a
 * dark full-width band on migration, and three of them just ran two buttons
 * under a heading with no panel at all. Six closing asks in six designs, on
 * pages a reader moves between freely.
 *
 * So the home panel is now the one implementation and the pages pass their
 * own words to it. Keeping it a component rather than a copied block is the
 * whole point: "same as the home page" stops being true the first time one of
 * the seven is edited on its own.
 *
 * The lit gradient is a bounded panel, never a section ground. A full-bleed
 * crimson band is a different thing and this is not licence for one.
 */
export function CtaPanel({
  eyebrow,
  heading,
  body,
  action = { label: "Book a demo", href: "/contact" },
  contactLabel = "Speak to our team",
}: {
  /** Two short phrases joined by a middle dot. */
  eyebrow: string;
  heading: string;
  body: string;
  /** The primary ask. Defaults to the same one the header carries. */
  action?: { label: string; href: string };
  /**
   * Wording on the phone button. The home page says "Speak to an architect",
   * which suits the enterprise-telephony pitch it closes but not a page about
   * small-business call handling, so it is a prop rather than a constant.
   */
  contactLabel?: string;
}) {
  return (
    <div className="relative isolate overflow-hidden rounded-2xl bg-gradient-to-br from-brand-to via-brand-to to-brand-from px-8 py-14 text-primary-foreground lg:px-14 lg:py-16">
      {/* Soft light falling from the top-right, so the flat gradient reads as
          a lit surface rather than a solid fill. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-24 -z-10 size-[520px] rounded-full bg-white/10 blur-3xl"
      />

      <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 font-mono text-[11px] font-semibold tracking-widest uppercase">
        <span className="size-1.5 rounded-full bg-current" aria-hidden />
        {eyebrow}
      </span>

      <h2 className="font-heading mt-6 max-w-xl text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
        {heading}
      </h2>

      <p className="mt-5 max-w-xl text-pretty text-primary-foreground/85 lg:text-lg">
        {body}
      </p>

      <div className="mt-9 flex flex-wrap gap-4">
        <Button
          asChild
          size="lg"
          className="w-full bg-background text-primary hover:bg-background/90 sm:w-auto"
        >
          <Link href={action.href}>{action.label}</Link>
        </Button>
        <Button
          asChild
          size="lg"
          variant="outline"
          className="h-auto w-full border-white/25 bg-white/10 py-3 text-primary-foreground hover:bg-white/20 hover:text-primary-foreground sm:w-auto sm:py-2 dark:border-white/25 dark:bg-white/10 dark:hover:bg-white/20"
        >
          <a href={`tel:${site.phone.replace(/\s/g, "")}`}>
            <PhoneCall className="shrink-0" aria-hidden />
            <span className="text-center text-balance whitespace-normal">
              {contactLabel} ({site.phone})
            </span>
          </a>
        </Button>
      </div>
    </div>
  );
}
