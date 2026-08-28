"use client";

import { useState } from "react";

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

/**
 * No backend exists yet, so the form composes a mailto: rather than pretending
 * to submit. Replace with a server action once an endpoint is available.
 */
export function ContactForm() {
  const [industry, setIndustry] = useState("");

  return (
    <form
      action="mailto:support@siplink.in"
      method="post"
      encType="text/plain"
      className="space-y-5"
    >
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

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">Work email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" type="tel" autoComplete="tel" />
        </div>
      </div>

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
          <Input
            id="seats"
            name="seats"
            type="number"
            min={10}
            placeholder="10 minimum"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">How can we help?</Label>
        <Textarea id="message" name="message" rows={5} />
      </div>

      <Button type="submit" size="lg">
        Schedule a demo
      </Button>
    </form>
  );
}
