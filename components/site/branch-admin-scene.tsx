"use client";

import {
  BarChart3,
  Building2,
  Calendar,
  Check,
  Hash,
  LayoutDashboard,
  MapPin,
  MonitorSmartphone,
  Settings,
  UserPlus,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import {
  AppNav,
  Layer,
  Portrait,
  Scene,
  ScenePill,
  useSceneClock,
} from "@/components/site/scene-kit";
import { cn } from "@/lib/utils";

/**
 * Central management, as every branch administered from one portal.
 *
 * The portal lists the three branches side by side. Each beat is one change
 * made there — a new hire added to Chicago, Denver's routing switched to
 * holiday hours, a desk phone provisioned in New York — and the branch it
 * touches confirms it, with nobody visiting the site.
 *
 * Same three branches as the rest of this page. Stage, parallax and wiring
 * come from scene-kit.
 */

const TEAM = "/solns-remoteWorkforce/scene";

type BranchId = "ny" | "chi" | "den";
type Column = "users" | "routing" | "devices";

const CHANGES: {
  branch: BranchId;
  column: Column;
  nav: string;
  action: string;
  note: string;
  icon: LucideIcon;
}[] = [
  {
    branch: "chi",
    column: "users",
    nav: "Users",
    action: "Add user · Chicago",
    note: "Priya Shah added to the front desk",
    icon: UserPlus,
  },
  {
    branch: "den",
    column: "routing",
    nav: "Call routing",
    action: "Holiday hours · Denver",
    note: "Calls go to the after-hours line",
    icon: Calendar,
  },
  {
    branch: "ny",
    column: "devices",
    nav: "Devices",
    action: "Provision desk phone · New York",
    note: "Desk phone online at reception",
    icon: MonitorSmartphone,
  },
];

const BRANCHES: {
  id: BranchId;
  city: string;
  users: number;
  routing: string;
  devices: number;
}[] = [
  {
    id: "ny",
    city: "New York",
    users: 18,
    routing: "Business hours",
    devices: 22,
  },
  {
    id: "chi",
    city: "Chicago",
    users: 14,
    routing: "Business hours",
    devices: 17,
  },
  {
    id: "den",
    city: "Denver",
    users: 9,
    routing: "Business hours",
    devices: 11,
  },
];

const STEP_S = 4;

export function BranchAdminScene({ label }: { label: string }) {
  const { ref, still, t } = useSceneClock();

  // Reduced motion rests with every change made.
  const s = still ? STEP_S * CHANGES.length - 1 : t % (STEP_S * CHANGES.length);
  const index = Math.floor(s / STEP_S);
  const done = still || s % STEP_S >= 1;
  const change = CHANGES[index];
  const made = (i: number) => i < index || (i === index && done);

  const value = (branch: (typeof BRANCHES)[number], column: Column) => {
    const bumped = CHANGES.findIndex(
      (c) => c.branch === branch.id && c.column === column,
    );
    const on = bumped >= 0 && made(bumped);
    if (column === "users") return String(branch.users + (on ? 1 : 0));
    if (column === "devices") return String(branch.devices + (on ? 1 : 0));
    return on ? "Holiday hours" : branch.routing;
  };

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[1600/620]"
      wires={BRANCHES.map(({ id }) => ({
        from: `portal-${id}`,
        to: `site-${id}`,
        lit: change.branch === id && done,
      }))}
    >
      <Layer
        className="top-[7%] left-[3%] w-[62%]"
        depth={0.35}
        order={10}
        joints={BRANCHES.map(({ id }, i) => ({
          id: `portal-${id}`,
          side: "r" as const,
          left: "100%",
          top: `${50 + i * 13}%`,
        }))}
        lit
      >
        <div className="relative flex overflow-hidden rounded-[1.6cqw] border border-border bg-card shadow-2xl shadow-primary/15">
          <AppNav
            className="w-[22%]"
            active={change.nav}
            items={[
              { icon: LayoutDashboard, label: "Dashboard" },
              { icon: Building2, label: "Branches" },
              { icon: Users, label: "Users" },
              { icon: Workflow, label: "Call routing" },
              { icon: MonitorSmartphone, label: "Devices" },
              { icon: Hash, label: "Numbers" },
              { icon: BarChart3, label: "Analytics" },
              { icon: Settings, label: "Settings" },
            ]}
          />
          <div className="flex flex-1 flex-col gap-[0.9cqw] p-[1.2cqw]">
            <span className="flex items-center justify-between">
              <span className="flex flex-col leading-tight">
                <span className="text-[1.3cqw] font-semibold">Branches</span>
                <span className="text-[0.75cqw] text-muted-foreground">
                  Northwind Dental · 3 locations, one portal
                </span>
              </span>
              <Portrait
                src={`${TEAM}/team-aarushi.webp`}
                className="w-[2cqw]"
              />
            </span>

            {/* The action being taken */}
            <span
              className={cn(
                "flex items-center gap-[0.6cqw] rounded-[0.8cqw] px-[0.8cqw] py-[0.6cqw] ring-1 transition-colors duration-300",
                done ? "bg-accent ring-primary/30" : "bg-muted/60 ring-border",
              )}
            >
              <span className="flex size-[2cqw] items-center justify-center rounded-[0.5cqw] bg-primary text-primary-foreground">
                <change.icon className="size-1/2" />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-[0.85cqw] font-semibold">
                  {change.action}
                </span>
                <span className="text-[0.68cqw] text-muted-foreground">
                  {done ? change.note : "Saving…"}
                </span>
              </span>
              <span
                className={cn(
                  "ml-auto flex items-center gap-[0.3cqw] rounded-full px-[0.6cqw] py-[0.2cqw] text-[0.68cqw] font-medium transition-colors duration-300",
                  done
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground ring-1 ring-border",
                )}
              >
                {done ? <Check className="size-[0.75cqw]" /> : null}
                {done ? "Applied" : "Apply"}
              </span>
            </span>

            {/* The branches, side by side */}
            <div className="flex flex-col rounded-[0.9cqw] text-[0.8cqw] ring-1 ring-border">
              <span className="grid grid-cols-[1.4fr_0.8fr_1.3fr_0.8fr] gap-[0.6cqw] border-b border-border px-[0.9cqw] py-[0.55cqw] text-[0.66cqw] font-semibold tracking-wide text-muted-foreground uppercase">
                <span>Branch</span>
                <span>Users</span>
                <span>Routing</span>
                <span>Devices</span>
              </span>
              {BRANCHES.map((branch) => {
                const row = change.branch === branch.id;
                return (
                  <span
                    key={branch.id}
                    className={cn(
                      "grid grid-cols-[1.4fr_0.8fr_1.3fr_0.8fr] items-center gap-[0.6cqw] border-b border-border px-[0.9cqw] py-[0.7cqw] transition-colors duration-500 last:border-b-0",
                      row && "bg-accent/60",
                    )}
                  >
                    <span className="flex items-center gap-[0.4cqw] font-semibold">
                      <MapPin className="size-[0.85cqw] text-primary" />
                      {branch.city}
                    </span>
                    {(["users", "routing", "devices"] as const).map(
                      (column) => {
                        const hit = row && change.column === column && done;
                        return (
                          <span
                            key={column}
                            className={cn(
                              "w-fit rounded-[0.4cqw] px-[0.4cqw] py-[0.1cqw] tabular-nums transition-colors duration-300",
                              hit &&
                                "bg-primary font-semibold text-primary-foreground",
                            )}
                          >
                            {value(branch, column)}
                          </span>
                        );
                      },
                    )}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </Layer>

      {BRANCHES.map((branch, i) => {
        const on = change.branch === branch.id && done;
        return (
          <Layer
            key={branch.id}
            className="left-[72%] w-[25%]"
            style={{ top: `${7 + i * 31}%` }}
            depth={0.85}
            order={30}
            active={on}
            joints={[
              { id: `site-${branch.id}`, side: "l", left: "0%", top: "50%" },
            ]}
            lit={on}
          >
            <div
              className={cn(
                "relative flex flex-col gap-[0.4cqw] rounded-[1.3cqw] border bg-card p-[1cqw] pt-[1.8cqw] shadow-xl transition-[border-color,box-shadow] duration-500",
                on
                  ? "border-primary/40 shadow-primary/25"
                  : "border-border shadow-primary/10",
              )}
            >
              <ScenePill
                icon={MapPin}
                label={branch.city}
                active={on}
                className="absolute -top-[1.5cqw] left-[1cqw]"
              />
              <span
                className={cn(
                  "flex items-center gap-[0.45cqw] text-[0.8cqw]",
                  on ? "font-medium text-primary" : "text-muted-foreground",
                )}
              >
                {on ? (
                  <Check className="size-[0.9cqw]" />
                ) : (
                  <span className="size-[0.55cqw] rounded-full bg-muted-foreground/40" />
                )}
                {on
                  ? CHANGES.find((c) => c.branch === branch.id)!.note
                  : "No changes pending"}
              </span>
              <span className="text-[0.66cqw] text-muted-foreground">
                {on
                  ? "Updated from the portal · no site visit"
                  : "Managed centrally"}
              </span>
            </div>
          </Layer>
        );
      })}
    </Scene>
  );
}
