"use client";

import { useState } from "react";
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  Check,
  CheckCircle2,
  Cpu,
  Globe,
  Headset,
  Layers,
  Lock,
  Network,
  Radio,
  Rocket,
  Server,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { companyMissionVision } from "@/lib/company";
import { cn } from "@/lib/utils";

/**
 * Architectural schematic combining Mission, Vision, and the 4 Core Pillars.
 *
 * Visuals + Texts layout:
 * - Top cards: Mission (Purpose) & Vision (Destination)
 * - Connecting architecture backbone: The 4 Foundation Pillars:
 *   Reliability, Scalability, Security, Service
 * - Interactive pillar inspector showing live engineering evidence,
 *   telemetry benchmarks, and verified protocols for each pillar.
 */

interface PillarDetail {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  badge: string;
  specs: { label: string; value: string }[];
  controls: string[];
}

const PILLAR_DETAILS: PillarDetail[] = [
  {
    id: "reliability",
    title: "Reliability",
    tagline: "Carrier-neutral POPs, redundant routes, 24/7 proactive monitoring",
    description:
      "Voice traffic cannot tolerate latency spikes or packet loss. Our network operates carrier-neutral POPs in Bangalore and Chennai with automatic sub-second failover and continuous QoS analysis to guarantee seamless business continuity.",
    icon: Network,
    badge: "99.99% Availability",
    specs: [
      { label: "Core POPs", value: "Bangalore & Chennai (Tier-1 Peered)" },
      { label: "Failover Time", value: "<1.0s Automated Reroute" },
      { label: "Voice Codec", value: "Opus HD / G.711 Low Jitter" },
      { label: "Proactive Probes", value: "24/7 Synthetic Trunk Monitoring" },
    ],
    controls: [
      "Dual independent fiber entry into each switching facility",
      "Real-time Mean Opinion Score (MOS) tracking above 4.35",
      "Automatic dynamic call path routing around carrier congestion",
    ],
  },
  {
    id: "scalability",
    title: "Scalability",
    tagline: "From 10 lines to multi-branch enterprise without hardware racks",
    description:
      "Modern businesses grow dynamically. Whether onboarding five team members or expanding to three hundred across multiple cities, SipLink provisions extensions and trunks in software without waiting for telecom closet equipment.",
    icon: Layers,
    badge: "Elastic Capacity",
    specs: [
      { label: "Capacity Scale", value: "10 to 10,000+ Concurrent Lines" },
      { label: "Line Provisioning", value: "Instant via Central Web Portal" },
      { label: "Multi-Site Routing", value: "Unified Global Dial Plan" },
      { label: "Billing Architecture", value: "Consolidated Group Invoicing" },
    ],
    controls: [
      "Dynamic SIP trunk concurrency scaling without license keys",
      "Centralized multi-tenant PBX tenant management",
      "Zero on-premise PBX hardware purchase or maintenance requirements",
    ],
  },
  {
    id: "security",
    title: "Security & Governance",
    tagline: "DoT, ISO/IEC 27001, SOC 2 Type 2, HIPAA, and GDPR aligned",
    description:
      "We build security into the transmission protocol rather than patching it on top. All voice signaling and media are protected by TLS 1.3 and SRTP, with strict role-based access to recordings and verifiable audit logging.",
    icon: ShieldCheck,
    badge: "Verified Compliances",
    specs: [
      { label: "Media Encryption", value: "SRTP (AES-128 / AES-256)" },
      { label: "Signaling Protection", value: "TLS 1.3 Strict Mutual Auth" },
      { label: "Regulatory Licensing", value: "DoT Compliant Routing (India)" },
      { label: "Healthcare Controls", value: "HIPAA Aligned Recording Vault" },
    ],
    controls: [
      "Certified under ISO/IEC 27001:2022 for information security management",
      "SOC 2 Type 2 audited controls for availability and confidentiality",
      "Strict Call Detail Record (CDR) retention conforming to regulatory mandates",
    ],
  },
  {
    id: "service",
    title: "Service & Engineering",
    tagline: "Dedicated telecom engineers on call, not level-1 call center scripts",
    description:
      "When a business question arises, you need answers from the people who actually run the switches. SipLink pairs every account with dedicated telecom engineers, zero-downtime porting coordinators, and responsive 24/7 assistance.",
    icon: Headset,
    badge: "24/7 Telecom NOC",
    specs: [
      { label: "Engineer Escalation", value: "Direct Tier-3 Technical Access" },
      { label: "Answer Time SLA", value: "<15s Live Engineering Response" },
      { label: "Porting Window", value: "Scheduled Zero-Downtime Cutover" },
      { label: "Dedicated Onboarding", value: "Assigned Systems Architect" },
    ],
    controls: [
      "Direct technical consultation before, during, and after cutover",
      "WhatsApp, phone, and ticket channels with instant acknowledgment",
      "Proactive root-cause post-mortems for every network anomaly",
    ],
  },
];

