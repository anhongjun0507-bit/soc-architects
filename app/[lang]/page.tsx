import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectGrid } from "@/components/ProjectGrid";
import { projects } from "@/data/projects";
import { hasLocale } from "@/lib/i18n-config";

export const metadata: Metadata = {
  title: "so.c_architects",
  description:
    "Architecture, interior design, urban design, public art. Founded by Jungho So in Seoul.",
};

export default async function HomePage({
  params,
}: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <ProjectGrid projects={projects} lang={lang} />;
}
