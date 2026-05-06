import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "프로젝트",
  type: "document",
  fields: [
    defineField({
      name: "order",
      title: "노출 순서 (작은 숫자가 위로)",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "priority",
      title: "위계",
      type: "string",
      options: {
        list: [
          { title: "Feature (한 줄 풀폭)", value: "feature" },
          { title: "Small (3개 한 줄)", value: "small" },
        ],
        layout: "radio",
      },
      initialValue: "small",
    }),
    defineField({
      name: "slug",
      title: "URL 식별자 (영문, 변경하지 마세요)",
      type: "slug",
      options: { source: "title.en", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "프로젝트명",
      type: "object",
      fields: [
        { name: "ko", title: "한국어", type: "string" },
        { name: "ja", title: "일본어", type: "string" },
        { name: "en", title: "영어", type: "string" },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "위치",
      type: "object",
      fields: [
        { name: "ko", title: "한국어", type: "string" },
        { name: "ja", title: "일본어", type: "string" },
        { name: "en", title: "영어", type: "string" },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "year",
      title: "연도",
      type: "number",
      validation: (rule) => rule.required().min(1900).max(2100),
    }),
    defineField({
      name: "type",
      title: "분야",
      type: "string",
      options: {
        list: [
          { title: "건축", value: "architecture" },
          { title: "인테리어", value: "interior" },
          { title: "도시설계", value: "urban" },
          { title: "공공미술", value: "public-art" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "status",
      title: "상태",
      type: "object",
      fields: [
        { name: "ko", title: "한국어", type: "string" },
        { name: "ja", title: "일본어", type: "string" },
        { name: "en", title: "영어", type: "string" },
      ],
    }),
    defineField({
      name: "area",
      title: "면적",
      type: "string",
    }),
    defineField({
      name: "collaborator",
      title: "협업자",
      type: "string",
    }),
    defineField({
      name: "cover",
      title: "대표 사진 (메인 그리드 노출)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "images",
      title: "프로젝트 사진들 (디테일 페이지 갤러리)",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              title: "Alt 텍스트 (선택)",
              type: "string",
            },
          ],
        },
      ],
      options: { layout: "grid" },
    }),
    defineField({
      name: "description",
      title: "설명문 (선택)",
      type: "object",
      fields: [
        {
          name: "ko",
          title: "한국어",
          type: "array",
          of: [{ type: "block", styles: [{ title: "Normal", value: "normal" }] }],
        },
        {
          name: "ja",
          title: "일본어",
          type: "array",
          of: [{ type: "block", styles: [{ title: "Normal", value: "normal" }] }],
        },
        {
          name: "en",
          title: "영어",
          type: "array",
          of: [{ type: "block", styles: [{ title: "Normal", value: "normal" }] }],
        },
      ],
    }),
  ],
  orderings: [
    {
      title: "노출 순서",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title.ko",
      subtitle: "location.ko",
      media: "cover",
      order: "order",
      priority: "priority",
    },
    prepare({ title, subtitle, media, order, priority }) {
      return {
        title: `${order ?? "?"}. ${title ?? "(제목 없음)"}`,
        subtitle: `${subtitle ?? ""} ${priority === "feature" ? "· FEATURE" : ""}`,
        media,
      };
    },
  },
});
