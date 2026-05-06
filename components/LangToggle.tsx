"use client";

import { usePathname, useRouter } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n-config";

export function LangToggle({
  currentLang,
  labels,
  onSwitch,
}: {
  currentLang: Locale;
  labels: Record<Locale, string>;
  onSwitch?: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const switchLang = (newLang: Locale) => {
    if (newLang === currentLang) return;
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) {
      router.push(`/${newLang}`);
    } else {
      segments[0] = newLang;
      router.push("/" + segments.join("/"));
    }
    onSwitch?.();
  };

  return (
    <div className="flex items-center gap-1.5 text-[11px] tracking-wider">
      {locales.map((loc, i) => (
        <span key={loc} className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => switchLang(loc)}
            className={
              loc === currentLang
                ? "text-black"
                : "text-zinc-400 hover:text-black transition-colors"
            }
          >
            {labels[loc]}
          </button>
          {i < locales.length - 1 && (
            <span className="text-zinc-300" aria-hidden>
              /
            </span>
          )}
        </span>
      ))}
    </div>
  );
}
