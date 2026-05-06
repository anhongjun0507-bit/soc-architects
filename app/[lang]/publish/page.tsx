import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n-config";
import { getDictionary } from "@/lib/dictionaries";

export const metadata: Metadata = {
  title: "Publish · so.c_architects",
};

export default async function PublishPage({
  params,
}: PageProps<"/[lang]/publish">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <section className="max-w-[1240px] mx-auto px-5 md:px-10 pt-2 pb-20 md:pb-28 text-[15px] leading-relaxed text-zinc-800">
      <header className="mb-10 md:mb-14 max-w-[680px]">
        <h1 className="text-[12px] tracking-[0.25em] uppercase text-zinc-400 mb-4">
          {dict.page.publish}
        </h1>
        <p className="text-[16px] leading-[1.85] text-zinc-700">
          {lang === "ko"
            ? "단행본·전시 도록·기고문·강연 자료 등 사무소가 참여한 출판물입니다."
            : "Publications the studio has contributed to: books, exhibition catalogues, essays, and lectures."}
        </p>
      </header>

      <div className="max-w-[680px]">
        <p className="text-[13px] tracking-[0.15em] uppercase text-zinc-300">
          {dict.page.comingSoon}
        </p>
      </div>
    </section>
  );
}
