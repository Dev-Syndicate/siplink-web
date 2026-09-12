import Link from "next/link";
import { ArrowRight, PhoneCall } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { announcement, site } from "@/lib/site";

/**
 * Thin inverted bar above the header: what shipped on the left, standing
 * credentials and the sales line on the right.
 *
 * It rides inside the fixed header stack rather than scrolling away, so the
 * height here is part of the `--header-height` offset applied to `main`.
 * Everything but the message itself drops on small screens — a 12px status
 * list wrapping to three lines costs more than it tells anyone.
 */
export function AnnouncementBar() {
  return (
    <div className="hidden bg-foreground text-background sm:block">
      <div className="mx-auto flex h-10 max-w-7xl items-center justify-between gap-6 px-6 lg:px-10">
        <div className="flex min-w-0 items-center gap-3">
          <Badge className="bg-primary text-primary-foreground font-mono text-[10px] tracking-widest uppercase">
            {announcement.label}
          </Badge>

          <p className="truncate text-xs text-background/90">
            {announcement.message}{" "}
            <Link
              href={announcement.href}
              className="group/link inline-flex items-center gap-1 font-medium text-primary underline-offset-4 hover:underline"
            >
              {announcement.linkLabel}
              <ArrowRight
                className="size-3 transition-transform group-hover/link:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </p>
        </div>

        <div className="hidden shrink-0 items-center gap-4 text-[11px] text-background/70 lg:flex">
          {announcement.status.map((item) => (
            <span key={item} className="flex items-center gap-1.5">
              <span
                className="size-1.5 rounded-full bg-primary"
                aria-hidden
              />
              {item}
            </span>
          ))}

          <span className="h-3 w-px bg-background/20" aria-hidden />

          <a
            href={`tel:${site.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-1.5 font-mono tracking-wider text-background transition-colors hover:text-primary"
          >
            <PhoneCall className="size-3" aria-hidden />
            {site.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
