"use client";

import Image from "next/image";
import {
  Activity,
  Bot,
  Briefcase,
  Check,
  Cloud,
  Code2,
  GraduationCap,
  Headset,
  Inbox,
  MessagesSquare,
  Network,
  Phone,
  Rocket,
  Sparkles,
  TrendingUp,
  Users,
  Workflow,
  type LucideIcon,
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
 * Two working scenes for the careers page.
 *
 * The first shows what "work with great people" looks like on an ordinary
 * day: one customer issue picked up by support, the network team and
 * engineering together until it is resolved. The second shows "keep
 * learning, grow with us": the areas the guide says people get to explore,
 * lighting one by one, and the growth they lead to. People, tickets and
 * messages are illustrative.
 */

/* ================================================================
 * Scene 1 — one issue, three teams
 * ================================================================ */

const TICKETS = [
  { title: "Choppy audio on branch calls", from: "Retail customer", hot: true },
  { title: "New extensions for a sales team", from: "Staffing customer", hot: false },
  { title: "Port a toll-free number", from: "Healthcare customer", hot: false },
];

const THREAD = [
  {
    team: "Customer Success",
    name: "Sofia",
    photo: "/images/people/person-sofia.webp",
    text: "Picked this up — pulling call samples from the branch.",
    at: 1,
  },
  {
    team: "Network & NOC",
    name: "Daniel",
    photo: "/images/people/person-daniel.webp",
    text: "Route quality dipped on one carrier path. Moving traffic to the backup route.",
    at: 3,
  },
  {
    team: "Engineering",
    name: "Marcus",
    photo: "/images/people/person-marcus.webp",
    text: "Config fix is rolling out so it does not come back.",
    at: 5,
  },
];

/* Voice quality across the morning: dips, then recovers. */
const BARS_BAD = [70, 72, 40, 28, 35, 30, 42, 38];
const BARS_GOOD = [70, 72, 74, 76, 75, 78, 77, 79];

export function TeamworkScene() {
  const BEATS = 10;
  const { ref, beat, still } = useBeat(BEATS, 1250);
  const b = still ? BEATS - 1 : beat;

  const recovering = b >= 4;
  const healthy = b >= 6;
  const resolved = b >= 7;

  return (
    <MotionConfig reducedMotion="user">
      <SceneSection
        id="teamwork"
        eyebrow="Work with great people"
        title="One issue, three teams, one fix"
        description="Customer success, the network operations team and engineering work the same problem together — so you learn from every side of the platform, and customers get one joined-up answer."
      >
        <div className="hidden lg:block">
          <Stage stageRef={ref} label="A customer's choppy-audio ticket picked up by customer success, rerouted by the network team and fixed by engineering, with voice quality recovering until the ticket is resolved.">
            <Wires
              wires={[
                { d: "M45 30 C 51 30, 52 26, 58 26", lit: b >= 1 },
                { d: "M104 26 C 109 26, 109 22, 114 22", lit: b >= 3 },
                { d: "M81 46 C 81 58, 81 64, 81 72", lit: resolved },
              ]}
            />

            <CornerTile icon={Headset} style={at(4, 3, 7)} still={still} />
            <CornerTile icon={Network} style={at(149, 74, 7)} still={still} delay={2} />

            <Pill icon={Users} label="Real work, shared across teams" style={at(45, 2, 70)} />

            {/* Queue */}
            <Panel icon={Inbox} title="Support queue" subtitle="Customer Success" className="z-10" style={at(3, 14, 42)} aside={<Chip label="3 open" />}>
              <div className="flex flex-col gap-[0.45cqw]">
                {TICKETS.map((t) => {
                  const lit = t.hot;
                  return (
                    <div
                      key={t.title}
                      className={cn(
                        "flex items-center gap-[0.6cqw] rounded-[0.8cqw] px-[0.7cqw] py-[0.55cqw] transition-all duration-500",
                        lit ? "bg-accent shadow-sm shadow-primary/20" : "bg-muted/40",
                      )}
                    >
                      <span
                        className={cn(
                          "size-[0.7cqw] shrink-0 rounded-full",
                          lit ? (resolved ? "bg-primary" : "animate-pulse bg-destructive") : "bg-muted-foreground/30",
                        )}
                      />
                      <span className="flex min-w-0 flex-col leading-tight">
                        <span className="truncate text-[0.82cqw] font-semibold text-foreground">{t.title}</span>
                        <span className="text-[0.66cqw] text-muted-foreground">{t.from}</span>
                      </span>
                      {lit && <span className="ml-auto"><Chip label={resolved ? "Resolved" : b >= 1 ? "In progress" : "New"} tone={resolved ? "on" : "quiet"} /></span>}
                    </div>
                  );
                })}
              </div>
            </Panel>

            {/* Thread */}
            <Panel
              icon={MessagesSquare}
              title="Working on it"
              subtitle="Choppy audio on branch calls"
              glow
              className="z-20"
              style={at(58, 14, 46)}
              aside={
                <span className="flex -space-x-[0.5cqw]">
                  {THREAD.map((m) => (
                    <motion.span
                      key={m.name}
                      className="relative size-[1.9cqw] overflow-hidden rounded-full ring-2 ring-card"
                      animate={{ opacity: b >= m.at ? 1 : 0.2, scale: b >= m.at ? 1 : 0.8 }}
                    >
                      <Image src={m.photo} alt="" fill sizes="32px" className="object-cover" />
                    </motion.span>
                  ))}
                </span>
              }
            >
              <div className="flex min-h-[12.5cqw] flex-col gap-[0.55cqw]">
                <AnimatePresence initial={false}>
                  {THREAD.filter((m) => b >= m.at).map((m) => (
                    <motion.div
                      key={m.name}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="flex items-start gap-[0.6cqw]"
                    >
                      <span className="relative size-[2.2cqw] shrink-0 overflow-hidden rounded-full ring-1 ring-border">
                        <Image src={m.photo} alt="" fill sizes="36px" className="object-cover" />
                      </span>
                      <div className="flex-1 rounded-[0.8cqw] rounded-tl-[0.2cqw] bg-muted/50 px-[0.7cqw] py-[0.5cqw]">
                        <div className="flex items-center gap-[0.5cqw]">
                          <span className="text-[0.75cqw] font-semibold text-foreground">{m.name}</span>
                          <span className="text-[0.62cqw] font-medium text-primary">{m.team}</span>
                        </div>
                        <p className="text-[0.75cqw] leading-snug text-foreground/85">{m.text}</p>
                      </div>
                    </motion.div>
                  ))}
                  {b === 0 && (
                    <motion.div key="waiting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-[0.75cqw] text-muted-foreground">
                      A new ticket just came in…
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Panel>

            {/* Voice quality */}
            <Panel
              icon={Activity}
              title="Voice quality"
              subtitle="Branch calls, this morning"
              className="z-10"
              style={at(114, 12, 43)}
              aside={<Chip label={healthy ? "Healthy" : recovering ? "Recovering" : "Degraded"} tone={healthy ? "on" : recovering ? "quiet" : "bad"} />}
            >
              <div className="flex h-[9cqw] items-end gap-[0.4cqw] rounded-[0.8cqw] bg-gradient-to-b from-accent/40 to-transparent px-[0.6cqw] pt-[0.6cqw]">
                {BARS_BAD.map((bad, i) => {
                  const h = healthy ? BARS_GOOD[i] : recovering && i >= 5 ? (bad + BARS_GOOD[i]) / 2 : bad;
                  const low = !healthy && h < 50;
                  return (
                    <motion.span
                      key={i}
                      className={cn("flex-1 rounded-t-[0.3cqw]", low ? "bg-destructive/50" : "bg-gradient-to-t from-brand-from to-brand-to")}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.05 }}
                    />
                  );
                })}
              </div>
              <div className="flex justify-between text-[0.62cqw] text-muted-foreground">
                <span>08:00</span>
                <span>{healthy ? "Steady again" : "Watching the dip"}</span>
              </div>
            </Panel>

            {/* Outcome */}
            <Panel
              icon={resolved ? Check : Phone}
              title={resolved ? "Resolved — customer informed" : "One owner keeps the customer updated"}
              subtitle="Customer Success · Network & NOC · Engineering"
              glow={resolved}
              className="z-10"
              style={at(54, 72, 54)}
            />
          </Stage>
        </div>

        <MobileSteps
          steps={[
            { icon: Inbox, title: "A ticket comes in", body: "A customer reports choppy audio on their branch calls." },
            { icon: Headset, title: "Customer Success picks it up", body: "Call samples are gathered and the customer is kept informed." },
            { icon: Network, title: "The network team reroutes", body: "Traffic moves to the backup route while the dip is investigated." },
            { icon: Code2, title: "Engineering fixes the cause", body: "A configuration fix rolls out so it does not come back." },
            { icon: Check, title: "Resolved, together", body: "Voice quality is steady again and the ticket is closed." },
          ]}
        />
      </SceneSection>
    </MotionConfig>
  );
}

/* ================================================================
 * Scene 2 — keep learning, grow with us
 * ================================================================ */

/* The areas the careers copy says people get to explore. */
const TOPICS: { label: string; icon: LucideIcon }[] = [
  { label: "Cloud communications", icon: Cloud },
  { label: "VoIP", icon: Phone },
  { label: "AI", icon: Bot },
  { label: "APIs", icon: Code2 },
  { label: "CRM integrations", icon: Workflow },
  { label: "Networking", icon: Network },
];

const GROWTH: { label: string; icon: LucideIcon }[] = [
  { label: "Take ownership", icon: Briefcase },
  { label: "Develop new skills", icon: GraduationCap },
  { label: "Build your career", icon: TrendingUp },
];

const TEAMS = ["Technology", "Operations", "Sales", "Customer success", "Support"];

export function GrowthScene() {
  const BEATS = 12;
  const { ref, beat, still } = useBeat(BEATS, 1100);
  const b = still ? BEATS - 1 : beat;

  const topicLit = (i: number) => b >= 1 + i;
  const growthLit = (i: number) => b >= 7 + i;
  const learned = TOPICS.filter((_, i) => topicLit(i)).length;

  return (
    <MotionConfig reducedMotion="user">
      <SceneSection
        id="growth"
        tint
        eyebrow="Keep learning · Grow with us"
        title="Learn across the whole stack, then own it"
        description="Explore cloud communications, VoIP, AI, APIs, CRM integrations, networking, and emerging communication technologies — and as SipLink grows, take ownership, develop new skills, and build your career."
      >
        <div className="hidden lg:block">
          <Stage stageRef={ref} label="A team member's profile filling in as they explore cloud communications, VoIP, AI, APIs, CRM integrations and networking, leading to ownership, new skills and career growth.">
            <Wires
              wires={[
                { d: "M38 38 C 45 38, 45 34, 52 34", lit: b >= 1 },
                { d: "M108 34 C 113 34, 113 26, 118 26", lit: b >= 7 },
              ]}
            />

            <CornerTile icon={Sparkles} style={at(149, 3, 7)} still={still} />
            <CornerTile icon={Rocket} style={at(4, 75, 7)} still={still} delay={2} />

            <Pill icon={Sparkles} label="Ownership · Collaboration · Continuous learning · Customer-first" style={at(25, 2, 110)} />

            {/* The person */}
            <motion.div
              className="absolute z-10 overflow-hidden rounded-[1.4cqw] border-[0.3cqw] border-card bg-card shadow-xl shadow-primary/20"
              style={at(4, 25, 34)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-[0.9cqw] bg-gradient-to-br from-primary/10 to-transparent p-[0.9cqw]">
                <span className="relative size-[4.2cqw] shrink-0 overflow-hidden rounded-full ring-[0.25cqw] ring-card shadow-md shadow-primary/20">
                  <Image src="/images/avatars/avatar-emma.webp" alt="" fill sizes="64px" className="object-cover" />
                </span>
                <span className="min-w-0 leading-tight">
                  <span className="block text-[1.05cqw] font-semibold text-foreground">Emma</span>
                  <span className="block text-[0.72cqw] text-muted-foreground">Implementation & onboarding</span>
                </span>
              </div>
              <ul className="grid grid-cols-2 gap-x-[0.8cqw] gap-y-[0.45cqw] border-y border-border px-[0.9cqw] py-[0.8cqw]">
                {TOPICS.map(({ label, icon: Icon }, i) => {
                  const lit = topicLit(i);
                  return (
                    <li
                      key={label}
                      className={cn(
                        "flex items-center gap-[0.4cqw] text-[0.68cqw] transition-colors duration-500",
                        lit ? "text-foreground" : "text-muted-foreground/60",
                      )}
                    >
                      <span
                        className={cn(
                          "grid size-[1.3cqw] shrink-0 place-items-center rounded-full transition-colors duration-500",
                          lit ? "bg-primary text-primary-foreground" : "bg-muted",
                        )}
                      >
                        {lit ? <Check className="size-[0.75cqw]" /> : <Icon className="size-[0.7cqw]" />}
                      </span>
                      <span className="truncate">{label}</span>
                    </li>
                  );
                })}
              </ul>
              <div className="flex flex-col gap-[0.5cqw] p-[0.9cqw]">
                <div className="flex items-center justify-between text-[0.72cqw]">
                  <span className="font-medium text-foreground">Areas explored</span>
                  <span className="font-mono text-primary">
                    {learned} / {TOPICS.length}
                  </span>
                </div>
                <div className="h-[0.6cqw] overflow-hidden rounded-full bg-muted">
                  <motion.span
                    className="block h-full rounded-full bg-gradient-to-r from-brand-from to-brand-to"
                    animate={{ width: `${(learned / TOPICS.length) * 100}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                </div>
              </div>
            </motion.div>

            {/* What there is to learn */}
            <Panel icon={GraduationCap} title="Keep learning" subtitle="Across the platform" glow className="z-20" style={at(52, 16, 56)}>
              <div className="grid grid-cols-3 gap-[0.6cqw]">
                {TOPICS.map(({ label, icon: Icon }, i) => {
                  const lit = topicLit(i);
                  const now = b === 1 + i;
                  return (
                    <motion.div
                      key={label}
                      animate={{ scale: now ? 1.05 : 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 18 }}
                      className={cn(
                        "relative flex flex-col items-center gap-[0.5cqw] rounded-[1cqw] px-[0.5cqw] py-[1cqw] text-center transition-colors duration-500",
                        lit ? "bg-accent shadow-sm shadow-primary/20" : "bg-muted/40",
                      )}
                    >
                      <span
                        className={cn(
                          "flex size-[2.6cqw] items-center justify-center rounded-full transition-colors duration-500",
                          lit ? "bg-gradient-to-br from-brand-from to-brand-to text-primary-foreground" : "bg-muted text-muted-foreground",
                        )}
                      >
                        <Icon className="size-1/2" />
                      </span>
                      <span className={cn("text-[0.75cqw] leading-tight font-medium", lit ? "text-foreground" : "text-muted-foreground")}>
                        {label}
                      </span>
                      {lit && (
                        <span className="absolute top-[0.5cqw] right-[0.5cqw] flex size-[1.2cqw] items-center justify-center rounded-full bg-primary text-primary-foreground">
                          <Check className="size-3/5" />
                        </span>
                      )}
                    </motion.div>
                  );
                })}
              </div>
              <p className="text-[0.72cqw] text-muted-foreground">…and emerging communication technologies.</p>
            </Panel>

            {/* Growth */}
            <Panel icon={TrendingUp} title="Grow with us" subtitle="As SipLink grows" className="z-10" style={at(118, 14, 39)}>
              <div className="relative flex flex-col gap-[0.6cqw]">
                {GROWTH.map(({ label, icon: Icon }, i) => {
                  const lit = growthLit(i);
                  return (
                    <div
                      key={label}
                      className={cn(
                        "flex items-center gap-[0.7cqw] rounded-[0.8cqw] px-[0.7cqw] py-[0.6cqw] transition-all duration-500",
                        lit ? "bg-accent shadow-sm shadow-primary/20" : "bg-muted/40 opacity-50",
                      )}
                      style={{ marginLeft: `${i * 1.2}cqw` }}
                    >
                      <span
                        className={cn(
                          "flex size-[2cqw] items-center justify-center rounded-full transition-colors duration-500",
                          lit ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                        )}
                      >
                        <Icon className="size-1/2" />
                      </span>
                      <span className="text-[0.8cqw] font-semibold text-foreground">{label}</span>
                    </div>
                  );
                })}
              </div>
            </Panel>

            {/* Who you work with */}
            <Panel
              icon={Users}
              title="Work with great people"
              subtitle="Collaborate with teams across"
              className="z-10"
              style={at(52, 66, 56)}
            >
              <div className="flex flex-wrap gap-[0.5cqw]">
                {TEAMS.map((t, i) => (
                  <motion.span
                    key={t}
                    animate={{ opacity: b >= 9 + (i % 3) || still ? 1 : 0.45 }}
                    className="rounded-full bg-accent px-[0.8cqw] py-[0.3cqw] text-[0.75cqw] font-medium text-accent-foreground"
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
            </Panel>
          </Stage>
        </div>

        <MobileSteps
          steps={[
            { icon: GraduationCap, title: "Keep learning", body: "Explore cloud communications, VoIP, AI, APIs, CRM integrations, networking, and emerging communication technologies." },
            { icon: Users, title: "Work with great people", body: "Collaborate with teams across technology, operations, sales, customer success, and support." },
            { icon: Briefcase, title: "Take ownership", body: "As SipLink grows, there are opportunities to take ownership." },
            { icon: TrendingUp, title: "Grow with us", body: "Develop new skills and build your career." },
          ]}
        />
      </SceneSection>
    </MotionConfig>
  );
}
