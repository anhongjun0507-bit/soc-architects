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
    <div className="flex flex-col gap-[6px] md:gap-[14px] max-w-[1400px] mx-auto py-12 md:py-16">
      {projects.map((project) => (
        <Link
          key={project.slug}
          href={`/${lang}/projects/${project.slug}`}
          className="block"
        >
          <Image
            src={project.cover.src}
            alt={project.title[lang]}
            width={project.cover.width}
            height={project.cover.height}
            sizes="(max-width: 1400px) 100vw, 1400px"
            className="w-full h-auto block"
          />
        </Link>
      ))}
    </div>
  );
}
