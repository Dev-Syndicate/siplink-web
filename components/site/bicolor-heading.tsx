import React from "react";
import { cn } from "@/lib/utils";

/**
 * Splits headline text into a black lead line and a pink gradient accent line.
 */
export function splitBicolorText(text: string): { lead: string; accent: string } {
  // If there is a period followed by a space (e.g. "Start where you are. Step up when you grow.")
  const periodIndex = text.indexOf(". ");
  if (periodIndex !== -1) {
    return {
      lead: text.slice(0, periodIndex + 1),
      accent: text.slice(periodIndex + 2),
    };
  }

  // If there is a comma followed by a space (e.g. "Know who is waiting, and why.")
  const commaIndex = text.indexOf(", ");
  if (commaIndex !== -1) {
    return {
      lead: text.slice(0, commaIndex + 1),
      accent: text.slice(commaIndex + 2),
    };
  }

  // Otherwise split words balanced across two lines
  const words = text.trim().split(/\s+/);
  if (words.length <= 1) {
    return { lead: text, accent: "" };
  }

  // For 2 words: 1 lead, 1 accent. For 3 words: 1 lead, 2 accent. For 4 words: 2 lead, 2 accent.
  const midpoint = Math.floor(words.length / 2);
  return {
    lead: words.slice(0, midpoint).join(" "),
    accent: words.slice(midpoint).join(" "),
  };
}

export function BicolorHeading({
  text,
  lead,
  accent,
  className,
  as: Component = "h1",
}: {
  text?: string;
  lead?: string;
  accent?: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span" | "div";
}) {
  const parts =
    lead !== undefined && accent !== undefined
      ? { lead, accent }
      : text
        ? splitBicolorText(text)
        : { lead: "", accent: "" };

  return (
    <Component className={className}>
      {parts.lead}{" "}
      {parts.accent ? (
        <span className="block bg-gradient-to-r from-brand-from to-brand-to bg-clip-text text-transparent">
          {parts.accent}
        </span>
      ) : null}
    </Component>
  );
}
