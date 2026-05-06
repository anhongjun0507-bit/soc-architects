import type { Locale } from "@/lib/i18n-config";

export type LocalizedString = Record<Locale, string>;

export type ProjectType =
  | "architecture"
  | "interior"
  | "urban"
  | "public-art";

export type ProjectImage = {
  src: string;
  width: number;
  height: number;
};

export type Project = {
  slug: string;
  year: number;
  type: ProjectType;
  title: LocalizedString;
  location: LocalizedString;
  cover: ProjectImage;
  images: ProjectImage[];
  description: LocalizedString;
};

const ph = (seed: string, w: number, h: number): ProjectImage => ({
  src: `https://picsum.photos/seed/${seed}/${w}/${h}`,
  width: w,
  height: h,
});

export const projects: Project[] = [
  {
    slug: "gwanak-house",
    year: 2024,
    type: "architecture",
    title: { ko: "관악 주택", ja: "冠岳の家", en: "Gwanak House" },
    location: { ko: "서울, 관악", ja: "ソウル, 冠岳", en: "Seoul, Gwanak" },
    cover: ph("soc-gwanak-house", 1200, 900),
    images: [ph("soc-gwanak-house-1", 1600, 1200)],
    description: {
      ko: "더미 설명입니다.",
      ja: "ダミー説明です。",
      en: "Placeholder description.",
    },
  },
  {
    slug: "yangpyeong-studio",
    year: 2023,
    type: "architecture",
    title: { ko: "양평 스튜디오", ja: "楊平スタジオ", en: "Yangpyeong Studio" },
    location: { ko: "경기, 양평", ja: "京畿, 楊平", en: "Gyeonggi, Yangpyeong" },
    cover: ph("soc-yangpyeong", 1200, 1500),
    images: [ph("soc-yangpyeong-1", 1600, 2000)],
    description: {
      ko: "더미 설명입니다.",
      ja: "ダミー説明です。",
      en: "Placeholder description.",
    },
  },
  {
    slug: "seochon-cafe",
    year: 2023,
    type: "interior",
    title: { ko: "서촌 카페", ja: "西村カフェ", en: "Seochon Cafe" },
    location: { ko: "서울, 종로", ja: "ソウル, 鍾路", en: "Seoul, Jongno" },
    cover: ph("soc-seochon", 1200, 800),
    images: [ph("soc-seochon-1", 1600, 1067)],
    description: {
      ko: "더미 설명입니다.",
      ja: "ダミー説明です。",
      en: "Placeholder description.",
    },
  },
  {
    slug: "han-river-pavilion",
    year: 2023,
    type: "public-art",
    title: { ko: "한강 파빌리온", ja: "漢江パビリオン", en: "Han River Pavilion" },
    location: { ko: "서울, 영등포", ja: "ソウル, 永登浦", en: "Seoul, Yeongdeungpo" },
    cover: ph("soc-hanriver", 1200, 600),
    images: [ph("soc-hanriver-1", 1600, 800)],
    description: {
      ko: "더미 설명입니다.",
      ja: "ダミー説明です。",
      en: "Placeholder description.",
    },
  },
  {
    slug: "donui-house",
    year: 2022,
    type: "architecture",
    title: { ko: "돈의 주택", ja: "敦義の家", en: "Donui House" },
    location: { ko: "서울, 종로", ja: "ソウル, 鍾路", en: "Seoul, Jongno" },
    cover: ph("soc-donui", 1200, 1200),
    images: [ph("soc-donui-1", 1600, 1600)],
    description: {
      ko: "더미 설명입니다.",
      ja: "ダミー説明です。",
      en: "Placeholder description.",
    },
  },
  {
    slug: "songdo-block",
    year: 2022,
    type: "urban",
    title: { ko: "송도 블록", ja: "松島ブロック", en: "Songdo Block" },
    location: { ko: "인천, 송도", ja: "仁川, 松島", en: "Incheon, Songdo" },
    cover: ph("soc-songdo", 1200, 1500),
    images: [ph("soc-songdo-1", 1600, 2000)],
    description: {
      ko: "더미 설명입니다.",
      ja: "ダミー説明です。",
      en: "Placeholder description.",
    },
  },
  {
    slug: "buam-residence",
    year: 2022,
    type: "architecture",
    title: { ko: "부암 레지던스", ja: "付岩レジデンス", en: "Buam Residence" },
    location: { ko: "서울, 종로", ja: "ソウル, 鍾路", en: "Seoul, Jongno" },
    cover: ph("soc-buam", 1200, 900),
    images: [ph("soc-buam-1", 1600, 1200)],
    description: {
      ko: "더미 설명입니다.",
      ja: "ダミー説明です。",
      en: "Placeholder description.",
    },
  },
  {
    slug: "garosu-shop",
    year: 2021,
    type: "interior",
    title: { ko: "가로수길 숍", ja: "並木道ショップ", en: "Garosu-gil Shop" },
    location: { ko: "서울, 강남", ja: "ソウル, 江南", en: "Seoul, Gangnam" },
    cover: ph("soc-garosu", 1200, 800),
    images: [ph("soc-garosu-1", 1600, 1067)],
    description: {
      ko: "더미 설명입니다.",
      ja: "ダミー説明です。",
      en: "Placeholder description.",
    },
  },
  {
    slug: "tonbori-courtyard",
    year: 2021,
    type: "architecture",
    title: { ko: "도톤보리 중정", ja: "道頓堀の中庭", en: "Dotonbori Courtyard" },
    location: { ko: "오사카", ja: "大阪", en: "Osaka" },
    cover: ph("soc-tonbori", 1200, 1400),
    images: [ph("soc-tonbori-1", 1600, 1867)],
    description: {
      ko: "더미 설명입니다.",
      ja: "ダミー説明です。",
      en: "Placeholder description.",
    },
  },
];
