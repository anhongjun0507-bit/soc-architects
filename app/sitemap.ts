import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n-config";
import { projects } from "@/data/projects";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://socarchitects.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/profile", "/contact", "/news", "/publish"];

  const entries: MetadataRoute.Sitemap = [];

  for (const lang of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${BASE}/${lang}${path}`,
        lastModified: new Date(),
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.7,
      });
    }
    for (const project of projects) {
      entries.push({
        url: `${BASE}/${lang}/projects/${project.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  return entries;
}
