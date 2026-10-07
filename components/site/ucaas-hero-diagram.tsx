import { ArrowDown, Building2, Cloud, Headset, Laptop, PhoneIncoming, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductSceneStage, ScenePosition } from "@/components/site/product-scene-primitives";

const destinations = [
  { title: "Main office", detail: "Desk phones", icon: Building2 },
  { title: "Branch office", detail: "Team extensions", icon: Users },
  { title: "Remote team", detail: "Softphones", icon: Laptop },
];

/** One managed UCaaS platform distributing business calls to every workplace. */
export function UcaasHeroDiagram() {
  return <>
    <div className="space-y-3 lg:hidden" aria-label="Illustrative UCaaS connection diagram">
      <Card className="gap-0 overflow-hidden py-0 shadow-lg shadow-primary/10">
        <CardHeader className="flex flex-row items-center justify-between border-b border-border bg-primary/5 px-5 py-4">
          <CardTitle className="text-lg">Customer calls your business</CardTitle>
          <PhoneIncoming aria-hidden className="size-6 text-primary" />
        </CardHeader>
        <CardContent className="p-5 text-sm text-muted-foreground">One familiar business number</CardContent>
      </Card>
      <ArrowDown aria-hidden className="mx-auto size-5 text-primary motion-safe:animate-bounce" />
      <Card className="gap-0 overflow-hidden border-primary bg-primary py-0 text-primary-foreground shadow-xl shadow-primary/20">
        <CardHeader className="flex flex-row items-center gap-3 border-b border-primary-foreground/20 px-5 py-4">
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary-foreground/15"><Cloud aria-hidden className="size-5" /></span>
          <div><CardTitle className="text-lg">SipLink UCaaS</CardTitle><p className="mt-1 text-sm text-primary-foreground/80">Fully managed in the cloud</p></div>
        </CardHeader>
        <CardContent className="p-5">
          <p className="text-2xl font-semibold leading-tight">One phone system.<br />Every workplace.</p>
          <p className="mt-3 text-sm text-primary-foreground/85">Shared extensions and call flows follow your people.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Shared extensions", "No on-site PBX"].map(feature => <Badge key={feature} variant="outline" className="border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground">{feature}</Badge>)}
          </div>
        </CardContent>
      </Card>
      <ArrowDown aria-hidden className="mx-auto size-5 text-primary motion-safe:animate-bounce" />
      <Card className="gap-0 overflow-hidden py-0 shadow-lg shadow-primary/10">
        <CardHeader className="border-b border-border bg-primary/5 px-5 py-4"><CardTitle className="text-lg">Your team stays connected</CardTitle></CardHeader>
        <CardContent className="divide-y divide-border p-5">
          {destinations.map(({ title, detail, icon: Icon }) => <div key={title} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon aria-hidden className="size-4" /></span>
            <div><p className="text-sm font-semibold">{title}</p><p className="text-xs text-muted-foreground">{detail}</p></div>
          </div>)}
        </CardContent>
      </Card>
    </div>

    <div className="hidden lg:block">
      <ProductSceneStage
        name="ucaas-hero"
        label="UCaaS connection diagram: incoming calls reach one SipLink hosted phone system, which connects desk phones at the main office, branch extensions and remote softphones"
        height={850}
        wires={[
          { from: "ucaas-call", to: "ucaas-platform-in", lit: true },
          { from: "ucaas-main-out", to: "ucaas-main", lit: true },
          { from: "ucaas-branch-out", to: "ucaas-branch", lit: true },
          { from: "ucaas-remote-out", to: "ucaas-remote", lit: true },
        ]}
      >
        <ScenePosition x={20} y={112} w={225} joints={[{ id: "ucaas-call", side: "r", left: "100%", top: "50%" }]}>
          <Card className="gap-0 border-primary/20 p-0 shadow-lg shadow-primary/10">
            <CardContent className="space-y-2 p-3">
              <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary"><PhoneIncoming aria-hidden className="size-5" /></span>
              <p className="text-sm font-semibold leading-tight">Incoming call</p>
              <p className="text-xs text-muted-foreground">Business number</p>
            </CardContent>
          </Card>
        </ScenePosition>

        <ScenePosition x={300} y={75} w={400} joints={[
          { id: "ucaas-platform-in", side: "l", left: "0%", top: "43%" },
          { id: "ucaas-main-out", side: "b", left: "18%", top: "100%" },
          { id: "ucaas-branch-out", side: "b", left: "50%", top: "100%" },
          { id: "ucaas-remote-out", side: "b", left: "82%", top: "100%" },
        ]}>
          <Card className="gap-0 overflow-hidden border-primary bg-primary p-0 text-primary-foreground shadow-xl shadow-primary/25">
            <CardHeader className="flex flex-row items-center gap-2 border-b border-primary-foreground/20 px-3 py-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-foreground/15"><Cloud aria-hidden className="size-5" /></span>
              <div><CardTitle className="text-sm">SipLink UCaaS</CardTitle><p className="text-[11px] text-primary-foreground/80">Fully managed in the cloud</p></div>
            </CardHeader>
            <CardContent className="p-3">
              <p className="text-base font-semibold leading-tight">One phone system.<br />Every workplace.</p>
              <p className="mt-2 text-[11px] leading-snug text-primary-foreground/85">Shared extensions and call flows follow your people.</p>
              <Badge variant="outline" className="mt-3 border-primary-foreground/30 bg-primary-foreground/10 px-1.5 text-[10px] text-primary-foreground">No on-site PBX</Badge>
              <p className="mt-3 flex items-center gap-1 text-[10px] text-primary-foreground/85"><Headset aria-hidden className="size-3" /> Managed by SipLink</p>
            </CardContent>
          </Card>
        </ScenePosition>

        {destinations.map(({ title, detail, icon: Icon }, index) => <ScenePosition
          key={title}
          x={[25, 365, 705][index]}
          y={620}
          w={270}
          joints={[{ id: ["ucaas-main", "ucaas-branch", "ucaas-remote"][index], side: "t", left: "50%", top: "0%" }]}
        >
          <Card className="gap-0 border-primary/20 p-0 shadow-lg shadow-primary/10">
            <CardContent className="flex items-center gap-2 p-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon aria-hidden className="size-4" /></span>
              <div className="min-w-0"><p className="text-xs font-semibold leading-tight">{title}</p><p className="text-[11px] text-muted-foreground">{detail}</p></div>
            </CardContent>
          </Card>
        </ScenePosition>)}
      </ProductSceneStage>
    </div>
  </>;
}
