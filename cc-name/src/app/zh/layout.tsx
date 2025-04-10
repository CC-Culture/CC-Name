import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SessionProvider from "@/components/providers/SessionProvider";
import { getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { locales, type Locale } from "@/i18n/config";
import { notFound } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type Props = {
  children: React.ReactNode;
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = "zh";

  const t = await getTranslations({ locale, namespace: "common" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ZhLayout({ children }: Props) {
  const locale = "zh";

  // 加载消息
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col relative`}
      >
        <SessionProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <div className="absolute inset-0 z-0 overflow-hidden">
              <Image
                src="/scholar.png"
                alt="Ancient Chinese Scholar"
                fill
                className="object-cover opacity-10"
                priority
              />
            </div>
            <Header />
            <main className="flex-grow pt-20 z-10 relative">{children}</main>
            <Footer />
            <div id="date-picker-portal" className="relative z-50" />
          </NextIntlClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
