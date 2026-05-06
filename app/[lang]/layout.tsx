import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { CompactTopBar } from "@/components/CompactTopBar";
import { Footer } from "@/components/Footer";
import { MobileHeader } from "@/components/MobileHeader";
import { hasLocale, locales } from "@/lib/i18n-config";
import { getDictionary } from "@/lib/dictionaries";
import "../globals.css";

export const metadata: Metadata = {
  title: "so.c_architects",
  description:
    "so.c_architects — architecture, interior design, urban design, public art. Founded by Jungho So in Seoul.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <html lang={lang} className="h-full antialiased">
      <head>
        <link
          rel="preconnect"
          href="https://cdn.jsdelivr.net"
          crossOrigin=""
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-jp-dynamic-subset.min.css"
        />
      </head>
      <body className="min-h-full bg-white text-zinc-900">
        <div className="flex flex-col min-h-screen">
          <MobileHeader lang={lang} dict={dict} />
          <CompactTopBar lang={lang} dict={dict} />
          <main className="flex-1">{children}</main>
          <Footer copyright={dict.footer.copyright} lang={lang} />
        </div>
      </body>
    </html>
  );
}
