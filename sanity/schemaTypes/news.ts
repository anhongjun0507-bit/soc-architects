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

const localizedText = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      { name: "ko", title: "한국어", type: "text", rows: 3 },
      { name: "en", title: "English", type: "text", rows: 3 },
      { name: "ja", title: "日本語", type: "text", rows: 3 },
    ],
  });

const localizedBlock = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      { name: "ko", title: "한국어", type: "array", of: [{ type: "block" }] },
      { name: "en", title: "English", type: "array", of: [{ type: "block" }] },
      { name: "ja", title: "日本語", type: "array", of: [{ type: "block" }] },
    ],
  });

export const news = defineType({
  name: "news",
  title: "News",
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
      name: "date",
      title: "Date",
      type: "date",
      validation: (rule) => rule.required(),
      initialValue: () => new Date().toISOString().slice(0, 10),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Practice", value: "practice" },
          { title: "Education", value: "education" },
          { title: "Project", value: "project" },
          { title: "Talk", value: "talk" },
          { title: "Commission", value: "commission" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    localizedText("excerpt", "Excerpt"),
    localizedBlock("body", "Body"),
    defineField({
      name: "cover",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "images",
      title: "Additional images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", title: "Alt text", type: "string" }],
        },
      ],
      options: { layout: "grid" },
    }),
    defineField({
      name: "externalLink",
      title: "External link",
      type: "url",
    }),
  ],
  orderings: [
    {
      title: "Date (newest)",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title.ko",
      subtitle: "date",
      media: "cover",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title ?? "(no title)",
        subtitle: subtitle ?? "",
        media,
      };
    },
  },
});
