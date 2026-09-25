"use client";

import {
  BatteryFull,
  Check,
  ChevronDown,
  Contact,
  UserSearch,
  Mail,
  MessageSquareText,
  Mic,
  MicOff,
  MousePointer2,
  Phone,
  PhoneCall,
  PhoneOff,
  PhoneOutgoing,
  Settings,
  Signal,
  Sparkles,
  Video,
  Wifi,
  type LucideIcon,
} from "lucide-react";

import {
  Control,
  Joint,
  Layer,
  Portrait,
  Scene,
  ScenePill,
  Wave,
  clock,
  useSceneClock,
} from "@/components/site/scene-kit";
import { cn } from "@/lib/utils";

/**
 * Streamlined outbound calling, as a rep working down a lead list.
 *
 * Replaces the static render of the same composition. The still image showed
 * one call mid-way; the scene shows the rhythm the capability is about — one
 * click dials the next synced lead, pre-call research is already on screen,
 * the call moves from dialling to speaking, and the outcome logs itself
 * before the next lead comes up. No typing, no copying numbers.
 *
 * Stage, parallax and wiring come from scene-kit. The leads are the
 * customers who appear across the rest of this page.
 */

const ASSETS = "/solns-salesTeam/scene";

type Lead = {
  name: string;
  company: string;
  photo: string;
  research: { icon: LucideIcon; label: string; value: string }[];
  outcome: string;
};

const LEADS: Lead[] = [
  {
    name: "Priya Sharma",
    company: "Sunrise Logistics",
    photo: `${ASSETS}/priya.webp`,
    research: [
      {
        icon: Mail,
        label: "Recent interaction",
        value: "Opened pricing email",
      },
      { icon: UserSearch, label: "LinkedIn profile", value: "Viewed 1h ago" },
    ],
    outcome: "Follow up",
  },
  {
    name: "Rahul Mehta",
    company: "Global Traders",
    photo: `${ASSETS}/rahul.webp`,
    research: [
      { icon: Mail, label: "Recent interaction", value: "Replied to intro" },
      { icon: UserSearch, label: "LinkedIn profile", value: "Viewed today" },
    ],
    outcome: "Demo booked",
  },
  {
    name: "Neha Kapoor",
    company: "BrightPath Health",
    photo: `${ASSETS}/neha.webp`,
    research: [
      { icon: Mail, label: "Recent interaction", value: "Joined webinar" },
      {
        icon: UserSearch,
        label: "LinkedIn profile",
        value: "Viewed yesterday",
      },
    ],
    outcome: "Send proposal",
  },
];

/** One call: click, ring, talk, log. */
type Stage = "dialling" | "ringing" | "speaking" | "logged";
const STAGES: { stage: Stage; seconds: number }[] = [
  { stage: "dialling", seconds: 1 },
  { stage: "ringing", seconds: 1 },
  { stage: "speaking", seconds: 3 },
  { stage: "logged", seconds: 1 },
];
const CALL_S = STAGES.reduce((sum, { seconds }) => sum + seconds, 0);

const STEPS: { stage: Stage; label: string; icon: LucideIcon }[] = [
  { stage: "dialling", label: "Dialling", icon: PhoneOutgoing },
  { stage: "ringing", label: "Connecting", icon: PhoneCall },
  { stage: "speaking", label: "Speaking", icon: Mic },
];

function stageAt(second: number) {
  let left = second;
  for (const { stage, seconds } of STAGES) {
    if (left < seconds) return { stage, into: left };
    left -= seconds;
  }
  return { stage: "logged" as Stage, into: 0 };
}

