import Link from "next/link";
import type { Locale } from "@/lib/i18n-config";
import type { Dictionary } from "@/lib/dictionaries";
import { LangToggle } from "./LangToggle";
import { MobileMenu } from "./MobileMenu";

export function Header({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const navItems = [
    { href: "/news", label: dict.nav.news },
    { href: "/projects", label: dict.nav.projects },
    { href: "/profile", label: dict.nav.profile },
    { href: "/recruit", label: dict.nav.recruit },
    { href: "/contact", label: dict.nav.contact },
  ];

  return (
    <header>
      <div className="flex items-center gap-5 md:gap-6 px-5 py-4 md:px-8 md:py-5">
        <Link
          href={`/${lang}`}
          className="hidden md:inline text-[10px] tracking-[0.2em] uppercase text-zinc-700 hover:text-black transition-colors"
        >
          SEOUL_HOME
        </Link>

        <Link
          href={`/${lang}`}
          className="text-xl md:text-[26px] tracking-[0.35em] font-light hover:opacity-70 transition-opacity whitespace-nowrap"
        >
          so.c_architects
        </Link>

        <div className="hidden md:flex items-center ml-2">
          <LangToggle currentLang={lang} labels={dict.lang} />
        </div>

        <nav className="hidden md:flex items-center gap-5 text-xs lowercase">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={`/${lang}${item.href}`}
              className="hover:opacity-70 transition-opacity"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href="https://www.instagram.com/so.c_architects/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="hidden md:inline ml-auto text-zinc-700 hover:text-black transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </a>

        <div className="md:hidden ml-auto">
          <MobileMenu lang={lang} dict={dict} />
        </div>
      </div>
    </header>
  );
}
