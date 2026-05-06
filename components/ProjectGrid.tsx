import Image from "next/image";
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
    <div className="columns-1 sm:columns-2 md:columns-3 gap-x-3 md:gap-x-4 px-6 md:px-16 lg:px-20 pt-12 md:pt-20 pb-16">
      {projects.map((project) => (
        <figure
          key={project.slug}
          className="break-inside-avoid mb-3 md:mb-4"
        >
          <Image
            src={project.cover.src}
            alt={project.title[lang]}
            width={project.cover.width}
            height={project.cover.height}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            className="w-full h-auto block"
          />
        </figure>
      ))}
    </div>
  );
}
