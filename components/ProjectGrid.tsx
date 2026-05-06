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
    <div className="columns-3 gap-2 max-w-[700px] pl-2 pr-6 pt-12 lg:pt-14 pb-16">
      {projects.map((project) => (
        <Link
          key={project.slug}
          href={`/${lang}/projects/${project.slug}`}
          className="block break-inside-avoid mb-2"
        >
          <Image
            src={project.cover.src}
            alt={project.title[lang]}
            width={project.cover.width}
            height={project.cover.height}
            sizes="(max-width: 640px) 100vw, 220px"
            className="w-full h-auto block"
          />
        </Link>
      ))}
    </div>
  );
}
