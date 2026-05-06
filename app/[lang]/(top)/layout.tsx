import { notFound } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { MobileHeader } from "@/components/MobileHeader";
import { hasLocale } from "@/lib/i18n-config";
import { getDictionary } from "@/lib/dictionaries";

export default async function TopLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <MobileHeader lang={lang} dict={dict} />
      <Sidebar lang={lang} dict={dict} />
      <main className="flex-1">{children}</main>
    </>
  );
}
