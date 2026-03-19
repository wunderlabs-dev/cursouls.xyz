"use client";

import { first } from "lodash";

import type { AtlasConfig } from "@/types";

import { Animation } from "@/components/animation";

interface AtlasStaticProps {
  atlasConfig: AtlasConfig;
  actor: string;
}

export const AtlasStatic = ({ atlasConfig, actor }: AtlasStaticProps) => {
  return (
    <Animation
      atlasConfig={atlasConfig}
      animationConfig={atlasConfig.actors[actor]}
      animationName={first(atlasConfig.actors[actor].anims)!.key}
    />
  );
};
