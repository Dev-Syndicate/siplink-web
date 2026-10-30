"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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

/**
 * No backend exists yet, so the form composes a mailto: rather than pretending
 * to submit. Replace with a server action once an endpoint is available.
 *
 * Labels are visually hidden and the placeholders carry the prompt, so the
 * card stays compact; screen readers still get a proper label per field.
 */
export function ContactForm() {
  const [industry, setIndustry] = useState("");

  return (
    <form
      action="mailto:support@siplink.in"
      method="post"
      encType="text/plain"
      className="space-y-4"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="first-name" className="sr-only">
            First name
          </Label>
          <Input
            id="first-name"
            name="first-name"
            autoComplete="given-name"
            placeholder="First name"
            className="h-11"
            required
          />
        </div>
        <div>
          <Label htmlFor="last-name" className="sr-only">
            Last name
          </Label>
          <Input
            id="last-name"
            name="last-name"
            autoComplete="family-name"
            placeholder="Last name"
            className="h-11"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="email" className="sr-only">
            Business email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Business email"
            className="h-11"
            required
          />
        </div>
        <div>
          <Label htmlFor="phone" className="sr-only">
            Phone number
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="Phone number"
            className="h-11"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="company" className="sr-only">
            Company
          </Label>
          <Input
            id="company"
            name="company"
            autoComplete="organization"
            placeholder="Company"
            className="h-11"
          />
        </div>
        <div>
          <Label htmlFor="seats" className="sr-only">
            Number of users
          </Label>
          <Input
            id="seats"
            name="seats"
            type="number"
            min={10}
            placeholder="# Users (10 minimum)"
            className="h-11"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="industry" className="sr-only">
          Industry
        </Label>
        <Select value={industry} onValueChange={setIndustry}>
          <SelectTrigger id="industry" className="h-11 w-full">
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

      <div>
        <Label htmlFor="message" className="sr-only">
          How can we help?
        </Label>
        <Textarea
          id="message"
          name="message"
          rows={3}
          placeholder="How can we help?"
        />
      </div>

      <div className="flex items-start gap-3 pt-1">
        <Checkbox id="consent" name="consent" className="mt-0.5" required />
        <Label
          htmlFor="consent"
          className="block text-sm leading-snug font-normal text-muted-foreground"
        >
          I agree to be contacted by SipLink about my enquiry and understand
          their{" "}
          <Link href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
          .
        </Label>
      </div>

      <Button type="submit" size="lg" className="h-12 w-full rounded-full text-base">
        Request a demo
      </Button>
    </form>
  );
}
