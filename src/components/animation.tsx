"use client";

import { isNil } from "lodash";
import { twMerge } from "tailwind-merge";

import type { ActorConfig, AtlasConfig } from "@/types";

import { useSpriteAnimation } from "@/hooks/use-sprite-animation";

interface AnimationProps {
  atlasConfig: AtlasConfig;
  animationConfig: ActorConfig;
  animationName: string;
  onComplete?: () => void;
  className?: string;
}

export const Animation = ({
  atlasConfig,
  animationConfig,
  animationName,
  className,
  onComplete,
}: AnimationProps) => {
  const position = useSpriteAnimation(
    atlasConfig,
    animationConfig,
    animationName,
    onComplete,
  );

  if (isNil(position)) {
    return null;
  }

  return (
    <div
      className={twMerge("bg-no-repeat bg-atlas-sprite", className)}
      style={{
        width: animationConfig.width,
        height: animationConfig.height,
        backgroundPositionX: -position.x,
        backgroundPositionY: -position.y,
      }}
    />
  );
};
