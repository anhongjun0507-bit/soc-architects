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
    <div className="flex flex-col gap-y-16 md:gap-y-20 pt-2 pb-20 md:pb-32">
      {segments.map((seg, i) =>
        seg.kind === "feature" ? (
          <FeatureCard
            key={`f-${seg.item.project.slug}`}
            project={seg.item.project}
            lang={lang}
            priority={seg.item.index < 4}
          />
        ) : (
          <div
            key={`r-${i}`}
            className="grid grid-cols-1 md:grid-cols-3 gap-x-6 md:gap-x-8 gap-y-20 md:gap-y-24 px-6 w-full"
          >
            {seg.items.map(({ project, index }) => (
              <RegularCard
                key={project.slug}
                project={project}
                lang={lang}
                priority={index < 4}
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
    <div className={`leading-snug ${className}`}>
      <div className="text-[14px] md:text-[15px] tracking-[0.04em] text-zinc-900">
        {project.title[lang]}
      </div>
      <div className="text-[12px] tracking-[0.04em] text-zinc-500 mt-1">
        {project.location[lang]}
      </div>
    </div>
  );
}

function RegularCard({
  project,
  lang,
  priority,
}: {
  project: Project;
  lang: Locale;
  priority: boolean;
}) {
  return (
    <Link href={`/${lang}/projects/${project.slug}`} className="block">
      <ProjectCaption project={project} lang={lang} className="mb-3 md:mb-4" />
      <div className="bg-zinc-100 overflow-hidden aspect-[3/4]">
        {project.cover ? (
          <Image
            src={project.cover.src}
            alt={project.title[lang]}
            width={project.cover.width}
            height={project.cover.height}
            sizes="(max-width: 768px) 100vw, 33vw"
            quality={90}
            priority={priority}
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
  priority,
}: {
  project: Project;
  lang: Locale;
  priority: boolean;
}) {
  return (
    <Link
      href={`/${lang}/projects/${project.slug}`}
      className="block w-full px-6"
    >
      <ProjectCaption project={project} lang={lang} className="mb-3 md:mb-4" />
      <div className="relative bg-zinc-100 overflow-hidden w-full aspect-[5/2] max-h-[70vh]">
        {project.cover ? (
          <Image
            src={project.cover.src}
            alt={project.title[lang]}
            fill
            sizes="(max-width: 768px) 100vw, calc(100vw - 48px)"
            quality={90}
            priority={priority}
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
