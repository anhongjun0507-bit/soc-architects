import { sanityClient } from "./client";
import {
  projectsQuery,
  projectBySlugQuery,
  projectSlugsQuery,
  newsListQuery,
  newsBySlugQuery,
  newsSlugsQuery,
  profileQuery,
  siteSettingsQuery,
} from "./queries";
import type {
  SanityProject,
  SanityNewsPost,
  SanityProfile,
  SanitySiteSettings,
  Project,
  NewsPost,
  ProjectImage,
  SanityImageMeta,
} from "./types";

const FETCH_OPTS = { next: { revalidate: 60 } };

function toProjectImage(img: SanityImageMeta | null | undefined): ProjectImage | undefined {
  if (!img?.asset?.url || !img.asset.metadata?.dimensions) return undefined;
  const { url } = img.asset;
  const { width, height } = img.asset.metadata.dimensions;
  return {
    src: url,
    width,
    height,
    alt: img.alt,
  };
}

function normalizeProject(p: SanityProject): Project {
  const cover = toProjectImage(p.mainImage);
  const gallery = (p.gallery ?? [])
    .map(toProjectImage)
    .filter((img): img is ProjectImage => Boolean(img));

  return {
    slug: p.slug,
    year: p.year,
    category: p.category,
    featured: Boolean(p.featured),
    title: p.title,
    location: p.location,
    status: p.status ?? undefined,
    area: p.area ?? undefined,
    collaborator: p.collaborator ?? undefined,
    cover,
    images: gallery,
    description: p.description ?? undefined,
  };
}

function normalizeNews(p: SanityNewsPost): NewsPost {
  const cover = toProjectImage(p.cover);
  const images = (p.images ?? [])
    .map(toProjectImage)
    .filter((img): img is ProjectImage => Boolean(img));

  return {
    slug: p.slug,
    title: p.title,
    date: p.date,
    category: p.category,
    excerpt: p.excerpt ?? undefined,
    body: p.body ?? undefined,
    cover,
    images,
    externalLink: p.externalLink ?? undefined,
  };
}

export async function getProjects(): Promise<Project[]> {
  const data = await sanityClient.fetch<SanityProject[]>(projectsQuery, {}, FETCH_OPTS);
  return data.map(normalizeProject);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const data = await sanityClient.fetch<SanityProject | null>(
    projectBySlugQuery,
    { slug },
    FETCH_OPTS,
  );
  return data ? normalizeProject(data) : null;
}

export async function getProjectSlugs(): Promise<string[]> {
  const data = await sanityClient.fetch<{ slug: string }[]>(
    projectSlugsQuery,
    {},
    FETCH_OPTS,
  );
  return data.map((d) => d.slug);
}

export async function getNews(): Promise<NewsPost[]> {
  const data = await sanityClient.fetch<SanityNewsPost[]>(
    newsListQuery,
    {},
    FETCH_OPTS,
  );
  return data.map(normalizeNews);
}

export async function getNewsBySlug(slug: string): Promise<NewsPost | null> {
  const data = await sanityClient.fetch<SanityNewsPost | null>(
    newsBySlugQuery,
    { slug },
    FETCH_OPTS,
  );
  return data ? normalizeNews(data) : null;
}

export async function getNewsSlugs(): Promise<string[]> {
  const data = await sanityClient.fetch<{ slug: string }[]>(
    newsSlugsQuery,
    {},
    FETCH_OPTS,
  );
  return data.map((d) => d.slug);
}

export async function getProfile(): Promise<SanityProfile | null> {
  return sanityClient.fetch<SanityProfile | null>(profileQuery, {}, FETCH_OPTS);
}

export async function getSiteSettings(): Promise<SanitySiteSettings | null> {
  return sanityClient.fetch<SanitySiteSettings | null>(
    siteSettingsQuery,
    {},
    FETCH_OPTS,
  );
}
