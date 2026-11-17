"use client";

import type { ReactNode } from "react";

import { ContactForm } from "@/components/site/contact-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

/** Wraps a "Book a demo" button so it opens the enquiry form in place of going to /contact. */
export function DemoDialog({ children }: { children: ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      {/* The card stays still and clips; only the inner column scrolls, inset
          from the top and bottom so its thin bar never runs into the rounded corners. */}
      <DialogContent className="flex max-h-[calc(100dvh-2rem)] flex-col overflow-hidden rounded-[1.9rem] p-0 sm:max-w-2xl">
        <div className="my-5 min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 [scrollbar-color:var(--color-border)_transparent] [scrollbar-width:thin] sm:my-7 sm:px-7">
          <DialogHeader className="mb-5 text-center sm:text-center">
            <DialogTitle className="text-2xl font-semibold tracking-tight text-balance">
              Tell us about your requirements
            </DialogTitle>
            <DialogDescription>Get a free demo and personalised quote.</DialogDescription>
          </DialogHeader>
          <ContactForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
