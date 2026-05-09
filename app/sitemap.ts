import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n-config";
import { getProjectSlugs, getNewsSlugs } from "@/sanity/lib/fetchers";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://socarchitects.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = ["", "/profile", "/contact", "/news"];
  const projectSlugs = await getProjectSlugs();
  const newsSlugs = await getNewsSlugs();

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
    for (const slug of projectSlugs) {
      entries.push({
        url: `${BASE}/${lang}/projects/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
    for (const slug of newsSlugs) {
      entries.push({
        url: `${BASE}/${lang}/news/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
