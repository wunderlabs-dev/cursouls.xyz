"use client";

import { isNil } from "lodash";

import type { ActorConfig, AtlasConfig } from "@/types";

import { useSpriteAnimation } from "@/hooks/use-sprite-animation";

interface AnimationProps {
  atlasConfig: AtlasConfig;
  animationConfig: ActorConfig;
  animationName: string;
  onComplete?: () => void;
}

const Animation = ({ atlasConfig, animationConfig, animationName, onComplete }: AnimationProps) => {
  const position = useSpriteAnimation(atlasConfig, animationConfig, animationName, onComplete);

  if (isNil(position)) {
    return null;
  }

  return (
    <div
      className="bg-no-repeat"
      style={{
        width: animationConfig.width,
        height: animationConfig.height,
        backgroundImage: "url(/images/atlas.png)",
        backgroundPositionX: -position.x,
        backgroundPositionY: -position.y,
      }}
    />
  );
};

export { Animation };
