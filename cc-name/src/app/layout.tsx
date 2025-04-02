import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import InkTrail from "@/components/InkTrail";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CC Name - 基于中国古代文化的姓名推荐系统",
  description: "基于中国古代诗歌、四书五经以及五行八卦、梅花易数的姓名推荐系统",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col relative`}
      >
        <InkTrail />
        <Header />
        <main className="flex-grow pt-20">{children}</main>
        <Footer />
        <div id="date-picker-portal" className="relative z-50" />
      </body>
    </html>
  );
}
