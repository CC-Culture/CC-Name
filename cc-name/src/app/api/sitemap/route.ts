import { locales } from "@/i18n/config";
import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://name.cc-tech.fun";
  const currentDate = new Date().toISOString();

  // 基础路由
  const routes = ["", "/about", "/surname-culture"];

  // 生成XML头部，确保XML声明在文档的最开始，没有前置空白
  let xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // 添加默认路由（无语言前缀）
  routes.forEach((route) => {
    const priority = route === "" ? "1.0" : "0.8";
    const changefreq = route === "" ? "weekly" : "monthly";

    xmlContent += `
  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  });

  // 为每个支持的语言添加路由
  locales.forEach((locale) => {
    routes.forEach((route) => {
      const localePath = route === "" ? `/${locale}` : `/${locale}${route}`;
      const priority = route === "" ? "0.9" : "0.7";
      const changefreq = route === "" ? "weekly" : "monthly";

      xmlContent += `
  <url>
    <loc>${baseUrl}${localePath}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    });
  });

  // 关闭XML
  xmlContent += `
</urlset>`;

  // 返回XML响应，设置正确的Content-Type
  return new NextResponse(xmlContent, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
