import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n-config";
import type { Project } from "@/data/projects";

export function ProjectGrid({
  projects,
  lang,
}: {
  projects: Project[];
  lang: Locale;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-6 gap-y-10 md:gap-y-14 max-w-[1200px] mx-auto px-6 md:px-10 pt-2 pb-16 md:pb-24">
      {projects.map((project) => (
        <Link
          key={project.slug}
          href={`/${lang}/projects/${project.slug}`}
          className="block"
        >
          <Image
            src={project.cover.src}
            alt={project.title[lang]}
            width={project.cover.width}
            height={project.cover.height}
            sizes="(max-width: 640px) 100vw, 580px"
            className="w-full h-auto block"
          />
          <figcaption className="mt-3 text-[12px] leading-relaxed">
            <span className="text-zinc-900">{project.title[lang]}</span>
            <span className="text-zinc-500">、{project.location[lang]}</span>
          </figcaption>
        </Link>
      ))}
    </div>
  );
}
