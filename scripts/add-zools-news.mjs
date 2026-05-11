import { createClient } from "@sanity/client";
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const env = readFileSync(resolve(root, ".env.local"), "utf8")
  .split("\n")
  .reduce((acc, line) => {
    const m = line.match(/^([^=#]+)=(.*)$/);
    if (m) acc[m[1].trim()] = m[2].trim();
    return acc;
  }, {});

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: env.SANITY_API_VERSION || "2024-01-01",
  token: env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

const files = [
  { path: "KakaoTalk_20260510_145857244.jpg", role: "cover", alt: "전원속의 내집 2026년 5월호 vol.327 표지" },
  { path: "KakaoTalk_20260510_145857244_01.jpg", role: "image", alt: "ZOOLS HOUSE 잡지 게재 지면" },
  { path: "KakaoTalk_20260510_145857244_02.jpg", role: "image", alt: "ZOOLS HOUSE 외관 — 마당의 동물들" },
];

async function uploadAsset(file) {
  const full = resolve(root, file.path);
  if (!existsSync(full)) throw new Error("missing file " + full);
  const buf = readFileSync(full);
  const asset = await client.assets.upload("image", buf, {
    filename: file.path,
    contentType: "image/jpeg",
  });
  return { ...file, assetId: asset._id };
}

function imgRef(assetId, alt, key) {
  return {
    _key: key,
    _type: "image",
    asset: { _type: "reference", _ref: assetId },
    alt,
  };
}

const slug = "zools-house-green-house-vol-327";

const titleKo = "월간 〈전원속의 내집〉 2026년 5월호 vol.327 — ZOOLS HOUSE";
const titleEn = "ZOOLS HOUSE featured in GREEN HOUSE, May 2026 (Vol. 327)";
const titleJa = "月刊『田園の中の我が家』2026年5月号 vol.327 — ZOOLS HOUSE";

const excerptKo = "유튜버 김줄스를 위한 제작자의 집 'ZOOLS HOUSE'가 월간 〈전원속의 내집〉 2026년 5월호 vol.327에 소개되었습니다.";
const excerptEn = "The creator's house for YouTuber Kim Zools was featured under the title 'ZOOLS HOUSE' in the May 2026 issue (Vol. 327) of GREEN HOUSE.";
const excerptJa = "YouTuberキム・ジュルスのためのクリエイターズハウス「ZOOLS HOUSE」が、月刊『田園の中の我が家』2026年5月号 vol.327に掲載されました。";

const bodyKo = [
  {
    _key: "k1",
    _type: "block",
    style: "normal",
    markDefs: [],
    children: [{ _key: "k1c", _type: "span", marks: [], text: excerptKo }],
  },
];
const bodyEn = [
  {
    _key: "e1",
    _type: "block",
    style: "normal",
    markDefs: [],
    children: [{ _key: "e1c", _type: "span", marks: [], text: excerptEn }],
  },
];
const bodyJa = [
  {
    _key: "j1",
    _type: "block",
    style: "normal",
    markDefs: [],
    children: [{ _key: "j1c", _type: "span", marks: [], text: excerptJa }],
  },
];

async function main() {
  console.log("Uploading assets…");
  const uploaded = [];
  for (const f of files) {
    const u = await uploadAsset(f);
    console.log("  ", f.path, "->", u.assetId);
    uploaded.push(u);
  }

  const cover = uploaded.find((u) => u.role === "cover");
  const additional = uploaded.filter((u) => u.role !== "cover");

  const existing = await client.fetch(`*[_type == "news" && slug.current == $slug][0]{_id}`, { slug });

  const doc = {
    _type: "news",
    title: { ko: titleKo, en: titleEn, ja: titleJa },
    slug: { _type: "slug", current: slug },
    date: "2026-05-10",
    category: "project",
    excerpt: { ko: excerptKo, en: excerptEn, ja: excerptJa },
    body: { ko: bodyKo, en: bodyEn, ja: bodyJa },
    cover: {
      _type: "image",
      asset: { _type: "reference", _ref: cover.assetId },
      alt: cover.alt,
    },
    images: additional.map((a, i) => imgRef(a.assetId, a.alt, "img" + i)),
  };

  let result;
  if (existing?._id) {
    console.log("Updating existing doc", existing._id);
    result = await client.patch(existing._id).set(doc).commit();
  } else {
    console.log("Creating new news doc…");
    result = await client.create(doc);
  }
  console.log("OK:", result._id);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
