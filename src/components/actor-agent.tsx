"use client";

import { useCallback, useRef, useState } from "react";
import { sample } from "lodash";
import { useTimeout } from "usehooks-ts";

import type { AtlasConfig, AtlasSpriteHandle } from "@/types";

import atlasConfig from "@/data/atlas.json";

import { AtlasSprite } from "@/components/atlas-sprite";

const SPAWN_DELAY_MIN = 1000;
const SPAWN_DELAY_RANGE = 5000;
const WORKING_DURATION_MIN = 4000;
const WORKING_DURATION_RANGE = 6000;

const AGENT_SKINS = ["agent-01", "agent-02", "agent-03", "agent-04"] as const;
const AGENT_RANDOM_ANIMATIONS = ["task-complete", "task-failed", "clarification-needed"] as const;

type Phase = "idle" | "spawn" | "working" | "random";

const randomDelay = (min: number, range: number) => min + Math.random() * range;

const ActorAgent = () => {
  const [skin] = useState(() => sample(AGENT_SKINS)!);
  const [spawnDelay] = useState(() => randomDelay(SPAWN_DELAY_MIN, SPAWN_DELAY_RANGE));

  const phaseRef = useRef<Phase>("idle");
  const spriteRef = useRef<AtlasSpriteHandle>(null);
  const workingTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const config = (atlasConfig as AtlasConfig).actors[skin];

  const play = useCallback((animation: string, phase: Phase) => {
    spriteRef.current?.play(`${skin}/${animation}`);
    phaseRef.current = phase;
  }, [skin]);

  const playWorking = useCallback(() => {
    play("working", "working");

    workingTimerRef.current = setTimeout(() => {
      play(sample(AGENT_RANDOM_ANIMATIONS), "random");
    }, randomDelay(WORKING_DURATION_MIN, WORKING_DURATION_RANGE));
  }, [play]);

  const onComplete = useCallback(() => {
    if (phaseRef.current === "spawn" || phaseRef.current === "random") {
      playWorking();
    }
  }, [playWorking]);

  useTimeout(() => play("spawn", "spawn"), spawnDelay);

  return (
    <div style={{ width: config.width, height: config.height }}>
      <AtlasSprite ref={spriteRef} atlasConfig={atlasConfig as AtlasConfig} animationConfig={config} defaultAnimation={`${skin}/idle`} onComplete={onComplete} />
    </div>
  );
};

export { ActorAgent };
