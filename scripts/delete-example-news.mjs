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
});

const ids = [
  "news.c3-magazine-interview",
  "news.seoul-biennale-lecture-2025",
  "news.snu-design-studio-2025",
];

for (const id of ids) {
  // delete both draft and published variants if any
  const drafts = `drafts.${id}`;
  try {
    const r = await client.delete(id);
    console.log("deleted", id, r);
  } catch (e) {
    console.log("skip", id, e.message);
  }
  try {
    const r = await client.delete(drafts);
    console.log("deleted", drafts, r);
  } catch (e) {
    // ok if no draft
  }
}

const remaining = await client.fetch(
  `*[_type == "news"] | order(date desc) { _id, "slug": slug.current, date }`,
);
console.log("remaining:", JSON.stringify(remaining, null, 2));
