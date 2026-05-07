import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n-config";
import { getDictionary } from "@/lib/dictionaries";
import { getProfile } from "@/sanity/lib/fetchers";
import { ParagraphPortableText } from "@/sanity/lib/portable-text";

export const metadata: Metadata = {
  title: "Profile · so.c_architects",
};

export default async function ProfilePage({
  params,
}: PageProps<"/[lang]/profile">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const profile = await getProfile();

  const officeName = profile?.officeName?.[lang] ?? "";
  const fields = profile?.fields?.[lang] ?? "";
  const address = profile?.contact?.address?.[lang] ?? "";
  const founded = profile?.founded;
  const bioBlocks = profile?.bio?.[lang];
  const principalName = profile?.principal?.name?.[lang] ?? "";
  const principalTitle = profile?.principal?.title?.[lang] ?? "";
  const education = profile?.principal?.education ?? [];
  const career = profile?.principal?.career ?? [];

  return (
    <section className="max-w-[1040px] mx-auto px-5 md:px-8 pt-6 md:pt-4 pb-16 md:pb-28 text-[15px] leading-relaxed text-zinc-800">
      <div className="max-w-[680px] space-y-14 md:space-y-16">
        <div>
          <h2 className="text-[12px] tracking-[0.25em] uppercase text-zinc-500 mb-4">
            {dict.profile.office}
          </h2>
          <p className="text-[16px] mb-1">{officeName}</p>
          <p className="mb-1">so.c_architects</p>
          {founded && <p className="text-zinc-500">est. {founded}</p>}
          <p className="text-zinc-500">{fields}</p>
          <p className="text-zinc-500">{address}</p>

          {bioBlocks && bioBlocks.length > 0 && (
            <div className="mt-6 space-y-3">
              <ParagraphPortableText value={bioBlocks} />
            </div>
          )}
        </div>

        <div>
          <h2 className="text-[12px] tracking-[0.25em] uppercase text-zinc-500 mb-4">
            {dict.profile.principal}
          </h2>
          <p className="text-[16px] mb-1">{principalName}</p>
          <p className="text-zinc-500">{principalTitle}</p>
        </div>

        <div>
          <h2 className="text-[12px] tracking-[0.25em] uppercase text-zinc-500 mb-4">
            {dict.profile.education}
          </h2>
          <ul className="space-y-2">
            {education.map((e, i) => (
              <li key={e._key ?? i} className="flex gap-6 md:gap-10">
                <span className="w-[110px] shrink-0 text-zinc-500 tabular-nums">
                  {e.period}
                </span>
                <span>{e.detail[lang]}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-[12px] tracking-[0.25em] uppercase text-zinc-500 mb-4">
            {dict.profile.career}
          </h2>
          <ul className="space-y-2">
            {career.map((c, i) => (
              <li key={c._key ?? i} className="flex gap-6 md:gap-10">
                <span className="w-[110px] shrink-0 text-zinc-500 tabular-nums">
                  {c.period}
                </span>
                <span>{c.detail[lang]}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
