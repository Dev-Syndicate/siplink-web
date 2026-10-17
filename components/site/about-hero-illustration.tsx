"use client";

import { useState } from "react";
import {
  Activity,
  ArrowRight,
  AudioLines,
  Briefcase,
  Building2,
  Check,
  CheckCircle2,
  Cpu,
  Globe,
  Headset,
  Laptop,
  Layers,
  Lock,
  MessageSquare,
  Mic,
  Network,
  Phone,
  PhoneCall,
  PhoneIncoming,
  Puzzle,
  Radio,
  Server,
  ShieldCheck,
  Smartphone,
  Sparkles,
  UserCheck,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * Hero Illustration for the About Us page.
 *
 * 100% accurate to the headline copy:
 * "SipLink Communications is a business communications and cloud voice
 * technology company helping organizations connect their people, customers,
 * candidates, and partners more effectively."
 *
 * Visuals + Texts architecture:
 * - Left: The 4 core groups (People & Teams, Customers, Candidates, Partners)
 * - Center: SipLink Unified Cloud Voice Core (PBX, SIP Trunking, QoS, DoT/HIPAA)
 * - Right: Real-time Endpoints & Live Experience (Active call, multi-device sync, CRM screen-pop)
 */

type StakeholderId = "people" | "customers" | "candidates" | "partners";

interface Stakeholder {
  id: StakeholderId;
  label: string;
  sub: string;
  icon: LucideIcon;
  badge: string;
  channels: string[];
  protocol: string;
}

const STAKEHOLDERS: Stakeholder[] = [
  {
    id: "people",
    label: "People & Teams",
    sub: "Distributed & Hybrid",
    icon: Users,
    badge: "Workforce",
    channels: ["Remote Softphones", "Office Deskphones", "Branch Extensions"],
    protocol: "WebRTC / SIP",
  },
  {
    id: "customers",
    label: "Customers",
    sub: "Omnichannel Inbound",
    icon: PhoneIncoming,
    badge: "Inbound / Outbound",
    channels: ["Toll-Free 1800", "DID Direct Lines", "WhatsApp Business"],
    protocol: "PSTN / Cloud Voice",
  },
  {
    id: "candidates",
    label: "Candidates",
    sub: "Talent Acquisition",
    icon: UserCheck,
    badge: "Recruitment",
    channels: ["CEIPAL / JobDiva ATS", "High-Velocity Outreach", "Automated SMS"],
    protocol: "ATS Telephony Sync",
  },
  {
    id: "partners",
    label: "Partners & Systems",
    sub: "Enterprise Workflows",
    icon: Puzzle,
    badge: "Integrations",
    channels: ["Salesforce & Zoho CRM", "MS Teams Direct Routing", "REST Voice APIs"],
    protocol: "TLS 1.3 / OAuth2",
  },
];

export function AboutHeroIllustration() {
  const [selectedStakeholder, setSelectedStakeholder] = useState<StakeholderId>("people");
  const activeStakeholder = STAKEHOLDERS.find((s) => s.id === selectedStakeholder) ?? STAKEHOLDERS[0];

  return (
    <div className="relative mx-auto w-full max-w-5xl">
      {/* Outer Glow / Halo Frame */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-2 rounded-3xl bg-gradient-to-b from-primary/10 via-transparent to-brand-to/10 blur-xl"
      />

      <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-card/90 shadow-2xl backdrop-blur-md">
        {/* Top Telemetry Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/80 bg-muted/40 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="flex size-2 relative">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/60 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            <span className="font-mono text-xs font-semibold tracking-wider text-foreground uppercase">
              SipLink Carrier Voice Core
            </span>
            <span className="hidden text-xs text-muted-foreground sm:inline">|</span>
            <span className="hidden font-mono text-[11px] text-muted-foreground sm:inline">
              POP Bangalore & Chennai · Dual Active
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="border-primary/30 bg-primary/5 font-mono text-[10px] text-primary"
            >
              99.99% CORE UPTIME
            </Badge>
            <Badge
              variant="secondary"
              className="font-mono text-[10px] text-muted-foreground"
            >
              DoT & HIPAA VERIFIED
            </Badge>
          </div>
        </div>

        {/* Main Orchestration Canvas */}
        <div className="grid gap-6 p-4 sm:p-6 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: The 4 Connected Stakeholders (4 cols) */}
          <div className="space-y-3 lg:col-span-4">
            <div className="flex items-center justify-between pb-1">
              <span className="font-mono text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                1. Connected Stakeholders
              </span>
              <span className="text-[10px] text-muted-foreground">Select to trace</span>
            </div>

            <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
              {STAKEHOLDERS.map((s) => {
                const Icon = s.icon;
                const isSelected = s.id === selectedStakeholder;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedStakeholder(s.id)}
                    className={cn(
                      "group relative flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-all duration-200",
                      isSelected
                        ? "border-primary/70 bg-primary/5 shadow-sm ring-1 ring-primary/40"
                        : "border-border/70 bg-background/60 hover:border-border hover:bg-muted/40",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors",
                        isSelected
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "bg-muted text-muted-foreground group-hover:text-foreground",
                      )}
                    >
                      <Icon className="size-4.5" />
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="truncate text-xs font-semibold text-foreground">
                          {s.label}
                        </span>
                        <Badge
                          variant={isSelected ? "default" : "secondary"}
                          className="px-1.5 py-0 font-mono text-[9px]"
                        >
                          {s.badge}
                        </Badge>
                      </div>
                      <p className="mt-0.5 text-[11px] text-muted-foreground">
                        {s.sub}
                      </p>
                      <div className="mt-1.5 flex items-center gap-1.5 font-mono text-[10px] text-primary">
                        <span className="size-1 rounded-full bg-primary" />
                        <span className="truncate">{s.protocol}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Center Column: SipLink Unified Cloud Voice Core (4 cols) */}
          <div className="flex flex-col justify-between rounded-xl border border-border/80 bg-gradient-to-b from-muted/30 via-background to-muted/20 p-4 lg:col-span-4">
            <div>
              <div className="flex items-center justify-between border-b border-border/60 pb-2.5">
                <div className="flex items-center gap-1.5">
                  <Cpu className="size-4 text-primary" />
                  <span className="font-mono text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                    2. Cloud Voice Core
                  </span>
                </div>
                <Badge variant="outline" className="border-border font-mono text-[9px]">
                  QoS MOS 4.41
                </Badge>
              </div>

              {/* Central Engine Badge */}
              <div className="mt-4 flex flex-col items-center justify-center rounded-xl border border-primary/20 bg-background p-4 text-center shadow-inner">
                <div className="flex items-center gap-1 text-base font-bold tracking-tight">
                  <span className="text-primary">sip</span>
                  <span className="text-foreground">link</span>
                  <span className="ml-1 text-[10px] font-normal text-muted-foreground">CORE</span>
                </div>
                <span className="mt-1 font-mono text-[10px] text-muted-foreground">
                  Carrier Switching & Intelligent Routing
                </span>

                {/* Animated active tracer beam */}
                <div className="relative mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="trace-pulse absolute inset-0 bg-primary"
                    style={{ "--trace-duration": "2.4s" } as React.CSSProperties}
                  />
                </div>
              </div>

              {/* Core Features running in tandem */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between rounded-lg border border-border/70 bg-card px-3 py-2 text-xs">
                  <div className="flex items-center gap-2">
                    <Network className="size-3.5 text-primary" />
                    <span className="font-medium text-foreground">Hosted PBX & SIP Trunking</span>
                  </div>
                  <span className="font-mono text-[10px] text-primary">Active</span>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-border/70 bg-card px-3 py-2 text-xs">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="size-3.5 text-primary" />
                    <span className="font-medium text-foreground">SRTP / TLS 1.3 Encryption</span>
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground">Locked</span>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-border/70 bg-card px-3 py-2 text-xs">
                  <div className="flex items-center gap-2">
                    <Layers className="size-3.5 text-primary" />
                    <span className="font-medium text-foreground">Multi-Tenant Cloud Clusters</span>
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground">&lt;14ms</span>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-border/70 bg-card px-3 py-2 text-xs">
                  <div className="flex items-center gap-2">
                    <Radio className="size-3.5 text-primary" />
                    <span className="font-medium text-foreground">Real-time Failover Engine</span>
                  </div>
                  <span className="font-mono text-[10px] text-primary">0s Loss</span>
                </div>
              </div>
            </div>

            {/* Active Link to Selected Stakeholder */}
            <div className="mt-4 rounded-lg border border-primary/30 bg-primary/5 p-2.5">
              <span className="font-mono text-[10px] font-semibold text-primary uppercase">
                Active Route: {activeStakeholder.label}
              </span>
              <ul className="mt-1.5 space-y-1">
                {activeStakeholder.channels.map((ch) => (
                  <li key={ch} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <Check className="size-3 text-primary" />
                    <span>{ch}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Real-time Endpoints & Live Experience (4 cols) */}
          <div className="space-y-3 lg:col-span-4">
            <div className="flex items-center justify-between pb-1">
              <span className="font-mono text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                3. Unified Endpoints
              </span>
              <span className="font-mono text-[10px] text-primary">Live Session</span>
            </div>

            {/* Active Call In-Progress Card */}
            <div className="rounded-xl border border-primary/30 bg-background p-3.5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <PhoneCall className="size-3.5" />
                  </span>
                  <div>
                    <span className="block text-xs font-semibold text-foreground">
                      Inbound Voice Call
                    </span>
                    <span className="block font-mono text-[10px] text-muted-foreground">
                      +1 (800) 248-7719 → Ext 104
                    </span>
                  </div>
                </div>
                <Badge className="bg-primary/15 font-mono text-[10px] text-primary hover:bg-primary/20">
                  02:45
                </Badge>
              </div>

              {/* Audio Waveform visualization */}
              <div className="mt-3 flex items-center justify-center gap-1 rounded-lg bg-muted/30 px-3 py-2">
                {[40, 75, 55, 90, 60, 100, 70, 85, 45, 95, 60, 80, 50, 70, 30].map(
                  (h, i) => (
                    <span
                      key={i}
                      className="w-1 rounded-full bg-primary/80 transition-all duration-300"
                      style={{ height: `${Math.max(8, h * 0.22)}px` }}
                    />
                  ),
                )}
                <span className="ml-2 font-mono text-[9px] text-muted-foreground">
                  Opus HD
                </span>
              </div>

              <div className="mt-2.5 flex items-center justify-between text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Mic className="size-3 text-primary" />
                  <span>Recording On</span>
                </span>
                <span className="font-mono text-[9px] text-primary">
                  HIPAA Secured
                </span>
              </div>
            </div>

            {/* Live CRM Screen Pop Card */}
            <div className="rounded-xl border border-border/80 bg-background p-3.5 shadow-sm">
              <div className="flex items-center justify-between border-b border-border/60 pb-2">
                <span className="font-mono text-[10px] font-semibold text-muted-foreground uppercase">
                  CRM Workflow Integration
                </span>
                <Badge variant="outline" className="font-mono text-[9px]">
                  Auto Sync
                </Badge>
              </div>

              <div className="mt-2.5 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Contact:</span>
                  <span className="font-medium text-foreground">Sarah Jenkins</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Account:</span>
                  <span className="font-medium text-foreground">Northwind Corp</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Sync Target:</span>
                  <span className="font-medium text-primary">Salesforce & Teams</span>
                </div>
              </div>
            </div>

            {/* Delivery Hardware & Clients list */}
            <div className="grid grid-cols-3 gap-2 pt-1 text-center font-mono text-[10px]">
              <div className="rounded-lg border border-border/70 bg-muted/30 p-2">
                <Smartphone className="mx-auto size-4 text-primary" />
                <span className="mt-1 block truncate text-muted-foreground">Mobile App</span>
              </div>
              <div className="rounded-lg border border-border/70 bg-muted/30 p-2">
                <Laptop className="mx-auto size-4 text-primary" />
                <span className="mt-1 block truncate text-muted-foreground">WebRTC</span>
              </div>
              <div className="rounded-lg border border-border/70 bg-muted/30 p-2">
                <Phone className="mx-auto size-4 text-primary" />
                <span className="mt-1 block truncate text-muted-foreground">IP Deskphone</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Verification Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border/80 bg-muted/20 px-4 py-3 sm:px-6">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="size-3.5 text-primary" />
              <span>Carrier-Grade Tier-1 Interconnects</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="size-3.5 text-primary" />
              <span>Direct Routing for MS Teams</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="size-3.5 text-primary" />
              <span>Full Regulatory DoT Compliance</span>
            </span>
          </div>

          <span className="font-mono text-[10px] text-muted-foreground">
            ONE CONNECTED ECOSYSTEM · SINCE 2012
          </span>
        </div>
      </div>
    </div>
  );
}
