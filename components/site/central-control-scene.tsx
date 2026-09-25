"use client";

import type { CSSProperties } from "react";
import {
  Activity,
  BarChart3,
  Bell,
  Check,
  ChevronRight,
  Clock,
  Hash,
  LayoutDashboard,
  MoreVertical,
  PhoneCall,
  PhoneIncoming,
  Search,
  Settings,
  ShieldCheck,
  Shuffle,
  Smartphone,
  UserPlus,
  Users,
  Voicemail,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import {
  Joint,
  Layer,
  Portrait,
  Scene,
  useSceneClock,
  type JointSpec,
} from "@/components/site/scene-kit";
import { cn } from "@/lib/utils";

/**
 * Centralised control, as one admin changing things from one portal.
 *
 * Replaces the static render of the same composition. The still image laid
 * the admin dashboard beside user, routing and presence panels; the scene
 * shows the dashboard driving them. Each beat is one change made in the
 * portal — add a user, switch routing to after hours, clear a status — and
 * the panel it touches updates while its wire lights, along with the
 * dashboard's counters and activity feed.
 *
 * Stage, parallax and wiring come from scene-kit. The portraits are cut from
 * the original renders, so the team is the same one as on the rest of this
 * page.
 */

const ASSETS = "/solns-remoteWorkforce/scene";

type Action = "provision" | "routing" | "presence";

const ACTIONS: Action[] = ["provision", "routing", "presence"];
const ACTION_S = 4;

const ACTION_COPY: Record<
  Action,
  { nav: string; toast: string; event: string; who: string }
> = {
  provision: {
    nav: "Users",
    toast: "User added",
    event: "Added to Sales team",
    who: "Priya Shah",
  },
  routing: {
    nav: "Call routing",
    toast: "Routing saved",
    event: "After-hours routing on",
    who: "Main line",
  },
  presence: {
    nav: "Teams",
    toast: "Status synced",
    event: "Now available",
    who: "William Meek",
  },
};

const PEOPLE = {
  aarushi: { name: "Aarushi Peri", photo: `${ASSETS}/team-aarushi.webp` },
  william: { name: "William Meek", photo: `${ASSETS}/team-william.webp` },
  ida: { name: "Ida Jones", photo: `${ASSETS}/team-ida.webp` },
  lei: { name: "Lei Quynh", photo: `${ASSETS}/team-lei.webp` },
  tj: { name: "TJ Woodward", photo: `${ASSETS}/team-tj.webp` },
  priya: { name: "Priya Shah", photo: `${ASSETS}/contact-8.webp` },
};

type Status = "available" | "busy" | "meeting" | "away";

const STATUS: Record<Status, { label: string; dot: string }> = {
  available: { label: "Available", dot: "bg-primary" },
  busy: { label: "On a call", dot: "bg-foreground/70" },
  meeting: { label: "In a meeting", dot: "bg-primary/45" },
  away: { label: "Away", dot: "bg-muted-foreground/40" },
};

/** Tiles, centred on (x%, y%) of the scene. */
const TILES: {
  x: number;
  y: number;
  icon: LucideIcon;
  action: Action;
  delay: string;
  joint: JointSpec;
}[] = [
  {
    x: 72,
    y: 9,
    icon: Settings,
    action: "presence",
    delay: "0s",
    joint: { id: "gear", side: "r", left: "100%", top: "50%" },
  },
  {
    x: 50,
    y: 86,
    icon: UserPlus,
    action: "provision",
    delay: "-3s",
    joint: { id: "user-tile", side: "t", left: "50%", top: "0%" },
  },
  {
    x: 89,
    y: 86,
    icon: Smartphone,
    action: "presence",
    delay: "-1.5s",
    joint: { id: "phone-tile", side: "t", left: "50%", top: "0%" },
  },
];

type ControlState = {
  action: Action;
  /** The change has been made — the first second of a beat is the click. */
  done: boolean;
  added: boolean;
  afterHours: boolean;
  williamFree: boolean;
};

export function CentralControlScene({ label }: { label: string }) {
  const { ref, still, t } = useSceneClock();

  // Reduced motion rests with every change made.
  const inLoop = t % (ACTION_S * ACTIONS.length);
  const index = still ? ACTIONS.length - 1 : Math.floor(inLoop / ACTION_S);
  const done = still || inLoop % ACTION_S >= 1;
  const step = index + (done ? 1 : 0);

  const state: ControlState = {
    action: ACTIONS[index],
    done,
    added: step >= 1,
    afterHours: step >= 2,
    williamFree: step >= 3,
  };

  const lit = (action: Action) => state.action === action;

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[1671/941]"
      wires={[
        { from: "users", to: "portal-users", lit: lit("provision") },
        { from: "user-tile", to: "portal-base", lit: lit("provision") },
        { from: "routing", to: "portal-routing", lit: lit("routing") },
        { from: "portal-team", to: "presence", lit: lit("presence") },
        { from: "gear", to: "presence-top", lit: lit("presence") },
        { from: "phone-tile", to: "presence-base", lit: lit("presence") },
      ]}
    >
      {TILES.map(({ x, y, icon: Icon, action, delay, joint }) => (
        <div
          key={`${x}-${y}`}
          className="parallax absolute z-20 w-[5.5%]"
          style={
            {
              left: `${x}%`,
              top: `${y}%`,
              transform: "translate(-50%, -50%)",
              "--depth": 0.9,
            } as CSSProperties
          }
        >
          <div
            className={cn(
              "glass-tile relative flex aspect-square items-center justify-center rounded-[1.2cqw] text-primary transition-shadow duration-500",
              !still && "card-float",
              lit(action) && "glass-tile-lit",
            )}
            style={{ "--float-delay": delay } as CSSProperties}
          >
            <Icon className="size-[45%]" strokeWidth={1.75} />
            <Joint {...joint} lit={lit(action)} />
          </div>
        </div>
      ))}

      <Layer
        className="top-[3%] left-[2.5%] w-[26%]"
        depth={0.7}
        order={30}
        active={lit("provision") && done}
        joints={[{ id: "users", side: "r", left: "100%", top: "34%" }]}
        lit={lit("provision")}
      >
        <UsersPanel {...state} />
      </Layer>

      <Layer
        className="top-[66%] left-[2.5%] w-[29%]"
        depth={0.8}
        order={30}
        active={lit("routing") && done}
        joints={[{ id: "routing", side: "r", left: "100%", top: "50%" }]}
        lit={lit("routing")}
      >
        <RoutingPanel {...state} />
      </Layer>

      <Layer
        className="top-[11%] left-[33%] w-[37%]"
        depth={0.35}
        order={10}
        joints={[
          { id: "portal-users", side: "l", left: "0%", top: "28%" },
          { id: "portal-routing", side: "l", left: "0%", top: "78%" },
          { id: "portal-team", side: "r", left: "100%", top: "40%" },
          { id: "portal-base", side: "b", left: "50%", top: "100%" },
        ]}
        lit
      >
        <Portal {...state} />
      </Layer>

      <Layer
        className="top-[20%] left-[74%] w-[23%]"
        depth={0.7}
        order={30}
        active={lit("presence") && done}
        joints={[
          { id: "presence", side: "l", left: "0%", top: "40%" },
          { id: "presence-top", side: "t", left: "30%", top: "0%" },
          { id: "presence-base", side: "b", left: "70%", top: "100%" },
        ]}
        lit={lit("presence")}
      >
        <PresencePanel {...state} />
      </Layer>
    </Scene>
  );
}

