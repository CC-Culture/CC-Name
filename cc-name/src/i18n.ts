import { getRequestConfig } from "next-intl/server";
import { locales, defaultLocale } from "./i18n/config";

// 这个配置用于从消息文件中获取翻译
export default getRequestConfig(async ({ locale }) => {
  // 确保始终有有效的locale
  const activeLocale = locale || defaultLocale;

  // 尝试从消息文件中加载当前语言的翻译
  let messages;
  try {
    messages = (await import(`./messages/${activeLocale}.json`)).default;
  } catch (error) {
    console.error(
      `Could not load messages for locale "${activeLocale}"`,
      error
    );
    return {
      locale: activeLocale,
      messages: {},
    };
  }

  return {
    locale: activeLocale,
    messages,
  };
});
