import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
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
  perspective: "published",
});

const doc = await client.fetch(
  `*[_type == "news" && slug.current == $slug][0]{
    _id, title, "slug": slug.current, date, category,
    "coverUrl": cover.asset->url,
    "imageUrls": images[].asset->url,
    excerpt
  }`,
  { slug: "zools-house-green-house-vol-327" },
);
console.log(JSON.stringify(doc, null, 2));
