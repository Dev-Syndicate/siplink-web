"use client";

import { useState, type ReactNode } from "react";

import { ContactForm } from "@/components/site/contact-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

/**
 * Wraps a "Book a demo" button or /contact link so a click opens the enquiry
 * form here instead. The link still works for new-tab clicks and without JS.
 */
export function DemoDialog({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Capture runs before the link's own handler, so Next's Link sees the
          prevented default and stays put. Works on server-rendered children too. */}
      <span
        className="contents"
        onClickCapture={(event) => {
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
          event.preventDefault();
          setOpen(true);
        }}
      >
        {children}
      </span>
      {/* The card stays still and clips; only the inner column scrolls. It fills
          the card so nothing is cut at a seam, and hides its bar so none runs into
          the rounded corners. */}
      <DialogContent className="flex max-h-[calc(100dvh-2rem)] flex-col overflow-hidden rounded-[1.9rem] bg-popover/75 p-0 shadow-2xl shadow-primary/20 ring-primary/15 backdrop-blur-2xl sm:max-w-2xl">
        {/* Glass with a brand-pink wash that starts in the top-left corner and fades out. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-radial-[at_0%_0%] from-primary/25 via-primary/5 via-45% to-transparent to-75%"
        />
        <div className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain p-5 [scrollbar-width:none] sm:p-7 [&::-webkit-scrollbar]:hidden">
          <DialogHeader className="mb-5 text-center sm:text-center">
            <DialogTitle className="text-2xl font-semibold tracking-tight text-balance">
              Schedule a Meeting
            </DialogTitle>
            <DialogDescription>Get a free demo and personalised quote.</DialogDescription>
          </DialogHeader>
          <ContactForm askServices={false} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

/** Opens the demo dialog only when `demo` is set; otherwise the link behaves as normal. */
export function DemoLink({ demo, children }: { demo: boolean; children: ReactNode }) {
  return demo ? <DemoDialog>{children}</DemoDialog> : children;
}
