"use client";

import { useRef } from "react";

import type { AtlasConfig, AtlasSpriteHandle } from "@/types";

import atlasConfig from "@/data/atlas.json";

import { AtlasSprite } from "@/components/atlas-sprite";

export const ActorBarista = () => {
  const spriteRef = useRef<AtlasSpriteHandle>(null);
  const config = (atlasConfig as AtlasConfig).actors["long-counter"];

  return (
    <div
      role="button"
      className="max-w-full mx-auto shrink-0"
      style={{
        width: config.width,
        height: config.height,
      }}
      onClick={() => spriteRef.current?.play("long-counter/counter")}
    >
      <AtlasSprite
        ref={spriteRef}
        atlasConfig={atlasConfig as AtlasConfig}
        className="relative left-1/2 -translate-x-1/2"
        animationConfig={config}
      />
    </div>
  );
};
