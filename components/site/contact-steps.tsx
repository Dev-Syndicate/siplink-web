"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { industries } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * The demo request in two short steps: who you are, then what you need.
 * Both steps stay in one form (step one is only hidden), so the final
 * submit sends every field. Like ContactForm, it composes a mailto: until
 * a backend exists.
 */
export function ContactSteps() {
  const [step, setStep] = useState(1);
  const [industry, setIndustry] = useState("");
  const first = useRef<HTMLFieldSetElement>(null);

  const next = () => {
    const fields = first.current?.querySelectorAll("input") ?? [];
    for (const field of fields) if (!field.reportValidity()) return;
    setStep(2);
  };

  return (
    <form
      action={`mailto:support@siplink.in?subject=${encodeURIComponent("Demo request")}`}
      method="post"
      encType="text/plain"
    >
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold text-foreground">
          {step === 1 ? "About you" : "What you need"}
        </span>
        <span className="text-muted-foreground">Step {step} of 2</span>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-500"
          style={{ width: step === 1 ? "50%" : "100%" }}
        />
      </div>

      <fieldset ref={first} className={cn("mt-8 space-y-5", step !== 1 && "hidden")}>
        <legend className="sr-only">About you</legend>
        <div className="space-y-2">
          <Label htmlFor="email">Work email</Label>
          <Input id="email" name="email" type="email" autoComplete="email" placeholder="you@company.com" required />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" autoComplete="name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input id="company" name="company" autoComplete="organization" />
          </div>
        </div>
        <Button type="button" size="lg" className="w-full rounded-full" onClick={next}>
          Next
          <ArrowRight aria-hidden />
        </Button>
      </fieldset>

      <fieldset className={cn("mt-8 space-y-5", step !== 2 && "hidden")}>
        <legend className="sr-only">What you need</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="industry">Industry</Label>
            <Select value={industry} onValueChange={setIndustry}>
              <SelectTrigger id="industry" className="w-full">
                <SelectValue placeholder="Select an industry" />
              </SelectTrigger>
              <SelectContent>
                {industries.map((item) => (
                  <SelectItem key={item.title} value={item.title}>
                    {item.title}
                  </SelectItem>
                ))}
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            <input type="hidden" name="industry" value={industry} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="seats">Number of users</Label>
            <Input id="seats" name="seats" type="number" min={10} placeholder="10 minimum" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" type="tel" autoComplete="tel" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">How can we help?</Label>
          <Textarea id="message" name="message" rows={4} />
        </div>
        <div className="flex gap-3">
          <Button type="button" size="lg" variant="outline" className="rounded-full" onClick={() => setStep(1)}>
            <ArrowLeft aria-hidden />
            Back
          </Button>
          <Button type="submit" size="lg" className="flex-1 rounded-full">
            Schedule a demo
          </Button>
        </div>
      </fieldset>
    </form>
  );
}
