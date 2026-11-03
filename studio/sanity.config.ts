import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { post } from "./schemaTypes/post";

export default defineConfig({
  name: "default",
  title: "SipLink Blog",
  projectId: "zguqjm6f",
  dataset: "production",
  plugins: [structureTool()],
  schema: { types: [post] },
});
