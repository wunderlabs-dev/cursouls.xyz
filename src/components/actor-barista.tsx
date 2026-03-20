"use client";

import { useRef } from "react";
import { twMerge } from "tailwind-merge";
import { useMediaQuery } from "usehooks-ts";

import type { AtlasConfig, AtlasSpriteHandle } from "@/types";

import atlasConfig from "@/data/atlas.json";

import { AtlasSprite } from "@/components/atlas-sprite";

export const ActorBarista = () => {
  const sm = useMediaQuery("(max-width: 639px)");
  const spriteRef = useRef<AtlasSpriteHandle>(null);

  const config = (atlasConfig as AtlasConfig).actors["long-counter"];

  if (sm) {
    return (
      <div
        className={twMerge(
          "shrink-0",
          "w-full mx-auto",
          "bg-atlas-barista bg-top bg-repeat-x",
        )}
        style={{
          height: config.height,
        }}
      />
    );
  }

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
        animationConfig={config}
      />
    </div>
  );
};
