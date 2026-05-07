import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { hasLocale, type Locale } from "@/lib/i18n-config";
import { getDictionary } from "@/lib/dictionaries";
import { getNewsPosts } from "@/sanity/lib/fetchers";
import { ParagraphPortableText } from "@/sanity/lib/portable-text";
import type { LocalizedPartial, LocalizedBlocks } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: "News · so.c_architects",
};

export const revalidate = 60;

function formatDate(iso: string, lang: Locale) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  if (lang === "ko") {
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
  }
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function pickLocaleText(
  obj: LocalizedPartial | null | undefined,
  lang: Locale,
): string | undefined {
  if (!obj) return undefined;
  return obj[lang] || obj.ko || obj.en;
}

function pickLocaleBlocks(
  obj: LocalizedBlocks | null | undefined,
  lang: Locale,
) {
  if (!obj) return undefined;
  return obj[lang] || obj.ko || obj.en;
}

export default async function NewsPage({
  params,
}: PageProps<"/[lang]/news">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const posts = await getNewsPosts();

  return (
    <section className="px-6 pt-2 pb-20 md:pb-28">
      <header className="mb-12 md:mb-16 max-w-[680px]">
        <h1 className="text-[12px] tracking-[0.25em] uppercase text-zinc-400 mb-4">
          {dict.page.news}
        </h1>
      </header>

      {posts.length === 0 ? (
        <div className="max-w-[680px] py-20 text-zinc-400 text-[14px]">
          {lang === "ko" ? "아직 등록된 소식이 없습니다." : "No news yet."}
        </div>
      ) : (
        <ul className="flex flex-col gap-y-20 md:gap-y-28 max-w-[1100px]">
          {posts.map((post) => {
            const title = post.title?.[lang] ?? post.title?.ko ?? "";
            const excerpt = pickLocaleText(post.excerpt, lang);
            const bodyBlocks = pickLocaleBlocks(post.body, lang);
            const coverDims = post.cover?.asset.metadata?.dimensions;
            const coverUrl = post.cover?.asset.url;
            return (
              <li key={post._id} className="flex flex-col gap-5 md:gap-6">
                <div className="text-[12px] tracking-[0.2em] uppercase text-zinc-400">
                  {formatDate(post.date, lang)}
                </div>
                <h2 className="text-[20px] md:text-[24px] leading-snug tracking-[0.02em] text-zinc-900">
                  {title}
                </h2>

                {coverUrl && (
                  <div className="relative bg-zinc-100 overflow-hidden aspect-[3/2] w-full">
                    <Image
                      src={coverUrl}
                      alt={post.cover?.alt ?? title}
                      fill
                      sizes="(max-width: 768px) 100vw, 1100px"
                      quality={95}
                      className="object-cover"
                    />
                  </div>
                )}

                {excerpt && (
                  <div className="text-[15px] md:text-[16px] leading-[1.85] text-zinc-700 whitespace-pre-line max-w-[760px]">
                    {excerpt}
                  </div>
                )}

                {bodyBlocks && bodyBlocks.length > 0 && (
                  <div className="text-[15px] md:text-[16px] leading-[1.85] text-zinc-700 max-w-[760px] space-y-3">
                    <ParagraphPortableText value={bodyBlocks} />
                  </div>
                )}

                {post.images && post.images.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    {post.images.map((img, i) =>
                      img?.asset?.url ? (
                        <div
                          key={i}
                          className="relative bg-zinc-100 overflow-hidden aspect-[3/2]"
                        >
                          <Image
                            src={img.asset.url}
                            alt={img.alt ?? ""}
                            fill
                            sizes="(max-width: 768px) 100vw, 540px"
                            quality={95}
                            className="object-cover"
                          />
                        </div>
                      ) : null,
                    )}
                  </div>
                )}

                {post.externalLink && (
                  <a
                    href={post.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="self-start text-[13px] tracking-[0.15em] lowercase text-zinc-900 hover:text-zinc-500 transition-colors border-b border-zinc-300 pb-0.5"
                  >
                    {lang === "ko" ? "자세히 보기" : "Read more"} →
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
