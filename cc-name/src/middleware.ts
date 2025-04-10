import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./i18n/config";

// 这个中间件用于处理国际化路由
export default createMiddleware({
  // 支持的语言列表
  locales,
  // 默认语言
  defaultLocale,
  // 本地化前缀策略 - 始终在URL中显示语言
  localePrefix: "always",
});

// 配置中间件应用的路径
export const config = {
  // 匹配所有路径，但排除静态文件和API路由
  matcher: [
    // 排除不需要处理的路径
    "/((?!api|_next|_vercel|.*\\..*).+)",
    // 匹配首页
    "/",
  ],
};
