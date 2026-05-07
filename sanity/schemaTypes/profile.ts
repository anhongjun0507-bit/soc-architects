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
      { name: "ko", title: "한국어", type: "array", of: [{ type: "block" }] },
      { name: "en", title: "English", type: "array", of: [{ type: "block" }] },
      { name: "ja", title: "日本語", type: "array", of: [{ type: "block" }] },
    ],
  });

const timelineEntry = {
  type: "object" as const,
  fields: [
    { name: "period", title: "Period", type: "string" as const },
    {
      name: "detail",
      title: "Detail",
      type: "object" as const,
      fields: [
        { name: "ko", title: "한국어", type: "string" as const },
        { name: "en", title: "English", type: "string" as const },
        { name: "ja", title: "日本語", type: "string" as const },
      ],
    },
  ],
  preview: {
    select: { title: "period", subtitle: "detail.ko" },
  },
};

export const profile = defineType({
  name: "profile",
  title: "Profile",
  type: "document",
  fields: [
    localizedBlock("bio", "Bio"),
    localizedString("officeName", "Office name (formal)"),
    defineField({
      name: "founded",
      title: "Founded",
      type: "number",
    }),
    localizedString("fields", "Fields"),
    defineField({
      name: "principal",
      title: "Principal",
      type: "object",
      fields: [
        {
          name: "name",
          title: "Name",
          type: "object",
          fields: [
            { name: "ko", title: "한국어", type: "string" },
            { name: "en", title: "English", type: "string" },
            { name: "ja", title: "日本語", type: "string" },
          ],
        },
        {
          name: "title",
          title: "Title",
          type: "object",
          fields: [
            { name: "ko", title: "한국어", type: "string" },
            { name: "en", title: "English", type: "string" },
            { name: "ja", title: "日本語", type: "string" },
          ],
        },
        {
          name: "education",
          title: "Education",
          type: "array",
          of: [timelineEntry],
        },
        {
          name: "career",
          title: "Career",
          type: "array",
          of: [timelineEntry],
        },
      ],
    }),
    defineField({
      name: "contact",
      title: "Contact",
      type: "object",
      fields: [
        { name: "email", title: "Email", type: "string" },
        { name: "phone", title: "Phone", type: "string" },
        {
          name: "address",
          title: "Address",
          type: "object",
          fields: [
            { name: "ko", title: "한국어", type: "string" },
            { name: "en", title: "English", type: "string" },
            { name: "ja", title: "日本語", type: "string" },
          ],
        },
        { name: "instagram", title: "Instagram URL", type: "url" },
        { name: "instagramHandle", title: "Instagram handle", type: "string" },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Profile" };
    },
  },
});
