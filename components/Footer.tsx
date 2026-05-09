import type { Locale } from "@/lib/i18n-config";
import { getProfile } from "@/sanity/lib/fetchers";

export async function Footer({
  lang,
}: {
  lang: Locale;
}) {
  const profile = await getProfile();
  const address = profile?.contact?.address?.[lang] ?? "";
  const email = profile?.contact?.email ?? "";
  const phone = profile?.contact?.phone ?? "";
  const instagram = profile?.contact?.instagram ?? "";
  const instagramHandle = profile?.contact?.instagramHandle ?? "";

  return (
    <footer
      style={{ paddingBottom: "max(env(safe-area-inset-bottom), 2rem)" }}
      className="pt-12 md:pt-16"
    >
      <div className="max-w-[1040px] mx-auto px-5 md:px-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-8 text-[12px] tracking-[0.05em] text-zinc-500 leading-relaxed">
        <div className="space-y-1">
          <p>{address}</p>
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <a
              href={`mailto:${email}`}
              className="hover:text-black transition-colors"
            >
              {email}
            </a>
            <span aria-hidden className="text-zinc-300">
              ·
            </span>
            <a
              href={`tel:${phone.replace(/\s|-/g, "")}`}
              className="hover:text-black transition-colors"
            >
              {phone}
            </a>
            <span aria-hidden className="text-zinc-300">
              ·
            </span>
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition-colors"
            >
              {instagramHandle}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
