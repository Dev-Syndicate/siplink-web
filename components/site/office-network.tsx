"use client";

import { useState } from "react";
import { Building2, MapPin, Phone } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/**
 * Office network illustration — three staffed offices and one registered
 * US entity, drawn as a selectable map rather than a card grid.
 *
 * Every address, phone number and the India/US operating-vs-registered
 * split comes straight from `offices` in lib/site.ts (sourced from
 * docs/siplink-documentation.md §17). Nothing here states a per-office
 * role, a latency figure, or a network-topology claim: the source
 * describes carrier-neutral POPs and Tier-1 peering for SipLink as a
 * whole, not assigned to one specific city, so this diagram only ever
 * shows the facts that are actually attributed per office — the address
 * and the phone line.
 */

interface TopologyNode {
  city: string;
  isRegistered?: boolean;
  xPercent: number;
  yPercent: number;
  addressLines: string[];
  phone: string;
}

const TOPOLOGY_NODES: TopologyNode[] = [
  {
    city: "Bangalore",
    xPercent: 28,
    yPercent: 32,
    addressLines: [
      "Quadrant 2, 4th Floor, Tower 1, Umiya Business Bay",
      "Cessna Business Park, Marathahalli, Outer Ring Rd",
      "Kadubeesanahalli, Bengaluru 560037",
    ],
    phone: "+91 82172 02075",
  },
  {
    city: "Chennai",
    xPercent: 72,
    yPercent: 32,
    addressLines: [
      "Level 3, Third Floor, Anmol Palani, No. 88",
      "Gopathi Narayanaswami Chetty Rd, T. Nagar",
      "Chennai, Tamil Nadu 600017",
    ],
    phone: "+91 44 48636371",
  },
  {
    city: "Hyderabad",
    xPercent: 50,
    yPercent: 78,
    addressLines: [
      "Capital Park, No. 602, 6th Floor, Capital Pk Rd",
      "Ayyappa Society, Madhapur",
      "Hyderabad, Telangana 500081",
    ],
    phone: "+91 82172 02075",
  },
  {
    city: "United States",
    isRegistered: true,
    xPercent: 88,
    yPercent: 82,
    addressLines: ["30 N Gould St, Ste R", "Sheridan, WY 82801"],
    phone: "+1 916 226 6066",
  },
];

