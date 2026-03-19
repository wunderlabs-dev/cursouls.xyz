"use client";

import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import { first, isNil, some } from "lodash";

import type { ActorConfig, AtlasConfig, AtlasSpriteHandle } from "@/types";

import { useCounter } from "@/hooks/use-counter";

import { Animation } from "@/components/animation";

interface AtlasSpriteProps {
  atlasConfig: AtlasConfig;
  animationConfig: ActorConfig;
  defaultAnimation?: string;
  onComplete?: () => void;
}

export const AtlasSprite = forwardRef<AtlasSpriteHandle, AtlasSpriteProps>(
  ({ atlasConfig, animationConfig, defaultAnimation, onComplete }, ref) => {
    const idleKey = first(animationConfig.anims)?.key;

    const { count, increment } = useCounter();
    const [animationName, setAnimationName] = useState(
      defaultAnimation ?? idleKey,
    );

    const play = useCallback(
      (name: string) => {
        if (some(animationConfig.anims, { key: name })) {
          setAnimationName(name);
          increment();
        }
      },
      [animationConfig.anims, increment],
    );

    useImperativeHandle(
      ref,
      () => ({
        play,
        get current() {
          return animationName ?? "";
        },
      }),
      [play, animationName],
    );

    if (isNil(animationName)) {
      return null;
    }

    return (
      <Animation
        key={count}
        atlasConfig={atlasConfig}
        animationConfig={animationConfig}
        animationName={animationName}
        onComplete={onComplete}
      />
    );
  },
);

AtlasSprite.displayName = "AtlasSprite";
