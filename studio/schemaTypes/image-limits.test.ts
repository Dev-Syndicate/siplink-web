import assert from "node:assert/strict";
import { test } from "node:test";

import { checkImage, imageProblem } from "./image-limits.ts";

const MB = 1024 * 1024;
const good = { size: MB, mimeType: "image/png", width: 1365 };

test("accepts an image at the limits", () => {
  assert.equal(imageProblem(good), null);
  assert.equal(imageProblem({ ...good, size: 2 * MB, width: 1200 }), null);
});

test("rejects a file over 2 MB", () => {
  assert.equal(imageProblem({ ...good, size: 4.2 * MB }), "Image is 4.2 MB. Please use one under 2 MB.");
});

test("rejects an image under 1200 px wide", () => {
  assert.equal(imageProblem({ ...good, width: 1199 }), "Image is 1199 px wide. Please use one at least 1200 px wide.");
});

test("rejects other file types", () => {
  assert.equal(imageProblem({ ...good, mimeType: "image/gif" }), "Please use a JPG, PNG or WebP image.");
});

test("checks the uploaded asset, and skips an empty field", async () => {
  const context = (asset: typeof good | null) => ({ getClient: () => ({ fetch: async () => asset }) });
  const value = { asset: { _ref: "image-1" } };
  assert.equal(await checkImage(value, context(good)), true);
  assert.equal(await checkImage(value, context({ ...good, width: 100 })), "Image is 100 px wide. Please use one at least 1200 px wide.");
  assert.equal(await checkImage(value, context(null)), true);
  assert.equal(await checkImage(undefined, context(good)), true);
});
