import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { hasLocale, locales } from "@/lib/i18n-config";
import { formatNewsDate } from "@/lib/format";
import { getDictionary } from "@/lib/dictionaries";
import { ProjectGallery } from "@/components/ProjectGallery";
import {
  getNews,
  getNewsBySlug,
  getNewsSlugs,
} from "@/sanity/lib/fetchers";
import { ParagraphPortableText } from "@/sanity/lib/portable-text";

const CATEGORY_LABEL: Record<string, { ko: string; en: string }> = {
  practice: { ko: "사무소", en: "Practice" },
  education: { ko: "교육", en: "Education" },
  project: { ko: "프로젝트", en: "Project" },
  talk: { ko: "강연", en: "Talk" },
  commission: { ko: "위촉", en: "Commission" },
};

export async function generateStaticParams() {
  const slugs = await getNewsSlugs();
  return locales.flatMap((lang) => slugs.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/news/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const post = await getNewsBySlug(slug);
  if (!post) return {};
  const title = `${post.title[lang]} · so.c_architects`;
  return {
    title,
    description: post.excerpt?.[lang] ?? undefined,
    openGraph: {
      title,
      images: post.cover ? [post.cover.src] : undefined,
    },
  };
}

export default async function NewsDetailPage({
  params,
}: PageProps<"/[lang]/news/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const posts = await getNews();
  const idx = posts.findIndex((p) => p.slug === slug);
  if (idx === -1) notFound();
  const post = posts[idx];
  const prevPost = idx > 0 ? posts[idx - 1] : null;
  const nextPost = idx < posts.length - 1 ? posts[idx + 1] : null;

  const dict = await getDictionary(lang);

  const meta: { label: string; value: string }[] = [
    { label: "date", value: formatNewsDate(post.date, lang) },
    {
      label: "category",
      value:
        CATEGORY_LABEL[post.category]?.[lang === "ko" ? "ko" : "en"] ??
        post.category,
    },
  ];

  const bodyBlocks = post.body?.[lang];
  const galleryImages = post.cover
    ? [post.cover, ...post.images]
    : post.images;

  return (
    <article className="max-w-[1040px] mx-auto px-5 md:px-8 pt-2 md:pt-3 pb-24 md:pb-32 text-zinc-800">
      {galleryImages.length > 0 ? (
        <div className="mb-14 md:mb-20">
          <ProjectGallery images={galleryImages} alt={post.title[lang]} />
        </div>
      ) : (
        <p className="mb-14 md:mb-20 text-zinc-400 text-[13px] tracking-[0.2em] uppercase">
          {dict.page.comingSoon}
        </p>
      )}

      <div className="grid md:grid-cols-[1fr_280px] gap-10 md:gap-16 max-w-[1040px]">
        <div className="max-w-[680px]">
          <h1 className="text-[21px] font-bold tracking-[0.01em] mb-6 md:mb-8">
            {post.title[lang]}
          </h1>
          {bodyBlocks && bodyBlocks.length > 0 && (
            <div className="space-y-4 text-[13px] leading-[1.85] text-zinc-700">
              <ParagraphPortableText value={bodyBlocks} />
            </div>
          )}
        </div>

        <dl className="space-y-4 text-[13px] leading-relaxed self-start">
          {meta.map((m) => (
            <div key={m.label}>
              <dt className="text-[11px] tracking-[0.25em] uppercase text-zinc-400 mb-1">
                {m.label}
              </dt>
              <dd>{m.value}</dd>
            </div>
          ))}
          {post.externalLink && (
            <div>
              <dt className="text-[11px] tracking-[0.25em] uppercase text-zinc-400 mb-1">
                link
              </dt>
              <dd>
                <a
                  href={post.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-black transition-colors"
                >
                  {lang === "ko" ? "외부 링크" : "External link"}
                </a>
              </dd>
            </div>
          )}
        </dl>
      </div>

      <nav className="mt-20 md:mt-28 grid grid-cols-3 items-center text-[12px] tracking-[0.2em] uppercase text-zinc-500">
        {prevPost ? (
          <Link
            href={`/${lang}/news/${prevPost.slug}`}
            className="hover:text-black transition-colors justify-self-start truncate"
          >
            ← {prevPost.title[lang]}
          </Link>
        ) : (
          <span />
        )}
        <Link
          href={`/${lang}/news`}
          className="hover:text-black transition-colors justify-self-center"
        >
          news
        </Link>
        {nextPost ? (
          <Link
            href={`/${lang}/news/${nextPost.slug}`}
            className="hover:text-black transition-colors justify-self-end truncate"
          >
            {nextPost.title[lang]} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
