"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n-config";
import type { Dictionary } from "@/lib/dictionaries";
import { LangToggle } from "./LangToggle";

export function MobileMenu({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const items = [
    { href: "", label: dict.nav.home },
    { href: "/news", label: dict.nav.news },
    { href: "/projects", label: dict.nav.projects },
    { href: "/profile", label: dict.nav.profile },
    { href: "/recruit", label: dict.nav.recruit },
    { href: "/contact", label: dict.nav.contact },
  ];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="md:hidden text-xs uppercase tracking-widest"
        aria-label={dict.site.menu}
      >
        {dict.site.menu}
      </button>
      {open && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col p-6 md:hidden">
          <div className="flex items-center justify-between">
            <span className="text-sm font-light tracking-[0.3em]">
              so.c_architects
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-xs uppercase tracking-widest"
            >
              {dict.site.close}
            </button>
          </div>
          <nav className="flex flex-col gap-6 mt-16 text-2xl lowercase">
            {items.map((item) => (
              <Link
                key={item.href || "home"}
                href={`/${lang}${item.href}`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto pt-8">
            <LangToggle
              currentLang={lang}
              labels={dict.lang}
              onSwitch={() => setOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
