"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { usePathname } from "next/navigation";

const Header = () => {
  const [scrollY, setScrollY] = useState(0);
  const t = useTranslations("header");
  const locale = useLocale();
  const isRtl = locale === "ar" || locale === "ur";
  const pathname = usePathname();

  // 检测是否在结果页面
  const isResultPage = pathname.includes("/result");

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 w-full z-50 py-4 px-6 md:px-12"
      style={{
        background: `rgba(255, 255, 255, ${Math.min(0.85, scrollY / 300)})`,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href={`/${locale}`}
          className={`flex items-center ${
            isRtl ? "space-x-reverse" : "space-x-2"
          }`}
        >
          <div className="relative w-10 h-10 overflow-hidden">
            <Image
              src="/yi-seal.svg"
              alt="易字印章"
              width={60}
              height={60}
              className={isRtl ? "ml-4" : "mr-4"}
            />
          </div>
          <span className="text-xl font-bold tracking-wider">CC Name</span>
        </Link>

        <div
          className={`flex items-center ${
            isRtl ? "space-x-reverse" : "space-x-4"
          }`}
        >
          <nav
            className={`hidden md:flex ${
              isRtl ? "space-x-reverse" : "space-x-8"
            }`}
          >
            <Link
              href={`/${locale}`}
              className="text-gray-800 hover:text-gray-600 transition-colors duration-300"
            >
              {t("home")}
            </Link>
            <Link
              href={`/${locale}/surname-culture`}
              className="text-gray-800 hover:text-gray-600 transition-colors duration-300"
            >
              {t("surnameculture")}
            </Link>
            <Link
              href={`/${locale}/about`}
              className="text-gray-800 hover:text-gray-600 transition-colors duration-300"
            >
              {t("about")}
            </Link>
            {/* <Link
              href={`/${locale}/login`}
              className="text-gray-800 hover:text-gray-600 transition-colors duration-300"
            >
              {t('login')}
            </Link> */}
          </nav>

          {isResultPage ? (
            <div className="text-gray-400 cursor-not-allowed px-3 py-2 flex items-center">
              <span className="text-lg mr-1">
                {locale === "zh"
                  ? "🇨🇳"
                  : locale === "en"
                  ? "🇺🇸"
                  : locale === "fr"
                  ? "🇫🇷"
                  : locale === "es"
                  ? "🇪🇸"
                  : locale === "ja"
                  ? "🇯🇵"
                  : locale === "ar"
                  ? "🇸🇦"
                  : locale === "ru"
                  ? "🇷🇺"
                  : locale === "pt"
                  ? "🇵🇹"
                  : locale === "bn"
                  ? "🇧🇩"
                  : locale === "ur"
                  ? "🇵🇰"
                  : ""}
              </span>
              <span>
                {locale === "zh"
                  ? "中文"
                  : locale === "en"
                  ? "English"
                  : locale === "fr"
                  ? "Français"
                  : locale === "es"
                  ? "Español"
                  : locale === "ja"
                  ? "日本語"
                  : locale === "ar"
                  ? "العربية"
                  : locale === "ru"
                  ? "Русский"
                  : locale === "pt"
                  ? "Português"
                  : locale === "bn"
                  ? "বাংলা"
                  : locale === "ur"
                  ? "اردو"
                  : ""}
              </span>
              <svg
                className="w-4 h-4 ml-1 opacity-50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          ) : (
            <LanguageSwitcher />
          )}
        </div>

        <div className="md:hidden">
          <button className="p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
