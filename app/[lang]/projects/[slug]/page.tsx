import { notFound } from "next/navigation";
import Link from "next/link";
import { hasLocale, locales } from "@/lib/i18n-config";
import { getDictionary } from "@/lib/dictionaries";
import { projects } from "@/data/projects";
import { ProjectGallery } from "@/components/ProjectGallery";

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    projects.map((p) => ({ lang, slug: p.slug })),
  );
}

export default async function ProjectDetailPage({
  params,
}: PageProps<"/[lang]/projects/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx === -1) notFound();
  const project = projects[idx];
  const prevProject = idx > 0 ? projects[idx - 1] : null;
  const nextProject = idx < projects.length - 1 ? projects[idx + 1] : null;

  const dict = await getDictionary(lang);

  const meta: { label: string; value: string }[] = [
    { label: "location", value: project.location[lang] },
    { label: "year", value: String(project.year) },
  ];
  if (project.area) meta.push({ label: "area", value: project.area });
  if (project.status) meta.push({ label: "status", value: project.status[lang] });
  if (project.collaborator)
    meta.push({ label: "collaborator", value: project.collaborator });

  return (
    <article className="max-w-[1040px] mx-auto px-5 md:px-8 pt-2 md:pt-3 pb-24 md:pb-32 text-zinc-800">
      {project.images.length > 0 ? (
        <div className="mb-14 md:mb-20">
          <ProjectGallery images={project.images} alt={project.title[lang]} />
        </div>
      ) : (
        <p className="mb-14 md:mb-20 text-zinc-400 text-[12px] tracking-[0.2em] uppercase">
          {dict.page.comingSoon}
        </p>
      )}

      <div className="grid md:grid-cols-[1fr_280px] gap-10 md:gap-16 max-w-[1040px]">
        <div className="max-w-[680px]">
          <h1 className="text-[22px] md:text-[26px] font-light tracking-[0.01em] mb-6 md:mb-8">
            {project.title[lang]}
          </h1>
          {project.description && (
            <div className="space-y-4 text-[14.5px] leading-[1.85] text-zinc-700">
              {project.description[lang].map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          )}
        </div>

        <dl className="space-y-4 text-[13px] leading-relaxed self-start">
          {meta.map((m) => (
            <div key={m.label}>
              <dt className="text-[10px] tracking-[0.25em] uppercase text-zinc-400 mb-1">
                {m.label}
              </dt>
              <dd>{m.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <nav className="mt-20 md:mt-28 grid grid-cols-3 items-center text-[11px] tracking-[0.2em] uppercase text-zinc-500">
        {prevProject ? (
          <Link
            href={`/${lang}/projects/${prevProject.slug}`}
            className="hover:text-black transition-colors justify-self-start truncate"
          >
            ← {prevProject.title[lang]}
          </Link>
        ) : (
          <span />
        )}
        <Link
          href={`/${lang}`}
          className="hover:text-black transition-colors justify-self-center"
        >
          projects
        </Link>
        {nextProject ? (
          <Link
            href={`/${lang}/projects/${nextProject.slug}`}
            className="hover:text-black transition-colors justify-self-end truncate"
          >
            {nextProject.title[lang]} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
