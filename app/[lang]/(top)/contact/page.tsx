import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n-config";
import { getDictionary } from "@/lib/dictionaries";
import { office, contact } from "@/data/office";

export default async function ContactPage({
  params,
}: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <section className="max-w-[1040px] mx-auto px-5 md:px-8 pt-4 pb-20 md:pb-28 text-[14px] leading-relaxed text-zinc-800">
      <ul className="max-w-[680px] space-y-3">
        <li className="flex gap-6 md:gap-10">
          <span className="w-[110px] shrink-0 text-zinc-500 lowercase">
            {dict.contact.email}
          </span>
          <a href={`mailto:${contact.email}`} className="hover:text-black">
            {contact.email}
          </a>
        </li>
        <li className="flex gap-6 md:gap-10">
          <span className="w-[110px] shrink-0 text-zinc-500 lowercase">
            {dict.contact.phone}
          </span>
          <a
            href={`tel:${contact.phone.replace(/\s|-/g, "")}`}
            className="hover:text-black"
          >
            {contact.phone}
          </a>
        </li>
        <li className="flex gap-6 md:gap-10">
          <span className="w-[110px] shrink-0 text-zinc-500 lowercase">
            {dict.contact.address}
          </span>
          <span>{office.address[lang]}</span>
        </li>
        <li className="flex gap-6 md:gap-10">
          <span className="w-[110px] shrink-0 text-zinc-500 lowercase">
            {dict.contact.instagram}
          </span>
          <a
            href={contact.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black"
          >
            {contact.instagramHandle}
          </a>
        </li>
      </ul>
    </section>
  );
}
