import Link from "next/link";
import type { Locale } from "@/lib/i18n-config";
import type { Dictionary } from "@/lib/dictionaries";
import { LangToggle } from "./LangToggle";

export function CompactTopBar({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  return (
    <header className="hidden md:flex items-center justify-between px-6 lg:px-10 pt-5 pb-4">
      <Link
        href={`/${lang}`}
        className="text-[13px] tracking-[0.4em] lowercase font-light hover:opacity-70 transition-opacity"
      >
        so.c_architects
      </Link>

      <nav className="flex items-center gap-5 text-[12px] lowercase text-zinc-700">
        <Link
          href={`/${lang}/news`}
          className="hover:text-black transition-colors"
        >
          {dict.nav.news}
        </Link>
        <Link
          href={`/${lang}/projects`}
          className="hover:text-black transition-colors"
        >
          {dict.nav.projects}
        </Link>
        <Link
          href={`/${lang}/profile`}
          className="hover:text-black transition-colors"
        >
          {dict.nav.profile}
        </Link>
        <Link
          href={`/${lang}/recruit`}
          className="hover:text-black transition-colors"
        >
          {dict.nav.recruit}
        </Link>
        <Link
          href={`/${lang}/contact`}
          className="hover:text-black transition-colors"
        >
          {dict.nav.contact}
        </Link>

        <a
          href="https://www.instagram.com/so.c_architects/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="ml-1 text-zinc-700 hover:text-black transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </a>

        <div className="ml-1">
          <LangToggle currentLang={lang} labels={dict.lang} />
        </div>
      </nav>
    </header>
  );
}
