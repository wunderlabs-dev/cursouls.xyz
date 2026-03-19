"use client";

import { useRef } from "react";
import { twMerge } from "tailwind-merge";

import type { AtlasConfig, AtlasSpriteHandle } from "@/types";

import atlasConfig from "@/data/atlas.json";

import { AtlasSprite } from "@/components/atlas-sprite";

export const ActorBarista = () => {
  const spriteRef = useRef<AtlasSpriteHandle>(null);
  const config = (atlasConfig as AtlasConfig).actors["long-counter"];

  return (
    <div
      role="button"
      className={twMerge("shrink-0", "max-w-full mx-auto")}
      style={{
        width: config.width,
        height: config.height,
      }}
      onClick={() => spriteRef.current?.play("long-counter/counter")}
    >
      <AtlasSprite
        ref={spriteRef}
        atlasConfig={atlasConfig as AtlasConfig}
        className={twMerge("relative left-1/2", "-translate-x-1/2")}
        animationConfig={config}
      />
    </div>
  );
};
