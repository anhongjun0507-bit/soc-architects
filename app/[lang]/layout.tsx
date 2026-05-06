import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { hasLocale, locales } from "@/lib/i18n-config";
import { getDictionary } from "@/lib/dictionaries";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "so.c_architects",
  description:
    "so.c_architects — architecture, interior design, urban design, public art. Founded by Jungho So in Seoul.",
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
    <html lang={lang} className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-white text-zinc-900">
        <div className="flex flex-col min-h-screen">
          {children}
          <Footer copyright={dict.footer.copyright} />
        </div>
      </body>
    </html>
  );
}
