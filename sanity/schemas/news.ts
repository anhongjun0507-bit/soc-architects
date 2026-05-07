import { defineField, defineType } from "sanity";

export const news = defineType({
  name: "news",
  title: "소식 (News)",
  type: "document",
  fields: [
    defineField({
      name: "publishedAt",
      title: "발행일",
      type: "date",
      validation: (rule) => rule.required(),
      initialValue: () => new Date().toISOString().slice(0, 10),
    }),
    defineField({
      name: "title",
      title: "제목",
      type: "object",
      fields: [
        { name: "ko", title: "한국어", type: "string" },
        { name: "en", title: "영어", type: "string" },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "본문 (선택)",
      description: "한 두 문장 또는 짧은 문단을 입력하세요.",
      type: "object",
      fields: [
        { name: "ko", title: "한국어", type: "text", rows: 6 },
        { name: "en", title: "영어", type: "text", rows: 6 },
      ],
    }),
    defineField({
      name: "cover",
      title: "대표 이미지 (선택)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "images",
      title: "추가 이미지 (선택)",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", title: "Alt 텍스트 (선택)", type: "string" },
          ],
        },
      ],
      options: { layout: "grid" },
    }),
    defineField({
      name: "externalLink",
      title: "외부 링크 (선택)",
      description: "예: 기사·매체·SNS URL",
      type: "url",
    }),
  ],
  orderings: [
    {
      title: "발행일 (최신순)",
      name: "publishedDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title.ko",
      subtitle: "publishedAt",
      media: "cover",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title ?? "(제목 없음)",
        subtitle: subtitle ?? "",
        media,
      };
    },
  },
});
