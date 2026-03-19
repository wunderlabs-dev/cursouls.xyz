import "./globals.css";

import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

import copy from "@/data/copy.json";

export const metadata: Metadata = {
  title: copy.title,
  description: copy.description,
  icons: {
    icon: "/favicon.svg",
  },
};

const RootLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="font-sans bg-cream text-dark">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
