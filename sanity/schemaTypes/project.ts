import { defineField, defineType } from "sanity";

const localizedString = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      { name: "ko", title: "한국어", type: "string" },
      { name: "en", title: "English", type: "string" },
      { name: "ja", title: "日本語", type: "string" },
    ],
  });

const localizedBlock = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      {
        name: "ko",
        title: "한국어",
        type: "array",
        of: [{ type: "block" }],
      },
      {
        name: "en",
        title: "English",
        type: "array",
        of: [{ type: "block" }],
      },
      {
        name: "ja",
        title: "日本語",
        type: "array",
        of: [{ type: "block" }],
      },
    ],
  });

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    localizedString("title", "Title"),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title.en", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Order (lower = first)",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    localizedString("location", "Location"),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      validation: (rule) => rule.min(1900).max(2100),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Residential", value: "residential" },
          { title: "Public", value: "public" },
          { title: "Commercial", value: "commercial" },
          { title: "Art", value: "art" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", title: "Alt text", type: "string" },
          ],
        },
      ],
      options: { layout: "grid" },
    }),
    localizedString("status", "Status"),
    defineField({
      name: "area",
      title: "Area",
      type: "string",
    }),
    defineField({
      name: "collaborator",
      title: "Collaborator",
      type: "string",
    }),
    localizedBlock("description", "Description"),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: "Order (asc)",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title.ko",
      subtitle: "location.ko",
      media: "mainImage",
      order: "order",
    },
    prepare({ title, subtitle, media, order }) {
      return {
        title: `${order ?? "?"}. ${title ?? "(no title)"}`,
        subtitle: subtitle ?? "",
        media,
      };
    },
  },
});