export function OutboundScene({ label }: { label: string }) {
  const { ref, still, t } = useSceneClock();

  // Reduced motion rests on the first call, mid-conversation.
  const inLoop = t % (CALL_S * LEADS.length);
  const index = still ? 0 : Math.floor(inLoop / CALL_S);
  const { stage, into } = still
    ? { stage: "speaking" as Stage, into: 2 }
    : stageAt(inLoop % CALL_S);
  const lead = LEADS[index];
  const talking = stage === "speaking";
  const elapsed = talking ? into + 1 : stage === "logged" ? 3 : 0;

  const stepIndex = STEPS.findIndex((step) => step.stage === stage);

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[1600/930]"
      wires={[
        { from: "leads", to: "phone-in", lit: stage === "dialling" },
        { from: "step-speaking", to: "phone-top", lit: talking },
        { from: "research", to: "phone-side", lit: stage !== "logged" },
        { from: "phone-log", to: "autolog", lit: stage === "logged" },
      ]}
    >
      {/* Dialling → connecting → speaking */}
      <Layer className="top-[4%] left-[29%] w-[42%]" depth={0.5} order={20}>
        <div className="flex items-start justify-between">
          {STEPS.map(({ stage: step, label: text, icon: Icon }, i) => {
            const on = i === stepIndex;
            const past = stepIndex > i || stage === "logged";
            return (
              <div key={step} className="flex items-center gap-[1.2cqw]">
                {i > 0 ? (
                  <span
                    className={cn(
                      "mb-[2.2cqw] h-[0.2cqw] w-[4cqw] rounded-full transition-colors duration-500",
                      past || on ? "bg-primary/60" : "bg-border",
                    )}
                  />
                ) : null}
                <span className="relative flex flex-col items-center gap-[0.5cqw]">
                  <span
                    className={cn(
                      "flex size-[5.2cqw] items-center justify-center rounded-full border-[0.35cqw] bg-card shadow-md transition-[border-color,box-shadow,color] duration-500",
                      on
                        ? "glass-tile-lit border-primary text-primary"
                        : past
                          ? "border-primary/40 text-primary/70"
                          : "border-border text-muted-foreground",
                      on && step !== "speaking" && "ring-pulse",
                    )}
                  >
                    <Icon className="size-[40%]" />
                  </span>
                  <span
                    className={cn(
                      "text-[0.95cqw] font-semibold tracking-wide uppercase transition-colors duration-500",
                      on ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {text}
                  </span>
                  {step === "speaking" ? (
                    <Joint
                      id="step-speaking"
                      side="b"
                      left="50%"
                      top="calc(100% + 0.9cqw)"
                      lit={on}
                    />
                  ) : null}
                </span>
              </div>
            );
          })}
        </div>
      </Layer>

      {/* The lead list */}
      <Layer
        className="top-[52%] left-[13%] w-[21%]"
        depth={0.8}
        order={30}
        active={stage === "dialling"}
        joints={[{ id: "leads", side: "r", left: "100%", top: "30%" }]}
        lit={stage === "dialling"}
      >
        <div className="flex flex-col gap-[0.5cqw] rounded-[1.2cqw] border border-border bg-card p-[0.9cqw] shadow-lg shadow-primary/15">
          <span className="flex items-center gap-[0.4cqw] px-[0.3cqw] text-[0.8cqw] font-semibold tracking-wide uppercase">
            <Contact className="size-[0.9cqw] text-primary" />
            CRM synced leads
          </span>
          {LEADS.map((row, i) => {
            const current = i === index;
            const done = i < index || (current && stage === "logged");
            return (
              <span
                key={row.name}
                className={cn(
                  "relative flex items-center gap-[0.6cqw] rounded-[0.7cqw] px-[0.5cqw] py-[0.45cqw] transition-colors duration-500",
                  current && !done ? "bg-accent" : "",
                )}
              >
                <Portrait src={row.photo} className="w-[2.2cqw]" />
                <span className="flex min-w-0 flex-col leading-tight">
                  <span className="text-[0.85cqw] font-semibold">
                    {row.name}
                  </span>
                  <span className="text-[0.68cqw] text-muted-foreground">
                    {row.company}
                  </span>
                </span>
                <span className="ml-auto">
                  {done ? (
                    <span className="flex items-center gap-[0.25cqw] rounded-full bg-accent px-[0.5cqw] py-[0.15cqw] text-[0.62cqw] font-medium text-accent-foreground">
                      <Check className="size-[0.7cqw]" />
                      Logged
                    </span>
                  ) : (
                    <span
                      className={cn(
                        "flex size-[1.8cqw] items-center justify-center rounded-full transition-colors duration-300",
                        current
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      <Phone className="size-1/2" />
                    </span>
                  )}
                </span>
                {/* The one click. */}
                {current && stage === "dialling" ? (
                  <MousePointer2 className="absolute right-[0.1cqw] -bottom-[0.9cqw] size-[1.4cqw] fill-card text-foreground" />
                ) : null}
              </span>
            );
          })}
        </div>
        <ScenePill
          icon={PhoneOutgoing}
          label="One-click dial"
          className="absolute -bottom-[2.6cqw] left-[1.2cqw]"
        />
      </Layer>

      {/* Pre-call research, for whoever is being dialled */}
      <Layer
        className="top-[36%] left-[66%] w-[21%]"
        depth={0.75}
        order={30}
        joints={[{ id: "research", side: "l", left: "0%", top: "30%" }]}
        lit={stage !== "logged"}
      >
        <div className="flex flex-col gap-[0.5cqw] rounded-[1.2cqw] border border-border bg-card p-[0.9cqw] shadow-lg shadow-primary/15">
          <span className="px-[0.2cqw] text-[0.8cqw] font-semibold tracking-wide uppercase">
            Pre-call research
          </span>
          {lead.research.map(({ icon: Icon, label: what, value }) => (
            <span
              key={what}
              className="flex items-center gap-[0.6cqw] rounded-[0.7cqw] bg-muted/60 px-[0.6cqw] py-[0.5cqw] ring-1 ring-border"
            >
              <span className="flex size-[2cqw] items-center justify-center rounded-[0.5cqw] bg-card text-foreground/70 ring-1 ring-border">
                <Icon className="size-1/2" />
              </span>
              <span className="flex min-w-0 flex-col leading-tight">
                <span className="text-[0.6cqw] tracking-wide text-muted-foreground uppercase">
                  {what}
                </span>
                <span className="text-[0.8cqw] font-medium">{value}</span>
              </span>
            </span>
          ))}
        </div>
        <ScenePill
          icon={Sparkles}
          label="Quick insights"
          className="absolute -bottom-[2.4cqw] right-[0.6cqw]"
        />
      </Layer>

      <Layer
        className="top-[27%] left-[16%] w-[13%]"
        depth={0.9}
        order={30}
        joints={[{ id: "autolog", side: "r", left: "100%", top: "50%" }]}
        lit={stage === "logged"}
      >
        <ScenePill
          icon={MessageSquareText}
          label="Auto-logging"
          active={stage === "logged"}
        />
      </Layer>

      {/* The phone */}
      <Layer
        className="top-[30%] left-[41%] w-[16%]"
        depth={0.6}
        order={40}
        glow={talking}
        joints={[
          { id: "phone-in", side: "l", left: "0%", top: "62%" },
          { id: "phone-log", side: "l", left: "0%", top: "22%" },
          { id: "phone-top", side: "t", left: "80%", top: "0%" },
          { id: "phone-side", side: "r", left: "100%", top: "30%" },
        ]}
        lit
      >
        <Handset lead={lead} stage={stage} elapsed={elapsed} />
      </Layer>
    </Scene>
  );
}

function Handset({
  lead,
  stage,
  elapsed,
}: {
  lead: Lead;
  stage: Stage;
  elapsed: number;
}) {
  const talking = stage === "speaking";
  const logged = stage === "logged";

  const status: Record<Stage, string> = {
    dialling: "Dialling…",
    ringing: "Ringing…",
    speaking: "On call",
    logged: "Call ended",
  };

  return (
    <div className="rounded-[2.2cqw] bg-foreground/90 p-[0.45cqw] shadow-2xl shadow-primary/25">
      <div className="relative flex aspect-[9/18.5] flex-col overflow-hidden rounded-[1.8cqw] bg-muted">
        <span className="flex items-center justify-between px-[1.1cqw] pt-[0.55cqw] text-[0.65cqw] font-semibold">
          9:41
          <span className="flex items-center gap-[0.2cqw]">
            <Signal className="size-[0.7cqw]" />
            <Wifi className="size-[0.7cqw]" />
            <BatteryFull className="size-[0.8cqw]" />
          </span>
        </span>
        <span className="absolute top-[0.45cqw] left-1/2 h-[0.95cqw] w-[32%] -translate-x-1/2 rounded-full bg-foreground" />
        <span className="mt-[0.8cqw] text-center text-[0.72cqw] font-semibold tracking-wide uppercase">
          Outbound calling
        </span>

        <div className="mx-[0.7cqw] mt-[0.7cqw] flex flex-col rounded-[0.9cqw] bg-card shadow-sm ring-1 ring-border">
          <span className="flex items-center justify-between border-b border-border px-[0.7cqw] py-[0.45cqw] text-[0.6cqw] font-semibold tracking-wide uppercase">
            <span
              className={talking ? "text-primary" : "text-muted-foreground"}
            >
              {status[stage]}
            </span>
            <span className="rounded-full bg-accent px-[0.45cqw] text-accent-foreground">
              {logged ? "Logged" : "Ready"}
            </span>
          </span>
          <div className="flex flex-col items-center gap-[0.35cqw] px-[0.7cqw] py-[0.8cqw]">
            <span className="text-[0.58cqw] tracking-wide text-muted-foreground uppercase">
              {talking ? "Speaking with prospect" : "Calling prospect"}
            </span>
            <Portrait
              src={lead.photo}
              ringing={stage === "ringing"}
              className="w-[3.2cqw]"
            />
            <span className="text-[1cqw] font-semibold">{lead.name}</span>
            <span className="text-[0.68cqw] text-muted-foreground">
              {lead.company}
            </span>
            <span className="mt-[0.3cqw] flex h-[1.5cqw] items-center gap-[0.4cqw] text-[1cqw] font-medium tabular-nums">
              {talking ? <Wave /> : null}
              {clock(elapsed)}
            </span>
            <div className="mt-[0.3cqw] flex items-center gap-[0.7cqw]">
              <Control icon={MicOff} className="w-[2cqw]" />
              <Control
                icon={logged ? Phone : PhoneOff}
                hangup
                className="w-[2.6cqw]"
              />
              <Control icon={Video} className="w-[2cqw]" />
            </div>
          </div>
        </div>

        <div className="mx-[0.7cqw] mt-[0.6cqw] flex flex-col gap-[0.35cqw] rounded-[0.9cqw] bg-card px-[0.7cqw] py-[0.55cqw] shadow-sm ring-1 ring-border">
          <span className="text-[0.58cqw] font-semibold tracking-wide uppercase">
            Disposition
          </span>
          <span
            className={cn(
              "flex items-center justify-between rounded-[0.45cqw] px-[0.5cqw] py-[0.3cqw] text-[0.72cqw] ring-1 transition-colors duration-300",
              logged
                ? "bg-accent font-medium text-accent-foreground ring-primary/30"
                : "text-muted-foreground ring-border",
            )}
          >
            {logged ? lead.outcome : "Select outcome"}
            <ChevronDown className="size-[0.75cqw]" />
          </span>
        </div>

        <div className="mt-auto flex justify-around border-t border-border bg-card px-[0.7cqw] pt-[0.45cqw] pb-[0.9cqw] text-[0.5cqw] text-muted-foreground">
          {[
            { icon: Phone, text: "Calls", on: true },
            { icon: Contact, text: "Leads" },
            { icon: Settings, text: "Settings" },
          ].map(({ icon: Icon, text, on }) => (
            <span
              key={text}
              className={cn(
                "flex flex-col items-center gap-[0.15cqw]",
                on && "text-primary",
              )}
            >
              <Icon className="size-[0.85cqw]" />
              {text}
            </span>
          ))}
        </div>
        <span className="absolute bottom-[0.35cqw] left-1/2 h-[0.25cqw] w-[36%] -translate-x-1/2 rounded-full bg-foreground/80" />
      </div>
    </div>
  );
}
