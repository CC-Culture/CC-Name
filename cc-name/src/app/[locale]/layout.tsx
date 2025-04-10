import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import "../globals.css";
import "../backgrounds.css";
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

// Next.js 15中动态路由参数可能是Promise
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  // 验证语言
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "common" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

// Next.js 15中动态路由参数可能是Promise
export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // 验证语言
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // 加载消息
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  // 设置文档方向：阿拉伯语从右到左
  const isRtl = locale === "ar";

  return (
    <html
      lang={locale}
      dir={isRtl ? "rtl" : "ltr"}
      className={isRtl ? "rtl" : "ltr"}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* RTL专用样式，确保布局一致性 */}
        {isRtl && (
          <style
            dangerouslySetInnerHTML={{
              __html: `
              /* RTL布局修复 */
              .rtl .space-x-2 > :not([hidden]) ~ :not([hidden]) {
                --tw-space-x-reverse: 1;
              }
              .rtl .space-x-4 > :not([hidden]) ~ :not([hidden]) {
                --tw-space-x-reverse: 1;
              }
              .rtl .space-x-8 > :not([hidden]) ~ :not([hidden]) {
                --tw-space-x-reverse: 1;
              }
              .rtl .ml-2 {
                margin-right: 0.5rem;
                margin-left: 0;
              }
              .rtl .mr-4 {
                margin-left: 1rem;
                margin-right: 0;
              }
              /* 语言选择器位置 */
              .rtl .origin-top-right {
                transform-origin: top left;
              }
              .rtl .right-0 {
                right: auto;
                left: 0;
              }
            `,
            }}
          />
        )}
      </head>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col relative kraft-background`}
      >
        <SessionProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
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
