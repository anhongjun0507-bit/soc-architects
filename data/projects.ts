import type { Locale } from "@/lib/i18n-config";

export type LocalizedString = Record<Locale, string> & { ja?: string };
export type LocalizedParas = Record<Locale, string[]> & { ja?: string[] };

export type ProjectType =
  | "architecture"
  | "interior"
  | "urban"
  | "public-art";

export type ProjectPriority = "feature" | "small";

export type ProjectImage = {
  src: string;
  width: number;
  height: number;
};

export type Project = {
  slug: string;
  year: number;
  type: ProjectType;
  priority?: ProjectPriority;
  title: LocalizedString;
  location: LocalizedString;
  status?: LocalizedString;
  area?: string;
  collaborator?: string;
  cover?: ProjectImage;
  images: ProjectImage[];
  description?: LocalizedParas;
};

const DIMS: Record<string, Record<number, [number, number]>> = {
  "mangmi-ri": {
    1: [2400, 1797], 2: [2400, 1800], 3: [2400, 1800], 4: [2400, 1800],
    5: [1800, 2400], 6: [2400, 1800], 7: [2400, 1800], 8: [2400, 1800],
    9: [2400, 1800],
  },
  "engraved-void": {
    1: [1600, 2400], 2: [2400, 1600], 3: [2400, 1200], 4: [2400, 2400],
    5: [2400, 1600], 6: [2400, 1600], 7: [2400, 1600], 8: [1600, 2400],
    9: [1600, 2400], 10: [1600, 2400], 11: [1600, 2400], 12: [1600, 2400],
    13: [1600, 2400], 14: [2400, 1600], 15: [2400, 1600],
  },
  "eunpyeon-ri": {
    1: [2400, 1600], 2: [2400, 1229], 3: [2400, 1350], 4: [1600, 2400],
    5: [2400, 1600], 6: [1600, 2400], 7: [2223, 2400], 8: [2400, 2099],
    9: [2400, 1600],
  },
  "hopyeong-dong": {
    1: [2400, 1348], 2: [1601, 2400], 3: [2400, 1602], 4: [1602, 2400],
    5: [1602, 2400], 6: [2400, 1602], 7: [2400, 1602], 8: [2400, 1602],
    9: [2400, 1602], 10: [1602, 2400],
  },
  "yongdam-ri": {
    1: [2400, 1600], 2: [1600, 1067], 3: [2400, 1600], 4: [2400, 1798],
    5: [2250, 2400], 6: [2400, 1600], 7: [2400, 1800],
  },
  "dojang-ri": {
    1: [2400, 1600], 2: [1600, 2400], 3: [2400, 1350], 4: [2400, 1920],
    5: [2400, 1600], 6: [1600, 2400], 7: [2400, 1714], 8: [2400, 1920],
    9: [2400, 2400], 10: [2400, 1600], 11: [2400, 1600], 12: [2400, 1798],
  },
  "damun-ri": {
    1: [2400, 1599], 2: [2400, 1919], 3: [2400, 1600], 4: [2400, 1920],
    5: [2400, 1600], 6: [1600, 2400], 7: [2400, 1600],
  },
  "yeonhui-dong": {
    1: [1800, 2400], 2: [2400, 1800], 3: [2400, 1800], 4: [1845, 2400],
    5: [2400, 1800], 6: [1920, 2400], 7: [1714, 2400],
  },
  "munhori-pension": {
    1: [2400, 1601], 2: [1824, 2400], 3: [2400, 1600], 4: [1601, 2400],
    5: [1824, 2400], 6: [1824, 2400], 7: [1824, 2400], 8: [2400, 1599],
    9: [1824, 2400], 10: [2400, 1601],
  },
};

const img = (slug: string, n: number): ProjectImage => {
  const [w, h] = DIMS[slug]?.[n] ?? [2400, 1600];
  return { src: `/projects/${slug}/${n}.jpg`, width: w, height: h };
};

const allImages = (slug: string): ProjectImage[] =>
  Object.keys(DIMS[slug] ?? {})
    .map(Number)
    .sort((a, b) => a - b)
    .map((n) => img(slug, n));

