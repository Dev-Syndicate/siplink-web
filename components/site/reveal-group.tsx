"use client";

import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

/**
 * Marks its children as revealed once the group is scrolled to. The motion
 * itself lives in CSS (`.reveal-item`), so server-rendered children animate
 * without becoming client components; each child staggers by its own
 * `--reveal-index`.
 */
export function RevealGroup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [ref, seen] = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      data-revealed={seen || undefined}
      className={cn("reveal-group", className)}
      {...props}
    />
  );
}
