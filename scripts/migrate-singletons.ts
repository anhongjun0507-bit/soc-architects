import { createClient } from "@sanity/client";
import { office, principal, contact } from "../data/office";

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

function paragraphsToBlocks(paras: string[]) {
  return paras.map((text, i) => ({
    _type: "block",
    _key: `b${i}`,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: `s${i}`, text, marks: [] }],
  }));
}

async function migrate() {
  console.log(`Migrating singletons to dataset="${dataset}"...`);

  const profileDoc = {
    _id: "profile",
    _type: "profile",
    bio: {
      ko: paragraphsToBlocks(office.description.ko),
      en: paragraphsToBlocks(office.description.en),
      ja: paragraphsToBlocks(office.description.ja!),
    },
    officeName: office.name,
    founded: office.founded,
    fields: office.fields,
    principal: {
      name: principal.name,
      title: principal.title,
      education: principal.education.map((e, i) => ({
        _key: `edu${i}`,
        period: e.period,
        detail: e.detail,
      })),
      career: principal.career.map((c, i) => ({
        _key: `car${i}`,
        period: c.period,
        detail: c.detail,
      })),
    },
    contact: {
      email: contact.email,
      phone: contact.phone,
      address: office.address,
      instagram: contact.instagram,
      instagramHandle: contact.instagramHandle,
    },
  };

  await client.createOrReplace(profileDoc);
  console.log("✓ profile saved as profile");

  const settingsDoc = {
    _id: "siteSettings",
    _type: "siteSettings",
    siteTitle: office.brand,
    description: office.description.ko[0],
    instagram: contact.instagram,
    defaultLocale: "ko" as const,
  };

  await client.createOrReplace(settingsDoc);
  console.log("✓ siteSettings saved as siteSettings");

  console.log("\nDone.");
}

migrate().catch((err) => {
  console.error(err);
  process.exit(1);
});
