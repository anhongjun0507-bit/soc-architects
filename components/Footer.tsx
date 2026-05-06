import Link from "next/link";
import type { Locale } from "@/lib/i18n-config";

export function Footer({
  lang,
  copyright,
  homeLabel,
}: {
  lang: Locale;
  copyright: string;
  homeLabel: string;
}) {
  return (
    <footer className="border-t border-black/10 mt-12">
      <div className="flex items-center justify-between px-6 py-8 md:px-10 text-xs text-zinc-500">
        <p>{copyright}</p>
        <Link
          href={`/${lang}`}
          className="uppercase tracking-widest hover:text-black transition-colors"
        >
          {homeLabel}
        </Link>
      </div>
    </footer>
  );
}
