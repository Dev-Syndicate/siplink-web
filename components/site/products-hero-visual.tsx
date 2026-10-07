import {
  Check,
  Headset,
  MessageSquareText,
  PhoneIncoming,
  Route,
  Sparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const waveform = [35, 60, 42, 85, 55, 100, 48, 72, 38, 64, 30];

export function ProductsHeroVisual() {
  return (
    <div
      role="img"
      aria-label="Illustrative SipLink workspace: a customer call is routed to an agent, its context is captured, and an account-update insight is ready for follow-up"
      className="relative isolate mx-auto w-full max-w-xl px-2 py-10 sm:px-6 lg:px-0"
    >
      <div aria-hidden className="scene-grid absolute inset-0 rounded-3xl opacity-40" />
      <div aria-hidden className="absolute inset-x-[12%] inset-y-[15%] -z-10 rounded-full bg-primary/15 blur-3xl" />

      <Card className="relative z-10 mx-auto w-[94%] gap-0 overflow-hidden rounded-2xl border border-border bg-card py-0 shadow-2xl shadow-primary/15">
        <CardHeader className="flex flex-row items-center gap-2 border-b border-border bg-muted/40 px-4 py-3 sm:px-5">
          <span aria-hidden className="flex shrink-0 gap-1"><span className="size-1.5 rounded-full bg-primary" /><span className="size-1.5 rounded-full bg-primary/35" /><span className="size-1.5 rounded-full bg-muted-foreground/25" /></span>
          <CardTitle className="ml-1 min-w-0 flex-1 truncate text-xs font-semibold sm:text-sm">SipLink workspace</CardTitle>
          <Badge variant="secondary" className="gap-1.5 text-[10px]"><span className="size-1.5 rounded-full bg-primary motion-safe:animate-pulse" />Live call</Badge>
        </CardHeader>

        <CardContent className="grid p-0 sm:grid-cols-[minmax(0,0.43fr)_minmax(0,0.57fr)]">
          <div className="flex flex-col justify-between gap-5 bg-foreground p-5 text-background sm:min-h-72 sm:p-6">
            <div>
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground"><PhoneIncoming className="size-5" aria-hidden /></span>
              <p className="mt-5 text-xs text-background/60">Business voice</p>
              <p className="mt-1 text-xl font-semibold leading-tight">Customer calling</p>
            </div>
            <div aria-hidden className="flex h-10 items-center gap-1">
              {waveform.map((height, index) => <span key={index} className="wave-bar w-1 rounded-full bg-primary" style={{ height: `${height}%`, animationDelay: `${index * -0.08}s` }} />)}
            </div>
            <span className="text-xs text-background/70">Connected now</span>
          </div>

          <div className="p-5 sm:p-6">
            <p className="text-xs font-medium text-muted-foreground">The call journey</p>
            <div className="relative mt-5 space-y-5 border-l border-primary/25 pl-5">
              <div className="relative">
                <span aria-hidden className="absolute top-1 -left-[1.68rem] flex size-3 items-center justify-center rounded-full bg-primary ring-4 ring-card" />
                <p className="flex items-center gap-2 text-sm font-semibold"><Route className="size-4 text-primary" aria-hidden />Routed to support</p>
                <p className="mt-1 text-xs text-muted-foreground">The right queue receives the call</p>
              </div>
              <div className="relative">
                <span aria-hidden className="absolute top-1 -left-[1.68rem] flex size-3 items-center justify-center rounded-full bg-primary ring-4 ring-card" />
                <p className="flex items-center gap-2 text-sm font-semibold"><Headset className="size-4 text-primary" aria-hidden />Agent connected</p>
                <p className="mt-1 text-xs text-muted-foreground">A person has the conversation</p>
              </div>
              <div className="relative">
                <span aria-hidden className="absolute top-1 -left-[1.68rem] flex size-3 items-center justify-center rounded-full bg-primary ring-4 ring-card" />
                <p className="flex items-center gap-2 text-sm font-semibold"><MessageSquareText className="size-4 text-primary" aria-hidden />Context captured</p>
                <p className="mt-1 text-xs text-muted-foreground">The next step stays visible</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="relative z-20 -mt-5 ml-auto w-[82%] gap-0 border border-primary bg-primary py-4 text-primary-foreground shadow-xl shadow-primary/25 sm:-mt-8 sm:w-[70%]">
        <CardContent className="flex items-start gap-3 px-4 sm:px-5">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-foreground/15"><Sparkles className="size-4" aria-hidden /></span>
          <div className="min-w-0">
            <p className="text-xs text-primary-foreground/75">Conversation insight</p>
            <p className="mt-1 text-sm font-semibold leading-snug">Customer needs an account update</p>
            <p className="mt-2 flex items-center gap-1 text-xs text-primary-foreground/85"><Check className="size-3.5" aria-hidden />Follow-up ready for the team</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
