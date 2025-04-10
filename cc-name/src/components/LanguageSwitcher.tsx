"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

// Simple inline ChevronDown component
const ChevronDown = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

export const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const t = useTranslations("common");
  const pathname = usePathname();
  const router = useRouter();

  // Check if we're on the result page
  const isResultPage = pathname.includes("/result");

  const languages = [
    { code: "zh", name: "中文", flag: "🇨🇳" },
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "ja", name: "日本語", flag: "🇯🇵" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
    { code: "ru", name: "Русский", flag: "🇷🇺" },
    { code: "pt", name: "Português", flag: "🇵🇹" },
    { code: "bn", name: "বাংলা", flag: "🇧🇩" },
    { code: "ur", name: "اردو", flag: "🇵🇰" },
  ];

  const currentLanguage =
    languages.find((lang) => lang.code === locale) || languages[0];

  const handleLanguageChange = (newLocale: string) => {
    if (isResultPage) return; // Prevent language change on result page

    // Remove the locale part from the pathname if it exists
    let pathWithoutLocale = pathname;

    // Create a pattern to match any of our supported locales
    const localePattern = new RegExp(
      `^\\/(${languages.map((l) => l.code).join("|")})(?:\\/|$)`
    );

    if (localePattern.test(pathname)) {
      // Get everything after the locale part
      pathWithoutLocale = pathname.replace(localePattern, "/");
      if (pathWithoutLocale === "") pathWithoutLocale = "/";
    }

    // Construct the new path with the new locale
    const newPath = `/${newLocale}${
      pathWithoutLocale === "/" ? "" : pathWithoutLocale
    }`;

    // Navigate to the new path
    router.push(newPath);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
          isResultPage
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gray-100 dark:hover:bg-gray-700"
        }`}
        onClick={() => !isResultPage && setIsOpen(!isOpen)}
        disabled={isResultPage}
      >
        <span className="text-lg mr-1">{currentLanguage.flag}</span>
        <span>{currentLanguage.name}</span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
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
      </button>

      {isOpen && !isResultPage && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg overflow-hidden z-50 max-h-[80vh] overflow-y-auto">
          <div className="py-1">
            {languages.map((language) => (
              <button
                key={language.code}
                className={`w-full text-left px-4 py-2 flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  locale === language.code ? "bg-gray-50 dark:bg-gray-700" : ""
                }`}
                onClick={() => handleLanguageChange(language.code)}
              >
                <span className="text-lg">{language.flag}</span>
                <span>{language.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
