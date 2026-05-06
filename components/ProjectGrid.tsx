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
    <div className="columns-1 sm:columns-2 md:columns-3 gap-x-5 md:gap-x-6 lg:gap-x-8 max-w-[900px] lg:max-w-[1000px] pl-6 md:pl-10 pr-6 md:pr-12 lg:pr-16 pt-12 md:pt-24 lg:pt-28 pb-24">
      {projects.map((project) => (
        <figure
          key={project.slug}
          className="break-inside-avoid mb-5 md:mb-6 lg:mb-8"
        >
          <Image
            src={project.cover.src}
            alt={project.title[lang]}
            width={project.cover.width}
            height={project.cover.height}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 300px"
            className="w-full h-auto block"
          />
        </figure>
      ))}
    </div>
  );
}
