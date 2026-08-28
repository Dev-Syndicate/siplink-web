"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PhoneMock } from "@/components/phone-mock";

/**
 * The reference's second hero: two-tone headline, and the product tilted in
 * from the right so the viewport edge crops it. `y` gives it a slow parallax
 * drift against the scroll.
 *
 * Store links are the live SipLink UC listings.
 */
export function MobileBand() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["7%", "-7%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-15, -7]);

  return (
    <section
      id="mobile"
      ref={ref}
      className="relative overflow-hidden bg-background py-20 sm:py-28"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-8">
        <div>
          <h2 className="text-display text-[clamp(2.5rem,8vw,6rem)]">
            <span className="text-foreground">Your work</span>
            <br />
            <span className="text-primary">goes where</span>
            <br />
            <span className="text-foreground">you go.</span>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            Take your extension, your queues and your call history with you.
            Softphone on the desktop, native apps on iOS and Android, and a
            browser client when you are on someone else&rsquo;s machine.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild variant="brand" size="xl">
              <a
                href="https://apps.apple.com/us/app/siplink-uc/id6751613434"
                target="_blank"
                rel="noopener noreferrer"
              >
                App Store
                <ArrowUpRight data-icon="inline-end" />
              </a>
            </Button>
            <Button asChild variant="brandOutline" size="xl">
              <a
                href="https://play.google.com/store/apps/details?id=in.siplink.one"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Play
                <ArrowUpRight data-icon="inline-end" />
              </a>
            </Button>
          </div>
        </div>

        {/* Cropped by the right edge, as the reference crops its bottle there.
            The container is taller than the device so the parallax drift never
            clips the screen's top edge. */}
        <div className="relative h-[28rem] sm:h-[34rem] lg:h-[42rem]">
          <div
            aria-hidden
            className="absolute top-1/2 left-1/2 size-[min(70vw,24rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-tint lg:left-[68%]"
          />
          <motion.div
            style={reduce ? undefined : { y, rotate }}
            className="absolute top-1/2 left-1/2 w-[min(52vw,14rem)] -translate-x-1/2 -translate-y-1/2 lg:left-[76%] lg:w-[min(22vw,16rem)]"
          >
            <PhoneMock screen="activity" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