export function OfficeNetwork() {
  const [selectedCity, setSelectedCity] = useState<string>("Chennai");
  const selectedNode =
    TOPOLOGY_NODES.find((n) => n.city === selectedCity) ?? TOPOLOGY_NODES[0];

  const operatingNodes = TOPOLOGY_NODES.filter((n) => !n.isRegistered);
  const usNode = TOPOLOGY_NODES.find((n) => n.isRegistered);

  return (
    <div className="space-y-10">
      {/* 1. Interactive Telecom Topology Canvas */}
      <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-card shadow-2xl">
        {/* Topology Console Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/80 bg-muted/40 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="flex size-2 relative">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/60 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            <span className="font-mono text-xs font-semibold tracking-wider text-foreground uppercase">
              SipLink Office Network
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="border-primary/30 bg-primary/5 font-mono text-[10px] text-primary"
            >
              DoT LICENSED
            </Badge>
          </div>
        </div>

        {/* Visual Map */}
        <div className="relative p-6 sm:p-10">
          <div className="mx-auto aspect-[16/9] w-full max-w-3xl min-h-[300px] relative rounded-xl border border-border/60 bg-gradient-to-b from-muted/30 via-background to-muted/20 p-4">
            {/* SVG Connecting Rails with animated trace-pulse */}
            <svg
              viewBox="0 0 800 450"
              preserveAspectRatio="none"
              role="presentation"
              aria-hidden
              className="absolute inset-0 size-full pointer-events-none"
            >
              <defs>
                <linearGradient id="fiber-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" className="text-primary" stopColor="currentColor" stopOpacity="0.8" />
                  <stop offset="100%" className="text-brand-to" stopColor="currentColor" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              {/* Triangle backbone connecting BLR (224, 144), MAA (576, 144), HYD (400, 351) */}
              {/* Bangalore to Chennai */}
              <line x1="224" y1="144" x2="576" y2="144" strokeWidth="2" className="stroke-border" />
              <line
                x1="224"
                y1="144"
                x2="576"
                y2="144"
                pathLength="100"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="trace-pulse stroke-primary"
                style={{ "--trace-duration": "3.0s" } as React.CSSProperties}
              />

              {/* Chennai to Hyderabad */}
              <line x1="576" y1="144" x2="400" y2="351" strokeWidth="2" className="stroke-border" />
              <line
                x1="576"
                y1="144"
                x2="400"
                y2="351"
                pathLength="100"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="trace-pulse stroke-primary"
                style={{ "--trace-duration": "3.4s", "--trace-delay": "-1.2s" } as React.CSSProperties}
              />

              {/* Hyderabad to Bangalore */}
              <line x1="400" y1="351" x2="224" y2="144" strokeWidth="2" className="stroke-border" />
              <line
                x1="400"
                y1="351"
                x2="224"
                y2="144"
                pathLength="100"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="trace-pulse stroke-primary"
                style={{ "--trace-duration": "3.2s", "--trace-delay": "-2.1s" } as React.CSSProperties}
              />

              {/* Center Hub link to Chennai */}
              <circle cx="400" cy="213" r="54" className="fill-primary/5 stroke-primary/30" strokeDasharray="4 4" />
            </svg>

            {/* Central Core Badge */}
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center rounded-2xl border-2 border-primary bg-background px-3 py-2 text-center shadow-lg"
              style={{ left: "50%", top: "47%" }}
            >
              <div className="flex items-center gap-1 text-xs font-bold">
                <span className="text-primary">sip</span>
                <span className="text-foreground">link</span>
              </div>
              <span className="font-mono text-[9px] text-muted-foreground">
                One business, three offices
              </span>
            </div>

            {/* Operating Nodes Placed on the Canvas */}
            {operatingNodes.map((node) => {
              const isSelected = node.city === selectedCity;
              return (
                <button
                  key={node.city}
                  type="button"
                  onClick={() => setSelectedCity(node.city)}
                  className={cn(
                    "group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 rounded-xl border p-2.5 transition-all duration-300",
                    isSelected
                      ? "border-primary bg-card shadow-lg ring-2 ring-primary/40 scale-105 z-20"
                      : "border-border bg-card/90 hover:border-primary/50 shadow-sm z-10",
                  )}
                  style={{
                    left: `${node.xPercent}%`,
                    top: `${node.yPercent}%`,
                  }}
                >
                  <span
                    className={cn(
                      "flex size-9 items-center justify-center rounded-lg transition-colors",
                      isSelected
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground",
                    )}
                  >
                    <MapPin className="size-4" />
                  </span>

                  <span className="text-xs font-bold text-foreground">
                    {node.city}
                  </span>
                </button>
              );
            })}

            {/* US Entity Badge in the bottom right corner */}
            {usNode ? (
              <button
                type="button"
                onClick={() => setSelectedCity(usNode.city)}
                className={cn(
                  "absolute right-3 bottom-3 flex items-center gap-2 rounded-xl border p-2.5 text-left transition-all z-20",
                  selectedCity === usNode.city
                    ? "border-primary bg-card shadow-md ring-1 ring-primary/40"
                    : "border-dashed border-border bg-background/80 hover:border-primary/50",
                )}
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground">
                  <Building2 className="size-4" />
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-semibold text-foreground">
                      US Corporate Entity
                    </span>
                    <Badge variant="outline" className="font-mono text-[8px]">
                      Sheridan, WY
                    </Badge>
                  </div>
                  <span className="text-[10px] text-muted-foreground">
                    SipLink Communications LLC
                  </span>
                </div>
              </button>
            ) : null}
          </div>
        </div>

        {/* Selected Office Technical Inspector Card */}
        <div className="border-t border-border/80 bg-muted/20 p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                <MapPin className="size-5" />
              </span>
              <div>
                <h4 className="text-lg font-bold text-foreground">
                  {selectedNode.city} Office
                </h4>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={`tel:${selectedNode.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 font-mono text-xs font-semibold text-primary transition-colors hover:bg-muted"
              >
                <Phone className="size-3.5" />
                <span>{selectedNode.phone}</span>
              </a>
            </div>
          </div>

          <div className="mt-4 border-t border-border/60 pt-3 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">Registered Address: </span>
            <span>{selectedNode.addressLines.join(", ")}</span>
          </div>
        </div>
      </div>

      {/* 2. Structured Operating Office Cards (Full Details & SEO accessible) */}
      <div className="grid gap-5 sm:grid-cols-3">
        {operatingNodes.map((node) => (
          <div
            key={node.city}
            onClick={() => setSelectedCity(node.city)}
            className={cn(
              "cursor-pointer rounded-xl border p-5 transition-all duration-200",
              selectedCity === node.city
                ? "border-primary bg-primary/5 shadow-md ring-1 ring-primary/30"
                : "border-border/80 bg-card hover:border-primary/40",
            )}
          >
            <div className="flex items-center gap-2">
              <MapPin className="size-4 text-primary" aria-hidden />
              <h3 className="font-semibold text-foreground">{node.city}</h3>
            </div>

            <address className="mt-3 text-xs leading-relaxed text-muted-foreground not-italic">
              {node.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>

            <a
              href={`tel:${node.phone.replace(/\s/g, "")}`}
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
            >
              <Phone className="size-3" />
              <span>{node.phone}</span>
            </a>
          </div>
        ))}
      </div>

      {/* 3. The US Entity Banner */}
      {usNode ? (
        <div className="flex items-start gap-4 rounded-xl border border-dashed border-border/90 bg-muted/20 p-5">
          <Building2
            className="mt-0.5 size-5 shrink-0 text-muted-foreground"
            aria-hidden
          />
          <div className="flex-1 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">
              SipLink Communications LLC
            </span>
            {" — the registered United States entity, in "}
            <span className="font-medium text-foreground">Sheridan, Wyoming</span>
            {"."}
            <div className="mt-1 font-mono text-xs text-muted-foreground">
              {usNode.addressLines.join(", ")} · {usNode.phone}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