/* ------------------------------------------------------------- pieces */

function PanelTitle({
  icon: Icon,
  title,
}: {
  icon: LucideIcon;
  title: string;
}) {
  return (
    <span className="flex items-center gap-[0.6cqw] text-[1cqw] font-semibold">
      <span className="flex size-[2cqw] items-center justify-center rounded-[0.6cqw] bg-primary text-primary-foreground">
        <Icon className="size-[55%]" />
      </span>
      {title}
    </span>
  );
}

function Badge({ status }: { status: Status }) {
  return (
    <span className="flex items-center gap-[0.3cqw] rounded-full bg-accent px-[0.55cqw] py-[0.15cqw] text-[0.62cqw] font-medium whitespace-nowrap text-accent-foreground">
      <span
        className={cn(
          "size-[0.5cqw] rounded-full transition-colors duration-500",
          STATUS[status].dot,
        )}
      />
      {STATUS[status].label}
    </span>
  );
}

function UserRow({
  person,
  role,
  status,
  fresh,
}: {
  person: keyof typeof PEOPLE;
  role: string;
  status: Status;
  fresh?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-[0.6cqw] rounded-[0.7cqw] px-[0.6cqw] py-[0.45cqw] ring-1 transition-colors duration-500",
        fresh ? "bg-accent ring-primary/30" : "bg-card/70 ring-border",
      )}
    >
      <Portrait src={PEOPLE[person].photo} className="w-[2.1cqw]" />
      <span className="flex min-w-0 flex-col leading-tight">
        <span className="text-[0.78cqw] font-semibold">
          {PEOPLE[person].name}
        </span>
        <span className="text-[0.62cqw] text-muted-foreground">{role}</span>
      </span>
      <span className="ml-auto">
        {fresh ? (
          <span className="rounded-full bg-primary px-[0.55cqw] py-[0.15cqw] text-[0.62cqw] font-medium text-primary-foreground">
            Invited
          </span>
        ) : (
          <Badge status={status} />
        )}
      </span>
      <MoreVertical className="size-[0.8cqw] shrink-0 text-muted-foreground" />
    </div>
  );
}

