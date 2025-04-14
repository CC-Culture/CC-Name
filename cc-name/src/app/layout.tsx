import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./backgrounds.css";

export const metadata = {
  title: "CC Name - Chinese Name Generator | Ancient Wisdom Meets Modern Life",
  description:
    "Discover your perfect Chinese name based on ancient Chinese culture, poetry, and the Five Elements theory. Our AI-powered name generator combines traditional wisdom with modern aesthetics to create meaningful names that resonate with your destiny.",
  keywords:
    "Chinese name generator, Chinese culture, Five Elements, Chinese poetry, name meaning, Chinese characters, traditional Chinese names, Chinese naming system, Chinese philosophy",
  openGraph: {
    title:
      "CC Name - Chinese Name Generator | Ancient Wisdom Meets Modern Life",
    description:
      "Discover your perfect Chinese name based on ancient Chinese culture, poetry, and the Five Elements theory.",
    type: "website",
    locale: "en_US",
    siteName: "CC Name",
  },
  twitter: {
    card: "summary_large_image",
    title: "CC Name - Chinese Name Generator",
    description:
      "Discover your perfect Chinese name based on ancient Chinese culture and wisdom.",
  },
  alternates: {
    canonical: "https://ccname.com",
  },
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
