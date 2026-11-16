"use client";

import type { ReactNode } from "react";

import { TAWK_CHAT_URL, openTawkChat } from "@/components/site/chat-launcher";

/**
 * A support channel card's link. The live chat link opens the site's tawk.to
 * window in place, and only goes to tawk.to's own chat page if the widget has
 * not loaded yet. External links open in a new tab.
 */
export function ChannelLink({ href, children }: { href: string; children: ReactNode }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      onClick={(event) => {
        if (href === TAWK_CHAT_URL && openTawkChat()) event.preventDefault();
      }}
      className="block h-full rounded-[1.9rem] outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      {children}
    </a>
  );
}
