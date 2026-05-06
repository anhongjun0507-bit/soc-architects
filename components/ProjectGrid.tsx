import Image from "next/image";
import type { Locale } from "@/lib/i18n-config";
import type { Project, GridSpan } from "@/data/projects";

const spanClasses: Record<GridSpan, string> = {
  "1x1": "md:col-span-1 md:row-span-1",
  "2x1": "md:col-span-2 md:row-span-1",
  "3x1": "md:col-span-3 md:row-span-1",
  "1x2": "md:col-span-1 md:row-span-2",
  "2x2": "md:col-span-2 md:row-span-2",
  "3x2": "md:col-span-3 md:row-span-2",
};

export function ProjectGrid({
  projects,
  lang,
}: {
  projects: Project[];
  lang: Locale;
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-2 md:gap-3 p-3 md:p-4 md:auto-rows-[120px] lg:auto-rows-[150px] [grid-auto-flow:dense]">
      {projects.map((project) => (
        <figure
          key={project.slug}
          className={`relative aspect-[4/3] md:aspect-auto overflow-hidden bg-zinc-100 ${spanClasses[project.span]}`}
        >
          <Image
            src={project.cover.src}
            alt={project.title[lang]}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-cover"
          />
        </figure>
      ))}
    </div>
  );
}
