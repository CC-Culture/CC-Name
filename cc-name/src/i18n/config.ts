export const locales = [
  "zh",
  "en",
  "fr",
  "es",
  "ja",
  "ar",
  "ru",
  "pt",
  "bn",
  "ur",
] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "zh";

// Define Pathnames type locally instead of importing it
export type Pathnames = {
  [K in string]: {
    [L in Locale]: string;
  };
};

export const pathnames = {
  "/": "/",
  "/about": "/about",
  "/surname-culture": "/surname-culture",
  "/login": "/login",
  "/result": "/result",
} as const;

export type PathnameLocale = keyof typeof pathnames;

export const localePrefix = "always"; // "as-needed" | "always"

export function getLocalePartsFrom(pathname: string): {
  locale: Locale;
  pathname: string;
} {
  const [, locale, ...parts] = pathname.split("/");
  const path = "/" + parts.join("/");

  if (!locales.includes(locale as Locale)) {
    return {
      locale: defaultLocale,
      pathname,
    };
  }

  return {
    locale: locale as Locale,
    pathname: path || "/",
  };
}
