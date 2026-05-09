import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { hasLocale, locales } from "@/lib/i18n-config";
import { getDictionary } from "@/lib/dictionaries";
import { ProjectGallery } from "@/components/ProjectGallery";
import {
  getProjects,
  getProjectBySlug,
  getProjectSlugs,
} from "@/sanity/lib/fetchers";
import { ParagraphPortableText } from "@/sanity/lib/portable-text";

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return locales.flatMap((lang) => slugs.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/projects/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  const title = `${project.title[lang]} · so.c_architects`;
  return {
    title,
    description: `${project.title[lang]} (${project.year}), ${project.location[lang]}`,
    openGraph: {
      title,
      images: project.cover ? [project.cover.src] : undefined,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: PageProps<"/[lang]/projects/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const projects = await getProjects();
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx === -1) notFound();
  const project = projects[idx];
  const prevProject = idx > 0 ? projects[idx - 1] : null;
  const nextProject =
    idx < projects.length - 1 ? projects[idx + 1] : null;

  const dict = await getDictionary(lang);

  const meta: { label: string; value: string }[] = [
    { label: "location", value: project.location[lang] },
    { label: "year", value: String(project.year) },
  ];
  if (project.area) meta.push({ label: "area", value: project.area });
  if (project.status)
    meta.push({ label: "status", value: project.status[lang] });
  if (project.collaborator)
    meta.push({ label: "collaborator", value: project.collaborator });

  const descriptionBlocks = project.description?.[lang];

  return (
    <article className="max-w-[1040px] mx-auto px-5 md:px-8 pt-2 md:pt-3 pb-24 md:pb-32 text-zinc-800">
      {project.images.length > 0 ? (
        <div className="mb-14 md:mb-20">
          <ProjectGallery images={project.images} alt={project.title[lang]} />
        </div>
      ) : (
        <p className="mb-14 md:mb-20 text-zinc-400 text-[13px] tracking-[0.2em] uppercase">
          {dict.page.comingSoon}
        </p>
      )}

      <div className="grid md:grid-cols-[1fr_280px] gap-10 md:gap-16 max-w-[1040px]">
        <div className="max-w-[680px]">
          <h1 className="text-[21px] font-bold tracking-[0.01em] mb-6 md:mb-8">
            {project.title[lang]}
          </h1>
          {descriptionBlocks && descriptionBlocks.length > 0 && (
            <div className="space-y-4 text-[13px] leading-[1.85] text-zinc-700">
              <ParagraphPortableText value={descriptionBlocks} />
            </div>
          )}
        </div>

        <dl className="space-y-4 text-[13px] leading-relaxed self-start">
          {meta.map((m) => (
            <div key={m.label}>
              <dt className="text-[11px] tracking-[0.25em] uppercase text-zinc-400 mb-1">
                {m.label}
              </dt>
              <dd>{m.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <nav className="mt-20 md:mt-28 grid grid-cols-3 items-center text-[12px] tracking-[0.2em] uppercase text-zinc-500">
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
