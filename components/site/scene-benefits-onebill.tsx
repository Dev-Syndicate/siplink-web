"use client";

import type { CSSProperties } from "react";
import {
  Building2,
  Check,
  Cloud,
  Headset,
  PhoneCall,
  Receipt,
  ScrollText,
  Store,
  Wifi,
  type LucideIcon,
} from "lucide-react";

import {
  Layer,
  Portrait,
  Scene,
  ScenePill,
  useSceneClock,
  type JointSpec,
} from "@/components/site/scene-kit";
import {
  SceneChip,
  SceneCorners,
  ScenePanel,
} from "@/components/site/internet-scene-parts";
import {
  DeviceBrowser,
  DevicePhone,
  PEOPLE,
} from "@/components/site/internet-scene-devices";
import { cn } from "@/lib/utils";

/**
 * Three invoices that never quite reconcile, and the one that does.
 *
 * The finance lead is the only person on this page's list who never touches
 * the network and still has an opinion about it, and the thing they notice
 * is administrative rather than technical: one supplier for voice and
 * connectivity, quoted per location and billed together.
 *
 * So this scene is the only one in the section with a spreadsheet in it.
 * That is on purpose — it is the view from the desk where the decision gets
 * signed off, and none of the other twenty scenes shows that desk.
 *
 * Every figure on the invoice is a dash. The page carries no pricing and
 * neither does the picture; what is being shown is how many documents there
 * are and how many numbers to ring, not what any of it costs.
 */

type Site = { icon: LucideIcon; name: string; lines: string[] };

const SITES: Site[] = [
  { icon: Building2, name: "Head office", lines: ["Connectivity", "Voice", "Wi-Fi and LAN"] },
  { icon: Store, name: "Branch · north", lines: ["Connectivity", "Voice"] },
  { icon: Store, name: "Branch · south", lines: ["Connectivity", "Voice"] },
];

type Beat = {
  id: string;
  pill: string;
  icon: LucideIcon;
  /** Which of the two halves the scene is arguing from. */
  split: boolean;
  headline: string;
  note: string;
};

const BEATS: Beat[] = [
  {
    id: "three",
    pill: "The usual arrangement",
    icon: Receipt,
    split: true,
    headline: "Three suppliers, three cycles, three formats",
    note: "Voice from one, connectivity from another, the kit from a third — and a month spent deciding which of them the fault belonged to.",
  },
  {
    id: "one",
    pill: "One supplier",
    icon: ScrollText,
    split: false,
    headline: "One invoice, itemised per location",
    note: "Quoted per site and billed together, so what each location costs is a line rather than an investigation.",
  },
  {
    id: "call",
    pill: "And when something breaks",
    icon: Headset,
    split: false,
    headline: "One number, whatever it turns out to be",
    note: "The circuit, the router, the Wi-Fi and the calls over it are all the same contract, so nobody has to establish whose problem it is first.",
  },
];

const DESK: JointSpec[] = [
  { id: "bill-desk", side: "r", left: "100%", top: "50%" },
];
const BILL: JointSpec[] = [
  { id: "bill-in", side: "l", left: "0%", top: "50%" },
  { id: "bill-out", side: "b", left: "50%", top: "100%" },
];
const PHONE: JointSpec[] = [
  { id: "bill-phone", side: "t", left: "50%", top: "0%" },
];

const BEAT_S = 3.5;
const LOOP_S = BEAT_S * BEATS.length;

