"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { twMerge } from "tailwind-merge";

import { Scene } from "@/components/scene";
import { ActorBarista } from "@/components/actor-barista";
import { SvgIconCursor } from "@/components/svg-icon-cursor";

const renderers = {
  marius: (chunks: ReactNode) => (
    <a
      href="https://x.com/balajmarius"
      target="_blank"
      rel="noopener noreferrer"
      className={twMerge(
        "pb-1",
        "border-b border-dark/40",
        "transition-colors duration-200",
        "hover:border-dark hover:text-dark",
      )}
    >
      {chunks}
    </a>
  ),
  vlad: (chunks: ReactNode) => (
    <a
      href="https://x.com/vtemian"
      target="_blank"
      rel="noopener noreferrer"
      className={twMerge(
        "pb-1",
        "border-b border-dark/40",
        "transition-colors duration-200",
        "hover:border-dark hover:text-dark",
      )}
    >
      {chunks}
    </a>
  ),
};

const Home = () => {
  const t = useTranslations();

  return (
    <div
      className={twMerge(
        "flex flex-col items-center justify-start",
        "mx-auto max-w-2xl",
        "gap-8 pb-8",
        "overflow-hidden",
      )}
    >
      <ActorBarista />

      <div
        className={twMerge(
          "flex flex-col items-center justify-center",
          "gap-8 px-8",
        )}
      >
        <div
          className={twMerge(
            "flex flex-col items-center justify-center",
            "max-w-xl",
            "gap-4",
          )}
        >
          <h1 className="text-4xl text-balance">{t("title")}</h1>
          <p
            className={twMerge(
              "max-w-sm",
              "text-base text-center text-pretty leading-relaxed",
              "text-dark/60",
            )}
          >
            {t("description")}
          </p>
        </div>

        <Link
          target="_self"
          href="cursor:extension/wunderlabs.cursouls"
          className={twMerge(
            "flex items-center",
            "gap-4 px-5 py-3",
            "text-sm",
            "bg-dark text-cream",
            "transition-transform duration-100 ease-out",
            "hover:-translate-y-0.5 active:scale-95",
          )}
        >
          <SvgIconCursor className="h-4 w-4" />
          {t("buttonText")}
        </Link>

        <Scene />
      </div>

      <footer className="pt-6 text-xs text-dark/60">
        {t.rich("footer", renderers)}
      </footer>
    </div>
  );
};

export default Home;
