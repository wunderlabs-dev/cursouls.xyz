"use client";

import { useRef } from "react";

import type { AtlasConfig, AtlasSpriteHandle } from "@/types";

import atlasConfig from "@/data/atlas.json";

import { AtlasSprite } from "@/components/atlas-sprite";

const ActorBarista = () => {
  const counter = useRef<AtlasSpriteHandle>(null);
  const config = (atlasConfig as AtlasConfig).actors["long-counter"];

  return (
    <button
      type="button"
      className="mx-auto shrink-0"
      style={{
        width: config.width,
        height: config.height,
      }}
      onClick={() => counter.current?.play("long-counter/counter")}
    >
      <AtlasSprite ref={counter} atlasConfig={atlasConfig as AtlasConfig} animationConfig={config} />
    </button>
  );
};

export { ActorBarista };
