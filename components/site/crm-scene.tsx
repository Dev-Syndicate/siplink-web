"use client";

import type { ReactNode } from "react";
import {
  ArrowRightLeft,
  Building2,
  Check,
  ChevronDown,
  ChevronRight,
  FileText,
  Grid3x3,
  Mail,
  MapPin,
  Mic,
  MoreVertical,
  Pause,
  Pencil,
  Phone,
  PhoneIncoming,
  PhoneOff,
  Plus,
  SquareCheck,
  User,
  Volume2,
  type LucideIcon,
} from "lucide-react";

import {
  Control,
  Layer,
  Portrait,
  Scene,
  Wave,
  clock,
  useSceneClock,
} from "@/components/site/scene-kit";
import { cn } from "@/lib/utils";

/**
 * CRM integration, as a call writing itself into the customer's record.
 *
 * Replaces the static render of the same composition. The still image showed
 * a call beside a CRM record; the scene shows the connection — while the call
 * runs the record is already open, and when it ends the call, its summary
 * and the follow-up land in the activity feed and the deal moves on, with
 * nobody typing any of it in.
 *
 * Stage, parallax and wiring come from scene-kit. The customer and her
 * record are the same as on the rest of this page.
 */

const ASSETS = "/solns-salesTeam/scene";
const TEAM_ASSETS = "/solns-remoteWorkforce/scene";

const KRISTINE = {
  name: "Kristine Yee",
  phone: "+1 (415) 555-0132",
  email: "kristine@acmeretail.com",
  company: "Acme Retail",
  photo: `${ASSETS}/kristine.webp`,
};

/** 0–5 on the call, 6 it ends and logs, 7 note, 8 deal moves, 9–11 hold. */
const CALL_S = 6;
const LOOP_S = 12;

const STAGES = ["Qualification", "Proposal", "Negotiation", "Closed"];

type Entry = {
  icon: LucideIcon;
  title: string;
  when: string;
  body: string;
  who: string;
};

const HISTORY: Entry[] = [
  {
    icon: Mail,
    title: "Email sent",
    when: "Yesterday, 4:12 PM",
    body: "Sent proposal deck and case study.",
    who: `${TEAM_ASSETS}/team-aarushi.webp`,
  },
  {
    icon: SquareCheck,
    title: "Task created",
    when: "Yesterday, 3:20 PM",
    body: "Follow up for demo scheduling.",
    who: `${TEAM_ASSETS}/team-william.webp`,
  },
];

export function CrmScene({ label }: { label: string }) {
  const { ref, still, t } = useSceneClock();

  // Reduced motion rests with the call logged and the deal moved on.
  const s = still ? LOOP_S - 1 : t % LOOP_S;
  const onCall = s < CALL_S;
  const logged = s >= CALL_S;
  const noted = s >= CALL_S + 1;
  const moved = s >= CALL_S + 2;
  const elapsed = onCall ? s + 1 : CALL_S;

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[1600/740]"
      wires={[{ from: "call", to: "record", lit: true }]}
    >
      <Layer
        className="top-[20%] left-[4%] w-[22%]"
        depth={0.85}
        order={30}
        active={onCall}
        glow={onCall}
        joints={[{ id: "call", side: "t", left: "55%", top: "0%" }]}
        lit
      >
        <CallCard onCall={onCall} elapsed={elapsed} />
      </Layer>

      <Layer
        className="top-[5%] left-[27%] w-[70%]"
        depth={0.35}
        order={10}
        joints={[{ id: "record", side: "l", left: "0%", top: "11%" }]}
        lit
      >
        <Record logged={logged} noted={noted} moved={moved} />
      </Layer>
    </Scene>
  );
}

function CallCard({ onCall, elapsed }: { onCall: boolean; elapsed: number }) {
  return (
    <div className="flex flex-col items-center gap-[0.6cqw] rounded-[1.6cqw] border border-border bg-card px-[1.2cqw] py-[1.6cqw] shadow-xl shadow-primary/20">
      <Portrait src={KRISTINE.photo} halo className="w-[7.4cqw]" />
      <span className="text-[1.3cqw] font-semibold">{KRISTINE.name}</span>
      <span className="text-[0.85cqw] text-muted-foreground tabular-nums">
        {KRISTINE.phone}
      </span>
      <span
        className={cn(
          "flex h-[1.6cqw] items-center gap-[0.4cqw] text-[0.95cqw] tabular-nums",
          onCall ? "text-foreground" : "font-medium text-primary",
        )}
      >
        {onCall ? (
          <>
            <Wave />
            {clock(elapsed)}
          </>
        ) : (
          <>
            <Check className="size-[1cqw]" />
            Call logged
          </>
        )}
      </span>
      <div className="mt-[0.4cqw] grid grid-cols-3 gap-[0.9cqw]">
        {[Mic, Grid3x3, Volume2, Plus, Pause, ArrowRightLeft].map((Icon, i) => (
          <Control key={i} icon={Icon} className="w-[2.8cqw]" />
        ))}
      </div>
      <Control
        icon={onCall ? PhoneOff : Phone}
        hangup
        className="mt-[0.4cqw] w-[3.6cqw]"
      />
    </div>
  );
}

