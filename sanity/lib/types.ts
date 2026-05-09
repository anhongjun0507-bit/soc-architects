import type { PortableTextBlock } from "@portabletext/react";

export type Localized = { ko: string; en: string; ja: string };
export type LocalizedPartial = { ko?: string; en?: string; ja?: string };

export type LocalizedBlocks = {
  ko?: PortableTextBlock[];
  en?: PortableTextBlock[];
  ja?: PortableTextBlock[];
};

export type SanityImageMeta = {
  asset: {
    url: string;
    metadata?: {
      dimensions?: { width: number; height: number; aspectRatio: number };
    };
  };
  alt?: string;
};

export type ProjectCategory = "residential" | "public" | "commercial" | "art";

export type SanityProject = {
  _id: string;
  title: Localized;
  slug: string;
  order: number;
  location: Localized;
  year: number;
  category: ProjectCategory;
  featured: boolean;
  mainImage?: SanityImageMeta | null;
  gallery?: SanityImageMeta[] | null;
  description?: LocalizedBlocks | null;
  status?: Localized | null;
  area?: string | null;
  collaborator?: string | null;
};

export type ProjectImage = {
  src: string;
  width: number;
  height: number;
  alt?: string;
};

export type Project = {
  slug: string;
  year: number;
  category: ProjectCategory;
  featured: boolean;
  title: Localized;
  location: Localized;
  status?: Localized;
  area?: string;
  collaborator?: string;
  cover?: ProjectImage;
  images: ProjectImage[];
  description?: LocalizedBlocks;
};

export type NewsCategory =
  | "practice"
  | "education"
  | "project"
  | "talk"
  | "commission";

export type SanityNewsPost = {
  _id: string;
  title: Localized;
  slug: string;
  date: string;
  category: NewsCategory;
  excerpt?: LocalizedPartial | null;
  body?: LocalizedBlocks | null;
  cover?: SanityImageMeta | null;
  images?: SanityImageMeta[] | null;
  externalLink?: string | null;
};

export type NewsPost = {
  slug: string;
  title: Localized;
  date: string;
  category: NewsCategory;
  excerpt?: LocalizedPartial;
  body?: LocalizedBlocks;
  cover?: ProjectImage;
  images: ProjectImage[];
  externalLink?: string;
};

export type SanityProfile = {
  bio?: LocalizedBlocks | null;
  officeName?: Localized | null;
  founded?: number | null;
  fields?: Localized | null;
  principal?: {
    name?: Localized | null;
    title?: Localized | null;
    education?: { period: string; detail: Localized; _key?: string }[] | null;
    career?: { period: string; detail: Localized; _key?: string }[] | null;
  } | null;
  contact?: {
    email?: string | null;
    phone?: string | null;
    address?: Localized | null;
    instagram?: string | null;
    instagramHandle?: string | null;
  } | null;
};

export type SanitySiteSettings = {
  siteTitle?: string | null;
  description?: string | null;
  instagram?: string | null;
  defaultLocale?: "ko" | "en" | "ja" | null;
};
