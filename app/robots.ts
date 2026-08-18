import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/protocolos", "/admin", "/login", "/set-password", "/auth/"],
    },
    sitemap: "https://www.rxdoplantao.com.br/sitemap.xml",
    host: "https://www.rxdoplantao.com.br",
  };
}
