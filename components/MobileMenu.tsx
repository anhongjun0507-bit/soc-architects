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
    { href: "", label: dict.nav.projects },
    { href: "/news", label: dict.nav.news },
    { href: "/publish", label: dict.nav.publish },
    { href: "/profile", label: dict.nav.profile },
    { href: "/contact", label: dict.nav.contact },
  ];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="md:hidden text-[13px] uppercase tracking-[0.2em] py-2 -my-2 px-1"
        aria-label={dict.site.menu}
      >
        {dict.site.menu}
      </button>
      {open && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col px-5 pt-5 pb-[max(env(safe-area-inset-bottom),1.5rem)] md:hidden">
          <div className="flex items-center justify-between">
            <span className="text-[16px] font-light tracking-[0.3em]">
              so.c_architects
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-[13px] uppercase tracking-[0.2em] py-2 -my-2 px-1"
            >
              {dict.site.close}
            </button>
          </div>
          <nav className="flex flex-col gap-5 mt-14 text-[22px] lowercase font-light">
            {items.map((item) => (
              <Link
                key={item.href || "home"}
                href={`/${lang}${item.href}`}
                onClick={() => setOpen(false)}
                className="w-fit"
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
