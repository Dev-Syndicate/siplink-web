import Link from "next/link";
import { type LucideIcon } from "lucide-react";

/**
 * One hub, four spokes — the same grammar as the homepage's integration
 * wall, because the claim is the same shape: SipLink does not have a
 * separate blog archive yet, so every topic a reader comes here for
 * actually resolves on a real page elsewhere on the site. The wire is
 * honest about that instead of papering over it with invented articles.
 */
export type RouterTopic = {
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  icon: LucideIcon;
};

const NODES_LEFT_X = 60;
const NODES_RIGHT_X = 840;
const ROWS = [70, 300] as const;
const VIEW = { w: 900, h: 400 } as const;

const pct = (value: number, of: number) => `${(value / of) * 100}%`;

export function TopicRouter({ topics }: { topics: RouterTopic[] }) {
  const cx = VIEW.w / 2;
  const cy = VIEW.h / 2;

  const positioned = topics.slice(0, 4).map((topic, index) => ({
    ...topic,
    x: index < 2 ? NODES_LEFT_X : NODES_RIGHT_X,
    y: ROWS[index % 2],
  }));

  return (
    <div>
      <div aria-hidden className="relative mx-auto hidden w-full max-w-4xl md:block">
        <svg
          viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
          role="presentation"
          className="block h-auto w-full"
        >
          <defs>
            <radialGradient id="topic-halo">
              <stop
                offset="0"
                className="text-primary"
                stopColor="currentColor"
                stopOpacity="0.4"
              />
              <stop
                offset="1"
                className="text-primary"
                stopColor="currentColor"
                stopOpacity="0"
              />
            </radialGradient>
          </defs>

          <ellipse cx={cx} cy={cy} rx="140" ry="90" fill="url(#topic-halo)" />

          {positioned.map((node, index) => {
            const toRight = node.x > cx;
            const midX = toRight ? node.x - 160 : node.x + 160;
            const d = `M ${node.x} ${node.y} H ${midX} Q ${cx + (toRight ? 60 : -60)} ${node.y} ${cx + (toRight ? 30 : -30)} ${cy + (node.y < cy ? 30 : -30)} T ${cx} ${cy}`;

            return (
              <g key={node.title}>
                <path d={d} fill="none" strokeWidth="1.5" className="stroke-border" />
                <path
                  d={d}
                  fill="none"
                  pathLength="100"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="trace-pulse stroke-primary"
                  style={
                    {
                      "--trace-duration": "4s",
                      "--trace-delay": `${index * -1}s`,
                    } as React.CSSProperties
                  }
                />
              </g>
            );
          })}
        </svg>

        <div className="absolute inset-0">
          <div
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-2xl border border-primary bg-primary px-5 py-4 text-primary-foreground shadow-lg"
            style={{ left: pct(cx, VIEW.w), top: pct(cy, VIEW.h) }}
          >
            <span className="text-sm font-semibold">News & Insights</span>
            <span className="text-[10px] opacity-80">You are here</span>
          </div>

          {positioned.map((node) => {
            const Icon = node.icon;
            return (
              <Link
                key={node.title}
                href={node.href}
                className="group absolute flex w-48 -translate-y-1/2 items-center gap-3 rounded-xl border border-border bg-card p-3 shadow-sm transition-all hover:-translate-y-[calc(50%+2px)] hover:border-primary/50 hover:shadow-md"
                style={{
                  left: pct(node.x, VIEW.w),
                  top: pct(node.y, VIEW.h),
                  transform:
                    node.x > cx
                      ? "translate(-100%, -50%)"
                      : "translateY(-50%)",
                }}
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-4.5" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-foreground">
                    {node.title}
                  </span>
                  <span className="block text-xs text-primary group-hover:underline">
                    {node.linkLabel}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Phone: the diagram collapses to a plain routed list — the wiring
          reads as clutter at this width, the destinations do not. */}
      <ul className="grid gap-4 md:hidden">
        {topics.map((topic) => {
          const Icon = topic.icon;
          return (
            <li key={topic.title}>
              <Link
                href={topic.href}
                className="flex items-start gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-foreground">
                    {topic.title}
                  </span>
                  <span className="mt-0.5 block text-xs text-pretty text-muted-foreground">
                    {topic.description}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* The descriptions, for a screen reader and for anyone whose pointer
          is not hovering a node — the wire is decorative, this is the
          content. */}
      <ul className="sr-only md:not-sr-only md:mt-10 md:grid md:grid-cols-2 md:gap-x-10 md:gap-y-3 md:text-sm md:text-muted-foreground">
        {topics.map((topic) => (
          <li key={topic.title}>
            <span className="font-medium text-foreground">{topic.title}:</span>{" "}
            {topic.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