function UsersPanel({ action, added, williamFree }: ControlState) {
  const fresh = action === "provision" && added;

  return (
    <div className="glass-panel flex flex-col gap-[0.5cqw] rounded-[1.4cqw] p-[1cqw]">
      <div className="flex items-center justify-between">
        <PanelTitle icon={Users} title="Manage users" />
        <span
          className={cn(
            "flex items-center gap-[0.3cqw] rounded-full px-[0.6cqw] py-[0.25cqw] text-[0.68cqw] font-medium transition-colors duration-300",
            action === "provision" && !added
              ? "bg-primary text-primary-foreground"
              : "bg-accent text-accent-foreground",
          )}
        >
          <UserPlus className="size-[0.75cqw]" />
          Add user
        </span>
      </div>
      <span className="flex items-center gap-[0.5cqw] rounded-full bg-muted px-[0.8cqw] py-[0.4cqw] text-[0.68cqw] text-muted-foreground">
        <Search className="size-[0.8cqw]" />
        Search users…
      </span>
      {/* The new user opens a row rather than appearing in one, so the list
          visibly grows. */}
      <div
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-500",
          added ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <UserRow
            person="priya"
            role="Member · Sales"
            status="available"
            fresh={fresh}
          />
        </div>
      </div>
      <UserRow person="aarushi" role="Admin" status="available" />
      <UserRow
        person="william"
        role="Member"
        status={williamFree ? "available" : "busy"}
      />
      <UserRow person="ida" role="Member" status="busy" />
      <UserRow person="lei" role="Member" status="meeting" />
    </div>
  );
}

function FlowNode({
  icon: Icon,
  title,
  sub,
  on,
}: {
  icon: LucideIcon;
  title: string;
  sub?: string;
  on?: boolean;
}) {
  return (
    <span
      className={cn(
        "flex flex-1 items-center gap-[0.45cqw] rounded-[0.7cqw] px-[0.55cqw] py-[0.55cqw] ring-1 transition-colors duration-500",
        on ? "bg-accent ring-primary/30" : "bg-card/80 ring-border",
      )}
    >
      <span className="flex size-[1.8cqw] shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="size-[55%]" />
      </span>
      <span className="flex min-w-0 flex-col leading-tight">
        <span className="text-[0.7cqw] font-semibold whitespace-nowrap">
          {title}
        </span>
        {sub ? (
          <span className="text-[0.58cqw] whitespace-nowrap text-muted-foreground">
            {sub}
          </span>
        ) : null}
      </span>
    </span>
  );
}

function RoutingPanel({ afterHours, action }: ControlState) {
  const tabs = ["Business hours", "After hours", "Holidays"];
  const current = afterHours ? 1 : 0;
  const changed = action === "routing" && afterHours;

  return (
    <div className="glass-panel flex flex-col gap-[0.7cqw] rounded-[1.4cqw] p-[1cqw]">
      <PanelTitle icon={Workflow} title="Call routing" />
      <span className="flex gap-[1.1cqw] border-b border-border text-[0.7cqw]">
        {tabs.map((tab, i) => (
          <span
            key={tab}
            className={cn(
              "-mb-px border-b-2 pb-[0.4cqw] transition-colors duration-300",
              i === current
                ? "border-primary font-semibold text-primary"
                : "border-transparent text-muted-foreground",
            )}
          >
            {tab}
          </span>
        ))}
      </span>
      <span className="flex items-center gap-[0.4cqw]">
        <FlowNode icon={PhoneIncoming} title="Incoming" />
        <ChevronRight className="size-[0.9cqw] shrink-0 text-primary" />
        {afterHours ? (
          <FlowNode
            icon={Clock}
            title="Hours menu"
            sub="Closed 6pm–8am"
            on={changed}
          />
        ) : (
          <FlowNode icon={Users} title="Main line" sub="Sales team" />
        )}
        <ChevronRight className="size-[0.9cqw] shrink-0 text-primary" />
        {afterHours ? (
          <FlowNode
            icon={Voicemail}
            title="On-call"
            sub="Mobile, then VM"
            on={changed}
          />
        ) : (
          <FlowNode icon={Shuffle} title="Round robin" sub="5 members" />
        )}
      </span>
    </div>
  );
}

