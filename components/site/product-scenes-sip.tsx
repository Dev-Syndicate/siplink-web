import { Building2, Check, Globe, Lock, Radio, Router, Server, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ScenePosition, SceneStatus, SceneTile, SceneWave, ProductSceneStage } from "@/components/site/product-scene-primitives";

import { CallingHandset, CallingLaptop } from "@/components/site/calling-devices-scene";

/** Existing equipment is the centre of this story, not a new cloud workspace. */
export function SipProductScene() {
  return <ProductSceneStage name="sip-trunking" height={780} animated label="Illustrative SIP trunking: an existing PBX rack and extension console connect through a SIP router to local, mobile and international calling." paths={[
    "M 255 245 C 305 245 325 205 365 205", "M 550 195 C 620 195 610 110 690 110", "M 550 250 C 640 250 620 335 750 335", "M 550 295 C 575 295 555 525 580 525", "M 140 380 C 140 410 220 410 220 425",
  ]}>
    <ScenePosition x={25} y={110} w={230}><Card className="gap-[1.5cqw] rounded-[2cqw] bg-foreground py-[2cqw] text-background shadow-xl shadow-primary/15"><CardContent className="px-[2cqw]"><div className="mb-[1.8cqw] flex items-center gap-[1cqw]"><Server className="size-[2.3cqw] text-primary" /><div><p className="text-[1.6cqw] font-semibold">Your existing PBX</p><p className="text-[1cqw] text-background/60">On your premises</p></div></div>{["Voice processor", "Extension services", "Network interface"].map((label,index) => <div key={label} className="mb-[0.8cqw] flex h-[4.4cqw] items-center justify-between rounded-[0.6cqw] border border-background/15 bg-background/5 px-[1cqw]"><span className="text-[1cqw]">{label}</span><span className="flex gap-[0.35cqw]" aria-hidden>{[0,1,2].map(dot => <span key={dot} className={index===2 ? "scene-pulse size-[0.45cqw] rounded-full bg-primary" : "size-[0.45cqw] rounded-full bg-background/40"} />)}</span></div>)}<p className="mt-[1.3cqw] flex items-center gap-[0.5cqw] text-[1cqw] text-background/70"><Check className="size-[1.2cqw] text-primary" />Keep your equipment</p></CardContent></Card></ScenePosition>
    <ScenePosition x={365} y={120} w={185}><Card className="gap-[1.5cqw] rounded-[2.4cqw] py-[2cqw] shadow-xl shadow-primary/20 ring-primary/30"><CardContent className="px-[1.8cqw]"><span className="flex size-[5cqw] items-center justify-center rounded-[1.5cqw] bg-primary text-primary-foreground"><Router className="size-[3cqw]" /></span><p className="mt-[1.4cqw] text-[1.8cqw] font-semibold">SIP trunk</p><p className="text-[1.1cqw] text-primary">SipLink IP network</p><div className="my-[1.6cqw] border-y border-border py-[1cqw]"><SceneWave animated /><p className="mt-[0.8cqw] text-[1cqw] text-muted-foreground">Voice over IP</p></div><div className="flex items-center gap-[0.5cqw] text-[1cqw]"><Lock className="size-[1.3cqw] text-primary" />Protected connection</div></CardContent></Card></ScenePosition>
    <ScenePosition x={690} y={40} w={260}><SceneTile icon={Building2} title="Local calling" detail="Customer & office conversations" /><div className="mt-[1cqw] flex items-center justify-center gap-[1cqw] rounded-full bg-accent/70 px-[1cqw] py-[0.8cqw] text-[1cqw] text-primary"><Radio className="scene-pulse size-[1.3cqw]" />Connected through the IP network</div></ScenePosition>
    <ScenePosition x={750} y={230} w={200}><CallingHandset /></ScenePosition>
    <ScenePosition x={580} y={490} w={160}><SceneTile icon={Globe} title="International" detail="Global destinations" /></ScenePosition>
    <ScenePosition x={65} y={425} w={470}><CallingLaptop /></ScenePosition>
    <ScenePosition x={370} y={48} w={255}><div className="flex justify-center"><SceneStatus>Existing system. New connection.</SceneStatus></div></ScenePosition>
    <ScenePosition x={35} y={40} w={260}><div className="flex items-center gap-[0.8cqw] text-[1.15cqw] text-muted-foreground"><ShieldCheck className="size-[1.7cqw] text-primary" />Built around your call traffic</div></ScenePosition>
  </ProductSceneStage>;
}
