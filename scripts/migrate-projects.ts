import { createClient } from "@sanity/client";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { projects } from "../data/projects";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in env.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const categoryMap: Record<string, "residential" | "public" | "commercial" | "art"> = {
  "jules-house": "residential",
  "mangmi-ri": "residential",
  "engraved-void": "art",
  "mojeon-dong": "art",
  "eunpyeon-ri": "residential",
  "hopyeong-dong": "residential",
  "yongdam-ri": "residential",
  "dojang-ri": "residential",
  "damun-ri": "residential",
  "yeonhui-dong": "residential",
  "munhori-pension": "commercial",
};

const ROOT = process.cwd();

async function uploadImage(srcRelative: string) {
  const abs = path.join(ROOT, "public", srcRelative.replace(/^\//, ""));
  if (!existsSync(abs)) {
    console.warn(`  skip (missing): ${srcRelative}`);
    return null;
  }
  const buffer = await readFile(abs);
  const filename = path.basename(abs);
  const asset = await client.assets.upload("image", buffer, { filename });
  return asset._id;
}

function paragraphsToBlocks(paras: string[] | undefined) {
  if (!paras || paras.length === 0) return undefined;
  return paras.map((text, i) => ({
    _type: "block",
    _key: `b${i}`,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: `s${i}`, text, marks: [] }],
  }));
}

async function migrate() {
  console.log(`Migrating ${projects.length} projects to dataset="${dataset}"...`);

  for (let idx = 0; idx < projects.length; idx++) {
    const p = projects[idx];
    console.log(`\n[${idx + 1}/${projects.length}] ${p.slug}`);

    let mainImageRef: string | null = null;
    if (p.cover) {
      console.log(`  cover -> ${p.cover.src}`);
      mainImageRef = await uploadImage(p.cover.src);
    } else if (p.images[0]) {
      console.log(`  cover (from images[0]) -> ${p.images[0].src}`);
      mainImageRef = await uploadImage(p.images[0].src);
    }

    const galleryRefs: { _key: string; _type: "image"; asset: { _type: "reference"; _ref: string } }[] = [];
    for (let i = 0; i < p.images.length; i++) {
      const img = p.images[i];
      console.log(`  gallery[${i}] -> ${img.src}`);
      const ref = await uploadImage(img.src);
      if (ref) {
        galleryRefs.push({
          _key: `g${i}`,
          _type: "image",
          asset: { _type: "reference", _ref: ref },
        });
      }
    }

    const description = p.description
      ? {
          ko: paragraphsToBlocks(p.description.ko),
          en: paragraphsToBlocks(p.description.en),
          ja: paragraphsToBlocks(p.description.ja),
        }
      : undefined;

    const doc: Record<string, unknown> = {
      _id: `project.${p.slug}`,
      _type: "project",
      title: p.title,
      slug: { _type: "slug", current: p.slug },
      order: idx + 1,
      location: p.location,
      year: p.year,
      category: categoryMap[p.slug] ?? "residential",
      featured: p.priority === "feature",
    };

    if (mainImageRef) {
      doc.mainImage = {
        _type: "image",
        asset: { _type: "reference", _ref: mainImageRef },
      };
    }
    if (galleryRefs.length > 0) doc.gallery = galleryRefs;
    if (p.status) doc.status = p.status;
    if (p.area) doc.area = p.area;
    if (p.collaborator) doc.collaborator = p.collaborator;
    if (description) doc.description = description;

    await client.createOrReplace(doc);
    console.log(`  ✓ saved as ${doc._id}`);
  }

  console.log("\nDone.");
}

migrate().catch((err) => {
  console.error(err);
  process.exit(1);
});