function PresencePanel({ williamFree, action }: ControlState) {
  const rows: { person: keyof typeof PEOPLE; status: Status }[] = [
    { person: "aarushi", status: "available" },
    { person: "william", status: williamFree ? "available" : "busy" },
    { person: "ida", status: "busy" },
    { person: "lei", status: "meeting" },
    { person: "tj", status: "away" },
  ];

  return (
    <div className="glass-panel flex flex-col gap-[0.5cqw] rounded-[1.4cqw] p-[1cqw]">
      <PanelTitle icon={Users} title="Team presence" />
      {rows.map(({ person, status }) => {
        const changed =
          person === "william" && action === "presence" && williamFree;
        return (
          <div
            key={person}
            className={cn(
              "flex items-center gap-[0.6cqw] rounded-[0.7cqw] px-[0.6cqw] py-[0.4cqw] ring-1 transition-colors duration-500",
              changed ? "bg-accent ring-primary/30" : "bg-card/70 ring-border",
            )}
          >
            <span className="relative">
              <Portrait src={PEOPLE[person].photo} className="w-[2.1cqw]" />
              <span
                className={cn(
                  "absolute right-0 bottom-0 size-[0.65cqw] rounded-full border-[0.12cqw] border-card transition-colors duration-500",
                  STATUS[status].dot,
                )}
              />
            </span>
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="text-[0.78cqw] font-semibold">
                {PEOPLE[person].name}
              </span>
              <span
                className={cn(
                  "text-[0.62cqw]",
                  changed
                    ? "font-medium text-primary"
                    : "text-muted-foreground",
                )}
              >
                {STATUS[status].label}
              </span>
            </span>
            <ChevronRight className="ml-auto size-[0.8cqw] text-muted-foreground" />
          </div>
        );
      })}
    </div>
  );
}

function Stat({
  icon: Icon,
  value,
  label,
  trend,
  bump,
}: {
  icon: LucideIcon;
  value: string;
  label: string;
  trend: string;
  bump?: boolean;
}) {
  return (
    <span
      className={cn(
        "flex flex-col gap-[0.15cqw] rounded-[0.6cqw] p-[0.6cqw] ring-1 transition-colors duration-500",
        bump ? "bg-accent ring-primary/30" : "bg-card ring-border",
      )}
    >
      <span className="flex items-center gap-[0.4cqw]">
        <Icon className="size-[0.9cqw] text-primary" />
        <span className="text-[1.05cqw] font-semibold tabular-nums">
          {value}
        </span>
      </span>
      <span className="text-[0.55cqw] text-muted-foreground">{label}</span>
      <span className="text-[0.55cqw] font-medium text-primary">{trend}</span>
    </span>
  );
}

