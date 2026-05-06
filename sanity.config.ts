import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "soc-architects",
  title: "so.c_architects CMS",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("프로젝트")
              .child(
                S.documentTypeList("project")
                  .title("프로젝트")
                  .defaultOrdering([{ field: "order", direction: "asc" }]),
              ),
            S.listItem()
              .title("사무소 정보")
              .child(
                S.editor()
                  .id("office-singleton")
                  .schemaType("office")
                  .documentId("office-singleton"),
              ),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
