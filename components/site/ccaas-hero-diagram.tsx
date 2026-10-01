import Image from "next/image";
import { Activity, ArrowDown, AudioLines, GitBranch, Headset, PhoneIncoming, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductSceneStage, ScenePosition, SceneWave } from "@/components/site/product-scene-primitives";

const routingFeatures = ["IVR menus", "Call queues", "Skill matching", "Queue callback"];

/** An illustrative, connected CCaaS call path sized for the hero's right column. */
export function CcaasHeroDiagram() {
  return <>
    <div className="space-y-3 lg:hidden" aria-label="Illustrative CCaaS call flow">
      <Card className="gap-0 overflow-hidden py-0 shadow-lg shadow-primary/10">
        <CardHeader className="flex flex-row items-center justify-between border-b border-border bg-primary/5 px-5 py-4">
          <div><Badge variant="secondary">01 · Arrive</Badge><CardTitle className="mt-2 text-lg">Incoming customer call</CardTitle></div>
          <PhoneIncoming aria-hidden className="size-6 text-primary" />
        </CardHeader>
        <CardContent className="flex items-center justify-between gap-3 p-5 text-sm">
          <span>Account enquiry</span><Badge>New call</Badge>
        </CardContent>
      </Card>
      <ArrowDown aria-hidden className="mx-auto size-5 text-primary motion-safe:animate-bounce" />
      <Card className="gap-0 overflow-hidden border-primary bg-primary py-0 text-primary-foreground shadow-xl shadow-primary/20">
        <CardHeader className="flex flex-row items-center justify-between border-b border-primary-foreground/20 px-5 py-4">
          <div><Badge variant="outline" className="border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground">02 · Route</Badge><CardTitle className="mt-2 text-lg">SipLink CCaaS</CardTitle></div>
          <GitBranch aria-hidden className="size-6" />
        </CardHeader>
        <CardContent className="p-5">
          <p className="text-2xl font-semibold leading-tight">Route calls to<br />the right agent.</p>
          <p className="mt-3 text-sm text-primary-foreground/85">Automatic distribution considers the request, queue and agent skills.</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {routingFeatures.map(feature => <Badge key={feature} variant="outline" className="h-auto justify-start border-primary-foreground/30 bg-primary-foreground/10 px-2 py-1 text-primary-foreground">{feature}</Badge>)}
          </div>
        </CardContent>
      </Card>
      <ArrowDown aria-hidden className="mx-auto size-5 text-primary motion-safe:animate-bounce" />
      <Card className="gap-0 overflow-hidden py-0 shadow-lg shadow-primary/10">
        <CardHeader className="flex flex-row items-center justify-between border-b border-border bg-primary/5 px-5 py-4">
          <div><Badge variant="secondary">03 · Answer</Badge><CardTitle className="mt-2 text-lg">Agent workspace</CardTitle></div>
          <Headset aria-hidden className="size-6 text-primary" />
        </CardHeader>
        <CardContent className="flex items-center justify-between gap-4 p-5">
          <div><p className="font-semibold">Sarah · Support</p><p className="mt-1 text-sm text-muted-foreground">Account enquiry connected</p></div>
          <AudioLines aria-hidden className="size-7 shrink-0 text-primary motion-safe:animate-pulse" />
        </CardContent>
      </Card>
      <ArrowDown aria-hidden className="mx-auto size-5 text-primary motion-safe:animate-bounce" />
      <Card className="gap-0 overflow-hidden py-0 shadow-lg shadow-primary/10">
        <CardHeader className="flex flex-row items-center justify-between border-b border-border bg-primary/5 px-5 py-4">
          <div><Badge variant="secondary">04 · Observe</Badge><CardTitle className="mt-2 text-lg">Live supervisor view</CardTitle></div>
          <Activity aria-hidden className="size-6 text-primary" />
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-2 p-5 text-center">
          {[{ value: "6", label: "Agents" }, { value: "2", label: "Waiting" }, { value: "4", label: "Talking" }].map(({ value, label }) => <div key={label} className="rounded-lg bg-muted/50 p-3">
            <p className="text-xl font-semibold text-primary">{value}</p><p className="mt-1 text-xs text-muted-foreground">{label}</p>
          </div>)}
          <p className="col-span-3 mt-2 flex items-center justify-center gap-2 text-xs text-muted-foreground"><Users aria-hidden className="size-4 text-primary" /> Queue and agent activity</p>
        </CardContent>
      </Card>
    </div>

    <div className="hidden lg:block">
      <ProductSceneStage
        name="ccaas-hero"
        label="CCaaS call path: IVR, automatic call distribution, queues, skill matching and callback help route an incoming request to a support agent, with live supervisor visibility"
        height={730}
        wires={[
          { from: "ccaas-caller", to: "ccaas-routing-in", lit: true },
          { from: "ccaas-routing-out", to: "ccaas-agent", lit: true },
          { from: "ccaas-routing-monitor", to: "ccaas-supervisor", lit: true },
        ]}
      >
        <ScenePosition x={25} y={165} w={235} joints={[{ id: "ccaas-caller", side: "r", left: "100%", top: "50%" }]}>
          <Card className="gap-0 border-primary/20 p-0 shadow-lg shadow-primary/10">
            <CardContent className="space-y-2 p-3">
              <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary"><PhoneIncoming aria-hidden className="size-5" /></span>
              <p className="text-sm font-semibold leading-tight">Customer call</p>
              <p className="text-xs text-muted-foreground">Account enquiry</p>
              <Badge variant="secondary" className="text-[10px]">Incoming</Badge>
            </CardContent>
          </Card>
        </ScenePosition>

        <ScenePosition x={305} y={65} w={365} joints={[
          { id: "ccaas-routing-in", side: "l", left: "0%", top: "42%" },
          { id: "ccaas-routing-out", side: "r", left: "100%", top: "42%" },
          { id: "ccaas-routing-monitor", side: "b", left: "50%", top: "100%" },
        ]}>
          <Card className="gap-0 overflow-hidden border-primary bg-primary p-0 text-primary-foreground shadow-xl shadow-primary/25">
            <CardHeader className="flex flex-row items-center gap-2 border-b border-primary-foreground/20 px-3 py-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary-foreground/15"><GitBranch aria-hidden className="size-4" /></span>
              <div><CardTitle className="text-sm">SipLink CCaaS</CardTitle><p className="text-[11px] text-primary-foreground/80">Automatic call distribution</p></div>
            </CardHeader>
            <CardContent className="p-3">
              <p className="text-base font-semibold leading-tight">Route calls to<br />the right agent.</p>
              <div className="mt-3 grid grid-cols-2 gap-1">
                {routingFeatures.map(feature => <Badge key={feature} variant="outline" className="h-auto justify-start border-primary-foreground/30 bg-primary-foreground/10 px-1.5 py-1 text-[10px] text-primary-foreground">{feature}</Badge>)}
              </div>
            </CardContent>
          </Card>
        </ScenePosition>

        <ScenePosition x={730} y={165} w={245} joints={[{ id: "ccaas-agent", side: "l", left: "0%", top: "45%" }]}>
          <Card className="gap-0 overflow-hidden p-0 shadow-lg shadow-primary/10">
            <CardHeader className="border-b border-border bg-muted/40 px-3 py-3"><CardTitle className="text-sm">Support agent</CardTitle></CardHeader>
            <CardContent className="space-y-3 p-3">
              <span className="relative mx-auto block size-12 overflow-hidden rounded-full ring-4 ring-primary/10"><Image src="/solns-remoteWorkforce/scene/caller.webp" alt="" fill sizes="48px" className="object-cover" /></span>
              <div className="text-center"><p className="text-xs font-semibold">Sarah Johnson</p><p className="text-[11px] text-muted-foreground">Account enquiry</p></div>
              <SceneWave animated className="h-7 gap-1 [&>span]:w-1" />
              <Badge variant="secondary" className="mx-auto block w-fit text-[10px]">Connected</Badge>
            </CardContent>
          </Card>
        </ScenePosition>

        <ScenePosition x={305} y={550} w={365} joints={[{ id: "ccaas-supervisor", side: "t", left: "50%", top: "0%" }]}>
          <Card className="gap-0 border-primary/20 p-0 shadow-lg shadow-primary/10">
            <CardContent className="p-3">
              <div className="flex items-center justify-between gap-2"><p className="text-xs font-semibold">Live supervisor view</p><Activity aria-hidden className="size-4 text-primary" /></div>
              <div className="mt-3 grid grid-cols-3 gap-1 text-center">
                {[{ value: "6", label: "Agents" }, { value: "2", label: "Waiting" }, { value: "4", label: "Talking" }].map(({ value, label }) => <div key={label} className="rounded-md bg-muted/60 p-1.5">
                  <p className="text-base font-semibold text-primary">{value}</p><p className="text-[10px] text-muted-foreground">{label}</p>
                </div>)}
              </div>
            </CardContent>
          </Card>
        </ScenePosition>
      </ProductSceneStage>
    </div>
  </>;
}
