"use client";

import { useSyncExternalStore } from "react";
import { Clock } from "lucide-react";

function subscribe(onChange: () => void) {
  const timer = setInterval(onChange, 15_000);
  return () => clearInterval(timer);
}

/** The time where an office is. Blank until the browser can say, so it never mismatches the server's. */
export function OfficeClock({ timeZone, label }: { timeZone: string; label: string }) {
  const time = useSyncExternalStore(
    subscribe,
    () =>
      new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone }).format(new Date()),
    () => "--:--",
  );

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/15 px-2.5 py-1 text-xs font-medium tabular-nums ring-1 ring-primary-foreground/25 backdrop-blur-sm">
      <Clock className="size-3" aria-hidden />
      {time} {label}
    </span>
  );
}
