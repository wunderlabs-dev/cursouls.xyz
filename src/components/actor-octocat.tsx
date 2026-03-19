"use client";

import { useBoolean } from "usehooks-ts";

import type { AtlasConfig } from "@/types";

import { Animation } from "@/components/animation";

interface ActorOctocatProps {
  atlasConfig: AtlasConfig;
  href: string;
}

export const ActorOctocat = ({ atlasConfig, href }: ActorOctocatProps) => {
  const { value, setTrue, setFalse } = useBoolean();

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="cursor-pointer"
      onMouseEnter={setTrue}
      onMouseLeave={setFalse}
    >
      <Animation
        atlasConfig={atlasConfig}
        animationConfig={atlasConfig.actors["octocat"]}
        animationName={value ? "octocat/idle" : "octocat"}
      />
    </a>
  );
};
