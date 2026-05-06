import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n-config";
import { getDictionary } from "@/lib/dictionaries";
import { office, principal } from "@/data/office";

export const metadata: Metadata = {
  title: "Profile · so.c_architects",
};

export default async function ProfilePage({
  params,
}: PageProps<"/[lang]/profile">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <section className="max-w-[1040px] mx-auto px-5 md:px-8 pt-6 md:pt-4 pb-16 md:pb-28 text-[15px] leading-relaxed text-zinc-800">
      <div className="max-w-[680px] space-y-14 md:space-y-16">
        <div>
          <h2 className="text-[12px] tracking-[0.25em] uppercase text-zinc-500 mb-4">
            {dict.profile.office}
          </h2>
          <p className="text-[16px] mb-1">{office.name[lang]}</p>
          <p className="mb-1">{office.brand}</p>
          <p className="text-zinc-500">est. {office.founded}</p>
          <p className="text-zinc-500">{office.fields[lang]}</p>
          <p className="text-zinc-500">{office.address[lang]}</p>

          <div className="mt-6 space-y-3">
            {office.description[lang].map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-[12px] tracking-[0.25em] uppercase text-zinc-500 mb-4">
            {dict.profile.principal}
          </h2>
          <p className="text-[16px] mb-1">{principal.name[lang]}</p>
          <p className="text-zinc-500">{principal.title[lang]}</p>
        </div>

        <div>
          <h2 className="text-[12px] tracking-[0.25em] uppercase text-zinc-500 mb-4">
            {dict.profile.education}
          </h2>
          <ul className="space-y-2">
            {principal.education.map((e, i) => (
              <li key={i} className="flex gap-6 md:gap-10">
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
            {principal.career.map((c, i) => (
              <li key={i} className="flex gap-6 md:gap-10">
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
