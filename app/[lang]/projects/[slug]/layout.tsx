import { notFound } from "next/navigation";
import { LeftSidebar } from "@/components/LeftSidebar";
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
      <div className="flex-1 flex flex-col md:flex-row min-h-0">
        <LeftSidebar lang={lang} dict={dict} />
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </>
  );
}
