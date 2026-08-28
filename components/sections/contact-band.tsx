"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Mail, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";

/**
 * Closing CTA on the field colour. Only display-scale type and white chips sit
 * on the pink here — body-size white text would not clear AA against #E62E5C.
 *
 * Phone and email are the published SipLink details. The CTA points at email
 * because there is no demo-booking or trial signup flow to link to yet.
 */
export function ContactBand() {
  const reduce = useReducedMotion();

  return (
    <section id="contact" className="relative overflow-hidden bg-primary">
      <div className="mx-auto w-full max-w-5xl px-5 py-24 text-center sm:px-8 sm:py-32">
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 28 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-display text-[clamp(2.5rem,8vw,6rem)] text-primary-foreground">
            Ready when
            <br />
            you are.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-2xl leading-snug text-primary-foreground">
            Tell us how your team communicates today and we will map it onto
            SipLink.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button asChild variant="brand" size="xl">
              <a href="mailto:support@siplink.in?subject=SipLink%20demo%20request">
                Schedule a demo
                <ArrowUpRight data-icon="inline-end" />
              </a>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-2.5">
            <a
              href="tel:+918217202075"
              className="flex items-center gap-2 rounded-full bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-opacity hover:opacity-85"
            >
              <Phone className="size-4 text-brand-deep" />
              082172 02075
            </a>
            <a
              href="mailto:support@siplink.in"
              className="flex items-center gap-2 rounded-full bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-opacity hover:opacity-85"
            >
              <Mail className="size-4 text-brand-deep" />
              support@siplink.in
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
