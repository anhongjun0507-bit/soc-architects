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
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 px-6 py-10 md:px-10">
      {projects.map((project) => (
        <li key={project.slug} className="flex flex-col">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100">
            <Image
              src={project.cover}
              alt={project.title[lang]}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
          <div className="mt-3 flex items-baseline justify-between gap-3 text-sm">
            <span className="font-medium">{project.title[lang]}</span>
            <span className="text-zinc-500 text-xs">
              {project.location[lang]} · {project.year}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
