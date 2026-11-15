import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCheck,
  CircleCheckBig,
  MessageSquareText,
  Ticket,
  UserCheck,
} from "lucide-react";

import { RevealGroup } from "@/components/site/reveal-group";
import { SocialIcon } from "@/components/site/social-icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Iphone } from "@/components/ui/iphone";

/** The support line on WhatsApp, as dialled and as written. */
const WHATSAPP = {
  href: "https://wa.me/918217202075",
  display: "+91 82172 02075",
} as const;

/**
 * The claims are the ones the site already makes about support: a named team
 * on WhatsApp at any hour, and one expert who owns the issue from the first
 * message until it is closed.
 */
const STEPS = [
  {
    title: "Message us on WhatsApp",
    body: "Describe the issue from any phone, at any hour.",
    icon: MessageSquareText,
  },
  {
    title: "Your ticket is opened",
    body: "A named expert picks it up and replies in the same chat.",
    icon: Ticket,
  },
  {
    title: "One expert until it’s closed",
    body: "The same person owns your issue from first message to fix.",
    icon: UserCheck,
  },
] as const;

/** An illustrative conversation for the phone, not a real customer's. */
const CHAT = [
  { from: "customer", text: "Hi, calls to our main number are going to voicemail since 10am.", time: "10:42" },
  { from: "system", text: "Support ticket opened" },
  { from: "support", text: "Thanks for flagging it. I’m your support engineer for this ticket and I’m checking your routing now.", time: "10:43" },
  { from: "support", text: "Found it: an after-hours rule was still active. It’s fixed, please try a test call.", time: "10:51" },
  { from: "customer", text: "Working now, thank you!", time: "10:52" },
  { from: "system", text: "Ticket resolved and closed" },
] as const;

