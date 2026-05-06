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
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-[1040px] mx-auto px-5 md:px-8 pt-2 md:pt-0 pb-16 md:pb-28">
      {projects.map((project, i) => (
        <Link
          key={project.slug}
          href={`/${lang}/projects/${project.slug}`}
          className="block aspect-square overflow-hidden bg-zinc-100"
        >
          {project.cover ? (
            <Image
              src={project.cover.src}
              alt={project.title[lang]}
              width={project.cover.width}
              height={project.cover.height}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 360px"
              quality={90}
              preload={i < 6}
              className="w-full h-full object-cover block"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-center gap-2 px-4 text-zinc-400">
              <span className="text-[11px] tracking-[0.15em] uppercase">
                {project.title[lang]}
              </span>
              <span className="text-[9px] tracking-[0.2em] uppercase text-zinc-300">
                coming soon
              </span>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
}
