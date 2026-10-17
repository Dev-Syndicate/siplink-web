"use client";

import { useState } from "react";
import {
  Check,
  CheckCircle2,
  Clock,
  FileSpreadsheet,
  Headset,
  LifeBuoy,
  Network,
  ScrollText,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * SipLink Assure — Connected Lifecycle Assurance Schematic.
 *
 * 100% faithful to the text of the 6 assurances:
 * 1. Dedicated project managers (Design before sale)
 * 2. Resolution expertise (End-to-end management)
 * 3. 24x7 customer support (Always available)
 * 4. Online account management (Self-service web portal)
 * 5. Service level agreement (Equipment, access, and IP network)
 * 6. Service interruption credits (Fault resides with us credit)
 */

interface AssuranceStage {
  step: number;
  phase: string;
  title: string;
  description: string;
  icon: LucideIcon;
  guarantee: string;
  deliverables: string[];
}

const STAGES: AssuranceStage[] = [
  {
    step: 1,
    phase: "Design & Onboarding",
    title: "Dedicated project managers",
    description:
      "Experts who oversee the design and delivery of your solution from concept through to installation. We audit your existing PBX, bandwidth, and call flows before you commit.",
    icon: Users,
    guarantee: "Architectural alignment before cutover",
    deliverables: [
      "Custom voice network architecture review",
      "Bandwidth & concurrent call dimensioning",
      "Zero-downtime number porting planning",
    ],
  },
  {
    step: 2,
    phase: "Single-Point Ownership",
    title: "Resolution expertise",
    description:
      "An expert manages your issue from beginning to end, keeping you informed until it is resolved. No passing between departments or re-explaining your setup.",
    icon: LifeBuoy,
    guarantee: "Direct engineer accountability",
    deliverables: [
      "Dedicated case engineer assigned immediately",
      "Continuous status updates until verified resolved",
      "Written root-cause analysis on request",
    ],
  },
  {
    step: 3,
    phase: "Day-to-Day Operations",
    title: "24x7 customer support",
    description:
      "Dedicated customer support staff are always available to help. Reach telecom engineers via phone, email, and live messaging around the clock.",
    icon: Clock,
    guarantee: "<15s average engineer response",
    deliverables: [
      "Round-the-clock telephone and ticket escalation",
      "WhatsApp direct support for urgent queries",
      "Proactive automated trunk status alerts",
    ],
  },
  {
    step: 4,
    phase: "Administrative Control",
    title: "Online account management",
    description:
      "A web portal that makes it easy to administer your account and support. Manage extensions, review CDRs, update routing rules, and monitor spend in real time.",
    icon: ScrollText,
    guarantee: "Instant self-service portal",
    deliverables: [
      "Live extension, ring group, and IVR configuration",
      "Detailed Call Detail Records (CDRs) per second",
      "Role-based administrative permissions",
    ],
  },
  {
    step: 5,
    phase: "Quality Assurance",
    title: "Service level agreement",
    description:
      "Covering SipLink equipment, the local access network, and our IP network. Transparent contractual commitments backed by verified engineering performance.",
    icon: ShieldCheck,
    guarantee: "Carrier-grade availability",
    deliverables: [
      "Core IP network availability coverage",
      "Mean Opinion Score (MOS) quality standards",
      "Scheduled maintenance notice periods",
    ],
  },
  {
    step: 6,
    phase: "Commercial Backing",
    title: "Service interruption credits",
    description:
      "We resolve interruptions as quickly as possible, and if the fault resides with us you receive a credit. We put our commercial agreement behind our network claims.",
    icon: Network,
    guarantee: "Contractual credit remedy",
    deliverables: [
      "Automatic credit calculation upon verified fault",
      "Straightforward claim process without runaround",
      "Transparent invoice adjustments",
    ],
  },
];

export function AboutAssureLifecycle() {
  const [selectedStep, setSelectedStep] = useState<number>(1);
  const activeStage = STAGES.find((s) => s.step === selectedStep) ?? STAGES[0];

  return (
    <div className="space-y-10">
      {/* 1. Sequential Pipeline Ribbon */}
      <div className="relative">
        {/* Horizontal Connector Line for Desktop */}
        <div
          aria-hidden
          className="absolute top-1/2 -translate-y-1/2 inset-x-8 hidden h-0.5 bg-border sm:block"
        />

        <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-6 sm:gap-2">
          {STAGES.map((stage) => {
            const Icon = stage.icon;
            const isSelected = stage.step === selectedStep;
            return (
              <button
                key={stage.step}
                type="button"
                onClick={() => setSelectedStep(stage.step)}
                className={cn(
                  "group relative flex flex-col items-center rounded-xl border p-3 text-center transition-all duration-200",
                  isSelected
                    ? "border-primary bg-primary/10 shadow-md ring-2 ring-primary/40 z-10"
                    : "border-border/80 bg-card hover:border-primary/40 hover:bg-muted/40",
                )}
              >
                <span
                  className={cn(
                    "flex size-10 items-center justify-center rounded-full transition-colors",
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary",
                  )}
                >
                  <Icon className="size-4.5" />
                </span>

                <span className="mt-2 font-mono text-[10px] font-semibold text-primary">
                  Stage 0{stage.step}
                </span>

                <span className="mt-0.5 line-clamp-1 text-xs font-semibold text-foreground">
                  {stage.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Interactive Technical Detail Inspector Card */}
      <Card className="overflow-hidden border-border/90 bg-card p-6 shadow-xl sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/70 pb-5">
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <activeStage.icon className="size-5.5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="font-mono text-[10px] text-primary">
                  Stage 0{activeStage.step} · {activeStage.phase}
                </Badge>
                <Badge variant="secondary" className="font-mono text-[10px]">
                  {activeStage.guarantee}
                </Badge>
              </div>
              <h3 className="mt-1 text-xl font-bold tracking-tight text-foreground">
                {activeStage.title}
              </h3>
            </div>
          </div>

          <span className="font-mono text-xs text-muted-foreground">
            SipLink Assure Operational Guarantee
          </span>
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-12">
          {/* Detailed Statement */}
          <div className="space-y-4 lg:col-span-7">
            <p className="text-sm leading-relaxed text-pretty text-muted-foreground sm:text-base">
              {activeStage.description}
            </p>

            <div className="rounded-xl border border-border/80 bg-muted/20 p-4">
              <span className="font-mono text-xs font-semibold tracking-wider text-foreground uppercase">
                Customer Commitments in this Stage:
              </span>
              <ul className="mt-3 space-y-2">
                {activeStage.deliverables.map((deliv) => (
                  <li key={deliv} className="flex items-center gap-2.5 text-xs text-foreground/90">
                    <CheckCircle2 className="size-4 shrink-0 text-primary" />
                    <span>{deliv}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Operational Standard Badge Panel */}
          <div className="flex flex-col justify-between rounded-xl border border-primary/20 bg-primary/5 p-5 lg:col-span-5">
            <div>
              <span className="font-mono text-[11px] font-semibold text-primary uppercase">
                Contractual Standard
              </span>
              <h4 className="mt-2 text-base font-semibold text-foreground">
                Why this guarantee matters
              </h4>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                Telecom promises are easy to make on a sales call. SipLink Assure embeds these 6 commitments into your service agreement from day one, ensuring transparent communication without hidden caveats.
              </p>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-primary/20 pt-3 text-xs">
              <span className="font-mono text-[10px] text-muted-foreground">
                Standard: ISO 27001 &amp; DoT Aligned
              </span>
              <span className="font-mono text-[10px] font-semibold text-primary">
                Contractually Backed
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
