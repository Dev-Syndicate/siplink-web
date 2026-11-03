import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqPage, JsonLd } from "@/components/site/json-ld";
import type { Faq } from "@/lib/page-faqs";
import { homeFaqs } from "@/lib/site";

/**
 * The FAQ band, the last thing a hesitant visitor reads before the closing
 * ask. Defaults to the homepage questions, in the order the brief lists them.
 *
 * The same list is emitted as FAQPage structured data so search engines can
 * read it, which keeps the markup and the visible answers identical, as
 * Google requires. Renders nothing for a page with no questions.
 */
export function FaqSection({ faqs = homeFaqs }: { faqs?: Faq[] }) {
  if (!faqs.length) return null;

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
            {faqs.map(({ question, answer }, index) => (
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

      <JsonLd data={faqPage(faqs)} />
    </section>
  );
}
