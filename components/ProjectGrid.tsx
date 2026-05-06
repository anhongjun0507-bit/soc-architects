import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n-config";
import type { Project, ProjectPriority } from "@/data/projects";

const layout: Record<
  ProjectPriority,
  { cell: string; aspect: string; sizes: string; quality: number }
> = {
  feature: {
    cell: "col-span-2 md:col-span-6",
    aspect: "aspect-[16/9]",
    sizes: "(max-width: 768px) 100vw, 1040px",
    quality: 90,
  },
  medium: {
    cell: "col-span-2 md:col-span-3",
    aspect: "aspect-[3/2]",
    sizes: "(max-width: 768px) 100vw, 520px",
    quality: 90,
  },
  small: {
    cell: "col-span-1 md:col-span-2",
    aspect: "aspect-square",
    sizes: "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 360px",
    quality: 90,
  },
};

export function ProjectGrid({
  projects,
  lang,
}: {
  projects: Project[];
  lang: Locale;
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-4 max-w-[1040px] mx-auto px-5 md:px-8 pt-2 md:pt-0 pb-16 md:pb-28">
      {projects.map((project, i) => {
        const cfg = layout[project.priority ?? "small"];
        return (
          <Link
            key={project.slug}
            href={`/${lang}/projects/${project.slug}`}
            className={`block ${cfg.cell} ${cfg.aspect} overflow-hidden bg-zinc-100`}
          >
            {project.cover ? (
              <Image
                src={project.cover.src}
                alt={project.title[lang]}
                width={project.cover.width}
                height={project.cover.height}
                sizes={cfg.sizes}
                quality={cfg.quality}
                preload={i < 4}
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
        );
      })}
    </div>
  );
}
