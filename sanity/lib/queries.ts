import { groq } from "next-sanity";

const imageMeta = `{
  "asset": asset->{
    url,
    metadata { dimensions }
  },
  alt
}`;

export const projectsQuery = groq`
  *[_type == "project"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    order,
    location,
    year,
    category,
    featured,
    status,
    area,
    collaborator,
    mainImage ${imageMeta},
    gallery[] ${imageMeta},
    description
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    order,
    location,
    year,
    category,
    featured,
    status,
    area,
    collaborator,
    mainImage ${imageMeta},
    gallery[] ${imageMeta},
    description
  }
`;

export const projectSlugsQuery = groq`
  *[_type == "project" && defined(slug.current)] | order(order asc) {
    "slug": slug.current
  }
`;

export const newsListQuery = groq`
  *[_type == "news"] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    date,
    category,
    excerpt,
    body,
    cover ${imageMeta},
    images[] ${imageMeta},
    externalLink
  }
`;

export const profileQuery = groq`
  *[_type == "profile"][0] {
    bio,
    officeName,
    founded,
    fields,
    principal {
      name,
      title,
      education[] { _key, period, detail },
      career[] { _key, period, detail }
    },
    contact
  }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteTitle,
    description,
    instagram,
    defaultLocale
  }
`;
