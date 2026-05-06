import type { Locale } from "@/lib/i18n-config";
import { contact, office } from "@/data/office";

export function Footer({
  copyright,
  lang,
}: {
  copyright: string;
  lang: Locale;
}) {
  return (
    <footer
      style={{ paddingBottom: "max(env(safe-area-inset-bottom), 2rem)" }}
      className="pt-12 md:pt-16"
    >
      <div className="max-w-[1040px] mx-auto px-5 md:px-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-8 text-[12px] tracking-[0.05em] text-zinc-500 leading-relaxed">
        <div className="space-y-1">
          <p>{office.address[lang]}</p>
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <a
              href={`mailto:${contact.email}`}
              className="hover:text-black transition-colors"
            >
              {contact.email}
            </a>
            <span aria-hidden className="text-zinc-300">
              ·
            </span>
            <a
              href={`tel:${contact.phone.replace(/\s|-/g, "")}`}
              className="hover:text-black transition-colors"
            >
              {contact.phone}
            </a>
            <span aria-hidden className="text-zinc-300">
              ·
            </span>
            <a
              href={contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition-colors"
            >
              {contact.instagramHandle}
            </a>
          </p>
        </div>
        <p className="text-zinc-400">{copyright}</p>
      </div>
    </footer>
  );
}
