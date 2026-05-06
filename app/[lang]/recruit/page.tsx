import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n-config";
import { getDictionary } from "@/lib/dictionaries";

export default async function RecruitPage({
  params,
}: PageProps<"/[lang]/recruit">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  return (
    <section className="px-6 py-16 md:px-10 max-w-2xl mx-auto">
      <h1 className="text-2xl mb-6">{dict.page.recruit}</h1>
      <p className="text-zinc-500">{dict.page.comingSoon}</p>
    </section>
  );
}
