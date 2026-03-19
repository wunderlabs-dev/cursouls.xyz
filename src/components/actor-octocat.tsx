"use client";

import { useState } from "react";

import type { AtlasConfig } from "@/types";

import { Animation } from "@/components/animation";

interface ActorOctocatProps {
  atlasConfig: AtlasConfig;
  href: string;
}

export const ActorOctocat = ({ atlasConfig, href }: ActorOctocatProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Animation
        atlasConfig={atlasConfig}
        animationConfig={atlasConfig.actors["octocat"]}
        animationName={hovered ? "octocat/idle" : "octocat"}
      />
    </a>
  );
};
