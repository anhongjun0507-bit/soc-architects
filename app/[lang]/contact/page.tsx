import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n-config";
import { getDictionary } from "@/lib/dictionaries";
import { getProfile } from "@/sanity/lib/fetchers";

export const metadata: Metadata = {
  title: "Contact · so.c_architects",
};

export default async function ContactPage({
  params,
}: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const profile = await getProfile();

  const email = profile?.contact?.email ?? "";
  const phone = profile?.contact?.phone ?? "";
  const address = profile?.contact?.address?.[lang] ?? "";
  const instagram = profile?.contact?.instagram ?? "";
  const instagramHandle = profile?.contact?.instagramHandle ?? "";

  return (
    <section className="max-w-[1040px] mx-auto px-5 md:px-8 pt-6 md:pt-4 pb-16 md:pb-28 text-[15px] leading-relaxed text-zinc-800">
      <ul className="max-w-[680px] space-y-3">
        <li className="flex gap-6 md:gap-10">
          <span className="w-[110px] shrink-0 text-zinc-500 lowercase">
            {dict.contact.email}
          </span>
          <a href={`mailto:${email}`} className="hover:text-black">
            {email}
          </a>
        </li>
        <li className="flex gap-6 md:gap-10">
          <span className="w-[110px] shrink-0 text-zinc-500 lowercase">
            {dict.contact.phone}
          </span>
          <a
            href={`tel:${phone.replace(/\s|-/g, "")}`}
            className="hover:text-black"
          >
            {phone}
          </a>
        </li>
        <li className="flex gap-6 md:gap-10">
          <span className="w-[110px] shrink-0 text-zinc-500 lowercase">
            {dict.contact.address}
          </span>
          <span>{address}</span>
        </li>
        <li className="flex gap-6 md:gap-10">
          <span className="w-[110px] shrink-0 text-zinc-500 lowercase">
            {dict.contact.instagram}
          </span>
          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black"
          >
            {instagramHandle}
          </a>
        </li>
      </ul>
    </section>
  );
}
