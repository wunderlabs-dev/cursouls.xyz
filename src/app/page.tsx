"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

import type { AtlasConfig } from "@/types";

import atlasConfig from "@/data/atlas.json";

import { ActorAgent } from "@/components/actor-agent";
import { ActorBarista } from "@/components/actor-barista";
import { AtlasStatic } from "@/components/atlas-static";
import { SvgIconCursor } from "@/components/svg-icon-cursor";

type SceneCell = { type: "empty" } | { type: "agent" } | { type: "static"; actor: string };

const SCENE_GRID: SceneCell[][] = [
  [{ type: "empty" }, { type: "static", actor: "vertical-table-01" }, { type: "agent" }, { type: "static", actor: "plant" }],
  [{ type: "static", actor: "round-table-01" }, { type: "agent" }, { type: "static", actor: "plant" }, { type: "agent" }],
  [{ type: "empty" }, { type: "static", actor: "round-table-02" }, { type: "agent" }, { type: "empty" }],
];

const renderers = {
  marius: (chunks: ReactNode) => (
    <a href="https://x.com/balajmarius" target="_blank" rel="noopener noreferrer" className="pb-1 border-b border-dark/40 hover:border-dark hover:text-dark">
      {chunks}
    </a>
  ),
  vlad: (chunks: ReactNode) => (
    <a href="https://x.com/vtemian" target="_blank" rel="noopener noreferrer" className="pb-1 border-b border-dark/40 hover:border-dark hover:text-dark">
      {chunks}
    </a>
  ),
};

const Home = () => {
  const t = useTranslations();

  return (
    <div className="flex flex-col items-center justify-start mx-auto max-w-2xl gap-8">
      <ActorBarista />

      <div className="flex flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center justify-center max-w-xl gap-4">
          <h1 className="text-4xl">{t("title")}</h1>
          <p className="max-w-sm text-base text-center leading-relaxed text-dark/60">{t("description")}</p>
        </div>

        <Link href="/" className="flex items-center gap-4 px-4 py-2 text-sm bg-dark text-cream">
          <SvgIconCursor className="h-4 w-4" />
          {t("buttonText")}
        </Link>

        <div className="grid grid-cols-4 items-end justify-items-center w-full">
          {SCENE_GRID.flat().map((cell, index) =>
            cell.type === "static" ? (
              <AtlasStatic key={index} atlasConfig={atlasConfig as AtlasConfig} actor={cell.actor} />
            ) : cell.type === "agent" ? (
              <ActorAgent key={index} />
            ) : (
              <div key={index} className="col-span-1" />
            ),
          )}
        </div>
      </div>

      <footer className="pt-6 text-xs text-dark/60">{t.rich("footer", renderers)}</footer>
    </div>
  );
};

export default Home;
