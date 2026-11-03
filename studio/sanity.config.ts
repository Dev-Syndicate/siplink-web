import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { post } from "./schemaTypes/post";

export default defineConfig({
  name: "default",
  title: "SipLink Blog",
  projectId: "0o8smzes",
  dataset: "production",
  plugins: [structureTool()],
  schema: { types: [post] },
});
