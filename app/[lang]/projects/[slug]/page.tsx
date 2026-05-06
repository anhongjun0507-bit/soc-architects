import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { hasLocale, locales } from "@/lib/i18n-config";
import { getDictionary } from "@/lib/dictionaries";
import { projects } from "@/data/projects";

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    projects.map((p) => ({ lang, slug: p.slug })),
  );
}

export default async function ProjectDetailPage({
  params,
}: PageProps<"/[lang]/projects/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const dict = await getDictionary(lang);

  return (
    <article className="max-w-[1040px] mx-auto px-5 md:px-8 pt-2 pb-20 md:pb-28 text-[14px] leading-relaxed text-zinc-800">
      <header className="max-w-[680px] mb-12 md:mb-16">
        <h1 className="text-[18px] mb-5">{project.title[lang]}</h1>

        <ul className="space-y-1 text-[13px]">
          <li className="flex gap-6 md:gap-10">
            <span className="w-[110px] shrink-0 text-zinc-500 lowercase">
              location
            </span>
            <span>{project.location[lang]}</span>
          </li>
          <li className="flex gap-6 md:gap-10">
            <span className="w-[110px] shrink-0 text-zinc-500 lowercase">
              year
            </span>
            <span className="tabular-nums">{project.year}</span>
          </li>
          {project.area && (
            <li className="flex gap-6 md:gap-10">
              <span className="w-[110px] shrink-0 text-zinc-500 lowercase">
                area
              </span>
              <span className="tabular-nums">{project.area}</span>
            </li>
          )}
          {project.status && (
            <li className="flex gap-6 md:gap-10">
              <span className="w-[110px] shrink-0 text-zinc-500 lowercase">
                status
              </span>
              <span>{project.status[lang]}</span>
            </li>
          )}
          {project.collaborator && (
            <li className="flex gap-6 md:gap-10">
              <span className="w-[110px] shrink-0 text-zinc-500 lowercase">
                collaborator
              </span>
              <span>{project.collaborator}</span>
            </li>
          )}
        </ul>
      </header>

      {project.description && (
        <div className="max-w-[680px] space-y-3 mb-14 md:mb-20">
          {project.description[lang].map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      )}

      {project.images.length > 0 ? (
        <div className="space-y-3 md:space-y-4">
          {project.images.map((image, i) => (
            <Image
              key={i}
              src={image.src}
              alt={`${project.title[lang]} ${i + 1}`}
              width={image.width}
              height={image.height}
              sizes="(max-width: 1040px) 100vw, 1040px"
              className="w-full h-auto block"
              priority={i === 0}
            />
          ))}
        </div>
      ) : (
        <p className="text-zinc-400 text-[13px] mt-2">
          {dict.page.comingSoon}
        </p>
      )}

      <div className="mt-16 md:mt-20 text-[12px]">
        <Link
          href={`/${lang}`}
          className="text-zinc-500 hover:text-black transition-colors lowercase"
        >
          ← projects
        </Link>
      </div>
    </article>
  );
}
