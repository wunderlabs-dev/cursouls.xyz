import "./globals.css";

import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

import { twMerge } from "tailwind-merge";

import copy from "@/data/copy.json";

import { BASE_URL, OG_IMAGE_WIDTH, OG_IMAGE_HEIGHT } from "@/helpers/constants";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: copy.title,
  description: copy.description,
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    url: BASE_URL,
    title: copy.title,
    description: copy.description,
    images: [
      { url: "/images/og.png", width: OG_IMAGE_WIDTH, height: OG_IMAGE_HEIGHT },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: copy.title,
    description: copy.description,
    images: [
      { url: "/images/og.png", width: OG_IMAGE_WIDTH, height: OG_IMAGE_HEIGHT },
    ],
  },
};

const RootLayout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={twMerge(
          "font-sans",
          "bg-cream text-dark",
          "selection:bg-dark selection:text-cream",
        )}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
      <GoogleAnalytics gaId="G-HRF5PP3522" />
    </html>
  );
};

export default RootLayout;
