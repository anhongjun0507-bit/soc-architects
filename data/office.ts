import type { Locale } from "@/lib/i18n-config";

export type LocalizedString = Record<Locale, string> & { ja?: string };
export type LocalizedParas = Record<Locale, string[]> & { ja?: string[] };

export const office = {
  name: {
    ko: "에스오씨건축사사무소",
    ja: "エスオーシー建築士事務所",
    en: "so.c_architects",
  } as LocalizedString,
  brand: "so.c_architects",
  founded: 2025,
  fields: {
    ko: "건축설계 ｜ 인테리어 ｜ 도시설계 ｜ 공공미술",
    ja: "建築設計 ｜ インテリア ｜ 都市設計 ｜ パブリックアート",
    en: "architecture ｜ interior design ｜ urban design ｜ public art",
  } as LocalizedString,
  address: {
    ko: "서울특별시 관악구 남부순환로 1895",
    ja: "ソウル特別市 冠岳区 南部循環路 1895",
    en: "1895, Nambusunhwan-ro, Gwanak-gu, Seoul, Republic of Korea",
  } as LocalizedString,
  description: {
    ko: [
      "so.c architects는 소정호 건축가가 설립한 건축사무소로, 건축에서 자연 재료가 지닌 잠재력을 폭넓게 탐구하며 ‘숨 쉬는 건축’을 추구합니다.",
      "건축과 도시를 살아 있는 생태계로 이해하며, 만들고 시험하고 지속적으로 관여하는 ‘제작자(producer)’로서의 건축가의 역할을 모색합니다.",
      "건축 · 도시설계 · 공공미술을 가로지르는 작업은 재료, 과정, 균형에 뿌리내린 직접적 접근을 보여줍니다.",
    ],
    ja: [
      "so.c architects は、ソ・ジョンホ建築家により設立された建築事務所であり、建築における自然素材の可能性を最大限に引き出し、「呼吸する建築」を追求しています。",
      "建築と都市を生きた生態系として捉え、つくり・試し・関わり続ける「プロデューサー」としての建築家のあり方を模索します。",
      "建築・都市デザイン・パブリックアートにわたる活動は、素材・プロセス・バランスに根ざしたハンズオンのアプローチを反映しています。",
    ],
    en: [
      "so.c architects, founded by Jungho So, pursues breathable architecture through the full potential of natural materials in construction.",
      "Understanding architecture and cities as living ecosystems, the practice explores the architect as a “producer” through making, testing, and continuous engagement.",
      "Across architecture, urban design, and public art, the work reflects a hands-on approach grounded in material, process, and balance.",
    ],
  } as LocalizedParas,
};

export const principal = {
  name: {
    ko: "소정호 (蘇廷鎬)",
    ja: "ソ・ジョンホ (蘇廷鎬)",
    en: "Jungho So",
  } as LocalizedString,
  title: {
    ko: "대표건축사 / 소장",
    ja: "代表建築士 / 所長",
    en: "Principal Architect / Founder",
  } as LocalizedString,
  education: [
    {
      period: "2011 – 2018",
      detail: {
        ko: "한밭대학교 건축학 학사",
        ja: "ハンバット大学 建築学 学士",
        en: "BA, Architecture, Hanbat National University",
      } as LocalizedString,
    },
    {
      period: "2025 –",
      detail: {
        ko: "서울대학교 도시설계 석사 (재학 중)",
        ja: "ソウル大学 都市設計 修士課程 (在学中)",
        en: "ME, Urban Design, Seoul National University (ongoing)",
      } as LocalizedString,
    },
  ],
  career: [
    {
      period: "2018 – 2020",
      detail: {
        ko: "공간그룹, 서울",
        ja: "Space Group、ソウル",
        en: "Space Group, Seoul",
      } as LocalizedString,
    },
    {
      period: "2020 – 2024",
      detail: {
        ko: "투닷건축사사무소, 양평",
        ja: "Todot Architects、楊平",
        en: "Todot Architects, Yangpyeong",
      } as LocalizedString,
    },
    {
      period: "2026 –",
      detail: {
        ko: "Junya.Ishigami+Associates, 도쿄",
        ja: "Junya.Ishigami+Associates、東京",
        en: "Junya.Ishigami+Associates, Tokyo",
      } as LocalizedString,
    },
  ],
};

export const contact = {
  email: "wzdmst@snu.ac.kr",
  phone: "+82 10-7703-4411",
  instagram: "https://www.instagram.com/so.c_architects/",
  instagramHandle: "@so.c_architects",
};