export function AboutMissionPillars() {
  const [activeTab, setActiveTab] = useState<string>("reliability");
  const activeDetail = PILLAR_DETAILS.find((p) => p.id === activeTab) ?? PILLAR_DETAILS[0];

  return (
    <div className="space-y-12">
      {/* 1. Mission and Vision Strategic Bridge */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Mission Card */}
        <Card className="relative overflow-hidden border-border/80 bg-gradient-to-br from-card via-card to-primary/5 p-8 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Rocket className="size-6" />
            </span>
            <Badge variant="outline" className="font-mono text-xs uppercase">
              Purpose &amp; Foundation
            </Badge>
          </div>

          <h3 className="mt-5 text-2xl font-semibold tracking-tight text-foreground">
            {companyMissionVision.mission.title}
          </h3>

          <p className="mt-3 text-base leading-relaxed text-pretty text-muted-foreground">
            {companyMissionVision.mission.statement}
          </p>

          <div className="mt-6 flex items-center gap-2 border-t border-border/60 pt-4 font-mono text-xs text-primary">
            <CheckCircle2 className="size-4" />
            <span>Simpler · Smarter · Reliable Cloud Technology</span>
          </div>
        </Card>

        {/* Vision Card */}
        <Card className="relative overflow-hidden border-border/80 bg-gradient-to-br from-card via-card to-brand-to/5 p-8 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Globe className="size-6" />
            </span>
            <Badge variant="outline" className="font-mono text-xs uppercase">
              Long-term Horizon
            </Badge>
          </div>

          <h3 className="mt-5 text-2xl font-semibold tracking-tight text-foreground">
            {companyMissionVision.vision.title}
          </h3>

          <p className="mt-3 text-base leading-relaxed text-pretty text-muted-foreground">
            {companyMissionVision.vision.statement}
          </p>

          <div className="mt-6 flex items-center gap-2 border-t border-border/60 pt-4 font-mono text-xs text-primary">
            <CheckCircle2 className="size-4" />
            <span>Trusted Global Partner · Zero Communication Limits</span>
          </div>
        </Card>
      </div>

      {/* 2. Visual Connecting Ribbon */}
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-x-0 h-px bg-border" />
        <span className="relative z-10 flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 font-mono text-xs font-semibold tracking-widest text-muted-foreground uppercase shadow-sm">
          <Layers className="size-3.5 text-primary" />
          The Four Architectural Pillars
        </span>
      </div>

      {/* 3. Interactive Pillar Selector & Technical Inspector */}
      <div className="space-y-6">
        {/* 4 Pillar Selection Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PILLAR_DETAILS.map((pillar) => {
            const Icon = pillar.icon;
            const isSelected = pillar.id === activeTab;
            return (
              <button
                key={pillar.id}
                type="button"
                onClick={() => setActiveTab(pillar.id)}
                className={cn(
                  "group relative flex flex-col justify-between rounded-xl border p-5 text-left transition-all duration-300",
                  isSelected
                    ? "border-primary bg-primary/5 shadow-md ring-2 ring-primary/30"
                    : "border-border/80 bg-card hover:border-primary/40 hover:bg-muted/30",
                )}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        "flex size-10 items-center justify-center rounded-lg transition-colors",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground",
                      )}
                    >
                      <Icon className="size-5" />
                    </span>
                    <Badge
                      variant={isSelected ? "default" : "secondary"}
                      className="font-mono text-[10px]"
                    >
                      {pillar.badge}
                    </Badge>
                  </div>

                  <h4 className="mt-3.5 text-base font-semibold text-foreground">
                    {pillar.title}
                  </h4>

                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                    {pillar.tagline}
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-primary">
                  <span>{isSelected ? "Inspecting architecture" : "Explore proof"}</span>
                  <ArrowRight
                    className={cn(
                      "size-3.5 transition-transform",
                      isSelected && "translate-x-1",
                    )}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Technical Architecture Canvas for Selected Pillar */}
        <Card className="overflow-hidden border-border/90 bg-card p-6 shadow-lg sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/70 pb-5">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <activeDetail.icon className="size-5" />
              </span>
              <div>
                <h4 className="text-xl font-semibold tracking-tight text-foreground">
                  {activeDetail.title} — Architectural Blueprint
                </h4>
                <p className="font-mono text-xs text-muted-foreground">
                  Verified operational benchmark &amp; design commitment
                </p>
              </div>
            </div>

            <Badge variant="outline" className="border-primary/40 bg-primary/5 px-3 py-1 font-mono text-xs text-primary">
              Status: Validated in Production
            </Badge>
          </div>

          <div className="mt-6 grid gap-8 lg:grid-cols-12">
            {/* Left Description + Controls (7 cols) */}
            <div className="space-y-5 lg:col-span-7">
              <p className="text-sm leading-relaxed text-pretty text-muted-foreground sm:text-base">
                {activeDetail.description}
              </p>

              <div>
                <span className="font-mono text-xs font-semibold tracking-wider text-foreground uppercase">
                  Verified Engineering Safeguards
                </span>
                <ul className="mt-3 space-y-2.5">
                  {activeDetail.controls.map((control) => (
                    <li key={control} className="flex items-start gap-2.5 text-sm text-foreground/90">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>{control}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Telemetry / Spec Matrix (5 cols) */}
            <div className="rounded-xl border border-border/80 bg-muted/30 p-5 lg:col-span-5">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <span className="font-mono text-xs font-semibold text-foreground uppercase">
                  Telemetry &amp; Benchmarks
                </span>
                <Activity className="size-4 text-primary" />
              </div>

              <dl className="mt-4 divide-y divide-border/60">
                {activeDetail.specs.map(({ label, value }) => (
                  <div key={label} className="py-2.5 first:pt-0 last:pb-0">
                    <dt className="text-xs text-muted-foreground">{label}</dt>
                    <dd className="mt-0.5 font-mono text-xs font-semibold text-foreground">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-5 rounded-lg border border-primary/20 bg-background/80 p-3 text-center">
                <span className="font-mono text-[11px] text-muted-foreground">
                  Continuous validation by SipLink Global NOC
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
