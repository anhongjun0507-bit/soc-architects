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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 md:gap-x-5 gap-y-12 md:gap-y-16 max-w-[1240px] mx-auto px-5 md:px-10 pt-2 pb-16 md:pb-28">
      {projects.map((project, i) => {
        const isFeature = project.priority === "feature";
        return (
          <Link
            key={project.slug}
            href={`/${lang}/projects/${project.slug}`}
            className={`block ${isFeature ? "md:col-span-3" : ""}`}
          >
            <div className="mb-3 md:mb-4 flex items-baseline gap-2 text-[12px] tracking-[0.05em] leading-relaxed">
              <span className="text-zinc-900">{project.title[lang]}</span>
              <span className="text-zinc-300" aria-hidden>
                ·
              </span>
              <span className="text-zinc-500">{project.location[lang]}</span>
            </div>

            <div
              className={`bg-zinc-100 overflow-hidden ${
                isFeature ? "aspect-[16/9]" : "aspect-[3/2]"
              }`}
            >
              {project.cover ? (
                <Image
                  src={project.cover.src}
                  alt={project.title[lang]}
                  width={project.cover.width}
                  height={project.cover.height}
                  sizes={
                    isFeature
                      ? "(max-width: 768px) 100vw, 1200px"
                      : "(max-width: 768px) 100vw, 380px"
                  }
                  quality={90}
                  preload={i < 4}
                  className="w-full h-full object-cover block"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-[10px] tracking-[0.25em] uppercase text-zinc-300">
                    coming soon
                  </span>
                </div>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
