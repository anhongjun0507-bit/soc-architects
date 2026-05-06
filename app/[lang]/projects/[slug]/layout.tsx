import { notFound } from "next/navigation";
import { CompactTopBar } from "@/components/CompactTopBar";
import { MobileHeader } from "@/components/MobileHeader";
import { hasLocale } from "@/lib/i18n-config";
import { getDictionary } from "@/lib/dictionaries";

export default async function ProjectDetailLayout({
  children,
  params,
}: LayoutProps<"/[lang]/projects/[slug]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <MobileHeader lang={lang} dict={dict} />
      <CompactTopBar lang={lang} dict={dict} />
      <main className="flex-1">{children}</main>
    </>
  );
}
