"use client";

import {
  type ComponentType,
  type ReactNode,
  useCallback,
  useRef,
  useState,
} from "react";
import { sample } from "lodash";
import { useTimeout } from "usehooks-ts";
import ReactFastMarquee from "react-fast-marquee";

const Marquee = ((
  ReactFastMarquee as unknown as {
    default?: ComponentType<{ children?: ReactNode }>;
  }
).default ?? ReactFastMarquee) as ComponentType<{ children?: ReactNode }>;

import type { AtlasConfig, AtlasSpriteHandle } from "@/types";
import type { AnimationName } from "@/helpers/types";

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

import { twMerge } from "tailwind-merge";

import { Animation } from "@/components/animation";
import { AtlasSprite } from "@/components/atlas-sprite";

export const ActorAgent = () => {
  const [animationName, setAnimationName] = useState<AnimationName>("idle");

  const skin = useRef(sample(AGENT_SKINS)).current;
  const task = useRef(sample(AGENT_TASKS)).current;
  const delay = useRef(randomDelay(SPAWN_DELAY_MIN, SPAWN_DELAY_RANGE)).current;

  const spriteRef = useRef<AtlasSpriteHandle>(null);
  const workingTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  const config = (atlasConfig as AtlasConfig).actors[skin];
  const bubbleConfig = (atlasConfig as AtlasConfig).actors.bubble;

  const play = useCallback(
    (animation: string, nextAnimationName: AnimationName) => {
      spriteRef.current?.play(`${skin}/${animation}`);
      setAnimationName(nextAnimationName);
    },
    [skin],
  );

  const startWorkingCycle = useCallback(() => {
    play("working", "working");
    clearTimeout(workingTimerRef.current);

    workingTimerRef.current = setTimeout(
      () => {
        const animation = sample(AGENT_RANDOM_ANIMATIONS)!;
        play(animation, animation as AnimationName);
      },
      randomDelay(WORKING_DURATION_MIN, WORKING_DURATION_RANGE),
    );
  }, [play]);

  const onComplete = useCallback(() => {
    setAnimationName((current) => {
      if (current !== "idle" && current !== "working") {
        queueMicrotask(startWorkingCycle);
      }
      return current;
    });
  }, [startWorkingCycle]);

  useTimeout(() => play("spawn", "spawn"), delay);

  return (
    <div
      className="group relative cursor-help select-none"
      style={{
        width: config.width,
        height: config.height,
      }}
    >
      {animationName === "spawn" || animationName === "working" ? (
        <div
          className={twMerge(
            "absolute bottom-14 right-1",
            "hidden group-hover:block",
          )}
        >
          <div
            className={twMerge(
              "absolute left-0 right-0 top-0 bottom-1",
              "px-1",
            )}
          >
            <Marquee>
              <span
                className={twMerge(
                  "block",
                  "px-1",
                  "text-xs leading-3 uppercase whitespace-nowrap",
                )}
              >
                {task}
              </span>
            </Marquee>
          </div>
          <Animation
            animationName="bubble"
            atlasConfig={atlasConfig as AtlasConfig}
            animationConfig={bubbleConfig}
          />
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
