"use client";

import Image from "next/image";
import {
  Bot,
  Calendar,
  Check,
  CheckCheck,
  Code2,
  Database,
  Headset,
  MessageCircle,
  Mic,
  PhoneIncoming,
  Send,
  Sparkles,
  Webhook,
} from "lucide-react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";

import {
  Chip,
  CornerTile,
  MobileSteps,
  Panel,
  Pill,
  SceneSection,
  Stage,
  Wires,
  at,
  useBeat,
} from "@/components/site/story-scene-kit";
import { cn } from "@/lib/utils";

/**
 * The two capabilities in the live announcement — "Voice AI Assistant and
 * WhatsApp Business v2 API endpoints are now live" — each shown at work.
 * The caller, the business and the messages are illustrative; nothing here
 * states a figure.
 */

/* ================================================================
 * Scene 1 — Voice AI Assistant
 * ================================================================ */

const TRANSCRIPT = [
  { who: "caller", text: "Hi, I need to move my appointment to Friday.", at: 2 },
  { who: "ai", text: "Of course. I have Friday at 11:00 or 15:30 — which works?", at: 3 },
  { who: "caller", text: "15:30, please. And can I talk to someone about billing?", at: 4 },
  { who: "ai", text: "Done — you're booked for Friday at 15:30. Connecting you to billing now.", at: 6 },
] as const;

const INTENTS = [
  { label: "Reschedule appointment", at: 3 },
  { label: "Billing question", at: 5 },
];

