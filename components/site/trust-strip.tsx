import Image, { type StaticImageData } from "next/image";
import dotWave1 from "@/public/trust/dot-wave-1.webp";
import dotWave2 from "@/public/trust/dot-wave-2.webp";
import dotWave3 from "@/public/trust/dot-wave-3.webp";
import dotFull from "@/public/trust/dot-full.webp";
import dotLogo from "@/public/trust/dot.webp";
import hipaaLogo from "@/public/trust/hipaa.webp";
import soc2Logo from "@/public/trust/soc2.webp";
import traiLogo from "@/public/trust/trai.webp";
import { cn } from "@/lib/utils";

/**
 * Trust strip, directly under the hero.
 *
 * Only claims SipLink can officially verify belong here. Uptime figures,
 * customer counts and certifications are deliberately absent until the
 * client can substantiate them; add them as a new entry, not as copy.
 *
 * No cards: a hairline grid keeps four short claims reading as one
 * statement instead of four competing boxes.
 *
 * Each mark plays its effect when hovered; the
 * `motion` class names the effect in globals.css.
 */
type TrustPoint = {
  label: string;
  motion: string;
  logo: StaticImageData;
  // `waves` are cut-out layers of the logo, stacked on it so they can pulse;
  // `silhouette` is the uncut logo, so the shine still crosses the cut-outs.
  waves?: StaticImageData[];
  silhouette?: StaticImageData;
};

const trustPoints: TrustPoint[] = [
  { label: "HIPAA-Aligned", logo: hipaaLogo, motion: "trust-shine" },
  {
    label: "DoT Licensed",
    logo: dotLogo,
    waves: [dotWave1, dotWave2, dotWave3],
    silhouette: dotFull,
    motion: "trust-shine trust-broadcast",
  },
  { label: "TRAI Regulated", logo: traiLogo, motion: "trust-shine" },
  { label: "SOC 2 Type 2", logo: soc2Logo, motion: "trust-shine" },
];

export function TrustStrip() {
  return (
    <section
      aria-labelledby="trust-heading"
      className="border-b border-border bg-muted/30"
    >
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-12">
        <h2
          id="trust-heading"
          className="font-heading text-center text-xl font-semibold tracking-tight text-balance sm:text-2xl"
        >
          Trusted Communication Infrastructure for Growing Businesses
        </h2>

        <ul className="mt-8 grid grid-cols-2 gap-y-6 sm:grid-cols-4 sm:gap-y-0 sm:divide-x sm:divide-border">
          {trustPoints.map((point) => (
            <li
              key={point.label}
              className="group flex flex-col items-center gap-2.5 px-4 text-center"
            >
              {/* Fixed-height slot keeps labels aligned across logos. */}
              <span className="flex h-12 items-center">
                <span
                  className={cn(
                    "relative block transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none",
                    point.motion,
                  )}
                  // The shine is masked to the logo's own pixels.
                  style={{ "--logo": `url(${(point.silhouette ?? point.logo).src})` } as React.CSSProperties}
                >
                  <Image
                    src={point.logo}
                    alt=""
                    className="h-12 w-auto"
                    sizes="160px"
                  />
                  {point.waves?.map((wave, i) => (
                    <Image
                      key={wave.src}
                      src={wave}
                      alt=""
                      className="trust-wave absolute inset-0 size-full"
                      style={{ "--wave-delay": `${i * 0.25}s` } as React.CSSProperties}
                      sizes="96px"
                    />
                  ))}
                </span>
              </span>
              <span className="text-sm font-medium">{point.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
