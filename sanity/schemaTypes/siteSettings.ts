import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "siteTitle",
      title: "Site title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "instagram",
      title: "Instagram URL",
      type: "url",
    }),
    defineField({
      name: "defaultLocale",
      title: "Default locale",
      type: "string",
      options: {
        list: [
          { title: "한국어", value: "ko" },
          { title: "English", value: "en" },
          { title: "日本語", value: "ja" },
        ],
        layout: "radio",
      },
      initialValue: "ko",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site settings" };
    },
  },
});
