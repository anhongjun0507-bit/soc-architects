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
    <div className="columns-1 md:columns-2 gap-x-6 md:gap-x-8 px-5 md:px-8 pt-2 pb-10 [&>*]:mb-6 md:[&>*]:mb-8">
      {projects.map((project) => (
        <figure key={project.slug} className="break-inside-avoid">
          <Image
            src={project.cover.src}
            alt={project.title[lang]}
            width={project.cover.width}
            height={project.cover.height}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="w-full h-auto block"
          />
          <figcaption className="mt-2 text-[13px] leading-relaxed text-zinc-800">
            {project.title[lang]}, {project.location[lang]} / {project.year}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
