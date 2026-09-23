"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play, UserMinus, UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { queueAgents, queueDepartments } from "@/lib/business-size";
import { cn } from "@/lib/utils";

/** One beat of the floor. */
const TICK_MS = 950;
/** Beats an agent stays on a call. */
const HANDLE_TICKS = 4;
/** Chance a new caller arrives on a given beat. */
const ARRIVAL_RATE = 0.72;
/** Past this the queue stops growing on screen; the number keeps counting. */
const SHOWN = 6;

type Caller = { id: number; department: string };
type Agent = { id: number; busyFor: number };

/**
 * The floor, as one value.
 *
 * Queue, agents and the running total move together on every beat — an agent
 * going free and a caller leaving the queue are the same event — so they are
 * one piece of state rather than three. Three would let a render land between
 * them and show a free agent beside someone waiting, which is precisely the
 * thing this is meant to argue never happens.
 */
type Floor = { agents: Agent[]; queue: Caller[]; answered: number; lastId: number };

function beat(floor: Floor): Floor {
  const queue = [...floor.queue];
  let answered = floor.answered;

  const agents = floor.agents.map((agent) => ({
    ...agent,
    busyFor: Math.max(0, agent.busyFor - 1),
  }));

  for (const agent of agents) {
    if (agent.busyFor === 0 && queue.length > 0) {
      queue.shift();
      agent.busyFor = HANDLE_TICKS;
      answered += 1;
    }
  }

  let lastId = floor.lastId;
  if (Math.random() < ARRIVAL_RATE) {
    lastId += 1;
    queue.push({
      id: lastId,
      department:
        queueDepartments[Math.floor(Math.random() * queueDepartments.length)],
    });
  }

  return { agents, queue, answered, lastId };
}

/**
 * Mid-market: a queue, and the staffing decision that empties it.
 *
 * Drawn as two columns with callers crossing between them, because that is
 * the shape of the problem at this size — not where a call can go, but how
 * many are waiting and who is free. A topology diagram cannot show a backlog;
 * a queue can, and the backlog is the thing being bought.
 *
 * Opening and closing an agent is the real control: the queue visibly drains
 * or builds, which argues for the reporting the page sells better than a
 * sentence about reporting does.
 */
export function SizeQueue() {
  const [floor, setFloor] = useState<Floor>(() => ({
    agents: Array.from({ length: queueAgents.atFirst }, (_, id) => ({
      id,
      busyFor: 0,
    })),
    queue: [],
    answered: 0,
    lastId: 0,
  }));
  const [running, setRunning] = useState(true);
  const timer = useRef<number | undefined>(undefined);
  const still = useReducedMotion();

  useEffect(() => {
    if (!running || still) return;

    timer.current = window.setTimeout(() => setFloor(beat), TICK_MS);
    return () => window.clearTimeout(timer.current);
  }, [running, floor, still]);

  const staff = useCallback((delta: number) => {
    setFloor((current) => {
      if (delta > 0 && current.agents.length < queueAgents.max) {
        return {
          ...current,
          agents: [
            ...current.agents,
            { id: (current.agents.at(-1)?.id ?? 0) + 1, busyFor: 0 },
          ],
        };
      }
      if (delta < 0 && current.agents.length > queueAgents.min) {
        return { ...current, agents: current.agents.slice(0, -1) };
      }
      return current;
    });
  }, []);

  const { agents, queue, answered } = floor;
  const free = agents.filter((agent) => agent.busyFor === 0).length;
  const shown = queue.slice(0, SHOWN);
  const overflow = queue.length - shown.length;

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        {/* Waiting */}
        <div className="border-b border-border p-5 sm:border-r sm:border-b-0">
          <div className="flex items-baseline justify-between">
            <h3 className="text-sm font-medium">Waiting</h3>
            <span
              className="text-2xl font-semibold text-primary tabular-nums"
              aria-live="polite"
            >
              {queue.length}
            </span>
          </div>

          {/* Tall enough for a full queue whether or not one is waiting. The
              queue changes on every beat, and a panel that resized with it
              would shunt the rest of the page up and down while you read. */}
          <ul className="mt-4 min-h-[19rem] space-y-1.5">
            {shown.map((caller, position) => (
              <li
                key={caller.id}
                className="queue-in flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2"
              >
                {/* A queue is ordered, so position is real information — it
                    is the thing the caller is experiencing. */}
                <span className="text-sm tabular-nums">
                  {position + 1}
                  <span className="ml-2 text-muted-foreground">in line</span>
                </span>
                <span className="text-xs text-muted-foreground">
                  {caller.department}
                </span>
              </li>
            ))}

            {/* An empty queue is the good outcome, so it says so. */}
            {queue.length === 0 ? (
              <li className="rounded-lg border border-dashed border-border px-3 py-6 text-center text-sm text-muted-foreground">
                Nobody waiting
              </li>
            ) : null}

            {overflow > 0 ? (
              <li className="px-3 pt-1 text-xs text-muted-foreground tabular-nums">
                +{overflow} more holding
              </li>
            ) : null}
          </ul>
        </div>

        {/* Agents */}
        <div className="p-5">
          <div className="flex items-baseline justify-between">
            <h3 className="text-sm font-medium">Agents</h3>
            <span className="text-sm text-muted-foreground tabular-nums">
              {free} free of {agents.length}
            </span>
          </div>

          <ul className="mt-4 grid grid-cols-4 gap-2">
            {agents.map((agent) => (
              <li
                key={agent.id}
                className={cn(
                  "flex h-11 items-center justify-center rounded-lg border text-[11px] font-medium transition-colors duration-300",
                  agent.busyFor > 0
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-muted/50 text-muted-foreground",
                )}
              >
                {agent.busyFor > 0 ? "On call" : "Free"}
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => staff(1)}
              disabled={agents.length >= queueAgents.max}
            >
              <UserPlus className="size-4" aria-hidden />
              Open an agent
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => staff(-1)}
              disabled={agents.length <= queueAgents.min}
            >
              <UserMinus className="size-4" aria-hidden />
              Close one
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-muted/40 px-5 py-3">
        <p className="text-sm text-muted-foreground tabular-nums">
          {answered} answered since you arrived
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setRunning((state) => !state)}
        >
          {running ? (
            <Pause className="size-4" aria-hidden />
          ) : (
            <Play className="size-4" aria-hidden />
          )}
          {running ? "Pause the floor" : "Resume"}
        </Button>
      </div>
    </div>
  );
}