export function BenefitOneBillScene({ label }: { label: string }) {
  const { ref, still, t } = useSceneClock();

  // Reduced motion rests on the single invoice.
  const index = still ? 1 : Math.floor((t % LOOP_S) / BEAT_S);
  const now = BEATS[index];

  return (
    <Scene
      sceneRef={ref}
      label={label}
      still={still}
      aspect="aspect-[1671/941]"
      wires={[
        { from: DESK[0].id, to: BILL[0].id, lit: true },
        { from: BILL[1].id, to: PHONE[0].id, lit: now.id === "call" },
      ]}
    >
      <SceneCorners
        still={still}
        items={[
          { icon: Receipt, frame: "top-[8%] left-[3%] w-[5%]" },
          { icon: Wifi, frame: "top-[8%] left-[92%] w-[5%]", delay: "-3s" },
        ]}
      />

      {/* The desk the decision is signed off at. */}
      <Layer
        className="top-[24%] left-[2%] w-[23%]"
        depth={0.8}
        order={30}
        active
        joints={DESK}
        lit
      >
        <ScenePanel
          icon={ScrollText}
          title="The finance lead"
          subtitle="Never touches the network, still has a view"
          aside={<SceneChip label="Month end" />}
        >
          <span className="flex items-center gap-[0.55cqw] rounded-[0.8cqw] bg-accent px-[0.7cqw] py-[0.5cqw]">
            <Portrait src={PEOPLE.elena.photo} halo className="w-[2.4cqw]" />
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="text-[0.8cqw] font-semibold">
                {PEOPLE.elena.name}
              </span>
              <span className="text-[0.66cqw] text-muted-foreground">
                Three sites to reconcile
              </span>
            </span>
          </span>

          <span className="flex flex-col gap-[0.3cqw]">
            {SITES.map((site) => (
              <span
                key={site.name}
                className="flex items-center gap-[0.45cqw] rounded-[0.6cqw] bg-card/70 px-[0.55cqw] py-[0.35cqw]"
              >
                <site.icon className="size-[0.85cqw] shrink-0 text-primary" />
                <span className="text-[0.7cqw]">{site.name}</span>
              </span>
            ))}
          </span>
        </ScenePanel>
      </Layer>

      {/* What lands in the inbox. */}
      <Layer
        className="top-[16%] left-[29%] w-[42%]"
        depth={0.5}
        order={20}
        active
        glow
        joints={BILL}
        lit
      >
        <DeviceBrowser url="billing.siplink.example/accounts">
          <div className="flex flex-col gap-[0.5cqw] bg-linear-to-b from-accent/40 to-card p-[0.9cqw]">
            <span className="flex items-center gap-[0.5cqw]">
              <span className="flex size-[1.8cqw] items-center justify-center rounded-[0.5cqw] bg-primary text-primary-foreground">
                <now.icon className="size-1/2" />
              </span>
              <span className="text-[0.85cqw] font-semibold">
                {now.headline}
              </span>
              <span className="ml-auto">
                <SceneChip
                  label={now.split ? "3 documents" : "1 document"}
                  tone={now.split ? "off" : "on"}
                />
              </span>
            </span>

            {now.split ? (
              <span className="flex gap-[0.5cqw]">
                {["Voice provider", "ISP", "IT supplier"].map((supplier) => (
                  <span
                    key={supplier}
                    className="flex flex-1 flex-col gap-[0.3cqw] rounded-[0.6cqw] bg-card/85 p-[0.6cqw] ring-1 ring-border"
                  >
                    <span className="text-[0.68cqw] font-semibold">
                      {supplier}
                    </span>
                    {["—", "—"].map((dash, row) => (
                      <span
                        key={row}
                        className="flex items-center justify-between text-[0.62cqw] text-muted-foreground"
                      >
                        <span className="h-[0.3cqw] w-[55%] rounded-full bg-muted" />
                        <span className="font-mono">{dash}</span>
                      </span>
                    ))}
                    <span className="mt-[0.15cqw] text-[0.58cqw] text-muted-foreground">
                      Own cycle, own format
                    </span>
                  </span>
                ))}
              </span>
            ) : (
              <span className="flex flex-col gap-[0.3cqw] rounded-[0.7cqw] bg-card/85 p-[0.65cqw] ring-1 ring-primary/20">
                {SITES.map((site) => (
                  <span key={site.name} className="flex flex-col gap-[0.2cqw]">
                    <span className="flex items-center gap-[0.4cqw]">
                      <site.icon className="size-[0.8cqw] shrink-0 text-primary" />
                      <span className="text-[0.7cqw] font-semibold">
                        {site.name}
                      </span>
                      <span className="ml-auto font-mono text-[0.68cqw] text-muted-foreground">
                        —
                      </span>
                    </span>
                    <span className="flex flex-wrap gap-[0.25cqw] pl-[1.2cqw]">
                      {site.lines.map((line) => (
                        <span
                          key={line}
                          className="rounded-full bg-accent px-[0.45cqw] py-[0.1cqw] text-[0.58cqw] text-accent-foreground"
                        >
                          {line}
                        </span>
                      ))}
                    </span>
                  </span>
                ))}
              </span>
            )}
          </div>
        </DeviceBrowser>
      </Layer>

      {/* The other half of "one supplier". */}
      <Layer
        className="top-[24%] left-[75%] w-[23%]"
        depth={0.8}
        order={30}
        active={now.id === "call"}
        joints={[]}
        lit={now.id === "call"}
      >
        <ScenePanel
          icon={Cloud}
          title="What is on the bill"
          subtitle="All of it, from the same place"
          lit={now.id === "call"}
          tone={now.id === "call" ? "brand" : "muted"}
        >
          <span className="flex flex-col gap-[0.3cqw]">
            {["Connectivity", "Voice over it", "Router and firewall", "Wi-Fi and LAN"].map(
              (line) => (
                <span
                  key={line}
                  className="flex items-center gap-[0.45cqw] rounded-[0.6cqw] bg-card/70 px-[0.55cqw] py-[0.35cqw]"
                >
                  <Check className="size-[0.8cqw] shrink-0 text-primary" />
                  <span className="text-[0.7cqw]">{line}</span>
                </span>
              ),
            )}
          </span>
        </ScenePanel>
      </Layer>

      {/* One number to ring. */}
      <Layer
        className="top-[64%] left-[44%] w-[12%]"
        depth={0.95}
        order={30}
        active={now.id === "call"}
        joints={PHONE}
        lit={now.id === "call"}
      >
        <DevicePhone dim={now.id !== "call"}>
          <div className="flex flex-1 flex-col items-center justify-center gap-[0.4cqw] bg-linear-to-b from-accent/60 to-card px-[0.5cqw] text-center">
            <span
              className={cn(
                "flex size-[2.6cqw] items-center justify-center rounded-full transition-colors duration-500",
                now.id === "call"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground",
              )}
            >
              <PhoneCall className="size-1/2" />
            </span>
            <span className="text-[0.66cqw] leading-tight font-semibold">
              One number
            </span>
            <span className="text-[0.6cqw] leading-snug text-muted-foreground">
              Chennai NOC, 24/7
            </span>
          </div>
        </DevicePhone>
      </Layer>

      {/* The beat, in words. */}
      <div
        className="parallax absolute top-[80%] left-[14%] w-[52%]"
        style={{ "--depth": 0.55 } as CSSProperties}
      >
        <div className="glass-panel flex items-center gap-[0.75cqw] rounded-[1.2cqw] px-[1.1cqw] py-[0.85cqw]">
          <span className="flex size-[2cqw] shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <now.icon className="size-1/2" />
          </span>
          <span className="text-[0.85cqw] leading-snug text-pretty">
            {now.note}
          </span>
        </div>
      </div>

      <div
        className="parallax absolute top-[5%] left-[33%] w-[34%]"
        style={{ "--depth": 0.3 } as CSSProperties}
      >
        <ScenePill
          icon={now.icon}
          label={now.pill}
          size="md"
          active={!now.split}
          className="mx-auto"
        />
      </div>
    </Scene>
  );
}
