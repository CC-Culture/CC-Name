import { locales } from "@/i18n/config";

type SitemapEntry = {
  url: string;
  lastModified: Date;
  changeFrequency?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
};

export default async function sitemap() {
  const baseUrl = "https://name.cc-tech.cloud";

  // 基础路由
  const routes = ["", "/about", "/surname-culture"];

  // 为每个语言生成URL
  const sitemapEntries: SitemapEntry[] = [];

  // 添加默认路由（无语言前缀）
  routes.forEach((route) => {
    sitemapEntries.push({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? "weekly" : "monthly",
      priority: route === "" ? 1.0 : 0.8,
    });
  });

  // 为每个支持的语言添加路由
  locales.forEach((locale) => {
    routes.forEach((route) => {
      const localePath = route === "" ? `/${locale}` : `/${locale}${route}`;
      sitemapEntries.push({
        url: `${baseUrl}${localePath}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 0.9 : 0.7,
      });
    });
  });

  return sitemapEntries;
}
