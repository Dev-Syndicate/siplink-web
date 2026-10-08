"use client";

import { useState } from "react";
import {
  Activity,
  ArrowRight,
  AudioLines,
  Bot,
  Building2,
  Check,
  CheckCircle2,
  Clock,
  Headphones,
  Laptop,
  MessageCircle,
  MessageSquare,
  Mic,
  Network,
  Phone,
  PhoneCall,
  PhoneForwarded,
  Puzzle,
  Radio,
  ServerCog,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
  Video,
  Volume2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * Modern Cloud Voice Ecosystem Illustration.
 *
 * 100% accurate to the section text:
 * - "Communication is no longer limited to a desk phone in a single office."
 * - "Teams work remotely, customers expect instant responses, and businesses
 *   need every conversation seamlessly integrated with their CRM workflows."
 * - "Brings voice, messaging, collaboration, and business applications
 *   together into one connected ecosystem..."
 */

type EndpointType = "desk" | "laptop" | "mobile" | "teams";

interface DeviceEndpoint {
  id: EndpointType;
  label: string;
  location: string;
  icon: typeof Phone;
  status: string;
  badge: string;
}

const ENDPOINTS: DeviceEndpoint[] = [
  {
    id: "laptop",
    label: "WebRTC Browser",
    location: "Remote / Home Office",
    icon: Laptop,
    status: "Active Call",
    badge: "Remote",
  },
  {
    id: "mobile",
    label: "SipLink UC Mobile",
    location: "iOS & Android",
    icon: Smartphone,
    status: "Available",
    badge: "On the Road",
  },
  {
    id: "desk",
    label: "IP Deskphone",
    location: "Office Headquarters",
    icon: Phone,
    status: "Ringing (SimRing)",
    badge: "Office",
  },
  {
    id: "teams",
    label: "MS Teams Routing",
    location: "Direct Routing Gateway",
    icon: Users,
    status: "Synchronized",
    badge: "Collab",
  },
];

export function ModernVoiceEcosystemIllustration() {
  const [activeEndpoint, setActiveEndpoint] = useState<EndpointType>("laptop");
  const [activeChannel, setActiveChannel] = useState<"voice" | "whatsapp" | "crm">("voice");

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-border/80 bg-card shadow-2xl">
      {/* Console Window Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/80 bg-muted/40 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-primary/80" />
            <span className="size-2.5 rounded-full bg-muted-foreground/30" />
            <span className="size-2.5 rounded-full bg-muted-foreground/30" />
          </span>
          <span className="font-mono text-xs font-semibold tracking-wider text-foreground uppercase">
            SipLink Connected Workspace
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px]">
          <span className="flex size-2 relative">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/60 motion-reduce:animate-none" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
          <span className="text-muted-foreground">Ecosystem Online</span>
          <Badge variant="outline" className="ml-1 border-primary/30 font-mono text-[9px] text-primary">
            MOS 4.41 · 11ms
          </Badge>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {/* Row 1: Multi-Endpoint Presence (No longer limited to a deskphone) */}
        <div>
          <div className="flex items-center justify-between pb-2">
            <span className="font-mono text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
              Any Device · Anywhere · One Number
            </span>
            <span className="text-[11px] text-muted-foreground">Simultaneous Ring</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {ENDPOINTS.map((ep) => {
              const Icon = ep.icon;
              const isSelected = ep.id === activeEndpoint;
              return (
                <button
                  key={ep.id}
                  type="button"
                  onClick={() => setActiveEndpoint(ep.id)}
                  className={cn(
                    "group relative flex flex-col items-center rounded-xl border p-3 text-center transition-all duration-200",
                    isSelected
                      ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary/40"
                      : "border-border/70 bg-background/60 hover:border-border hover:bg-muted/30",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-9 items-center justify-center rounded-lg transition-colors",
                      isSelected
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground group-hover:text-foreground",
                    )}
                  >
                    <Icon className="size-4.5" />
                  </span>

                  <span className="mt-2 text-xs font-semibold text-foreground">
                    {ep.label}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {ep.location}
                  </span>

                  <Badge
                    variant={isSelected ? "default" : "secondary"}
                    className="mt-2 font-mono text-[8.5px] px-1.5 py-0"
                  >
                    {ep.status}
                  </Badge>
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 2: Live Conversation & Instant Response Console */}
        <div className="grid gap-4 sm:grid-cols-12">
          {/* Active Call Panel (7 cols) */}
          <div className="rounded-xl border border-border/80 bg-background p-4 shadow-sm sm:col-span-7">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <PhoneCall className="size-3.5" />
                </span>
                <div>
                  <span className="block text-xs font-semibold text-foreground">
                    Active Customer Conversation
                  </span>
                  <span className="block font-mono text-[10px] text-muted-foreground">
                    Routed to {ENDPOINTS.find((e) => e.id === activeEndpoint)?.label}
                  </span>
                </div>
              </div>
              <Badge className="bg-primary/15 font-mono text-xs text-primary hover:bg-primary/20">
                04:12
              </Badge>
            </div>

            {/* Audio Waveform visualizer */}
            <div className="mt-4 rounded-lg bg-muted/30 p-3">
              <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Volume2 className="size-3.5 text-primary" />
                  <span>HD Voice (Opus)</span>
                </span>
                <span className="font-mono text-[10px] text-primary">
                  SRTP Media Encrypted
                </span>
              </div>

              <div className="mt-2.5 flex items-center justify-between gap-1 h-8 px-1">
                {[35, 60, 45, 90, 75, 40, 100, 85, 30, 70, 95, 65, 45, 80, 60, 90, 50, 75, 40, 65].map(
                  (val, idx) => (
                    <span
                      key={idx}
                      className="w-1 rounded-full bg-primary/80 transition-all duration-300"
                      style={{ height: `${Math.max(6, val * 0.28)}px` }}
                    />
                  ),
                )}
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
              <div className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Mic className="size-3 text-primary" />
                  <span>Recording</span>
                </span>
                <span>•</span>
                <span>Latency: 11ms</span>
                <span>•</span>
                <span>Loss: 0.0%</span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="rounded-md border border-border px-2 py-1 text-[11px] text-muted-foreground">
                  Transfer
                </span>
                <span className="rounded-md border border-border px-2 py-1 text-[11px] text-muted-foreground">
                  Hold
                </span>
                <span className="rounded-md bg-primary/10 px-2 py-1 text-[11px] font-medium text-primary">
                  Conference
                </span>
              </div>
            </div>
          </div>

          {/* Connected CRM & Workflow Integration (5 cols) */}
          <div className="flex flex-col justify-between rounded-xl border border-primary/20 bg-primary/5 p-4 sm:col-span-5">
            <div>
              <div className="flex items-center justify-between border-b border-primary/20 pb-2.5">
                <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold text-primary uppercase">
                  <Puzzle className="size-3.5" />
                  <span>CRM Screen Pop</span>
                </div>
                <Badge variant="outline" className="border-primary/30 font-mono text-[9px] text-primary">
                  Salesforce
                </Badge>
              </div>

              <div className="mt-3 space-y-2 text-xs">
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase">Caller Identity</span>
                  <p className="font-semibold text-foreground">David Chen — Director</p>
                  <p className="font-mono text-[10px] text-muted-foreground">Apex Logistics Ltd · +1 415 555-0192</p>
                </div>

                <div className="rounded-lg border border-border/80 bg-background/80 p-2 text-[11px]">
                  <span className="font-medium text-foreground">Automated Interaction Sync:</span>
                  <p className="mt-0.5 text-muted-foreground text-[10px]">
                    Call record, duration, and audio transcript logged to Salesforce account timeline.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-primary/20 pt-2 text-[10px] font-mono text-muted-foreground">
              <span>Ticket: #CS-8921</span>
              <span className="text-primary">Status: In Progress</span>
            </div>
          </div>
        </div>

        {/* Row 3: Omnichannel Workflow Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/70 bg-muted/20 p-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] font-semibold text-muted-foreground uppercase">
              Omnichannel Sync:
            </span>
            <div className="flex items-center gap-1.5">
              <span className="flex items-center gap-1 rounded-md bg-background px-2 py-1 text-foreground shadow-xs">
                <Phone className="size-3 text-primary" />
                <span>Cloud Voice</span>
              </span>
              <span className="flex items-center gap-1 rounded-md bg-background px-2 py-1 text-foreground shadow-xs">
                <MessageSquare className="size-3 text-primary" />
                <span>Business SMS</span>
              </span>
              <span className="flex items-center gap-1 rounded-md bg-background px-2 py-1 text-foreground shadow-xs">
                <MessageCircle className="size-3 text-primary" />
                <span>WhatsApp API</span>
              </span>
            </div>
          </div>

          <span className="font-mono text-[10px] text-muted-foreground">
            Zero On-Premise PBX Hardware Required
          </span>
        </div>
      </div>
    </div>
  );
}
