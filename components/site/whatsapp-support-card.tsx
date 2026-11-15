import { ArrowUpRight, MessageSquareText, Ticket, UserCheck } from "lucide-react";

import { SocialIcon } from "@/components/site/social-icons";
import { WHATSAPP } from "@/components/site/whatsapp-support";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const STEPS = [
  { label: "Message us", icon: MessageSquareText },
  { label: "Ticket opened", icon: Ticket },
  { label: "One expert till it’s closed", icon: UserCheck },
] as const;

/**
 * The compact form of the homepage's WhatsApp support section, for pages that
 * already have a heading of their own around it (the contact page's support
 * channels). Same number, same claims: a named team on WhatsApp at any hour,
 * one expert from first message to close.
 */
export function WhatsAppSupportCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative isolate grid items-center gap-8 overflow-hidden rounded-3xl border border-whatsapp/25 bg-gradient-to-br from-whatsapp/10 via-card to-card p-6 shadow-sm sm:p-8 md:grid-cols-[auto_minmax(0,1fr)] lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-10 lg:p-10 ${className}`}
    >
      <span
        aria-hidden
        className="pricing-dots pointer-events-none absolute inset-0 -z-10 text-whatsapp/20"
      />

      {/* The big mark, with a ripple going out as if a message just landed. */}
      <a
        href={WHATSAPP.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with SipLink support on WhatsApp, ${WHATSAPP.display}`}
        className="group relative mx-auto grid size-28 place-items-center sm:size-32"
      >
        <span aria-hidden className="pricing-ripple absolute inset-0 rounded-[2rem] bg-whatsapp/30" />
        <span
          aria-hidden
          className="pricing-ripple absolute inset-0 rounded-[2rem] bg-whatsapp/20"
          style={{ "--ripple-delay": "1.1s" } as React.CSSProperties}
        />
        <span className="relative grid size-full place-items-center rounded-[2rem] bg-whatsapp text-whatsapp-foreground shadow-lg shadow-whatsapp/30 transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3">
          <SocialIcon label="WhatsApp" className="size-16 sm:size-[4.5rem]" />
        </span>
        <span
          aria-hidden
          className="absolute -top-1.5 -right-1.5 grid size-7 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground ring-4 ring-card"
        >
          1
        </span>
      </a>

      <div className="text-center md:text-left">
        <Badge variant="outline" className="gap-1.5 bg-background">
          <span className="relative flex size-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-whatsapp motion-reduce:animate-none" />
            <span className="relative size-2 rounded-full bg-whatsapp" />
          </span>
          WhatsApp ticket support · 24/7
        </Badge>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
          Raise a support ticket on WhatsApp
        </h3>
        <p className="mt-2 max-w-xl text-pretty text-muted-foreground md:max-w-none lg:max-w-xl">
          Send one message and a named expert picks it up, at any hour, and owns your issue
          until it is closed.
        </p>
        <ol className="mt-5 flex flex-wrap justify-center gap-2 md:justify-start">
          {STEPS.map(({ label, icon: Icon }, index) => (
            <li
              key={label}
              className="flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium"
            >
              <span className="grid size-4 place-items-center rounded-full bg-whatsapp/15 font-mono text-[10px] text-whatsapp-strong">
                {index + 1}
              </span>
              <Icon aria-hidden className="size-3.5 text-muted-foreground" />
              {label}
            </li>
          ))}
        </ol>
      </div>

      {/* The number itself is the link, so tapping it opens the chat. */}
      <div className="flex flex-col items-center gap-3 md:col-span-2 lg:col-span-1 lg:items-end">
        <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
          Chat with support
        </span>
        <a
          href={WHATSAPP.href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-2xl font-semibold tracking-tight whitespace-nowrap transition-colors hover:text-whatsapp-strong sm:text-3xl"
        >
          {WHATSAPP.display}
        </a>
        <Button
          asChild
          size="lg"
          className="bg-whatsapp-strong text-whatsapp-foreground hover:bg-whatsapp-strong/90"
        >
          <a href={WHATSAPP.href} target="_blank" rel="noopener noreferrer">
            <SocialIcon label="WhatsApp" className="size-4" />
            Open WhatsApp
            <ArrowUpRight aria-hidden />
          </a>
        </Button>
      </div>
    </div>
  );
}
