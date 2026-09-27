import Image from "next/image";
import { Joint, type JointSpec, type SceneWire } from "@/components/site/scene-kit";
import { ProductSceneConnections } from "@/components/site/product-scene-connections";
import type { CSSProperties, ReactNode } from "react";
import { Bell, Check, Grid2X2, Mic, MoreHorizontal, PhoneOff, Search, Settings, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/** Illustrative UI, deliberately non-interactive: these are not product controls. */
export function ProductSceneStage({ name, label, paths = [], animated = false, height = 620, wires, children }: { name: string; label: string; paths?: string[]; animated?: boolean; height?: number; wires?: SceneWire[]; children: ReactNode }) {
  return <div data-product-scene={name} role="img" aria-label={label} style={{ aspectRatio: `1000 / ${height}`, "--product-scene-height": height } as CSSProperties} className="@container relative isolate w-full text-[1.25cqw] leading-relaxed [&_[data-slot=card]]:text-[1.25cqw]">
    <div aria-hidden className="scene-grid absolute inset-0 opacity-50" />
    <div aria-hidden className="absolute inset-10 -z-10 rounded-full bg-primary/5 blur-3xl" />
    {wires ? <ProductSceneConnections wires={wires} /> : <svg aria-hidden viewBox={`0 0 1000 ${height}`} className="pointer-events-none absolute inset-0 size-full overflow-visible" fill="none"><g stroke="var(--primary)" strokeOpacity="0.3" strokeWidth="2.5" strokeLinecap="round">{paths.map(path => <path key={path} d={path} />)}</g>{animated && <g stroke="var(--primary)" strokeWidth="3.5" strokeLinecap="round">{paths.map((path, index) => <path key={path} d={path} pathLength="100" className="scene-dash" style={{ "--dash-duration": "4s", "--dash-delay": `${index * -0.8}s` } as CSSProperties} />)}</g>}</svg>}
    {children}
  </div>;
}

export function ScenePosition({ x, y, w, children, className, joints = [] }: { x: number; y: number; w: number; children: ReactNode; className?: string; joints?: JointSpec[] }) {
  return <div className={cn("absolute", className)} style={{ left: `${x / 10}%`, top: `calc(${y * 100}% / var(--product-scene-height, 620))`, width: `${w / 10}%` }}>{children}{joints.map(joint => <Joint key={joint.id} {...joint} lit />)}</div>;
}

export function SceneWindow({ title, children, className, dark = false }: { title: string; children: ReactNode; className?: string; dark?: boolean }) {
  return <Card className={cn("gap-0 overflow-hidden rounded-[1.8cqw] p-0 text-[1.25cqw] shadow-xl shadow-primary/10 ring-border", dark && "bg-foreground text-background", className)}>
    <div className={cn("flex h-[4cqw] items-center gap-[0.6cqw] border-b border-border px-[1.5cqw]", dark ? "border-background/15" : "bg-muted/40")}><span className="size-[0.65cqw] rounded-full bg-primary" /><span className="size-[0.65cqw] rounded-full bg-primary/30" /><span className="size-[0.65cqw] rounded-full bg-muted-foreground/30" /><span className="ml-[1cqw] font-medium">{title}</span><MoreHorizontal className="ml-auto size-[1.5cqw] opacity-50" /></div>
    <CardContent className="p-0">{children}</CardContent>
  </Card>;
}

export function SceneLaptop({ title, children, className, detailed = false }: { title: string; children: ReactNode; className?: string; detailed?: boolean }) {
  return <div data-scene-laptop className={className}>
    <Card className="relative gap-0 rounded-t-[1.4cqw] rounded-b-[0.6cqw] bg-foreground p-[0.7cqw] pt-[1.6cqw] shadow-xl shadow-primary/15">
      {detailed && <span aria-hidden className="absolute top-[0.6cqw] left-1/2 size-[0.35cqw] -translate-x-1/2 rounded-full bg-background/40" />}
      <CardContent className={cn("overflow-hidden rounded-[0.5cqw] bg-card p-0 text-card-foreground", detailed && "flex aspect-video flex-col [&>div:last-child]:min-h-0 [&>div:last-child]:flex-1")}>
        <div className="flex h-[3.5cqw] shrink-0 items-center gap-[1cqw] border-b border-border px-[1.5cqw]"><span className="font-semibold text-primary">SipLink</span><span className="flex flex-1 items-center gap-[0.5cqw] rounded-full bg-muted px-[1cqw] py-[0.3cqw] text-[0.85cqw] text-muted-foreground"><Search className="size-[1cqw]" />{title}</span><Bell className="size-[1.1cqw] text-muted-foreground" /><Settings className="size-[1.1cqw] text-muted-foreground" /></div>
        {children}
      </CardContent>
    </Card>
    {detailed ? <div aria-hidden className="relative -mx-[2cqw] shadow-lg shadow-primary/20">
      <div className="mx-[3cqw] h-[0.45cqw] rounded-b bg-muted-foreground/50" />
      <div className="relative h-[3.2cqw] border-b border-muted-foreground/25 bg-gradient-to-b from-border to-muted [clip-path:polygon(5%_0,95%_0,100%_100%,0_100%)]">
        <div className="absolute inset-x-[20%] top-[0.35cqw] grid grid-cols-12 gap-[0.15cqw]">{Array.from({length:24},(_,index)=><span key={index} className="h-[0.4cqw] rounded-[0.1cqw] bg-muted-foreground/40" />)}</div>
        <span className="absolute inset-x-[41%] bottom-[0.25cqw] h-[1.1cqw] rounded-[0.2cqw] border border-muted-foreground/30 bg-background/40" />
      </div>
      <div className="h-[0.6cqw] rounded-b-[1.6cqw] bg-border" />
    </div> : <div aria-hidden className="relative -mx-[2cqw] h-[1.5cqw] rounded-b-[3cqw] bg-border shadow-lg shadow-primary/20"><span className="absolute inset-x-[40%] top-0 h-[0.45cqw] rounded-b-lg bg-muted-foreground/30" /></div>}
  </div>;
}

export function ScenePhone({ title, children, className }: { title: string; children: ReactNode; className?: string }) {
  return <Card data-scene-phone className={cn("aspect-[9/18.5] gap-0 rounded-[3cqw] bg-foreground p-[0.5cqw] shadow-xl shadow-primary/15", className)}>
    <CardContent className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-[2.6cqw] bg-card p-0 text-card-foreground">
      <div className="flex h-[3.5cqw] shrink-0 items-center justify-between bg-primary px-[1.5cqw] text-[0.85cqw] text-primary-foreground"><span>9:41</span><span aria-hidden className="h-[1cqw] w-[6cqw] rounded-full bg-foreground" /><span>LTE</span></div>
      <div className="shrink-0 bg-primary px-[1cqw] pb-[1cqw] text-center text-[1.15cqw] font-semibold leading-tight text-primary-foreground">{title}</div>
      <div data-phone-body className="flex min-h-0 flex-1 flex-col [&>div]:flex [&>div]:min-h-0 [&>div]:flex-1 [&>div]:flex-col [&>div]:justify-evenly [&>div]:gap-[0.6cqw] [&>div]:space-y-0 [&>div]:py-[0.8cqw] [&>div>*]:my-0">{children}</div>
      <div aria-hidden className="mx-auto my-[0.7cqw] h-[0.3cqw] w-[6cqw] shrink-0 rounded-full bg-foreground/50" />
    </CardContent>
  </Card>;
}

export function SceneTile({ icon: Icon, title, detail, className }: { icon: LucideIcon; title: string; detail?: string; className?: string }) {
  return <Card className={cn("gap-0 rounded-[1.8cqw] py-[1.5cqw] text-[1.25cqw] shadow-lg shadow-primary/10", className)}><CardContent className="flex items-center gap-[1cqw] px-[1.5cqw]"><span className="flex size-[3.5cqw] shrink-0 items-center justify-center rounded-[1cqw] bg-accent text-primary"><Icon className="size-[1.8cqw]" /></span><div><p className="font-semibold">{title}</p>{detail && <p className="mt-[0.2cqw] text-[1cqw] leading-snug text-muted-foreground">{detail}</p>}</div></CardContent></Card>;
}

export function ScenePerson({ name = "Sarah Johnson", detail = "Customer conversation", compact = false }: { name?: string; detail?: string; compact?: boolean }) {
  return <div className={cn("flex items-center gap-[1cqw]", !compact && "flex-col text-center")}><span className={cn("relative shrink-0 overflow-hidden rounded-full ring-[0.5cqw] ring-primary/10", compact ? "size-[3cqw]" : "size-[7cqw]")}><Image src="/solns-remoteWorkforce/scene/caller.webp" alt="" fill sizes="100px" className="object-cover" /></span><div><p className="font-semibold">{name}</p><p className="text-[1cqw] text-muted-foreground">{detail}</p></div></div>;
}

export function SceneWave({ className, animated = false }: { className?: string; animated?: boolean }) {
  return <div aria-hidden className={cn("flex h-[3cqw] items-center justify-center gap-[0.35cqw]", className)}>{[25,50,75,45,90,65,100,60,85,40,70,35,55].map((height,index) => <span key={index} className={cn("w-[0.35cqw] rounded-full bg-primary", animated && "wave-bar")} style={{height:`${height}%`, "--bar-delay": `${index * -0.09}s`} as CSSProperties} />)}</div>;
}

export function SceneCallControls() {
  return <div aria-hidden className="flex items-center justify-center gap-[1.2cqw]">{[Mic, Grid2X2, PhoneOff].map((Icon,index) => <span key={index} className={cn("flex size-[3.4cqw] items-center justify-center rounded-full border border-border", index === 2 && "border-primary bg-primary text-primary-foreground")}><Icon className="size-[1.6cqw]" /></span>)}</div>;
}

export function SceneStatus({ children }: { children: ReactNode }) {
  return <Badge size="scene" variant="secondary" className="gap-[0.4cqw] rounded-full px-[0.8cqw] py-[0.2cqw] text-[0.9cqw] font-medium"><Check className="size-[1cqw] text-primary" />{children}</Badge>;
}

export function SceneRow({ children, active = false, style }: { children: ReactNode; active?: boolean; style?: CSSProperties }) {
  return <div style={style} className={cn("flex items-center justify-between gap-[1cqw] border-b border-border px-[1.5cqw] py-[1cqw] last:border-b-0", active && "bg-accent/60 text-accent-foreground")}>{children}</div>;
}
