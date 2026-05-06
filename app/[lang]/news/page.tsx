import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n-config";
import { getDictionary } from "@/lib/dictionaries";
import { contact } from "@/data/office";

export const metadata: Metadata = {
  title: "News · so.c_architects",
};

export default async function NewsPage({
  params,
}: PageProps<"/[lang]/news">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const lightWidgetId = process.env.NEXT_PUBLIC_LIGHTWIDGET_ID;

  return (
    <section className="max-w-[1240px] mx-auto px-5 md:px-10 pt-2 pb-20 md:pb-28">
      <header className="mb-10 md:mb-14 max-w-[680px]">
        <h1 className="text-[11px] tracking-[0.25em] uppercase text-zinc-400 mb-4">
          {dict.page.news}
        </h1>
        <p className="text-[14.5px] leading-[1.85] text-zinc-700">
          {lang === "ko"
            ? "사무소의 일상과 진행 중인 작업은 Instagram에서 가장 자주 업데이트됩니다."
            : "The studio's day-to-day and ongoing work is updated most frequently on Instagram."}
        </p>
        <a
          href={contact.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-[12px] tracking-[0.15em] lowercase text-zinc-900 hover:text-zinc-500 transition-colors border-b border-zinc-300 pb-0.5"
        >
          {contact.instagramHandle} →
        </a>
      </header>

      {lightWidgetId ? (
        <div className="aspect-[4/3] sm:aspect-[16/9] w-full overflow-hidden bg-zinc-50">
          <iframe
            src={`https://cdn.lightwidget.com/widgets/${lightWidgetId}.html`}
            scrolling="no"
            allowTransparency
            className="lightwidget-widget w-full h-full border-0"
            style={{ width: "100%", border: 0, overflow: "hidden" }}
          />
        </div>
      ) : (
        <div className="aspect-[4/3] sm:aspect-[16/9] w-full bg-zinc-50 flex items-center justify-center text-center px-6">
          <p className="text-[12px] tracking-[0.15em] uppercase text-zinc-400 max-w-[400px]">
            {lang === "ko"
              ? "Instagram 피드 위젯이 곧 연결됩니다"
              : "Instagram feed widget will be connected shortly"}
          </p>
        </div>
      )}
    </section>
  );
}
