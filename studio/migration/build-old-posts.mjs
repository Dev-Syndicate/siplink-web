// One-off: turns the old siplink.in posts into Sanity drafts for review.
import { writeFileSync } from "node:fs";

const slugs = [
  "what-is-voip-how-does-voip-work",
  "voip-service-providers-in-chennai-india-voip-service-questions-and-answers",
  "how-to-send-and-receive-fax-over-the-internet-with-siplink",
  "the-complete-guide-to-voip-service-providers-in-chennai-india",
  "the-feature-and-future-of-5g-internet-technology-in-call-center-services",
  "how-to-connect-business-with-high-speed-internet-access-for-multiple-users",
  "what-is-an-isp-how-to-select-the-best-broadband-internet-service-providers-in-chennai",
];
const decode = (s) => s.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&#39;|&rsquo;|&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&ldquo;|&rdquo;/g, '"').replace(/&hellip;/g, "...").replace(/\s+/g, " ").trim();
const key = (() => { let n = 0; return () => `k${(n++).toString(36)}`; })();
const lines = [];
for (const slug of slugs) {
  const html = await (await fetch(`https://www.siplink.in/blog/${slug}.php`, { headers: { "user-agent": "Mozilla/5.0" } })).text();
  const start = html.search(/<h1/i);
  const end = html.indexOf("<footer", start);
  const main = html.slice(start, end < 0 ? undefined : end).replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "");
  const title = decode(main.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)[1]);
  const body = [];
  for (const [, tag, inner] of main.matchAll(/<(h[2-6]|p|li)\b[^>]*>([\s\S]*?)<\/\1>/gi)) {
    const text = decode(inner);
    if (!text) continue;
    const t = tag.toLowerCase();
    const block = { _type: "block", _key: key(), style: t === "h2" ? "h2" : t.startsWith("h") ? "h3" : "normal", markDefs: [], children: [{ _type: "span", _key: key(), text, marks: [] }] };
    if (t === "li") Object.assign(block, { listItem: "bullet", level: 1 });
    body.push(block);
  }
  const firstText = body.find((b) => b.style === "normal")?.children[0].text ?? "";
  lines.push(JSON.stringify({ _id: `drafts.old-${slug}`.slice(0, 120), _type: "post", title, slug: { _type: "slug", current: slug }, excerpt: firstText.slice(0, 197).trimEnd() + (firstText.length > 197 ? "..." : ""), author: "SipLink Team", body }));
  console.log(slug.slice(0, 40).padEnd(42), "|", title.slice(0, 40).padEnd(42), "| blocks", String(body.length).padStart(3), "| first:", firstText.slice(0, 50), "| last:", body.at(-1)?.children[0].text.slice(0, 50));
}
writeFileSync(new URL("./old-posts.ndjson", import.meta.url), lines.join("\n") + "\n");
