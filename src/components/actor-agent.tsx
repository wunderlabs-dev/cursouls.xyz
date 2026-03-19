"use client";

import { type ComponentType, type ReactNode, useCallback, useRef, useState } from "react";
import { sample } from "lodash";
import { useTimeout } from "usehooks-ts";
import ReactFastMarquee from "react-fast-marquee";

const Marquee = ((ReactFastMarquee as unknown as { default?: ComponentType<{ children?: ReactNode }> }).default ??
  ReactFastMarquee) as ComponentType<{ children?: ReactNode }>;

import type { AtlasConfig, AtlasSpriteHandle } from "@/types";
import type { Phase } from "@/helpers/types";

import {
  AGENT_SKINS,
  AGENT_RANDOM_ANIMATIONS,
  AGENT_TASKS,
  SPAWN_DELAY_MIN,
  SPAWN_DELAY_RANGE,
  WORKING_DURATION_MIN,
  WORKING_DURATION_RANGE,
} from "@/helpers/constants";

import { randomDelay } from "@/helpers/utils";

import atlasConfig from "@/data/atlas.json";

import { Animation } from "@/components/animation";
import { AtlasSprite } from "@/components/atlas-sprite";

const ActorAgent = () => {
  const [phase, setPhase] = useState<Phase>("idle");

  const [skin] = useState(() => sample(AGENT_SKINS)!);
  const [task] = useState(() => sample(AGENT_TASKS)!);
  const [spawnDelay] = useState(() => randomDelay(SPAWN_DELAY_MIN, SPAWN_DELAY_RANGE));

  const spriteRef = useRef<AtlasSpriteHandle>(null);
  const workingTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const config = (atlasConfig as AtlasConfig).actors[skin];
  const bubbleConfig = (atlasConfig as AtlasConfig).actors.bubble;

  const canSeeText = phase === "spawn" || phase === "working";

  const play = useCallback(
    (animation: string, nextPhase: Phase) => {
      spriteRef.current?.play(`${skin}/${animation}`);
      setPhase(nextPhase);
    },
    [skin],
  );

  const startWorkingCycle = useCallback(() => {
    play("working", "working");
    clearTimeout(workingTimerRef.current);

    workingTimerRef.current = setTimeout(
      () => {
        const animation = sample(AGENT_RANDOM_ANIMATIONS)!;
        play(animation, animation as Phase);
      },
      randomDelay(WORKING_DURATION_MIN, WORKING_DURATION_RANGE),
    );
  }, [play]);

  const onComplete = useCallback(() => {
    setPhase((current) => {
      if (current !== "idle" && current !== "working") {
        queueMicrotask(startWorkingCycle);
      }
      return current;
    });
  }, [startWorkingCycle]);

  useTimeout(() => play("spawn", "spawn"), spawnDelay);

  return (
    <div className="group relative cursor-help" style={{ width: config.width, height: config.height }}>
      {canSeeText ? (
        <div className="absolute bottom-14 right-1 hidden group-hover:block">
          <div className="absolute left-0 right-0 top-0 bottom-1 px-1">
            <Marquee>
              <span className="block px-1 text-xs leading-3 uppercase whitespace-nowrap">{task}</span>
            </Marquee>
          </div>
          <Animation animationName="bubble" atlasConfig={atlasConfig as AtlasConfig} animationConfig={bubbleConfig} />
        </div>
      ) : null}

      <AtlasSprite
        ref={spriteRef}
        atlasConfig={atlasConfig as AtlasConfig}
        animationConfig={config}
        defaultAnimation={`${skin}/idle`}
        onComplete={onComplete}
      />
    </div>
  );
};

export { ActorAgent };
