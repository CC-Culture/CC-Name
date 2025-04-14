import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SessionProvider from "@/components/providers/SessionProvider";
import { getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { locales, type Locale } from "@/i18n/config";
import { notFound } from "next/navigation";
import { SpeedInsights } from "@vercel/speed-insights/next";

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

  // 设置文档方向：阿拉伯语和乌尔都语从右到左
  const isRtl = locale === "ar" || locale === "ur";
  // Bengali requires special font handling
  const isBengali = locale === "bn";
  // Extra font options for Russian
  const isRussian = locale === "ru";
  // Extra font options for Urdu
  const isUrdu = locale === "ur";

  return (
    <html
      lang={locale}
      dir={isRtl ? "rtl" : "ltr"}
      className={`${isRtl ? "rtl" : "ltr"} ${isBengali ? "bengali" : ""} ${
        isRussian ? "russian" : ""
      } ${isUrdu ? "urdu" : ""}`}
    >
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5349784820675227"
          crossOrigin="anonymous"
        ></script>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* 额外字体加载 */}
        {isBengali && (
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
        )}
        {isRussian && (
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
        )}
        {isUrdu && (
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
        )}
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
              /* 日期选择器关闭图标位置 */
              .rtl .react-datepicker__close-icon {
                right: auto !important;
                left: 10px !important;
                width: 24px !important;
                height: 24px !important;
                top: calc(50% - 12px) !important;
                z-index: 10 !important;
              }
              /* 时辰选择器下拉图标位置 */
              .rtl .rtl-select-wrapper .select-icon {
                right: 10px !important;
                left: auto !important;
              }
              /* 保持SVG图标方向 */
              .rtl svg.no-flip {
                transform: scaleX(1) !important;
              }
            `,
            }}
          />
        )}
        {/* Bengali特定样式 */}
        {isBengali && (
          <style
            dangerouslySetInnerHTML={{
              __html: `
              .bengali {
                font-family: 'Noto Sans Bengali', sans-serif;
              }
              .bengali h1, .bengali h2, .bengali h3 {
                font-family: 'Noto Sans Bengali', sans-serif;
                font-weight: 700;
              }
              .bengali p, .bengali span, .bengali div {
                font-family: 'Noto Sans Bengali', sans-serif;
                font-weight: 400;
              }
              .bengali button {
                font-family: 'Noto Sans Bengali', sans-serif;
                font-weight: 500;
              }
            `,
            }}
          />
        )}
        {/* Russian特定样式 */}
        {isRussian && (
          <style
            dangerouslySetInnerHTML={{
              __html: `
              .russian {
                font-family: 'Roboto', sans-serif;
              }
            `,
            }}
          />
        )}
        {/* Urdu特定样式 */}
        {isUrdu && (
          <style
            dangerouslySetInnerHTML={{
              __html: `
              .urdu {
                font-family: 'Noto Nastaliq Urdu', serif;
              }
              .urdu h1, .urdu h2, .urdu h3 {
                font-family: 'Noto Nastaliq Urdu', serif;
                font-weight: 700;
              }
              .urdu p, .urdu span, .urdu div {
                font-family: 'Noto Nastaliq Urdu', serif;
                font-weight: 400;
              }
              .urdu button {
                font-family: 'Noto Nastaliq Urdu', serif;
                font-weight: 500;
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
        <SpeedInsights />
      </body>
    </html>
  );
}
