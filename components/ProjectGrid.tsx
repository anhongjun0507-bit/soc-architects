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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-10 gap-y-14 md:gap-y-20 max-w-[1240px] mx-auto px-5 md:px-10 pt-2 md:pt-2 pb-16 md:pb-28">
      {projects.map((project, i) => {
        const cardImages = project.images.slice(0, 2);
        return (
          <Link
            key={project.slug}
            href={`/${lang}/projects/${project.slug}`}
            className="block group"
          >
            <div className="mb-3 md:mb-4 flex items-baseline gap-2 text-[12px] tracking-[0.05em] leading-relaxed">
              <span className="text-zinc-900">{project.title[lang]}</span>
              <span className="text-zinc-300" aria-hidden>
                ·
              </span>
              <span className="text-zinc-500">{project.location[lang]}</span>
            </div>

            {cardImages.length > 0 ? (
              <div className="space-y-2 md:space-y-3">
                {cardImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="bg-zinc-100 overflow-hidden"
                  >
                    <Image
                      src={img.src}
                      alt={`${project.title[lang]} ${idx + 1}`}
                      width={img.width}
                      height={img.height}
                      sizes="(max-width: 768px) 100vw, 600px"
                      quality={90}
                      preload={i < 4}
                      className="w-full h-auto block"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="aspect-[3/2] bg-zinc-100 flex items-center justify-center">
                <span className="text-[10px] tracking-[0.25em] uppercase text-zinc-300">
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