function Record({
  logged,
  noted,
  moved,
}: {
  logged: boolean;
  noted: boolean;
  moved: boolean;
}) {
  const stage = moved ? 1 : 0;

  return (
    <div className="relative flex flex-col gap-[1cqw] rounded-[1.6cqw] border border-border bg-card p-[1.5cqw] shadow-2xl shadow-primary/15">
      {/* Header */}
      <span className="flex items-start gap-[1.1cqw]">
        <Portrait src={KRISTINE.photo} className="w-[5cqw]" />
        <span className="flex flex-col gap-[0.5cqw]">
          <span className="flex items-center gap-[0.6cqw]">
            <span className="text-[1.5cqw] font-semibold">{KRISTINE.name}</span>
            <span className="rounded-[0.4cqw] bg-accent px-[0.5cqw] py-[0.1cqw] text-[0.75cqw] font-medium text-accent-foreground">
              Lead
            </span>
            <span className="rounded-[0.4cqw] bg-muted px-[0.5cqw] py-[0.1cqw] text-[0.75cqw]">
              Retail
            </span>
          </span>
          <span className="flex items-center gap-[1.4cqw] text-[0.8cqw] text-muted-foreground">
            <span className="tabular-nums">{KRISTINE.phone}</span>
            <span className="flex items-center gap-[0.35cqw]">
              <Mail className="size-[0.9cqw]" />
              {KRISTINE.email}
            </span>
            <span className="flex items-center gap-[0.35cqw]">
              <Building2 className="size-[0.9cqw]" />
              {KRISTINE.company}
            </span>
          </span>
        </span>
        <span className="ml-auto flex items-center gap-[0.4cqw] rounded-[0.7cqw] bg-primary px-[1cqw] py-[0.55cqw] text-[0.85cqw] font-medium text-primary-foreground shadow-md shadow-primary/30">
          <Plus className="size-[0.95cqw]" />
          Create deal
        </span>
        <MoreVertical className="size-[1.1cqw] text-muted-foreground" />
      </span>

      <span className="flex gap-[1.8cqw] border-b border-border text-[0.85cqw]">
        {[
          "Overview",
          "Conversations",
          "Deals",
          "Tasks",
          "Notes",
          "Activity",
        ].map((tab, i) => (
          <span
            key={tab}
            className={cn(
              "-mb-px border-b-2 pb-[0.5cqw]",
              i === 0
                ? "border-primary font-semibold text-primary"
                : "border-transparent text-muted-foreground",
            )}
          >
            {tab}
          </span>
        ))}
      </span>

      <div className="grid grid-cols-[1fr_1.15fr] gap-[1.1cqw]">
        <div className="flex flex-col gap-[1.1cqw]">
          {/* Contact details */}
          <div className="flex flex-col gap-[0.6cqw] rounded-[1cqw] p-[1cqw] ring-1 ring-border">
            <span className="flex items-center justify-between">
              <span className="text-[1cqw] font-semibold">Contact details</span>
              <span className="flex items-center gap-[0.3cqw] rounded-[0.4cqw] px-[0.5cqw] py-[0.2cqw] text-[0.7cqw] ring-1 ring-border">
                <Pencil className="size-[0.7cqw]" />
                Edit
              </span>
            </span>
            {[
              { icon: User, k: "Name", v: KRISTINE.name },
              { icon: Phone, k: "Phone", v: KRISTINE.phone },
              { icon: Mail, k: "Email", v: KRISTINE.email },
              { icon: Building2, k: "Company", v: KRISTINE.company },
              { icon: MapPin, k: "Location", v: "New York, USA" },
            ].map(({ icon: Icon, k, v }) => (
              <span
                key={k}
                className="grid grid-cols-[1.2cqw_5cqw_1fr] items-center gap-[0.5cqw] text-[0.78cqw]"
              >
                <Icon className="size-[0.9cqw] text-muted-foreground" />
                <span className="text-muted-foreground">{k}</span>
                <span className="truncate">{v}</span>
              </span>
            ))}
          </div>

          {/* Deal */}
          <div className="flex flex-col gap-[0.8cqw] rounded-[1cqw] p-[1cqw] ring-1 ring-border">
            <span className="text-[1cqw] font-semibold">Deals</span>
            <span className="relative flex justify-between">
              <span className="absolute top-[0.55cqw] right-[2cqw] left-[2cqw] h-[0.15cqw] bg-border" />
              <span
                className="absolute top-[0.55cqw] left-[2cqw] h-[0.15cqw] bg-primary transition-[width] duration-700"
                style={{ width: moved ? "calc(33% - 1.3cqw)" : "0%" }}
              />
              {STAGES.map((name, i) => (
                <span
                  key={name}
                  className="relative flex w-[4cqw] flex-col items-center gap-[0.35cqw]"
                >
                  <span
                    className={cn(
                      "size-[1.25cqw] rounded-full border-[0.3cqw] transition-colors duration-500",
                      i <= stage
                        ? "border-primary bg-card"
                        : "border-border bg-muted",
                      i === stage && "ring-pulse",
                    )}
                  />
                  <span
                    className={cn(
                      "text-[0.68cqw] whitespace-nowrap",
                      i === stage
                        ? "font-semibold text-primary"
                        : "text-muted-foreground",
                    )}
                  >
                    {name}
                  </span>
                </span>
              ))}
            </span>
            <span className="flex items-center justify-between rounded-[0.7cqw] px-[0.8cqw] py-[0.6cqw] ring-1 ring-border">
              <span className="flex flex-col leading-tight">
                <span className="text-[0.85cqw] font-semibold">
                  Retail expansion plan
                </span>
                <span className="text-[0.75cqw] text-muted-foreground tabular-nums">
                  $24,000
                </span>
              </span>
              <span className="flex items-center gap-[0.4cqw]">
                <span className="rounded-full bg-accent px-[0.6cqw] py-[0.15cqw] text-[0.68cqw] font-medium text-accent-foreground">
                  {moved ? "Proposal sent" : "In progress"}
                </span>
                <ChevronRight className="size-[0.9cqw] text-muted-foreground" />
              </span>
            </span>
          </div>
        </div>

        {/* Activity */}
        <div className="flex flex-col gap-[0.7cqw] rounded-[1cqw] p-[1cqw] ring-1 ring-border">
          <span className="flex items-center justify-between">
            <span className="text-[1cqw] font-semibold">Recent activity</span>
            <span className="flex items-center gap-[0.3cqw] rounded-[0.4cqw] bg-muted px-[0.5cqw] py-[0.2cqw] text-[0.7cqw]">
              All activity
              <ChevronDown className="size-[0.7cqw]" />
            </span>
          </span>
          <Reveal on={noted}>
            <Activity
              icon={FileText}
              title="Note added"
              when="Just now"
              body="Wants a demo next week; send revised pricing."
              who={`${TEAM_ASSETS}/team-aarushi.webp`}
              fresh
            />
          </Reveal>
          <Reveal on={logged}>
            <Activity
              icon={PhoneIncoming}
              title="Inbound call · 6 min"
              when="Just now"
              body="Discussed the retail expansion plan and next steps."
              who={`${TEAM_ASSETS}/team-aarushi.webp`}
              fresh
            />
          </Reveal>
          {HISTORY.slice(0, noted ? 1 : 2).map((entry) => (
            <Activity key={entry.title} {...entry} />
          ))}
        </div>
      </div>

      {/* Sync confirmation */}
      <span
        className={cn(
          "absolute right-[1.5cqw] bottom-[1.5cqw] flex items-center gap-[0.4cqw] rounded-full bg-foreground px-[0.9cqw] py-[0.45cqw] text-[0.78cqw] font-medium text-background shadow-lg transition-[opacity,translate]",
          logged
            ? "opacity-100 duration-300"
            : "translate-y-[0.5cqw] opacity-0 duration-0",
        )}
      >
        <Check className="size-[0.85cqw] text-primary" />
        Synced to CRM
      </span>
    </div>
  );
}

/** Opens a row rather than popping one in, so the feed visibly grows. */
function Reveal({ on, children }: { on: boolean; children: ReactNode }) {
  return (
    <div
      className={cn(
        "grid transition-[grid-template-rows,opacity] duration-500",
        on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
      )}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}

function Activity({
  icon: Icon,
  title,
  when,
  body,
  who,
  fresh,
}: Entry & { fresh?: boolean }) {
  return (
    <span
      className={cn(
        "flex items-start gap-[0.8cqw] rounded-[0.8cqw] p-[0.6cqw] transition-colors duration-500",
        fresh && "bg-accent",
      )}
    >
      <span className="flex size-[2.4cqw] shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="size-[45%]" />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-[0.15cqw] leading-tight">
        <span className="text-[0.85cqw] font-semibold">{title}</span>
        <span className="text-[0.68cqw] text-muted-foreground">{when}</span>
        <span className="mt-[0.2cqw] text-[0.75cqw] leading-snug text-muted-foreground">
          {body}
        </span>
      </span>
      <Portrait src={who} className="w-[2cqw]" />
    </span>
  );
}
