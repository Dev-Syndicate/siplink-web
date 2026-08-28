import Image from "next/image";
import {
  BatteryFull,
  Grid3x3,
  Mic,
  PhoneIncoming,
  PhoneMissed,
  PhoneOff,
  PhoneOutgoing,
  Signal,
  UserPlus,
  Video,
  Volume2,
  Wifi,
} from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * The hero object — this is what stands in for the reference video's bottle.
 * A phone matches the bottle's tall, narrow silhouette, so it can overlap the
 * headline, tilt, and get cropped by the viewport edge the same way.
 *
 * `src` renders a real app screenshot once one is supplied. Until then the
 * screens below are drawn in CSS so the layout can be judged at full fidelity.
 * Everything shown is placeholder data.
 */

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-6 pt-3 pb-1 text-[9px] font-semibold text-foreground">
      <span>9:41</span>
      <div className="flex items-center gap-1">
        <Signal className="size-2.5" />
        <Wifi className="size-2.5" />
        <BatteryFull className="size-3" />
      </div>
    </div>
  );
}

function ControlButton({
  icon: Icon,
  label,
  active,
}: {
  icon: React.ElementType;
  label: string;
  active?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className={cn(
          "flex size-11 items-center justify-center rounded-full",
          active ? "bg-foreground text-background" : "bg-muted text-foreground"
        )}
      >
        <Icon className="size-4" />
      </div>
      <span className="text-[8px] font-medium text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

function CallScreen() {
  return (
    <div className="flex h-full flex-col bg-background">
      <StatusBar />
      <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6">
        <div className="flex size-20 items-center justify-center rounded-full bg-brand-tint-2 text-xl font-semibold text-brand-deep">
          AR
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-foreground">Anita Raman</p>
          <p className="text-[10px] text-muted-foreground">
            Sales queue &middot; 04:21
          </p>
        </div>
        <span className="rounded-full bg-brand-tint px-2.5 py-1 text-[8px] font-semibold tracking-wide text-brand-deep uppercase">
          HD voice
        </span>
      </div>
      <div className="grid grid-cols-3 gap-y-4 px-6">
        <ControlButton icon={Mic} label="Mute" />
        <ControlButton icon={Grid3x3} label="Keypad" />
        <ControlButton icon={Volume2} label="Speaker" active />
        <ControlButton icon={Video} label="Video" />
        <ControlButton icon={UserPlus} label="Add" />
        <ControlButton icon={Grid3x3} label="Transfer" />
      </div>
      <div className="flex justify-center px-6 pt-5 pb-7">
        <div className="flex size-13 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <PhoneOff className="size-5" />
        </div>
      </div>
    </div>
  );
}

const activity = [
  { name: "Meera Iyer", meta: "Outbound · 6:02", icon: PhoneOutgoing },
  { name: "Support queue", meta: "Inbound · 2:41", icon: PhoneIncoming },
  { name: "David Okafor", meta: "Missed · 11:04", icon: PhoneMissed },
  { name: "Billing team", meta: "Inbound · 8:15", icon: PhoneIncoming },
  { name: "Priya Nair", meta: "Outbound · 3:38", icon: PhoneOutgoing },
];

function ActivityScreen() {
  return (
    <div className="flex h-full flex-col bg-background">
      <StatusBar />
      <div className="px-5 pt-3 pb-4">
        <p className="text-base font-semibold text-foreground">Activity</p>
        <p className="text-[9px] text-muted-foreground">Today · 24 calls</p>
      </div>
      <div className="flex-1 space-y-1 px-3">
        {activity.map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-2.5 rounded-xl px-2 py-2"
          >
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted">
              <item.icon
                className={cn(
                  "size-3.5",
                  item.icon === PhoneMissed
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[10px] font-medium text-foreground">
                {item.name}
              </p>
              <p className="text-[8px] text-muted-foreground">{item.meta}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="px-5 pb-7">
        <div className="rounded-xl bg-brand-tint px-3 py-2.5">
          <p className="text-[8px] font-semibold tracking-wide text-brand-deep uppercase">
            Answer rate
          </p>
          <p className="text-lg font-semibold text-foreground">94.2%</p>
        </div>
      </div>
    </div>
  );
}

export function PhoneMock({
  screen = "call",
  src,
  alt,
  className,
  priority,
}: {
  screen?: "call" | "activity";
  src?: string;
  alt?: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative aspect-[9/19] w-full rounded-[2.5rem] bg-foreground p-[3px] shadow-[0_40px_80px_-20px_rgb(18_20_23/0.45)]",
        className
      )}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[2.35rem] bg-background">
        {/* Dynamic island */}
        <div className="absolute top-2 left-1/2 z-10 h-4 w-[26%] -translate-x-1/2 rounded-full bg-foreground" />
        {src ? (
          <Image
            src={src}
            alt={alt ?? ""}
            fill
            priority={priority}
            sizes="(max-width: 768px) 60vw, 340px"
            className="object-cover"
          />
        ) : screen === "call" ? (
          <CallScreen />
        ) : (
          <ActivityScreen />
        )}
      </div>
    </div>
  );
}
