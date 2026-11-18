import type { PolicyBlock } from "@/lib/privacy-policy";

/** Renders legal text (privacy policy, terms) from plain data: paragraphs, subheadings, lists and term/detail pairs. */
export function PolicySections({ sections }: { sections: { title: string; blocks: PolicyBlock[] }[] }) {
  return sections.map(({ title, blocks }) => (
    <section key={title} className="space-y-3">
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      {blocks.map((block, i) =>
        typeof block === "string" ? (
          <p key={i}>{block}</p>
        ) : "h3" in block ? (
          <h3 key={i} className="pt-2 text-base font-semibold text-foreground">
            {block.h3}
          </h3>
        ) : "ul" in block ? (
          <ul key={i} className="list-disc space-y-1.5 pl-5">
            {block.ul.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : "ol" in block ? (
          <ol key={i} className="list-decimal space-y-1.5 pl-5">
            {block.ol.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        ) : (
          <dl key={i} className="space-y-2">
            {block.terms.map(([term, detail]) => (
              <div key={term}>
                <dt className="inline font-semibold text-foreground">{term}: </dt>
                <dd className="inline">{detail}</dd>
              </div>
            ))}
          </dl>
        ),
      )}
    </section>
  ));
}