export function WhatsAppSupport() {
  return (
    <section
      aria-labelledby="whatsapp-support-heading"
      className="relative isolate overflow-hidden border-y border-whatsapp/20 bg-gradient-to-br from-whatsapp/15 via-background to-whatsapp/10 text-foreground"
    >
      {/* Texture and light: a dot field, and a green glow behind the phone. */}
      <span
        aria-hidden
        className="pricing-dots pointer-events-none absolute inset-0 -z-10 text-whatsapp-strong/15"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-[-10%] -z-10 size-[40rem] -translate-y-1/2 rounded-full bg-whatsapp/20 blur-3xl"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-20 lg:px-10 lg:py-28">
        <div>
          <Badge className="h-auto gap-2 bg-background px-3 py-1 text-foreground shadow-sm ring-1 ring-whatsapp/40">
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-whatsapp motion-reduce:animate-none" />
              <span className="relative size-2 rounded-full bg-whatsapp" />
            </span>
            WhatsApp ticket support · 24/7
          </Badge>

          <h2
            id="whatsapp-support-heading"
            className="mt-5 text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl"
          >
            Raise a support ticket{" "}
            <span className="text-whatsapp-strong">right from WhatsApp.</span>
          </h2>
          <p className="mt-5 max-w-xl text-lg text-pretty text-muted-foreground">
            No portal to log in to and no queue to wait in. Send one message and a named
            SipLink expert takes it from there, at any hour of the day.
          </p>

          <ol className="mt-10 grid gap-6 sm:grid-cols-3 lg:max-w-2xl">
            {STEPS.map(({ title, body, icon: Icon }, index) => (
              <li key={title} className="relative">
                <span className="flex items-center gap-3">
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-background shadow-sm ring-1 ring-whatsapp/30">
                    <Icon aria-hidden className="size-5 text-whatsapp-strong" />
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    0{index + 1}
                  </span>
                </span>
                <h3 className="mt-4 font-semibold">{title}</h3>
                <p className="mt-1.5 text-sm text-pretty text-muted-foreground">{body}</p>
              </li>
            ))}
          </ol>

          {/* The number itself is a link, as is the button, so either opens the chat. */}
          <div className="mt-12 flex flex-col gap-6 rounded-3xl bg-background/80 p-6 shadow-sm ring-1 ring-whatsapp/30 backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:p-7 lg:max-w-2xl">
            <div>
              <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
                Chat with support
              </p>
              <a
                href={WHATSAPP.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 block font-mono text-3xl font-semibold tracking-tight whitespace-nowrap transition-colors hover:text-whatsapp-strong sm:text-4xl"
              >
                {WHATSAPP.display}
              </a>
            </div>
            <Button
              asChild
              size="lg"
              className="h-12 bg-whatsapp-strong px-6 text-base text-whatsapp-foreground shadow-lg shadow-whatsapp-strong/25 hover:bg-whatsapp-strong/90"
            >
              <a href={WHATSAPP.href} target="_blank" rel="noopener noreferrer">
                <SocialIcon label="WhatsApp" className="size-5" />
                Open WhatsApp
                <ArrowUpRight aria-hidden />
              </a>
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Prefer phone or email?{" "}
            <Link href="/contact" className="font-medium text-foreground underline-offset-4 hover:underline">
              See every way to reach us
            </Link>
          </p>
        </div>

        {/* The phone, with the big mark beside it (above it on small screens). Decorative:
            the steps beside it say the same thing in words. */}
        <div aria-hidden className="relative mx-auto w-[280px] sm:w-[310px]">
          <a
            href={WHATSAPP.href}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={-1}
            className="group relative z-10 mx-auto mb-12 grid size-32 place-items-center sm:size-40 xl:absolute xl:top-[26%] xl:-left-44 xl:mb-0"
          >
            <span className="pricing-ripple absolute inset-0 rounded-[2.5rem] bg-whatsapp/40" />
            <span
              className="pricing-ripple absolute inset-0 rounded-[2.5rem] bg-whatsapp/25"
              style={{ "--ripple-delay": "1.1s" } as React.CSSProperties}
            />
            <span className="relative grid size-full place-items-center rounded-[2.5rem] bg-whatsapp text-whatsapp-foreground shadow-2xl shadow-whatsapp-strong/30 ring-4 ring-background transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-6">
              <SocialIcon label="WhatsApp" className="size-[4.5rem] sm:size-24" />
            </span>
            <span className="absolute -top-1 -right-1 grid size-9 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground ring-4 ring-background">
              1
            </span>
          </a>

          <span className="absolute top-28 -right-8 z-10 hidden items-center gap-2 rounded-2xl bg-background px-3.5 py-2.5 text-sm font-medium text-foreground shadow-xl xl:flex">
            <CircleCheckBig className="size-4 text-whatsapp-strong" />
            Resolved in one chat
          </span>

          <Iphone className="relative drop-shadow-2xl">
            <div className="flex h-full flex-col bg-muted text-foreground">
              {/* WhatsApp-style chat header */}
              <div className="flex items-center gap-2.5 bg-whatsapp-strong px-4 pt-11 pb-3 text-whatsapp-foreground">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-background p-1.5">
                  <Image src="/siplink-logo.webp" alt="" width={300} height={135} sizes="36px" className="w-full object-contain" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold">SipLink Support</span>
                  <span className="block text-[11px] text-whatsapp-foreground/80">online</span>
                </span>
              </div>

              <RevealGroup className="flex flex-1 flex-col justify-end gap-2 px-3 pb-4">
                {CHAT.map((message, index) =>
                  message.from === "system" ? (
                    <span
                      key={message.text}
                      className="reveal-item mx-auto flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1 text-[10px] font-medium text-muted-foreground shadow-sm"
                      style={{ "--reveal-index": index * 2 } as React.CSSProperties}
                    >
                      <Ticket className="size-3 text-whatsapp-strong" />
                      {message.text}
                    </span>
                  ) : (
                    <span
                      key={message.text}
                      className={`reveal-item max-w-[85%] rounded-2xl px-3 py-2 text-[12px] leading-snug shadow-sm ${
                        message.from === "customer"
                          ? "self-end rounded-tr-sm bg-whatsapp/25"
                          : "self-start rounded-tl-sm bg-background"
                      }`}
                      style={{ "--reveal-index": index * 2 } as React.CSSProperties}
                    >
                      {message.text}
                      <span className="mt-0.5 flex items-center justify-end gap-1 text-[9px] text-muted-foreground">
                        {message.time}
                        {message.from === "customer" && <CheckCheck className="size-3 text-info" />}
                      </span>
                    </span>
                  ),
                )}
              </RevealGroup>
            </div>
          </Iphone>
        </div>
      </div>
    </section>
  );
}
