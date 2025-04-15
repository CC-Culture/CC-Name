import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/*"],
    },
    sitemap: "https://name.cc-tech.cloud/sitemap.xml",
    host: "https://name.cc-tech.cloud",
  };
}
