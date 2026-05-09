import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n-config";
import { formatNewsDate } from "@/lib/format";
import type { NewsPost } from "@/sanity/lib/types";

export function NewsGrid({
  posts,
  lang,
}: {
  posts: NewsPost[];
  lang: Locale;
}) {
  return (
    <div className="flex flex-col gap-y-16 md:gap-y-20 pt-2 pb-20 md:pb-32">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 md:gap-x-8 gap-y-20 md:gap-y-24 px-5 md:px-6 lg:px-10 w-full">
        {posts.map((post, index) => (
          <NewsCard
            key={post.slug}
            post={post}
            lang={lang}
            priority={index < 4}
          />
        ))}
      </div>
    </div>
  );
}

function NewsCaption({
  post,
  lang,
  className = "",
}: {
  post: NewsPost;
  lang: Locale;
  className?: string;
}) {
  const title = post.title[lang] ?? post.title.ko ?? post.title.en ?? "";
  return (
    <div className={`leading-snug ${className}`}>
      <div className="text-[15px] font-light tracking-[0.04em] text-zinc-900">
        {title}
      </div>
      <div className="text-[15px] font-light tracking-[0.04em] text-zinc-500 mt-1">
        {formatNewsDate(post.date, lang)}
      </div>
    </div>
  );
}

function NewsCard({
  post,
  lang,
  priority,
}: {
  post: NewsPost;
  lang: Locale;
  priority: boolean;
}) {
  const title = post.title[lang] ?? post.title.ko ?? post.title.en ?? "";
  return (
    <Link href={`/${lang}/news/${post.slug}`} className="block">
      <NewsCaption post={post} lang={lang} className="mb-3 md:mb-4" />
      <div className="relative bg-zinc-100 overflow-hidden aspect-square">
        {post.cover ? (
          <Image
            src={post.cover.src}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            quality={95}
            priority={priority}
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[11px] tracking-[0.25em] uppercase text-zinc-300">
              coming soon
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
