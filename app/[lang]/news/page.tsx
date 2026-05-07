import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { hasLocale, type Locale } from "@/lib/i18n-config";
import { getDictionary } from "@/lib/dictionaries";
import { sanityClient, urlFor } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "News · so.c_architects",
};

type NewsImage = {
  asset?: { _ref: string };
  alt?: string | null;
};

type NewsPost = {
  _id: string;
  publishedAt: string;
  title: { ko?: string; en?: string };
  body?: { ko?: string; en?: string } | null;
  cover?: NewsImage | null;
  images?: NewsImage[] | null;
  externalLink?: string | null;
};

export const revalidate = 60;

async function getNews(): Promise<NewsPost[]> {
  if (!sanityClient) return [];
  return sanityClient.fetch<NewsPost[]>(
    `*[_type == "news"] | order(publishedAt desc) {
      _id,
      publishedAt,
      title,
      body,
      cover,
      images,
      externalLink
    }`,
  );
}

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

function pickLocaleText<T extends string | undefined>(
  obj: { ko?: T; en?: T } | null | undefined,
  lang: Locale,
): T | undefined {
  if (!obj) return undefined;
  return (obj[lang] || obj.ko || obj.en) as T | undefined;
}

export default async function NewsPage({
  params,
}: PageProps<"/[lang]/news">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const posts = await getNews();

  return (
    <section className="px-6 pt-2 pb-20 md:pb-28">
      <header className="mb-12 md:mb-16 max-w-[680px]">
        <h1 className="text-[12px] tracking-[0.25em] uppercase text-zinc-400 mb-4">
          {dict.page.news}
        </h1>
      </header>

      {posts.length === 0 ? (
        <div className="max-w-[680px] py-20 text-zinc-400 text-[14px]">
          {lang === "ko"
            ? "아직 등록된 소식이 없습니다."
            : "No news yet."}
        </div>
      ) : (
        <ul className="flex flex-col gap-y-20 md:gap-y-28 max-w-[1100px]">
          {posts.map((post) => {
            const title = pickLocaleText(post.title, lang) ?? "";
            const body = pickLocaleText(post.body ?? undefined, lang);
            return (
              <li key={post._id} className="flex flex-col gap-5 md:gap-6">
                <div className="text-[12px] tracking-[0.2em] uppercase text-zinc-400">
                  {formatDate(post.publishedAt, lang)}
                </div>
                <h2 className="text-[20px] md:text-[24px] leading-snug tracking-[0.02em] text-zinc-900">
                  {title}
                </h2>

                {post.cover?.asset && (
                  <div className="relative bg-zinc-100 overflow-hidden aspect-[3/2] w-full">
                    <Image
                      src={urlFor(post.cover).width(1600).quality(90).url()}
                      alt={post.cover.alt ?? title}
                      fill
                      sizes="(max-width: 768px) 100vw, 1100px"
                      className="object-cover"
                    />
                  </div>
                )}

                {body && (
                  <div className="text-[15px] md:text-[16px] leading-[1.85] text-zinc-700 whitespace-pre-line max-w-[760px]">
                    {body}
                  </div>
                )}

                {post.images && post.images.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    {post.images.map((img, i) =>
                      img.asset ? (
                        <div
                          key={i}
                          className="relative bg-zinc-100 overflow-hidden aspect-[3/2]"
                        >
                          <Image
                            src={urlFor(img).width(1200).quality(85).url()}
                            alt={img.alt ?? ""}
                            fill
                            sizes="(max-width: 768px) 100vw, 540px"
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
