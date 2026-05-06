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
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 max-w-[900px] mx-auto px-4 md:px-6 pb-16 md:pb-24">
      {projects.map((project) => (
        <Link
          key={project.slug}
          href={`/${lang}/projects/${project.slug}`}
          className="block aspect-square overflow-hidden"
        >
          <Image
            src={project.cover.src}
            alt={project.title[lang]}
            width={project.cover.width}
            height={project.cover.height}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 290px"
            className="w-full h-full object-cover block"
          />
        </Link>
      ))}
    </div>
  );
}