export function VoiceAiScene() {
  const BEATS = 11;
  const { ref, beat, still } = useBeat(BEATS, 1300);
  const b = still ? BEATS - 1 : beat;

  const ringing = b === 0 || b === 1;
  const booked = b >= 6;
  const handedOff = b >= 7;

  return (
    <MotionConfig reducedMotion="user">
      <SceneSection
        id="voice-ai"
        eyebrow="Now live · Voice AI Assistant"
        title="A call the assistant answers, understands, and hands off"
        description="The Voice AI Assistant picks up, works out what the caller needs, takes care of what it can, and passes the rest to the right person — with the context already on their screen."
      >
        <div className="hidden lg:block">
          <Stage stageRef={ref} label="An incoming call answered by the Voice AI Assistant, which reschedules an appointment, detects a billing question and hands the caller to a billing agent with a summary.">
            <Wires
              wires={[
                { d: "M38 36 C 45 36, 45 30, 52 30", lit: b >= 2 },
                { d: "M106 28 C 111 28, 111 22, 116 22", lit: b >= 3 },
                { d: "M106 46 C 111 46, 111 60, 116 60", lit: handedOff },
              ]}
            />

            <CornerTile icon={Mic} style={at(4, 3, 7)} still={still} />
            <CornerTile icon={Sparkles} style={at(149, 76, 7)} still={still} delay={2} />

            <Pill icon={Bot} label="Answers, understands, hands off" style={at(48, 2, 64)} />

            {/* Caller */}
            <motion.div
              className="absolute z-10 overflow-hidden rounded-[1.4cqw] border-[0.3cqw] border-card bg-card shadow-xl shadow-primary/20"
              style={at(4, 14, 34)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative aspect-[4/3]">
                <Image src="/images/people/person-sofia.webp" alt="" fill sizes="320px" className="object-cover object-top" />
                <span className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <span className="absolute top-[0.8cqw] left-[0.8cqw] flex items-center gap-[0.4cqw] rounded-full bg-card/85 px-[0.7cqw] py-[0.25cqw] text-[0.7cqw] font-semibold text-foreground">
                  <span className={cn("size-[0.6cqw] rounded-full", ringing ? "animate-pulse bg-primary" : "bg-primary")} />
                  {ringing ? "Calling…" : handedOff ? "With billing" : "Connected"}
                </span>
              </div>
              <div className="flex items-center gap-[0.7cqw] p-[0.9cqw]">
                <motion.span
                  className="flex size-[2.4cqw] items-center justify-center rounded-full bg-primary text-primary-foreground"
                  animate={ringing && !still ? { rotate: [0, -14, 14, -10, 10, 0] } : { rotate: 0 }}
                  transition={{ duration: 0.75, repeat: ringing ? Infinity : 0, repeatDelay: 0.5 }}
                >
                  <PhoneIncoming className="size-1/2" />
                </motion.span>
                <span className="leading-tight">
                  <span className="block text-[0.9cqw] font-semibold text-foreground">Sofia</span>
                  <span className="text-[0.7cqw] text-muted-foreground">Patient, calling the clinic</span>
                </span>
              </div>
            </motion.div>

            {/* Assistant transcript */}
            <Panel
              icon={Bot}
              title="Voice AI Assistant"
              subtitle="Live transcript"
              glow
              className="z-20"
              style={at(52, 14, 54)}
              aside={<Chip label={ringing ? "Answering" : handedOff ? "Handed off" : "On the call"} tone={handedOff ? "quiet" : "on"} />}
            >
              <div className="flex min-h-[12cqw] flex-col justify-end gap-[0.5cqw]">
                <AnimatePresence initial={false}>
                  {TRANSCRIPT.filter((t) => b >= t.at).map((t) => (
                    <motion.div
                      key={t.text}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className={cn("flex", t.who === "ai" ? "justify-end" : "justify-start")}
                    >
                      <span
                        className={cn(
                          "max-w-[80%] rounded-[0.9cqw] px-[0.8cqw] py-[0.5cqw] text-[0.78cqw] leading-snug",
                          t.who === "ai"
                            ? "rounded-br-[0.2cqw] bg-gradient-to-br from-brand-from to-brand-to text-primary-foreground"
                            : "rounded-bl-[0.2cqw] bg-muted/60 text-foreground",
                        )}
                      >
                        {t.text}
                      </span>
                    </motion.div>
                  ))}
                  {b >= 2 && b < 7 && !still && (
                    <motion.div key="wave" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex h-[1.6cqw] items-center gap-[0.15cqw] px-[0.4cqw]">
                      {Array.from({ length: 24 }, (_, i) => (
                        <motion.span
                          key={i}
                          className="w-[0.2cqw] rounded-full bg-primary/60"
                          animate={{ height: ["20%", `${30 + ((i * 37) % 70)}%`, "25%"] }}
                          transition={{ duration: 0.75, repeat: Infinity, delay: (i % 6) * 0.125 }}
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Panel>

            {/* Intent + action */}
            <Panel icon={Sparkles} title="Understood" subtitle="Intent detection" className="z-10" style={at(116, 12, 41)}>
              <div className="flex flex-col gap-[0.45cqw]">
                {INTENTS.map((intent) => {
                  const on = b >= intent.at;
                  return (
                    <div key={intent.label} className={cn("flex items-center gap-[0.6cqw] rounded-[0.8cqw] px-[0.6cqw] py-[0.5cqw] transition-all duration-500", on ? "bg-accent" : "bg-muted/40 opacity-45")}>
                      <span className={cn("flex size-[1.5cqw] items-center justify-center rounded-full", on ? "bg-primary text-primary-foreground" : "bg-muted")}>
                        {on && <Check className="size-3/5" />}
                      </span>
                      <span className="text-[0.8cqw] font-medium text-foreground">{intent.label}</span>
                    </div>
                  );
                })}
                <div className={cn("flex items-center gap-[0.6cqw] rounded-[0.8cqw] border px-[0.6cqw] py-[0.5cqw] transition-all duration-500", booked ? "border-primary/30 bg-card" : "border-transparent bg-muted/30 opacity-45")}>
                  <Calendar className="size-[1.2cqw] text-primary" />
                  <span className="text-[0.78cqw] text-foreground">{booked ? "Booked · Friday 15:30" : "Calendar"}</span>
                </div>
              </div>
            </Panel>

            {/* Handoff */}
            <Panel
              icon={Headset}
              title="Billing team"
              subtitle="Warm handoff with context"
              glow={handedOff}
              className="z-10"
              style={at(116, 50, 41)}
              aside={<Chip label={handedOff ? "Ringing" : "Waiting"} tone={handedOff ? "on" : "off"} />}
            >
              <div className={cn("flex items-start gap-[0.7cqw] transition-opacity duration-500", !handedOff && "opacity-40")}>
                <span className="relative size-[2.6cqw] shrink-0 overflow-hidden rounded-full ring-2 ring-card">
                  <Image src="/images/people/person-marcus.webp" alt="" fill sizes="44px" className="object-cover" />
                </span>
                <div className="rounded-[0.8cqw] bg-muted/50 px-[0.7cqw] py-[0.5cqw] text-[0.72cqw] leading-snug text-foreground">
                  <span className="font-semibold">Summary:</span> Appointment moved to Friday 15:30. Caller has a billing question.
                </div>
              </div>
            </Panel>
          </Stage>
        </div>

        <MobileSteps
          steps={[
            { icon: PhoneIncoming, title: "The assistant answers", body: "An incoming call is picked up straight away." },
            { icon: Sparkles, title: "It understands the request", body: "The caller wants to reschedule — and has a billing question." },
            { icon: Calendar, title: "It handles what it can", body: "The appointment is moved to Friday at 15:30." },
            { icon: Headset, title: "It hands off with context", body: "The caller is connected to billing, with a summary already on screen." },
          ]}
        />
      </SceneSection>
    </MotionConfig>
  );
}

/* ================================================================
 * Scene 2 — WhatsApp Business v2 API
 * ================================================================ */

const STATUSES = [
  { label: "accepted", at: 2, icon: Check },
  { label: "sent", at: 3, icon: Check },
  { label: "delivered", at: 4, icon: CheckCheck },
  { label: "read", at: 5, icon: CheckCheck },
];

export function WhatsAppApiScene() {
  const BEATS = 10;
  const { ref, beat, still } = useBeat(BEATS, 1250);
  const b = still ? BEATS - 1 : beat;

  const sent = b >= 1;
  const arrived = b >= 3;
  const read = b >= 5;
  const replied = b >= 6;
  const logged = b >= 7;

  return (
    <MotionConfig reducedMotion="user">
      <SceneSection
        id="whatsapp-api"
        tint
        eyebrow="Now live · WhatsApp Business v2 API"
        title="One API call, every status back to you"
        description="Send a WhatsApp Business message from your own application, follow it through sent, delivered and read with webhook events, and capture the customer's reply where your team already works."
      >
        <div className="hidden lg:block">
          <Stage stageRef={ref} label="An application sends a WhatsApp Business message through the API, the message is delivered and read, status webhooks return, and the customer's reply is logged to the CRM.">
            <Wires
              wires={[
                { d: "M46 32 C 52 32, 52 28, 58 28", lit: sent },
                { d: "M100 28 C 106 28, 106 26, 112 26", lit: arrived },
                { d: "M79 44 C 79 54, 79 60, 79 68", lit: logged },
              ]}
            />

            <CornerTile icon={Code2} style={at(4, 3, 7)} still={still} />
            <CornerTile icon={MessageCircle} style={at(149, 76, 7)} still={still} delay={2} />

            <Pill icon={Webhook} label="Send · Track · Reply · Log" style={at(55, 2, 50)} />

            {/* The request */}
            <Panel icon={Code2} title="Your application" subtitle="POST /v2/messages" className="z-10" style={at(3, 14, 43)} aside={<Chip label={sent ? "202" : "Ready"} tone={sent ? "on" : "off"} />}>
              <pre className="overflow-hidden rounded-[0.8cqw] bg-foreground/[0.04] p-[0.8cqw] font-mono text-[0.7cqw] leading-relaxed text-foreground">
                {`{
  "channel": "whatsapp",
  "to": "+1 •••• ••• 214",
  "template": "appointment_reminder",
  "params": ["Friday", "15:30"]
}`}
              </pre>
              <motion.div
                className={cn("flex items-center justify-center gap-[0.5cqw] rounded-[0.8cqw] py-[0.6cqw] text-[0.8cqw] font-semibold", sent ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}
                animate={{ scale: b === 1 && !still ? [1, 0.95, 1] : 1 }}
                transition={{ duration: 0.3 }}
              >
                <Send className="size-[1cqw]" />
                {sent ? "Message accepted" : "Send"}
              </motion.div>
            </Panel>

            {/* Status webhooks */}
            <Panel icon={Webhook} title="Status webhooks" subtitle="Delivered to your endpoint" glow className="z-20" style={at(58, 14, 42)}>
              <div className="flex flex-col gap-[0.45cqw]">
                {STATUSES.map(({ label, at: when, icon: Icon }) => {
                  const on = b >= when;
                  return (
                    <motion.div
                      key={label}
                      animate={{ opacity: on ? 1 : 0.35, x: on ? 0 : -6 }}
                      transition={{ duration: 0.35 }}
                      className={cn("flex items-center gap-[0.6cqw] rounded-[0.8cqw] px-[0.6cqw] py-[0.45cqw] font-mono text-[0.75cqw]", on ? "bg-accent" : "bg-muted/40")}
                    >
                      <span className={cn("flex size-[1.5cqw] items-center justify-center rounded-full", on ? "bg-primary text-primary-foreground" : "bg-muted")}>
                        <Icon className="size-3/5" />
                      </span>
                      <span className="text-foreground">message.status</span>
                      <span className="ml-auto font-semibold text-primary">{on ? label : "…"}</span>
                    </motion.div>
                  );
                })}
              </div>
            </Panel>

            {/* The customer's phone */}
            <motion.div
              className="absolute z-10 overflow-hidden rounded-[2cqw] border-[0.45cqw] border-foreground/90 bg-card shadow-2xl shadow-primary/20"
              style={{ ...at(112, 12, 30), aspectRatio: "9 / 12" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-[0.5cqw] bg-primary px-[0.8cqw] pt-[1.4cqw] pb-[0.6cqw] text-primary-foreground">
                <span className="flex size-[1.8cqw] items-center justify-center rounded-full bg-primary-foreground/20 font-mono text-[0.65cqw] font-bold">AC</span>
                <span className="leading-tight">
                  <span className="block text-[0.8cqw] font-semibold">ABC Clinic</span>
                  <span className="text-[0.6cqw] text-primary-foreground/80">Business account</span>
                </span>
              </div>
              <div className="flex h-full flex-col gap-[0.5cqw] bg-gradient-to-b from-accent/50 to-card p-[0.7cqw]">
                <AnimatePresence>
                  {arrived && (
                    <motion.div
                      key="in"
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className="max-w-[90%] rounded-[0.8cqw] rounded-tl-[0.2cqw] bg-card px-[0.7cqw] py-[0.5cqw] text-[0.72cqw] leading-snug text-foreground shadow-sm"
                    >
                      Reminder: your appointment is on Friday at 15:30. Reply to confirm.
                      <span className="mt-[0.2cqw] flex justify-end">
                        <CheckCheck className={cn("size-[1cqw]", read ? "text-primary" : "text-muted-foreground")} />
                      </span>
                    </motion.div>
                  )}
                  {replied && (
                    <motion.div
                      key="out"
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className="ml-auto max-w-[80%] rounded-[0.8cqw] rounded-tr-[0.2cqw] bg-primary px-[0.7cqw] py-[0.5cqw] text-[0.72cqw] text-primary-foreground shadow-sm"
                    >
                      Confirmed, thank you!
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Logged */}
            <Panel
              icon={Database}
              title={logged ? "Reply logged to the CRM" : "Replies flow back into your CRM"}
              subtitle="inbound message → contact timeline"
              glow={logged}
              className="z-10"
              style={at(54, 68, 50)}
              aside={logged ? <Chip label="Synced" tone="on" /> : <Chip label="Listening" tone="off" />}
            />
          </Stage>
        </div>

        <MobileSteps
          steps={[
            { icon: Code2, title: "Send from your application", body: "One API call sends a WhatsApp Business template message." },
            { icon: Webhook, title: "Track every status", body: "Webhooks report the message as accepted, sent, delivered and read." },
            { icon: MessageCircle, title: "The customer replies", body: "Their reply arrives back through the same API." },
            { icon: Database, title: "Logged where your team works", body: "The conversation lands on the contact's CRM timeline." },
          ]}
        />
      </SceneSection>
    </MotionConfig>
  );
}

