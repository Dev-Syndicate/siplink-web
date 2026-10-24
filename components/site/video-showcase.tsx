import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

import { AutoplayVideo } from "@/components/site/autoplay-video";
import { Button } from "@/components/ui/button";
import { companyVideo } from "@/lib/site";

/**
 * The company film as a warm, inset panel: a short pitch and the two next
 * steps on one side, the video in a frosted frame on the other. The panel
 * runs wider than the page's usual column and the video takes most of it,
 * so the film is the thing you see.
 *
 * The video plays on its own, muted and looping, with no YouTube player
 * chrome and a single sound button in its corner.
 */
export function VideoShowcase() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-[112rem] px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-accent via-background to-primary/15 ring-1 ring-primary/10">
          {/* Two soft washes of brand pink, behind everything. */}
          <span
            aria-hidden
            className="pointer-events-none absolute -top-32 -right-24 -z-10 size-[28rem] rounded-full bg-brand-from/25 blur-3xl"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-40 -left-24 -z-10 size-96 rounded-full bg-primary/10 blur-3xl"
          />

          <div className="grid items-center gap-12 p-6 sm:p-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.5fr)] lg:gap-14 lg:p-16 xl:py-24 2xl:px-20">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card/70 px-3 py-1.5 text-xs font-medium text-primary">
                <Play className="size-3 fill-current" aria-hidden />
                Watch The Film
              </span>

              <h2 className="font-heading mt-6 text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-[2.75rem] xl:text-5xl">
                Your Trusted VoIP Partner, On Every Call
              </h2>

              <p className="mt-6 max-w-lg text-lg leading-relaxed text-pretty text-muted-foreground">
                Hosted PBX, SIP trunking, call centre and unified
                communications on one platform, with AI on the line and real
                engineers behind it. See how SipLink fits together.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Button asChild size="lg" className="group rounded-full">
                  <Link href="/pricing">
                    See Pricing
                    <ArrowRight
                      className="transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden
                    />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-foreground/15 bg-transparent hover:bg-card"
                >
                  <Link href="/contact">Book A Demo</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[1.8rem] border border-card/80 bg-card/45 p-2.5 shadow-2xl shadow-primary/20 backdrop-blur-sm">
                <AutoplayVideo video={companyVideo} className="rounded-[1.3rem]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
