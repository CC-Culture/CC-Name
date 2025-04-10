import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./backgrounds.css";

export const metadata = {
  title: "CC Name - 基于中国古代文化的姓名推荐系统",
  description: "基于中国古代诗歌、四书五经以及五行八卦、梅花易数的姓名推荐系统",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 根布局函数 - 直接返回子组件，让locale布局处理HTML标签
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 直接返回子组件，避免HTML标签嵌套
  return children;
}
