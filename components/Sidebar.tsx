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
    <aside className="hidden md:flex flex-col items-start pt-14 lg:pt-20 pb-12 max-w-[1040px] mx-auto w-full px-5 md:px-8 text-left">
      <Link
        href={`/${lang}`}
        className="text-[16px] tracking-[0.4em] lowercase font-light leading-tight hover:opacity-70 transition-opacity"
      >
        so.c_architects
      </Link>
      <span className="text-[11px] tracking-[0.2em] text-zinc-500 uppercase mt-1.5">
        SEL_HOME
      </span>

      <nav className="flex flex-col items-start gap-[5px] text-[14px] lowercase mt-7 text-zinc-700">
        <Link
          href={`/${lang}`}
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
          href={`/${lang}/contact`}
          className="hover:text-black transition-colors"
        >
          {dict.nav.contact}
        </Link>
      </nav>

      <a
        href="https://www.instagram.com/so.c_architects/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="mt-4 inline-block text-zinc-700 hover:text-black transition-colors"
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

      <div className="mt-6">
        <LangToggle currentLang={lang} labels={dict.lang} />
      </div>
    </aside>
  );
}
