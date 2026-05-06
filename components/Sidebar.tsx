import Link from "next/link";
import type { Locale } from "@/lib/i18n-config";
import type { Dictionary } from "@/lib/dictionaries";
import { LangToggle } from "./LangToggle";

export function Sidebar({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  return (
    <aside className="hidden md:flex flex-col gap-1 w-[160px] lg:w-[180px] flex-shrink-0 px-6 pt-12 pb-6 sticky top-0 self-start">
      <Link
        href={`/${lang}`}
        className="text-[15px] lg:text-[16px] tracking-[0.35em] lowercase font-light leading-tight hover:opacity-70 transition-opacity"
      >
        so.c_architects
      </Link>
      <span className="text-[10px] tracking-[0.2em] text-zinc-500 uppercase mt-1">
        SEL_HOME
      </span>

      <div className="mt-3">
        <LangToggle currentLang={lang} labels={dict.lang} />
      </div>

      <nav className="flex flex-col gap-[6px] text-[11px] lowercase mt-8 text-zinc-700">
        <Link
          href={`/${lang}/news`}
          className="hover:text-black transition-colors w-fit"
        >
          {dict.nav.news}
        </Link>
        <Link
          href={`/${lang}/projects`}
          className="hover:text-black transition-colors w-fit"
        >
          {dict.nav.projects}
        </Link>
        <Link
          href={`/${lang}/profile`}
          className="hover:text-black transition-colors w-fit"
        >
          {dict.nav.profile}
        </Link>
        <Link
          href={`/${lang}/recruit`}
          className="hover:text-black transition-colors w-fit"
        >
          {dict.nav.recruit}
        </Link>
        <Link
          href={`/${lang}/contact`}
          className="hover:text-black transition-colors w-fit"
        >
          {dict.nav.contact}
        </Link>
      </nav>

      <a
        href="https://www.instagram.com/so.c_architects/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="mt-5 inline-block text-zinc-700 hover:text-black transition-colors w-fit"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
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
    </aside>
  );
}
