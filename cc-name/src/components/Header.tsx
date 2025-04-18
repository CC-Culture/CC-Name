"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { usePathname } from "next/navigation";

const Header = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  // 点击菜单项时关闭菜单
  const handleMenuClick = () => {
    setIsMenuOpen(false);
  };

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
        <div
          className={`flex items-center ${
            isRtl ? "space-x-reverse" : "space-x-4"
          }`}
        >
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

          <nav
            className={`hidden md:flex ${
              isRtl ? "space-x-reverse space-x-12" : "space-x-12"
            } ml-6`}
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
          </nav>

          {isResultPage ? (
            <div className="text-gray-400 cursor-not-allowed px-3 py-2 flex items-center ml-4">
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
            <div className="ml-4">
              <LanguageSwitcher />
            </div>
          )}
        </div>

        <div className="md:hidden">
          <button className="p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
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

      {/* 移动端下拉菜单 */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg"
          >
            <div className="container mx-auto py-4">
              <nav className="flex flex-col space-y-4">
                <Link
                  href={`/${locale}`}
                  className="text-gray-800 hover:text-gray-600 transition-colors duration-300 px-6 py-2"
                  onClick={handleMenuClick}
                >
                  {t("home")}
                </Link>
                <Link
                  href={`/${locale}/surname-culture`}
                  className="text-gray-800 hover:text-gray-600 transition-colors duration-300 px-6 py-2"
                  onClick={handleMenuClick}
                >
                  {t("surnameculture")}
                </Link>
                <Link
                  href={`/${locale}/about`}
                  className="text-gray-800 hover:text-gray-600 transition-colors duration-300 px-6 py-2"
                  onClick={handleMenuClick}
                >
                  {t("about")}
                </Link>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
