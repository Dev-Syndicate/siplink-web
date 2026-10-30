"use client";

import { ArrowRightLeft, CalendarCheck, Check, LifeBuoy, type LucideIcon } from "lucide-react";

import { ContactForm } from "@/components/site/contact-form";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/**
 * The contact desk: the visitor picks why they are writing, and the steps
 * beside the form, the submit label and the email subject follow that choice.
 */
const reasons: {
  id: string;
  label: string;
  icon: LucideIcon;
  heading: string;
  steps: string[];
  submit: string;
  subject: string;
}[] = [
  {
    id: "demo",
    label: "Book a demo",
    icon: CalendarCheck,
    heading: "See SipLink running for your team",
    steps: [
      "Tell us your team size and how you take calls today.",
      "We map it to a plan and show it working live.",
      "We port your existing numbers when you are ready.",
    ],
    submit: "Schedule a demo",
    subject: "Demo request",
  },
  {
    id: "support",
    label: "Get support",
    icon: LifeBuoy,
    heading: "Help for existing customers, 24/7",
    steps: [
      "Describe the issue and the number or extension affected.",
      "Our support team picks it up around the clock.",
      "We stay with it until your calls are running again.",
    ],
    submit: "Send to support",
    subject: "Support request",
  },
  {
    id: "porting",
    label: "Move my numbers",
    icon: ArrowRightLeft,
    heading: "Keep the numbers your customers know",
    steps: [
      "List the numbers you want to move and your current provider.",
      "We handle the porting paperwork with the carrier.",
      "Your numbers switch over to SipLink without a new directory.",
    ],
    submit: "Start my port",
    subject: "Number porting request",
  },
];

export function ContactDesk() {
  return (
    <Tabs defaultValue="demo" className="gap-8">
      <TabsList className="mx-auto grid h-auto! w-full grid-cols-1 rounded-3xl bg-card/80 sm:inline-flex sm:w-fit sm:rounded-full p-1.5 shadow-sm ring-1 ring-border/70 backdrop-blur">
        {reasons.map(({ id, label, icon: Icon }) => (
          <TabsTrigger
            key={id}
            value={id}
            className="h-10 gap-2 rounded-full px-5 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Icon className="size-4" aria-hidden />
            {label}
          </TabsTrigger>
        ))}
      </TabsList>

      {reasons.map((reason) => (
        <TabsContent key={reason.id} value={reason.id}>
          <Card className="overflow-hidden rounded-3xl border-primary/15 py-0 shadow-2xl shadow-primary/10">
            <CardContent className="grid p-0 lg:grid-cols-12">
              <div className="bg-accent/50 p-8 lg:col-span-5 lg:p-10">
                <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
                  {reason.heading}
                </h2>
                <ol className="mt-8 space-y-5">
                  {reason.steps.map((step) => (
                    <li key={step} className="flex gap-3 text-foreground">
                      <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Check className="size-3.5" aria-hidden />
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="p-8 lg:col-span-7 lg:p-10">
                <ContactForm submitLabel={reason.submit} subject={reason.subject} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
}
