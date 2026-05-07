import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemaTypes";

const SINGLETONS = ["profile", "siteSettings"] as const;

export default defineConfig({
  name: "soc-architects",
  title: "SOC Architects",
  basePath: "/studio",
  projectId: "y70z7978",
  dataset: "production",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Projects")
              .child(
                S.documentTypeList("project")
                  .title("Projects")
                  .defaultOrdering([{ field: "order", direction: "asc" }]),
              ),
            S.listItem()
              .title("News")
              .child(
                S.documentTypeList("news")
                  .title("News")
                  .defaultOrdering([{ field: "date", direction: "desc" }]),
              ),
            S.divider(),
            S.listItem()
              .title("Profile")
              .child(
                S.editor().id("profile").schemaType("profile").documentId("profile"),
              ),
            S.listItem()
              .title("Site settings")
              .child(
                S.editor()
                  .id("siteSettings")
                  .schemaType("siteSettings")
                  .documentId("siteSettings"),
              ),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(
        ({ schemaType }) => !SINGLETONS.includes(schemaType as (typeof SINGLETONS)[number]),
      ),
  },
  document: {
    actions: (input, { schemaType }) =>
      SINGLETONS.includes(schemaType as (typeof SINGLETONS)[number])
        ? input.filter(({ action }) => action !== "delete" && action !== "duplicate")
        : input,
  },
});
