import Image from "next/image";
import { Activity, Grid3x3, Headset, Phone, Users } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * The wide counterpart to PhoneMock — used for the one full-bleed moment where
 * a landscape panel reads better than a phone. Swap in a real portal capture
 * via `src`; the CSS version below is placeholder data only.
 */

const stats = [
  { label: "Active calls", value: "128" },
  { label: "In queue", value: "6" },
  { label: "Avg. wait", value: "0:12" },
  { label: "Answer rate", value: "94.2%" },
];

const agents = [
  { name: "Meera Iyer", queue: "Sales", state: "On call", dur: "6:02" },
  { name: "David Okafor", queue: "Support", state: "On call", dur: "2:41" },
  { name: "Priya Nair", queue: "Billing", state: "Available", dur: "—" },
  { name: "Sam Whitfield", queue: "Support", state: "Wrap-up", dur: "0:34" },
];

// Deterministic bars — no Math.random, so server and client markup match.
const bars = [38, 52, 44, 66, 58, 79, 71, 88, 64, 92, 76, 84];

export function DashboardMock({
  src,
  alt,
  className,
}: {
  src?: string;
  alt?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-background ring-1 ring-foreground/10 shadow-[0_50px_100px_-30px_rgb(18_20_23/0.5)]",
        className
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt ?? ""}
          fill
          sizes="(max-width: 768px) 92vw, 900px"
          className="object-cover"
        />
      ) : (
        <div className="flex h-full w-full">
          {/* Sidebar */}
          <div className="hidden w-[16%] shrink-0 flex-col gap-4 border-r border-border bg-muted/40 p-3 sm:flex">
            <div className="flex items-center gap-1.5">
              <div className="size-4 rounded-md bg-primary" />
              <div className="h-1.5 w-10 rounded-full bg-foreground/20" />
            </div>
            <div className="space-y-2.5">
              {[Activity, Phone, Users, Headset, Grid3x3].map((Icon, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <Icon
                    className={cn(
                      "size-3",
                      i === 0 ? "text-primary" : "text-muted-foreground"
                    )}
                  />
                  <div
                    className={cn(
                      "h-1.5 rounded-full",
                      i === 0 ? "w-9 bg-primary/30" : "w-8 bg-foreground/10"
                    )}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Main */}
          <div className="flex min-w-0 flex-1 flex-col p-3 sm:p-4">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold text-foreground sm:text-xs">
                  Live operations
                </p>
                <p className="text-[8px] text-muted-foreground sm:text-[9px]">
                  Real-time agent monitoring
                </p>
              </div>
              <span className="flex items-center gap-1 rounded-full bg-brand-tint px-2 py-0.5 text-[7px] font-semibold text-brand-deep sm:text-[8px]">
                <span className="size-1 rounded-full bg-primary" />
                LIVE
              </span>
            </div>

            {/* Stat tiles */}
            <div className="mb-3 grid grid-cols-4 gap-1.5 sm:gap-2">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-lg border border-border px-1.5 py-1.5 sm:px-2 sm:py-2"
                >
                  <p className="text-[6px] text-muted-foreground sm:text-[8px]">
                    {s.label}
                  </p>
                  <p className="text-[10px] font-semibold text-foreground sm:text-sm">
                    {s.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div className="mb-3 flex h-[26%] items-end gap-[3px] rounded-lg border border-border p-2">
              {bars.map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}%` }}
                  className={cn(
                    "flex-1 rounded-sm",
                    i > 8 ? "bg-primary" : "bg-primary/25"
                  )}
                />
              ))}
            </div>

            {/* Agent table */}
            <div className="min-h-0 flex-1 overflow-hidden rounded-lg border border-border">
              {agents.map((a, i) => (
                <div
                  key={a.name}
                  className={cn(
                    "flex items-center gap-2 px-2 py-1.5",
                    i !== agents.length - 1 && "border-b border-border"
                  )}
                >
                  <div className="size-4 shrink-0 rounded-full bg-muted" />
                  <p className="min-w-0 flex-1 truncate text-[7px] font-medium text-foreground sm:text-[9px]">
                    {a.name}
                  </p>
                  <p className="hidden text-[7px] text-muted-foreground sm:block sm:text-[9px]">
                    {a.queue}
                  </p>
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.5 text-[6px] font-medium sm:text-[8px]",
                      a.state === "On call"
                        ? "bg-brand-tint text-brand-deep"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {a.state}
                  </span>
                  <p className="w-6 text-right text-[7px] tabular-nums text-muted-foreground sm:text-[9px]">
                    {a.dur}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
