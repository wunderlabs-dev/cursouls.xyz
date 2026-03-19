"use client";

import { useRef } from "react";

import type { AtlasConfig, AtlasSpriteHandle } from "@/types";

import atlasConfig from "@/data/atlas.json";

import { AtlasSprite } from "@/components/atlas-sprite";

export const ActorBarista = () => {
  const spriteRef = useRef<AtlasSpriteHandle>(null);
  const config = (atlasConfig as AtlasConfig).actors["long-counter"];

  return (
    <button
      type="button"
      className="shrink-0 mx-auto"
      style={{
        width: config.width,
        height: config.height,
      }}
      onClick={() => spriteRef.current?.play("long-counter/counter")}
    >
      <AtlasSprite
        ref={spriteRef}
        atlasConfig={atlasConfig as AtlasConfig}
        animationConfig={config}
      />
    </button>
  );
};
