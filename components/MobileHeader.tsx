import Link from "next/link";
import type { Locale } from "@/lib/i18n-config";
import type { Dictionary } from "@/lib/dictionaries";
import { MobileMenu } from "./MobileMenu";

export function MobileHeader({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  return (
    <header className="md:hidden flex items-center justify-between px-4 py-3 border-b border-black/10">
      <Link
        href={`/${lang}`}
        className="text-sm tracking-[0.3em] lowercase font-light"
      >
        so.c_architects
      </Link>
      <MobileMenu lang={lang} dict={dict} />
    </header>
  );
}
