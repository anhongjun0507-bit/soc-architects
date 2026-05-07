import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n-config";
import type { Project } from "@/data/projects";

type Indexed = { project: Project; index: number };
type Segment =
  | { kind: "feature"; item: Indexed }
  | { kind: "row"; items: Indexed[] };

function segmentProjects(projects: Project[]): Segment[] {
  const segments: Segment[] = [];
  projects.forEach((project, index) => {
    if (project.priority === "feature") {
      segments.push({ kind: "feature", item: { project, index } });
      return;
    }
    const last = segments[segments.length - 1];
    if (last && last.kind === "row") {
      last.items.push({ project, index });
    } else {
      segments.push({ kind: "row", items: [{ project, index }] });
    }
  });
  return segments;
}

export function ProjectGrid({
  projects,
  lang,
}: {
  projects: Project[];
  lang: Locale;
}) {
  const segments = segmentProjects(projects);
  return (
    <div className="flex flex-col gap-y-12 md:gap-y-16 pt-2 pb-16 md:pb-28">
      {segments.map((seg, i) =>
        seg.kind === "feature" ? (
          <FeatureCard
            key={`f-${seg.item.project.slug}`}
            project={seg.item.project}
            lang={lang}
            preload={seg.item.index < 4}
          />
        ) : (
          <div
            key={`r-${i}`}
            className="grid grid-cols-1 md:grid-cols-3 gap-x-5 md:gap-x-6 gap-y-12 md:gap-y-16 px-5 md:px-10 w-full"
          >
            {seg.items.map(({ project, index }) => (
              <RegularCard
                key={project.slug}
                project={project}
                lang={lang}
                preload={index < 4}
              />
            ))}
          </div>
        ),
      )}
    </div>
  );
}

function ProjectCaption({
  project,
  lang,
  className = "",
}: {
  project: Project;
  lang: Locale;
  className?: string;
}) {
  return (
    <div
      className={`flex items-baseline gap-2 text-[13px] tracking-[0.05em] leading-relaxed ${className}`}
    >
      <span className="text-zinc-900">{project.title[lang]}</span>
      <span className="text-zinc-300" aria-hidden>
        ·
      </span>
      <span className="text-zinc-500">{project.location[lang]}</span>
    </div>
  );
}

function RegularCard({
  project,
  lang,
  preload,
}: {
  project: Project;
  lang: Locale;
  preload: boolean;
}) {
  return (
    <Link href={`/${lang}/projects/${project.slug}`} className="block">
      <ProjectCaption
        project={project}
        lang={lang}
        className="mb-3 md:mb-4"
      />
      <div className="bg-zinc-100 overflow-hidden aspect-[3/2]">
        {project.cover ? (
          <Image
            src={project.cover.src}
            alt={project.title[lang]}
            width={project.cover.width}
            height={project.cover.height}
            sizes="(max-width: 768px) 100vw, 380px"
            quality={90}
            preload={preload}
            className="w-full h-full object-cover block"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-[11px] tracking-[0.25em] uppercase text-zinc-300">
              coming soon
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}

function FeatureCard({
  project,
  lang,
  preload,
}: {
  project: Project;
  lang: Locale;
  preload: boolean;
}) {
  return (
    <Link
      href={`/${lang}/projects/${project.slug}`}
      className="block w-full"
    >
      <ProjectCaption
        project={project}
        lang={lang}
        className="px-5 md:px-10 mb-3 md:mb-4"
      />
      <div className="relative bg-zinc-100 overflow-hidden w-full h-[70svh] md:h-[calc(100svh-100px)]">
        {project.cover ? (
          <Image
            src={project.cover.src}
            alt={project.title[lang]}
            fill
            sizes="100vw"
            quality={90}
            priority={preload}
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[11px] tracking-[0.25em] uppercase text-zinc-300">
              coming soon
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
