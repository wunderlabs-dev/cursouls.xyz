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

const renderers = {
  marius: (chunks: ReactNode) => (
    <a
      href="https://x.com/balajmarius"
      target="_blank"
      rel="noopener noreferrer"
      className="pb-1 border-b border-dark/40 transition-colors duration-200 hover:border-dark hover:text-dark"
    >
      {chunks}
    </a>
  ),
  vlad: (chunks: ReactNode) => (
    <a
      href="https://x.com/vtemian"
      target="_blank"
      rel="noopener noreferrer"
      className="pb-1 border-b border-dark/40 transition-colors duration-200 hover:border-dark hover:text-dark"
    >
      {chunks}
    </a>
  ),
};

const Home = () => {
  const t = useTranslations();

  return (
    <div className="flex flex-col items-center justify-start mx-auto max-w-2xl gap-8 px-8 pb-8">
      <ActorBarista />

      <div className="flex flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center justify-center max-w-xl gap-4">
          <h1 className="text-4xl text-balance">{t("title")}</h1>
          <p className="max-w-sm text-base text-center text-pretty leading-relaxed text-dark/60">
            {t("description")}
          </p>
        </div>

        <Link
          href="/"
          className="flex items-center gap-4 px-5 py-3 text-sm bg-dark text-cream transition-transform duration-100 ease-out hover:-translate-y-0.5 active:scale-95"
        >
          <SvgIconCursor className="h-4 w-4" />
          {t("buttonText")}
        </Link>

        <div className="grid grid-cols-4 items-end justify-items-center w-full">
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
                <a
                  key={index}
                  href={cell.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
                  <AtlasStatic
                    atlasConfig={atlasConfig as AtlasConfig}
                    actor={cell.actor}
                  />
                </a>
              );
            }
          })}
        </div>
      </div>

      <footer className="pt-6 text-xs text-dark/60">
        {t.rich("footer", renderers)}
      </footer>
    </div>
  );
};

export default Home;
