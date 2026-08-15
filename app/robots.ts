import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/protocolos", "/admin", "/login", "/set-password", "/auth/"],
    },
    sitemap: "https://rx-plantao.vercel.app/sitemap.xml",
    host: "https://rx-plantao.vercel.app",
  };
}