function Portal(state: ControlState) {
  const { action, done, added, williamFree } = state;
  const copy = ACTION_COPY[action];

  const nav: { icon: LucideIcon; text: string }[] = [
    { icon: LayoutDashboard, text: "Dashboard" },
    { icon: Users, text: "Users" },
    { icon: Workflow, text: "Call routing" },
    { icon: Users, text: "Teams" },
    { icon: Hash, text: "Numbers" },
    { icon: BarChart3, text: "Analytics" },
    { icon: Settings, text: "Settings" },
  ];

  const history = [
    { who: "Lei Quynh", what: "On a call", when: "2 min ago" },
    { who: "Ida Jones", what: "Joined queue", when: "5 min ago" },
    { who: "Aarushi Peri", what: "Updated IVR", when: "12 min ago" },
    { who: "TJ Woodward", what: "Signed out", when: "26 min ago" },
  ];

  return (
    <div>
      <div className="rounded-t-[1.2cqw] bg-foreground/90 p-[0.5cqw] pb-[0.8cqw] shadow-2xl shadow-primary/20">
        <span className="mx-auto mb-[0.3cqw] block size-[0.4cqw] rounded-full bg-muted-foreground/60" />
        <div className="relative flex aspect-[16/10] overflow-hidden rounded-[0.45cqw] bg-card">
          {/* Sidebar */}
          <div className="flex w-[20%] flex-col gap-[0.25cqw] border-r border-border p-[0.55cqw] text-[0.62cqw] text-muted-foreground">
            <span className="mb-[0.3cqw] flex items-center gap-[0.3cqw] text-[0.75cqw] font-semibold text-foreground">
              <span className="font-black tracking-tighter text-primary italic">
                {"//"}
              </span>
              Admin
            </span>
            {nav.map(({ icon: Icon, text }) => {
              const on = text === copy.nav;
              return (
                <span
                  key={text}
                  className={cn(
                    "flex items-center gap-[0.35cqw] rounded-[0.35cqw] px-[0.35cqw] py-[0.3cqw] transition-colors duration-300",
                    on && "bg-accent font-medium text-accent-foreground",
                  )}
                >
                  <Icon
                    className={cn("size-[0.75cqw]", on && "text-primary")}
                  />
                  {text}
                </span>
              );
            })}
          </div>

          {/* Main */}
          <div className="flex flex-1 flex-col gap-[0.55cqw] p-[0.8cqw]">
            <span className="flex items-center gap-[0.6cqw]">
              <span className="flex flex-1 items-center gap-[0.35cqw] rounded-full bg-muted px-[0.6cqw] py-[0.25cqw] text-[0.6cqw] text-muted-foreground">
                <Search className="size-[0.65cqw]" />
                Search anything…
              </span>
              <Bell className="size-[0.8cqw] text-muted-foreground" />
              <Portrait src={PEOPLE.aarushi.photo} className="w-[1.4cqw]" />
            </span>

            <span className="text-[0.85cqw] font-semibold">Team overview</span>
            <span className="grid grid-cols-4 gap-[0.45cqw]">
              <Stat
                icon={Users}
                value={added ? "13" : "12"}
                label="Total users"
                trend={added ? "↑ 3 this week" : "↑ 2 this week"}
                bump={action === "provision" && done}
              />
              <Stat
                icon={PhoneCall}
                value={williamFree ? "5" : "6"}
                label="Active calls"
                trend="Live"
                bump={action === "presence" && done}
              />
              <Stat
                icon={BarChart3}
                value="248"
                label="Calls today"
                trend="↑ 18%"
              />
              <Stat
                icon={ShieldCheck}
                value="99.9%"
                label="Uptime"
                trend="30 days"
              />
            </span>

            <span className="flex items-center gap-[0.35cqw] text-[0.75cqw] font-semibold">
              <Activity className="size-[0.8cqw] text-primary" />
              Recent activity
            </span>
            <div className="flex flex-col text-[0.6cqw]">
              {/* The latest change lands at the top of the feed. */}
              <ActivityRow
                who={copy.who}
                what={copy.event}
                when="Just now"
                fresh
                hidden={!done}
              />
              {history.slice(0, done ? 3 : 4).map((row) => (
                <ActivityRow key={row.who} {...row} />
              ))}
            </div>
          </div>

          {/* Confirmation toast */}
          <span
            className={cn(
              "absolute right-[0.8cqw] bottom-[0.8cqw] flex items-center gap-[0.35cqw] rounded-full bg-foreground px-[0.7cqw] py-[0.35cqw] text-[0.65cqw] font-medium text-background shadow-lg transition-[opacity,translate]",
              /* Out instantly, so the next beat's copy is never seen on the
                 way out; in with a short rise once the change is made. */
              done
                ? "opacity-100 duration-300"
                : "translate-y-[0.5cqw] opacity-0 duration-0",
            )}
          >
            <Check className="size-[0.75cqw] text-primary" />
            {copy.toast}
          </span>
        </div>
      </div>
      <div className="relative mx-[-6%] h-[1.2cqw] rounded-b-[1.2cqw] bg-linear-to-b from-card via-muted to-muted-foreground/40 shadow-lg shadow-primary/15">
        <span className="absolute top-0 left-1/2 h-[0.4cqw] w-[14%] -translate-x-1/2 rounded-b-[0.5cqw] bg-muted-foreground/25" />
      </div>
    </div>
  );
}

function ActivityRow({
  who,
  what,
  when,
  fresh,
  hidden,
}: {
  who: string;
  what: string;
  when: string;
  fresh?: boolean;
  hidden?: boolean;
}) {
  if (hidden) return null;
  return (
    <span
      className={cn(
        "grid grid-cols-[1.1fr_1.2fr_0.7fr] items-center gap-[0.4cqw] border-b border-border px-[0.3cqw] py-[0.35cqw]",
        fresh && "rounded-[0.3cqw] bg-accent font-medium",
      )}
    >
      <span className="truncate">{who}</span>
      <span
        className={cn(
          "flex items-center gap-[0.3cqw] truncate",
          fresh ? "text-primary" : "text-muted-foreground",
        )}
      >
        {fresh ? <Check className="size-[0.6cqw] shrink-0" /> : null}
        {what}
      </span>
      <span className="text-right text-muted-foreground">{when}</span>
    </span>
  );
}
