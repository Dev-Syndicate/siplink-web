const MAX_MB = 2;
const MIN_WIDTH = 1200;
const TYPES = ["image/jpeg", "image/png", "image/webp"];

/** Limits the upload picker. Pasted or existing files are caught by `imageProblem`. */
export const IMAGE_ACCEPT = TYPES.join(",");

type ImageAsset = { size: number; mimeType: string; width: number };

/** The message to show a writer, or null when the image is within the limits. */
export function imageProblem({ size, mimeType, width }: ImageAsset): string | null {
  if (!TYPES.includes(mimeType)) return "Please use a JPG, PNG or WebP image.";
  const mb = size / (1024 * 1024);
  if (mb > MAX_MB) return `Image is ${mb.toFixed(1)} MB. Please use one under ${MAX_MB} MB.`;
  if (width < MIN_WIDTH) return `Image is ${width} px wide. Please use one at least ${MIN_WIDTH} px wide.`;
  return null;
}

type ValidationContext = {
  getClient: (options: { apiVersion: string }) => {
    fetch: (query: string, params: { ref: string }) => Promise<ImageAsset | null>;
  };
};

/** Publishing is blocked while this returns a message. */
export async function checkImage(
  value: { asset?: { _ref?: string } } | undefined,
  context: ValidationContext,
): Promise<true | string> {
  const ref = value?.asset?._ref;
  if (!ref) return true;
  const asset = await context
    .getClient({ apiVersion: "2025-02-19" })
    .fetch(`*[_id == $ref][0]{ size, mimeType, "width": metadata.dimensions.width }`, { ref });
  return (asset && imageProblem(asset)) || true;
}
