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
    <header className="border-b border-black/10">
      <div className="flex items-center justify-between px-6 py-5 md:px-10">
        <Link
          href={`/${lang}`}
          className="text-base sm:text-lg font-light tracking-[0.3em] hover:opacity-70 transition-opacity"
        >
          so.c_architects
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link
            href={`/${lang}`}
            className="text-xs uppercase tracking-widest hover:opacity-70 transition-opacity"
          >
            {dict.nav.home}
          </Link>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={`/${lang}${item.href}`}
              className="lowercase hover:opacity-70 transition-opacity"
            >
              {item.label}
            </Link>
          ))}
          <LangToggle currentLang={lang} labels={dict.lang} />
        </nav>

        <MobileMenu lang={lang} dict={dict} />
      </div>
    </header>
  );
}
