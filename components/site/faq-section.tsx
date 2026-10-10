import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { homeFaqs } from "@/lib/site";

/**
 * Homepage FAQ, the last thing a hesitant visitor reads before the closing
 * ask. The questions are the ones the brief lists, in its order.
 *
 * The same list is emitted as FAQPage structured data so search engines can
 * read it. Both come from `homeFaqs`, which keeps the markup and the visible
 * answers identical, as Google requires.
 */
export function FaqSection() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-20">
          <div>
            <span className="font-mono text-xs tracking-widest text-primary uppercase">
              FAQ
            </span>
            <h2 className="font-heading mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              The questions we hear most before a business switches. Anything
              else, ask us and we will answer it.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {homeFaqs.map(({ question, answer }, index) => (
              <AccordionItem key={question} value={`faq-${index}`}>
                <AccordionTrigger className="text-left text-base">
                  {question}
                </AccordionTrigger>
                <AccordionContent className="text-pretty text-muted-foreground">
                  {answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      <script
        type="application/ld+json"
        // `<` is escaped so a stray "</script>" in an answer cannot end the tag.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\u003c"),
        }}
      />
    </section>
  );
}
