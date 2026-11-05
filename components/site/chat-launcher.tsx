"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { MessageCircleMore } from "lucide-react";

import { cn } from "@/lib/utils";

/** The parts of the tawk.to JavaScript API used here. It fills in the methods once loaded. */
type TawkApi = {
  onLoad?: () => void;
  onChatMaximized?: () => void;
  onChatMinimized?: () => void;
  onUnreadCountChanged?: (count: number) => void;
  hideWidget?: () => void;
  showWidget?: () => void;
  maximize?: () => void;
};

declare global {
  interface Window {
    Tawk_API?: TawkApi;
    Tawk_LoadStart?: Date;
  }
}

/**
 * The live chat's button. tawk.to's own bubble sits in an iframe and cannot be
 * restyled, so it stays hidden and this opens tawk.to's chat window instead,
 * then steps aside until the window is minimised. The button only appears once
 * tawk.to has loaded, so it can never be pressed with nothing behind it.
 */
export function ChatLauncher() {
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    const tawk = (window.Tawk_API ??= {});
    window.Tawk_LoadStart = new Date();
    tawk.onLoad = () => {
      tawk.hideWidget?.();
      setReady(true);
    };
    tawk.onChatMaximized = () => {
      setOpen(true);
      setUnread(0);
    };
    tawk.onChatMinimized = () => {
      tawk.hideWidget?.();
      setOpen(false);
    };
    tawk.onUnreadCountChanged = setUnread;
  }, []);

  const openChat = () => {
    window.Tawk_API?.showWidget?.();
    window.Tawk_API?.maximize?.();
    setOpen(true);
  };

  return (
    <>
      {/* Waits for an idle moment, so the handlers above are in place before it runs. */}
      <Script
        src="https://embed.tawk.to/5f86f9ada2eb1124c0bce350/1k6ed0su8"
        strategy="lazyOnload"
        crossOrigin="anonymous"
      />

      <div
        className={cn(
          "fixed right-5 bottom-5 z-50 transition-all duration-500 ease-out sm:right-6 sm:bottom-6 print:hidden",
          ready && !open ? "scale-100 opacity-100" : "invisible scale-50 opacity-0",
        )}
      >
        <button
          type="button"
          onClick={openChat}
          aria-label={unread ? `Ask anything: chat with our team, ${unread} unread` : "Ask anything: chat with our team"}
          className="group/chat relative block cursor-pointer rounded-full outline-none transition-transform duration-300 hover:-translate-y-0.5 focus-visible:-translate-y-0.5 active:scale-95"
        >
          {/* Rings going out from the resting button; they stop once it opens. */}
          <span aria-hidden className="absolute inset-0 transition-opacity duration-300 group-hover/chat:opacity-0 group-focus-visible/chat:opacity-0">
            <span className="pricing-ripple absolute inset-1 rounded-full bg-primary/30" />
            <span className="pricing-ripple absolute inset-1 rounded-full bg-brand-from/30 [--ripple-delay:1.1s]" />
          </span>

          {/* The border's light, blurred into a glow on the page. */}
          <span
            aria-hidden
            className="pricing-featured-border absolute -inset-1.5 rounded-full opacity-70 blur-lg transition-opacity duration-300 group-hover/chat:opacity-100 group-focus-visible/chat:opacity-100"
          />

          <span className="pricing-featured-border pricing-elevate relative block rounded-full p-0.5 group-focus-visible/chat:ring-2 group-focus-visible/chat:ring-ring group-focus-visible/chat:ring-offset-2">
            <span className="relative flex h-16 items-center overflow-hidden rounded-full bg-gradient-to-br from-brand-to via-primary to-brand-from text-primary-foreground">
              <span aria-hidden className="pricing-band-sheen pointer-events-none absolute inset-0" />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-3 top-0.5 h-1/2 rounded-full bg-gradient-to-b from-primary-foreground/30 to-transparent"
              />

              {/* Opens from nothing, pushing out to the left of the icon. */}
              <span className="relative block max-w-0 overflow-hidden transition-[max-width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/chat:max-w-60 group-focus-visible/chat:max-w-60">
                <span className="block w-max pr-1 pl-6 text-left opacity-0 transition-opacity delay-100 duration-300 group-hover/chat:opacity-100 group-focus-visible/chat:opacity-100">
                  <span className="block text-base leading-tight font-semibold tracking-tight">Ask anything</span>
                  <span className="block text-xs leading-tight text-primary-foreground/85">Chat with our team</span>
                </span>
              </span>

              <span className="relative grid size-16 shrink-0 place-items-center">
                <span className="grid size-11 place-items-center rounded-full bg-primary-foreground/15 ring-1 ring-primary-foreground/35 backdrop-blur-sm transition-transform duration-500 group-hover/chat:-rotate-12 group-hover/chat:scale-110 group-focus-visible/chat:scale-110">
                  <MessageCircleMore className="size-6" aria-hidden />
                </span>
              </span>
            </span>
          </span>

          {unread ? (
            <span
              aria-hidden
              className="absolute -top-1 -right-1 grid size-6 place-items-center rounded-full bg-card text-xs font-bold text-primary shadow-md shadow-primary/40 ring-2 ring-primary tabular-nums"
            >
              {unread > 9 ? "9+" : unread}
            </span>
          ) : null}
        </button>
      </div>
    </>
  );
}
