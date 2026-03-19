"use client";

import { twMerge } from "tailwind-merge";

import type { AtlasConfig } from "@/types";

import atlasConfig from "@/data/atlas.json";

import { ActorAgent } from "@/components/actor-agent";
import { ActorOctocat } from "@/components/actor-octocat";
import { AtlasStatic } from "@/components/atlas-static";

type SceneCell =
  | { type: "empty" }
  | { type: "agent" }
  | { type: "static"; actor: string }
  | { type: "link"; actor: string; href: string };

const SCENE_GRID: SceneCell[] = [
  { type: "empty" },
  { type: "static", actor: "vertical-table-01" },
  { type: "agent" },
  { type: "static", actor: "plant" },
  {
    type: "link",
    actor: "octocat",
    href: "https://github.com/wunderlabs-dev/cursouls",
  },
  { type: "agent" },
  { type: "static", actor: "plant" },
  { type: "agent" },
  { type: "empty" },
  { type: "static", actor: "round-table-02" },
  { type: "agent" },
  { type: "empty" },
];

export const Scene = () => {
  return (
    <div
      className={twMerge(
        "grid grid-cols-3 items-end justify-items-center",
        "sm:grid-cols-4",
      )}
    >
      {SCENE_GRID.map((cell, index) => {
        if (cell.type === "empty") {
          return <div key={index} className="col-span-1" />;
        }
        if (cell.type === "agent") {
          return <ActorAgent key={index} />;
        }
        if (cell.type === "static") {
          return (
            <AtlasStatic
              key={index}
              atlasConfig={atlasConfig as AtlasConfig}
              actor={cell.actor}
            />
          );
        }
        if (cell.type === "link") {
          return (
            <ActorOctocat
              key={index}
              atlasConfig={atlasConfig as AtlasConfig}
              href={cell.href}
            />
          );
        }
      })}
    </div>
  );
};