export const projects: Project[] = [
  {
    slug: "jules-house",
    year: 2026,
    type: "architecture",
    priority: "feature",
    title: {
      ko: "줄스하우스",
      ja: "ジュールスハウス",
      en: "Jules House",
    },
    location: {
      ko: "강원도 홍천군 화상대리",
      ja: "江原道 洪川郡 ファサンデリ",
      en: "Hwasangdae-ri, Hongcheon-gun, Gangwon-do, Korea",
    },
    status: { ko: "준공", ja: "竣工", en: "Completed" },
    area: "124.33 ㎡",
    images: [],
  },
  {
    slug: "mangmi-ri",
    year: 2022,
    type: "architecture",
    title: {
      ko: "망미농장",
      ja: "マンミ農場",
      en: "Mangmi Farm",
    },
    location: {
      ko: "경기도 양평군",
      ja: "京畿道 楊平郡",
      en: "Yangpyeong-gun, Gyeonggi-do, Korea",
    },
    status: { ko: "준공", ja: "竣工", en: "Completed" },
    area: "137.91 ㎡",
    collaborator: "Todot Architects",
    cover: img("mangmi-ri", 1),
    images: allImages("mangmi-ri"),
    description: {
      ko: [
        "오랫동안 사람들은 나무로 집을 지어왔으며, 대부분의 한국 전통 가옥은 경사진 지붕을 가지고 있었습니다. 나무는 물에 약하기 때문에, 비와 눈을 배수하는 경사진 지붕은 자연스러운 해결책이었습니다.",
        "한편, 이 프로젝트의 건축주는 제한된 예산을 가지고 있었습니다. 이로 인해 저는 건물을 구성하는 구조적 요소들을 다시 생각하게 되었습니다. 일반적으로 건물의 주요 구조 요소는 바닥, 벽, 그리고 지붕이며, 저는 이 요소들이 결합될 수 있는지 탐구했습니다. 수직 요소(벽)와 수평 요소(바닥과 지붕) 중에서, 벽은 다른 두 요소를 연결할 수 있는 가장 큰 잠재력을 가지고 있었습니다. 기능과 형태를 모두 고려했을 때, 벽과 지붕을 통합하는 것이 가장 합리적인 해결책으로 보였습니다.",
        "결과적으로, 이 프로젝트는 벽과 지붕을 하나의 요소로 결합한다는 아이디어에서 시작되었습니다.",
      ],
      ja: [
        "古くから人々は木で家を建ててきました。韓国の伝統家屋の多くが傾斜屋根を持っていたのは、水に弱い木材から雨や雪を逃がすための自然な解決策だったからです。",
        "一方、このプロジェクトの建築主は限られた予算を抱えていました。そのため私は建物を構成する構造要素を再考し、「床・壁・屋根」を統合できないかを探求しました。垂直要素である壁は、水平要素である床と屋根をつなぐ最大の潜在力を持っており、機能と形態の両面から壁と屋根の統合が最も合理的に思えました。",
        "結果として、このプロジェクトは「壁と屋根をひとつの要素として統合する」というアイデアから始まりました。",
      ],
      en: [
        "For a long time, people have built houses with wood, and most traditional Korean houses had sloped roofs. Because wood is weak against water, a sloped roof that drains rain and snow was a natural solution.",
        "Meanwhile, the client of this project had a limited budget. This led me to rethink the structural elements that make up a building. In general, the main structural elements of a building are the floor, the wall, and the roof, and I explored whether these elements could be combined. Among the vertical element (the wall) and the horizontal elements (the floor and the roof), the wall had the greatest potential to connect the other two elements. When considering both function and form, integrating the wall and the roof seemed the most reasonable solution.",
        "As a result, this project started with the idea of combining the wall and the roof into a single element.",
      ],
    },
  },
  {
    slug: "engraved-void",
    year: 2025,
    type: "public-art",
    title: {
      ko: "새겨진 보이드",
      ja: "刻まれたヴォイド",
      en: "Engraved Void",
    },
    location: {
      ko: "서울대학교, 서울",
      ja: "ソウル大学、ソウル",
      en: "Seoul National University, Seoul, Korea",
    },
    status: { ko: "전시", ja: "展示", en: "Exhibited" },
    area: "1m × 1m × 2.4m",
    collaborator: "Kwag Minjun, Lee Juhyeon, Lee Youngjun",
    cover: img("engraved-void", 1),
    images: allImages("engraved-void"),
    description: {
      ko: [
        "우리는 너무 많은 것들이 사라지는 시대에 살고 있습니다. 하지만 모든 것이 의미나 가치를 잃었기 때문에 사라지는 것은 아닙니다. 어떤 것들은 여전히 우리에게 의미와 울림을 전달할 잠재력을 갖고 있습니다.",
        "2024년 노벨문학상 수상자인 한강 작가는 이렇게 물었습니다. “과거가 미래를 도울 수 있을까? 죽은 자가 산 자를 구할 수 있을까?”",
        "이 질문은 사라진 것들이 여전히 현재에 영향을 미칠 수 있음을 암시합니다. 이 프로젝트에서 우리는 서울대학교 도서관으로부터 버려진 책들에 주목합니다. 지식의 유형적 매체인 책을 보이지 않는 잔상을 포착하는 예술적 도구로 사용함으로써, 우리는 책을 새로운 예술 매체로 변모시키고자 합니다. 이 과정을 통해 관람객들이 완전히 새로운 방식으로 책을 예술적 재료로 경험할 수 있기를 바랍니다.",
      ],
      ja: [
        "私たちはあまりにも多くのものが消えていく時代に生きています。けれども、すべてのものが意味や価値を失ったから消えるのではありません。なかには今もなお、私たちに意味と響きを伝える潜在性を持つものがあります。",
        "2024年ノーベル文学賞受賞者である作家ハン・ガンはこう問いました。「過去は未来を助けることができるのか。死者は生者を救えるのか。」",
        "この問いは、失われたものが今も現在に影響を及ぼし得ることを示唆します。本プロジェクトでは、ソウル大学図書館で廃棄された書物に着目します。知の有形なメディアである書物を、見えざる残像を捕える芸術的な道具として用いることで、書物を新たな表現の媒体へと変容させます。このプロセスを通じて、来場者がまったく新しいかたちで書物を芸術素材として経験できることを願っています。",
      ],
      en: [
        "We are living in a time when too many things are disappearing. Yet, not all things vanish because they have lost their meaning or value. Some still retain the potential to convey significance and resonance to us.",
        "Author Han Kang, Nobel Prize in Literature 2024, asked, “Can the past help the future? Can the dead save the living?”",
        "This question suggests that what has disappeared can still exert influence upon the present. In this project, we focus on the discarded books from the Seoul National University Library. By using books — the tangible medium of knowledge — as artistic tools to capture invisible afterimages, we aim to transform them into a new medium of expression. Through this process, we hope visitors will experience books as an artistic material in a completely new way.",
      ],
    },
  },
  {
    slug: "mojeon-dong",
    year: 2024,
    type: "architecture",
    title: {
      ko: "모전동 DIG 268",
      ja: "モジョン洞 DIG 268",
      en: "DIG 268",
    },
    location: {
      ko: "경상북도 문경시",
      ja: "慶尚北道 聞慶市",
      en: "Mungyeong-si, Gyeongsangbuk-do, Korea",
    },
    status: { ko: "준공", ja: "竣工", en: "Completed" },
    area: "630.97 ㎡",
    collaborator: "Todot Architects",
    images: [],
    description: {
      ko: [
        "DIG 268은 대한민국 문경에 위치해 있습니다. 문경은 한국 탄광의 발상지로 잘 알려져 있습니다. 경제 개발 시기에 석탄 채굴이 절정에 달하며 도시는 크게 번성했습니다. 풍부한 석탄 매장량은 지질학적으로 복잡한 지형을 형성했고, 그 결과 수많은 광산과 갱도가 지역 곳곳에 흩어져 남게 되었습니다.",
        "이 프로젝트는 단순한 질문에서 시작되었습니다. ‘망미 농장 프로젝트’를 마친 후, 저는 목재를 활용해 기하학적 구조를 탐구하는 데 관심을 갖게 되었습니다. 형태를 비교적 자유롭게 만들 수 있는 콘크리트나 철골 같은 재료와 달리, “목재를 사용하여 원형의 기하학적 구조를 구현하는 것이 가능할까?”라는 의문을 가졌습니다.",
        "이 프로젝트의 목표는 구조적 실험을 통해 목재가 가진 물리적 한계를 시험하고 확장하는 것입니다.",
      ],
      ja: [
        "DIG 268 は韓国・聞慶(ムンギョン)に位置しています。聞慶は韓国の炭鉱発祥の地として知られ、経済開発期には石炭採掘が最盛期を迎え、街は大きく繁栄しました。豊富な石炭埋蔵は地質的に複雑な地形を形づくり、その結果、無数の鉱山と坑道が地域に点在しています。",
        "このプロジェクトは、ひとつの素朴な問いから始まりました。「マンミ農場プロジェクト」を終えた後、私は木材で幾何学的な構造を探究することに関心を抱くようになり、コンクリートや鉄骨のように形を比較的自由に成形できる素材とは異なる「木材で円形の幾何学を実現することは可能か」という問いを持ちました。",
        "本プロジェクトの目的は、構造的実験を通じて木材が持つ物理的限界を試し、拡張することにあります。",
      ],
      en: [
        "DIG 268 is located in Mungyeong, South Korea. Mungyeong is known as the birthplace of Korea’s coal mine. During the period of economic development, coal mining reached its peak and the city flourished. The abundance of coal deposits also shaped a geologically complex landscape, leaving numerous mines and tunnels scattered throughout the area.",
        "This project began with a simple question. After completing the Mangmi Farm Project, I became interested in exploring geometric structures using timber. Unlike materials such as concrete or steel, which can be shaped relatively freely, I asked: “Is it possible to construct circular geometry using wood?”",
        "The goal of this project is to test and extend the physical limits of wood through structural experimentation.",
      ],
    },
  },
  {
    slug: "eunpyeon-ri",
    year: 2021,
    type: "architecture",
    priority: "feature",
    title: { ko: "은편리", ja: "ウンピョンリ", en: "Eunpyeon-ri" },
    location: {
      ko: "울산 울주군 두동면",
      ja: "蔚山 蔚州郡 斗東面",
      en: "Dudong-myeon, Ulju-gun, Ulsan, Korea",
    },
    status: { ko: "준공", ja: "竣工", en: "Completed" },
    area: "117.42 ㎡",
    collaborator: "Todot Architects",
    cover: img("eunpyeon-ri", 1),
    images: allImages("eunpyeon-ri"),
  },
  {
    slug: "hopyeong-dong",
    year: 2021,
    type: "architecture",
    title: { ko: "호평동", ja: "ホピョンドン", en: "Hopyeong-dong" },
    location: {
      ko: "경기도 남양주시 호평동",
      ja: "京畿道 南楊州市 ホピョンドン",
      en: "Hopyeong-dong, Namyangju-si, Gyeonggi-do, Korea",
    },
    status: { ko: "준공", ja: "竣工", en: "Completed" },
    area: "364.72 ㎡",
    collaborator: "Todot Architects",
    cover: img("hopyeong-dong", 1),
    images: allImages("hopyeong-dong"),
  },
  {
    slug: "yongdam-ri",
    year: 2022,
    type: "architecture",
    title: { ko: "용담리", ja: "ヨンダムリ", en: "Yongdam-ri" },
    location: {
      ko: "경기도 양평군",
      ja: "京畿道 楊平郡",
      en: "Yangpyeong-gun, Gyeonggi-do, Korea",
    },
    status: { ko: "준공", ja: "竣工", en: "Completed" },
    area: "162.92 ㎡",
    collaborator: "Todot Architects",
    cover: img("yongdam-ri", 1),
    images: allImages("yongdam-ri"),
  },
  {
    slug: "dojang-ri",
    year: 2023,
    type: "architecture",
    title: { ko: "도장리", ja: "ドジャンリ", en: "Dojang-ri" },
    location: {
      ko: "경기도 양평군",
      ja: "京畿道 楊平郡",
      en: "Yangpyeong-gun, Gyeonggi-do, Korea",
    },
    status: { ko: "준공", ja: "竣工", en: "Completed" },
    area: "191.54 ㎡",
    collaborator: "Todot Architects",
    cover: img("dojang-ri", 1),
    images: allImages("dojang-ri"),
  },
  {
    slug: "damun-ri",
    year: 2022,
    type: "architecture",
    priority: "feature",
    title: { ko: "다문리", ja: "タムンリ", en: "Damun-ri" },
    location: {
      ko: "경기도 양평군",
      ja: "京畿道 楊平郡",
      en: "Yangpyeong-gun, Gyeonggi-do, Korea",
    },
    status: { ko: "준공", ja: "竣工", en: "Completed" },
    area: "596.98 ㎡",
    collaborator: "Todot Architects",
    cover: img("damun-ri", 1),
    images: allImages("damun-ri"),
  },
  {
    slug: "yeonhui-dong",
    year: 2023,
    type: "architecture",
    title: { ko: "연희동", ja: "ヨンヒドン", en: "Yeonhui-dong" },
    location: {
      ko: "경기도 양평군 서종면 문호리",
      ja: "京畿道 楊平郡 西宗面 ムンホリ",
      en: "Munho-ri, Seojong-myeon, Yangpyeong-gun, Gyeonggi-do, Korea",
    },
    status: { ko: "준공", ja: "竣工", en: "Completed" },
    area: "184.25 ㎡",
    collaborator: "Todot Architects",
    cover: img("yeonhui-dong", 1),
    images: allImages("yeonhui-dong"),
  },
  {
    slug: "munhori-pension",
    year: 2022,
    type: "architecture",
    title: { ko: "문호리 펜션", ja: "ムンホリ ペンション", en: "Munho-ri Pension" },
    location: {
      ko: "경기도 양평군 서종면 문호리",
      ja: "京畿道 楊平郡 西宗面 ムンホリ",
      en: "Munho-ri, Seojong-myeon, Yangpyeong-gun, Gyeonggi-do, Korea",
    },
    status: { ko: "준공", ja: "竣工", en: "Completed" },
    collaborator: "Todot Architects",
    cover: img("munhori-pension", 1),
    images: allImages("munhori-pension"),
  },
];
