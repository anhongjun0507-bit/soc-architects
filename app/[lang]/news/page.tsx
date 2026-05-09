import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NewsGrid } from "@/components/NewsGrid";
import { hasLocale } from "@/lib/i18n-config";
import { getNews } from "@/sanity/lib/fetchers";

export const metadata: Metadata = {
  title: "News · so.c_architects",
};

export const revalidate = 60;

export default async function NewsPage({
  params,
}: PageProps<"/[lang]/news">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const posts = await getNews();
  return <NewsGrid posts={posts} lang={lang} />;
}
