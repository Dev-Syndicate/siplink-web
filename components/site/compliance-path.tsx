import { verifiedCertifications } from "@/lib/company";

/**
 * The five verified frameworks, drawn as checkpoints a call passes through
 * rather than five separate badges — because that is what they actually
 * are: DoT governs the call reaching the network at all, ISO 27001 and
 * SOC 2 govern how the data behind it is handled, HIPAA and GDPR govern who
 * is allowed to see it afterward. Order follows `verifiedCertifications`,
 * which is already sequenced that way in lib/company.ts.
 */
export function CompliancePath() {
  return (
    <ol
      aria-label="The five frameworks every call is handled under"
      className="relative grid gap-8 sm:grid-cols-5 sm:gap-4"
    >
      <div
        aria-hidden
        className="absolute top-6 right-[10%] left-[10%] hidden h-px bg-border sm:block"
      >
        <div
          className="trace-pulse absolute inset-0 h-0.5 -translate-y-px bg-primary"
          style={{ "--trace-duration": "5.2s" } as React.CSSProperties}
        />
      </div>

      {verifiedCertifications.map(({ id, shortName, authority, icon: Icon }) => (
        <li
          key={id}
          className="relative flex flex-col items-center text-center"
        >
          <a
            href={`#${id}`}
            className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border border-primary bg-background text-primary shadow-sm transition-transform hover:-translate-y-0.5 focus-visible:-translate-y-0.5 focus-visible:outline-none"
          >
            <Icon className="size-5" aria-hidden />
          </a>
          <h3 className="mt-3 text-xs font-semibold text-foreground sm:text-sm">
            {shortName}
          </h3>
          <p className="mt-1 max-w-[14ch] text-[11px] text-pretty text-muted-foreground">
            {authority}
          </p>
        </li>
      ))}
    </ol>
  );
}
