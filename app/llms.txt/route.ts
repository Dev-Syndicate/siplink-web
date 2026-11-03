import { seo } from "@/lib/seo";
import { site } from "@/lib/site";

export const dynamic = "force-static";

const SECTIONS = [
  ["Products", "/products"],
  ["Solutions", "/solutions"],
  ["Industries", "/industries"],
  ["Business internet", "/internet"],
  ["Company", "/company"],
] as const;

const links = (test: (path: string) => boolean) =>
  Object.entries(seo)
    .filter(([path]) => test(path))
    .map(([path, [, description, name]]) => `- [${name}](${site.url}${path}): ${description}`)
    .join("\n");

/** A plain index of the site for AI tools, per the llmstxt.org proposal. */
export function GET() {
  const body = [
    `# ${site.name}`,
    `> ${site.description}`,
    `${site.legalName} is headquartered at ${site.address}. Phone: ${site.phone}. Email: ${site.email}.`,
    ...SECTIONS.flatMap(([title, root]) => [
      `## ${title}`,
      links((path) => path === root || path.startsWith(`${root}/`)),
    ]),
    "## More",
    links((path) => ["/pricing", "/why-siplink", "/about", "/contact", "/blog"].includes(path)),
  ].join("\n\n");

  return new Response(`${body}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
