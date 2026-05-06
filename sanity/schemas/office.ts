import { defineField, defineType } from "sanity";

export const office = defineType({
  name: "office",
  title: "사무소 정보 (싱글톤)",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "사무소명",
      type: "object",
      fields: [
        { name: "ko", title: "한국어", type: "string" },
        { name: "ja", title: "일본어", type: "string" },
        { name: "en", title: "영어", type: "string" },
      ],
    }),
    defineField({
      name: "founded",
      title: "설립 연도",
      type: "number",
    }),
    defineField({
      name: "fields",
      title: "분야 (한 줄)",
      type: "object",
      fields: [
        { name: "ko", title: "한국어", type: "string" },
        { name: "ja", title: "일본어", type: "string" },
        { name: "en", title: "영어", type: "string" },
      ],
    }),
    defineField({
      name: "address",
      title: "주소",
      type: "object",
      fields: [
        { name: "ko", title: "한국어", type: "string" },
        { name: "ja", title: "일본어", type: "string" },
        { name: "en", title: "영어", type: "string" },
      ],
    }),
    defineField({
      name: "description",
      title: "사무소 소개 (Profile 페이지)",
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
    defineField({
      name: "principal",
      title: "대표 건축가",
      type: "object",
      fields: [
        {
          name: "name",
          title: "이름",
          type: "object",
          fields: [
            { name: "ko", title: "한국어", type: "string" },
            { name: "ja", title: "일본어", type: "string" },
            { name: "en", title: "영어", type: "string" },
          ],
        },
        {
          name: "title",
          title: "직함",
          type: "object",
          fields: [
            { name: "ko", title: "한국어", type: "string" },
            { name: "ja", title: "일본어", type: "string" },
            { name: "en", title: "영어", type: "string" },
          ],
        },
        {
          name: "education",
          title: "학력",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "period", title: "기간", type: "string" },
                {
                  name: "detail",
                  title: "내용",
                  type: "object",
                  fields: [
                    { name: "ko", title: "한국어", type: "string" },
                    { name: "ja", title: "일본어", type: "string" },
                    { name: "en", title: "영어", type: "string" },
                  ],
                },
              ],
              preview: {
                select: { title: "period", subtitle: "detail.ko" },
              },
            },
          ],
        },
        {
          name: "career",
          title: "경력",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "period", title: "기간", type: "string" },
                {
                  name: "detail",
                  title: "내용",
                  type: "object",
                  fields: [
                    { name: "ko", title: "한국어", type: "string" },
                    { name: "ja", title: "일본어", type: "string" },
                    { name: "en", title: "영어", type: "string" },
                  ],
                },
              ],
              preview: {
                select: { title: "period", subtitle: "detail.ko" },
              },
            },
          ],
        },
      ],
    }),
    defineField({
      name: "contact",
      title: "연락처",
      type: "object",
      fields: [
        { name: "email", title: "이메일", type: "string" },
        { name: "phone", title: "전화", type: "string" },
        {
          name: "instagram",
          title: "Instagram URL",
          type: "url",
        },
        {
          name: "instagramHandle",
          title: "Instagram 핸들 (예: @so.c_architects)",
          type: "string",
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "사무소 정보" };
    },
  },
});
